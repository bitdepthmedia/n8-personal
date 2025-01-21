import crypto from 'crypto'

// In-memory store for CSRF tokens
const csrfTokens = new Map<string, number>()

export function generateCsrfToken(): string {
  const token = crypto.randomBytes(32).toString('hex')
  csrfTokens.set(token, Date.now() + 600000) // 10 minutes expiration
  return token
}

export function validateCsrfToken(token: string): boolean {
  if (!csrfTokens.has(token)) return false
  const expiration = csrfTokens.get(token)!
  csrfTokens.delete(token)
  return Date.now() < expiration
}

export function cleanExpiredTokens() {
  const now = Date.now()
  for (const [token, expiration] of csrfTokens.entries()) {
    if (now > expiration) {
      csrfTokens.delete(token)
    }
  }
}

// Clean expired tokens every 5 minutes
setInterval(cleanExpiredTokens, 300000)