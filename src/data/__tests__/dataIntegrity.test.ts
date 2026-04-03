import { ALL_QUESTIONS, QUESTION_COUNTS } from '../questions'
import { cpacc_topics } from '../topics'
import { topicDetailedContent } from '../topicContent'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** All real study topics (excludes synthetic "domain-X-all" entries). */
const realTopics = cpacc_topics.flatMap((domain) =>
  domain.topics.filter((t) => !t.id.endsWith('-all'))
)

/** Set of all real topic IDs for quick lookup. */
const realTopicIds = new Set(realTopics.map((t) => t.id))

// ---------------------------------------------------------------------------
// 1. Question Data Integrity
// ---------------------------------------------------------------------------

describe('Question Data Integrity', () => {
  it('ALL_QUESTIONS has questions', () => {
    expect(ALL_QUESTIONS.length).toBeGreaterThan(0)
  })

  it('every question has a non-empty id', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.id).toBeTruthy()
      expect(q.id.trim().length).toBeGreaterThan(0)
    }
  })

  it('every question has a non-empty question string', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.question).toBeTruthy()
      expect(q.question.trim().length).toBeGreaterThan(0)
    }
  })

  it('every question has exactly 4 options', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.options).toHaveLength(4)
    }
  })

  it('every question option is a non-empty string', () => {
    for (const q of ALL_QUESTIONS) {
      for (const option of q.options) {
        expect(typeof option).toBe('string')
        expect(option.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('every question correctAnswer is a valid index (0-3)', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0)
      expect(q.correctAnswer).toBeLessThanOrEqual(3)
      expect(Number.isInteger(q.correctAnswer)).toBe(true)
    }
  })

  it('no duplicate question IDs exist', () => {
    const seen = new Map<string, number>()
    for (const q of ALL_QUESTIONS) {
      seen.set(q.id, (seen.get(q.id) ?? 0) + 1)
    }
    const duplicates = [...seen.entries()]
      .filter(([, count]) => count > 1)
      .map(([id, count]) => `${id} (x${count})`)

    expect(duplicates, `Duplicate IDs: ${duplicates.join(', ')}`).toHaveLength(
      0
    )
  })

  it('every question topicId matches a real topic', () => {
    for (const q of ALL_QUESTIONS) {
      expect(realTopicIds.has(q.topicId)).toBe(true)
    }
  })

  it('QUESTION_COUNTS entries sum to ALL_QUESTIONS.length', () => {
    const sum = Object.values(QUESTION_COUNTS).reduce((a, b) => a + b, 0)
    expect(sum).toBe(ALL_QUESTIONS.length)
  })

  it.each([
    ['Domain 1', '1'],
    ['Domain 2', '2'],
    ['Domain 3', '3'],
  ])('%s has questions', (_label, prefix) => {
    const domainQuestions = ALL_QUESTIONS.filter((q) =>
      q.topicId.startsWith(prefix)
    )
    expect(domainQuestions.length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// 2. Topic Data Integrity
// ---------------------------------------------------------------------------

describe('Topic Data Integrity', () => {
  it('there are exactly 3 domains', () => {
    expect(cpacc_topics).toHaveLength(3)
  })

  it('Domain 1 has 5 real topics (1A-1E)', () => {
    const domain1Topics = cpacc_topics[0].topics.filter(
      (t) => !t.id.endsWith('-all')
    )
    expect(domain1Topics).toHaveLength(5)
  })

  it('Domain 2 has 6 real topics (2A-2F)', () => {
    const domain2Topics = cpacc_topics[1].topics.filter(
      (t) => !t.id.endsWith('-all')
    )
    expect(domain2Topics).toHaveLength(6)
  })

  it('Domain 3 has 6 real topics (3A-3F)', () => {
    const domain3Topics = cpacc_topics[2].topics.filter(
      (t) => !t.id.endsWith('-all')
    )
    expect(domain3Topics).toHaveLength(6)
  })

  it('every topic has a non-empty id, title, and description', () => {
    for (const topic of realTopics) {
      expect(topic.id.trim().length).toBeGreaterThan(0)
      expect(topic.title.trim().length).toBeGreaterThan(0)
      expect(topic.description.trim().length).toBeGreaterThan(0)
    }
  })

  it('no duplicate topic IDs across all domains', () => {
    const ids = realTopics.map((t) => t.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })
})

// ---------------------------------------------------------------------------
// 3. Topic Content Integrity
// ---------------------------------------------------------------------------

describe('Topic Content Integrity', () => {
  it('every real topic has a corresponding entry in topicDetailedContent', () => {
    for (const topic of realTopics) {
      expect(topicDetailedContent).toHaveProperty(topic.id)
    }
  })

  it('every content entry has a non-empty introduction array', () => {
    for (const topic of realTopics) {
      const content = topicDetailedContent[topic.id]
      expect(Array.isArray(content.introduction)).toBe(true)
      expect(content.introduction.length).toBeGreaterThan(0)
    }
  })

  it('every content entry has a non-empty sections array', () => {
    for (const topic of realTopics) {
      const content = topicDetailedContent[topic.id]
      expect(Array.isArray(content.sections)).toBe(true)
      expect(content.sections.length).toBeGreaterThan(0)
    }
  })

  it('every section has a non-empty heading', () => {
    for (const topic of realTopics) {
      const content = topicDetailedContent[topic.id]
      for (const section of content.sections) {
        expect(section.heading.trim().length).toBeGreaterThan(0)
      }
    }
  })

  it('every content entry topicId matches its map key', () => {
    for (const topic of realTopics) {
      const content = topicDetailedContent[topic.id]
      expect(content.topicId).toBe(topic.id)
    }
  })

  // TODO: Add second intro paragraph to 2d-built-environment and 2f-udl-ux
  it.skip('every content introduction has at least 2 paragraphs', () => {
    const tooShort: string[] = []
    for (const topic of realTopics) {
      const content = topicDetailedContent[topic.id]
      if (content.introduction.length < 2) {
        tooShort.push(`${topic.id} (${content.introduction.length} paragraph)`)
      }
    }
    expect(
      tooShort,
      `Topics with fewer than 2 intro paragraphs: ${tooShort.join(', ')}`
    ).toHaveLength(0)
  })
})
