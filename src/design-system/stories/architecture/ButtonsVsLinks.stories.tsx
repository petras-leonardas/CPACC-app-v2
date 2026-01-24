import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Architecture/Buttons vs Links',
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
        Buttons vs Links: A Semantic HTML Guide
      </h1>
      
      <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        Understanding when to use <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> vs <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> for accessibility and semantic HTML.
      </div>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        The Core Principle
      </h2>
      
      <p>The fundamental rule for choosing between buttons and links is simple:</p>
      
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>Use <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> for actions</strong> that change something on the current page
        </li>
        <li>
          <strong>Use <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> (link) for navigation</strong> that takes users to a different location
        </li>
      </ul>

      <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b' }}>
        This distinction isn't just about styling—it's about <strong>semantic HTML</strong>, <strong>accessibility</strong>, and <strong>user expectations</strong>.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Why This Matters
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Screen Reader Behavior
      </h3>
      
      <p>Screen readers announce elements differently:</p>
      
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>Button:</strong> "Submit, button"</li>
        <li><strong>Link:</strong> "Home page, link"</li>
      </ul>

      <p>When users hear "button," they expect an <strong>action</strong> (submit form, open modal, toggle state). When users hear "link," they expect <strong>navigation</strong> (go to another page).</p>

      <p style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
        ⚠️ Using the wrong element creates confusion and breaks expectations for users who rely on assistive technology.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. Keyboard Navigation
      </h3>
      
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>Buttons:</strong> Activated with <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Space</code> or <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Enter</code></li>
        <li><strong>Links:</strong> Activated with <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Enter</code> only</li>
      </ul>

      <p>Users who navigate by keyboard have learned these patterns. Using the wrong element disrupts their workflow.</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Browser Behavior
      </h3>
      
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>Links:</strong> Right-click opens context menu (Open in New Tab, Copy Link, etc.)</li>
        <li><strong>Buttons:</strong> Right-click shows standard context menu</li>
      </ul>

      <p>Links styled as buttons remove expected browser functionality.</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        4. SEO & Crawling
      </h3>
      
      <p>Search engines follow <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> tags to discover pages. They don't follow buttons, even if styled to look like links.</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Decision Tree
      </h2>

      <pre style={{ 
        background: '#1f2937', 
        color: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        overflow: 'auto',
        fontSize: '0.875rem',
        lineHeight: '1.5'
      }}>{`Does it navigate to a different URL?
├─ YES → Use <a> (Link)
│   Examples:
│   - Navigation menu items
│   - Breadcrumb links
│   - Footer links
│   - "Learn more" links
│   - Pagination
│
└─ NO → Does it perform an action?
    ├─ YES → Use <button>
    │   Examples:
    │   - Submit form
    │   - Open modal
    │   - Toggle accordion
    │   - Add to cart
    │   - Delete item
    │   - Toggle dark mode
    │
    └─ NO → Re-evaluate if you need an interactive element`}</pre>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Common Scenarios
      </h2>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #22c55e' }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.75rem', fontWeight: '600', color: '#166534' }}>
          ✅ Correct: Navigation Items (Our Approach)
        </h3>
        <pre style={{ background: '#052e16', color: '#dcfce7', padding: '1rem', borderRadius: '0.375rem', overflow: 'auto', fontSize: '0.875rem' }}>{`// Sidebar navigation - Uses NavigationItem (wraps <a>)
<NavigationItem href="/home" active={isHomePage}>
  Home
</NavigationItem>`}</pre>
        <p style={{ marginTop: '0.75rem', marginBottom: '0' }}><strong>Why:</strong> Navigation changes the URL and loads different content. Semantic <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> tag is correct.</p>
      </div>

      <div style={{ background: '#fee2e2', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #ef4444' }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.75rem', fontWeight: '600', color: '#991b1b' }}>
          ❌ Incorrect: Using Buttons for Navigation
        </h3>
        <pre style={{ background: '#450a0a', color: '#fee2e2', padding: '1rem', borderRadius: '0.375rem', overflow: 'auto', fontSize: '0.875rem' }}>{`// DON'T DO THIS
<Button onClick={() => navigate('/home')}>
  Home
</Button>`}</pre>
        <p style={{ marginTop: '0.75rem', marginBottom: '0.5rem' }}><strong>Problems:</strong></p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0' }}>
          <li>Screen reader announces "Home, button" (confusing!)</li>
          <li>Can't right-click to "Open in New Tab"</li>
          <li>Not crawlable by search engines</li>
          <li>Breaks keyboard shortcut expectations</li>
        </ul>
      </div>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #22c55e' }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.75rem', fontWeight: '600', color: '#166534' }}>
          ✅ Correct: Action Buttons
        </h3>
        <pre style={{ background: '#052e16', color: '#dcfce7', padding: '1rem', borderRadius: '0.375rem', overflow: 'auto', fontSize: '0.875rem' }}>{`// Toggle theme - Uses Button
<IconButton 
  onClick={toggleTheme}
  icon={theme === 'light' ? <Moon /> : <Sun />}
/>

// Open feedback modal - Uses Button
<Button onClick={openFeedbackModal}>
  Send Feedback
</Button>`}</pre>
        <p style={{ marginTop: '0.75rem', marginBottom: '0' }}><strong>Why:</strong> These perform actions without navigation. Button is correct.</p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        How Other Design Systems Handle This
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Material Design (Google)
        </h3>
        <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: '#6b7280' }}>
          "Use buttons for actions and links for navigation. Don't use buttons to navigate."
        </blockquote>
        <p>
          <strong>Source:</strong> <a href="https://m3.material.io/components/buttons/overview" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>Material Design - Buttons</a>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Polaris (Shopify)
        </h3>
        <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: '#6b7280' }}>
          "Use links for navigation. Use buttons for actions."
        </blockquote>
        <p>
          <strong>Source:</strong> <a href="https://polaris.shopify.com/components/navigation/link" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>Polaris - Link</a>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          GOV.UK Design System
        </h3>
        <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: '#6b7280' }}>
          "Use links for navigation. Do not use buttons as links."
        </blockquote>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Research Finding:</strong> Their user research showed that buttons styled as links confused screen reader users.
        </p>
        <p>
          <strong>Source:</strong> <a href="https://design-system.service.gov.uk/components/link/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>GOV.UK - Link</a>
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        WCAG Guidelines
      </h2>

      <p>The <strong>Web Content Accessibility Guidelines (WCAG)</strong> emphasize semantic HTML:</p>

      <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>
          WCAG 4.1.2 - Name, Role, Value
        </h3>
        <blockquote style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic' }}>
          "User interface components must have the correct role."
        </blockquote>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Navigation elements should have <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>role="link"</code> (native to <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code>)</li>
          <li>Action elements should have <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>role="button"</code> (native to <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code>)</li>
        </ul>
        <p style={{ marginBottom: '0' }}>
          <strong>Source:</strong> <a href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html" target="_blank" rel="noopener" style={{ color: '#1e40af', textDecoration: 'underline' }}>WCAG 4.1.2</a>
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Our Implementation
      </h2>

      <p>We created a dedicated <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>NavigationItem</code> component for sidebar navigation that:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li>Uses semantic <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> tag underneath</li>
        <li>Handles programmatic navigation via onClick</li>
        <li>Maintains proper href for accessibility</li>
        <li>Supports active states</li>
        <li>Works with screen readers</li>
      </ul>

      <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>
          Why Not Button?
        </h3>
        <p>Our original implementation used Button components for navigation:</p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.375rem', overflow: 'auto', fontSize: '0.875rem', marginTop: '1rem' }}>{`// OLD (incorrect)
<Button onClick={navigateToDomain1} variant="primary">
  Domain 1
</Button>`}</pre>
        <p style={{ marginTop: '1rem' }}><strong>Problems:</strong></p>
        <ul style={{ marginLeft: '1.5rem' }}>
          <li>Screen reader announced "Domain 1, button" ❌</li>
          <li>No href = not crawlable by search engines ❌</li>
          <li>Can't right-click to open in new tab ❌</li>
          <li>Wrong semantic meaning ❌</li>
        </ul>
        <p style={{ marginTop: '1rem', marginBottom: '0' }}><strong>Solution:</strong> Created NavigationItem with proper <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> tag semantics.</p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Quick Reference Table
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Use Case</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Element</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Component</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}>Navigate to page</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code></td>
            <td style={{ padding: '0.75rem' }}>NavigationItem, Link</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}>Submit form</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code></td>
            <td style={{ padding: '0.75rem' }}>Button</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}>Open modal</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code></td>
            <td style={{ padding: '0.75rem' }}>Button</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}>Toggle state</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code></td>
            <td style={{ padding: '0.75rem' }}>IconButton</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}>External link</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code></td>
            <td style={{ padding: '0.75rem' }}>Link</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Key Takeaways
      </h2>

      <ol style={{ marginLeft: '1.5rem', fontSize: '1.125rem', lineHeight: '1.75rem' }}>
        <li style={{ marginBottom: '0.75rem' }}><strong>Semantic HTML is not optional</strong> - It's foundational for accessibility</li>
        <li style={{ marginBottom: '0.75rem' }}><strong>Screen readers rely on correct element types</strong> - Wrong elements break user expectations</li>
        <li style={{ marginBottom: '0.75rem' }}><strong>Styling does not change semantics</strong> - A button styled as a link is still a button to assistive tech</li>
        <li style={{ marginBottom: '0.75rem' }}><strong>When in doubt, ask: "Does this navigate?"</strong> - If yes, use a link</li>
        <li><strong>All major design systems agree</strong> - This is industry consensus, not opinion</li>
      </ol>

      <div style={{ background: '#353A56', color: '#ffffff', padding: '2rem', borderRadius: '0.5rem', marginTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '0', marginBottom: '1rem', fontWeight: '600' }}>
          Conclusion
        </h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          <strong>Use the right HTML element for the job:</strong>
        </p>
        <p style={{ fontSize: '1rem', marginBottom: '0' }}>
          Navigation → <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> tag → Link or NavigationItem component<br/>
          Actions → <code style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> tag → Button or IconButton component
        </p>
        <p style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0', fontWeight: '600', color: '#F39C52' }}>
          When we choose semantic HTML, we choose inclusion.
        </p>
      </div>
    </div>
  ),
}
