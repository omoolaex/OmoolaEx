// booking-slot/route.js
import { google } from "googleapis";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

// ===== 0️⃣ Environment-aware file paths =====
const isVercel = Boolean(process.env.VERCEL);
const QUEUE_FILE = isVercel ? "/tmp/bookingQueue.json" : path.resolve("./bookingQueue.json");
const DEAD_LETTER_FILE = isVercel ? "/tmp/bookingDeadLetter.json" : path.resolve("./bookingDeadLetter.json");

// ===== 1️⃣ Config =====
const CONCURRENCY_LIMIT = parseInt(process.env.QUEUE_CONCURRENCY || "2", 10);
const TASK_POLL_INTERVAL_MS = parseInt(process.env.QUEUE_POLL_INTERVAL_MS || "500", 10);
const DEFAULT_MAX_ATTEMPTS = parseInt(process.env.QUEUE_MAX_ATTEMPTS || "5", 10);

// ===== 2️⃣ OAuth Client =====
function getOAuthClient() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error("Missing Google OAuth environment variables");
  }
  const client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
  client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
  return client;
}

// ===== 3️⃣ Helpers =====
function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}
function sanitizeString(str) {
  return str ? String(str).replace(/[<>]/g, "").trim() : "";
}
function uid(prefix = '') {
  return prefix + crypto.randomUUID();
}
function now() { return Date.now(); }
async function executeWithBackoffFn(fn, maxAttempts = 3, initialDelay = 500) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try { return await fn(); }
    catch (err) {
      if (attempt === maxAttempts) throw err;
      const backoff = initialDelay * Math.pow(2, attempt - 1);
      await new Promise(res => setTimeout(res, backoff));
    }
  }
}

// ===== 4️⃣ SMTP Setup =====
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: String(process.env.SMTP_PORT) === "465",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

// ===== 5️⃣ Persistent Queue =====
let queue = [];
let activeCount = 0;
const inProgress = new Set();
const promiseMap = new Map();

async function loadQueue() {
  try {
    const txt = await fs.readFile(QUEUE_FILE, "utf-8");
    queue = JSON.parse(txt);
    if (!Array.isArray(queue)) queue = [];
    console.log(`[queue] Loaded ${queue.length} tasks from ${QUEUE_FILE}`);
  } catch {
    queue = [];
    console.log(`[queue] No existing queue file - starting fresh`);
  }
  queue = queue.map(q => ({
    id: q.id || uid("task-"),
    type: q.type,
    payload: q.payload || {},
    attempts: typeof q.attempts === "number" ? q.attempts : 0,
    maxAttempts: typeof q.maxAttempts === "number" ? q.maxAttempts : DEFAULT_MAX_ATTEMPTS,
    nextRunAt: q.nextRunAt || 0,
    createdAt: q.createdAt || now(),
    lastError: q.lastError || null,
  }));
}

async function saveQueue() {
  try {
    await fs.writeFile(QUEUE_FILE, JSON.stringify(queue, null, 2), "utf-8");
  } catch (err) {
    console.error("[queue] Failed to save queue:", err);
  }
}

async function saveDeadLetter(task) {
  try {
    let dead = [];
    try { dead = JSON.parse(await fs.readFile(DEAD_LETTER_FILE, "utf-8")); } catch {}
    dead.push(task);
    await fs.writeFile(DEAD_LETTER_FILE, JSON.stringify(dead, null, 2), "utf-8");
  } catch (err) {
    console.error("[queue] Failed to save dead-letter:", err);
  }
}

// Enqueue a task and return a promise
async function enqueueTask(type, payload = {}, options = {}) {
  const task = {
    id: uid("task-"),
    type,
    payload,
    attempts: 0,
    maxAttempts: options.maxAttempts || DEFAULT_MAX_ATTEMPTS,
    nextRunAt: options.nextRunAt || 0,
    createdAt: now(),
    lastError: null,
  };
  queue.push(task);
  await saveQueue();
  const promise = new Promise((resolve, reject) => { promiseMap.set(task.id, { resolve, reject }); });
  processQueueOnce();
  return { taskId: task.id, promise };
}

async function executeTask(task, services) {
  const { sheets, transporter, calendar } = services;
  switch (task.type) {
    case "sheets.append": {
      const { spreadsheetId, range, values } = task.payload;
      if (!spreadsheetId || !range || !values) throw new Error("Invalid sheets.append payload");
      return sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });
    }
    case "email.send": {
      const { from, to, subject, text, html } = task.payload;
      if (!to || !subject) throw new Error("Invalid email payload");
      return transporter.sendMail({ from, to, subject, text, html });
    }
    case 'crm.addContact': {
      const { email, firstName, phone } = task.payload;
      if (!email) throw new Error('crm.addContact requires email');

      const API_KEY = process.env.BREVO_API_KEY;
      const LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID;

      const url = process.env.BREVO_API_URL;

      const body = {
        email: email,
        attributes: { FIRSTNAME: firstName, PHONE: phone },
        listIds: [parseInt(LIST_ID, 10)],
        updateEnabled: true
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': API_KEY,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Brevo API error: ${res.status} ${errText}`);
      }

      return res.json();
    }
    default:
      throw new Error(`Unknown task type: ${task.type}`);
  }
}

async function processQueueOnce() {
  if (activeCount >= CONCURRENCY_LIMIT) return;
  const nowTs = now();
  queue.sort((a, b) => (a.nextRunAt - b.nextRunAt) || (a.createdAt - b.createdAt));
  for (const task of queue) {
    if (activeCount >= CONCURRENCY_LIMIT) break;
    if (task.nextRunAt > nowTs) continue;
    if (inProgress.has(task.id)) continue;

    activeCount++;
    inProgress.add(task.id);

    (async () => {
      try {
        const auth = getOAuthClient();
        const calendar = google.calendar({ version: "v3", auth });
        const sheets = google.sheets({ version: "v4", auth });

        await executeWithBackoffFn(() => executeTask(task, { sheets, transporter, calendar }), task.maxAttempts, 1000);

        queue = queue.filter(t => t.id !== task.id);
        await saveQueue();

        const p = promiseMap.get(task.id);
        if (p) { p.resolve({ ok: true, taskId: task.id }); promiseMap.delete(task.id); }
      } catch (err) {
        task.attempts = (task.attempts || 0) + 1;
        task.lastError = { message: err.message || String(err), stack: err.stack || null, time: now() };
        if (task.attempts >= task.maxAttempts) {
          queue = queue.filter(t => t.id !== task.id);
          await saveQueue();
          await saveDeadLetter({ ...task, failedAt: now(), finalError: task.lastError });
          const p = promiseMap.get(task.id);
          if (p) { p.reject({ ok: false, taskId: task.id, error: task.lastError }); promiseMap.delete(task.id); }
          console.error(`[queue] Task ${task.id} failed permanently`, task.lastError);
        } else {
          task.nextRunAt = now() + 1000 * Math.pow(2, task.attempts - 1);
          const idx = queue.findIndex(t => t.id === task.id);
          if (idx >= 0) queue[idx] = task;
          await saveQueue();
          console.warn(`[queue] Task ${task.id} failed (attempt ${task.attempts}). Will retry.`);
        }
      } finally {
        inProgress.delete(task.id);
        activeCount--;
        setTimeout(processQueueOnce, TASK_POLL_INTERVAL_MS);
      }
    })();
  }
}

let pollerStarted = false;
function startQueuePoller() {
  if (pollerStarted) return;
  pollerStarted = true;
  (async function poller() {
    try { await processQueueOnce(); } 
    catch (err) { console.error("[queue] Poller error:", err); }
    finally { setTimeout(poller, TASK_POLL_INTERVAL_MS); }
  })();
}

// ===== 6️⃣ POST handler =====
export async function POST(req) {
  try {
    const data = await req.json();
    const { name, email, phone, company, website, industry, consultationType, message, consentNDPR, consentNewsletter, slotStart, slotEnd } = data;

    const cleanName = sanitizeString(name);
    const cleanEmail = sanitizeString(email);
    const cleanPhone = sanitizeString(phone);
    const cleanCompany = sanitizeString(company);
    const cleanWebsite = sanitizeString(website);
    const cleanIndustry = sanitizeString(industry);
    const cleanConsultationType = sanitizeString(consultationType);
    const cleanMessage = sanitizeString(message);
    if (!cleanName || !cleanEmail || !cleanPhone || !slotStart || !slotEnd || !cleanIndustry || !cleanConsultationType) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    if (!isValidEmail(cleanEmail)) return new Response(JSON.stringify({ error: "Invalid email format" }), { status: 400 });
    if (!consentNDPR) return new Response(JSON.stringify({ error: "NDPR consent required" }), { status: 400 });
    if (consentNewsletter) {
        await enqueueTask(
          'crm.addContact',
          {
            email: cleanEmail,
            firstName: cleanName,
            phone: cleanPhone,
          },
          { maxAttempts: DEFAULT_MAX_ATTEMPTS }
        );
      }

    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });
    const calendars = [process.env.PRIMARY_CALENDAR_ID, process.env.SECONDARY_CALENDAR_ID].filter(Boolean);
    if (!calendars.length) throw new Error("No calendar IDs configured");

    const fb = await calendar.freebusy.query({
      requestBody: { timeMin: slotStart, timeMax: slotEnd, items: [{ id: calendars[0] }] }
    });
    if ((fb.data.calendars[calendars[0]]?.busy || []).length) {
      return new Response(JSON.stringify({ error: "Selected slot is already booked" }), { status: 409 });
    }

    const eventBody = {
      summary: `Consultation: ${cleanName} — ${cleanConsultationType}`,
      description: [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Phone: ${cleanPhone}`,
        cleanCompany ? `Company: ${cleanCompany}` : null,
        cleanWebsite ? `Website: ${cleanWebsite}` : null,
        `Industry: ${cleanIndustry}`,
        `Consultation Type: ${cleanConsultationType}`,
        `Message: ${cleanMessage || '(none)'}`,
        `Consent NDPR: ${consentNDPR ? 'Yes' : 'No'}`,
        `Subscribe newsletter: ${consentNewsletter ? 'Yes' : 'No'}`,
      ].filter(Boolean).join("\n"),
      start: { dateTime: slotStart, timeZone: "Africa/Lagos" },
      end: { dateTime: slotEnd, timeZone: "Africa/Lagos" },
      attendees: [{ email: cleanEmail }],
      conferenceData: { createRequest: { requestId: `meet-${crypto.randomUUID()}`, conferenceSolutionKey: { type: "hangoutsMeet" } } },
      reminders: { useDefault: true },
    };

    let createdEvent = null;
    const insertedCalendarIds = [];
    for (const calId of calendars) {
      try {
        const inserted = await executeWithBackoffFn(() => calendar.events.insert({
          calendarId: calId,
          requestBody: eventBody,
          conferenceDataVersion: 1,
          sendUpdates: "all",
        }), 4, 800);
        insertedCalendarIds.push(calId);
        if (!createdEvent) createdEvent = inserted.data;
      } catch (err) {
        console.error(`[calendar] Failed to insert into ${calId}:`, err);
      }
    }
    if (!createdEvent) return new Response(JSON.stringify({ error: "Failed to create calendar event" }), { status: 500 });

    const meetLink = createdEvent?.conferenceData?.entryPoints?.find(ep => ep.entryPointType === "video")?.uri || createdEvent?.hangoutLink || null;
    const eventId = createdEvent.id;

    // ENQUEUE non-critical tasks
    const rowValues = [new Date().toISOString(), cleanName, cleanEmail, cleanPhone, cleanCompany || "", cleanWebsite || "", cleanIndustry, cleanConsultationType, slotStart, slotEnd, cleanMessage || "", consentNDPR ? "Yes" : "No", consentNewsletter ? "Yes" : "No", meetLink || "", eventId || ""];
    const sheetTask = await enqueueTask("sheets.append", { spreadsheetId: process.env.GOOGLE_SHEET_ID, range: "Bookings!A1", values: [rowValues] }, { maxAttempts: DEFAULT_MAX_ATTEMPTS });

    // Admin emails
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim()).filter(Boolean);
    const adminBody = [`New booking received:\nName: ${cleanName}\nEmail: ${cleanEmail}\nPhone: ${cleanPhone}\nIndustry: ${cleanIndustry}\nConsultation Type: ${cleanConsultationType}\nDate: ${slotStart} - ${slotEnd}\nMessage: ${cleanMessage || '(none)'}\nMeet Link: ${meetLink || 'N/A'}\nEvent ID: ${eventId}`].join("\n");
    const adminTaskPromises = [];
    for (const admin of adminEmails) {
      adminTaskPromises.push(await enqueueTask("email.send", { from: `"OmoolaEx Bookings" <${process.env.SMTP_USER}>`, to: admin, subject: `New Booking: ${cleanName}`, text: adminBody }, { maxAttempts: DEFAULT_MAX_ATTEMPTS }));
    }

    // Client email
    const clientTask = await enqueueTask("email.send", { from: `"OmoolaEx Bookings" <${process.env.SMTP_USER}>`, to: cleanEmail, subject: `Your OmoolaEx Consultation — ${slotStart}`, text: `Hi ${cleanName},\nYour consultation is confirmed.\nDate: ${slotStart} - ${slotEnd}\nMeet link: ${meetLink || 'N/A'}\n\nOmoolaEx Team` }, { maxAttempts: DEFAULT_MAX_ATTEMPTS });

    startQueuePoller();

    sheetTask.promise.then(() => console.log(`[enqueue] Sheet task ${sheetTask.taskId} completed for booking ${eventId}`)).catch(err => console.warn(`[enqueue] Sheet task ${sheetTask.taskId} failed for booking ${eventId}`, err));

    return new Response(JSON.stringify({ success: true, meetLink, eventId, calendarsAdded: insertedCalendarIds, queued: { sheetTaskId: sheetTask.taskId, adminTaskIds: adminTaskPromises.map(t => t.taskId), clientTaskId: clientTask.taskId }, timestamp: new Date().toISOString() }), { status: 200 });

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    return new Response(JSON.stringify({ error: "Unexpected server error", detail: err.message }), { status: 500 });
  }
}

// ===== 7️⃣ Boot queue =====
loadQueue().then(() => startQueuePoller()).catch(err => console.error("[queue] Failed to load queue on startup:", err));
