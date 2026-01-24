import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Architecture/Buttons vs Links - Start Learning',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const StartLearningCase: Story = {
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
        Case Study: Start Learning Button
      </h1>
      
      <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        Analyzing why action-oriented language doesn't always mean you need a button.
      </div>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        The Scenario
      </h2>

      <p>On domain overview pages (e.g., "Disabilities, Challenges & Assistive Technologies"), we have a "Start learning" button that:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Navigates to <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>/[domain-path]/[first-topic-id]</code></li>
        <li style={{ marginBottom: '0.5rem' }}>Changes the URL</li>
        <li style={{ marginBottom: '0.5rem' }}>Takes user to the first topic in the domain</li>
        <li style={{ marginBottom: '0.5rem' }}>Uses action-oriented language ("Start")</li>
        <li>Opens regular educational content page</li>
      </ul>

      <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid #f59e0b', marginBottom: '2rem' }}>
        <strong>The Question:</strong> The label says "Start learning" (sounds like an action) - should this be a <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> or a <code style={{ background: '#fff', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> (link)?
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Our Decision: Link ✅
      </h2>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Despite the action-oriented language, this is a Link
        </h3>
        <p style={{ marginBottom: '0' }}>
          The label <strong>"Start learning"</strong> is UX framing, but the technical reality is pure navigation to educational content.
        </p>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Pure Navigation - No State Initialization
      </h3>

      <p>Unlike our Quick test button, "Start learning" doesn't initialize any process:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>What it does NOT do:</p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '0', fontSize: '0.875rem' }}>
            <li>Start a timer</li>
            <li>Select random questions</li>
            <li>Create a session</li>
            <li>Initialize special state</li>
            <li>Track progress</li>
          </ul>
        </div>
        <div style={{ background: '#dcfce7', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #86efac' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>What it DOES do:</p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '0', fontSize: '0.875rem' }}>
            <li>Navigate to URL</li>
            <li>Render topic content</li>
            <li>Display educational material</li>
            <li>That's it!</li>
          </ul>
        </div>
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. The "Journey" Is Conceptual, Not Technical
      </h3>

      <p>"Start learning" implies beginning a journey, but:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>The journey is just a <strong>mental framing</strong> for the user</li>
        <li style={{ marginBottom: '0.5rem' }}>Technically, it's identical to clicking any topic link</li>
        <li style={{ marginBottom: '0.5rem' }}>No "learning mode" is activated</li>
        <li>The first topic page is regular content, not a special experience</li>
      </ul>

      <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1.5rem' }}>
        <strong>Key Insight:</strong> Just because the UX uses motivational language doesn't mean the technical semantics change. The button is still just navigation.
      </div>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Users Benefit from Link Features
      </h3>

      <p>Since this leads to educational content, browser features are useful:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>✅ Right-click "Open in new tab" (useful for comparing topics)</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Cmd/Ctrl+Click to open in background</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ See URL on hover (topic path is meaningful)</li>
        <li style={{ marginBottom: '0.5rem' }}>✅ Bookmark the first topic</li>
        <li>✅ Search engines can crawl to discover content</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        4. Semantic Clarity
      </h3>

      <p>What's the user really doing?</p>

      <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <strong>User thinks:</strong> "I'm going to the first topic to start reading"<br />
        <strong>Not:</strong> "I'm initiating a special learning session"
      </div>

      <p>The primary semantic is <strong>accessing content</strong>, not <strong>starting a process</strong>.</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Comparison: Start Learning vs Quick Test
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.875rem' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Aspect</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Start Learning (Link)</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Quick Test (Button)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Primary action</td>
            <td style={{ padding: '0.75rem' }}>Access first topic</td>
            <td style={{ padding: '0.75rem' }}>Initiate test session</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>State change?</td>
            <td style={{ padding: '0.75rem' }}>❌ No (just renders page)</td>
            <td style={{ padding: '0.75rem' }}>✅ Yes (timer, questions, session)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>User intent</td>
            <td style={{ padding: '0.75rem' }}>"Read first topic"</td>
            <td style={{ padding: '0.75rem' }}>"Take a test"</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Browser features</td>
            <td style={{ padding: '0.75rem' }}>✅ Useful (open in tab, bookmark)</td>
            <td style={{ padding: '0.75rem' }}>⚠️ Less important (test session)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>SEO value</td>
            <td style={{ padding: '0.75rem' }}>✅ Want crawlable content</td>
            <td style={{ padding: '0.75rem' }}>⚠️ Less critical (test URLs)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Label type</td>
            <td style={{ padding: '0.75rem' }}>Action metaphor</td>
            <td style={{ padding: '0.75rem' }}>Literal action</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem', fontWeight: '600' }}>Correct element</td>
            <td style={{ padding: '0.75rem', background: '#dcfce7' }}><code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;a&gt;</code> Link</td>
            <td style={{ padding: '0.75rem', background: '#dcfce7' }}><code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>&lt;button&gt;</code> Button</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Why "Start" Doesn't Always Mean Button
      </h2>

      <p>Action-oriented language in labels doesn't automatically mean you need a button. Consider these examples:</p>

      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>Examples of Action Verbs with Links:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>"Explore collection"</strong> → Link to collection page</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>"Browse catalog"</strong> → Link to catalog</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>"Discover features"</strong> → Link to features page</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>"View gallery"</strong> → Link to gallery</li>
          <li><strong>"Start learning"</strong> → Link to first topic</li>
        </ul>
        <p style={{ marginTop: '1rem', marginBottom: '0', fontStyle: 'italic', color: '#6b7280' }}>
          These all use action verbs but are navigation links because they lead to content, not initiate processes.
        </p>
      </div>

      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>When "Start" Means Button:</h4>
        <ul style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
          <li style={{ marginBottom: '0.5rem' }}><strong>"Start timer"</strong> → Button (initiates countdown)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>"Start quiz"</strong> → Button (creates quiz session)</li>
          <li style={{ marginBottom: '0.5rem' }}><strong>"Start upload"</strong> → Button (begins upload process)</li>
          <li><strong>"Start recording"</strong> → Button (activates recording)</li>
        </ul>
        <p style={{ marginTop: '1rem', marginBottom: '0', fontStyle: 'italic', color: '#6b7280' }}>
          These initiate actual processes with state changes, making button semantics appropriate.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        When Would "Start Learning" Be a Button?
      </h2>

      <p>If we implemented any of these features, button semantics might be justified:</p>

      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}><strong>Learning mode initialization</strong> - Special UI state for focused learning</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Progress tracking starts</strong> - System begins tracking user through curriculum</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Personalization kicks in</strong> - AI selects topics based on user level</li>
        <li style={{ marginBottom: '0.5rem' }}><strong>Session creation</strong> - Time-boxed learning session with goals</li>
        <li>Any other <strong>actual process initialization</strong> beyond navigation</li>
      </ul>

      <div style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', borderLeft: '4px solid #ef4444', marginBottom: '1.5rem' }}>
        <strong>But we don't do any of that.</strong> We simply navigate to a regular topic page. Therefore: Link.
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Alternative Label Considerations
      </h2>

      <p>If we wanted to make the navigation intent even clearer, we could change the label:</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #7dd3fc' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>Current (Action-oriented):</p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '0', fontSize: '0.875rem' }}>
            <li>"Start learning"</li>
          </ul>
          <p style={{ marginTop: '0.75rem', marginBottom: '0', fontSize: '0.875rem', fontStyle: 'italic', color: '#6b7280' }}>
            ✅ Motivational, engaging<br />
            ⚠️ Slightly ambiguous semantic
          </p>
        </div>
        <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #7dd3fc' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600' }}>Alternatives (Navigation-clear):</p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '0', fontSize: '0.875rem' }}>
            <li>"View first topic"</li>
            <li>"Go to first lesson"</li>
            <li>"Begin with [Topic Name]"</li>
          </ul>
          <p style={{ marginTop: '0.75rem', marginBottom: '0', fontSize: '0.875rem', fontStyle: 'italic', color: '#6b7280' }}>
            ✅ Crystal clear navigation<br />
            ⚠️ Less engaging/motivational
          </p>
        </div>
      </div>

      <p>We chose to keep "Start learning" for better UX, accepting the slight ambiguity because the implementation is semantically correct (Link).</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Decision Framework
      </h2>

      <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #7dd3fc' }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Ask: What's Actually Happening?
        </h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Ignore the label. Look at the code:</p>
          <ol style={{ marginLeft: '1.5rem', marginBottom: '0' }}>
            <li style={{ marginBottom: '0.5rem' }}>Does it initialize state/process? → <strong>Button</strong></li>
            <li style={{ marginBottom: '0.5rem' }}>Does it just navigate to content? → <strong>Link</strong></li>
          </ol>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '0.375rem' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Remember:</p>
          <p style={{ margin: '0', fontStyle: 'italic' }}>
            <strong>Label language is UX framing.</strong><br />
            <strong>Technical behavior determines semantics.</strong><br />
            <strong>Choose element based on what actually happens, not how it's described.</strong>
          </p>
        </div>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Key Takeaway
      </h2>

      <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #86efac', marginTop: '1.5rem' }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.8', margin: '0' }}>
          <strong>Don't let action-oriented labels fool you.</strong> If all you're doing is navigating to content, use a link—even if the label says "Start" or uses action verbs. The semantic correctness is determined by <strong>technical behavior</strong>, not <strong>marketing language</strong>.
        </p>
      </div>

      <p style={{ fontSize: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', fontStyle: 'italic', color: '#6b7280' }}>
        This case study demonstrates how similar-sounding labels ("Start learning" vs "Quick test") can require different HTML elements based on what's technically happening under the hood.
      </p>
    </div>
  )
}
