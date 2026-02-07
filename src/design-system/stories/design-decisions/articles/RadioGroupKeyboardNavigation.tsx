export function RadioGroupKeyboardNavigationArticle() {
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
        Radio group keyboard navigation: The roving tabIndex pattern
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        When presenting mutually exclusive options (like answer choices in a quiz), keyboard navigation must follow the WAI-ARIA radio group pattern. This article explains why we implemented roving tabIndex for our RadioCard component, what problem it solves, and how it aligns with established design systems and WCAG guidelines.
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
        Our test view presents four answer options as selectable cards. Initially, each card was an independent <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;button&gt;</code> element. This meant a keyboard user had to press <strong>Tab</strong> through every single card just to reach the "Submit Answer" button.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        For a test with 80 questions and 4 options each, that's potentially <strong>3 extra Tab presses per question</strong> — 240 unnecessary keystrokes across a full mock exam. This creates significant friction for keyboard-only users, users with motor impairments, and screen reader users.
      </p>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '2rem'
      }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          <strong>Before:</strong> Tab &rarr; Card 1 &rarr; Tab &rarr; Card 2 &rarr; Tab &rarr; Card 3 &rarr; Tab &rarr; Card 4 &rarr; Tab &rarr; Submit Button
          <br /><br />
          That's <strong>5 Tab presses</strong> to reach Submit after entering the options area.
        </p>
      </div>

      <div style={{ 
        background: '#dcfce7', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #86efac',
        marginBottom: '2rem'
      }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          <strong>After:</strong> Tab &rarr; Radio Group (selected card) &rarr; Arrow keys to browse &rarr; Tab &rarr; Submit Button
          <br /><br />
          That's <strong>2 Tab presses</strong> to reach Submit, regardless of how many options exist.
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
        The solution: Roving tabIndex
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The <strong>roving tabIndex</strong> technique is the standard way to manage focus within a composite widget like a radio group. Instead of every item being independently tabbable, only one item in the group participates in the Tab order at a time. Arrow keys move focus (and selection) between items within the group.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        How it works
      </h3>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Key</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '75%' }}>Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Tab</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Moves focus <strong>into</strong> the radio group (onto the selected item). Pressing Tab again moves focus <strong>out</strong> of the group to the next focusable element (e.g. Submit button).
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>&darr; / &rarr;</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Moves focus and selection to the <strong>next</strong> option. Wraps from last to first.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>&uarr; / &larr;</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Moves focus and selection to the <strong>previous</strong> option. Wraps from first to last.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Space / Enter</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Selects the currently focused option (if not already selected).
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Shift+Tab</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Moves focus back to the previous focusable element before the radio group.
            </td>
          </tr>
        </tbody>
      </table>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Our progressive enhancement
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We added a small but important refinement to the standard pattern:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>State</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Tab behavior</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>No answer selected</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              All cards have <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex=0</code> — Tab moves between them.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Allows first-time browsing of options before committing. Users can read each option via Tab without being forced to select.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Answer selected</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Only selected card has <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex=0</code> — Tab jumps out to Submit.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Once a choice is made, the user's intent is to submit. Roving tabIndex kicks in for efficient navigation.
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
        WCAG and ARIA compliance
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        This implementation satisfies several WCAG success criteria and follows the ARIA Authoring Practices Guide.
      </p>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1e40af' }}>
          WCAG 2.1.1 — Keyboard (Level A)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          "All functionality of the content is operable through a keyboard interface." Our radio group ensures all answer options are reachable and selectable via keyboard alone, using both Tab and arrow keys.
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
          WCAG 2.1.2 — No Keyboard Trap (Level A)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          "If keyboard focus can be moved to a component, then focus can be moved away from that component using only a keyboard interface." Tab always moves focus out of the radio group — there is no trap.
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
          WAI-ARIA Authoring Practices — Radio Group Pattern
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          The W3C's <strong>ARIA Authoring Practices Guide (APG)</strong> defines the Radio Group pattern at <code style={{ background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/ARIA/apg/patterns/radio/</code>. Our implementation follows this pattern exactly: <code style={{ background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>role="radiogroup"</code> on the container, <code style={{ background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>role="radio"</code> on each option, <code style={{ background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>aria-checked</code> for selection state, and arrow key navigation with wrap-around.
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
        How established design systems handle this
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Our approach is consistent with how major design systems implement radio groups:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Design System</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '75%' }}>Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Radix UI</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Uses roving tabIndex with arrow key navigation in their <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>RadioGroup</code> primitive. Tab enters/exits the group; arrows move between items. This is what shadcn/ui's RadioGroup is built on.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Adobe React Spectrum</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Implements the full ARIA radio group pattern with roving tabIndex, arrow key selection with wrap-around, and <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>useRadioGroup</code> hook that manages focus and selection state.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material UI (MUI)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Their <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>RadioGroup</code> component uses native radio inputs which inherently follow the roving tabIndex pattern in browsers. Arrow keys move between options; Tab exits the group.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK Design System</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              The UK Government's design system uses native radio inputs grouped with <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>fieldset</code> and <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>legend</code>. They follow the same keyboard interaction model as ARIA radio groups, prioritising accessibility over visual customisation.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              IBM's Carbon design system implements radio groups with roving tabIndex and documents the keyboard interaction pattern explicitly: "Use arrow keys to navigate between radio options. Tab moves to the next component."
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
        1. ARIA roles and attributes
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The container uses <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>role="radiogroup"</code> with an <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>aria-label</code>. Each card uses <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>role="radio"</code> with <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>aria-checked</code>.
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
{`<div role="radiogroup" aria-label="Answer options" onKeyDown={handleKeyDown}>
  <RadioCard role="radio" aria-checked={isSelected} tabIndex={getTabIndex(index)}>
    Option A
  </RadioCard>
  <RadioCard role="radio" aria-checked={isSelected} tabIndex={getTabIndex(index)}>
    Option B
  </RadioCard>
  ...
</div>`}
      </pre>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        2. Roving tabIndex logic
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>getTabIndex</code> function controls which cards participate in the Tab order:
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
{`const getTabIndex = (index: number): number => {
  // No selection yet: all cards tabbable for browsing
  if (!hasSelection) return 0
  // After selection: only selected card is tabbable
  return index === selectedAnswer ? 0 : -1
}`}
      </pre>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        3. Arrow key handler with wrap-around
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>onKeyDown</code> handler on the radiogroup container intercepts arrow keys, calculates the new index with modulo wrap-around, selects the option, and moves DOM focus:
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
{`const handleRadioGroupKeyDown = (e: React.KeyboardEvent) => {
  const count = question.options.length

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault()
    const next = (currentIndex + 1) % count  // Wraps last → first
    onSelectAnswer(next)
    cardRefs.current[next]?.focus()
  }

  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault()
    const prev = (currentIndex - 1 + count) % count  // Wraps first → last
    onSelectAnswer(prev)
    cardRefs.current[prev]?.focus()
  }
}`}
      </pre>

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

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        Verify the following keyboard interactions when testing answer selection:
      </p>

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
            <strong>Tab into group (no selection):</strong> Focus lands on first card. Subsequent Tabs move through all cards.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Arrow Down/Right:</strong> Moves focus and selection to the next card.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Arrow Up/Left:</strong> Moves focus and selection to the previous card.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Wrap-around:</strong> Arrow Down on last card moves to first. Arrow Up on first moves to last.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Tab out (after selection):</strong> Focus jumps directly to Submit Answer button, skipping remaining cards.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Shift+Tab:</strong> Moves focus back into the radio group from the Submit button.
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Mouse still works:</strong> Clicking any card selects it as before.
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
          <strong>W3C ARIA Authoring Practices Guide — Radio Group Pattern:</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/ARIA/apg/patterns/radio/</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>WCAG 2.1.1 — Keyboard (Level A):</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/WCAG21/Understanding/keyboard.html</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>WCAG 2.1.2 — No Keyboard Trap (Level A):</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Radix UI — RadioGroup:</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>radix-ui.com/primitives/docs/components/radio-group</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Adobe React Spectrum — useRadioGroup:</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>react-spectrum.adobe.com/react-aria/useRadioGroup.html</code>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>IBM Carbon — RadioButton:</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>carbondesignsystem.com/components/radio-button/accessibility</code>
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>GOV.UK Design System — Radios:</strong>{' '}
          <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>design-system.service.gov.uk/components/radios/</code>
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
          Radio groups must use roving tabIndex so Tab enters/exits the group as a single stop.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Arrow keys move focus and selection between options, with wrap-around at boundaries.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Before any selection is made, all options remain tabbable to allow initial browsing.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          This pattern is required by WCAG 2.1.1, aligns with WCAG 2.1.2, and is documented in the W3C ARIA APG.
        </li>
        <li style={{ marginBottom: '0' }}>
          Every major design system (Radix, MUI, Adobe Spectrum, Carbon, GOV.UK) implements this exact pattern.
        </li>
      </ul>
    </div>
  )
}
