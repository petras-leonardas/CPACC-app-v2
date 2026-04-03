/** Escape HTML special characters to prevent content injection in emails. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

interface FeedbackEnv {
  DB: D1Database
  RESEND_API_KEY: string
  TURNSTILE_SECRET_KEY: string
}

interface FeedbackRequest {
  feedbackType: 'suggestion' | 'bug' | 'content'
  feedbackText: string
  email?: string
  pageUrl: string
  pageContext?: string
  turnstileToken: string
}

interface TurnstileVerifyResponse {
  success: boolean
  'error-codes'?: string[]
}

async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  remoteIp?: string
): Promise<{ success: boolean; errorCodes?: string[] }> {
  const formData = new URLSearchParams()
  formData.append('secret', secretKey)
  formData.append('response', token)
  if (remoteIp) {
    formData.append('remoteip', remoteIp)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  })

  const result = await response.json() as TurnstileVerifyResponse
  return { success: result.success, errorCodes: result['error-codes'] }
}

export async function handleFeedback(request: Request, env: FeedbackEnv): Promise<Response> {
  try {
    const body = await request.json() as FeedbackRequest

    // Validate required fields
    if (!body.feedbackType || !body.feedbackText || !body.pageUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (!['suggestion', 'bug', 'content'].includes(body.feedbackType)) {
      return new Response(
        JSON.stringify({ error: 'Invalid feedback type' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Server-side text length validation
    if (body.feedbackText.length > 500) {
      return new Response(
        JSON.stringify({ error: 'Feedback text exceeds maximum length of 500 characters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Verify Turnstile token
    if (!body.turnstileToken || typeof body.turnstileToken !== 'string' || body.turnstileToken.length > 2048) {
      return new Response(
        JSON.stringify({ error: 'Human verification is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const clientIp = request.headers.get('CF-Connecting-IP') || undefined
    const turnstileResult = await verifyTurnstileToken(
      body.turnstileToken,
      env.TURNSTILE_SECRET_KEY,
      clientIp
    )

    if (!turnstileResult.success) {
      console.error('Turnstile verification failed:', turnstileResult.errorCodes)
      return new Response(
        JSON.stringify({ error: 'Human verification failed. Please try again.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Get user agent for additional context
    const userAgent = request.headers.get('User-Agent') || 'Unknown'

    // Insert feedback into D1 database
    const result = await env.DB.prepare(
      `INSERT INTO feedback (feedback_type, feedback_text, email, page_url, page_context, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(
        body.feedbackType,
        body.feedbackText,
        body.email || null,
        body.pageUrl,
        body.pageContext || null,
        userAgent
      )
      .run()

    if (!result.success) {
      throw new Error('Failed to insert feedback into database')
    }

    // Send email notification via Resend
    const emailResult = await sendEmailNotification(
      env.RESEND_API_KEY,
      body,
      userAgent
    )

    if (!emailResult.success) {
      console.error('Email notification failed:', emailResult.error)
      // Don't fail the request if email fails - feedback is still saved
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Feedback submitted successfully',
        id: result.meta.last_row_id
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error processing feedback:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Failed to submit feedback. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

async function sendEmailNotification(
  apiKey: string,
  feedback: FeedbackRequest,
  userAgent: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const typeEmoji = {
      suggestion: '💡',
      bug: '🐛',
      content: '📚'
    }

    const emailHtml = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1f2937;">${typeEmoji[feedback.feedbackType]} New ${feedback.feedbackType.charAt(0).toUpperCase() + feedback.feedbackType.slice(1)} Feedback</h2>
        
        <div style="background: #f9fafb; border-left: 4px solid #111827; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(feedback.feedbackText)}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Type:</td>
            <td style="padding: 8px; color: #1f2937;">${escapeHtml(feedback.feedbackType)}</td>
          </tr>
          ${feedback.email ? `
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Email:</td>
            <td style="padding: 8px; color: #1f2937;"><a href="mailto:${escapeHtml(feedback.email)}" style="color: #2563eb;">${escapeHtml(feedback.email)}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Page:</td>
            <td style="padding: 8px; color: #1f2937;"><a href="${escapeHtml(feedback.pageUrl)}" style="color: #2563eb; word-break: break-all;">${escapeHtml(feedback.pageUrl)}</a></td>
          </tr>
          ${feedback.pageContext ? `
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Context:</td>
            <td style="padding: 8px; color: #1f2937;">${escapeHtml(feedback.pageContext)}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Browser:</td>
            <td style="padding: 8px; color: #6b7280; font-size: 12px;">${escapeHtml(userAgent)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Time:</td>
            <td style="padding: 8px; color: #1f2937;">${new Date().toLocaleString('en-US', { timeZone: 'UTC', dateStyle: 'full', timeStyle: 'long' })}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p style="margin: 0;">This notification was sent from CPACC Mastery feedback system.</p>
        </div>
      </div>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'CPACC Mastery <onboarding@resend.dev>',
        to: ['petras.leonardas@gmail.com'],
        subject: `[${feedback.feedbackType.toUpperCase()}] New feedback from CPACC Mastery`,
        html: emailHtml
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      return { success: false, error: `Resend API error: ${errorData}` }
    }

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}
