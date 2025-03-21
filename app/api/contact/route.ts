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

// Log email configuration for debugging
console.log('Email config:', {
  service: process.env.EMAIL_SERVICE,
  user: process.env.EMAIL_USER,
  fromAddress: process.env.EMAIL_FROM,
  toAddress: process.env.EMAIL_TO,
  passwordSet: !!process.env.EMAIL_PASSWORD
});

// Email transporter configuration
// Log more detailed environment variable information
console.log('Detailed environment variables:', {
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER ? 'Set (not showing for security)' : 'Not set',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Set (not showing for security)' : 'Not set',
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_TO: process.env.EMAIL_TO
});

// Use explicit SMTP configuration instead of service
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
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
            { error: 'Too many attempts. Please wait a minute before trying again.' },
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
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!email) missingFields.push('email');
      if (!message) missingFields.push('message');
      if (!recaptchaToken) missingFields.push('reCAPTCHA verification');
      
      return NextResponse.json(
        { error: `Please provide all required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA token
    try {
      const verificationResult = await verifyRecaptchaToken(recaptchaToken);
      if (!verificationResult.success) {
        return NextResponse.json(
          { 
            error: verificationResult.error || 'reCAPTCHA verification failed. Please try again.',
            details: verificationResult.details
          },
          { status: 400 }
        );
      }

      // If score is provided and too low, reject the submission
      if (verificationResult.details?.score && verificationResult.details.score < 0.3) {
        return NextResponse.json(
          { error: 'Security check failed. Please ensure you\'re not using automated tools.' },
          { status: 403 }
        );
      }
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      return NextResponse.json(
        { error: 'Failed to verify reCAPTCHA. Please refresh the page and try again.' },
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

    // Log mail options for debugging
    console.log('Mail options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    try {
      console.log('Attempting to send email with transporter...');
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error: any) {
      // Detailed error logging
      console.error('Detailed email sending error:', {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode,
        stack: error.stack,
        // Check if auth information exists
        authInfo: error.auth ? 'Auth info exists' : 'No auth info'
      });

      // Try a more direct SMTP configuration if the service approach fails
      if (error.code === 'EAUTH') {
        console.log('Trying alternative SMTP configuration...');
        try {
          const alternativeTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });
          
          console.log('Sending email with alternative transporter...');
          await alternativeTransporter.sendMail(mailOptions);
          console.log('Email sent successfully with alternative configuration!');
          return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
          );
        } catch (altError: any) {
          console.error('Alternative email configuration also failed:', {
            message: altError.message,
            code: altError.code,
            command: altError.command,
            response: altError.response
          });
        }
      }
      
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}