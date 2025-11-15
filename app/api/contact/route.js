'use server'

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// --- ZOHO SMTP Transporter ---
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: process.env.SMTP_PORT || 465,
  secure: process.env.SMTP_SECURE || true,
  auth: {
    user: process.env.ZOHO_ADMIN_USER,
    pass: process.env.ZOHO_PASS,
  },
})

// --- Department email routing map ---
const departmentEmails = {
  'General Inquiry': process.env.CONTACT_EMAIL,
  'Request IT Consulting': process.env.CONSULTING_EMAIL,
  'Partnership / Collaboration': process.env.PARTNERSHIPS_EMAIL,
  'Press / Media': process.env.MEDIA_EMAIL,
  'Careers / Volunteering': process.env.CAREERS_EMAIL,
  Other: process.env.CONTACT_EMAIL,
}

// --- Simple sanitizer ---
function sanitize(input) {
  if (!input) return 'N/A'
  return String(input)
    .trim()
    .replace(/[<>]/g, '') // prevent HTML tags
    .replace(/(\r\n|\n|\r)/gm, ' ')
}

// --- Main POST handler ---
export async function POST(req) {
  try {
    const formData = await req.formData()

    // --- Get IP (for NDPR logging) ---
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'Unknown'

    // --- Extract & sanitize inputs ---
    const name = sanitize(formData.get('name'))
    const email = sanitize(formData.get('email'))
    const phone = sanitize(formData.get('phone'))
    const company = sanitize(formData.get('company'))
    const website = sanitize(formData.get('website'))
    const reason = sanitize(formData.get('reason'))
    const projectType = sanitize(formData.get('projectType'))
    const subject = sanitize(formData.get('subject'))
    const message = sanitize(formData.get('message'))
    const budget = sanitize(formData.get('budget'))
    const timeline = sanitize(formData.get('timeline'))
    const consentTimestamp = new Date().toISOString()
    const attachment = formData.get('attachment')
    const consent = formData.get('consent') === 'true'
    const consentNewsletter = formData.get('consentNewsletter') === 'true' || formData.get('consentNewsletter') === true;


    // --- Build attachments ---
    let attachments = []
    if (attachment && typeof attachment.arrayBuffer === 'function') {
      const buffer = Buffer.from(await attachment.arrayBuffer())
      attachments.push({
        filename: attachment.name || 'attachment',
        content: buffer,
        contentType: attachment.type || 'application/octet-stream',
      })
    }

    // --- Determine department email ---
    const adminEmail = departmentEmails[reason] || process.env.CONTACT_EMAIL

    // --- Admin HTML email ---
    const adminHtml = `
      <h2>New Contact Submission</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Company:</b> ${company}</p>
      <p><b>Website:</b> ${website}</p>
      <p><b>Reason:</b> ${reason}</p>
      <p><b>Service / Project Type:</b> ${projectType}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Budget:</b> ${budget}</p>
      <p><b>Timeline:</b> ${timeline}</p>
      <p><b>Message:</b> ${message}</p>
      <hr/>
      <p><b>Consent Timestamp:</b> ${consentTimestamp}</p>
      <p><b>IP Address:</b> ${ip}</p>
      <p><small>Received on ${new Date().toLocaleString()}</small></p>
    `

    // --- Send admin email ---
    await transporter.sendMail({
      from: `"OmoolaEx Enquiries" <no-reply@omoolaex.com.ng>`,
      to: adminEmail,
      subject: `New Contact — ${reason} — ${subject !== 'N/A' ? subject : name}`,
      html: adminHtml,
      attachments,
    })

    // --- Save to SheetDB ---
    const sheetPayload = {
      Date: new Date().toISOString(),
      Name: name,
      Email: email,
      Phone: phone,
      Company: company,
      Website: website,
      Reason: reason,
      'Project Type': projectType,
      Subject: subject,
      Message: message,
      Budget: budget,
      Timeline: timeline,
      Attachment: attachment ? attachment.name : 'N/A',
      ConsentTimestamp: consentTimestamp,
      IP: ip,
      ConsentNewsletter: consentNewsletter ? 'Yes' : 'No',
    }

    const sheetRes = await fetch(`${process.env.SHEETDB_API_URI}?sheet=Contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [sheetPayload] }),
    })

    if (!sheetRes.ok) throw new Error('Failed to log entry to SheetDB.')


      // --- Brevo Newsletter Sync ---
    if (consentNewsletter && email) {
      try {
        const BREVO_API_KEY = process.env.BREVO_API_KEY
        const BREVO_LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID

        const res = await fetch(process.env.BREVO_API_URL, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
          body: JSON.stringify({
            email,
            attributes: { FIRSTNAME: name, PHONE: phone },
            listIds: [parseInt(BREVO_LIST_ID, 10)],
            updateEnabled: true,
          }),
        })

        if (!res.ok) {
          const text = await res.text()
          console.error('Brevo newsletter failed:', res.status, text)
        }
      } catch (err) {
        console.error('Brevo newsletter error:', err)
      }
    }    
    // --- Send confirmation email (delayed) ---
    setTimeout(async () => {
      try {
        await transporter.sendMail({
          from: `"OmoolaEx Enquiries" <no-reply@omoolaex.com.ng>`,
          to: email,
          subject: 'We received your message — OmoolaEx',
          html: `
            <p>Hello ${name},</p>
            <p>Thank you for reaching out to <b>OmoolaEx IT Consultancy Ltd.</b></p>
            <p>We’ve received your message about <b>${reason}</b> and our team will get back to you within <b>1–2 business days</b>.</p>

            ${
              reason === 'Request IT Consulting'
                ? '<p>While you wait, you can explore our <a href="https://omoolaex.com.ng/faq" target="_blank">FAQ page</a> to learn how we work with clients.</p>'
                : ''
            }

            <p>If your matter is urgent, please reach us directly at <a href="mailto:info@omoolaex.com.ng">info@omoolaex.com.ng</a> or call <a href="tel:2347089217123"> <b>+234 (0) 708 921 7123</b>.</p>
            
            <p>Thank you again for contacting OmoolaEx — we look forward to connecting.</p>

            <br/>
            <p>Warm regards,</p>
            <p><b>The OmoolaEx Team</b><br/>
            <a href="https://omoolaex.com.ng">https://omoolaex.com.ng</a><br/>
            <a href="https://omoolaex.com.ng/privacy-policy">Privacy Policy</a></p>
          `,
        })
      } catch (err) {
        console.error('Confirmation email failed:', err)
      }
    }, 10 * 60 * 1000) // 10-minute delay


    return NextResponse.json({ success: true, message: 'Contact submitted' })
  } catch (error) {
    console.error('Contact route error:', error)
    return NextResponse.json(
      { success: false, message: error.message || 'Server error' },
      { status: 500 }
    )
  }
}
