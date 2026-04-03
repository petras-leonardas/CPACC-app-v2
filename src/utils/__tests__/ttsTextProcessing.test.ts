import { buildTextQueue } from '../ttsTextProcessing'
import { topicDetailedContent } from '../../data/topicContent'
import type { DetailedTopicContent } from '../../data/topicContent'

// Use a real topic for integration-style tests
const testTopicId = '1a-theoretical-models'
const testContent = topicDetailedContent[testTopicId]
const testTitle = 'Theoretical Models of Disability'

describe('buildTextQueue', () => {
  it('builds a non-empty queue from real topic content', () => {
    const queue = buildTextQueue(testContent, testTitle)
    expect(queue.length).toBeGreaterThan(0)
  })

  it('returns an array of strings', () => {
    const queue = buildTextQueue(testContent, testTitle)
    queue.forEach(item => {
      expect(typeof item).toBe('string')
    })
  })

  it('contains no empty strings', () => {
    const queue = buildTextQueue(testContent, testTitle)
    queue.forEach(item => {
      expect(item.trim().length).toBeGreaterThan(0)
    })
  })

  it('starts with the title', () => {
    const queue = buildTextQueue(testContent, testTitle)
    expect(queue[0]).toBe(testTitle)
  })

  it('includes introduction text', () => {
    const queue = buildTextQueue(testContent, testTitle)
    // Introduction paragraphs follow the title
    // At minimum the first introduction paragraph should appear early in the queue
    const introText = testContent.introduction[0]
    // Strip HTML from intro for comparison (the function strips HTML)
    const temp = document.createElement('div')
    temp.innerHTML = introText
    const cleanIntro = (temp.textContent || '').replace(/\s+/g, ' ').trim()

    expect(queue).toContain(cleanIntro)
  })

  it('includes section headings', () => {
    const queue = buildTextQueue(testContent, testTitle)
    const headings = testContent.sections.map(s => s.heading).filter(Boolean)

    headings.forEach(heading => {
      const temp = document.createElement('div')
      temp.innerHTML = heading
      const cleanHeading = (temp.textContent || '').replace(/\s+/g, ' ').trim()
      expect(queue).toContain(cleanHeading)
    })
  })

  it('includes section content', () => {
    const queue = buildTextQueue(testContent, testTitle)
    // Check at least one section's content appears in the queue
    const firstSectionWithContent = testContent.sections.find(
      s => s.content && (typeof s.content === 'string' ? s.content.length > 0 : s.content.length > 0)
    )

    if (firstSectionWithContent) {
      const contentText = Array.isArray(firstSectionWithContent.content)
        ? firstSectionWithContent.content[0]
        : firstSectionWithContent.content

      if (contentText) {
        const temp = document.createElement('div')
        temp.innerHTML = contentText
        const cleanContent = (temp.textContent || '').replace(/\s+/g, ' ').trim()
        expect(queue).toContain(cleanContent)
      }
    }
  })

  it('strips HTML tags from content', () => {
    const queue = buildTextQueue(testContent, testTitle)
    queue.forEach(item => {
      // No HTML tags should remain in any queue item
      expect(item).not.toMatch(/<[^>]+>/)
    })
  })

  it('strips HTML tags from content with explicit HTML input', () => {
    const contentWithHtml: DetailedTopicContent = {
      topicId: 'test-topic',
      introduction: ['This has <strong>bold</strong> and <em>italic</em> text.'],
      sections: [
        {
          heading: 'A <strong>formatted</strong> heading',
          content: 'Paragraph with <a href="#">a link</a> inside.',
        },
      ],
    }
    const queue = buildTextQueue(contentWithHtml, 'Test Topic')

    queue.forEach(item => {
      expect(item).not.toMatch(/<[^>]+>/)
    })

    expect(queue).toContain('This has bold and italic text.')
    expect(queue).toContain('A formatted heading')
    expect(queue).toContain('Paragraph with a link inside.')
  })

  it('includes learning points when present', () => {
    const contentWithLP: DetailedTopicContent = {
      topicId: 'test-lp',
      introduction: ['Intro paragraph.'],
      learningPointsHeading: 'You will learn:',
      learningPoints: ['First point', 'Second point'],
      sections: [{ heading: 'Section', content: 'Content.' }],
    }
    const queue = buildTextQueue(contentWithLP, 'LP Test')

    expect(queue).toContain('You will learn:')
    expect(queue).toContain('First point')
    expect(queue).toContain('Second point')
  })

  it('handles sections with subsections', () => {
    const contentWithSubs: DetailedTopicContent = {
      topicId: 'test-subs',
      introduction: ['Intro.'],
      sections: [
        {
          heading: 'Main Section',
          content: 'Main content.',
          subsections: [
            { heading: 'Subsection A', content: 'Sub A content.' },
            { heading: 'Subsection B', content: ['Sub B item 1', 'Sub B item 2'] },
          ],
        },
      ],
    }
    const queue = buildTextQueue(contentWithSubs, 'Sub Test')

    expect(queue).toContain('Subsection A')
    expect(queue).toContain('Sub A content.')
    expect(queue).toContain('Subsection B')
    expect(queue).toContain('Sub B item 1')
    expect(queue).toContain('Sub B item 2')
  })
})
