// File: app/api/request-quote/route.js (or route.ts if using TS)

import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    let data = {};
    let attachments = [];

    // Detect content type
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // ✅ Handle JSON request (Contact / CTA)
      data = await req.json();
    } else if (contentType.includes("multipart/form-data")) {
      // ✅ Handle FormData (Request Quote / Careers)
      const formData = await req.formData();

      data = {
        name: formData.get("name") || "N/A",
        email: formData.get("email") || "N/A",
        phone: formData.get("phone") || "N/A",
        company: formData.get("company") || "N/A",
        type: formData.get("type") || "General Inquiry",
        budget: formData.get("budget") || "N/A",
        timeline: formData.get("timeline") || "N/A",
        message: formData.get("message") || "",
        contactMethod: formData.get("contactMethod") || "Any",
        discount: formData.get("discount") || "",
      };

      // ✅ File Handling (resume or project file)
      const uploadedFile = formData.get("resume") || formData.get("file");
      if (uploadedFile && typeof uploadedFile === "object" && uploadedFile.name) {
        const buffer = Buffer.from(await uploadedFile.arrayBuffer());
        attachments.push({
          filename: uploadedFile.name,
          content: buffer,
        });
      }
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Unsupported Content-Type" }),
        { status: 400 }
      );
    }

    // ✅ Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // lowercase "gmail"
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email body
    const emailText = `
📩 New Submission from OmoolaEx Website

👤 Name: ${data.name}
📧 Email: ${data.email}
📱 Phone: ${data.phone}
🏢 Company/LinkedIn: ${data.company}
📌 Form Type: ${data.type}
💰 Budget: ${data.budget}
⏳ Timeline: ${data.timeline}
☎️ Preferred Contact: ${data.contactMethod}
🎉 Discount Applied: ${data.discount ? data.discount : "No discount applied"}

📝 Message / Cover Letter:
${data.message || "No message provided"}
    `;

    // ✅ Send Email
    await transporter.sendMail({
      from: `"OmoolaEx" <${process.env.EMAIL_USER}>`,
      to: "info@omoolaex.com.ng", // Your business email
      subject: `New Submission: ${data.type || "Inquiry"} from ${data.name}`,
      text: emailText,
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Email send error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
