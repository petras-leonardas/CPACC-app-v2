# CPACC Design System

A comprehensive design system for the CPACC accessibility certification application, built with React, TypeScript, and Tailwind CSS.

## 📚 Documentation

View the live Storybook documentation at: [Your Storybook URL]

## 🚀 Getting Started

### Running Storybook Locally

```bash
npm run storybook
```

This will start Storybook at `http://localhost:6006`

### Building Storybook

```bash
npm run build-storybook
```

### Deploying to Cloudflare Pages

```bash
npm run deploy:storybook
```

## 📦 Structure

```
src/design-system/
├── tokens/              # Design tokens (colors, typography, spacing, etc.)
│   ├── colors/
│   │   ├── base.ts      # Raw color palette
│   │   ├── semantic.ts  # Purpose-driven colors
│   │   └── components.ts # Component-specific colors
│   ├── typography.ts
│   ├── spacing.ts
│   ├── shadows.ts
│   └── radius.ts
│
├── components/          # Reusable UI components
│   ├── Button/
│   ├── Input/
│   ├── Card/
│   └── Badge/
│
├── stories/            # Storybook documentation
│   └── tokens/         # Token visualization stories
│
└── utils/              # Utility functions
    └── cn.ts           # className helper
```

## 🎨 Design Tokens

### Colors

Our color system has three layers:

1. **Base Colors** - Raw color palette (blue, gray, green, red, amber)
2. **Semantic Colors** - Purpose-driven (primary, success, error, warning, info)
3. **Component Colors** - Usage-specific (text, background, border)

### Typography

- **Font Sizes**: h1, h2, h3, body-1, body-2, small, button-lg
- **Font Weights**: regular (400), medium (500), semibold (600), bold (700)
- **Line Heights**: tight (1.25), normal (1.5), relaxed (1.75)

### Spacing

Based on a 4px unit system:

- 0-24: Standard spacing scale (0px to 96px)

### Shadows

Light and dark mode variants for elevation:

- sm, md, lg, xl

### Border Radius

- none, sm, md, lg, xl, 2xl, full

## 🧩 Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from "@/design-system";

<Button variant="primary" size="md">
  Click me
</Button>;
```

**Variants**: primary, secondary, ghost, danger  
**Sizes**: sm, md, lg

### Input

Accessible form input with label, error, and helper text support.

```tsx
import { Input } from "@/design-system";

<Input
  label="Email"
  type="email"
  error="Please enter a valid email"
  helperText="We'll never share your email"
/>;
```

### Card

Flexible card container with header, content, and footer sections.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/design-system";

<Card variant="elevated">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
</Card>;
```

**Variants**: default, elevated, bordered  
**Padding**: none, sm, md, lg

### Badge

Small status indicators and tags.

```tsx
import { Badge } from "@/design-system";

<Badge variant="success">Active</Badge>;
```

**Variants**: default, success, error, warning, info  
**Sizes**: sm, md, lg

## 🌗 Dark Mode

All components support dark mode automatically through Tailwind's `dark:` classes. Toggle dark mode in Storybook using the theme switcher in the toolbar.

## ♿ Accessibility

- All components follow WCAG 2.1 AA guidelines
- Semantic HTML elements used throughout
- Keyboard navigation supported
- Focus indicators on all interactive elements
- ARIA attributes where appropriate
- Color contrast ratios meet accessibility standards

## 🛠️ Usage in App

Import components from the design system:

```tsx
import { Button, Input, Card, Badge } from "@/design-system";

function MyComponent() {
  return (
    <Card variant="elevated">
      <Input label="Name" />
      <Button variant="primary">Submit</Button>
      <Badge variant="success">New</Badge>
    </Card>
  );
}
```

## 🎯 Design Principles

1. **Consistency** - Use design tokens for all styling
2. **Accessibility** - WCAG 2.1 AA compliance minimum
3. **Dark Mode First** - All components work in both themes
4. **Type Safety** - Full TypeScript support
5. **Composability** - Build complex UIs from simple primitives

## 📝 Contributing

When adding new components:

1. Create component in `src/design-system/components/[ComponentName]/`
2. Use design tokens from `src/design-system/tokens/`
3. Create `.stories.tsx` file with multiple examples
4. Export from `src/design-system/components/index.ts`
5. Test in both light and dark modes
6. Verify accessibility with Storybook's a11y addon

## 🔗 Related Resources

- [Storybook Documentation](https://storybook.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lucide Icons](https://lucide.dev/)
