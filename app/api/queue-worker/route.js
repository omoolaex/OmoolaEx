// worker/api/queue-worker/route.js
import { processBatch } from "@/lib/queue";
import { google } from "googleapis";
import nodemailer from "nodemailer";

function getOAuthClient() {
  const client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  return client;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: String(process.env.SMTP_PORT) === "465",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

async function workerFn(job) {
  const auth = getOAuthClient();
  const sheets = google.sheets({ version: "v4", auth });
  const calendar = google.calendar({ version: "v3", auth });

  switch (job.type) {
    case "sheets.append":
      return sheets.spreadsheets.values.append({
        spreadsheetId: job.payload.spreadsheetId,
        range: job.payload.range,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: { values: job.payload.values },
      });

    case "email.send":
      return transporter.sendMail(job.payload);

    case "crm.addContact":
      return fetch(process.env.BREVO_API_URL, {
        method: "POST",
        headers: { "content-type": "application/json", "api-key": process.env.BREVO_API_KEY },
        body: JSON.stringify(job.payload),
      });

    default:
      throw new Error(`Unknown job type: ${job.type}`);
  }
}

export async function POST(req) {
  const token = req.headers.get("x-worker-token");
  if (token !== process.env.WORKER_TOKEN) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

  const result = await processBatch(workerFn, 10);
  return new Response(JSON.stringify({ ok: true, result }), { status: 200 });
}
