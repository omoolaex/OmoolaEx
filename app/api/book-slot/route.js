// app/api/book-slot/route.js
import { google } from "googleapis";
import crypto from "crypto";
import { enqueueJob } from "@/lib/queue";
import nodemailer from "nodemailer";

function getOAuthClient() {
  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) throw new Error("Missing Google OAuth env vars");
  const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return client;
}

function sanitizeString(s){ return s ? String(s).trim() : ""; }
function isValidEmail(e){ return /^\S+@\S+\.\S+$/.test(e); }

// Format a Date/ISO string into parts in a specific timezone (returns object)
function partsInZone(dateStr, zone = "Africa/Lagos") {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date string");
  const fmt = new Intl.DateTimeFormat("en", {
    timeZone: zone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false
  });
  const parts = fmt.formatToParts(d).reduce((acc, p) => {
    if (p.type !== "literal") acc[p.type] = p.value;
    return acc;
  }, {});
  return {
    year: parts.year, month: parts.month, day: parts.day,
    hour: parts.hour, minute: parts.minute, second: parts.second
  };
}

// Build Google Calendar local dateTime string: "YYYY-MM-DDTHH:MM:SS"
function toLocalCalendarDateTime(dateStr, zone = "Africa/Lagos") {
  const p = partsInZone(dateStr, zone);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}`;
}

// Build clean display string: "YYYY/MM/DD HH:MM"
function formatDisplay(dateStr, zone = "Africa/Lagos") {
  const p = partsInZone(dateStr, zone);
  return `${p.year}/${p.month}/${p.day} ${p.hour}:${p.minute}`;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: String(process.env.SMTP_PORT) === '465',
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

export async function POST(req) {
  try {
    const data = await req.json();

    const name = sanitizeString(data.name);
    const email = sanitizeString(data.email);
    const phone = sanitizeString(data.phone);
    const company = sanitizeString(data.company);
    const website = sanitizeString(data.website);
    const industry = sanitizeString(data.industry);
    const consultationType = sanitizeString(data.consultationType);
    const message = sanitizeString(data.message);
    const consentNDPR = Boolean(data.consentNDPR);
    const consentNewsletter = Boolean(data.consentNewsletter);
    const slotStartRaw = sanitizeString(data.slotStart || "");
    const slotEndRaw = sanitizeString(data.slotEnd || "");

    if (!name || !email || !phone || !slotStartRaw || !slotEndRaw || !industry || !consultationType) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    if (!isValidEmail(email)) return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    if (!consentNDPR) return new Response(JSON.stringify({ error: "NDPR consent required" }), { status: 400 });

    // Validate date strings
    const slotStartDate = new Date(slotStartRaw);
    const slotEndDate = new Date(slotEndRaw);
    if (Number.isNaN(slotStartDate.getTime()) || Number.isNaN(slotEndDate.getTime())) {
      return new Response(JSON.stringify({ error: "Invalid slot timestamps" }), { status: 400 });
    }
    if (slotEndDate <= slotStartDate) {
      return new Response(JSON.stringify({ error: "Slot end must be after slot start" }), { status: 400 });
    }

    // Calendar event
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });
    const calendars = [process.env.PRIMARY_CALENDAR_ID, process.env.SECONDARY_CALENDAR_ID].filter(Boolean);
    if (!calendars.length) return new Response(JSON.stringify({ error: "No calendars configured" }), { status: 500 });

    // Freebusy check: use canonical UTC ISO instants for the query (server-friendly)
    const fbStart = slotStartDate.toISOString();
    const fbEnd = slotEndDate.toISOString();
    const fb = await calendar.freebusy.query({
      requestBody: {
        timeMin: fbStart,
        timeMax: fbEnd,
        timeZone: "Africa/Lagos",
        items: [{ id: calendars[0] }],
      }
    });
    if ((fb.data.calendars?.[calendars[0]]?.busy || []).length) {
      return new Response(JSON.stringify({ error: "Selected slot already booked" }), { status: 409 });
    }

    // Convert to local calendar dateTimes (no Z) and set timeZone explicitly
    const startLocal = toLocalCalendarDateTime(slotStartRaw, "Africa/Lagos");
    const endLocal = toLocalCalendarDateTime(slotEndRaw, "Africa/Lagos");

    const eventBody = {
      summary: `Consultation: ${name} — ${consultationType}`,
      description: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        company ? `Company: ${company}` : null,
        website ? `Website: ${website}` : null,
        `Industry: ${industry}`,
        `Consultation Type: ${consultationType}`,
        `Message: ${message || '(none)'}`,
        `Consent NDPR: ${consentNDPR ? 'Yes' : 'No'}`,
        `Subscribe newsletter: ${consentNewsletter ? 'Yes' : 'No'}`,
      ].filter(Boolean).join("\n"),
      start: { dateTime: startLocal, timeZone: "Africa/Lagos" },
      end: { dateTime: endLocal, timeZone: "Africa/Lagos" },
      attendees: [{ email }],
      conferenceData: { createRequest: { requestId: `meet-${crypto.randomUUID()}`, conferenceSolutionKey: { type: "hangoutsMeet" } } },
      reminders: { useDefault: true },
    };

    let createdEvent = null;
    const addedCalendars = [];
    for (const calId of calendars) {
      try {
        const inserted = await calendar.events.insert({
          calendarId: calId,
          requestBody: eventBody,
          conferenceDataVersion: 1,
          sendUpdates: "all",
        });
        if (!createdEvent) createdEvent = inserted.data;
        addedCalendars.push(calId);
      } catch (err) {
        console.error(`[calendar] Insert into ${calId} failed:`, err);
      }
    }

    if (!createdEvent) return new Response(JSON.stringify({ error: "Failed to create calendar event" }), { status: 500 });

    const meetLink = createdEvent?.conferenceData?.entryPoints?.find(ep => ep.entryPointType === "video")?.uri || createdEvent?.hangoutLink || null;
    const eventId = createdEvent.id;

    // Clean display strings for sheets and emails
    const displayStart = formatDisplay(slotStartRaw, "Africa/Lagos"); // YYYY/MM/DD HH:MM
    const displayEnd = formatDisplay(slotEndRaw, "Africa/Lagos");     // YYYY/MM/DD HH:MM

    // Enqueue jobs
    const timestamp = new Date().toISOString(); // UTC record for audit (keeps canonical)
    const safeCompany = company || "";
    const safeWebsite = website || "";
    const safeMessage = message || "";

    const rowValues = [
      timestamp,
      name,
      email,
      phone,
      safeCompany,
      safeWebsite,
      industry,
      consultationType,
      displayStart,
      displayEnd,
      safeMessage,
      consentNDPR ? "Yes" : "No",
      consentNewsletter ? "Yes" : "No",
      meetLink || "",
      eventId || ""
    ];

    await enqueueJob("sheets.append", { spreadsheetId: process.env.SHEET_ID, range: "Bookings!A1", values: [rowValues] });

    const admins = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim()).filter(Boolean);
    for (const admin of admins) {
      await enqueueJob("email.send", {
        from: `"OmoolaEx Bookings" <no-reply@omoolaex.com.ng>`,
        to: admin,
        subject: `New Booking: ${name}`,
        text: `New booking:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nIndustry: ${industry}\nType: ${consultationType}\nDate: ${displayStart} - ${displayEnd}\nMeet: ${meetLink || "N/A"}`
      });
    }

    await enqueueJob("email.send", {
      from: `"OmoolaEx Bookings" <no-reply@omoolaex.com.ng>`,
      to: email,
      subject: `Your OmoolaEx Consultation — ${displayStart}`,
      text: `Hi ${name},\n\nYour consultation is confirmed.\nDate: ${displayStart} - ${displayEnd}\nMeet link: ${meetLink || 'N/A'}\n\nOmoolaEx Team`
    });

    if (consentNewsletter) {
      await enqueueJob("crm.addContact", { email, firstName: name, phone });
    }

    return new Response(JSON.stringify({ success: true, eventId, meetLink, calendars: addedCalendars }), { status: 200 });

  } catch (err) {
    console.error("[book-slot] ERROR:", err);
    return new Response(JSON.stringify({ error: "Booking error", detail: String(err.message || err) }), { status: 500 });
  }
}
