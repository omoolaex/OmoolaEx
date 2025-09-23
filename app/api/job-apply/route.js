// File: /app/api/job-apply/route.js
'use server';

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Zoho SMTP transporter ---
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});

// --- POST handler ---
export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const position = formData.get("position");
    const linkedin = formData.get("linkedin");
    const resumeFile = formData.get("resume");
    const coverLetter = formData.get("coverLetter");

    // Convert file to buffer for email attachment
    let attachments = [];
    if (resumeFile && typeof resumeFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
        contentType: resumeFile.type || "application/octet-stream",
      });
    }

    // --- Send Admin Notification Email with resume attachment ---
    await transporter.sendMail({
      from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Job Application - ${position}`,
      html: `
        <h2>New Application Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Position:</b> ${position}</p>
        <p><b>LinkedIn:</b> ${linkedin}</p>
        <p><b>Cover Letter:</b> ${coverLetter}</p>
      `,
      attachments,
    });

    // --- Save entry to SheetDB 
    const sheetPayload = {
    Date: new Date().toISOString(),
    Name: name,
    Email: email,
    Phone: phone,
    Position: position,
    Linkedin: linkedin,
    Resume: resumeFile ? resumeFile.name : "N/A", // <-- store the file name
    "Cover Letter": coverLetter,
    };

    const sheetRes = await fetch(
      `${process.env.SHEETDB_API_URI}?sheet=Applications`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [sheetPayload] }),
      }
    );

    if (!sheetRes.ok) throw new Error("❌ Failed to save entry to Google Sheet.");

    // --- Send Applicant Confirmation Email (after 15 min) ---
    setTimeout(async () => {
      try {
        await transporter.sendMail({
          from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
          to: email,
          subject: "Your application at OmoolaEx",
          html: `
            <p>Hello ${name},</p>
            <p>Thank you for applying for the <b>${position}</b> role at OmoolaEx.</p>
            <p>We have received your application and will review it shortly.</p>
            <br/>
            <p>Best regards,</p>
            <p>The OmoolaEx Team</p>
          `,
        });
      } catch (err) {
        console.error("❌ Failed to send applicant confirmation:", err);
      }
    }, 15 * 60 * 1000);

    return NextResponse.json({ success: true, message: "Application submitted" });
  } catch (error) {
    console.error("Job Apply Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
