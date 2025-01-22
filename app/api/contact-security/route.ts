import { NextResponse } from 'next/server';
import { generateCsrfToken } from '../../lib/security';
import { generateCaptchaQuestion } from '../../lib/captcha';
import type { NextRequest } from 'next/server';

// Use a scalable storage solution like Redis in production
const rateLimits = new Map<string, number>();

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
    const now = Date.now();

    // Rate limiting logic (1 request per second per IP)
    if (rateLimits.has(ip)) {
      const lastRequestTime = rateLimits.get(ip)!;
      if (now - lastRequestTime < 1000) { // 1-second interval
        return NextResponse.json(
          { error: 'Too many requests' },
          { status: 429 }
        );
      }
    }
    rateLimits.set(ip, now);

    // Generate security tokens
    const csrfToken = generateCsrfToken();
    const captcha = generateCaptchaQuestion();

    return NextResponse.json({
      csrfToken,
      captchaQuestion: captcha.question,
      expiresAt: Date.now() + 600000, // Expires in 10 minutes
    });
  } catch (error) {
    console.error('Error in contact-security route:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}