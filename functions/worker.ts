import { handleFeedback } from './api/feedback'
import { handleTTS } from './api/tts'
import { injectSEO, inject404SEO, getRouteMeta } from './seo'
import { getLegacyRedirect } from './redirects'

interface Env {
  DB: D1Database
  RESEND_API_KEY: string
  GOOGLE_TTS_API_KEY: string
  TURNSTILE_SECRET_KEY: string
  ASSETS: Fetcher
}

// ---------------------------------------------------------------------------
// Allowed origins for API requests.  The Origin header is checked on every
// POST to /api/* so that cross-origin requests from unknown sites are
// rejected before reaching any handler.  This is defence-in-depth — it
// blocks browser-based cross-origin abuse but not curl/scripts (which can
// omit or spoof Origin).
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = new Set([
  'https://cpaccmastery.com',
  'https://cpacc-mastery-final.petras-leonardas.workers.dev',
])

/** Return true when the request origin is acceptable for an API call. */
function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin')

  // Requests without an Origin header come from non-browser contexts (curl,
  // server-to-server) or same-origin navigations.  We allow them because the
  // per-endpoint controls (Turnstile, rate limiting) handle those cases.
  if (!origin) return true

  if (ALLOWED_ORIGINS.has(origin)) return true

  // Accept any preview-deployment subdomain for the same Pages project
  if (origin.endsWith('.petras-leonardas.workers.dev') && origin.startsWith('https://')) {
    return true
  }

  // Local development
  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return true
  }

  return false
}

// ---------------------------------------------------------------------------
// Security headers
// ---------------------------------------------------------------------------

/** Baseline security headers applied to ALL responses (HTML and API). */
const BASELINE_SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
}

/** Additional headers applied only to HTML (page) responses. */
const HTML_SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  // CSP: allow self, Cloudflare analytics beacon, Amplitude, Turnstile,
  // Google TTS (connect-src), and inline styles (used by design system
  // tokens and react-helmet-async).
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' https://static.cloudflareinsights.com https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self' https://api2.amplitude.com https://texttospeech.googleapis.com https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "object-src 'none'",
    "base-uri 'self'",
  ].join('; '),
}

function applyBaselineHeaders(headers: Headers): void {
  for (const [key, value] of Object.entries(BASELINE_SECURITY_HEADERS)) {
    headers.set(key, value)
  }
}

function applyHtmlHeaders(headers: Headers): void {
  applyBaselineHeaders(headers)
  for (const [key, value] of Object.entries(HTML_SECURITY_HEADERS)) {
    headers.set(key, value)
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    // ── API routes ────────────────────────────────────────────────────────
    // Validate the Origin header before dispatching to any API handler.
    if (url.pathname.startsWith('/api/')) {
      if (!isAllowedOrigin(request)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json', ...BASELINE_SECURITY_HEADERS },
        })
      }

      if (url.pathname === '/api/feedback' && request.method === 'POST') {
        const apiResponse = await handleFeedback(request, env)
        applyBaselineHeaders(apiResponse.headers)
        return apiResponse
      }

      if (url.pathname === '/api/tts' && request.method === 'POST') {
        const apiResponse = await handleTTS(request, env, ctx)
        applyBaselineHeaders(apiResponse.headers)
        return apiResponse
      }

      // Unknown API path or method
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...BASELINE_SECURITY_HEADERS },
      })
    }

    // ── Legacy URL redirects ──────────────────────────────────────────────
    // Return proper HTTP 301 so search engines transfer link equity and
    // stop indexing old paths.
    const redirect = getLegacyRedirect(url.pathname)
    if (redirect) {
      return redirect
    }

    // ── Static assets / SPA fallback ──────────────────────────────────────
    const response = await env.ASSETS.fetch(request)

    // For HTML responses (i.e. SPA navigation routes), inject server-side
    // SEO meta tags so crawlers and social media bots see correct metadata
    // without needing to execute JavaScript.
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('text/html')) {
      const html = await response.text()
      const headers = new Headers(response.headers)
      headers.delete('content-length')

      // Add security headers to every HTML response
      applyHtmlHeaders(headers)

      // Known route → inject per-page SEO meta, serve 200
      // Unknown route → inject noindex, serve 404
      const meta = getRouteMeta(url.pathname)
      if (meta) {
        const injected = injectSEO(html, url.pathname)
        return new Response(injected, { status: 200, headers })
      } else {
        const injected = inject404SEO(html)
        return new Response(injected, { status: 404, headers })
      }
    }

    // Static assets — apply baseline security headers
    const assetHeaders = new Headers(response.headers)
    applyBaselineHeaders(assetHeaders)
    return new Response(response.body, { status: response.status, headers: assetHeaders })
  }
}
