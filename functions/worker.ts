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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // Route API requests
    if (url.pathname === '/api/feedback' && request.method === 'POST') {
      return handleFeedback(request, env)
    }

    if (url.pathname === '/api/tts' && request.method === 'POST') {
      return handleTTS(request, env)
    }

    // Legacy URL redirects — return proper HTTP 301 so search engines
    // transfer link equity and stop indexing old paths.
    const redirect = getLegacyRedirect(url.pathname)
    if (redirect) {
      return redirect
    }

    // Serve static assets via the SPA asset handler
    const response = await env.ASSETS.fetch(request)

    // For HTML responses (i.e. SPA navigation routes), inject server-side
    // SEO meta tags so crawlers and social media bots see correct metadata
    // without needing to execute JavaScript.
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('text/html')) {
      const html = await response.text()
      const headers = new Headers(response.headers)
      headers.delete('content-length')

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

    return response
  }
}
