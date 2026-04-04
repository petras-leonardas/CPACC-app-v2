// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { handleFeedback } from '../feedback'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

// Suppress console.error noise in test output
vi.spyOn(console, 'error').mockImplementation(() => {})

// Mock global fetch (used by verifyTurnstileToken and sendEmailNotification)
const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a mock D1 database. */
function createMockDB(insertSuccess = true) {
  const run = vi.fn().mockResolvedValue({ success: insertSuccess })
  const bind = vi.fn().mockReturnValue({ run })
  const prepare = vi.fn().mockReturnValue({ bind })
  return { prepare, _bind: bind, _run: run }
}

/** Build a mock FeedbackEnv. */
function createEnv(dbSuccess = true) {
  const db = createMockDB(dbSuccess)
  return {
    env: {
      DB: db,
      RESEND_API_KEY: 'test-resend-key',
      TURNSTILE_SECRET_KEY: 'test-turnstile-secret',
    } as unknown as Parameters<typeof handleFeedback>[1],
    db,
  }
}

/** Minimal valid feedback body. */
const VALID_BODY = {
  feedbackType: 'suggestion',
  feedbackText: 'Great app!',
  pageUrl: 'https://cpaccmastery.com/',
  turnstileToken: 'valid-token-123',
}

/** Create a POST Request with a JSON body. */
function post(body: unknown, headers?: Record<string, string>): Request {
  return new Request('https://cpaccmastery.com/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body),
  })
}

/** Parse a JSON Response body. */
async function json(r: Response) {
  return r.json() as Promise<Record<string, unknown>>
}

// ---------------------------------------------------------------------------
// Default mock: Turnstile succeeds, Resend succeeds
// ---------------------------------------------------------------------------
beforeEach(() => {
  vi.clearAllMocks()
  mockFetch.mockImplementation(async (url: string | URL | Request) => {
    const u = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url
    if (u.includes('turnstile')) {
      return new Response(JSON.stringify({ success: true }), { status: 200 })
    }
    if (u.includes('resend')) {
      return new Response(JSON.stringify({ id: 'email-1' }), { status: 200 })
    }
    return new Response('', { status: 404 })
  })
})

// ===========================================================================
// Tests
// ===========================================================================

describe('handleFeedback', () => {
  // ── Content-Type ────────────────────────────────────────────────────────

  it('returns 415 when Content-Type is not application/json', async () => {
    const { env } = createEnv()
    const req = new Request('https://x.com/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'hello',
    })
    const res = await handleFeedback(req, env)
    expect(res.status).toBe(415)
    expect((await json(res)).error).toContain('Content-Type')
  })

  // ── Required fields ─────────────────────────────────────────────────────

  it('returns 400 when feedbackType is missing', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ feedbackText: 'x', pageUrl: 'http://x.com', turnstileToken: 't' }),
      env,
    )
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Missing required fields')
  })

  it('returns 400 when feedbackText is missing', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ feedbackType: 'bug', pageUrl: 'http://x.com', turnstileToken: 't' }),
      env,
    )
    expect(res.status).toBe(400)
  })

  it('returns 400 when pageUrl is missing', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ feedbackType: 'bug', feedbackText: 'x', turnstileToken: 't' }),
      env,
    )
    expect(res.status).toBe(400)
  })

  // ── Feedback type validation ────────────────────────────────────────────

  it('returns 400 for an invalid feedbackType', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, feedbackType: 'praise' }),
      env,
    )
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Invalid feedback type')
  })

  it.each(['suggestion', 'bug', 'content'] as const)(
    'accepts feedbackType "%s"',
    async (type) => {
      const { env } = createEnv()
      const res = await handleFeedback(post({ ...VALID_BODY, feedbackType: type }), env)
      expect(res.status).toBe(200)
    },
  )

  // ── Text length validation ──────────────────────────────────────────────

  it('returns 400 when feedbackText is empty / whitespace', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(post({ ...VALID_BODY, feedbackText: '   ' }), env)
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('1–500')
  })

  it('returns 400 when feedbackText exceeds 500 characters', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, feedbackText: 'a'.repeat(501) }),
      env,
    )
    expect(res.status).toBe(400)
  })

  it('accepts feedbackText of exactly 500 characters', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, feedbackText: 'a'.repeat(500) }),
      env,
    )
    expect(res.status).toBe(200)
  })

  // ── Page URL length ─────────────────────────────────────────────────────

  it('returns 400 when pageUrl exceeds 2048 characters', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, pageUrl: 'https://x.com/' + 'a'.repeat(2048) }),
      env,
    )
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Page URL')
  })

  // ── Page context validation ─────────────────────────────────────────────

  it('returns 400 when pageContext exceeds 500 characters', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, pageContext: 'x'.repeat(501) }),
      env,
    )
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Page context')
  })

  it('returns 400 when pageContext is a non-string type', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, pageContext: 12345 }),
      env,
    )
    expect(res.status).toBe(400)
  })

  it('accepts a valid pageContext string', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, pageContext: '/topics/1a' }),
      env,
    )
    expect(res.status).toBe(200)
  })

  // ── Email validation ────────────────────────────────────────────────────

  it('returns 400 for an invalid email format', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, email: 'not-an-email' }),
      env,
    )
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Invalid email')
  })

  it('returns 400 when email exceeds 254 characters', async () => {
    const { env } = createEnv()
    const longEmail = 'a'.repeat(250) + '@b.com' // 256 chars
    const res = await handleFeedback(
      post({ ...VALID_BODY, email: longEmail }),
      env,
    )
    expect(res.status).toBe(400)
  })

  it('accepts a valid email', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, email: 'user@example.com' }),
      env,
    )
    expect(res.status).toBe(200)
  })

  it.each([undefined, null, ''])(
    'accepts email when value is %s (optional field)',
    async (emailValue) => {
      const { env } = createEnv()
      const res = await handleFeedback(
        post({ ...VALID_BODY, email: emailValue }),
        env,
      )
      expect(res.status).toBe(200)
    },
  )

  // ── Turnstile token validation ──────────────────────────────────────────

  it('returns 400 when turnstileToken is missing', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ feedbackType: 'bug', feedbackText: 'x', pageUrl: 'http://x.com' }),
      env,
    )
    expect(res.status).toBe(400)
    expect((await json(res)).error).toContain('Human verification')
  })

  it('returns 400 when turnstileToken exceeds 2048 characters', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(
      post({ ...VALID_BODY, turnstileToken: 'x'.repeat(2049) }),
      env,
    )
    expect(res.status).toBe(400)
  })

  // ── Turnstile verification ──────────────────────────────────────────────

  it('returns 403 when Turnstile verification fails', async () => {
    mockFetch.mockImplementation(async (url: string | URL | Request) => {
      const u = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url
      if (u.includes('turnstile')) {
        return new Response(JSON.stringify({ success: false, 'error-codes': ['invalid-input-response'] }), { status: 200 })
      }
      return new Response('', { status: 404 })
    })
    const { env } = createEnv()
    const res = await handleFeedback(post(VALID_BODY), env)
    expect(res.status).toBe(403)
    expect((await json(res)).error).toContain('Human verification failed')
  })

  it('returns 403 when Turnstile API returns a non-OK status', async () => {
    mockFetch.mockImplementation(async (url: string | URL | Request) => {
      const u = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url
      if (u.includes('turnstile')) {
        return new Response('Service Unavailable', { status: 503 })
      }
      return new Response('', { status: 404 })
    })
    const { env } = createEnv()
    const res = await handleFeedback(post(VALID_BODY), env)
    expect(res.status).toBe(403)
  })

  it('passes CF-Connecting-IP to Turnstile when available', async () => {
    const { env } = createEnv()
    await handleFeedback(
      post(VALID_BODY, { 'CF-Connecting-IP': '1.2.3.4' }),
      env,
    )

    // Find the Turnstile fetch call
    const turnstileCall = mockFetch.mock.calls.find(
      (call: unknown[]) => String(call[0]).includes('turnstile'),
    )
    expect(turnstileCall).toBeDefined()
    const body = (turnstileCall![1] as RequestInit).body as string
    expect(body).toContain('remoteip=1.2.3.4')
  })

  // ── Database insert ─────────────────────────────────────────────────────

  it('passes correct parameters to D1 prepare/bind', async () => {
    const { env, db } = createEnv()
    await handleFeedback(
      post({ ...VALID_BODY, email: 'a@b.com', pageContext: '/page' }),
      env,
    )
    expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO feedback'))
    expect(db._bind).toHaveBeenCalledWith(
      'suggestion',   // feedbackType
      'Great app!',   // feedbackText
      'a@b.com',      // email
      'https://cpaccmastery.com/', // pageUrl
      '/page',        // pageContext
      expect.any(String), // userAgent
    )
  })

  it('passes null for optional fields when omitted', async () => {
    const { env, db } = createEnv()
    await handleFeedback(post(VALID_BODY), env)
    expect(db._bind).toHaveBeenCalledWith(
      'suggestion',
      'Great app!',
      null,           // email omitted → null
      'https://cpaccmastery.com/',
      null,           // pageContext omitted → null
      expect.any(String),
    )
  })

  it('returns 500 when DB insert fails', async () => {
    const { env } = createEnv(/* dbSuccess */ false)
    const res = await handleFeedback(post(VALID_BODY), env)
    expect(res.status).toBe(500)
  })

  // ── Email notification ──────────────────────────────────────────────────

  it('still returns 200 when email notification fails', async () => {
    mockFetch.mockImplementation(async (url: string | URL | Request) => {
      const u = typeof url === 'string' ? url : url instanceof URL ? url.href : url.url
      if (u.includes('turnstile')) {
        return new Response(JSON.stringify({ success: true }), { status: 200 })
      }
      if (u.includes('resend')) {
        return new Response('Internal Server Error', { status: 500 })
      }
      return new Response('', { status: 404 })
    })
    const { env } = createEnv()
    const res = await handleFeedback(post(VALID_BODY), env)
    expect(res.status).toBe(200)
    expect((await json(res)).success).toBe(true)
  })

  // ── Success response ────────────────────────────────────────────────────

  it('returns 200 with success message on valid submission', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(post(VALID_BODY), env)
    expect(res.status).toBe(200)
    const body = await json(res)
    expect(body.success).toBe(true)
    expect(body.message).toContain('successfully')
  })

  it('does not expose database row ID in the response', async () => {
    const { env } = createEnv()
    const res = await handleFeedback(post(VALID_BODY), env)
    const body = await json(res)
    expect(body).not.toHaveProperty('id')
    expect(body).not.toHaveProperty('rowId')
  })

  // ── Malformed JSON ──────────────────────────────────────────────────────

  it('returns 500 when request body is not valid JSON', async () => {
    const { env } = createEnv()
    const req = new Request('https://x.com/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{not valid json',
    })
    const res = await handleFeedback(req, env)
    expect(res.status).toBe(500)
  })
})
