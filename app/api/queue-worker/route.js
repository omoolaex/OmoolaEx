// worker/api/queue-worker/route.js
import { processBatch } from "@/lib/queue";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import { redis, QUEUE_KEY, PROCESSING_KEY, DEAD_LETTER_KEY } from "@/lib/queue";

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

  switch (job.type) {

    case "sheets.append": {
      const res = await sheets.spreadsheets.values.append({
        spreadsheetId: job.payload.spreadsheetId,
        range: job.payload.range,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: job.payload.values },
      });

      if (!res.data?.updates?.updatedRows) {
        throw new Error("Sheets append failed");
      }
      return res;
    }

    case "email.send": {
      const info = await transporter.sendMail(job.payload);
      if (!info?.messageId) {
        throw new Error("Email send failed");
      }
      return info;
    }

    case "crm.addContact": {
      const res = await fetch(process.env.BREVO_API_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify(job.payload),
      });

      if (!res.ok) {
        throw new Error(`CRM error: ${res.status}`);
      }
      return true;
    }

    default:
      throw new Error(`Unknown job type: ${job.type}`);
  }
}

export async function GET() {
  const [pending, processing, dead] = await Promise.all([
    redis.llen(QUEUE_KEY),
    redis.llen(PROCESSING_KEY),
    redis.llen(DEAD_LETTER_KEY),
  ]);

  return new Response(JSON.stringify({ pending, processing, dead }), { status: 200 });
}

export async function POST(req) {
  if (req.headers.get("x-worker-token") !== process.env.WORKER_TOKEN) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const result = await processBatch(workerFn, 10);
  return new Response(JSON.stringify({ ok: true, result }), { status: 200 });
}
