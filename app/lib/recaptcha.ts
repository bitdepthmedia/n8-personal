interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

interface VerificationResult {
  success: boolean;
  error?: string;
  details?: {
    score?: number;
    action?: string;
    hostname?: string;
    timestamp?: string;
    errorCodes?: string[];
  };
}

export async function verifyRecaptchaToken(token: string): Promise<VerificationResult> {
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      {
        method: 'POST',
      }
    );

    const data: RecaptchaResponse = await response.json();

    // Log full response data for debugging
    console.log('reCAPTCHA verification response:', {
      success: data.success,
      score: data.score,
      action: data.action,
      hostname: data.hostname,
      timestamp: data.challenge_ts,
      errorCodes: data.error_codes,
    });

    // Check for success and score threshold (adjusted to 0.3)
    if (!data.success) {
      return {
        success: false,
        error: 'reCAPTCHA verification failed',
        details: {
          errorCodes: data.error_codes,
          hostname: data.hostname,
          timestamp: data.challenge_ts,
        },
      };
    }

    if (data.score < 0.3) {
      return {
        success: false,
        error: 'Security check failed due to suspicious activity',
        details: {
          score: data.score,
          action: data.action,
          hostname: data.hostname,
          timestamp: data.challenge_ts,
        },
      };
    }

    // Verification successful
    return {
      success: true,
      details: {
        score: data.score,
        action: data.action,
        hostname: data.hostname,
        timestamp: data.challenge_ts,
      },
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown reCAPTCHA verification error',
      details: {
        errorCodes: ['VERIFICATION_FAILED'],
      },
    };
  }
}