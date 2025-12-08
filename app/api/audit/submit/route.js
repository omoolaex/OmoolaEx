'use server'

import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import { getOAuthClient, appendToSheet } from "@/lib/google"

// Optional: email notifications
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
    const body = await req.json()
    const { businessInfo, responses } = body

    if (!businessInfo || !responses || !businessInfo.companyName || !businessInfo.email) {
      return NextResponse.json(
        { success: false, message: "Missing required business info or responses" },
        { status: 400 }
      )
    }

    // ------------------- Compute Scores -------------------
    let totalScore = 0
    const categoryScores = {}

    responses.forEach(({ value, category }) => {
      totalScore += value
      if (!categoryScores[category]) categoryScores[category] = { score: 0, count: 0 }
      categoryScores[category].score += value
      categoryScores[category].count += 1
    })

    // Max option value is 3 per question
    const categoryScoreArray = Object.keys(categoryScores).map((cat) => {
      const cs = categoryScores[cat]
      const percent = Math.round((cs.score / (cs.count * 3)) * 100)
      const riskLevel =
        percent >= 80 ? "low" :
        percent >= 60 ? "medium" :
        percent >= 40 ? "high" : "critical"
      return { category: cat, score: cs.score, maxScore: cs.count * 3, percentage: percent, riskLevel }
    })

    const overallPercentage = Math.round((totalScore / (responses.length * 3)) * 100)
    const overallRiskLevel =
      overallPercentage >= 80 ? "low" :
      overallPercentage >= 60 ? "medium" :
      overallPercentage >= 40 ? "high" : "critical"

    const resultId = randomUUID()
    const timestamp = new Date().toISOString()

    // ------------------- Append to Google Sheets -------------------
    const auth = getOAuthClient()
    // NOTE: Sheet tab should be named "Audit" (no ! or A1)
    await appendToSheet(auth, process.env.SHEET_ID, "Audit", [
      resultId,
      timestamp,
      businessInfo.companyName,
      businessInfo.industry || "",
      businessInfo.companySize || "",
      businessInfo.email,
      totalScore,
      overallPercentage,
      overallRiskLevel,
      JSON.stringify(categoryScoreArray),
      "AI recommendations pending"
    ])

    // ------------------- Optional: Notify Admin -------------------
    if (process.env.AUDIT_ADMIN_EMAIL) {
      transporter.sendMail({
        from: `"OmoolaEx Audit" <${process.env.ZOHO_USER}>`,
        to: process.env.AUDIT_ADMIN_EMAIL,
        subject: `New Audit Submitted — ${businessInfo.companyName}`,
        html: `
          <h2>New Audit Submission</h2>
          <p><b>Company:</b> ${businessInfo.companyName}</p>
          <p><b>Email:</b> ${businessInfo.email}</p>
          <p><b>Total Score:</b> ${totalScore}</p>
          <p><b>Overall Risk:</b> ${overallRiskLevel}</p>
          <p><b>Timestamp:</b> ${timestamp}</p>
        `
      }).catch(err => console.error("Audit admin email failed:", err))
    }

    // ------------------- Return Result -------------------
    return NextResponse.json({
      success: true,
      data: {
        id: resultId,
        overallScore: totalScore,
        overallPercentage,
        riskLevel: overallRiskLevel,
        categoryScores: categoryScoreArray,
        recommendations: "AI recommendations pending",
        timestamp
      }
    })

  } catch (error) {
    console.error("[/api/audit/submit] ERROR:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Server error" },
      { status: 500 }
    )
  }
}
