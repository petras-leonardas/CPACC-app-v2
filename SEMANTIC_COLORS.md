# Semantic Color System

## Overview

This document explains how to use semantic colors from the design system in your components. The semantic color system ensures consistency, maintains a single source of truth, and makes dark mode implementation automatic.

---

## Architecture

### **Token Flow**

```
Design System Tokens (components.ts)
    ↓
Tailwind Config (semantic color extensions)
    ↓
Utility Classes (.bg-surface-primary, .border-semantic)
    ↓
Components (declarative, automatic dark mode)
```

### **Benefits**

- ✅ Single source of truth (design system tokens)
- ✅ Type-safe color values
- ✅ Automatic dark mode (no per-component logic)
- ✅ Semantic naming (intent-based, not value-based)
- ✅ Easy to maintain and update
- ✅ Prevents color drift

---

## Available Semantic Colors

### **Surface/Background Colors**

Use these for component backgrounds:

| Utility Class           | Light Mode | Dark Mode            | Usage                                                |
| ----------------------- | ---------- | -------------------- | ---------------------------------------------------- |
| `.bg-surface-primary`   | `#ffffff`  | `gray-950` (#030712) | Primary surfaces (cards, header, modals)             |
| `.bg-surface-secondary` | `gray-50`  | `gray-900`           | Secondary backgrounds (page backgrounds)             |
| `.bg-surface-tertiary`  | `gray-100` | `gray-800`           | Tertiary surfaces (hover states, subtle backgrounds) |
| `.bg-surface-elevated`  | `#ffffff`  | `#252938`            | Elevated surfaces (dropdowns, popovers)              |

**Example:**

```tsx
// Header component
<header className="bg-surface-primary border-b border-semantic">
  ...
</header>

// Page background
<main className="bg-surface-secondary">
  ...
</main>

// Card
<div className="bg-surface-primary rounded-lg p-6">
  ...
</div>
```

### **Border Colors**

Use these for borders:

| Utility Class            | Light Mode   | Dark Mode    | Usage                              |
| ------------------------ | ------------ | ------------ | ---------------------------------- |
| `.border-semantic`       | `gray-200`   | `gray-700`   | Default borders                    |
| `.border-semantic-hover` | `gray-300`   | `gray-600`   | Hover state borders                |
| `border-border-focus`    | `orange-500` | `orange-400` | Focus state borders (brand accent) |

**Example:**

```tsx
// Default border
<div className="border border-semantic rounded-lg">
  ...
</div>

// Hover border
<button className="border-2 border-semantic hover:border-semantic-hover">
  ...
</button>

// Focus ring
<input className="focus:ring-2 focus:ring-border-focus" />
```

---

## Direct Token Access

If you need direct access to specific light/dark values (for inline styles or special cases):

### **In Tailwind Classes**

```tsx
// Using direct token values
<div className="bg-surface-primary dark:bg-surface-primary-dark">
  ...
</div>

<div className="border-border-default dark:border-border-default-dark">
  ...
</div>
```

### **In JavaScript/TypeScript**

```tsx
import { components } from "../design-system/tokens";

const backgroundColor = isDark
  ? components.background.primary.dark
  : components.background.primary.light;
```

---

## Migration Guide

### **Old Pattern (Anti-pattern)**

```tsx
// ❌ Don't use raw Tailwind colors
<header className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
```

**Problems:**

- Not using design system tokens
- Values can drift from design system
- No type safety
- Hardcoded values

### **New Pattern (Recommended)**

```tsx
// ✅ Use semantic utility classes
<header className="bg-surface-primary border-semantic">
```

**Benefits:**

- Uses design system tokens
- Automatic dark mode
- Single source of truth
- Intent-based naming

---

## Common Patterns

### **Page Layout**

```tsx
<main className="bg-surface-secondary min-h-screen">
  <Container>
    <div className="bg-surface-primary rounded-xl p-6 border border-semantic">
      {/* Content */}
    </div>
  </Container>
</main>
```

### **Header/Navigation**

```tsx
<header className="bg-surface-primary border-b border-semantic">
  {/* Navigation */}
</header>
```

### **Card Component**

```tsx
<div className="bg-surface-primary border border-semantic rounded-lg p-6 hover:border-semantic-hover">
  {/* Card content */}
</div>
```

### **Modal/Dialog**

```tsx
<div className="bg-surface-elevated rounded-xl shadow-lg border border-semantic">
  {/* Modal content */}
</div>
```

---

## Design System Components

Design system components (Button, IconButton, etc.) use JavaScript to detect dark mode and apply token values via inline styles. This is for precise control over brand colors and interactive states.

**App-level components** (Header, Pages, Layout) should use semantic utility classes for simplicity and performance.

---

## Adding New Semantic Colors

If you need to add new semantic colors:

1. **Add to token definition** (`src/design-system/tokens/colors/components.ts`)
2. **Extend Tailwind config** (`tailwind.config.js`)
3. **Create utility class** (in Tailwind plugins section)
4. **Document here**

### **Example:**

```javascript
// 1. In components.ts
export const components = {
  background: {
    success: {
      light: base.green[50],
      dark: base.green[900],
    }
  }
}

// 2. In tailwind.config.js
colors: {
  surface: {
    success: components.background.success.light,
    'success-dark': components.background.success.dark,
  }
}

// 3. Add utility
'.bg-surface-success': {
  '@apply bg-surface-success dark:bg-surface-success-dark': {},
}

// 4. Use in components
<div className="bg-surface-success">
  Success message
</div>
```

---

## Testing Dark Mode

To test dark mode:

1. Toggle theme using the header theme button
2. Or manually add/remove `.dark` class on `<html>` element in DevTools
3. Or use OS-level dark mode preference

The semantic classes will automatically apply the correct colors.

---

## Questions?

- **Q: Why not use `dark:` prefix everywhere?**

  - A: Semantic utilities are cleaner, more maintainable, and ensure token usage

- **Q: Can I still use raw Tailwind colors?**

  - A: Yes, for one-off cases, but prefer semantic colors for consistency

- **Q: How do I know which surface to use?**

  - A: `primary` = main surfaces, `secondary` = page backgrounds, `tertiary` = subtle backgrounds, `elevated` = floating elements

- **Q: What about text colors?**
  - A: Use existing Tailwind gray scale with dark mode: `text-gray-900 dark:text-gray-100`
