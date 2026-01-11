# Typography System

## Overview

All typography styles are centrally defined in `tailwind.config.js` based on Figma design specifications. This ensures consistent typography across the entire application and makes it easy to update styles globally.

## How It Works

The typography system provides:

- **Semantic class names** matching Figma specs (e.g., `.heading-1`, `.body-1`)
- **Automatic dark mode support**
- **Responsive sizing** built-in (mobile → desktop)
- **Text variants** (regular, bold, link) where applicable
- **Single source of truth** - update once, applies everywhere

## Available Typography Classes

### Headings

#### `.heading-1`

**Use for:** Main page titles (H1)
**Mobile:** 28px / 36px line-height / Bold (700)
**Desktop (md+):** 36px / 44px line-height / Bold (700)
**Colors:** Gray-900 (light) / Gray-100 (dark)

```tsx
<h1 className="heading-1">Learn accessibility fundamentals</h1>
```

#### `.heading-2`

**Use for:** Section headings (H2)
**Mobile:** 24px / 32px line-height / Bold (700)
**Desktop (md+):** 30px / 36px line-height / Bold (700)
**Colors:** Gray-900 (light) / Gray-100 (dark)

```tsx
<h2 className="heading-2">How is the content organized?</h2>
```

#### `.heading-3`

**Use for:** Subsection headings, card titles (H3)
**Mobile:** 16px / 24px line-height / Semibold (600)
**Desktop (md+):** 18px / 26px line-height / Semibold (600)
**Colors:** Gray-900 (light) / Gray-100 (dark)

```tsx
<h3 className="heading-3">Disabilities, challenges & assistive technologies</h3>
```

---

### Body Text

#### `.cpacc-body-1` (Regular)

**Use for:** Primary body text, main paragraphs
**Size:** 16px / 24px line-height / Regular (400)
**Colors:** Gray-600 (light) / Gray-400 (dark)

```tsx
<p className="cpacc-body-1">
  CPACC Mastery helps you build a solid foundation...
</p>
```

#### `.cpacc-body-1-bold`

**Use for:** Emphasized text within body content
**Size:** 16px / 24px line-height / Bold (700)
**Colors:** Gray-900 (light) / Gray-100 (dark)

```tsx
<p className="cpacc-body-1-bold">Important: This text is emphasized</p>
```

#### `.cpacc-body-1-link`

**Use for:** Text links within body content
**Size:** 16px / 24px line-height / Regular (400)
**Colors:** Gray-600 (light) / Gray-400 (dark)
**Style:** Underlined, hover changes to darker

```tsx
<a href="/terms" className="cpacc-body-1-link">
  Terms of Use
</a>
```

#### `.cpacc-body-2` (Regular)

**Use for:** Secondary body text, descriptions, supporting content
**Size:** 14px / 22px line-height / Regular (400)
**Colors:** Gray-600 (light) / Gray-400 (dark)

```tsx
<p className="cpacc-body-2">
  Understand disability, barriers, and assistive technologies...
</p>
```

#### `.cpacc-body-2-bold`

**Use for:** Emphasized secondary text
**Size:** 14px / 22px line-height / Bold (700)
**Colors:** Gray-900 (light) / Gray-100 (dark)

```tsx
<p className="cpacc-body-2-bold">Key concept</p>
```

#### `.cpacc-body-2-link`

**Use for:** Text links in secondary content
**Size:** 14px / 22px line-height / Regular (400)
**Colors:** Gray-600 (light) / Gray-400 (dark)
**Style:** Underlined, hover changes to darker

```tsx
<a href="/privacy" className="cpacc-body-2-link">
  Privacy Policy
</a>
```

---

### Small Text

#### `.cpacc-text-small`

**Use for:** Labels, captions, metadata, footer text
**Size:** 12px / 20px line-height / Regular (400)
**Colors:** Gray-500 (light) / Gray-400 (dark)

```tsx
<p className="cpacc-text-small">2026 CPACC Mastery</p>
```

#### `.cpacc-text-small-link`

**Use for:** Small text links (footer links, etc.)
**Size:** 12px / 20px line-height / Regular (400)
**Colors:** Gray-500 (light) / Gray-400 (dark)
**Style:** Underlined, hover changes to darker

```tsx
<a href="/accessibility" className="cpacc-text-small-link">
  Accessibility
</a>
```

---

### UI Elements

#### `.cpacc-btn-text-lg`

**Use for:** Large button text
**Size:** 14px / 22px line-height / Medium (500)
**Colors:** Gray-900 (light) / Gray-100 (dark)

```tsx
<button className="cpacc-btn-text-lg">Explore topics</button>
```

---

## Usage Examples

### Before (Old Way)

```tsx
<h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
  Learn accessibility fundamentals
</h1>

<p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
  CPACC Mastery helps you build a solid foundation...
</p>
```

### After (New Way)

```tsx
<h1 className="heading-hero mb-4">
  Learn accessibility fundamentals
</h1>

<p className="body-text">
  CPACC Mastery helps you build a solid foundation...
</p>
```

**Benefits:**

- ✅ Shorter, cleaner code
- ✅ Consistent typography across all pages
- ✅ Easy to update globally
- ✅ Dark mode automatic

---

## Customizing Typography

All typography styles are defined in `tailwind.config.js`. To update:

1. Open `tailwind.config.js`
2. Find the `fontSize` or `plugins` section
3. Update the values
4. Rebuild: `npm run build`
5. Changes apply everywhere automatically

### Example: Changing H1 Size

```js
// In tailwind.config.js
fontSize: {
  'heading-hero': ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],  // Changed from 2.25rem
}
```

---

## Migration Guide

To migrate existing code to use the new typography system:

### Headings

1. **Find:** `text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100`
   **Replace with:** `heading-1`

2. **Find:** `text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100`
   **Replace with:** `heading-2`

3. **Find:** `text-lg font-semibold text-gray-900 dark:text-gray-100`
   **Replace with:** `heading-3`

### Body Text

4. **Find:** `text-base text-gray-600 dark:text-gray-400 leading-relaxed`
   **Replace with:** `body-1`

5. **Find:** `text-base font-bold text-gray-900 dark:text-gray-100`
   **Replace with:** `body-1-bold`

6. **Find:** `text-sm text-gray-600 dark:text-gray-400` or `text-sm text-gray-700 dark:text-gray-300`
   **Replace with:** `body-2`

### Small Text

7. **Find:** `text-xs text-gray-500 dark:text-gray-400`
   **Replace with:** `text-small`

### Links

8. **Find:** Links in body text with underline
   **Replace with:** `body-1-link` or `body-2-link` or `text-small-link` depending on context

---

## Typography Scale Reference (Figma Specs)

| Class Name         | Mobile Size | Desktop Size | Line Height (Mobile/Desktop) | Weight         | Use Case                         |
| ------------------ | ----------- | ------------ | ---------------------------- | -------------- | -------------------------------- |
| `.heading-1`       | 28px        | 36px         | 36px / 44px                  | Bold (700)     | Page titles (H1)                 |
| `.heading-2`       | 24px        | 30px         | 32px / 36px                  | Bold (700)     | Section headings (H2)            |
| `.heading-3`       | 16px        | 18px         | 24px / 26px                  | Semibold (600) | Subsection headings, card titles |
| `.body-1`          | 16px        | 16px         | 24px                         | Regular (400)  | Primary body text                |
| `.body-1-bold`     | 16px        | 16px         | 24px                         | Bold (700)     | Emphasized body text             |
| `.body-1-link`     | 16px        | 16px         | 24px                         | Regular (400)  | Body text links                  |
| `.body-2`          | 14px        | 14px         | 22px                         | Regular (400)  | Secondary body text              |
| `.body-2-bold`     | 14px        | 14px         | 22px                         | Bold (700)     | Emphasized secondary text        |
| `.body-2-link`     | 14px        | 14px         | 22px                         | Regular (400)  | Secondary text links             |
| `.text-small`      | 12px        | 12px         | 20px                         | Regular (400)  | Labels, captions, footer         |
| `.text-small-link` | 12px        | 12px         | 20px                         | Regular (400)  | Small text links                 |
| `.btn-text-lg`     | 14px        | 14px         | 22px                         | Medium (500)   | Large button text                |

---

## Additional Styling

You can still add other Tailwind classes alongside typography classes:

```tsx
<h1 className="cpacc-heading-1 mb-8 text-center">
  Welcome
</h1>

<p className="cpacc-body-1 max-w-2xl mx-auto">
  This is centered text with a max width.
</p>
```

---

## Questions?

If you need to add a new typography style:

1. Add it to the `fontSize` section in `tailwind.config.js`
2. Add a corresponding utility class in the `plugins` section
3. Document it in this file
4. Rebuild and test
