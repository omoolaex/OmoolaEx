import nodemailer from "nodemailer";

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

    const file = formData.get("file"); // This will be a File object if uploaded

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare attachments if file exists
    const attachments = [];
    if (file && file.name) {
      const arrayBuffer = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(arrayBuffer),
      });
    }

    // Send email
    await transporter.sendMail({
      from: `"OmoolaEx" <${process.env.EMAIL_USER}>`,
      to: "info@omoolaex.com.ng",
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
      `,
      attachments,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}