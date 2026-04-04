// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'

// ---------------------------------------------------------------------------
// Mocks — must be set up BEFORE importing the module under test
// ---------------------------------------------------------------------------

// Suppress console.error noise in test output
vi.spyOn(console, 'error').mockImplementation(() => {})

// Mock global fetch (used by the Google TTS API call)
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

// Mock Cloudflare Cache API (not available outside Workers runtime)
const mockCacheMatch = vi.fn()
const mockCachePut = vi.fn()
vi.stubGlobal('caches', { default: { match: mockCacheMatch, put: mockCachePut } })

// ---------------------------------------------------------------------------
// Import AFTER global stubs so the module sees them
// ---------------------------------------------------------------------------
// Each call to vi.resetModules() + dynamic import gives us a fresh module
// with reset module-level state (rateLimitMap, isolateCharsServed).
// For most tests the shared import is fine since we use unique IPs.
import { handleTTS } from '../tts'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const VALID_BODY = { text: 'Hello world', voice: 'en-US-Neural2-C' }

const GOOGLE_TTS_RESPONSE = {
  audioContent: 'base64audiocontent',
  timepoints: [],
}

function post(body: unknown, headers?: Record<string, string>): Request {
  return new Request('https://cpaccmastery.com/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': `test-${Math.random().toString(36).slice(2)}`,
      ...headers,
    },
    body: JSON.stringify(body),
  })
}

function postFromIP(body: unknown, ip: string): Request {
  return new Request('https://cpaccmastery.com/api/tts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'CF-Connecting-IP': ip,
    },
    body: JSON.stringify(body),
  })
}

const mockEnv = { GOOGLE_TTS_API_KEY: 'test-google-key' } as Parameters<typeof handleTTS>[1]
const mockCtx = {
  waitUntil: vi.fn(),
  passThroughOnException: vi.fn(),
} as unknown as ExecutionContext

async function json(r: Response) {
  return r.json() as Promise<Record<string, unknown>>
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks()

  // Default: cache miss, Google TTS success
  // Note: must return a NEW Response per call — bodies are single-use
  mockCacheMatch.mockResolvedValue(undefined)
  mockCachePut.mockResolvedValue(undefined)
  mockFetch.mockImplementation(async () =>
    new Response(JSON.stringify(GOOGLE_TTS_RESPONSE), { status: 200 }),
  )
})

// ===========================================================================
// Tests
// ===========================================================================

describe('handleTTS', () => {
  // ── Method validation ───────────────────────────────────────────────────

  it('returns 405 for non-POST requests', async () => {
    const req = new Request('https://x.com/api/tts', { method: 'GET' })
    const res = await handleTTS(req, mockEnv, mockCtx)
    expect(res.status).toBe(405)
  })

  // ── Content-Type ────────────────────────────────────────────────────────

  it('returns 415 when Content-Type is not application/json', async () => {
    const req = new Request('https://x.com/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'hello',
    })
    const res = await handleTTS(req, mockEnv, mockCtx)
    expect(res.status).toBe(415)
    expect((await json(res)).error).toContain('Content-Type')
  })

  // ── Input validation ────────────────────────────────────────────────────

  it('returns 400 when text is missing', async () => {
    const res = await handleTTS(post({ voice: 'en-US-Neural2-C' }), mockEnv, mockCtx)
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Text is required')
  })

  it('returns 400 when text is not a string', async () => {
    const res = await handleTTS(post({ text: 123 }), mockEnv, mockCtx)
    expect(res.status).toBe(400)
  })

  it('returns 400 when text is empty string', async () => {
    const res = await handleTTS(post({ text: '' }), mockEnv, mockCtx)
    expect(res.status).toBe(400)
  })

  it('returns 400 when text exceeds 3000 characters', async () => {
    const res = await handleTTS(post({ text: 'a'.repeat(3001) }), mockEnv, mockCtx)
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('3000')
  })

  it('accepts text of exactly 3000 characters', async () => {
    const res = await handleTTS(post({ text: 'a'.repeat(3000) }), mockEnv, mockCtx)
    expect(res.status).toBe(200)
  })

  // ── Voice allowlist ─────────────────────────────────────────────────────

  it('returns 400 for a voice not on the allowlist', async () => {
    const res = await handleTTS(
      post({ text: 'hello', voice: 'en-US-Standard-A' }),
      mockEnv,
      mockCtx,
    )
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Invalid voice')
  })

  it.each(['en-US-Neural2-C', 'en-US-Neural2-F', 'en-US-Wavenet-I'])(
    'accepts allowed voice "%s"',
    async (voice) => {
      const res = await handleTTS(post({ text: 'hi', voice }), mockEnv, mockCtx)
      expect(res.status).toBe(200)
    },
  )

  it('defaults to en-US-Neural2-F when voice is not provided', async () => {
    const res = await handleTTS(post({ text: 'hello' }), mockEnv, mockCtx)
    expect(res.status).toBe(200)
    // Verify the Google API was called with the default voice
    const googleCall = mockFetch.mock.calls.find(
      (call: unknown[]) => String(call[0]).includes('texttospeech.googleapis'),
    )
    expect(googleCall).toBeDefined()
    const body = JSON.parse((googleCall![1] as RequestInit).body as string)
    expect(body.voice.name).toBe('en-US-Neural2-F')
  })

  // ── Edge cache ──────────────────────────────────────────────────────────

  it('returns cached response on cache hit (skips Google API)', async () => {
    const cachedBody = JSON.stringify({
      audioContent: 'cached-audio',
      timepoints: [],
      characterCount: 5,
    })
    mockCacheMatch.mockResolvedValue(
      new Response(cachedBody, {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )

    const res = await handleTTS(post(VALID_BODY), mockEnv, mockCtx)
    expect(res.status).toBe(200)

    const body = await json(res)
    expect(body.audioContent).toBe('cached-audio')

    // Google TTS API should NOT have been called
    expect(mockFetch).not.toHaveBeenCalled()
  })

  it('stores response in cache via ctx.waitUntil on cache miss', async () => {
    await handleTTS(post(VALID_BODY), mockEnv, mockCtx)

    expect(mockCtx.waitUntil).toHaveBeenCalledTimes(1)
    // waitUntil receives the promise from cache.put()
    expect(mockCachePut).toHaveBeenCalledTimes(1)
  })

  // ── Rate limiting ───────────────────────────────────────────────────────

  it('allows the first request from a new IP', async () => {
    const res = await handleTTS(postFromIP(VALID_BODY, 'fresh-ip-1'), mockEnv, mockCtx)
    expect(res.status).toBe(200)
  })

  it('returns 429 after 15 requests per minute from the same IP', async () => {
    const ip = 'ratelimit-test-count'

    // Send 15 requests (all should succeed)
    for (let i = 0; i < 15; i++) {
      const res = await handleTTS(postFromIP({ text: 'x' }, ip), mockEnv, mockCtx)
      expect(res.status).toBe(200)
    }

    // 16th request should be rate-limited
    const res = await handleTTS(postFromIP({ text: 'x' }, ip), mockEnv, mockCtx)
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('60')
    expect((await json(res)).error).toContain('Too many requests')
  })

  it('returns 429 when per-IP character limit is exceeded', async () => {
    const ip = 'ratelimit-test-chars'
    // 30,000 char limit. Send 11 requests of 2800 chars each = 30,800 > 30,000
    for (let i = 0; i < 11; i++) {
      const res = await handleTTS(
        postFromIP({ text: 'a'.repeat(2800), voice: 'en-US-Neural2-C' }, ip),
        mockEnv,
        mockCtx,
      )
      if (res.status === 429) {
        // One of them should be rate-limited
        expect((await json(res)).error).toContain('Character limit exceeded')
        return // test passed
      }
    }
    // If we get here without a 429, that's a failure
    expect.unreachable('Expected a 429 from character rate limiting')
  })

  // ── Google TTS API ──────────────────────────────────────────────────────

  it('returns 502 when Google TTS API fails', async () => {
    mockFetch.mockResolvedValue(new Response('API Error', { status: 500 }))
    const res = await handleTTS(post(VALID_BODY), mockEnv, mockCtx)
    expect(res.status).toBe(502)
    expect((await json(res)).error).toContain('TTS generation failed')
  })

  it('does not leak upstream error details on Google API failure', async () => {
    mockFetch.mockResolvedValue(new Response('SECRET_KEY_INVALID', { status: 401 }))
    const res = await handleTTS(post(VALID_BODY), mockEnv, mockCtx)
    expect(res.status).toBe(502) // generic 502, not the upstream 401
    const body = await json(res)
    expect(JSON.stringify(body)).not.toContain('SECRET_KEY_INVALID')
  })

  it('passes correct payload to Google TTS API', async () => {
    await handleTTS(
      post({ text: 'Test sentence', voice: 'en-US-Wavenet-I' }),
      mockEnv,
      mockCtx,
    )
    const googleCall = mockFetch.mock.calls.find(
      (call: unknown[]) => String(call[0]).includes('texttospeech.googleapis'),
    )
    expect(googleCall).toBeDefined()

    const url = String(googleCall![0])
    expect(url).toContain('key=test-google-key')

    const body = JSON.parse((googleCall![1] as RequestInit).body as string)
    expect(body.input.text).toBe('Test sentence')
    expect(body.voice.name).toBe('en-US-Wavenet-I')
    expect(body.voice.languageCode).toBe('en-US')
    expect(body.audioConfig.audioEncoding).toBe('MP3')
  })

  // ── Successful response ─────────────────────────────────────────────────

  it('returns 200 with audioContent and characterCount', async () => {
    const res = await handleTTS(post({ text: 'Hello world' }), mockEnv, mockCtx)
    expect(res.status).toBe(200)

    const body = await json(res)
    expect(body.audioContent).toBe('base64audiocontent')
    expect(body.characterCount).toBe(11) // 'Hello world'.length
    expect(body).toHaveProperty('timepoints')
  })

  it('sets Cache-Control header for edge caching', async () => {
    const res = await handleTTS(post(VALID_BODY), mockEnv, mockCtx)
    expect(res.headers.get('Cache-Control')).toContain('max-age=86400')
  })

  // ── Malformed JSON ──────────────────────────────────────────────────────

  it('returns 500 when request body is not valid JSON', async () => {
    const req = new Request('https://x.com/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CF-Connecting-IP': 'json-error-ip',
      },
      body: '{not valid json',
    })
    const res = await handleTTS(req, mockEnv, mockCtx)
    expect(res.status).toBe(500)
  })
})
