import type { DetailedTopicContent } from '../data/topicContent'

/**
 * Strip HTML tags and entities from text for TTS
 * 
 * Converts HTML content to clean, readable text suitable for text-to-speech.
 * Removes all HTML tags and converts common HTML entities to their text equivalents.
 * 
 * @param text - HTML string to clean
 * @returns Clean text suitable for TTS
 */
export function stripHtmlForTTS(text: string): string {
  // Create a temporary DOM element to parse HTML
  const temp = document.createElement('div')
  temp.innerHTML = text
  
  // Extract text content (automatically strips tags)
  let cleanText = temp.textContent || temp.innerText || ''
  
  // Convert common HTML entities to readable text
  cleanText = cleanText
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, 'and')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
  
  // Normalize whitespace
  cleanText = cleanText.replace(/\s+/g, ' ').trim()
  
  return cleanText
}

/**
 * Build text queue from topic content for TTS playback
 * 
 * Converts structured topic content into a flat array of text segments
 * suitable for sequential text-to-speech playback. Includes title,
 * introduction, learning points, sections, and subsections.
 * 
 * @param content - Detailed topic content structure
 * @param title - Topic title to include at the beginning
 * @returns Array of text segments ready for TTS
 */
export function buildTextQueue(content: DetailedTopicContent, title: string): string[] {
  const queue: string[] = []
  
  // Start with the page title for context
  queue.push(stripHtmlForTTS(title))
  
  // Add introduction paragraphs
  content.introduction.forEach(para => queue.push(stripHtmlForTTS(para)))
  
  // Add learning points if present
  if (content.learningPoints) {
    queue.push("Understanding these models helps you:")
    content.learningPoints.forEach(point => queue.push(stripHtmlForTTS(point)))
  }
  
  // Add all sections and their content
  content.sections.forEach(section => {
    if (section.heading) {
      queue.push(stripHtmlForTTS(section.heading))
    }
    
    if (Array.isArray(section.content)) {
      section.content.forEach(para => queue.push(stripHtmlForTTS(para)))
    } else if (section.content) {
      queue.push(stripHtmlForTTS(section.content))
    }
    
    // Add subsections if present
    if (section.subsections) {
      section.subsections.forEach(subsection => {
        if (subsection.heading) {
          queue.push(stripHtmlForTTS(subsection.heading))
        }
        if (Array.isArray(subsection.content)) {
          subsection.content.forEach(item => queue.push(stripHtmlForTTS(item)))
        } else {
          queue.push(stripHtmlForTTS(subsection.content))
        }
      })
    }
  })
  
  return queue
}
