# Card Component Patterns: Accessibility & Architecture

**Author:** Design System Team  
**Date:** January 2026  
**Category:** Component Architecture

---

## Overview

Cards are one of the most common UI patterns in modern web applications, but implementing them correctly for different interaction types requires careful architectural decisions. This document explains our approach to card components in this design system and explores how accessibility considerations drive these architectural choices.

---

## The Problem: One Component Can't Do Everything

At first glance, a "card" seems simple - it's a container with a border and some padding. However, cards are used in many different contexts:

1. **Static containers** - Grouping related information
2. **Navigation links** - Clickable cards that take you to another page
3. **Selection controls** - Cards that can be selected/deselected (like radio buttons or checkboxes)
4. **Action triggers** - Cards that perform an action when clicked

Each of these use cases has different:

- **HTML semantics** (`<div>`, `<a>`, `<button>`, `<input>`)
- **ARIA patterns** (no role, link, button, checkbox/radio)
- **Keyboard interactions** (not focusable, Enter for links, Space for buttons)
- **Screen reader announcements** (container, link, button pressed/not pressed)

**Trying to make one component handle all these patterns leads to:**

- ❌ Semantic HTML violations
- ❌ Accessibility issues
- ❌ Complex component APIs with too many props
- ❌ Difficult to maintain and test

---

## Our Approach: Separation by Interaction Type

We've chosen to separate card components based on their **fundamental interaction pattern**:

### **1. Card - Container Component**

**Purpose:** Visual container for content, with optional interactive styling for navigation use cases.

**HTML Element:** `<div>`

**When to use:**

- Grouping related static content
- Container for navigation links (wrap Card in Link)
- Content with interactive children (buttons, links inside)

**Props:**

```tsx
interface CardProps {
  children: React.ReactNode;
  interactive?: boolean; // Adds hover states for navigation
}
```

**Example:**

```tsx
// Static content
<Card>
  <h3>Feature Title</h3>
  <p>Description of the feature</p>
</Card>

// Navigation (entire card clickable)
<Link href="/details">
  <Card interactive>
    <h3>Click anywhere to navigate</h3>
    <p>Hover to see interactive state</p>
  </Card>
</Link>
```

**Accessibility:**

- Semantic `<div>` - proper container element
- When wrapped in `<Link>`, inherits link semantics
- Interactive mode provides visual hover feedback
- Keyboard accessible through Link wrapper
- Screen readers announce as link with card content

---

### **2. SelectableCard - Selection Component**

**Purpose:** Cards that can be selected/deselected, similar to radio buttons or checkboxes.

**HTML Element:** `<button>` with `aria-pressed`

**When to use:**

- Choosing one option from many (radio pattern)
- Toggling a selection state
- Multi-select interfaces
- Settings or preferences selection

**Props:**

```tsx
interface SelectableCardProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}
```

**Example:**

```tsx
<SelectableCard
  selected={selectedPlan === "pro"}
  onClick={() => setSelectedPlan("pro")}
>
  <h3>Pro Plan</h3>
  <p>$29/month</p>
</SelectableCard>
```

**Accessibility:**

- Semantic `<button>` - proper interactive element
- `aria-pressed` attribute indicates selection state
- Space/Enter keys toggle selection
- Focus indicators for keyboard navigation
- Screen readers announce "button, pressed" or "button, not pressed"
- Visual checkmark when selected

---

## Why This Separation Matters for Accessibility

### **Problem: Nested Interactive Elements**

**❌ Anti-pattern:**

```tsx
<a href="/page">
  <button>Click me</button>
</a>
```

This creates a link containing a button - invalid HTML and confusing for screen readers.

**✅ Our solution:**

```tsx
// Navigation: Link wraps Card (div)
<Link href="/page">
  <Card interactive>Content</Card>
</Link>

// Selection: SelectableCard is a button (no nesting)
<SelectableCard selected={bool}>Content</SelectableCard>
```

### **Problem: Wrong Semantic Element**

**❌ Anti-pattern:**

```tsx
// Using button for navigation
<button onClick={() => navigate("/page")}>
  <Card>Navigate</Card>
</button>
```

**Issues:**

- Breaks right-click "Open in new tab"
- Breaks Cmd/Ctrl+Click
- Wrong semantic meaning
- Screen reader announces "button" not "link"

**✅ Our solution:**

```tsx
// Proper link semantic
<Link href="/page">
  <Card interactive>Navigate</Card>
</Link>
```

### **Problem: Missing Selection State**

**❌ Anti-pattern:**

```tsx
// Using div with onClick for selection
<div onClick={() => select(id)} className={selected ? "selected" : ""}>
  <Card>Option</Card>
</div>
```

**Issues:**

- Not keyboard accessible
- No ARIA state
- Screen readers can't announce selection
- Not focusable

**✅ Our solution:**

```tsx
// Proper button with ARIA
<SelectableCard selected={selected} onClick={() => select(id)}>
  Option
</SelectableCard>
// Announces: "button, pressed" or "button, not pressed"
```

---

## Comparison with Other Design Systems

Different design systems take different approaches to this problem. Here's how major systems handle it:

### **Material Design (Google)**

**Approach:** Single Card component, interactivity through composition

```tsx
// Navigation
<a href="/page">
  <Card>Content</Card>
</a>

// Selection - Use checkbox inside
<Card>
  <Checkbox checked={selected} />
  <CardContent>Option</CardContent>
</Card>
```

**Philosophy:** Card is purely visual, semantics come from wrapper or children.

---

### **Carbon Design System (IBM)**

**Approach:** Separate components for different interaction types (similar to ours)

```tsx
// Static
<Tile>Content</Tile>

// Navigation
<ClickableTile href="/page">Content</ClickableTile>

// Selection
<SelectableTile
  id="tile-1"
  name="tiles"
  selected={bool}
>
  Content
</SelectableTile>
```

**Philosophy:** Different HTML elements and ARIA patterns warrant separate components.

---

### **Atlassian Design System**

**Approach:** Single Card with `isClickable` prop

```tsx
// Static
<Card>Content</Card>

// Navigation
<Card isClickable href="/page">Content</Card>

// Selection - Use checkbox inside
<Card>
  <Checkbox />
  Content
</Card>
```

**Philosophy:** Card handles navigation, selection through composition.

---

### **Polaris (Shopify)**

**Approach:** Minimal Card, interactivity through composition

```tsx
// Static
<Card>Content</Card>

// Navigation - explicit actions
<Card>
  <Button url="/page">View details</Button>
</Card>

// Selection
<Card>
  <Checkbox checked={selected} />
  Content
</Card>
```

**Philosophy:** Card is a pure container, always use explicit interactive elements.

---

## Our Decision Rationale

We chose an approach similar to **Carbon Design System** (separate components) rather than **Material Design** or **Polaris** (composition only) for these reasons:

### **Why Separate SelectableCard:**

1. **Different HTML element** - `<button>` vs `<div>` requires different component
2. **Different ARIA pattern** - `aria-pressed` is specific to selection
3. **Different behavior** - Selection state management built-in
4. **Clearer API** - `<SelectableCard selected>` vs `<Card><Checkbox></Card>`
5. **Better DX** - Less boilerplate for common pattern

### **Why interactive prop on Card:**

1. **Same HTML element** - Still a `<div>`, just with hover styles
2. **Common pattern** - Frequently used for navigation
3. **Backward compatible** - Optional prop, doesn't break existing usage
4. **Industry standard** - Atlassian and Ant Design use similar approach

---

## Guidelines for Implementation

### **Use Card When:**

- ✅ Grouping static information
- ✅ Container needs standard styling (border, padding, background)
- ✅ Wrapping in a Link for navigation
- ✅ Interactive children (buttons/links) inside the card

### **Use Card interactive When:**

- ✅ Entire card should be clickable for navigation
- ✅ Card is wrapped in a Link component
- ✅ Need visual feedback on hover

### **Use SelectableCard When:**

- ✅ User needs to select one or more options
- ✅ Building a radio-like or checkbox-like interface
- ✅ Selection state needs to be visible
- ✅ Need `aria-pressed` semantics

### **Don't:**

- ❌ Nest buttons inside links
- ❌ Use button for navigation
- ❌ Use div with onClick for selection
- ❌ Forget keyboard accessibility
- ❌ Mix interaction types (selection + navigation in same card)

---

## Testing for Accessibility

When implementing card components, test for:

### **Keyboard Navigation:**

- [ ] Can tab to interactive cards
- [ ] Enter key works for navigation
- [ ] Space key works for selection
- [ ] Focus indicators are visible

### **Screen Reader Announcements:**

- [ ] Navigation cards announced as links
- [ ] Selection cards announced as buttons with state
- [ ] Content is properly described
- [ ] Selection state is announced

### **Mouse Interaction:**

- [ ] Hover states provide visual feedback
- [ ] Cursor changes appropriately
- [ ] Entire card is clickable (not just text)

### **Browser Features:**

- [ ] Right-click works on navigation cards
- [ ] Cmd/Ctrl+Click opens in new tab
- [ ] Back button works correctly

---

## Conclusion

Card component architecture requires balancing flexibility with proper semantics and accessibility. Our approach:

**Two distinct components:**

1. **Card** - Container with optional interactive mode
2. **SelectableCard** - Selection button

**Key principles:**

- Semantic HTML is non-negotiable
- Different interaction types need different components
- Composition for flexibility, separation for clarity
- Accessibility drives architecture decisions

This architecture ensures our cards work correctly for all users, regardless of how they interact with our application.

---

## References

- [W3C ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Material Design - Cards](https://m3.material.io/components/cards)
- [Carbon Design System - Tile](https://carbondesignsystem.com/components/tile/usage/)
- [Atlassian Design System - Card](https://atlassian.design/components/card/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
