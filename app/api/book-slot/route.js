// app/api/book-slot/route.js
import { google } from "googleapis";
import crypto from "crypto";
import { enqueueJob } from "@/lib/queue";
import nodemailer from "nodemailer";

import {
  getOAuthClient,
  toLocalCalendarDateTime
} from "@/lib/google";

// ---------------------------------------
// Utility helpers
// ---------------------------------------
const sanitize = s => (s ? String(s).trim() : "");
const isValidEmail = e => /^\S+@\S+\.\S+$/.test(e);
const pad = n => n.toString().padStart(2, "0");

// Convert JS Date to "MM/DD/YYYY HH:mm:ss" format
const formatDateTimeLocal = date => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

// ---------------------------------------
// Email transporter
// ---------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? "587", 10),
  secure: String(process.env.SMTP_PORT) === "465",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

// =======================================
// MAIN ROUTE
// =======================================
export async function POST(req) {
  try {
    const data = await req.json();

    // Extract and sanitize fields
    const name = sanitize(data.name);
    const email = sanitize(data.email);
    const phone = sanitize(data.phone);
    const company = sanitize(data.company);
    const website = sanitize(data.website);
    const industry = sanitize(data.industry);
    const consultationType = sanitize(data.consultationType);
    const message = sanitize(data.message);
    const consentNDPR = Boolean(data.consentNDPR);
    const consentNewsletter = Boolean(data.consentNewsletter);
    const slotStartRaw = sanitize(data.slotStart);
    const slotEndRaw = sanitize(data.slotEnd);

    // ---------------------------------------
    // Validation
    // ---------------------------------------
    if (!name || !email || !phone || !industry || !consultationType || !slotStartRaw || !slotEndRaw) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }
    if (!isValidEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    }
    if (!consentNDPR) {
      return new Response(JSON.stringify({ error: "NDPR consent required" }), { status: 400 });
    }

    // Parse dates
    const slotStart = new Date(slotStartRaw);
    const slotEnd = new Date(slotEndRaw);
    if (Number.isNaN(slotStart.getTime()) || Number.isNaN(slotEnd.getTime())) {
      return new Response(JSON.stringify({ error: "Invalid slot timestamps" }), { status: 400 });
    }
    if (slotEnd <= slotStart) {
      return new Response(JSON.stringify({ error: "Slot end must be after slot start" }), { status: 400 });
    }

    // =======================================
    // GOOGLE CALENDAR
    // =======================================
    const auth = getOAuthClient();
    const calendar = google.calendar({ version: "v3", auth });

    const calendars = [
      process.env.PRIMARY_CALENDAR_ID,
      process.env.SECONDARY_CALENDAR_ID
    ].filter(Boolean);

    if (!calendars.length) {
      return new Response(JSON.stringify({ error: "No calendars configured" }), { status: 500 });
    }

    // Free/busy check
    const fb = await calendar.freebusy.query({
      requestBody: {
        timeMin: slotStart.toISOString(),
        timeMax: slotEnd.toISOString(),
        items: [{ id: calendars[0] }],
        timeZone: "Africa/Lagos"
      }
    });

    const busySlots = fb.data.calendars?.[calendars[0]]?.busy ?? [];
    if (busySlots.length > 0) {
      return new Response(JSON.stringify({ error: "Selected slot already booked" }), { status: 409 });
    }

    // Convert datetimes to Lagos-local for Google Calendar
    const startLocal = toLocalCalendarDateTime(slotStartRaw, "Africa/Lagos");
    const endLocal = toLocalCalendarDateTime(slotEndRaw, "Africa/Lagos");

    const eventBody = {
      summary: `Consultation: ${name} — ${consultationType}`,
      description: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        company ? `Company: ${company}` : "",
        website ? `Website: ${website}` : "",
        `Industry: ${industry}`,
        `Consultation Type: ${consultationType}`,
        `Message: ${message || "(none)"}`,
        `Consent NDPR: Yes`,
        `Subscribe newsletter: ${consentNewsletter ? "Yes" : "No"}`
      ].filter(Boolean).join("\n"),
      start: { dateTime: startLocal, timeZone: "Africa/Lagos" },
      end: { dateTime: endLocal, timeZone: "Africa/Lagos" },
      attendees: [{ email }],
      reminders: { useDefault: true },
      conferenceData: {
        createRequest: {
          requestId: `meet-${crypto.randomUUID()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" }
        }
      }
    };

    // Insert into calendars
    let createdEvent = null;
    const addedCalendars = [];

    for (const calId of calendars) {
      try {
        const result = await calendar.events.insert({
          calendarId: calId,
          requestBody: eventBody,
          conferenceDataVersion: 1,
          sendUpdates: "all",
        });
        if (!createdEvent) createdEvent = result.data;
        addedCalendars.push(calId);
      } catch (err) {
        console.error(`[Calendar Insert Error: ${calId}]`, err);
      }
    }

    if (!createdEvent) {
      return new Response(JSON.stringify({ error: "Failed to create calendar event" }), { status: 500 });
    }

    const meetLink =
      createdEvent?.conferenceData?.entryPoints?.find(ep => ep.entryPointType === "video")?.uri ||
      createdEvent?.hangoutLink ||
      null;

    const eventId = createdEvent.id;

    // =======================================
    // SHEETS ENTRY (fixed date formatting)
    // =======================================
    const timestamp = new Date().toISOString();
    const displayStart = formatDateTimeLocal(slotStart);
    const displayEnd = formatDateTimeLocal(slotEnd);

    const rowValues = [
      timestamp,
      name,
      email,
      phone,
      company || "",
      website || "",
      industry,
      consultationType,
      displayStart, // now properly formatted
      displayEnd,   // now properly formatted
      message || "",
      "Yes",
      consentNewsletter ? "Yes" : "No",
      meetLink || "",
      eventId || ""
    ];

    await enqueueJob("sheets.append", {
      spreadsheetId: process.env.SHEET_ID,
      range: "Bookings", // remove "!A1" for proper append
      values: [rowValues]
    });

    // =======================================
    // ADMIN EMAIL(S)
    // =======================================
    const admins = (process.env.ADMIN_EMAILS || "")
      .split(",")
      .map(a => a.trim())
      .filter(Boolean);

    for (const admin of admins) {
      await enqueueJob("email.send", {
        from: `"OmoolaEx Bookings" <no-reply@omoolaex.com.ng>`,
        to: admin,
        subject: `New Booking: ${name}`,
        text: `New booking:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nIndustry: ${industry}\nType: ${consultationType}\nDate: ${displayStart} - ${displayEnd}\nMeet: ${meetLink ?? "N/A"}`
      });
    }

    // =======================================
    // CLIENT CONFIRMATION EMAIL
    // =======================================
    await enqueueJob("email.send", {
      from: `"OmoolaEx Bookings" <no-reply@omoolaex.com.ng>`,
      to: email,
      subject: `Your OmoolaEx Consultation — ${displayStart}`,
      text: `Hi ${name},\n\nYour consultation is confirmed.\nDate: ${displayStart} - ${displayEnd}\nMeet link: ${meetLink || "N/A"}\n\nOmoolaEx Team`
    });

    // CRM Add if subscribed
    if (consentNewsletter) {
      await enqueueJob("crm.addContact", {
        email,
        firstName: name,
        phone
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        eventId,
        meetLink,
        calendars: addedCalendars
      }),
      { status: 200 }
    );

  } catch (err) {
    console.error("[book-slot] ERROR:", err);
    return new Response(
      JSON.stringify({
        error: "Booking error",
        detail: err.message ?? String(err)
      }),
      { status: 500 }
    );
  }
}
