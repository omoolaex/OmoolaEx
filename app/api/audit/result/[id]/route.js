'use server'

import { NextResponse } from "next/server"
import { getOAuthClient } from "@/lib/google"

export async function GET(req, context) {
  try {
    const params = await context.params
    const { id } = params

    if (!id) return NextResponse.json({ success: false, message: "Missing audit ID" }, { status: 400 })

    const auth = getOAuthClient()
    const { google } = await import("googleapis")
    const sheets = google.sheets({ version: "v4", auth })
    const SHEET_ID = process.env.SHEET_ID

    // ✅ Fix: valid range syntax, fetch all rows from columns A–K
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Audit!A:K",
    })

    const rows = response.data.values || []
    const row = rows.find(r => r[0] === id)

    if (!row) return NextResponse.json({ success: false, message: "Audit result not found" }, { status: 404 })

    const data = {
      id: row[0],
      timestamp: row[1],
      businessInfo: {
        companyName: row[2],
        industry: row[3],
        companySize: row[4],
        email: row[5],
      },
      overallScore: parseInt(row[6], 10),
      overallPercentage: parseInt(row[7], 10),
      riskLevel: row[8],
      categoryScores: JSON.parse(row[9]),
      recommendations: row[10],
    }

    return NextResponse.json({ success: true, data })

  } catch (err) {
    console.error("[/api/audit/result] ERROR:", err)
    return NextResponse.json({ success: false, message: err.message || "Server error" }, { status: 500 })
  }
}
