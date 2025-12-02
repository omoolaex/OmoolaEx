'use server'

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

import {
  getOAuthClient,
  uploadToDrive,
  appendToSheet
} from "@/lib/google"

// -----------------------------------------------------
// EMAIL TRANSPORT (Zoho)
// -----------------------------------------------------
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
})

// =======================================================
// MAIN ENDPOINT
// =======================================================
export async function POST(req) {
  try {
    const formData = await req.formData()

    const name = formData.get("name")
    const email = formData.get("email")
    const phone = formData.get("phone")
    const linkedin = formData.get("linkedin")
    const position = formData.get("position")
    const coverLetter = formData.get("coverLetter")
    const resumeFile = formData.get("resume")

    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      )
    }

    const auth = getOAuthClient()

    // -----------------------------------------------------
    // 1. Upload resume to Google Drive
    // -----------------------------------------------------
    let driveFile = null

    if (resumeFile && typeof resumeFile.arrayBuffer === "function") {
      driveFile = await uploadToDrive(
        auth,
        resumeFile,
        process.env.GDRIVE_APPLICATIONS_FOLDER_ID
      )
    }

    // -----------------------------------------------------
    // 2. Append to Google Sheets
    // -----------------------------------------------------
    const timestamp = new Date().toISOString()

    await appendToSheet(auth, process.env.SHEET_ID, "Applications!A1", [
      timestamp,
      name,
      email,
      phone,
      position,
      linkedin || "",
      driveFile?.webViewLink || "",
      driveFile?.id || "",
      coverLetter || ""
    ])

    // -----------------------------------------------------
    // 3. Notify Admin
    // -----------------------------------------------------
    await transporter.sendMail({
      from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      subject: `New Application — ${position}`,
      html: `
        <h2>New Career Application</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>LinkedIn/Portfolio:</b> ${linkedin}</p>
        <p><b>Role:</b> ${position}</p>
        <p><b>Cover Letter:</b> ${coverLetter}</p>
        ${
          driveFile
            ? `<p><b>Resume:</b> <a href="${driveFile.webViewLink}">View File</a></p>`
            : `<p><b>Resume:</b> No file uploaded</p>`
        }
      `,
    })

    // -----------------------------------------------------
    // 4. Confirmation to Applicant (delayed)
    // -----------------------------------------------------
    setTimeout(() => {
      transporter.sendMail({
        from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
        to: email,
        subject: "Application Received — OmoolaEx Careers",
        html: `
          <p>Dear ${name},</p>
          <p>Thank you for applying for the <b>${position}</b> position at OmoolaEx.</p>
          <p>Your application has been received. Our team will review it and reach out if you are shortlisted.</p>
          <br/>
          <p>Warm regards,<br/><b>OmoolaEx Team</b></p>
        `,
      }).catch(err => console.error("Applicant email failed:", err))
    }, 10_000)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error("Job Application Error:", error)
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
