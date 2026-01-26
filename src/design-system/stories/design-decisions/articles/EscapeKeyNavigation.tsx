export function EscapeKeyNavigationArticle() {
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
        Escape key navigation: Closing UI elements
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        The Escape key (Esc) is the universal "cancel" action for keyboard users. Just as mouse users click outside a box to close it, keyboard users rely on the Escape key to dismiss overlays and stop in-progress actions. This guide explains why this interaction is a "must-have" for accessibility and how to build it correctly.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why the Escape key matters
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Using the Escape key makes your interface faster and more inclusive. It is a core part of creating a "source of truth" for how users interact with our system.
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
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Speed</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Users can close an item with one keypress instead of Tabbing through many buttons.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Safety</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              It prevents "keyboard traps" where a user gets stuck inside a popup with no way out.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Familiarity</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              It matches how Windows and macOS work, meeting the user's natural expectations.
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
        Preventing keyboard traps
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        A <strong>keyboard trap</strong> happens when a user can move their focus into an element (like a mobile sidebar) but cannot move it out using only their keyboard. This is a critical failure of accessibility. The Escape key provides a mandatory emergency exit for these users.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        WCAG requirements
      </h3>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          To meet official accessibility standards (<strong>WCAG 2.1.2 - No Keyboard Trap</strong>), you must ensure that if a user can open a component with a keyboard, they can also close it with a keyboard. The Escape key is the industry-standard way to satisfy this rule.
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
        Where to use Escape navigation
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Use this table to determine which UI patterns in our system require Escape key support.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>UI Pattern</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '50%' }}>Escape Behavior</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Modal Dialogs</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Closes the modal and returns focus to the trigger.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#16a34a', fontWeight: '600' }}>✅ Critical</span>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Mobile Sidebars</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Closes the sidebar to reveal the main content.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#16a34a', fontWeight: '600' }}>✅ Critical</span>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Dropdown Menus</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Closes the list and keeps focus on the menu button.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#16a34a', fontWeight: '600' }}>✅ Critical</span>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Fullscreen Mode</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Exits the fullscreen view.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#16a34a', fontWeight: '600' }}>✅ Critical</span>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Search Overlays</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Closes the search bar and clears the text input.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#f59e0b', fontWeight: '600' }}>⚠️ Important</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Tooltips</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Dismisses the floating text box.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#f59e0b', fontWeight: '600' }}>⚠️ Important</span>
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
        Best practices: Do's and don'ts
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Follow these simple rules to ensure your implementation feels professional and helpful.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: '#dcfce7', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          border: '2px solid #86efac'
        }}>
          <h3 style={{ 
            marginTop: '0', 
            marginBottom: '1rem',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#166534'
          }}>
            Do ✅
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>Do return focus to the button that opened the overlay.</li>
            <li style={{ marginBottom: '0.75rem' }}>Do close only the top-most layer if multiple popups are open.</li>
            <li style={{ marginBottom: '0.75rem' }}>Do ask for confirmation if the user has unsaved form data.</li>
            <li>Do remove the "event listener" when the component is hidden.</li>
          </ul>
        </div>

        <div style={{ 
          background: '#fee2e2', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          border: '2px solid #fca5a5'
        }}>
          <h3 style={{ 
            marginTop: '0', 
            marginBottom: '1rem',
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#991b1b'
          }}>
            Don't ❌
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>Don't leave the user's focus "lost" in the background.</li>
            <li style={{ marginBottom: '0.75rem' }}>Don't close every single open window at once.</li>
            <li style={{ marginBottom: '0.75rem' }}>Don't block the Escape key entirely without a warning.</li>
            <li>Don't let the code run in the background when not needed.</li>
          </ul>
        </div>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Implementation guide
      </h2>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        1. Basic code logic
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        When building a sidebar or modal, use this logic to listen for the Escape key. We use <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>e.key === 'Escape'</code> because it is the most modern and reliable way to check the keypress.
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
{`// Example logic for a sidebar
if (event.key === 'Escape') {
  closeSidebar();
}`}
      </pre>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        2. Returning focus
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        This is the <strong>"gold standard"</strong> of navigation. When the user hits Escape, their "focus" (the blue outline or cursor) should jump back to the exact button they clicked to open the window. This keeps them from getting lost on the page.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        3. Handling multiple layers
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        If a user opens a modal, and then opens a second popup on top of that modal, the first Escape press should only close the top popup. The second press should close the main modal.
      </p>

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
        Before shipping a new component, run through this quick accessibility check:
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
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Open the element:</strong> Does it open correctly with the Enter key?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Press Escape:</strong> Does the element disappear immediately?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Check Focus:</strong> Is the focus back on the button that opened the element?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Screen Reader:</strong> Does the screen reader announce that the window has closed?
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Cleanup:</strong> Does the Escape key stop doing things once the element is closed?
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
        Summary
      </h2>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          Escape is required to prevent keyboard traps (WCAG 2.1.2).
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Always return focus to the triggering element.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Support all overlays, including tooltips and dropdowns.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Test manually using only your keyboard to ensure it feels smooth.
        </li>
      </ul>
    </div>
  )
}
