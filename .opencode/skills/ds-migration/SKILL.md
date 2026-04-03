---
name: ds-migration
description: Migrate raw HTML elements (buttons, links, headings, text, cards) to design system components following audit files and preserving accessibility, analytics, and dark mode behavior.
---

# Design System Migration

Use this skill when replacing raw HTML elements with design system components across the application. The migration backlog is tracked in `BUTTON_AUDIT.md` (108+ instances) and `LINK_AUDIT.md` (60+ instances).

## Import Pattern

All DS components come from a single barrel:

```tsx
import { Button, IconButton, Link, Heading, Text, Card, Modal, Badge, cn } from '../design-system'
// Icons from:
import { ChevronRight, ArrowUpRight, X } from '../design-system/icons'
```

Adjust the relative path depth based on the file location (e.g., `../../design-system` from a nested component).

## Migration Mappings

### Buttons

**Raw pattern (primary):**
```tsx
<button className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium">
  Start Learning
</button>
```

**DS replacement:**
```tsx
<Button variant="primary" size="lg">
  Start Learning
</Button>
```

**Variant mapping:**

| Raw Pattern | DS Variant |
|---|---|
| `bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900` | `variant="primary"` |
| `bg-white dark:bg-gray-800 border-2 border-gray-300` | `variant="secondary"` |
| `bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800` | `variant="ghost"` |

**Size mapping (by padding):**

| Raw Padding | DS Size | Min Height |
|---|---|---|
| `px-3 py-1.5` or similar small | `size="sm"` | 32px |
| `px-4 py-2` or `px-4 py-2.5` | `size="md"` | 40px |
| `px-6 py-3` or larger | `size="lg"` | 48px |

**Icon buttons** (icon-only, usually wrapped in Tooltip):
```tsx
// Before
<button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
  <X size={20} />
</button>

// After
<IconButton
  icon={<X size={20} />}
  aria-label="Close"
  variant="ghost"
  size="md"
  tooltip="Close"
  tooltipPosition="bottom"
/>
```

### Links

**Internal navigation links (React Router):**
```tsx
// Before - React Router Link with Tailwind
import { Link as RouterLink } from 'react-router-dom'
<RouterLink to="/privacy" className="text-gray-600 hover:text-gray-900 underline">
  Privacy
</RouterLink>

// After - Keep React Router Link for navigation, use DS Link for styling
// Note: DS Link uses <a> with href. For React Router, keep RouterLink but apply DS patterns.
// The DS Link component is for standard <a> tags, not React Router navigation.
```

**External links:**
```tsx
// Before
<a href="https://example.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
  External Site
</a>

// After
<Link href="https://example.com" external>
  External Site
</Link>
```

### Headings

```tsx
// Before
<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
  Page Title
</h1>

// After
<Heading as="h1">Page Title</Heading>
```

The `Heading` component automatically applies responsive typography via `.cpacc-heading-*` utility classes. Do NOT add font-size or color classes -- the component handles it.

**Heading level mapping:**
- `h1` -> `cpacc-heading-1` (page titles)
- `h2` -> `cpacc-heading-2` (section headings)
- `h3` -> `cpacc-heading-3` (subsection headings)
- `h4`-`h6` -> `cpacc-heading-3` (same as h3 visually)

### Text / Paragraphs

```tsx
// Before
<p className="text-base text-gray-900 dark:text-gray-100 leading-relaxed">
  Body content here.
</p>

// After
<Text>Body content here.</Text>
```

**Variant mapping:**

| Raw Pattern | DS Variant |
|---|---|
| `text-base` / `text-[16px]` | `variant="body1"` (default) |
| `text-sm` / `text-[14px]` | `variant="body2"` |
| `text-xs` / `text-[12px]` | `variant="small"` |
| + `font-semibold` or `font-bold` | Add `bold` prop |

### Cards

```tsx
// Before
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:shadow-md">
  Content
</div>

// After (static)
<Card>Content</Card>

// After (clickable/navigable)
<Card interactive>Content</Card>
```

### Modals

```tsx
// Before - custom dialog implementation
<div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
  <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md" role="dialog">
    <h2>Title</h2>
    <p>Content</p>
    <button onClick={onClose}>Cancel</button>
    <button onClick={onConfirm}>Confirm</button>
  </div>
</div>

// After
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Title"
  primaryActionLabel="Confirm"
  onPrimaryAction={onConfirm}
  secondaryActionLabel="Cancel"
>
  <Text>Content</Text>
</Modal>
```

### Toast Notifications

```tsx
// Before - custom alert/notification
alert('Settings saved')

// After
import { useToast } from '../design-system'
const { addToast } = useToast()
addToast({ message: 'Settings saved', variant: 'success' })
```

## Preservation Rules

When migrating, you MUST preserve:

### 1. Analytics / Tracking

Keep all `data-tracking-id` attributes and `onClick` handlers that call `trackEvent`:

```tsx
<Button
  variant="primary"
  onClick={() => {
    trackEvent('Button Clicked', { location: 'hero' })  // KEEP
    handleStart()
  }}
  data-tracking-id="hero-start-button"                   // KEEP
>
```

### 2. Accessibility

- Keep all `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-expanded`, `aria-controls`, `role` attributes
- Keep `tabIndex` values
- Keep keyboard event handlers (`onKeyDown`, `onKeyUp`)
- Verify the DS component provides equivalent or better a11y (it usually does)

### 3. Conditional Rendering / State

Keep all conditional logic, disabled states, loading states:

```tsx
<Button
  variant="primary"
  disabled={!isValid}           // KEEP
  loading={isSubmitting}        // Map from custom spinner to DS loading prop
  onClick={handleSubmit}
>
  {isSubmitting ? 'Saving...' : 'Save'}  // Simplify: DS Button handles loading text
</Button>
```

### 4. Layout Classes

Keep layout-related Tailwind classes via `className` prop:

```tsx
<Button variant="primary" className="mt-4 w-full md:w-auto">
  Submit
</Button>
```

The DS component handles its own visual styling (colors, padding, typography). Layout classes like margins, width overrides, and grid positioning should pass through via `className`.

### 5. Test IDs

Keep all `data-testid` attributes for Playwright/Vitest tests.

## Migration Workflow

1. **Identify the element** -- What raw HTML element are you replacing?
2. **Find the DS equivalent** -- Use the mapping tables above
3. **Map props** -- Convert Tailwind classes to DS props (variant, size, etc.)
4. **Preserve behavior** -- Keep all event handlers, tracking, accessibility, state
5. **Pass through layout** -- Move layout-only Tailwind classes to `className`
6. **Remove redundant classes** -- Delete color, typography, padding classes that the DS component now handles
7. **Test both themes** -- Verify light and dark mode rendering
8. **Test keyboard** -- Tab to the element, verify focus ring appears, verify activation works

## Scope Rules

- Migrate ONE file at a time
- Within a file, migrate ALL instances of the same element type (e.g., all buttons, not just one)
- After migrating, remove unused imports (old Tailwind utility classes are in CSS, but remove any JS imports that are no longer needed)
- Update the relevant audit file (`BUTTON_AUDIT.md` or `LINK_AUDIT.md`) to mark instances as migrated

## What NOT to Migrate

- **React Router `<Link>`** -- These handle client-side navigation. The DS `Link` component is an `<a>` tag. Do not replace React Router Links with DS Links. Instead, apply DS styling patterns to React Router Links where appropriate.
- **Form inputs** (`<input>`, `<select>`, `<textarea>`) -- No DS equivalents exist yet.
- **SVG/Icon wrappers** that are not buttons -- Leave as-is unless they are interactive.
- **Third-party component internals** -- Do not modify components from `@leo-designs/components` or other packages.

## Checklist Per File

- [ ] All raw `<button>` elements replaced with `<Button>` or `<IconButton>`
- [ ] All raw `<a>` elements (non-Router) replaced with `<Link>`
- [ ] All raw `<h1>`-`<h6>` replaced with `<Heading as="hN">`
- [ ] All raw `<p>` with typography classes replaced with `<Text>`
- [ ] All card-like `<div>` replaced with `<Card>`
- [ ] All custom modal implementations replaced with `<Modal>`
- [ ] Analytics tracking preserved
- [ ] Accessibility attributes preserved
- [ ] Works in light mode
- [ ] Works in dark mode
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] No visual regressions (spacing, sizing, alignment)
