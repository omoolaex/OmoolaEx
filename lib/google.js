// lib/google.js
import { google } from "googleapis"
import { Readable } from "stream"

// -----------------------------------------------------
// OAUTH CLIENT
// -----------------------------------------------------
export function getOAuthClient() {
  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN)
    throw new Error("Missing Google OAuth environment variables")

  const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET)
  client.setCredentials({ refresh_token: REFRESH_TOKEN })
  return client
}

// -----------------------------------------------------
// GOOGLE DRIVE: UPLOAD FILE  (FIXED STREAM VERSION)
// -----------------------------------------------------
export async function uploadToDrive(auth, file, folderId) {
  const drive = google.drive({ version: "v3", auth })

  const buffer = Buffer.from(await file.arrayBuffer())

  // Convert Buffer → Readable Stream (fixes .pipe error)
  const stream = Readable.from(buffer)

  const res = await drive.files.create({
    requestBody: {
      name: `${Date.now()}_${file.name}`,
      parents: [folderId],
    },
    media: {
      mimeType: file.type || "application/octet-stream",
      body: stream   // FIXED: must be a stream
    },
    fields: "id, name, mimeType, webViewLink, webContentLink"
  })

  return res.data
}

// -----------------------------------------------------
// GOOGLE SHEETS: APPEND ROW
// -----------------------------------------------------
export async function appendToSheet(auth, spreadsheetId, range, values) {
  const sheets = google.sheets({ version: "v4", auth })

  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] }
  })
}

// -----------------------------------------------------
// TIMEZONE-SAFE DATE HELPERS
// -----------------------------------------------------
function partsInZone(dateStr, zone = "Africa/Lagos") {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) throw new Error("Invalid date string")

  const fmt = new Intl.DateTimeFormat("en", {
    timeZone: zone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false
  })

  const parts = fmt.formatToParts(d).reduce((acc, p) => {
    if (p.type !== "literal") acc[p.type] = p.value
    return acc
  }, {})

  return {
    year: parts.year, month: parts.month, day: parts.day,
    hour: parts.hour, minute: parts.minute, second: parts.second
  }
}

export function toLocalCalendarDateTime(dateStr, zone = "Africa/Lagos") {
  const p = partsInZone(dateStr, zone)
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}`
}

export function formatDisplay(dateStr, zone = "Africa/Lagos") {
  const p = partsInZone(dateStr, zone)
  return `${p.year}/${p.month}/${p.day} ${p.hour}:${p.minute}`
}
