# Leo Design System - Quick Reference

## Installation

The design system is already installed in this project:

```bash
npm install github:petras-leonardas/DS-leo-designs-the-world
```

## Import Components

```tsx
import { Button, InputField, SelectField, Dialog, Icon } from '@leo-designs/components'
```

## Import Styles

Already configured in `src/main.tsx`:

```tsx
import '@leo-designs/components/styles.css'
```

## Available Components

### Button

Primary, secondary, and subtle button variants.

```tsx
<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="secondary" size="sm">
  Secondary
</Button>

<Button variant="subtle" size="lg">
  Subtle
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'subtle'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `type`: 'button' | 'submit' | 'reset'

### InputField

Text input with label, description, and error states.

```tsx
<InputField 
  label="Full name" 
  required 
  fullWidth
  placeholder="Enter your name"
/>

<InputField 
  label="Email" 
  type="email"
  description="We'll never share your email"
  error="Invalid email address"
/>
```

**Props:**
- `label`: string
- `type`: 'text' | 'email' | 'password' | 'number' | etc.
- `required`: boolean
- `fullWidth`: boolean
- `disabled`: boolean
- `placeholder`: string
- `description`: string
- `error`: string
- `value`: string
- `onChange`: (e: ChangeEvent<HTMLInputElement>) => void

### SelectField

Dropdown select with native options.

```tsx
<SelectField 
  label="Country" 
  required
  fullWidth
>
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</SelectField>
```

**Props:**
- `label`: string
- `required`: boolean
- `fullWidth`: boolean
- `disabled`: boolean
- `description`: string
- `error`: string
- `value`: string
- `onChange`: (e: ChangeEvent<HTMLSelectElement>) => void
- `children`: ReactNode (option elements)

### Dialog

Modal dialog with customizable content.

```tsx
import { useState } from 'react'
import { Dialog, InputField, Button } from '@leo-designs/components'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      
      <Dialog
        isOpen={isOpen}
        title="Edit profile"
        description="Update your information"
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Confirmed!')
          setIsOpen(false)
        }}
      >
        <InputField label="Name" fullWidth />
        <InputField label="Email" type="email" fullWidth />
      </Dialog>
    </>
  )
}
```

**Props:**
- `isOpen`: boolean
- `title`: string
- `description`: string (optional)
- `onClose`: () => void
- `onConfirm`: () => void (optional)
- `confirmText`: string (default: "Confirm")
- `cancelText`: string (default: "Cancel")
- `children`: ReactNode

### Icon

287+ SVG icons with customizable size and color.

```tsx
<Icon name="check" size={24} />
<Icon name="arrow-right" size={16} color="#000" />
<Icon name="settings" size={32} />
```

**Props:**
- `name`: string (icon name)
- `size`: number (default: 24)
- `color`: string (default: currentColor)

**Available Icons:** See the full list in the design system's icon directory or Storybook.

## Design Tokens

Access design tokens for custom styling:

```tsx
import { colors, spacing, typography } from '@leo-designs/components/tokens'

// Colors: darkest-gray, dark-gray, mid-dark-gray, light-gray, lightest-gray
// Status: danger, warning, success, information
// Spacing: 100 (4px), 200 (8px), 300 (12px), 400 (16px), etc.
// Typography: h1-h4, p1-p3, button, label, helper
```

## Form Example

```tsx
import { Button, InputField, SelectField } from '@leo-designs/components'

function ContactForm() {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      console.log('Form submitted')
    }}>
      <InputField 
        label="Full name" 
        required 
        fullWidth 
      />
      
      <InputField 
        label="Email" 
        type="email"
        required 
        fullWidth 
      />
      
      <SelectField 
        label="Subject" 
        required
        fullWidth
      >
        <option value="">Select a subject</option>
        <option value="general">General inquiry</option>
        <option value="support">Support</option>
        <option value="feedback">Feedback</option>
      </SelectField>
      
      <div className="flex gap-4 mt-6">
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Button type="button" variant="subtle">
          Cancel
        </Button>
      </div>
    </form>
  )
}
```

## Styling with Tailwind

The design system works seamlessly with Tailwind CSS:

```tsx
<div className="p-8 bg-gray-50 rounded-lg">
  <Button variant="primary" className="w-full">
    Full Width Button
  </Button>
</div>
```

## TypeScript Support

All components are fully typed with TypeScript for excellent IDE support and type safety.
