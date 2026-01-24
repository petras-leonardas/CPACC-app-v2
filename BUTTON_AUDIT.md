# Button Component Audit - Production Application

**Date:** January 17, 2026  
**Purpose:** Identify all button implementations before migrating to design system components

---

## Executive Summary

**Total Files with Buttons:** 27 files  
**Total Button Instances:** 108+

**Button Categories Identified:**

1. Primary action buttons (dark bg)
2. Secondary action buttons (light bg with border)
3. Icon-only buttons (Tooltip wrapped)
4. Navigation buttons
5. Dropdown/Menu buttons
6. Modal action buttons
7. Test interaction buttons

---

## 1. Primary Action Buttons

### Pattern: `bg-gray-900 dark:bg-gray-100`

**Usage:** Main CTAs, test actions, submit buttons

**Locations:**

#### **TestView.tsx** (Multiple instances)

- Back/Finish buttons
- Submit Answer button
- Next Question button
- Retry Test button
- Exit test confirmation

```tsx
className =
  "px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium";
```

#### **TopicDetailPage.tsx**

- Quick test CTA (sticky header)
- Bottom CTA test button

```tsx
className =
  "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 font-medium";
```

#### **MockExamPage.tsx**

- Super Quick Test start button
- Domain test buttons

```tsx
className =
  "px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium text-sm";
```

#### **AllTopicsPage.tsx**

- Start Test button (hero area)
- Domain test buttons

```tsx
className =
  "px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium";
```

#### **FlashcardsPage.tsx**

- Back button

```tsx
className =
  "mb-6 px-6 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors";
```

**Design System Equivalent:** `Button variant="primary"`

---

## 2. Secondary Action Buttons

### Pattern: `bg-white dark:bg-gray-800 border-2 border-gray-300`

**Usage:** Alternative actions, less emphasis

**Locations:**

#### **MockExamPage.tsx**

- Quick Test button
- Full Mock button

```tsx
className =
  "px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-sm";
```

#### **TestView.tsx**

- Cancel exit button

```tsx
className =
  "flex-1 px-6 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium";
```

**Design System Equivalent:** `Button variant="outline"`

---

## 3. Icon-Only Buttons (Tooltip Wrapped)

### Pattern: Icon buttons with Tooltip wrappers

**Usage:** Settings, media controls, theme toggle, navigation

**Locations:**

#### **Header.tsx**

- Menu toggle button
- Feedback button (with text on desktop)
- Theme toggle button

```tsx
<Tooltip content="...">
  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600">
    {/* Icon */}
  </button>
</Tooltip>
```

#### **TextToSpeech.tsx**

- Settings button
- Play/Pause buttons
- Previous/Next buttons

```tsx
<Tooltip content="...">
  <button className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400">
    <Icon name="..." customSize={24} />
  </button>
</Tooltip>
```

#### **StickyTextToSpeech.tsx**

- Minimize/Expand button
- Close button
- Media control buttons

#### **TopicDetailPage.tsx**

- Back button with Tooltip

**Design System Equivalent:** `IconButton` with `tooltip` prop

---

## 4. Navigation Buttons

### Pattern: Various gray backgrounds with hover states

**Usage:** Previous/Next topic, scroll to top, sidebar navigation

**Locations:**

#### **SectionNavigation.tsx**

- Previous topic button
- Next topic button
- Scroll to top button

```tsx
className =
  "flex-1 flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600";
```

#### **Sidebar.tsx**

- Home button
- Domain 1/2/3 buttons
- Practice button
- Feedback link button

```tsx
className =
  "w-full text-left px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-between mb-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100";
```

**Design System Equivalent:** `Button variant="ghost"` or custom navigation component

---

## 5. Dropdown/Menu Buttons

### Pattern: Full-width text-left buttons in menus

**Usage:** Settings menus, dropdown options, voice/speed selection

**Locations:**

#### **TextToSpeech.tsx** (Settings menu)

- Voice selection buttons
- Speed selection buttons
- Back navigation in submenus

```tsx
className =
  "w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between";
```

#### **BreadcrumbDropdown.tsx**

- Domain overview button
- Topic selection buttons
- Test all button

```tsx
// Implemented as divs with role="button" instead of actual buttons
className =
  "w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer";
```

**Design System Equivalent:** Custom menu component or `Button variant="ghost" size="sm"`

---

## 6. Modal/Dialog Action Buttons

### Pattern: Buttons in modals and confirmation dialogs

**Usage:** Submit forms, close modals, confirm actions

**Locations:**

#### **FeedbackModal.tsx**

- Submit feedback button
- Cancel button

#### **MockExamPage.tsx** (Test selection modal)

- Quick test card button
- Comprehensive test card button
- Close modal button

```tsx
className =
  "bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all text-left group";
```

**Design System Equivalent:** `Button` variants in modal context

---

## 7. Toggle/Expand Buttons

### Pattern: Buttons that expand/collapse content

**Usage:** Domain accordion, topic lists

**Locations:**

#### **MockExamPage.tsx**

- Domain toggle buttons
- Topic selection buttons

```tsx
className =
  "w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg";
```

**Design System Equivalent:** Custom accordion component with `Button` or `IconButton`

---

## 8. Back/Exit Buttons

### Pattern: Simple navigation back buttons

**Usage:** Return to previous page, exit flows

**Locations:**

#### **PrivacyPage.tsx, TermsPage.tsx, AccessibilityPage.tsx**

- Back navigation button

```tsx
className =
  "inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors";
```

**Design System Equivalent:** `Link` or `Button variant="ghost"`

---

## Key Styling Patterns

### **Border Radius:**

- `rounded-lg` - Most buttons
- `rounded-full` - CTAs, test actions
- `rounded` - Dropdowns, menus

### **Padding:**

- `px-6 py-3` - Primary large
- `px-4 py-2` - Secondary/small
- `p-2` - Icon only

### **Font Weight:**

- `font-medium` - Almost all buttons

### **Transitions:**

- `transition-colors` - Standard
- `transition-all` - Some interactive elements

### **Focus States:**

- `focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600` - Header buttons
- `focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400` - TTS buttons
- Many buttons missing explicit focus states ⚠️

---

## Issues Identified

### **1. Accessibility Concerns**

- ❌ Many buttons missing focus-visible states
- ❌ Inconsistent focus ring colors
- ❌ Some interactive divs used instead of buttons (BreadcrumbDropdown)
- ✅ Good: Most buttons have aria-labels and data-tracking-id

### **2. Consistency Issues**

- Multiple primary button styles (subtle differences in padding, radius)
- Inconsistent hover states
- Mixed use of gray shades for secondary actions
- No standardized button sizes

### **3. Dark Mode**

- Generally well-implemented
- Consistent use of dark mode classes
- Some contrast issues may exist

### **4. Missing Design System Usage**

- ❌ Zero usage of design system Button component in production
- ❌ Icon buttons manually wrapped with Tooltip instead of using IconButton
- ❌ No usage of design system Link component

---

## Migration Priority

### **High Priority (Most Used)**

1. **TestView.tsx** - 18 buttons (test interaction)
2. **TextToSpeech.tsx** - 13 buttons (media controls, settings)
3. **MockExamPage.tsx** - 9 buttons (test selection)
4. **TopicDetailPage.tsx** - 3 buttons (CTAs)

### **Medium Priority**

5. **Sidebar.tsx** - 6 buttons (navigation)
6. **FeedbackModal.tsx** - 6 buttons (form actions)
7. **StickyTextToSpeech.tsx** - 5 buttons (media controls)
8. **Header.tsx** - 3 buttons (global navigation)

### **Low Priority**

9. **SectionNavigation.tsx** - 3 buttons (page navigation)
10. **BreadcrumbDropdown.tsx** - 2 interactive elements
11. Static pages (Privacy, Terms, etc.) - 1 button each

---

## Recommended Migration Path

### **Phase 1: Replace Primary CTAs**

- TestView submission/navigation buttons
- TopicDetailPage test CTAs
- MockExamPage test start buttons
- **Target:** `Button variant="primary"`

### **Phase 2: Replace Icon Buttons**

- Header controls (menu, theme, feedback)
- TextToSpeech media controls
- StickyTextToSpeech controls
- **Target:** `IconButton` with tooltip

### **Phase 3: Replace Secondary Actions**

- Cancel buttons
- Alternative test options
- **Target:** `Button variant="outline"`

### **Phase 4: Replace Navigation Buttons**

- Sidebar navigation
- Section navigation
- Back buttons
- **Target:** `Button variant="ghost"` or custom nav components

### **Phase 5: Specialized Components**

- Dropdown menu buttons
- Accordion toggle buttons
- Modal action buttons
- **Target:** Custom components using design system primitives

---

## Design System Gaps

**Components needed but not yet in design system:**

1. Dropdown/Menu component
2. Accordion component
3. Modal/Dialog component
4. Navigation-specific button variants

**Enhancements needed in existing components:**

1. Button - Add `fullWidth` prop for modal buttons
2. IconButton - Verify tooltip integration works as expected
3. Link - May need "back button" variant

---

## Next Steps

1. ✅ **Audit complete**
2. ⏳ **Create migration plan with user**
3. ⏳ **Start with Phase 1 (Primary CTAs)**
4. ⏳ **Test accessibility thoroughly**
5. ⏳ **Update tracking IDs to maintain analytics**
6. ⏳ **Document any design system adjustments needed**
