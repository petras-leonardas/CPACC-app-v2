---
name: ds-component
description: Create or modify design system components following CPACC Mastery conventions -- forwardRef, tokens, cn(), useDarkMode, Storybook stories, barrel exports, and accessibility patterns.
---

# Design System Component Development

Use this skill when creating a new design system component or modifying an existing one in `src/design-system/`.

## Directory Structure

Every DS component lives in its own directory:

```
src/design-system/components/[ComponentName]/
  [ComponentName].tsx       # Main component file
  [helperFile].tsx          # Optional: extracted styles/logic (e.g., buttonStyles.tsx)
```

Stories go in ONE of these locations (check existing patterns for the component area):
- Co-located: `src/design-system/components/[ComponentName]/[ComponentName].stories.tsx`
- Centralized: `src/design-system/stories/components/[ComponentName].stories.tsx`

## Component File Template

Every component MUST follow this structure:

```tsx
import React from 'react'
import { cn } from '../../utils/cn'
import { components, brand, typography, spacing, radius, shadows } from '../../tokens'
import { useDarkMode } from '../../hooks/useDarkMode'

export interface [ComponentName]Props extends React.HTMLAttributes<HTMLElement> {
  /** JSDoc for every prop */
  children: React.ReactNode
}

/**
 * JSDoc block describing:
 * - What the component does
 * - Key features (dark mode, a11y, keyboard nav)
 * - Usage example
 */
export const [ComponentName] = React.forwardRef<HTMLElement, [ComponentName]Props>(
  ({ className, children, ...props }, ref) => {
    const isDark = useDarkMode()

    return (
      <div
        ref={ref}
        className={cn(
          'base-tailwind-classes',
          className
        )}
        style={{
          // Token-based styles for brand/component colors
          backgroundColor: isDark
            ? components.background.primary.dark
            : components.background.primary.light,
          color: isDark
            ? components.text.primary.dark
            : components.text.primary.light,
          // Focus ring CSS variable
          '--focus-ring-color': isDark
            ? components.border.focus.dark
            : components.border.focus.light,
        } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    )
  }
)

[ComponentName].displayName = '[ComponentName]'
```

## Critical Rules

### 1. Always use `React.forwardRef`

Every component wraps in `forwardRef` and sets `.displayName`. No exceptions.

### 2. Use `cn()` for class composition

Import from `../../utils/cn`. It wraps `clsx` + `tailwind-merge`:

```tsx
className={cn(
  'base-classes',
  isActive && 'conditional-class',
  variant === 'primary' && 'variant-class',
  className  // Always spread consumer className last
)}
```

### 3. Use design tokens for colors -- NEVER hardcode

**For brand/component colors (navy, orange, semantic colors):** Use inline `style` with tokens + `useDarkMode()`:

```tsx
const isDark = useDarkMode()

style={{
  backgroundColor: isDark ? components.background.elevated.dark : components.background.elevated.light,
  color: isDark ? components.text.primary.dark : components.text.primary.light,
  borderColor: isDark ? components.border.default.dark : components.border.default.light,
}}
```

**For neutral grays only:** Tailwind `dark:` classes are acceptable:

```tsx
className="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
```

**Why this pattern?** Brand colors (navy, orange) are not in the Tailwind config as utility classes. They exist only as token values applied via inline styles. Grays are in Tailwind's default palette and can use `dark:` classes.

### 4. Focus ring pattern

All interactive components MUST use the orange focus ring via CSS variable:

```tsx
// In the component
style={{
  '--focus-ring-color': isDark ? components.border.focus.dark : components.border.focus.light,
} as React.CSSProperties}

// Tailwind classes for focus
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-[var(--focus-ring-color)]"
```

These values come from `components.border.focus` which maps to `brand.orange[500]` (light) and `brand.orange[400]` (dark).

### 5. Typography tokens

Use typography tokens for font sizing, NOT arbitrary Tailwind classes:

```tsx
import { typography } from '../../tokens'

style={{
  fontSize: typography.fontSize['body-1'].size,      // '1rem'
  lineHeight: typography.fontSize['body-1'].lineHeight, // '1.625'
  fontWeight: typography.fontWeight.medium,           // 500
}}
```

Available scales: `h1`, `h2`, `h3` (with `.mobile` and `.desktop`), `body-1`, `body-2`, `small`, `button-lg`.

For headings, prefer the DS `Heading` component or `.cpacc-heading-*` utility classes.
For body text, prefer the DS `Text` component or `.cpacc-body-*` utility classes.

### 6. Spacing tokens

Use spacing tokens for padding/margins via inline styles:

```tsx
import { spacing } from '../../tokens'

style={{
  padding: spacing[4],           // '16px'
  gap: spacing[3],               // '12px'
  borderRadius: radius['2xl'],   // '16px'
}}
```

### 7. Icons

Import from the DS icons barrel, NOT directly from lucide-react:

```tsx
import { X, ChevronRight, Moon } from '../../icons'
// NOT: import { X } from 'lucide-react'
```

Type references: `import type { LucideIcon, LucideProps } from '../../icons'`

## Available Token Imports

All from `../../tokens` (or `../../tokens/[specific-file]`):

| Token | What it provides |
|---|---|
| `components` | Text, background, border, button colors (light/dark) |
| `brand` | Navy, orange, teal, surface colors |
| `base` | Raw gray palette (gray[50] through gray[950]) |
| `typography` | fontSize, fontWeight, lineHeight, fontFamily |
| `spacing` | 4px unit scale (spacing[1] = '4px' through spacing[24] = '96px') |
| `radius` | Border radius (none, sm, md, lg, xl, 2xl, full) |
| `shadows` | Box shadows (light.sm/md/lg/xl, dark.sm/md/lg/xl) |
| `layout` | Container sizes, padding presets, gap sizes |

## Variant Pattern

For components with variants, extract style logic into a helper:

```tsx
// [ComponentName]Styles.tsx
import { components } from '../../tokens'

export type ComponentVariant = 'primary' | 'secondary' | 'ghost'

export function getVariantStyles(variant: ComponentVariant, isDark: boolean) {
  switch (variant) {
    case 'primary':
      return {
        className: 'shadow-sm',
        style: {
          backgroundColor: isDark ? components.button.primary.background.dark : components.button.primary.background.light,
          color: isDark ? components.button.primary.text.dark : components.button.primary.text.light,
        },
        hoverStyle: {
          backgroundColor: isDark ? components.button.primary.backgroundHover.dark : components.button.primary.backgroundHover.light,
        },
        focusRingColor: isDark ? components.border.focus.dark : components.border.focus.light,
      }
    // ... other variants
  }
}
```

## Hover State Pattern

Use `useState` for hover tracking with inline styles (for brand colors):

```tsx
const [isHovered, setIsHovered] = React.useState(false)

<element
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    ...baseStyle,
    ...(isHovered && !disabled ? hoverStyle : {}),
  }}
/>
```

## Storybook Story Template

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import { [ComponentName] } from '../../components/[ComponentName]/[ComponentName]'

const meta: Meta<typeof [ComponentName]> = {
  title: 'Components/[ComponentName]',
  component: [ComponentName],
  parameters: {
    layout: 'centered', // or 'padded' for full-width components
    docs: {
      description: {
        component: 'Description of the component and when to use it.',
      },
    },
  },
  argTypes: {
    // Control definitions for each prop
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof [ComponentName]>

export const Default: Story = {
  args: {
    children: 'Default content',
  },
}

// Include: variant stories, size stories, dark mode comparison, real-world examples
```

Required story variants:
- `Default` -- basic usage
- One story per variant (if applicable)
- `DarkModeComparison` -- helps verify both themes
- `RealWorldExamples` -- shows the component in context of this app

## Barrel Export

After creating the component, add it to `src/design-system/index.ts`:

```tsx
export { [ComponentName] } from './components/[ComponentName]/[ComponentName]'
export type { [ComponentName]Props } from './components/[ComponentName]/[ComponentName]'
```

## Checklist

Before considering a DS component complete:

- [ ] Uses `React.forwardRef` with `.displayName`
- [ ] Uses `cn()` for class merging (consumer `className` spread last)
- [ ] Uses design tokens for all colors (no hardcoded hex values)
- [ ] Uses `useDarkMode()` + inline styles for brand/component colors
- [ ] Has `--focus-ring-color` CSS variable on interactive elements
- [ ] All props have JSDoc comments
- [ ] Component has a JSDoc block with description and `@example`
- [ ] Storybook story exists with multiple variants
- [ ] Works in both light and dark mode
- [ ] Keyboard accessible (focusable, operable, visible focus indicator)
- [ ] Has appropriate ARIA attributes
- [ ] Exported from `src/design-system/index.ts`
