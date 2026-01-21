'use server'

import { NextResponse } from "next/server"
import { getOAuthClient, uploadToDrive } from "@/lib/google"
import { enqueueJob } from "@/lib/queue"

export async function POST(req) {
  try {
    const formData = await req.formData()

    const name = formData.get("name")?.toString().trim()
    const email = formData.get("email")?.toString().trim()
    const phone = formData.get("phone")?.toString().trim()
    const linkedin = formData.get("linkedin")?.toString().trim()
    const position = formData.get("position")?.toString().trim()
    const coverLetter = formData.get("coverLetter")?.toString().trim()
    const resumeFile = formData.get("resume")

    if (!name || !email || !phone || !position) {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const auth = getOAuthClient()
    let driveFile = null

    if (resumeFile && typeof resumeFile.arrayBuffer === "function") {
      driveFile = await uploadToDrive(
        auth,
        resumeFile,
        process.env.GDRIVE_APPLICATIONS_FOLDER_ID
      )
    }

    const timestamp = new Date().toISOString()

    await enqueueJob("sheets.append", {
      source: "job-apply",
      spreadsheetId: process.env.SHEET_ID,
      range: "Applications!A1",
      values: [[
        timestamp,
        name,
        email,
        phone,
        position,
        linkedin || "",
        driveFile?.webViewLink || "",
        driveFile?.id || "",
        coverLetter || ""
      ]]
    })

    await enqueueJob("email.send", {
      from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      subject: `New Application — ${position}`,
      html: `<p>${name} applied for ${position}</p>`
    })

    await enqueueJob("email.send", {
      from: `"OmoolaEx Careers" <${process.env.ZOHO_USER}>`,
      to: email,
      subject: "Application Received — OmoolaEx",
      html: `<p>Dear ${name}, your application has been received.</p>`
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error("[job-apply]", err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
