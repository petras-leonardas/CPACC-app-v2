import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Architecture/Skip Links',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Guide: Story = {
  render: () => (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '3rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      color: '#1f2937'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
        Skip Links: Bypassing Repetitive Content
      </h1>
      
      <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        How skip links improve keyboard and screen reader navigation by allowing users to bypass repetitive content and jump directly to main areas of a page.
      </div>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        What Are Skip Links?
      </h2>
      
      <p>Skip links are hidden navigation links that allow keyboard and screen reader users to <strong>bypass repetitive content</strong> and jump directly to important sections of a page.</p>

      <p style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '1rem', borderLeft: '4px solid #3b82f6' }}>
        <strong>The Problem:</strong> Users who navigate by keyboard must press Tab through <em>every</em> interactive element to reach the main content. On complex sites with large headers and navigation menus, this could mean 20-30 Tab presses just to reach the content they came for.
      </p>

      <p style={{ marginTop: '1.5rem' }}>
        Skip links solve this by providing a direct path to main content, typically appearing as the <strong>first focusable element</strong> on the page.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Why Skip Links Matter
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Keyboard Navigation Efficiency
      </h3>
      
      <p>Imagine having to Tab through all of these on <strong>every page load</strong>:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li>Logo (1 Tab)</li>
        <li>Menu toggle (1 Tab)</li>
        <li>Navigation expand/collapse (1 Tab)</li>
        <li>Theme toggle (1 Tab)</li>
        <li>Feedback button (1 Tab)</li>
        <li>Home navigation item (1 Tab)</li>
        <li>Domain 1 navigation (1 Tab)</li>
        <li>Domain 2 navigation (1 Tab)</li>
        <li>Domain 3 navigation (1 Tab)</li>
        <li>Practice navigation (1 Tab)</li>
      </ul>

      <p>That's <strong>10+ Tab presses</strong> before reaching content. With a skip link: <strong>1 Tab press, then Enter.</strong></p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. Screen Reader Experience
      </h3>

      <p>Screen reader users hear <em>every element</em> announced as they navigate:</p>

      <pre style={{ 
        background: '#1f2937', 
        color: '#f9fafb', 
        padding: '1rem', 
        borderRadius: '0.5rem', 
        fontSize: '0.875rem',
        overflow: 'auto',
        marginTop: '1rem'
      }}>{`"Skip to main content, link"
"Logo, link"
"Toggle navigation menu, button"
"Expand navigation, button"
...
(User presses Enter on skip link)
"Main content, region"`}</pre>

      <p style={{ marginTop: '1rem' }}>
        Instead of hearing announcements for dozens of elements they've already encountered, skip links let them go straight to what they need.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Cognitive Load Reduction
      </h3>

      <p>Users with cognitive disabilities benefit from:</p>
      <ul style={{ marginLeft: '1.5rem' }}>
        <li>Fewer decisions to make</li>
        <li>Faster access to content</li>
        <li>Less mental fatigue from repetitive navigation</li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        WCAG Requirements
      </h2>

      <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #3b82f6' }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>
          WCAG 2.4.1 - Bypass Blocks (Level A)
        </h3>
        <blockquote style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic' }}>
          "A mechanism is available to bypass blocks of content that are repeated on multiple Web pages."
        </blockquote>
        <p style={{ marginBottom: '0' }}>
          This is a <strong>Level A requirement</strong> — the most basic level of WCAG compliance. Sites without skip links fail this criterion.
        </p>
      </div>

      <p style={{ marginTop: '1.5rem' }}>
        <strong>Acceptable mechanisms include:</strong>
      </p>
      <ul style={{ marginLeft: '1.5rem' }}>
        <li>Skip links (most common)</li>
        <li>Landmark regions with proper ARIA labels</li>
        <li>Heading hierarchy (H1, H2, H3)</li>
        <li>Expand/collapse sections</li>
      </ul>

      <p><strong>Skip links are the most reliable</strong> because they work across all assistive technologies and browsers.</p>

      <p style={{ marginTop: '1.5rem' }}>
        <strong>Source:</strong> <a href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>WCAG 2.4.1 Understanding Document</a>
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        How Other Design Systems Implement Skip Links
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          GitHub
        </h3>
        <p><strong>Implementation:</strong> Three skip links at the top of every page</p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<a href="#start-of-content">Skip to content</a>
<a href="#search">Skip to search</a>
<a href="#repository-container-header">Skip to repository</a>`}</pre>
        <p style={{ marginTop: '1rem' }}><strong>Why multiple skip links?</strong> GitHub provides shortcuts to different sections users might want to reach, not just main content.</p>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> GitHub's skip links are always in the same position on every page, building muscle memory for keyboard users.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          GOV.UK Design System
        </h3>
        <p><strong>Implementation:</strong> Single "Skip to main content" link with keyboard shortcut hint</p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<a href="#main-content" class="govuk-skip-link">
  Skip to main content (press shortcut: S)
</a>`}</pre>
        <p style={{ marginTop: '1rem' }}><strong>Styling:</strong> Yellow background (matching GOV.UK yellow branding), high contrast black text, large padding for easy clicking.</p>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> Includes keyboard shortcut hint, making it even faster for power users.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Source:</strong> <a href="https://design-system.service.gov.uk/components/skip-link/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>GOV.UK Skip Link Component</a>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          BBC
        </h3>
        <p><strong>Implementation:</strong> "Skip to content" link with descriptive focus styling</p>
        <p>BBC's skip link uses high contrast colors and appears prominently at the top-left of the page when focused.</p>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> BBC ensures the skip link is visible when focused but doesn't disrupt the visual design when not in use.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          WebAIM
        </h3>
        <p><strong>Implementation:</strong> Multiple skip links for complex navigation</p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<a href="#main">Skip to main content</a>
<a href="#nav">Skip to navigation</a>
<a href="#footer">Skip to footer</a>`}</pre>
        <p style={{ marginTop: '1rem' }}>
          <strong>Why this matters:</strong> WebAIM (Web Accessibility In Mind) is an authority on accessibility — if they use multiple skip links, it's a validated pattern.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Source:</strong> <a href="https://webaim.org/techniques/skipnav/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>WebAIM: "Skip Navigation" Links</a>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Yale University
        </h3>
        <p><strong>Implementation:</strong> Simple, always visible skip link</p>
        <p>Unlike most sites that hide the skip link until focused, Yale keeps it visible at all times in the header. This approach has trade-offs:</p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li><strong>Pro:</strong> More discoverable for users who may not know about skip links</li>
          <li><strong>Con:</strong> Takes up visual space in the header</li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Implementation Patterns
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Hidden Until Focused (Most Common)
      </h3>

      <p><strong>Our Implementation:</strong></p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        absolute left-0 -top-10 z-[100]
        bg-gray-900 dark:bg-gray-100 
        text-white dark:text-gray-900
        px-4 py-2 
        font-medium text-sm
        focus:top-0 
        transition-all duration-200
        focus:outline-none focus:ring-2 
        focus:ring-orange-500 focus:ring-offset-2
      "
    >
      Skip to main content
    </a>
  )
}`}</pre>

      <p style={{ marginTop: '1.5rem' }}><strong>Key Features:</strong></p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li><strong>Position:</strong> Absolute positioning at top-left</li>
        <li><strong>Hidden state:</strong> <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>-top-10</code> moves it off-screen</li>
        <li><strong>Visible on focus:</strong> <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>focus:top-0</code> brings it into view</li>
        <li><strong>High z-index:</strong> Ensures it appears above all other content</li>
        <li><strong>Smooth transition:</strong> <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>transition-all duration-200</code></li>
        <li><strong>Dark mode support:</strong> Inverted colors for proper contrast</li>
        <li><strong>Focus ring:</strong> Orange ring matches our design system</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. Screen Reader Only
      </h3>

      <p><strong>Alternative pattern using sr-only class:</strong></p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Tailwind sr-only classes:
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}`}</pre>

      <p style={{ marginTop: '1rem' }}><strong>Pro:</strong> Uses Tailwind's built-in utility classes</p>
      <p><strong>Con:</strong> Less visually prominent when focused (1px box appears)</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Always Visible
      </h3>

      <p>Some sites make skip links permanently visible:</p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<a href="#main-content" className="inline-block p-2 text-sm">
  Skip to main content
</a>`}</pre>

      <p style={{ marginTop: '1rem' }}><strong>Pro:</strong> More discoverable for all users</p>
      <p><strong>Con:</strong> Takes up permanent header space</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Target Elements
      </h2>

      <p>Skip links must target an element with a matching ID:</p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`// Skip Link
<a href="#main-content">Skip to main content</a>

// Target
<main id="main-content" role="main">
  {/* Page content */}
</main>`}</pre>

      <p style={{ marginTop: '1.5rem' }}><strong>Important considerations:</strong></p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li><strong>Must have <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>id</code> attribute:</strong> <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>id="main-content"</code> on the target element</li>
        <li><strong>Use semantic HTML:</strong> Target a <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;main&gt;</code> element, not a <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;div&gt;</code></li>
        <li><strong>Add <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>tabindex="-1"</code>:</strong> In some browsers, you need <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>tabindex="-1"</code> on the target for focus to work properly</li>
      </ul>

      <div style={{ background: '#fee2e2', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '1rem', borderLeft: '4px solid #ef4444' }}>
        <p style={{ marginTop: '0', marginBottom: '0.5rem' }}><strong>⚠️ Common Mistake:</strong></p>
        <p style={{ marginBottom: '0' }}>Don't target an element that doesn't exist or is conditionally rendered. The skip link must <em>always</em> have a valid target.</p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Testing Your Skip Link
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Manual Testing
      </h3>

      <ol style={{ marginLeft: '1.5rem', fontSize: '1rem', lineHeight: '1.75rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Load your page</strong>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Press Tab once</strong> — skip link should appear
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Press Enter</strong> — page should scroll to main content
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Press Tab again</strong> — focus should be on the first focusable element in main content
        </li>
      </ol>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Screen Reader Testing
      </h3>

      <p><strong>VoiceOver (Mac):</strong></p>
      <ol style={{ marginLeft: '1.5rem' }}>
        <li>Turn on VoiceOver (Cmd + F5)</li>
        <li>Press Control + Option + Right Arrow</li>
        <li>First element should be "Skip to main content, link"</li>
        <li>Press Control + Option + Space to activate</li>
      </ol>

      <p style={{ marginTop: '1.5rem' }}><strong>NVDA (Windows):</strong></p>
      <ol style={{ marginLeft: '1.5rem' }}>
        <li>Turn on NVDA</li>
        <li>Press Tab</li>
        <li>NVDA should announce "Skip to main content, link"</li>
        <li>Press Enter to activate</li>
      </ol>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Common Questions
      </h2>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Should skip links be visible to all users?
      </h3>
      <p>There's no consensus. Most sites hide them until focused to preserve visual design. Some argue they should always be visible for discoverability. <strong>Hidden until focused is the most common pattern.</strong></p>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Do I need multiple skip links?
      </h3>
      <p>For most sites, one skip link to main content is sufficient. Complex sites with sidebars, multiple navigation areas, or dense headers may benefit from additional skip links (e.g., "Skip to navigation", "Skip to search").</p>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Can I use JavaScript to implement skip links?
      </h3>
      <p>Yes, but it's unnecessary. Native HTML anchor links (<code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>href="#main-content"</code>) work perfectly and are more reliable than JavaScript solutions.</p>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Do skip links work on Single Page Applications (SPAs)?
      </h3>
      <p>Yes! As long as you have a <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;main id="main-content"&gt;</code> element on every route, skip links work in React, Vue, Angular, etc.</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Key Takeaways
      </h2>

      <ol style={{ marginLeft: '1.5rem', fontSize: '1.125rem', lineHeight: '1.75rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Skip links are required for WCAG 2.4.1 compliance</strong> (Level A)
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>They should be the first focusable element</strong> on the page
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Hidden until focused is the most common pattern</strong>, balancing accessibility and design
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Target a semantic <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;main&gt;</code> element</strong> with a matching ID
        </li>
        <li>
          <strong>Test with keyboard and screen readers</strong> to ensure they work correctly
        </li>
      </ol>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Additional Resources
      </h2>

      <ul style={{ marginLeft: '1.5rem', fontSize: '1rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            WCAG 2.4.1: Bypass Blocks
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://webaim.org/techniques/skipnav/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            WebAIM: "Skip Navigation" Links
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://design-system.service.gov.uk/components/skip-link/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            GOV.UK: Skip Link Component
          </a>
        </li>
        <li>
          <a href="https://www.a11yproject.com/posts/skip-nav-links/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            The A11Y Project: Skip Navigation Links
          </a>
        </li>
      </ul>

      <div style={{ background: '#353A56', color: '#ffffff', padding: '2rem', borderRadius: '0.5rem', marginTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '0', marginBottom: '1rem', fontWeight: '600' }}>
          Our Implementation
        </h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          We've implemented a skip link that:
        </p>
        <ul style={{ listStyle: 'none', padding: '0', fontSize: '1rem', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li style={{ marginBottom: '0.5rem' }}>✓ Appears on first Tab press</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Has high contrast styling</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Supports light and dark modes</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Includes proper focus indicators</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Targets semantic <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;main&gt;</code> element</li>
        </ul>
        <p style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0', fontWeight: '600', color: '#F39C52' }}>
          Small change. Massive impact.
        </p>
      </div>
    </div>
  ),
}
