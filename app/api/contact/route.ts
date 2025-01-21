import { NextResponse } from 'next/server'
import { validateCsrfToken } from '../../lib/security'
import type { NextRequest } from 'next/server'
import { createTransporter } from '../../lib/oauth'

interface SubmissionData {
  count: number
  lastSubmission: number
}

// In-memory store for rate limiting and spam detection
const submissionCounts = new Map<string, SubmissionData>()

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: 'POST'
      }
    )
    
    const data = await response.json()
    return data.success && data.score >= 0.5
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const now = Date.now()

    // Rate limiting check
    if (submissionCounts.has(ip)) {
      const { count, lastSubmission } = submissionCounts.get(ip)!
      if (now - lastSubmission < 60000) { // 1 minute rate limit
        if (count > 5) {
          return NextResponse.json(
            { error: 'Too many submissions. Please try again later.' },
            { status: 429 }
          )
        }
        submissionCounts.set(ip, { count: count + 1, lastSubmission: now })
      } else {
        submissionCounts.set(ip, { count: 1, lastSubmission: now })
      }
    } else {
      submissionCounts.set(ip, { count: 1, lastSubmission: now })
    }

    const formData = await request.json()

    // Validate CSRF token
    if (!validateCsrfToken(formData.csrfToken)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    // Validate reCAPTCHA token
    if (!formData.recaptchaToken) {
      return NextResponse.json(
        { error: 'reCAPTCHA token missing' },
        { status: 400 }
      )
    }

    const isRecaptchaValid = await verifyRecaptcha(formData.recaptchaToken)
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed' },
        { status: 400 }
      )
    }

    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${formData.name}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`
    }

    try {
      const transporter = await createTransporter()
      await transporter.sendMail(mailOptions)
      
      return NextResponse.json(
        { message: 'Message sent successfully' },
        { status: 200 }
      )
    } catch (error) {
      console.error('Error sending email:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
}