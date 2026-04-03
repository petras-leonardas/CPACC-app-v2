interface TTSEnv {
  GOOGLE_TTS_API_KEY: string
}

interface TTSResponse {
  audioContent: string
  timepoints?: unknown[]
}

// Voices the client is allowed to request.  Anything not on this list
// is rejected so attackers can't probe the Google TTS catalogue or use
// more expensive voice models.
const ALLOWED_VOICES = new Set([
  'en-US-Neural2-C',
  'en-US-Neural2-F',
  'en-US-Wavenet-I',
])

// Maximum text length per request (characters).  The longest topic
// section is well under 5 000 chars; this limit prevents cost abuse.
const MAX_TEXT_LENGTH = 5_000

// Simple in-memory per-IP rate limiter.  Resets when the worker cold-
// starts (which is fine for Cloudflare Workers -- the isolate is
// short-lived).  A stricter approach would use KV or D1.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60_000  // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30   // 30 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

export async function handleTTS(request: Request, env: TTSEnv): Promise<Response> {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // --- Rate limiting (best-effort, per-isolate) ---
  const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown'
  if (isRateLimited(clientIP)) {
    return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
    })
  }

  try {
    const body = await request.json() as { text?: string; voice?: string }
    const { text, voice = 'en-US-Neural2-F' } = body

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // --- Input length validation ---
    if (text.length > MAX_TEXT_LENGTH) {
      return new Response(JSON.stringify({ error: `Text exceeds maximum length of ${MAX_TEXT_LENGTH} characters` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // --- Voice allowlist ---
    if (!ALLOWED_VOICES.has(voice)) {
      return new Response(JSON.stringify({ error: 'Invalid voice selection' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Call Google Cloud Text-to-Speech API
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${env.GOOGLE_TTS_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: 'en-US',
            name: voice
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0.0
          }
        })
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('Google TTS API error:', error)
      return new Response(JSON.stringify({ error: 'TTS generation failed' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json() as TTSResponse

    // Return the audio data with character count and timepoints for word highlighting
    return new Response(JSON.stringify({
      audioContent: data.audioContent,
      timepoints: data.timepoints || [],
      characterCount: text.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    })

  } catch (error) {
    console.error('TTS endpoint error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
