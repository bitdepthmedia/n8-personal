import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import type { NextRequest } from 'next/server';
import { verifyRecaptchaToken } from '../../lib/recaptcha';

interface SubmissionData {
  count: number;
  lastSubmission: number;
}

// In-memory store for rate limiting
const submissionCounts = new Map<string, SubmissionData>();

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const now = Date.now();

    // Rate limiting check
    if (submissionCounts.has(ip)) {
      const { count, lastSubmission } = submissionCounts.get(ip)!;
      if (now - lastSubmission < 60000) {
        if (count > 5) {
          return NextResponse.json(
            { error: 'Too many submissions. Please try again later.' },
            { status: 429 }
          );
        }
        submissionCounts.set(ip, { count: count + 1, lastSubmission: now });
      } else {
        submissionCounts.set(ip, { count: 1, lastSubmission: now });
      }
    } else {
      submissionCounts.set(ip, { count: 1, lastSubmission: now });
    }

    const formData = await request.json();

    // Validate form data
    const { name, email, message, recaptchaToken } = formData;
    if (!name || !email || !message || !recaptchaToken) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    const isValidToken = await verifyRecaptchaToken(recaptchaToken);
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Invalid reCAPTCHA response' },
        { status: 400 }
      );
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}