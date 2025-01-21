import crypto from 'crypto'

// Simple math-based CAPTCHA generator
const operations = [
  { operator: '+', fn: (a: number, b: number) => a + b },
  { operator: '-', fn: (a: number, b: number) => a - b },
  { operator: '*', fn: (a: number, b: number) => a * b }
]

interface CaptchaData {
  answer: number
  expiresAt: number
}

// In-memory store for CAPTCHA answers
const captchaAnswers = new Map<string, CaptchaData>()

export function generateCaptchaQuestion() {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  const op = operations[Math.floor(Math.random() * operations.length)]
  
  const question = `What is ${a} ${op.operator} ${b}?`
  const answer = op.fn(a, b)
  
  const captchaId = crypto.randomBytes(16).toString('hex')
  captchaAnswers.set(captchaId, { answer, expiresAt: Date.now() + 600000 })
  
  return {
    id: captchaId,
    question,
    expiresAt: Date.now() + 600000 // 10 minutes expiration
  }
}

export function validateCaptcha(id: string, answer: string): boolean {
  if (!captchaAnswers.has(id)) return false
  const captchaData = captchaAnswers.get(id)!
  captchaAnswers.delete(id)
  return Number(answer) === captchaData.answer
}

export function cleanExpiredCaptchas() {
  const now = Date.now()
  for (const [id, captchaData] of captchaAnswers.entries()) {
    if (now > captchaData.expiresAt) {
      captchaAnswers.delete(id)
    }
  }
}

// Clean expired CAPTCHAs every 5 minutes
setInterval(cleanExpiredCaptchas, 300000)