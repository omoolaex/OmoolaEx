import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      fullName,
      company,
      email,
      phone,
      websiteType,
      timeline,
      goals,
      package: pkg,
      packagePrice,
      packageFeatures,
    } = body;

    if (!fullName || !email || !pkg) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // 1️⃣ Save to Google Sheets (optional)
    if (process.env.SHEETDB_API_URL) {
      try {
        await fetch(process.env.SHEETDB_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName,
            company,
            email,
            phone,
            websiteType,
            timeline,
            goals,
            package: pkg,
            price: packagePrice,
          }),
        });
      } catch (sheetErr) {
        console.warn("Failed to save to SheetDB:", sheetErr.message);
      }
    }

    // 2️⃣ Send Email to Admin (you)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"OmoolaEx Project Requests" <${process.env.SMTP_USER}>`,
          to: process.env.ADMIN_EMAIL, // 📥 Your inbox
          subject: `📌 New ${pkg} Request from ${fullName}`,
          html: `
            <h2>New Website Project Request</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Website Type:</strong> ${websiteType}</p>
            <p><strong>Timeline:</strong> ${timeline}</p>
            <p><strong>Goals:</strong> ${goals}</p>
            <hr/>
            <h3>Selected Package</h3>
            <p><strong>${pkg}</strong> — ${packagePrice}</p>
            <ul>
              ${packageFeatures.map((f) => `<li>${f}</li>`).join("")}
            </ul>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send email:", emailErr.message);
      }
    }

    // 3️⃣ Send Confirmation to Client
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"OmoolaEx" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `We received your ${pkg} request 🎉`,
        html: `
          <p>Hi ${fullName},</p>
          <p>Thanks for choosing the <strong>${pkg}</strong> package. Our team will review your request and get back to you shortly.</p>
          <p>— OmoolaEx Team</p>
        `,
      });
    } catch (clientEmailErr) {
      console.warn("Failed to send confirmation to client:", clientEmailErr.message);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Project Request API error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
