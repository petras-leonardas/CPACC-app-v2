interface Env {
  GOOGLE_TTS_API_KEY: string
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Only allow POST requests
  if (context.request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await context.request.json() as { text?: string; voice?: string }
    const { text, voice = 'en-US-Neural2-F' } = body

    if (!text) {
      return new Response(JSON.stringify({ error: 'Text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Call Google Cloud Text-to-Speech API
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${context.env.GOOGLE_TTS_API_KEY}`,
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

    const data = await response.json()

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
