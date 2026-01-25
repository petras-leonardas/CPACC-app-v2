# Topic Content Guidelines

This document defines the structure and formatting rules for topic content pages. Following these guidelines ensures consistent, accessible content that works well with screen readers, text-to-speech, and all users.

## Content Structure

Every topic page consists of the following elements:

### Required Elements

| Element | Description |
|---------|-------------|
| **Introduction** | 2-3 paragraphs setting context (~100-150 words each) |
| **Learning Points** | 3-6 action-oriented bullet points |
| **Sections** | Main content organized under clear headings |

### Optional Elements

| Element | Description |
|---------|-------------|
| **Key Takeaways** | Exam-focused summary as final section |
| **Subsections** | Additional organization within complex sections |

---

## Template Structure

### Introduction

- 2-3 paragraphs
- ~100-150 words per paragraph (max 200 for TTS accessibility)
- Sets context: what is this topic and why does it matter?
- No heading required (appears at top of content)

### Learning Points

- 3-6 bullet points
- Action-oriented, starting with verbs
- Single sentence each
- Example verbs: Identify, Understand, Explain, Recognize, Apply, Compare

### Sections

- Clear, descriptive headings
- 1-4 paragraphs per section
- Use subsections only when necessary for complex topics
- Limit nesting to one level (sections → subsections, no deeper)

### Key Takeaways (optional)

- Place as the final section when included
- Bullet list format
- Exam-focused, factual summaries
- Bold key terms for emphasis

---

## Writing Guidelines

### Paragraph Length

| Target | Maximum | Why |
|--------|---------|-----|
| 100-150 words | 200 words | Optimal for TTS, cognitive accessibility, and readability |

### Emphasis (Bold Text)

Use `<strong>` tags for key terms only:

**Do:**
- `<strong>medical model</strong>` - key concept name
- `<strong>WCAG 2.2</strong>` - standard/specification name
- `<strong>Article 9</strong>` - specific reference

**Don't:**
- Bold entire sentences
- Bold for general emphasis
- Overuse (limit to 1-3 terms per paragraph)

### Plain Language

- Define jargon on first use
- Use active voice when possible
- Write for clarity over formality
- Keep sentences concise

---

## HTML/Accessibility Mapping

Content elements map to semantic HTML as follows:

| Content Element | HTML Output | Heading Level |
|-----------------|-------------|---------------|
| Page title | (rendered by parent) | h1 |
| Topic wrapper | `<article>` | — |
| Overview section | `<section id="overview">` | h2 (sr-only) |
| Learning points | `<aside>` with `<ul>` | h3 |
| Main section | `<section>` | h2 |
| Subsection | `<section>` (nested) | h3 |
| Paragraph | `<p>` | — |
| List | `<ul>` with `<li>` | — |

### Heading Hierarchy

```
h1: Page title (topic name)
  h2: Overview (visually hidden)
    h3: Learning points heading
  h2: Section 1
    h3: Subsection 1a
    h3: Subsection 1b
  h2: Section 2
  h2: Key takeaways
```

---

## Data Structure Reference

Topic content is stored in TypeScript files using this structure:

```typescript
{
  topicId: '1a-theoretical-models',
  
  introduction: [
    'First paragraph (~100-150 words)...',
    'Second paragraph...'
  ],
  
  learningPointsHeading: 'Understanding this helps you:', // optional
  
  learningPoints: [
    'Identify key concepts...',
    'Explain the relationship between...',
    'Apply principles to real situations...'
  ],
  
  sections: [
    {
      heading: 'Section title',
      content: [
        'Paragraph one...',
        'Paragraph two...'
      ],
      subsections: [ // optional
        {
          heading: 'Subsection title',
          content: 'Single paragraph or array of list items...'
        }
      ]
    }
  ]
}
```

---

## Checklist for New Content

Before submitting content, verify:

- [ ] Introduction has 2-3 paragraphs
- [ ] Each paragraph is under 200 words
- [ ] Learning points are 3-6 items, action-oriented
- [ ] All sections have clear, descriptive headings
- [ ] Key terms are marked with `<strong>` (not overused)
- [ ] Subsection nesting is limited to one level
- [ ] Key takeaways (if included) are exam-focused
