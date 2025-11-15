'use server'

import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()

    if (!body) {
      return NextResponse.json(
        { success: false, message: 'Invalid request.' },
        { status: 400 }
      )
    }

    const email = String(body.email || '').trim()
    const name = String(body.name || '').trim()

    // --- Validate email ---
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // --- ENV validation ---
    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID
    const BREVO_URL = process.env.BREVO_API_URL || 'https://api.brevo.com/v3/contacts'

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error('Missing Brevo environment variables.')
      return NextResponse.json(
        { success: false, message: 'Server configuration error.' },
        { status: 500 }
      )
    }

    // --- Build contact payload ---
    const payload = {
      email,
      attributes: {},
      listIds: [parseInt(BREVO_LIST_ID, 10)],
      updateEnabled: true,
    }

    // Add name only if provided
    if (name) {
      payload.attributes.FIRSTNAME = name
    }

    // You may add more in future:
    // if (phone) payload.attributes.PHONE = phone;

    // --- Push to Brevo ---
    const brevoRes = await fetch(BREVO_URL, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!brevoRes.ok) {
      const errText = await brevoRes.text()
      console.error('Brevo newsletter error:', brevoRes.status, errText)

      // Handle if email already exists (Brevo returns 400)
      if (errText.includes('already exists')) {
        return NextResponse.json({
          success: true,
          message: 'You’re already subscribed! 🎉',
        })
      }

      return NextResponse.json(
        { success: false, message: 'Unable to subscribe at this time.' },
        { status: 500 }
      )
    }

    // --- Success ---
    return NextResponse.json({
      success: true,
      message: 'Subscription successful.',
    })

  } catch (err) {
    console.error('Newsletter route error:', err)
    return NextResponse.json(
      { success: false, message: 'Internal server error.' },
      { status: 500 }
    )
  }
}
