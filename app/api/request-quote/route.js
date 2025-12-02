// app/api/request-quote/route.js
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
// MAIN ROUTE
// ==========================================
export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data = {};
    let attachments = [];

    // --------------------------------------
    // Handle JSON payload
    // --------------------------------------
    if (contentType.includes("application/json")) {
      const body = await req.json();
      data = {
        name: clean(body.name),
        email: clean(body.email),
        phone: clean(body.phone),
        company: clean(body.company),
        type: clean(body.type),
        budget: clean(body.budget),
        timeline: clean(body.timeline),
        message: clean(body.message),
        contactMethod: clean(body.contactMethod),
        discount: clean(body.discount),
        consent: body.consent === true,
      };
    }

    // --------------------------------------
    // Handle FormData (files)
    // --------------------------------------
    else if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();

      data = {
        name: clean(form.get("name")),
        email: clean(form.get("email")),
        phone: clean(form.get("phone")),
        company: clean(form.get("company")),
        type: clean(form.get("type")),
        budget: clean(form.get("budget")),
        timeline: clean(form.get("timeline")),
        message: clean(form.get("message")),
        contactMethod: clean(form.get("contactMethod")),
        discount: clean(form.get("discount")),
        consent: form.get("consent") === "true",
      };

      // File handling
      const file = form.get("file") || form.get("resume");
      if (file && typeof file.arrayBuffer === "function") {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type || "application/octet-stream",
        });
      }
    }

    // --------------------------------------
    // Basic validation + NDPR consent
    // --------------------------------------
    if (!data.name || !data.email || !data.type) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!data.consent) {
      return NextResponse.json(
        { success: false, error: "Consent required for submission" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();

    // IP Logging (required under NDPR)
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
      "Request Quotes!A1",
      [
        timestamp,
        data.name,
        data.email,
        data.phone,
        data.company,
        data.type,
        data.budget,
        data.timeline,
        data.contactMethod,
        data.discount,
        data.message,
        ip,
      ]
    );

    // --------------------------------------
    // Admin Email (professional format)
    // --------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx Quotes" <no-reply@omoolaex.com.ng>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quote Request — ${data.name}`,
      html: `
        <h2>New Quote Request</h2>

        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Company/LinkedIn:</b> ${data.company}</p>

        <p><b>Inquiry Type:</b> ${data.type}</p>
        <p><b>Budget:</b> ${data.budget}</p>
        <p><b>Timeline:</b> ${data.timeline}</p>
        <p><b>Preferred Contact:</b> ${data.contactMethod}</p>
        <p><b>Discount Code:</b> ${data.discount}</p>

        <p><b>Message:</b><br/>${data.message || "No message provided"}</p>

        <hr/>
        <p><b>IP Address:</b> ${ip}</p>
        <p><b>Submitted At:</b> ${timestamp}</p>
      `,
      attachments,
    });

    // --------------------------------------
    // Confirmation Email to Client
    // --------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx" <no-reply@omoolaex.com.ng>`,
      to: data.email,
      subject: `We received your quote request`,
      html: `
        <p>Hello ${data.name},</p>

        <p>Thank you for requesting a quote from <b>OmoolaEx IT Consultancy Ltd.</b></p>
        <p>Our team will review your request and respond within <b>24 hours</b>.</p>

        <p>For urgent inquiries, call: <b>+234 708 921 7123</b>.</p>

        <br/>
        <p>Warm regards,</p>
        <p><b>OmoolaEx Team</b></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[/api/request-quote] ERROR:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
