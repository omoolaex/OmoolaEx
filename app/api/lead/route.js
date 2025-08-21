import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // ✅ Parse JSON body safely
    const body = await req.json();
    const { name, email, organization, role, resource, downloadUrl } = body;

    if (!name || !email || !resource || !downloadUrl) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    // 1️⃣ Save to Google Sheet via SheetDB or Apps Script
    if (process.env.SHEETDB_API_URL) {
      try {
        await fetch(process.env.SHEETDB_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, organization, role, resource, downloadUrl }),
        });
      } catch (sheetErr) {
        console.warn("Failed to save to SheetDB:", sheetErr.message);
      }
    }

    // 2️⃣ Send Email Notification with download link (Zoho SMTP)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST, // e.g., "smtp.zoho.com"
          port: parseInt(process.env.SMTP_PORT) || 587, // 465 for SSL
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"OmoolaEx Resource Library" <${process.env.SMTP_USER}>`,
          to: email,
          subject: `Your resource download: ${resource}`,
          html: `
            <p>Hi ${name},</p>
            <p>Thanks for your interest! Click <a href="${downloadUrl}" target="_blank">here</a> to download your resource: <strong>${resource}</strong>.</p>
            <p>— OmoolaEx Team</p>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send email:", emailErr.message);
      }
    }

    // 3️⃣ Optional: Subscribe to Mailchimp
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      try {
        const dc = process.env.MAILCHIMP_API_KEY.split("-")[1];
        await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
          method: "POST",
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            merge_fields: {
              FNAME: name,
              ORG: organization || "",
              ROLE: role || "",
            },
          }),
        });
      } catch (mailchimpErr) {
        console.warn("Mailchimp subscription failed:", mailchimpErr.message);
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Lead API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
