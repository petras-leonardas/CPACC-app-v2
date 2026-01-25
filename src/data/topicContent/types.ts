/**
 * Represents a subsection within a topic section.
 * Subsections provide additional organization for complex content.
 * Rendered with h3 headings, nested within their parent section.
 */
export interface TopicSubsection {
  /**
   * Subsection heading (rendered as h3).
   * Keep concise but descriptive.
   */
  heading: string

  /**
   * Subsection content.
   * - String: rendered as a single paragraph
   * - String[]: rendered as a bullet list
   *
   * Can include HTML for emphasis: <strong>key term</strong>
   */
  content: string | string[]
}

/**
 * Represents a main content section within a topic.
 * Each section gets its own h2 heading and anchor ID for navigation.
 */
export interface TopicSection {
  /**
   * Section heading (rendered as h2).
   * Used for Table of Contents navigation.
   * Keep concise but descriptive.
   */
  heading: string

  /**
   * Section content.
   * - String: single paragraph
   * - String[]: multiple paragraphs
   * - Empty string/array: use when section only has subsections
   *
   * Can include HTML for emphasis: <strong>key term</strong>
   */
  content: string | string[]

  /**
   * Optional subsections for complex topics.
   * Rendered with h3 headings nested under the parent section.
   * Limit nesting to one level (no sub-subsections).
   */
  subsections?: TopicSubsection[]
}

/**
 * Complete content structure for a topic detail page.
 * This schema ensures consistent, accessible content across all topics.
 *
 * @example
 * ```typescript
 * const myTopic: DetailedTopicContent = {
 *   topicId: '1a-theoretical-models',
 *   introduction: ['First paragraph...', 'Second paragraph...'],
 *   learningPoints: ['Identify...', 'Explain...', 'Apply...'],
 *   sections: [{ heading: 'Overview', content: ['...'] }]
 * }
 * ```
 */
export interface DetailedTopicContent {
  /**
   * Unique topic identifier.
   * Must match the topic ID in topics.ts (e.g., '1a-theoretical-models').
   */
  topicId: string

  /**
   * Introduction paragraphs (2-3 recommended).
   * Sets context and explains why the topic matters.
   * Each paragraph should be ~100-150 words for optimal TTS/readability.
   */
  introduction: string[]

  /**
   * Custom heading for the learning points section.
   * Defaults to "What you'll learn:" if omitted.
   *
   * @example "Understanding these models helps you:"
   * @example "After studying this topic, you'll be able to:"
   */
  learningPointsHeading?: string

  /**
   * Learning objectives (3-6 recommended).
   * Action-oriented bullet points starting with verbs.
   *
   * @example "Identify the key components of WCAG 2.2"
   * @example "Explain why accessibility benefits everyone"
   */
  learningPoints?: string[]

  /**
   * Main content sections.
   * Each section appears in the Table of Contents.
   * Include "Key takeaways" as final section if exam-focused summary is needed.
   */
  sections: TopicSection[]
}
