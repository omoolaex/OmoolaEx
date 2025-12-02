// app/api/lead/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import {
  getOAuthClient,
  appendToSheet
} from "@/lib/google";

// -------------------------------------------
// Email transporter
// -------------------------------------------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? "587", 10),
  secure: String(process.env.SMTP_PORT) === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: { rejectUnauthorized: false }
});

// -------------------------------------------
// Utility
// -------------------------------------------
const clean = (s) => (s ? String(s).trim() : "");

function isValidEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

// ===========================================
// MAIN ROUTE
// ===========================================
export async function POST(req) {
  try {
    const data = await req.json();

    const name = clean(data.name);
    const email = clean(data.email);
    const organization = clean(data.organization);
    const role = clean(data.role);
    const resourceTitle = clean(data.resource);
    const downloadUrl = clean(data.downloadUrl);

    if (!name || !email || !resourceTitle || !downloadUrl) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // -------------------------------------------
    // Google Sheets: Save lead entry
    // -------------------------------------------
    const auth = getOAuthClient();

    await appendToSheet(
      auth,
      process.env.SHEET_ID,
      "Leads!A1",
      [
        timestamp,
        name,
        email,
        organization || "",
        role || "",
        resourceTitle,
        downloadUrl
      ]
    );

    // -------------------------------------------
    // Admin email notification
    // -------------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx Leads" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAILS,  // comma-separated emails
      subject: `New Resource Lead — ${resourceTitle}`,
      html: `
        <h2>New Library Lead Captured</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Organization:</b> ${organization}</p>
        <p><b>Role:</b> ${role}</p>
        <p><b>Resource:</b> ${resourceTitle}</p>
        <p><b>Download Link:</b> <a href="${downloadUrl}" target="_blank">Open File</a></p>
        <hr/>
        <p>Captured at: ${timestamp}</p>
      `
    });

    // -------------------------------------------
    // Lead confirmation email
    // -------------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx Library" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Your Download — ${resourceTitle}`,
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for accessing our resource: <b>${resourceTitle}</b>.</p>
        <p>You can download it anytime using the link below:</p>
        <p><a href="${downloadUrl}" target="_blank">Click to Download</a></p>
        <br/>
        <p>Warm regards,<br/>OmoolaEx Team</p>
      `
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[lead] ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Lead capture error", detail: err.message },
      { status: 500 }
    );
  }
}
