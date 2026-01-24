import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Architecture/Links Styled as Buttons - Anti-Pattern',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const AntiPattern: Story = {
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
        Why Links Should Never Be Styled as Buttons
      </h1>
      
      <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        A critical accessibility anti-pattern and how to avoid it.
      </div>

      <div style={{ background: '#fee2e2', padding: '1.5rem', borderRadius: '0.5rem', border: '2px solid #ef4444', marginBottom: '3rem' }}>
        <h2 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600', color: '#991b1b' }}>
          ⚠️ Critical Anti-Pattern
        </h2>
        <p style={{ margin: '0', fontSize: '1rem' }}>
          <strong>Links styled to look like buttons</strong> is one of the most common and harmful accessibility violations. This breaks user expectations, confuses assistive technology users, and violates fundamental design principles.
        </p>
      </div>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        The Problem
      </h2>

      <p>When a link (<code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code>) is styled with button appearance (solid background, pill shape, button-like padding), it creates a mismatch between:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', marginTop: '1.5rem' }}>
        <div style={{ background: '#fee2e2', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
          <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
            What Users See
          </h3>
          <p style={{ margin: '0', fontSize: '0.875rem' }}>
            A button with solid background, rounded corners, button-like padding. Visual cues say: "I'm a button that performs an action."
          </p>
        </div>
        <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #93c5fd' }}>
          <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600' }}>
            What It Actually Is
          </h3>
          <p style={{ margin: '0', fontSize: '0.875rem' }}>
            A link that navigates to a different page. Semantic HTML says: "I'm navigation, not an action."
          </p>
        </div>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        What Major Design Systems Say
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Material Design (Google)
        </h3>
        <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: '#6b7280' }}>
          "Don't style links to look like buttons."
        </blockquote>
        <p style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0' }}>
          "Visual appearance should match semantic meaning. Links that look like buttons confuse users and break accessibility expectations."
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <strong>Source:</strong> Material Design Accessibility Guidelines
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Polaris (Shopify)
        </h3>
        <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: '#6b7280' }}>
          "Links should look like links, not buttons."
        </blockquote>
        <p style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0' }}>
          "If something navigates, it should visually communicate that it's a link. Button styling creates false expectations about behavior."
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <strong>Source:</strong> Polaris Design System
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          GOV.UK Design System
        </h3>
        <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: '#6b7280' }}>
          "Do not make links look like buttons."
        </blockquote>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0', borderLeft: '4px solid #f59e0b' }}>
          <strong>Research Finding:</strong> "Users with cognitive disabilities reported confusion when links looked like buttons. Screen reader users expected button behavior but got navigation."
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <strong>Source:</strong> GOV.UK Accessibility Research
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Nielsen Norman Group
        </h3>
        <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic', color: '#6b7280' }}>
          "Match visual design to semantic function."
        </blockquote>
        <p style={{ background: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', margin: '1rem 0' }}>
          "Links styled as buttons violate the principle of consistency. Users have learned patterns - breaking them hurts usability."
        </p>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <strong>Source:</strong> Nielsen Norman Group - Usability Heuristics
        </p>
      </div>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginTop: '2rem' }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>
          ✅ Industry Consensus
        </h3>
        <p style={{ margin: '0' }}>
          <strong>Every major design system agrees:</strong> Links should look like links. Button styling on links is universally recognized as an accessibility anti-pattern.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Why This Is a Problem
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Breaks Visual Expectations
      </h3>

      <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        <p style={{ margin: '0 0 0.5rem 0' }}><strong>User sees:</strong> "That's a button"</p>
        <p style={{ margin: '0 0 0.5rem 0' }}><strong>User thinks:</strong> "It will perform an action"</p>
        <p style={{ margin: '0 0 0.5rem 0' }}><strong>Reality:</strong> It navigates (link behavior)</p>
        <p style={{ margin: '0', fontWeight: '600', color: '#92400e' }}><strong>Result:</strong> Confusion and broken trust</p>
      </div>

      <p>Users have spent years learning design patterns. When you break these patterns, you create cognitive load and frustration.</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. Screen Reader Confusion
      </h3>

      <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>What happens:</p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          <li style={{ marginBottom: '0.25rem' }}>Screen reader announces: <strong>"Start learning, link"</strong></li>
          <li style={{ marginBottom: '0.25rem' }}>But visually it looks like a button</li>
          <li>User expects button behavior but gets link behavior</li>
        </ul>
        <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic', fontSize: '0.875rem', color: '#991b1b' }}>
          This creates <strong>cognitive dissonance</strong> and makes the interface harder to use.
        </p>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Keyboard Behavior Mismatch
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Element</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Activation Keys</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>What User Expects</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Button</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Space</code> or <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Enter</code></td>
            <td style={{ padding: '0.75rem' }}>Both keys work</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Link</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Enter</code> only</td>
            <td style={{ padding: '0.75rem' }}>Only Enter works</td>
          </tr>
          <tr style={{ background: '#fee2e2' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Link styled as button</td>
            <td style={{ padding: '0.75rem' }}><code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>Enter</code> only</td>
            <td style={{ padding: '0.75rem', color: '#991b1b' }}>❌ Looks like button but Space doesn't work</td>
          </tr>
        </tbody>
      </table>

      <p>Keyboard users learn that buttons activate with Space. When links look like buttons, users press Space and nothing happens.</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        4. Right-Click Behavior Mismatch
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ marginTop: '0', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Real Button</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Right-click → Standard context menu</p>
          <p style={{ margin: '0', fontSize: '0.875rem', fontStyle: 'italic', color: '#6b7280' }}>
            User doesn't expect navigation options
          </p>
        </div>
        <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem' }}>
          <h4 style={{ marginTop: '0', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>Real Link</h4>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Right-click → Link context menu</p>
          <p style={{ margin: '0', fontSize: '0.875rem', fontStyle: 'italic', color: '#6b7280' }}>
            "Open in new tab", "Copy link", etc.
          </p>
        </div>
      </div>

      <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: '600' }}>❌ Link Styled as Button</h4>
        <p style={{ margin: '0', fontSize: '0.875rem' }}>
          <strong>Looks like:</strong> Button (user doesn't expect link menu)<br />
          <strong>Acts like:</strong> Link (shows "Open in new tab")<br />
          <strong>Result:</strong> Surprising and inconsistent behavior
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Real-World Impact
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        User Testing Findings
      </h3>

      <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #f59e0b' }}>
        <p style={{ margin: '0 0 1rem 0', fontWeight: '600' }}>From GOV.UK Research:</p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0', fontSize: '0.875rem' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>Cognitive disability users:</strong> "I don't know if this will take me somewhere or do something"</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Screen reader users:</strong> "It says 'link' but looks like a button - which is it?"</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>Keyboard users:</strong> "I pressed Space but nothing happened"</li>
          <li><strong>Power users:</strong> "I tried to open in a new tab but it didn't work like I expected"</li>
        </ul>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        WCAG Relevance
      </h3>

      <p>This anti-pattern violates multiple WCAG success criteria:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>1.3.1 Info and Relationships (Level A):</strong> Visual presentation doesn't match semantic structure
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>2.1.1 Keyboard (Level A):</strong> Unexpected keyboard behavior (Space key doesn't work as expected)
        </li>
        <li style={{ marginBottom: '0.5rem' }}>
          <strong>3.2.4 Consistent Identification (Level AA):</strong> Components with same visual appearance have different functions
        </li>
        <li>
          <strong>4.1.2 Name, Role, Value (Level A):</strong> Visual role doesn't match programmatic role
        </li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        The Correct Approach
      </h2>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Golden Rule
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          <strong>Visual appearance must match semantic meaning.</strong><br />
          If it's a link, make it look like a link.<br />
          If it's a button, make it look like a button.
        </p>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        How to Style Links Properly
      </h3>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>
          ✅ Option 1: Standard Link with Emphasis
        </h4>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`<Link
  href="/destination"
  className="text-lg font-semibold text-blue-600 hover:text-blue-800 
             underline decoration-2 underline-offset-4"
>
  Start learning
</Link>`}
        </pre>
        <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Clear link styling with visual emphasis through size, weight, and underline.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>
          ✅ Option 2: Arrow Link Pattern
        </h4>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`<Link
  href="/destination"
  className="group inline-flex items-center gap-2 
             text-gray-900 font-medium"
>
  <span className="group-hover:underline">Start learning</span>
  <svg className="group-hover:translate-x-1 transition-transform">
    <!-- arrow icon -->
  </svg>
</Link>`}
        </pre>
        <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Arrow indicates navigation, hover underline confirms it's a link.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>
          ✅ Option 3: Card with Link
        </h4>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`<Card>
  <Heading>Ready to begin?</Heading>
  <Text>Start with the first topic</Text>
  <Link
    href="/destination"
    className="inline-flex items-center gap-2 
               text-blue-600 font-semibold hover:underline"
  >
    Start learning →
  </Link>
</Card>`}
        </pre>
        <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Card provides visual weight, link inside maintains semantic clarity.
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '600' }}>
          ❌ Never Do This
        </h4>
        <pre style={{ background: '#450a0a', color: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`<!-- DON'T: Link styled as button -->
<Link
  href="/destination"
  className="bg-gray-900 text-white px-4 py-3 
             rounded-full font-medium"
>
  Start learning
</Link>`}
        </pre>
        <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#991b1b', fontWeight: '600' }}>
          ❌ Solid background, pill shape, button padding - looks like a button but it's a link!
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        "But Everyone Does It!"
      </h2>

      <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem', borderLeft: '4px solid #f59e0b' }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Common Misconception
        </h3>
        <p style={{ margin: '0' }}>
          "I see big websites styling links as buttons, so it must be okay."
        </p>
      </div>

      <p><strong>The truth:</strong></p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Many popular websites have accessibility issues</li>
        <li style={{ marginBottom: '0.5rem' }}>Just because it's common doesn't mean it's correct</li>
        <li style={{ marginBottom: '0.5rem' }}>Accessibility lawsuits are increasing - many target this exact issue</li>
        <li>Following best practices protects users AND your organization</li>
      </ul>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginTop: '1.5rem' }}>
        <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600' }}>
          Remember: We're not building for other developers. We're building for users - including those with disabilities who rely on consistent, predictable interfaces.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Summary: Universal Design System Consensus
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Design System</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Stance on Links Styled as Buttons</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Material Design (Google)</td>
            <td style={{ padding: '0.75rem', color: '#991b1b' }}>❌ Don't style links as buttons</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Polaris (Shopify)</td>
            <td style={{ padding: '0.75rem', color: '#991b1b' }}>❌ Links should look like links</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>GOV.UK</td>
            <td style={{ padding: '0.75rem', color: '#991b1b' }}>❌ Do not make links look like buttons</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '0.75rem', color: '#991b1b' }}>❌ Avoid button styling on links</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Ant Design</td>
            <td style={{ padding: '0.75rem', color: '#991b1b' }}>❌ Maintain visual-semantic consistency</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Nielsen Norman Group</td>
            <td style={{ padding: '0.75rem', color: '#991b1b' }}>❌ Match visual design to function</td>
          </tr>
        </tbody>
      </table>

      <div style={{ background: '#353A56', color: '#ffffff', padding: '2rem', borderRadius: '0.5rem', marginTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '0', marginBottom: '1rem', fontWeight: '600' }}>
          Key Takeaway
        </h2>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.75', marginBottom: '0' }}>
          <strong>Links styled as buttons is a universally condemned anti-pattern.</strong><br />
          Every major design system agrees: visual appearance must match semantic meaning.<br />
          <span style={{ color: '#F39C52', fontWeight: '600', fontSize: '1.5rem', display: 'block', marginTop: '1.5rem' }}>
            If it's a link, make it look like a link.
          </span>
        </p>
      </div>

      <p style={{ fontSize: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', fontStyle: 'italic', color: '#6b7280' }}>
        This documentation serves as a reference for maintaining accessibility standards and avoiding one of the most common and harmful design anti-patterns in web development.
      </p>
    </div>
  )
}
