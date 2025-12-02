// app/api/contact/route.js
'use server';

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import {
  getOAuthClient,
  uploadToDrive,
  appendToSheet
} from "@/lib/google";

// ------------------------------------------
// Zoho Email Transporter
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

// ------------------------------------------
// Department routing map
// ------------------------------------------
const departmentEmails = {
  "General Inquiry": process.env.CONTACT_EMAIL,
  "Request IT Consulting": process.env.CONSULTING_EMAIL,
  "Partnership / Collaboration": process.env.PARTNERSHIPS_EMAIL,
  "Press / Media": process.env.MEDIA_EMAIL,
  "Careers / Volunteering": process.env.CAREERS_EMAIL,
  Other: process.env.CONTACT_EMAIL,
};

// ------------------------------------------
// Sanitizer
// ------------------------------------------
const clean = (value) =>
  value
    ? String(value).trim().replace(/[<>]/g, "").replace(/\r?\n|\r/g, " ")
    : "N/A";

// ==========================================
// MAIN HANDLER
// ==========================================
export async function POST(req) {
  try {
    const formData = await req.formData();

    // --------------------------------------
    // IP (for NDPR audit)
    // --------------------------------------
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "Unknown";

    // --------------------------------------
    // Sanitize inputs
    // --------------------------------------
    const name = clean(formData.get("name"));
    const email = clean(formData.get("email"));
    const phone = clean(formData.get("phone"));
    const company = clean(formData.get("company"));
    const website = clean(formData.get("website"));
    const reason = clean(formData.get("reason"));
    const projectType = clean(formData.get("projectType"));
    const subject = clean(formData.get("subject"));
    const message = clean(formData.get("message"));
    const budget = clean(formData.get("budget"));
    const timeline = clean(formData.get("timeline"));

    const consent = formData.get("consent") === "true";
    const consentNewsletter =
      formData.get("consentNewsletter") === "true" ||
      formData.get("consentNewsletter") === true;

    const consentTimestamp = new Date().toISOString();

    const attachment = formData.get("attachment");

    if (!consent) {
      return NextResponse.json(
        { success: false, error: "NDPR consent is required." },
        { status: 400 }
      );
    }

    // --------------------------------------
    // Google OAuth Client
    // --------------------------------------
    const auth = getOAuthClient();

    // --------------------------------------
    // Upload attachment to Google Drive (optional)
    // --------------------------------------
    let driveFile = null;

    if (attachment && typeof attachment.arrayBuffer === "function") {
      driveFile = await uploadToDrive(
        auth,
        attachment,
        process.env.GDRIVE_CONTACTS_FOLDER_ID
      );
    }

    // --------------------------------------
    // Determine department email
    // --------------------------------------
    const adminEmail =
      departmentEmails[reason] || process.env.CONTACT_EMAIL;

    // --------------------------------------
    // Admin Email
    // --------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx Enquiries" <no-reply@omoolaex.com.ng>`,
      to: adminEmail,
      subject: `New Contact — ${reason} — ${
        subject !== "N/A" ? subject : name
      }`,
      html: `
        <h2>New Contact Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Website:</b> ${website}</p>
        <p><b>Reason:</b> ${reason}</p>
        <p><b>Project Type:</b> ${projectType}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Budget:</b> ${budget}</p>
        <p><b>Timeline:</b> ${timeline}</p>
        <p><b>Message:</b> ${message}</p>
        ${
          driveFile
            ? `<p><b>Attachment:</b> <a href="${driveFile.webViewLink}">Open File</a></p>`
            : `<p><b>Attachment:</b> None</p>`
        }
        <hr/>
        <p><b>Consent Timestamp:</b> ${consentTimestamp}</p>
        <p><b>IP Address:</b> ${ip}</p>
        <p><small>Logged at ${new Date().toLocaleString()}</small></p>
      `,
    });

    // --------------------------------------
    // Log to Google Sheets
    // --------------------------------------
    await appendToSheet(
      auth,
      process.env.SHEET_ID,
      "Contacts!A1",
      [
        consentTimestamp,
        name,
        email,
        phone,
        company,
        website,
        reason,
        projectType,
        subject,
        message,
        budget,
        timeline,
        driveFile?.webViewLink || "None",
        driveFile?.id || "",
        ip,
        consentNewsletter ? "Yes" : "No",
      ]
    );

    // --------------------------------------
    // Brevo Newsletter Sync (if opted-in)
    // --------------------------------------
    if (consentNewsletter && email) {
      try {
        const BREVO_LIST_ID = parseInt(
          process.env.BREVO_NEWSLETTER_LIST_ID,
          10
        );

        await fetch(process.env.BREVO_API_URL, {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            email,
            attributes: { FIRSTNAME: name, PHONE: phone },
            listIds: [BREVO_LIST_ID],
            updateEnabled: true,
          }),
        });
      } catch (err) {
        console.error("Brevo sync failed:", err);
      }
    }

    // --------------------------------------
    // Confirmation email (delayed)
    // --------------------------------------
    setTimeout(() => {
      transporter.sendMail({
        from: `"OmoolaEx Enquiries" <no-reply@omoolaex.com.ng>`,
        to: email,
        subject: "We received your message — OmoolaEx",
        html: `
          <p>Hello ${name},</p>
          <p>Thank you for reaching out to <b>OmoolaEx IT Consultancy Ltd.</b></p>
          <p>Your message has been received regarding <b>${reason}</b>.</p>
          <p>Our team will get back to you within <b>1–2 business days</b>.</p>

          ${
            reason === "Request IT Consulting"
              ? `<p>You can also explore our <a href="https://omoolaex.com.ng/faq" target="_blank">FAQ page</a>.</p>`
              : ""
          }

          <p>If this is urgent, call <b>+234 708 921 7123</b>.</p>

          <br/>
          <p>Warm regards,<br/><b>The OmoolaEx Team</b></p>
        `,
      });
    }, 3_000);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("[/api/contact] ERROR:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
