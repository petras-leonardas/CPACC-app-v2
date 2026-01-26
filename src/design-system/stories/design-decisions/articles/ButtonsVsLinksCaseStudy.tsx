export function ButtonsVsLinksCaseStudyArticle() {
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
        Quick test: Button vs. link decision
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        This case study explores when to use a button versus a link. In our design system, the choice depends on the user's intent and whether they are "going somewhere" or "doing something."
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Overview
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        On topic detail pages, users see a <strong>Quick test</strong> component. This component starts a new test session. While it does move the user to a new web address (URL), we have decided to build it as a <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;button&gt;</code> rather than a link <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;a&gt;</code>.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why we chose a button
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The primary goal of this interaction is to <strong>start an action</strong>, not just to browse content. A button tells the user that an experience is beginning.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Intent and action
      </h3>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Factor</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Description</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>User intent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              The user thinks "I want to start a test," not "I want to view a page."
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Matches the user's mental model of starting a process.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>System logic</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Clicking triggers session setup, randomizes 10 questions, and starts a timer.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              These are complex actions, not simple page views.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Verbs</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              The label "Quick test" acts as an action phrase (like "Take quiz").
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Action-oriented language suggests a button is needed.
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
        Industry patterns
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        We looked at how other top learning platforms handle "starting" an experience:
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Duolingo:</strong> Uses buttons to "Start Lesson."
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Khan Academy:</strong> Uses buttons for "Practice" sessions.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Coursera:</strong> Uses buttons to "Begin Quiz."
        </li>
      </ul>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        In all these cases, the <strong>"action" of starting the work</strong> is more important than the "navigation" to the page.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Decision framework
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Use this table to decide which component to use for your specific feature.
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
            Use a button when...
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>The goal is to start a process.</li>
            <li style={{ marginBottom: '0.5rem' }}>You are "Starting a test."</li>
            <li style={{ marginBottom: '0.5rem' }}>You are "Launching a simulator."</li>
            <li>You need to track a specific intent.</li>
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
            Use a link when...
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>The goal is to view information.</li>
            <li style={{ marginBottom: '0.5rem' }}>You are "Viewing test results."</li>
            <li style={{ marginBottom: '0.5rem' }}>You are "Reading an exam guide."</li>
            <li>You want standard browser features (like "Open in new tab").</li>
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
        Design do's and don'ts
      </h2>

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
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem' }}>
            <li style={{ marginBottom: '0.75rem' }}>Use a button for "Quick test" to signal the start of a timed session.</li>
            <li style={{ marginBottom: '0.75rem' }}>Use a button to ensure analytics track "Test Starts" accurately.</li>
            <li>Keep the label action-oriented (e.g., "Start," "Begin," "Take").</li>
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
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem' }}>
            <li style={{ marginBottom: '0.75rem' }}>Use a link if the user expects to right-click and "Open in new tab."</li>
            <li style={{ marginBottom: '0.75rem' }}>Use a button for simple navigation, like "Back to Home."</li>
            <li>Use a button if the URL preview on hover is important for the user.</li>
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
        Accessibility requirements
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        When using a button for navigation, we must ensure it remains accessible for all users:
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Keyboard navigation:</strong> Ensure the button is reachable using the Tab key and can be triggered with Enter or Space.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Screen readers:</strong> Ensure the button is announced as a "button." This tells users that an action will occur.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Focus states:</strong> The button must have a clear visual border or highlight when selected via keyboard.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>No "Open in new tab":</strong> We accept that users cannot right-click this button to open it in a new tab, as a test session is a specific, linear experience.
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
        Key takeaway
      </h2>

      <div style={{ 
        background: '#eff6ff', 
        padding: '2rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginTop: '1.5rem'
      }}>
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: '1.8', 
          margin: '0',
          color: '#1e40af',
          fontWeight: '500'
        }}>
          The choice between a button and a link is not always about where the user ends up. It is about what the user thinks they are doing. If they are starting an experience, use a button. If they are looking for information, use a link.
        </p>
      </div>
    </div>
  )
}
