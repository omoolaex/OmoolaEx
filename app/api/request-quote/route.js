import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    let data = {};
    let attachments = [];

    // Determine if request is JSON or multipart/form-data
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      // Handle JSON requests (Contact Form, CTA Section)
      data = await req.json();
    } else if (contentType.includes("multipart/form-data")) {
      // Handle FormData (Job Applications or Careers Form with file)
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
      };

      // Handle file attachment if any
      const resume = formData.get("resume") || formData.get("file");
      if (resume && typeof resume === "object" && resume.name) {
        const arrayBuffer = await resume.arrayBuffer();
        attachments.push({
          filename: resume.name,
          content: Buffer.from(arrayBuffer),
        });
      }
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Unsupported Content-Type" }),
        { status: 400 }
      );
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Compose email content dynamically
    const emailText = `
New Submission from OmoolaEx Website

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company/LinkedIn: ${data.company}
Form Type: ${data.type}
Budget: ${data.budget}
Timeline: ${data.timeline}
Preferred Contact: ${data.contactMethod}

Message / Cover Letter:
${data.message || "No message provided"}
    `;

    await transporter.sendMail({
      from: `"OmoolaEx" <${process.env.EMAIL_USER}>`,
      to: "info@omoolaex.com.ng",
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
