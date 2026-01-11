# Grid System

## Overview

CPACC Mastery uses a **12-column grid system** that matches the Figma design layout. This ensures visual consistency between design and implementation.

## Configuration

- **Columns:** 12 equal-width columns
- **Max Width:** 1280px (max-w-7xl)
- **Gutters:** Configurable via `gap` prop (default: 24px / gap-6)
- **Padding:** 16px mobile (px-4), 32px desktop (md:px-8)

## Components

### GridContainer

Main container for page content with max-width and responsive padding.

```tsx
import { GridContainer } from "@/components/Grid";

<GridContainer>{/* Your content */}</GridContainer>;
```

**Props:**

- `children`: ReactNode
- `className?`: Additional CSS classes

### Grid

12-column grid layout component for arranging content.

```tsx
import { Grid } from "@/components/Grid";

<Grid gap={6}>
  <div className="col-span-8">Main content</div>
  <div className="col-span-4">Sidebar</div>
</Grid>;
```

**Props:**

- `children`: ReactNode
- `gap?`: Gap between columns (Tailwind scale: 4=16px, 6=24px, 8=32px)
- `className?`: Additional CSS classes

## Column Spans

Use Tailwind's `col-span-{n}` utilities to control how many columns an element spans:

```tsx
// Full width (12 columns)
<div className="col-span-12">...</div>

// Two equal columns (6 + 6)
<div className="col-span-6">...</div>
<div className="col-span-6">...</div>

// Content + sidebar (8 + 4)
<div className="col-span-8">...</div>
<div className="col-span-4">...</div>

// Three equal cards (4 + 4 + 4)
<div className="col-span-4">...</div>
<div className="col-span-4">...</div>
<div className="col-span-4">...</div>
```

## Responsive Column Spans

Adjust column spans at different breakpoints:

```tsx
// Mobile: full width, Desktop: 8 columns
<div className="col-span-12 lg:col-span-8">...</div>

// Mobile: full width, Desktop: 4 columns each
<div className="col-span-12 md:col-span-4">...</div>
```

## Common Patterns

### Hero Section (Content + Image)

```tsx
<Grid gap={8}>
  <div className="col-span-12 lg:col-span-8">{/* Content */}</div>
  <div className="col-span-12 lg:col-span-4">{/* Image */}</div>
</Grid>
```

### Three Card Layout

```tsx
<Grid gap={6}>
  <div className="col-span-12 md:col-span-4">Card 1</div>
  <div className="col-span-12 md:col-span-4">Card 2</div>
  <div className="col-span-12 md:col-span-4">Card 3</div>
</Grid>
```

### Two Column Content

```tsx
<Grid gap={8}>
  <div className="col-span-12 lg:col-span-6">Left column</div>
  <div className="col-span-12 lg:col-span-6">Right column</div>
</Grid>
```

## Figma to Code Mapping

When implementing designs from Figma:

1. **Identify column spans** in Figma's 12-column grid overlay
2. **Map to Tailwind utilities:** If element spans 8 columns → `col-span-8`
3. **Check gutters:** Match Figma gutter spacing with `gap-{n}` prop
4. **Verify breakpoints:** Ensure responsive behavior matches design

### Example

- **Figma:** Element spans columns 1-8 (8 columns wide)
- **Code:** `<div className="col-span-8">...</div>`

- **Figma:** 32px gutter between columns
- **Code:** `<Grid gap={8}>...</Grid>` (gap-8 = 32px)

## Best Practices

1. **Always use GridContainer** as the outermost wrapper for page content
2. **Use Grid component** when you need explicit column-based layouts
3. **Prefer responsive utilities** (e.g., `col-span-12 lg:col-span-8`) for mobile-first design
4. **Keep gaps consistent** across similar sections (typically gap-6 or gap-8)
5. **Avoid nesting grids** unless absolutely necessary - flatten structure when possible

## Examples

See `src/pages/WelcomePage.tsx` for real-world usage examples.

## Resources

- [Tailwind Grid Documentation](https://tailwindcss.com/docs/grid-template-columns)
- [Tailwind Gap Documentation](https://tailwindcss.com/docs/gap)
- Figma Design File: [Link to your Figma file]
