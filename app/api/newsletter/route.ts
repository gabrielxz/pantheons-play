import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX

    if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
      console.error('MailChimp configuration missing')
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      )
    }

    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending',
        tags: ['pantheons-play-website'],
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      if (data.title === 'Member Exists') {
        return NextResponse.json(
          { message: 'You are already subscribed!' },
          { status: 200 }
        )
      }
      
      console.error('MailChimp error:', data)
      return NextResponse.json(
        { error: data.detail || 'Failed to subscribe' },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { message: 'Please check your email to confirm your subscription!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}