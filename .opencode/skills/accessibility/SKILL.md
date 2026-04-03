---
name: accessibility
description: Implement and verify WCAG 2.1 AA compliance in CPACC Mastery -- focus management, keyboard navigation, ARIA patterns, screen reader support, color contrast, and Playwright axe-core testing.
---

# Accessibility & WCAG Compliance

Use this skill when building new UI, modifying existing components, or auditing accessibility. This application is a study tool for the CPACC accessibility certification -- accessibility is not optional, it is a core requirement.

**Target:** WCAG 2.1 Level AA conformance.

## Semantic HTML

Always use the correct HTML element for its purpose. Never use `<div>` or `<span>` for interactive content.

| Purpose | Element | DS Component |
|---|---|---|
| Page title | `<h1>` | `<Heading as="h1">` |
| Section heading | `<h2>` | `<Heading as="h2">` |
| Subsection heading | `<h3>` | `<Heading as="h3">` |
| Body paragraph | `<p>` | `<Text>` |
| Navigation | `<nav>` | -- |
| Main content | `<main>` | -- |
| Sidebar | `<aside>` or `<nav>` | -- |
| Footer | `<footer>` | -- |
| List of items | `<ul>` / `<ol>` with `<li>` | -- |
| Button (action) | `<button>` | `<Button>` / `<IconButton>` |
| Link (navigation) | `<a>` | `<Link>` (DS) or React Router `<Link>` |
| Labeled content | `<section>` with `aria-labelledby` | -- |

## Heading Hierarchy

Every page MUST maintain a valid heading hierarchy. Never skip levels.

```
h1: Page title (exactly one per page)
  h2: Major section
    h3: Subsection
  h2: Another major section
    h3: Subsection
```

The DS `<Heading>` component enforces correct typography but does NOT enforce hierarchy -- you must choose the right `as` prop.

For topic content pages, the hierarchy is:
```
h1: Topic name (set by TopicDetailPage)
  h2: "Overview" (sr-only, wraps introduction)
    h3: Learning points heading
  h2: Section heading (from topicContent.sections[].heading)
    h3: Subsection heading (from subsections[].heading)
  h2: "Key Takeaways" (if present)
```

## Keyboard Navigation

### All Interactive Elements Must Be Keyboard Accessible

1. **Focusable:** Can receive focus via Tab (or Shift+Tab for reverse)
2. **Operable:** Can be activated with Enter or Space
3. **Visible focus:** Has a visible focus indicator (orange ring from DS)

### Focus Ring Pattern

All DS components use the brand orange focus ring. When building custom interactive elements, apply:

```tsx
// Tailwind classes
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-[var(--focus-ring-color)]"

// Inline style (required to set the CSS variable)
style={{
  '--focus-ring-color': isDark
    ? components.border.focus.dark   // brand.orange[400] = '#F39C52'
    : components.border.focus.light, // brand.orange[500] = '#E67E22'
} as React.CSSProperties}
```

Use `focus-visible` (NOT `focus`) so the ring only appears on keyboard navigation, not mouse clicks.

### Escape Key

Modals, dropdowns, sidebars, and overlays MUST close on Escape:

```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }
  document.addEventListener('keydown', handleKeyDown)
  return () => document.removeEventListener('keydown', handleKeyDown)
}, [onClose])
```

### No Focus Traps (except modals)

Users must be able to Tab through the entire page without getting stuck. The only exception is modal dialogs, which SHOULD trap focus while open (the DS `<Modal>` component handles this).

## Focus Management

### Route Changes

When the user navigates to a new page, focus should move to a meaningful element -- typically the page heading or the main content area:

```tsx
// Pattern used in TopicDetailPage
const headingRef = useRef<HTMLHeadingElement>(null)
useEffect(() => {
  headingRef.current?.focus()
}, [topicId])

<Heading as="h1" ref={headingRef} tabIndex={-1}>
  {topic.title}
</Heading>
```

Note: `tabIndex={-1}` makes the element programmatically focusable without adding it to the Tab order.

### Modal Open/Close

The DS `<Modal>` component handles this automatically:
- On open: stores previously focused element, focuses the modal
- On close: restores focus to the previously focused element
- Prevents body scroll while open

### Dynamic Content

When new content appears (e.g., test results, toast notifications), manage focus appropriately:
- **Toast notifications:** Use `aria-live="polite"` (handled by DS `<ToastContainer>`)
- **Error messages:** Use `aria-live="assertive"` or `role="alert"`
- **Loading states:** Use `aria-busy="true"` on the container

## Skip Link

Every page includes a skip link via the Layout component. The DS `<SkipLink>` component:

```tsx
<SkipLink href="#main-content">Skip to main content</SkipLink>
```

The main content area MUST have `id="main-content"` and `tabIndex={-1}`:

```tsx
<main id="main-content" tabIndex={-1}>
```

For topic detail pages, additional skip links target the table of contents:
```tsx
<SkipLink href="#table-of-contents">Skip to table of contents</SkipLink>
```

## ARIA Patterns

### Landmarks

Every page should have these landmarks:
- `<nav>` -- sidebar navigation + any page-level navigation
- `<main>` -- primary content area
- `<footer>` -- page footer
- `<aside>` -- supplementary content (e.g., learning points box)

### Live Regions

For content that changes dynamically:

```tsx
// Polite -- screen reader announces at next pause
<div aria-live="polite">
  {statusMessage}
</div>

// Assertive -- screen reader announces immediately (errors only)
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

### Expandable Content

For sidebar, dropdowns, accordions:

```tsx
<button
  aria-expanded={isOpen}
  aria-controls="panel-id"
  onClick={() => setIsOpen(!isOpen)}
>
  Toggle Section
</button>
<div id="panel-id" hidden={!isOpen}>
  Panel content
</div>
```

### Dialogs

The DS `<Modal>` component applies these automatically:
- `role="dialog"`
- `aria-modal="true"`
- `aria-labelledby="modal-title"` (pointing to the heading)

### Icon Buttons

Icons without visible text MUST have accessible names:

```tsx
// Using DS IconButton (preferred)
<IconButton
  icon={<Moon size={20} />}
  aria-label="Switch to dark mode"
  variant="ghost"
/>

// Or manual
<button aria-label="Close sidebar">
  <X size={20} aria-hidden="true" />
</button>
```

Decorative icons next to text should be hidden: `aria-hidden="true"`.

### Screen Reader Only Text

For content that should be read by screen readers but not displayed visually:

```tsx
<span className="sr-only">Additional context for screen readers</span>
```

Common uses:
- Hidden section headings (e.g., "Overview" on topic pages)
- Status descriptions (e.g., "3 of 10 questions answered")
- Link context (e.g., "Read more about WCAG principles")

## Color Contrast

### Minimum Requirements (WCAG AA)

- **Normal text:** 4.5:1 contrast ratio
- **Large text (18px+ or 14px+ bold):** 3:1 contrast ratio
- **UI components and graphical objects:** 3:1 contrast ratio

### Using Design Tokens for Compliance

The design token system has WCAG-compliant contrast ratios built in:

```
components.text.primary   -- gray[900]/gray[100] on white/gray[950] = ~15:1 (AAA)
components.button.primary -- white on navy[500]/navy[600] = ~8.9:1 (AAA)
components.border.focus   -- orange[500]/orange[400] = high visibility focus ring
```

**Never hardcode colors.** Always use:
- `components.text.*` for text colors
- `components.background.*` for backgrounds
- `components.border.*` for borders
- `base.gray[*]` for neutral colors via Tailwind (`text-gray-900 dark:text-gray-100`)

### Dark Mode

Every visual element MUST be tested in both themes. Common issues:
- Text that disappears on dark backgrounds
- Borders that become invisible
- Focus rings that lack contrast

## Images and Media

- **Informative images:** `alt="Description of the image"`
- **Decorative images:** `alt=""` or `aria-hidden="true"`
- **Icons with text:** `aria-hidden="true"` on the icon
- **Icons without text:** `aria-label` on the parent button/link

## Testing

### Automated: Playwright + axe-core

The project has E2E accessibility tests in `e2e/accessibility.spec.ts`. Run with:

```bash
npm run test:e2e
```

These scan 8 routes with `@axe-core/playwright` using WCAG 2.1 AA tags. To add a new route to the scan:

```tsx
// In e2e/accessibility.spec.ts
const routes = [
  { path: '/', name: 'Home' },
  { path: '/new-page', name: 'New Page' },  // Add here
  // ...
]
```

### Manual Testing Checklist

For every UI change, verify:

- [ ] **Keyboard-only navigation:** Can you reach and operate everything with Tab, Enter, Space, Escape, and arrow keys?
- [ ] **Focus visibility:** Does every interactive element show a visible focus ring when tabbed to?
- [ ] **Focus order:** Does Tab move through elements in a logical order (top-left to bottom-right, following visual layout)?
- [ ] **Screen reader:** Does VoiceOver (Cmd+F5 on Mac) announce all content and interactive elements meaningfully?
- [ ] **Heading hierarchy:** Does the heading structure make sense when read sequentially (h1 > h2 > h3, no skipped levels)?
- [ ] **Color contrast:** Do all text and interactive elements meet AA contrast ratios in both light and dark mode?
- [ ] **Zoom:** Does the page work at 200% browser zoom without content overlap or loss?
- [ ] **Reduced motion:** Are animations respectful of `prefers-reduced-motion`?

### Storybook a11y Addon

DS components can be tested in Storybook with the a11y addon (included in the Storybook config). It runs axe-core in the browser and surfaces violations in the Accessibility panel.

## Common Patterns in This Codebase

### Sidebar Navigation

```tsx
<nav aria-label="Main navigation">
  <NavigationItem href="/" active={isHome}>Home</NavigationItem>
  <NavigationItem href="/practice-test" active={isTest}>Practice Tests</NavigationItem>
</nav>
```

Sidebar toggles use `aria-expanded` and announce state changes via `aria-live`.

### Test Question Interface

- Questions use `role="radiogroup"` with `aria-labelledby` pointing to the question text
- Answer options use RadioCard components (inherently accessible)
- Progress is announced: "Question 3 of 10"
- Results are announced when test completes

### Text-to-Speech Controls

- Play/Pause uses `aria-label` that reflects current state
- Progress is conveyed via `aria-valuenow`/`aria-valuemin`/`aria-valuemax`
- Speed/voice changes announce via `aria-live`

### Topic Table of Contents

- Uses `<nav aria-label="Table of contents">`
- Active item indicated via `aria-current="true"`
- Scrolls into view without stealing focus
