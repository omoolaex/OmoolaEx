import { processBatch } from "@/lib/queue";
import { google } from "googleapis";
import nodemailer from "nodemailer";

function getOAuthClient() {
  const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN)
    throw new Error("Missing Google OAuth environment variables");

  const client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
  client.setCredentials({ refresh_token: REFRESH_TOKEN });
  return client;
}

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: String(process.env.SMTP_PORT) === "465",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

// --------------------------------------------------
// Worker function
// --------------------------------------------------
async function workerFn(job) {
  const auth = getOAuthClient();
  const sheets = google.sheets({ version: "v4", auth });

  // Fallback logging for failed jobs
  const logFailure = async (error) => {
    console.error("[Job Failed]", job.type, error);

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: "JobFailures",
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [[
            new Date().toISOString(),
            job.type,
            JSON.stringify(job.payload),
            error.message || String(error)
          ]]
        }
      });
    } catch (e) {
      console.error("[Fallback Logging Failed]", e);
    }
  };

  try {
    switch (job.type) {
      case "sheets.append":
        return await sheets.spreadsheets.values.append({
          spreadsheetId: job.payload.spreadsheetId,
          range: job.payload.range, // should be just "Bookings"
          valueInputOption: "USER_ENTERED",
          insertDataOption: "INSERT_ROWS",
          requestBody: { values: job.payload.values }
        });

      case "email.send":
        return await transporter.sendMail(job.payload);

      case "crm.addContact":
        return await fetch(process.env.BREVO_API_URL, {
          method: "POST",
          headers: { "content-type": "application/json", "api-key": process.env.BREVO_API_KEY },
          body: JSON.stringify(job.payload),
        });

      default:
        throw new Error(`Unknown job type: ${job.type}`);
    }
  } catch (err) {
    await logFailure(err);
    throw err; // propagate error so processBatch can catch
  }
}

// --------------------------------------------------
// Endpoint
// --------------------------------------------------
export async function POST(req) {
  const token = req.headers.get("x-worker-token");
  if (token !== process.env.WORKER_TOKEN)
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  try {
    const result = await processBatch(workerFn, 10);
    return new Response(JSON.stringify({ ok: true, result }), { status: 200 });
  } catch (err) {
    console.error("[Worker POST Error]", err);
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 500 });
  }
}
