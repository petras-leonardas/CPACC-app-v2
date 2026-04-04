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
// section is ~2 000 chars; this limit adds a safety margin while still
// preventing cost abuse from oversized payloads.
const MAX_TEXT_LENGTH = 3_000

// ---------------------------------------------------------------------------
// Per-IP rate limiter (in-memory, per-isolate)
//
// This is a best-effort control.  Cloudflare Workers may run multiple
// isolates, and each cold-start resets the map.  The per-isolate
// character budget below provides a second line of defence.
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  count: number
  chars: number        // characters consumed in this window
  resetAt: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()
const RATE_LIMIT_WINDOW_MS = 60_000          // 1-minute window
const RATE_LIMIT_MAX_REQUESTS = 15           // max 15 requests per minute per IP
const RATE_LIMIT_MAX_CHARS_PER_IP = 30_000   // max 30 000 chars per minute per IP
const RATE_LIMIT_MAP_MAX_SIZE = 10_000       // cap Map size to prevent memory issues

// ---------------------------------------------------------------------------
// Per-isolate character budget — hard ceiling on total characters served
// by a single isolate over its lifetime.  Even if an attacker cycles IPs,
// a single isolate can never exceed this budget.
//
// Google Cloud TTS Neural2 costs ~$16 per 1 M characters, so 500 000
// characters limits a single isolate to ~$8 worst case.
// ---------------------------------------------------------------------------
let isolateCharsServed = 0
const ISOLATE_CHAR_BUDGET = 500_000

/**
 * Clean up expired entries from the rate-limit map to prevent unbounded
 * memory growth.  Called periodically during rate-limit checks.
 */
function evictExpiredEntries(now: number): void {
  if (rateLimitMap.size < 100) return // skip cleanup for small maps
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip)
    }
  }
}

/**
 * Check whether the given IP + character count should be rate-limited.
 * Returns a reason string if blocked, or null if allowed.
 */
function checkRateLimit(ip: string, textLength: number): string | null {
  // Hard ceiling: per-isolate character budget
  if (isolateCharsServed + textLength > ISOLATE_CHAR_BUDGET) {
    return 'Service temporarily unavailable. Please try again later.'
  }

  const now = Date.now()

  // Periodic cleanup
  evictExpiredEntries(now)

  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    // Enforce Map size cap — reject new IPs if the map is full
    if (!entry && rateLimitMap.size >= RATE_LIMIT_MAP_MAX_SIZE) {
      return 'Too many requests. Please try again later.'
    }
    rateLimitMap.set(ip, { count: 1, chars: textLength, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return null
  }

  entry.count++
  entry.chars += textLength

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return 'Too many requests. Please try again later.'
  }
  if (entry.chars > RATE_LIMIT_MAX_CHARS_PER_IP) {
    return 'Character limit exceeded. Please try again later.'
  }

  return null
}

export async function handleTTS(request: Request, env: TTSEnv): Promise<Response> {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  // --- Content-Type check ---
  const ct = request.headers.get('Content-Type') || ''
  if (!ct.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await request.json() as { text?: string; voice?: string }
    const { text, voice = 'en-US-Neural2-F' } = body

    if (!text || typeof text !== 'string') {
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

    // --- Rate limiting (best-effort, per-isolate) ---
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown'
    const rateLimitReason = checkRateLimit(clientIP, text.length)
    if (rateLimitReason) {
      return new Response(JSON.stringify({ error: rateLimitReason }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
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
      // Return a generic 502 — do not forward the upstream status code as
      // that leaks whether the API key is invalid (401), over quota (429),
      // or otherwise misconfigured.
      return new Response(JSON.stringify({ error: 'TTS generation failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json() as TTSResponse

    // Track characters served against the isolate budget
    isolateCharsServed += text.length

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
