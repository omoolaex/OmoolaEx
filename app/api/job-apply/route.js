'use server'

import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
})

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

    let attachments = []
    if (resumeFile && typeof resumeFile.arrayBuffer === "function") {
      const buffer = Buffer.from(await resumeFile.arrayBuffer())
      attachments.push({
        filename: resumeFile.name,
        content: buffer,
        contentType: resumeFile.type || "application/octet-stream",
      })
    }

    // --- Send email to admin ---
    await transporter.sendMail({
      from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Career Application: ${position}`,
      html: `
        <h2>New Career Opportunity Application</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>LinkedIn/Portfolio:</b> ${linkedin}</p>
        <p><b>Programme & Role:</b> ${position}</p>
        <p><b>Cover Letter:</b> ${coverLetter}</p>
      `,
      attachments,
    })

    // --- Save to Google Sheet via SheetDB ---
    const sheetPayload = {
      Date: new Date().toISOString(),
      Name: name,
      Email: email,
      Phone: phone,
      Position: position,
      Linkedin: linkedin,
      Resume: resumeFile ? resumeFile.name : "N/A",
      "Cover Letter": coverLetter,
    }

    const sheetRes = await fetch(`${process.env.SHEETDB_API_URI}?sheet=Applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [sheetPayload] }),
    })

    if (!sheetRes.ok) throw new Error("Failed to save entry to Google Sheet")

    // --- Applicant confirmation email ---
    setTimeout(async () => {
      try {
        await transporter.sendMail({
          from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
          to: email,
          subject: "Application Received – OmoolaEx Careers",
          html: `
            <p>Dear ${name},</p>
            <p>Thank you for applying for the <b>${position}</b> opportunity at OmoolaEx.</p>
            <p>Your application has been received successfully. Our recruitment team will review your details and reach out if selected for the next stage.</p>
            <br/>
            <p>Warm regards,</p>
            <p><b>The OmoolaEx Team</b></p>
          `,
        })
      } catch (err) {
        console.error("Confirmation email failed:", err)
      }
    }, 15 * 60 * 1000)

    return NextResponse.json({ success: true, message: "Application submitted successfully." })
  } catch (error) {
    console.error("Career Application Error:", error)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
