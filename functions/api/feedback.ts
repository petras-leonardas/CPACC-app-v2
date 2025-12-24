interface Env {
  DB: D1Database
  RESEND_API_KEY: string
}

interface FeedbackRequest {
  feedbackType: 'suggestion' | 'bug' | 'content'
  feedbackText: string
  email?: string
  pageUrl: string
  pageContext?: string
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json() as FeedbackRequest

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

    // Get user agent for additional context
    const userAgent = context.request.headers.get('User-Agent') || 'Unknown'

    // Insert feedback into D1 database
    const result = await context.env.DB.prepare(
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
      context.env.RESEND_API_KEY,
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
        error: 'Failed to submit feedback',
        details: error instanceof Error ? error.message : 'Unknown error'
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
          <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${feedback.feedbackText}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Type:</td>
            <td style="padding: 8px; color: #1f2937;">${feedback.feedbackType}</td>
          </tr>
          ${feedback.email ? `
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Email:</td>
            <td style="padding: 8px; color: #1f2937;"><a href="mailto:${feedback.email}" style="color: #2563eb;">${feedback.email}</a></td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Page:</td>
            <td style="padding: 8px; color: #1f2937;"><a href="${feedback.pageUrl}" style="color: #2563eb; word-break: break-all;">${feedback.pageUrl}</a></td>
          </tr>
          ${feedback.pageContext ? `
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Context:</td>
            <td style="padding: 8px; color: #1f2937;">${feedback.pageContext}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 8px; color: #6b7280; font-weight: 600;">Browser:</td>
            <td style="padding: 8px; color: #6b7280; font-size: 12px;">${userAgent}</td>
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
