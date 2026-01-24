# Link Component Audit - CPACC App v2

**Date:** January 17, 2026  
**Purpose:** Comprehensive audit of all link implementations to prepare for migration to design system Link component

---

## Executive Summary

### Total Links Found: ~60+ links across the application

**Link Types:**

- **Internal Navigation Links (React Router):** ~40 links
- **External Links:** ~12 links
- **SEO/Meta Links:** ~5 links
- **Logo/Brand Links:** ~3 links

---

## 1. React Router `<Link>` Components (Internal Navigation)

### **Footer.tsx** (3 links)

**Location:** `src/components/Footer.tsx`

```tsx
// Lines 21-46
<Link
  to="/terms"
  onClick={() => handleFooterLinkClick('terms')}
  data-tracking-id="footer-terms"
  className="cpacc-text-small-link"
>
  Terms
</Link>

<Link
  to="/privacy"
  onClick={() => handleFooterLinkClick('privacy')}
  data-tracking-id="footer-privacy"
  className="cpacc-text-small-link"
>
  Privacy
</Link>

<Link
  to="/accessibility"
  onClick={() => handleFooterLinkClick('accessibility')}
  data-tracking-id="footer-accessibility"
  className="cpacc-text-small-link"
>
  Accessibility
</Link>
```

**Characteristics:**

- ✅ Has tracking IDs
- ✅ Has onClick handlers for analytics
- ✅ Uses custom className (`cpacc-text-small-link`)
- ✅ Simple text links

---

### **WelcomePage.tsx** (3 domain cards)

**Location:** `src/pages/WelcomePage.tsx`

```tsx
// Lines 117-138 - Domain 1 Card
<Link
  to="/disabilities-challenges-assistive-technology"
  onClick={() => handleDomainCardClick(1, 'Disabilities, Challenges & Assistive Technologies')}
  data-tracking-id="home-domain-1-card"
  className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
>
  {/* Card content with Icon, Heading, Text */}
</Link>

// Lines 141-162 - Domain 2 Card
<Link
  to="/accessibility-universal-design"
  onClick={() => handleDomainCardClick(2, 'Accessibility & Universal Design')}
  data-tracking-id="home-domain-2-card"
  className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
>
  {/* Card content */}
</Link>

// Lines 165-186 - Domain 3 Card
<Link
  to="/standards-laws-management-strategies"
  onClick={() => handleDomainCardClick(3, 'Standards, Laws & Management Strategies')}
  data-tracking-id="home-domain-3-card"
  className="col-span-12 md:col-span-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all group"
>
  {/* Card content */}
</Link>
```

**Characteristics:**

- ✅ Has tracking IDs
- ✅ Has onClick handlers for analytics
- ✅ Complex card-style links with multiple children
- ✅ Hover states and transitions
- ⚠️ May need special handling for card wrapper vs. Link component

---

### **Domain Pages** (Domain1Page.tsx, Domain2Page.tsx, Domain3Page.tsx)

**Pattern:** Each domain page has:

1. **"Start learning" CTA link** (1 per page)
2. **Topic list links** (5-6 per page)

#### Domain1Page.tsx Example:

```tsx
// Lines 72-82 - Start Learning CTA
<Link
  to={`/disabilities-challenges-assistive-technology/${regularTopics[0].id}`}
  data-tracking-id="domain-1-start-learning"
  className="flex items-center justify-center gap-2 w-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-4 py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium mb-4"
>
  Start learning
  <svg>...</svg>
</Link>

// Lines 94-110 - Topic Links (repeated for each topic)
<Link
  key={topic.id}
  to={`/disabilities-challenges-assistive-technology/${topic.id}`}
  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
>
  <div className="flex items-center gap-3">
    <span>{topic.subCategory}. {topic.title}</span>
  </div>
  <svg>arrow</svg>
</Link>
```

**Characteristics:**

- ✅ Some have tracking IDs (CTAs)
- ❌ Topic list links lack tracking IDs
- ✅ Complex styling for hover states
- ✅ Contains child elements (icons, text)

**Total per domain page:** ~7 links × 3 pages = **~21 links**

---

### **AllTopicsPage.tsx**

**Location:** `src/pages/AllTopicsPage.tsx`

**Pattern:** Lists all topics across all domains with links to each topic page.

```tsx
// Topic links for each domain (estimated ~17 total topics)
<Link
  to={`/${domainPath}/${topic.id}`}
  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
>
  <div className="flex items-center gap-3">
    <span>{topic.title}</span>
  </div>
</Link>
```

**Characteristics:**

- ❌ No tracking IDs
- ✅ Consistent styling pattern
- ✅ Simple list-style links

**Total:** **~17 links**

---

## 2. Native `<a>` Tags (External & Internal)

### **External Documentation Links**

#### WelcomePage.tsx (2 external links)

```tsx
// Lines 241-248 - IAAP Link
<a
  href="https://www.accessibilityassociation.org/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 dark:text-blue-400 hover:underline"
>
  International Association of Accessibility Professionals (IAAP)
</a>

// Lines 251-257 - CPACC Body of Knowledge Link
<a
  href="https://www.accessibilityassociation.org/sfsites/c/resource/CPACCBoK"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 dark:text-blue-400 hover:underline"
>
  CPACC Body of Knowledge
</a>
```

---

#### PrivacyPage.tsx (2 external links)

```tsx
// Lines 134-141 - Amplitude Privacy Policy
<a
  href="https://amplitude.com/privacy"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 dark:text-blue-400 hover:underline"
>
  https://amplitude.com/privacy
</a>

// Lines 151-158 - Cloudflare Privacy Policy
<a
  href="https://www.cloudflare.com/privacypolicy/"
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 dark:text-blue-400 hover:underline"
>
  https://www.cloudflare.com/privacypolicy/
</a>
```

---

#### Sidebar.tsx (1 external link)

```tsx
// Lines 191-199 - LinkedIn Profile
<a
  href="https://www.linkedin.com/in/leobacevicius"
  target="_blank"
  rel="noopener noreferrer"
  onClick={handleLinkedInClick}
  data-tracking-id="sidebar-linkedin"
  className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline transition-colors"
>
  LinkedIn
</a>
```

**Characteristics:**

- ✅ All have `target="_blank"`
- ✅ All have `rel="noopener noreferrer"` (security)
- ✅ Consistent blue link styling
- ✅ LinkedIn link has tracking ID
- ❌ Other external links lack tracking IDs

**Total External Links:** **5 links**

---

### **Logo/Brand Links**

#### Header.tsx (1 link)

```tsx
// Line 97 - Logo link to home
<a
  href="/"
  onClick={handleLogoClick}
  data-tracking-id="header-logo"
  className="flex items-center"
>
  <img src={logoSrc} alt="CPACC Mastery" className="h-10" />
</a>
```

**Characteristics:**

- ✅ Has tracking ID
- ✅ Has onClick handler
- ✅ Uses `href="/"` instead of React Router Link
- ⚠️ Should potentially use React Router Link

---

#### CookieConsent.tsx (1 link)

```tsx
// Lines 64-72 - Privacy policy link in cookie banner
<a
  href="/privacy"
  style={{
    color: "#93C5FD",
    textDecoration: "underline",
  }}
>
  Read our Privacy Policy
</a>
```

**Characteristics:**

- ❌ No tracking ID
- ❌ Uses inline styles
- ✅ Internal link but uses `<a>` tag
- ⚠️ Should use React Router Link

---

### **Storybook/Documentation Links** (Not Production)

#### design-system/components/Logo/Logo.stories.tsx (3 placeholder links)

```tsx
<a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Home</a>
<a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">Courses</a>
<a href="#" className="hover:text-gray-900 dark:hover:text-gray-100">About</a>
```

#### design-system/stories/Icons.stories.tsx (1 link)

```tsx
<a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">
  Lucide Icons
</a>
```

**Note:** These are Storybook examples only, not in production code.

---

### **SEO/Meta Links**

#### SEO.tsx (1 canonical link)

```tsx
// Line 18 - Canonical URL meta tag
{
  canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />;
}
```

**Characteristics:**

- Not a clickable link
- SEO metadata only
- ⚠️ Should NOT be migrated to design system Link

---

## 3. Summary by Component

| Component         | React Router Links | External `<a>` | Internal `<a>` | Total   |
| ----------------- | ------------------ | -------------- | -------------- | ------- |
| Footer.tsx        | 3                  | 0              | 0              | 3       |
| WelcomePage.tsx   | 3                  | 2              | 0              | 5       |
| Domain1Page.tsx   | ~7                 | 0              | 0              | ~7      |
| Domain2Page.tsx   | ~7                 | 0              | 0              | ~7      |
| Domain3Page.tsx   | ~7                 | 0              | 0              | ~7      |
| AllTopicsPage.tsx | ~17                | 0              | 0              | ~17     |
| PrivacyPage.tsx   | 0                  | 2              | 0              | 2       |
| Sidebar.tsx       | 0                  | 1              | 0              | 1       |
| Header.tsx        | 0                  | 0              | 1              | 1       |
| CookieConsent.tsx | 0                  | 0              | 1              | 2       |
| **TOTAL**         | **~44**            | **5**          | **2**          | **~51** |

_(Excluding Storybook/documentation links)_

---

## 4. Link Patterns & Categories

### **Category A: Simple Text Links**

- Footer links (Terms, Privacy, Accessibility)
- External documentation links
- Sidebar LinkedIn link

**Migration Complexity:** ✅ **LOW** - Direct replacement

---

### **Category B: Button-Style CTA Links**

- "Start learning" buttons on domain pages
- Domain cards on home page (large interactive cards)

**Migration Complexity:** ⚠️ **MEDIUM** - May need Button component with Link functionality

---

### **Category C: List Item Links**

- Topic list links on domain pages
- All topics page list

**Migration Complexity:** ✅ **LOW-MEDIUM** - Consistent pattern, bulk replacement

---

### **Category D: Logo/Brand Links**

- Header logo
- Cookie consent privacy link

**Migration Complexity:** ⚠️ **MEDIUM** - Special handling for logo wrapper

---

### **Category E: External Links**

- All external links with `target="_blank"`

**Migration Complexity:** ✅ **LOW** - Design system Link component should handle external links

---

## 5. Design System Link Component Review

**Current Implementation:** `src/design-system/components/Link/Link.tsx`

**Key Features:**

- ✅ Supports both internal (React Router) and external links
- ✅ Automatic `target="_blank"` and `rel` for external URLs
- ✅ Multiple variants: `inline`, `standalone`, `button`
- ✅ Multiple sizes: `sm`, `md`, `lg`
- ✅ Underline options: `always`, `hover`, `none`
- ✅ Dark mode support
- ✅ TypeScript props with proper types
- ❌ No icon prop removed (per previous changes)

---

## 6. Migration Challenges & Considerations

### **Challenge 1: Card Wrapper Links**

**Issue:** Domain cards on WelcomePage are entire card components wrapped in `<Link>`

**Current:**

```tsx
<Link className="card-styles">
  <Icon />
  <Heading />
  <Text />
  <div>Arrow →</div>
</Link>
```

**Options:**

1. Keep as React Router `<Link>` with design system styling
2. Use design system `Link` with `variant="button"` but may need custom styling
3. Convert to clickable card pattern with hidden Link

**Recommendation:** Use design system Link with custom className for card styling

---

### **Challenge 2: Logo Link**

**Issue:** Header logo uses `<a href="/">` instead of React Router

**Current:**

```tsx
<a href="/" onClick={handleLogoClick}>
  <img src={logo} />
</a>
```

**Recommendation:** Convert to React Router Link for SPA navigation benefits

---

### **Challenge 3: Tracking IDs**

**Issue:** Not all links have `data-tracking-id` attributes

**Missing Tracking:**

- All topic list links (~34 links)
- External documentation links (4 links)
- Cookie consent privacy link (1 link)

**Recommendation:** Add tracking IDs during migration

---

### **Challenge 4: className vs. variant**

**Issue:** Current links use custom classNames; design system uses variants

**Current Pattern:**

```tsx
<Link className="custom-classes" />
```

**Design System Pattern:**

```tsx
<Link variant="inline" underline="hover" />
```

**Recommendation:** Map existing patterns to design system variants, use className for one-offs

---

## 7. Migration Plan (Phased Approach)

### **Phase 1: Simple Text Links (Low Risk)**

**Target:** Footer, external docs, sidebar LinkedIn  
**Count:** ~8 links  
**Effort:** 1-2 hours

**Steps:**

1. Replace Footer links with design system Link
2. Replace external links in WelcomePage and PrivacyPage
3. Replace Sidebar LinkedIn link
4. Test all link functionality and tracking

---

### **Phase 2: Logo & Special Links**

**Target:** Header logo, cookie consent  
**Count:** 2 links  
**Effort:** 30 minutes

**Steps:**

1. Convert Header logo to React Router Link
2. Update CookieConsent privacy link
3. Verify analytics tracking

---

### **Phase 3: Topic List Links (Bulk Migration)**

**Target:** All domain pages, AllTopicsPage  
**Count:** ~34 links  
**Effort:** 2-3 hours

**Steps:**

1. Create consistent mapping for topic list links
2. Add missing tracking IDs
3. Bulk replace with design system Link
4. Test navigation across all pages

---

### **Phase 4: CTA & Card Links (Complex)**

**Target:** Domain cards, "Start learning" buttons  
**Count:** ~6 links  
**Effort:** 2 hours

**Steps:**

1. Evaluate variant approach (button vs. custom)
2. Migrate "Start learning" CTAs
3. Migrate domain card links
4. Test hover states and visual appearance

---

## 8. Pre-Migration Checklist

- [ ] Review design system Link component API
- [ ] Confirm Link component supports all needed features
- [ ] Identify all links missing tracking IDs
- [ ] Create tracking ID naming convention
- [ ] Test design system Link with React Router integration
- [ ] Plan rollback strategy if issues arise

---

## 9. Post-Migration Verification

### **Functional Testing:**

- [ ] All internal links navigate correctly
- [ ] External links open in new tab
- [ ] Back button works (SPA navigation preserved)
- [ ] Tracking IDs fire correctly in Amplitude
- [ ] Hover states work as expected
- [ ] Focus states are accessible
- [ ] Dark mode styling correct

### **Visual Testing:**

- [ ] Link colors match design system
- [ ] Underlines appear as expected
- [ ] Card hover effects preserved
- [ ] CTA buttons look identical
- [ ] Footer links styled correctly

### **Performance:**

- [ ] No layout shift on hover
- [ ] Fast navigation (SPA benefits)
- [ ] No console errors

---

## 10. Risk Assessment

| Risk                              | Likelihood | Impact | Mitigation                          |
| --------------------------------- | ---------- | ------ | ----------------------------------- |
| Broken internal navigation        | Low        | High   | Test all routes thoroughly          |
| Lost tracking IDs                 | Medium     | High   | Audit before/after, add missing IDs |
| Visual regression                 | Medium     | Medium | Visual comparison testing           |
| External links don't open new tab | Low        | Medium | Design system handles automatically |
| Card styling breaks               | Medium     | Low    | Use className for custom styling    |

---

## Conclusion

**Total Links to Migrate:** ~51 production links

**Estimated Total Effort:** 6-8 hours

**Recommended Approach:** Phased migration starting with simple text links, building confidence before tackling complex card/CTA links.

**Critical Success Factors:**

1. Preserve all tracking IDs
2. Maintain SPA navigation benefits
3. Keep visual appearance identical
4. Test thoroughly in staging before production

**Next Steps:**

1. Get user approval for phased plan
2. Start with Phase 1 (simple text links)
3. Test and verify after each phase
4. Document any issues for design system improvements
