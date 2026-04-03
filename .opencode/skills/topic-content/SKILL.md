---
name: topic-content
description: Author or edit CPACC topic content and practice questions following the DetailedTopicContent schema, content guidelines, TTS compatibility rules, and data pipeline conventions.
---

# Topic Content Authoring

Use this skill when creating new topic content, editing existing study material, or adding practice questions. All content lives in static TypeScript files -- never in a database or API at runtime.

## Content Architecture

```
src/data/
  topics.ts                    # Domain and topic definitions
  questions/
    types.ts                   # Question interface
    [topicId].ts               # One file per topic (e.g., 1a-theoretical-models.ts)
    index.ts                   # Barrel: ALL_QUESTIONS, QUESTION_COUNTS
  topicContent/
    types.ts                   # DetailedTopicContent, TopicSection, TopicSubsection interfaces
    [topicId].ts               # One file per topic
    index.ts                   # Barrel: topicDetailedContent record
```

## Topic Content Schema

### DetailedTopicContent

```typescript
interface DetailedTopicContent {
  topicId: string              // Must match ID in topics.ts (e.g., '1a-theoretical-models')
  introduction: string[]       // 2-3 paragraphs, ~100-150 words each (max 200 for TTS)
  learningPointsHeading?: string  // Defaults to "What you'll learn:" if omitted
  learningPoints?: string[]    // 3-6 action-oriented bullet points starting with verbs
  sections: TopicSection[]     // Main content sections (appear in Table of Contents)
}
```

### TopicSection

```typescript
interface TopicSection {
  heading: string              // Rendered as h2, used in Table of Contents
  content: string | string[]   // String = single paragraph, String[] = multiple paragraphs
  subsections?: TopicSubsection[]  // Optional, one level deep maximum
}
```

### TopicSubsection

```typescript
interface TopicSubsection {
  heading: string              // Rendered as h3
  content: string | string[]   // String = single paragraph, String[] = bullet list
}
```

## Content Rules

### Paragraphs

| Target | Maximum | Reason |
|---|---|---|
| 100-150 words | 200 words | Optimal for TTS, cognitive accessibility, and readability |

Break long paragraphs into multiple shorter ones. The TTS system processes each paragraph as a separate audio segment.

### Bold / Emphasis

Use `<strong>` HTML tags inline for key terms ONLY:

```typescript
content: 'The <strong>medical model</strong> views disability as a health condition requiring treatment.'
```

Rules:
- Bold key concept names, standard/specification names, specific references
- Do NOT bold entire sentences
- Do NOT bold for general emphasis
- Limit to 1-3 terms per paragraph
- Use `<strong>`, not `**markdown**` (this is rendered via `dangerouslySetInnerHTML`)

### Learning Points

Action-oriented, starting with verbs:

```typescript
learningPoints: [
  'Identify the key components of the social model of disability',
  'Explain how the medical and social models differ in their approach',
  'Recognize the impact of environmental barriers on people with disabilities',
  'Apply theoretical models to real-world accessibility scenarios',
]
```

Verbs to use: Identify, Understand, Explain, Recognize, Apply, Compare, Describe, Distinguish, Evaluate, Analyze.

### Sections

- Clear, descriptive headings (used in Table of Contents)
- 1-4 paragraphs per section
- Use subsections only for genuinely complex topics
- Maximum one level of nesting (section > subsection, never deeper)
- Include "Key Takeaways" as the final section for exam-focused summaries

### Content Rendering

The content is rendered by `src/components/TopicContent.tsx` which:

1. Wraps everything in `<article>`
2. Renders introduction paragraphs in `<section id="overview">`
3. Renders learning points in an `<aside>` with yellow background and sparkles icon
4. Renders each section as `<section>` with `<h2>` heading
5. Renders subsections with `<h3>` headings
6. String arrays in subsection content become `<ul>` bullet lists
7. Uses `dangerouslySetInnerHTML` for paragraphs (to support `<strong>` tags)
8. Assigns `data-tts-index` to each text element for TTS synchronization

### TTS Compatibility

Every text element gets a sequential `data-tts-index` attribute. The TTS system (`useTTSEngine`) uses `buildTextQueue()` from `src/utils/ttsTextProcessing.ts` to flatten all content into an ordered array of plain text strings. This means:

- Each paragraph = one TTS segment
- Each bullet point = one TTS segment
- `<strong>` tags are stripped for TTS (plain text only)
- Keep paragraphs under 200 words for reasonable audio segment length

## Adding a New Topic

### Step 1: Register the Topic

Add to `src/data/topics.ts` in the appropriate domain:

```typescript
// In the domain's topics array
{
  id: '1f-new-topic',
  title: 'New Topic Title',
  description: 'Brief description of the topic.',
}
```

Topic ID format: `{domainNum}{subCat}-{slug}` (e.g., `1a-theoretical-models`, `2c-wcag-principles`, `3f-integrating-ict`).

### Step 2: Create Content File

Create `src/data/topicContent/[topicId].ts`:

```typescript
import type { DetailedTopicContent } from './types'

export const newTopicSlug: DetailedTopicContent = {
  topicId: '1f-new-topic',

  introduction: [
    'First introductory paragraph setting context. What is this topic about and why does it matter for accessibility professionals? Aim for 100-150 words that establish the scope and importance of the subject.',
    'Second paragraph going deeper. How does this topic connect to the broader CPACC certification body of knowledge? What practical relevance does it have?',
  ],

  learningPointsHeading: 'After studying this topic, you will be able to:',

  learningPoints: [
    'Identify the key concepts covered in this topic',
    'Explain how this topic relates to accessibility practice',
    'Apply these principles in real-world scenarios',
  ],

  sections: [
    {
      heading: 'First Major Section',
      content: [
        'First paragraph of this section...',
        'Second paragraph of this section...',
      ],
      subsections: [
        {
          heading: 'Subsection Title',
          content: 'Single paragraph for this subsection.',
        },
        {
          heading: 'Another Subsection',
          content: [
            'Bullet point one',
            'Bullet point two',
            'Bullet point three',
          ],
        },
      ],
    },
    {
      heading: 'Key Takeaways',
      content: [
        'This topic is important because...',
        'For the CPACC exam, remember that...',
        'In practice, these concepts apply to...',
      ],
    },
  ],
}
```

### Step 3: Register in Barrel

Add to `src/data/topicContent/index.ts`:

```typescript
import { newTopicSlug } from './new-topic-slug'

export const topicDetailedContent: Record<string, DetailedTopicContent> = {
  // ... existing entries
  '1f-new-topic': newTopicSlug,
}
```

### Step 4: No Routing Changes Needed

The routing uses `:topicId` dynamic params, so new topics are automatically accessible at their domain path.

## Adding Practice Questions

### Question Interface

```typescript
interface Question {
  id: string           // Format: '{topicId}-q{number}' (e.g., '1a-theoretical-models-q1')
  topicId: string      // Must match topic ID in topics.ts
  question: string     // The question text
  options: string[]    // Exactly 4 answer options
  correctAnswer: number // 0-based index into options array (0, 1, 2, or 3)
  explanation?: string // Why the correct answer is correct
  subject?: string     // Sub-category within the topic
}
```

### Creating a Question File

Create `src/data/questions/[topicId].ts`:

```typescript
import type { Question } from './types'

export const questions_1f: Question[] = [
  {
    id: '1f-new-topic-q1',
    topicId: '1f-new-topic',
    question: 'Which of the following best describes...?',
    options: [
      'Option A text',
      'Option B text (correct)',
      'Option C text',
      'Option D text',
    ],
    correctAnswer: 1,  // 0-based: Option B
    explanation: 'Option B is correct because... Option A is incorrect because...',
    subject: 'Core Concepts',
  },
  // ... more questions
]
```

### Question Writing Rules

1. **Always 4 options** -- no more, no less
2. **correctAnswer is 0-based** -- 0 = first option, 3 = last option
3. **Explanation should explain why** the correct answer is right AND why distractors are wrong
4. **subject** categorizes questions within a topic for balanced test generation
5. **IDs must be unique** across all topics -- use the `{topicId}-q{N}` pattern
6. **Avoid "all of the above" / "none of the above"** -- these are poor assessment practice
7. **Questions should test understanding**, not rote memorization
8. **Distractors should be plausible** -- not obviously wrong

### Registering Questions

Add to `src/data/questions/index.ts`:

```typescript
import { questions_1f } from './1f-new-topic'

export const ALL_QUESTIONS: Question[] = [
  ...questions_1a,
  // ... existing spreads
  ...questions_1f,  // Add here
]

export const QUESTION_COUNTS: Record<string, number> = {
  '1A': questions_1a.length,
  // ... existing entries
  '1F': questions_1f.length,  // Add here
}
```

The key in `QUESTION_COUNTS` uses the uppercase subCategory code (e.g., `'1A'`, `'2C'`, `'3F'`).

## Complex Content Patterns

For topics with extensive content, you can split into subdirectories:

```
src/data/topicContent/my-complex-topic/
  index.ts           # Assembles and exports the final DetailedTopicContent
  section-one.ts     # Individual section data
  section-two.ts     # Individual section data
```

Example from the codebase: `categories-characteristics/`, `national-provincial/`, `regional-instruments/` all use this pattern.

## Data Integrity Tests

The project has automated tests at `src/data/__tests__/dataIntegrity.test.ts` that validate:

- Every topic in `topics.ts` has matching content in `topicDetailedContent`
- Every topic has at least one question
- No duplicate question IDs
- All `correctAnswer` values are valid indices (0-3)
- All questions have exactly 4 options

Run after any data changes:

```bash
npm test
```

## Heading Hierarchy in Rendered Content

When writing content, understand how it maps to the page's heading hierarchy:

```
h1: Topic title (from topics.ts, rendered by TopicDetailPage)
  h2: "Overview" (visually hidden, added by TopicContent.tsx)
    h3: learningPointsHeading (inside the yellow aside)
  h2: sections[0].heading
    h3: sections[0].subsections[0].heading
    h3: sections[0].subsections[1].heading
  h2: sections[1].heading
  h2: "Key Takeaways" (if present as final section)
```

## Checklist for New Content

- [ ] topicId matches entry in `topics.ts`
- [ ] Introduction has 2-3 paragraphs, each under 200 words
- [ ] Learning points are 3-6 items, action-oriented, starting with verbs
- [ ] All sections have clear, descriptive headings
- [ ] Bold text uses `<strong>` tags, limited to key terms (1-3 per paragraph)
- [ ] Subsection nesting is one level maximum
- [ ] Key Takeaways section (if present) is the final section
- [ ] Content exported from `topicContent/index.ts` barrel
- [ ] Questions have unique IDs, exactly 4 options, valid correctAnswer index
- [ ] Questions exported from `questions/index.ts` barrel with QUESTION_COUNTS updated
- [ ] `npm test` passes (data integrity tests)
