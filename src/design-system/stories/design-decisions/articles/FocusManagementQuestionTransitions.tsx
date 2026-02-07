export function FocusManagementQuestionTransitionsArticle() {
  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '3rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      color: '#1f2937'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '1rem', 
        fontWeight: '700',
        color: '#111827'
      }}>
        Focus management in multi-step question flows
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        When a user submits an answer and the next question loads, where should keyboard focus go? Getting this wrong creates confusion for keyboard users and silence for screen reader users. This article documents why we programmatically move focus to the question heading after each transition, and how this aligns with WCAG guidelines and established patterns.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The problem
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        In our test view, when a user submits an answer, the following happens:
      </p>

      <ol style={{ fontSize: '1.125rem', lineHeight: '1.75', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>The current question fades out (opacity transition).</li>
        <li style={{ marginBottom: '0.5rem' }}>React state updates: new question loads, selected answer resets to <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>null</code>.</li>
        <li style={{ marginBottom: '0.5rem' }}>The new question fades in.</li>
      </ol>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        <strong>Without focus management</strong>, the browser's focus is left on the Submit button — which is now disabled (because no answer is selected for the new question). Disabled elements are removed from the Tab order, so focus falls to the document body. When the user presses Tab, the browser finds the next tabbable element in DOM order, which could be an unexpected target like the Skip button.
      </p>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#991b1b' }}>
          What happens without focus management
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          Submit &rarr; new question renders &rarr; focus is on body/nowhere &rarr; Tab &rarr; <strong>Skip button</strong> (unexpected!)
          <br /><br />
          A screen reader user hears nothing about the new question. A keyboard user has no idea where they are on the page.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The options we considered
      </h2>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Option</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Behavior</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Trade-offs</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>
              A. Focus the question heading <span style={{ color: '#16a34a' }}>&#10003;</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Focus moves to the <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;h2&gt;</code> question text. Screen reader announces the question. Tab goes to first answer card.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Best for screen readers. One Tab press to reach answers. Follows GOV.UK multi-step form pattern. <strong>We chose this.</strong>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>B. Focus the first answer card</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Focus jumps directly to the first RadioCard. User can immediately start selecting.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Saves one keypress, but screen reader users may miss the question text entirely. Not ideal for comprehension.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>C. Focus the back arrow</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Focus goes to the top-left End Test button. User Tabs through the full page to reach answers.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Most keystrokes required. Only useful if the user wants to exit, which is rare mid-test.
            </td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why we chose Option A
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Focusing the question heading provides the best balance of accessibility and efficiency:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Benefit</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '75%' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Screen reader announcement</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              When focus moves to the heading, the screen reader automatically reads the question text aloud. The user knows exactly what they're answering without any extra interaction.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Minimal keystrokes</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              One Tab press reaches the first answer card. Combined with our radio group arrow key navigation, the full flow is: hear question &rarr; Tab &rarr; arrows to pick &rarr; Tab &rarr; Submit.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Spatial orientation</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Focus at the top of the content area gives the user a clear sense of "starting fresh" with a new question. This mirrors the visual experience of seeing the new question appear.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>No visible focus ring</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              The heading uses <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex={'{-1}'}</code> and <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>outline: none</code>, so sighted users see no visual change. The focus is purely for assistive technology and keyboard navigation.
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        background: '#dcfce7', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #86efac',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#166534' }}>
          The complete keyboard flow after this fix
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          Submit answer &rarr; question fades &rarr; <strong>new heading receives focus</strong> (screen reader announces question) &rarr; Tab &rarr; first answer card &rarr; arrow keys to pick &rarr; Tab &rarr; Submit &rarr; repeat
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        WCAG compliance
      </h2>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1e40af' }}>
          WCAG 2.4.3 — Focus Order (Level A)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          "If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability." By focusing the question heading, we ensure the focus order matches the logical reading order: question &rarr; answers &rarr; submit.
        </p>
      </div>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1e40af' }}>
          WCAG 3.2.1 — On Focus (Level A)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          "When any user interface component receives focus, it does not initiate a change of context." Our focus move to the heading does not trigger any action or navigation — it simply positions the user's reading point at the new content.
        </p>
      </div>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1e40af' }}>
          WCAG 4.1.3 — Status Messages (Level AA)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          By moving focus to the new question heading, we ensure that the content change is communicated to assistive technology without requiring the user to manually search for it. This is a programmatic focus move rather than a live region, but serves the same purpose of ensuring content changes are perceived.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        How other platforms handle this
      </h2>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Platform</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '75%' }}>Focus behavior on step transition</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK multi-step forms</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Focus moves to the page heading or the question text when advancing between steps. This is the UK Government's established pattern for accessible multi-page forms, documented in the GOV.UK Design System.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Google Forms</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              On multi-page forms, focus moves to the top of the new section when "Next" is clicked. The new section heading is announced by screen readers.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Typeform</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Each question is a full-screen step. On transition, focus moves to the new question's content area so the user can immediately interact with it.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Duolingo</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              After checking an answer, focus management moves the user to the next interactive element. The question prompt area receives initial focus so the user understands the new task.
            </td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Implementation details
      </h2>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        1. Make the heading programmatically focusable
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;h2&gt;</code> element is not natively focusable. We add <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>tabIndex={'{-1}'}</code> to make it focusable via JavaScript without including it in the Tab order. We also apply <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>outline: none</code> to prevent a visible focus ring, since this focus is purely for assistive technology.
      </p>

      <pre style={{ 
        background: '#1f2937', 
        color: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        overflow: 'auto',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        marginBottom: '2rem'
      }}>
{`<Heading
  as="h2"
  ref={questionHeadingRef}
  tabIndex={-1}
  className="outline-none"
>
  {currentQuestion.question}
</Heading>`}
      </pre>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        2. Move focus after the transition
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        After the state updates that load the new question, we use a <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>setTimeout(fn, 0)</code> to schedule the focus call after React has committed the new DOM. This ensures the heading element contains the new question text before we focus it.
      </p>

      <pre style={{ 
        background: '#1f2937', 
        color: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        overflow: 'auto',
        fontSize: '0.875rem',
        lineHeight: '1.5',
        marginBottom: '2rem'
      }}>
{`// Inside the question transition callback
setQuestionQueue(newQueue)
setSelectedAnswer(null)
setIsTransitioning(false)

// Focus the heading after React re-renders with the new question
setTimeout(() => {
  questionHeadingRef.current?.focus()
}, 0)`}
      </pre>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '1.25rem' }}>tabIndex={'{-1}'}</code> and not <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '1.25rem' }}>tabIndex={'{0}'}</code>
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Using <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex={'{-1}'}</code> means:
      </p>

      <ul style={{ fontSize: '1.125rem', lineHeight: '1.75', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>The heading <strong>can</strong> receive focus via <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>.focus()</code> in JavaScript.</li>
        <li style={{ marginBottom: '0.5rem' }}>The heading <strong>will not</strong> appear in the Tab order — users cannot Tab to it manually.</li>
        <li style={{ marginBottom: '0' }}>This prevents the heading from becoming an extra Tab stop that clutters the navigation for keyboard users. It only receives focus programmatically at the exact moment it's needed.</li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Testing checklist
      </h2>

      <div style={{ 
        background: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <ul style={{ 
          listStyle: 'none',
          marginLeft: '0',
          paddingLeft: '0',
          fontSize: '1.125rem',
          lineHeight: '1.75'
        }}>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Submit answer:</strong> After submitting, does focus move to the new question heading?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Tab after transition:</strong> Does pressing Tab move focus to the first answer card?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Screen reader:</strong> Does the screen reader announce the new question text on transition?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>No visible focus ring:</strong> Is the heading focus invisible to sighted users?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Heading not in Tab order:</strong> Can you Tab past the heading without it becoming a stop?
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Mouse unaffected:</strong> Does clicking Submit still work normally for mouse users?
          </li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        References
      </h2>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>WCAG 2.4.3 — Focus Order (Level A):</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/WCAG21/Understanding/focus-order.html</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>WCAG 3.2.1 — On Focus (Level A):</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/WCAG21/Understanding/on-focus.html</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>WCAG 4.1.3 — Status Messages (Level AA):</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/WCAG21/Understanding/status-messages.html</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>GOV.UK Design System — Multi-page forms:</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>design-system.service.gov.uk/patterns/question-pages/</code>
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>W3C WAI — Managing Focus in Composites:</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/ARIA/apg/practices/keyboard-interface/</code>
        </li>
      </ul>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Summary
      </h2>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          When dynamic content replaces the current view, focus must be actively managed — the browser will not do this for you.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Focusing the question heading gives screen readers immediate context and places keyboard users one Tab away from the answers.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Use <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex={'{-1}'}</code> for elements that should only receive programmatic focus, keeping them out of the manual Tab order.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Schedule focus moves with <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>setTimeout(fn, 0)</code> to ensure the DOM has updated before focusing.
        </li>
        <li style={{ marginBottom: '0' }}>
          This pattern is used by GOV.UK, Google Forms, Typeform, and Duolingo for multi-step question flows.
        </li>
      </ul>
    </div>
  )
}
