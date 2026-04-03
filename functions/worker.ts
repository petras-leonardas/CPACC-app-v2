import { handleFeedback } from './api/feedback'
import { handleTTS } from './api/tts'

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

    // For non-API routes, serve static assets
    // The [assets] config handles SPA routing via not_found_handling
    return env.ASSETS.fetch(request)
  }
}
