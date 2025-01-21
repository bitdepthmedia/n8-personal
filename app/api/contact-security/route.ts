import { NextResponse } from 'next/server'
import { generateCsrfToken } from '../../lib/security'
import { generateCaptchaQuestion } from '../../lib/captcha'
import type { NextRequest } from 'next/server'

// In-memory store for rate limiting
const rateLimits = new Map<string, number>()

export async function GET(request: NextRequest) {
  // Rate limiting check
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const now = Date.now()
  
  if (rateLimits.has(ip)) {
    const lastRequestTime = rateLimits.get(ip)!
    if (now - lastRequestTime < 1000) { // 1 second rate limit
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
  }
  rateLimits.set(ip, now)

  // Generate security data
  const csrfToken = generateCsrfToken()
  const captcha = generateCaptchaQuestion()

  return NextResponse.json({
    csrfToken,
    captchaQuestion: captcha.question,
    expiresAt: Date.now() + 600000 // 10 minutes expiration
  })
}