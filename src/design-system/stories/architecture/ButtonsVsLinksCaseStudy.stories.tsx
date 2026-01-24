import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Architecture/Buttons vs Links - Case Study',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const QuickTestButton: Story = {
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
        Case Study: Quick Test Button
      </h1>
      
      <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        A practical example from this application exploring the gray area between buttons and links.
      </div>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        The Scenario
      </h2>

      <p>On topic detail pages (e.g., "Theoretical Models of Disability"), we have a "Quick test" button that:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Navigates to <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>/test/topic-quick/[topicId]</code></li>
        <li style={{ marginBottom: '0.5rem' }}>Changes the URL</li>
        <li style={{ marginBottom: '0.5rem' }}>Tracks analytics ("Topic Test Button Clicked")</li>
        <li style={{ marginBottom: '0.5rem' }}>Passes navigation state</li>
        <li>Initiates a test session with 10 random questions</li>
      </ul>

      <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b', marginBottom: '2rem' }}>
        <strong>The Question:</strong> Should this be a <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> or a <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> (link)?
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Arguments for Button ✅ (Our Choice)
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Semantic Intent
      </h3>

      <p>The user's mental model is <strong>"I'm starting a test"</strong>, not <strong>"I'm viewing a test page"</strong>.</p>

      <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem', marginBottom: '1rem' }}>
        <strong>User thinks:</strong> "I'm clicking to START a test"<br />
        <strong>Not:</strong> "I'm clicking to VIEW the test page"
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. It's an Action, Not Just Navigation
      </h3>

      <p>The button doesn't just navigate - it <strong>initiates a test session</strong>:</p>

      <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>State initialization</strong> - Starts timer, sets up test state</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Question selection</strong> - Randomly selects 10 questions</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Session creation</strong> - Creates a new test attempt</li>
        <li><strong>Context passing</strong> - Passes origin route for return navigation</li>
      </ol>

      <p><strong>The navigation is a side effect</strong>, not the primary purpose.</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Industry Patterns
      </h3>

      <p>Similar patterns from major platforms:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>Duolingo:</strong> "Start Lesson" button → navigates to lesson page</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Khan Academy:</strong> "Practice" button → navigates to practice page</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Coursera:</strong> "Begin Quiz" button → navigates to quiz page</li>
      </ul>

      <p>All navigate but are <strong>conceptually actions</strong> that happen to change pages.</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        4. Label Semantics
      </h3>

      <p>"Quick test" reads as an <strong>action verb phrase</strong>, similar to:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li>"Take quiz"</li>
        <li>"Start challenge"</li>
        <li>"Begin assessment"</li>
        <li>"Launch simulator"</li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Arguments for Link ⚠️
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. It Changes the URL
      </h3>

      <p>From our architecture guidelines:</p>

      <blockquote style={{ borderLeft: '4px solid #e5e7eb', paddingLeft: '1rem', fontStyle: 'italic', color: '#6b7280', margin: '1rem 0' }}>
        Use &lt;a&gt; for navigation that takes users to a different location
      </blockquote>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. Browser Features Don't Work
      </h3>

      <p>Problems with using button for navigation:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>❌ Can't right-click "Open in new tab"</li>
        <li style={{ marginBottom: '0.5rem' }}>❌ Can't Cmd/Ctrl+Click to open in background</li>
        <li style={{ marginBottom: '0.5rem' }}>❌ URL doesn't show on hover</li>
        <li>❌ Screen reader announces "button" but behavior is navigation</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Alternative Implementation
      </h3>

      <p>Could be implemented as a link:</p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`<Link href={\`/test/topic-quick/\${topicId}\`}>
  Quick test
</Link>`}
      </pre>

      <p style={{ marginTop: '1rem' }}>The test initialization could happen on page load instead of button click.</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        The Decision Framework
      </h2>

      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>Use Button When:</h4>
        <p style={{ marginBottom: '0.5rem' }}>Primary purpose is to <strong>initiate an experience or process</strong></p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>"Start test"</li>
          <li>"Begin exam"</li>
          <li>"Take quiz"</li>
          <li>"Launch simulator"</li>
        </ul>
        <p style={{ marginTop: '0.75rem', marginBottom: '0', fontStyle: 'italic', color: '#6b7280' }}>
          Even if navigation happens as a side effect.
        </p>
      </div>

      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>Use Link When:</h4>
        <p style={{ marginBottom: '0.5rem' }}>Primary purpose is to <strong>access information or content</strong></p>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li>"View test results"</li>
          <li>"See test history"</li>
          <li>"Read exam guide"</li>
          <li>"Browse questions"</li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        WCAG Guidance on This
      </h2>

      <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #93c5fd' }}>
        <p style={{ margin: '0 0 0.75rem 0' }}>
          <strong>From WCAG and ARIA Authoring Practices:</strong>
        </p>
        <blockquote style={{ margin: '0', fontStyle: 'italic', borderLeft: '4px solid #3b82f6', paddingLeft: '1rem' }}>
          "Buttons that navigate aren't inherently wrong if the primary semantic is an action that happens to include navigation as an implementation detail."
        </blockquote>
      </div>

      <p style={{ marginTop: '1.5rem' }}>The key question is: <strong>What's the user's intent?</strong></p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Our Decision
      </h2>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac' }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>
          ✅ We use a Button
        </h3>
        <p style={{ marginBottom: '1rem' }}>
          The "Quick test" button initiates a test-taking experience. The fact that it navigates to a different page is an implementation detail, not the primary semantic meaning.
        </p>
        <p style={{ marginBottom: '0', fontWeight: '600' }}>
          The action semantics take priority over the navigation side effect.
        </p>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Trade-offs We Accept
      </h3>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Users can't right-click to open in new tab (acceptable for test sessions)</li>
        <li style={{ marginBottom: '0.5rem' }}>URL doesn't preview on hover (test URL is not meaningful anyway)</li>
        <li>Better analytics tracking of intentional test starts vs page loads</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Alternative Considered
      </h3>

      <p>We could refactor to use links and initialize tests on page load, but this would:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Reduce ability to track intentional test starts</li>
        <li style={{ marginBottom: '0.5rem' }}>Make analytics less accurate (page loads vs test starts)</li>
        <li>Compromise the semantic clarity of "starting" an experience</li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Key Takeaway
      </h2>

      <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #7dd3fc', marginTop: '1.5rem' }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', margin: '0' }}>
          <strong>The button vs link decision isn't always black and white.</strong> When an interaction initiates an experience or process (even if it involves navigation), a button can be the semantically correct choice. Focus on the <strong>user's intent</strong> and the <strong>primary purpose</strong> of the interaction.
        </p>
      </div>

      <p style={{ fontSize: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', fontStyle: 'italic', color: '#6b7280' }}>
        This case study documents a real architectural decision in this application, including the reasoning, trade-offs, and industry context that informed our choice.
      </p>
    </div>
  )
}
