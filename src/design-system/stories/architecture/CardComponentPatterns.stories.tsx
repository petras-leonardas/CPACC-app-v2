import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Architecture/Card Component Patterns',
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
      color: 'var(--color-text-primary, #1f2937)',
      background: 'var(--color-background, #ffffff)'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
        Card Component Patterns: Accessibility & Architecture
      </h1>
      
      <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        Understanding when to use Card vs SelectableCard and how to implement navigation cards correctly.
      </div>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        The Problem: One Component Can't Do Everything
      </h2>
      
      <p>Cards are used in many different contexts:</p>
      
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>Static containers</strong> - Grouping related information</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Navigation links</strong> - Clickable cards that take you to another page</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Selection controls</strong> - Cards that can be selected/deselected</li>
        <li><strong>Action triggers</strong> - Cards that perform an action when clicked</li>
      </ul>

      <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b' }}>
        Each use case requires different <strong>HTML semantics</strong>, <strong>ARIA patterns</strong>, and <strong>keyboard interactions</strong>.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Our Approach: Separation by Interaction Type
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Card - Container Component
      </h3>
      
      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #e5e7eb' }}>
        <p style={{ marginBottom: '0.75rem' }}><strong>Purpose:</strong> Visual container for content, with optional interactive styling for navigation use cases.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>HTML Element:</strong> <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;div&gt;</code></p>
        <p style={{ marginBottom: '0' }}><strong>Props:</strong> <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>interactive?: boolean</code></p>
      </div>

      <p><strong>Usage examples:</strong></p>
      
      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`// Static content
<Card>
  <h3>Feature Title</h3>
  <p>Description</p>
</Card>

// Navigation (entire card clickable)
<Link href="/details">
  <Card interactive>
    <h3>Click anywhere</h3>
    <p>Hover to see state</p>
  </Card>
</Link>`}
      </pre>

      <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
        <strong>✅ Accessibility:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0' }}>
          <li>Semantic <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;div&gt;</code> element</li>
          <li>Inherits link semantics when wrapped in Link</li>
          <li>Interactive mode provides visual hover feedback</li>
          <li>Screen readers announce as link with card content</li>
        </ul>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. SelectableCard - Selection Component
      </h3>
      
      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #e5e7eb' }}>
        <p style={{ marginBottom: '0.75rem' }}><strong>Purpose:</strong> Cards that can be selected/deselected, similar to radio buttons or checkboxes.</p>
        <p style={{ marginBottom: '0.75rem' }}><strong>HTML Element:</strong> <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> with <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>aria-pressed</code></p>
        <p style={{ marginBottom: '0' }}><strong>Props:</strong> <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>selected?: boolean, onClick?: () =&gt; void</code></p>
      </div>

      <p><strong>Usage example:</strong></p>
      
      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`<SelectableCard 
  selected={selectedPlan === 'pro'}
  onClick={() => setSelectedPlan('pro')}
>
  <h3>Pro Plan</h3>
  <p>$29/month</p>
</SelectableCard>`}
      </pre>

      <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
        <strong>✅ Accessibility:</strong>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem', marginBottom: '0' }}>
          <li>Semantic <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> element</li>
          <li><code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>aria-pressed</code> indicates selection state</li>
          <li>Space/Enter keys toggle selection</li>
          <li>Screen readers announce "button, pressed" or "button, not pressed"</li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Why This Separation Matters
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        ❌ Anti-pattern: Nested Interactive Elements
      </h3>

      <pre style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
{`// DON'T: Link containing button
<a href="/page">
  <button>Click me</button>
</a>

// Invalid HTML and confusing for screen readers`}
      </pre>

      <pre style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginTop: '1rem' }}>
{`// DO: Link wraps Card (div)
<Link href="/page">
  <Card interactive>Content</Card>
</Link>

// DO: SelectableCard is a button (no nesting)
<SelectableCard selected={bool}>
  Content
</SelectableCard>`}
      </pre>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        ❌ Anti-pattern: Wrong Semantic Element
      </h3>

      <p>Using button for navigation:</p>

      <pre style={{ background: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
{`// DON'T: Button for navigation
<button onClick={() => navigate('/page')}>
  <Card>Navigate</Card>
</button>

// Issues:
// - Breaks right-click "Open in new tab"
// - Breaks Cmd/Ctrl+Click
// - Wrong semantic meaning
// - Screen reader announces "button" not "link"`}
      </pre>

      <pre style={{ background: '#dcfce7', color: '#166534', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginTop: '1rem' }}>
{`// DO: Proper link semantic
<Link href="/page">
  <Card interactive>Navigate</Card>
</Link>`}
      </pre>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        How Other Design Systems Handle It
      </h2>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Carbon Design System (IBM) - Similar to Our Approach
      </h3>
      
      <p>Separate components for different interaction types:</p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Tile</code> - Static container</li>
        <li><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>ClickableTile</code> - Navigation</li>
        <li><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>SelectableTile</code> - Selection</li>
      </ul>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Atlassian Design System
      </h3>
      
      <p>Single Card with <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>isClickable</code> prop (similar to our <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>interactive</code>).</p>
      <p>Selection through Checkbox components inside Card.</p>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Material Design (Google)
      </h3>
      
      <p>Single Card component, interactivity through composition:</p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
        <li>Navigation: Wrap Card in <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code></li>
        <li>Selection: Use Checkbox inside Card</li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Implementation Guidelines
      </h2>

      <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginBottom: '1rem' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>✅ Use Card When:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>Grouping static information</li>
          <li>Container needs standard styling</li>
          <li>Wrapping in a Link for navigation</li>
          <li>Interactive children (buttons/links) inside</li>
        </ul>
      </div>

      <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginBottom: '1rem' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>✅ Use Card interactive When:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>Entire card should be clickable for navigation</li>
          <li>Card is wrapped in a Link component</li>
          <li>Need visual feedback on hover</li>
        </ul>
      </div>

      <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginBottom: '1rem' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>✅ Use SelectableCard When:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>User needs to select one or more options</li>
          <li>Building a radio-like or checkbox-like interface</li>
          <li>Selection state needs to be visible</li>
          <li>Need aria-pressed semantics</li>
        </ul>
      </div>

      <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>❌ Don't:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>Nest buttons inside links</li>
          <li>Use button for navigation</li>
          <li>Use div with onClick for selection</li>
          <li>Forget keyboard accessibility</li>
          <li>Mix interaction types (selection + navigation in same card)</li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Testing Checklist
      </h2>

      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>Keyboard Navigation:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li>Can tab to interactive cards</li>
          <li>Enter key works for navigation</li>
          <li>Space key works for selection</li>
          <li>Focus indicators are visible</li>
        </ul>

        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>Screen Reader Announcements:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li>Navigation cards announced as links</li>
          <li>Selection cards announced as buttons with state</li>
          <li>Content is properly described</li>
          <li>Selection state is announced</li>
        </ul>

        <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>Browser Features:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>Right-click works on navigation cards</li>
          <li>Cmd/Ctrl+Click opens in new tab</li>
          <li>Back button works correctly</li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Conclusion
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.8' }}>
        Our card architecture balances flexibility with proper semantics and accessibility:
      </p>

      <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #7dd3fc', marginTop: '1.5rem' }}>
        <p style={{ margin: '0 0 1rem 0' }}><strong>Two distinct components:</strong></p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
          <li><strong>Card</strong> - Container with optional interactive mode</li>
          <li><strong>SelectableCard</strong> - Selection button</li>
        </ul>
        
        <p style={{ margin: '1rem 0 0.5rem 0' }}><strong>Key principles:</strong></p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>Semantic HTML is non-negotiable</li>
          <li>Different interaction types need different components</li>
          <li>Composition for flexibility, separation for clarity</li>
          <li>Accessibility drives architecture decisions</li>
        </ul>
      </div>

      <p style={{ fontSize: '1.125rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', fontStyle: 'italic', color: '#6b7280' }}>
        This architecture ensures our cards work correctly for all users, regardless of how they interact with our application.
      </p>
    </div>
  ),
}
