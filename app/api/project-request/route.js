// app/api/project-request/route.js
'use server';

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import {
  getOAuthClient,
  appendToSheet,
} from "@/lib/google";

// ------------------------------------------
// Sanitizer
// ------------------------------------------
function clean(v) {
  return v
    ? String(v)
        .trim()
        .replace(/[<>]/g, "")
        .replace(/\r?\n|\r/g, " ")
    : "N/A";
}

// ------------------------------------------
// Zoho Transporter
// ------------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: parseInt(process.env.SMTP_PORT ?? "465", 10),
  secure: String(process.env.SMTP_SECURE ?? "true") === "true",
  auth: {
    user: process.env.ZOHO_ADMIN_USER,
    pass: process.env.ZOHO_PASS,
  },
});

// ==========================================
// MAIN ROUTE HANDLER
// ==========================================
export async function POST(req) {
  try {
    const body = await req.json();

    const fullName = clean(body.fullName);
    const company = clean(body.company);
    const email = clean(body.email);
    const phone = clean(body.phone);
    const websiteType = clean(body.websiteType);
    const timeline = clean(body.timeline);
    const goals = clean(body.goals);
    const pkg = clean(body.package);
    const packagePrice = clean(body.packagePrice);
    const packageFeatures = Array.isArray(body.packageFeatures)
      ? body.packageFeatures.map(clean)
      : [];

    // NDPR consent (required)
    const consent = body.consent === true;
    const consentTimestamp = new Date().toISOString();

    if (!fullName || !email || !pkg || !consent) {
      return NextResponse.json(
        { error: "Missing required fields or consent" },
        { status: 400 }
      );
    }

    // IP Address
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    // --------------------------------------
    // Google OAuth Client
    // --------------------------------------
    const auth = getOAuthClient();

    // --------------------------------------
    // Log to Google Sheets
    // --------------------------------------
    await appendToSheet(
      auth,
      process.env.SHEET_ID,
      "Project Requests!A1",
      [
        consentTimestamp,       // Timestamp
        fullName,
        company,
        email,
        phone,
        websiteType,
        timeline,
        goals,
        pkg,
        packagePrice,
        packageFeatures.join(", "),
        ip,
      ]
    );

    // --------------------------------------
    // Admin Email (Your inbox)
    // --------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx Project Requests" <no-reply@omoolaex.com.ng>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New ${pkg} Project Request — ${fullName}`,
      html: `
        <h2>New Website Project Request</h2>

        <p><b>Name:</b> ${fullName}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>

        <p><b>Website Type:</b> ${websiteType}</p>
        <p><b>Timeline:</b> ${timeline}</p>
        <p><b>Goals:</b> ${goals}</p>

        <hr/>

        <h3>Selected Package</h3>
        <p><b>${pkg}</b> — ${packagePrice}</p>
        <ul>
          ${packageFeatures.map((f) => `<li>${f}</li>`).join("")}
        </ul>

        <hr/>
        <p><b>Consent Timestamp:</b> ${consentTimestamp}</p>
        <p><b>IP Address:</b> ${ip}</p>
      `,
    });

    // --------------------------------------
    // Confirmation Email to Client
    // --------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx" <no-reply@omoolaex.com.ng>`,
      to: email,
      subject: `We received your ${pkg} Project Request`,
      html: `
        <p>Hello ${fullName},</p>

        <p>Thank you for requesting our <b>${pkg}</b> website development package.</p>
        <p>Your project request has been received successfully, and our team will reach out to you within <b>24 hours</b>.</p>

        <p>For urgent inquiries, you may call: <b>+234 708 921 7123</b>.</p>

        <br/>
        <p>Warm regards,</p>
        <p><b>OmoolaEx Team</b></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/project-request] ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
