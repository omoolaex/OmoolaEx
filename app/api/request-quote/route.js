import nodemailer from "nodemailer";
import { google } from "googleapis";
import { Readable } from "stream";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      type: formData.get("type"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
      message: formData.get("message"),
      contactMethod: formData.get("contactMethod"),
    };

    const file = formData.get("file");

    /** 1️⃣ Authenticate Google APIs **/
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
      },
      scopes: ["https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/spreadsheets"],
    });

    const drive = google.drive({ version: "v3", auth });
    const sheets = google.sheets({ version: "v4", auth });

    /** 2️⃣ Upload file to Google Drive **/
    let fileUrl = "";
    if (file && file.name) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const stream = Readable.from(buffer);

      const uploadedFile = await drive.files.create({
        requestBody: {
          name: file.name,
          parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
        },
        media: {
          mimeType: file.type || "application/octet-stream",
          body: stream,
        },
        fields: "id, webViewLink",
      });

      fileUrl = uploadedFile.data.webViewLink;
    }

    /** 3️⃣ Log submission to Google Sheets **/
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:K",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          new Date().toLocaleString(),  // Timestamp
          data.name,
          data.email,
          data.phone,
          data.company,
          data.type,
          data.budget,
          data.timeline,
          data.contactMethod,
          data.message,
          fileUrl || "No file"
        ]],
      },
    });

    /** 4️⃣ Send Email **/
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"OmoolaEx" <${process.env.EMAIL_USER}>`,
      to: "info@markethub9ja.com.ng",
      subject: `New Quote Request from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Project Type: ${data.type}
Budget: ${data.budget}
Timeline: ${data.timeline}
Contact Method: ${data.contactMethod}

Message:
${data.message}

File: ${fileUrl || "No file uploaded"}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}