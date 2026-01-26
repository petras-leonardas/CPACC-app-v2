export function ButtonsVsLinksStartLearningArticle() {
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
        Case study: Start learning component
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        This page explains why we use a link instead of a button for the "Start learning" action. It also provides guidance on how to choose the right element for other action-oriented labels.
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
        On our domain overview pages, we use a <strong>"Start learning"</strong> call-to-action to lead users into their first lesson. While the word "Start" sounds like a command, the actual job of this component is to move a user from one page to another.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Our decision: Use a link
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We have decided to use a <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;a&gt;</code> (link) for the "Start learning" component. Even though the text is encouraging and action-oriented, the technical behavior is pure navigation.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why technical behavior matters
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        A link is the right choice because the system is not "starting" a heavy process like a timer or a quiz. It is simply opening a new page of educational content.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Feature</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Technical Reality</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Benefit</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Navigation</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              It moves the user to a new URL.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Users can bookmark the page or share the link.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>No state change</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              It does not start a timer or create a session.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              The system stays "static" until the user interacts with the content.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Browser tools</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Right-click to "Open in new tab" works.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Allows users to keep their place on the overview page.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>SEO</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Search engines can follow the path.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Helps our educational content show up in search results.
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
        Comparing "Start learning" and "Quick test"
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        To help you choose the right element, compare these two similar-sounding actions:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Aspect</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '37.5%' }}>Start learning (Link)</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '37.5%' }}>Quick test (Button)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Primary job</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Go to the first lesson page.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Begin a timed testing session.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>What happens?</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Renders a regular content page.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Starts a timer and picks random questions.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>User intent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "I want to read the first topic."
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "I want to take a test right now."
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Correct element</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>&lt;a&gt;</code> Link
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>&lt;button&gt;</code> Button
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
        Action verbs in navigation
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Using "action verbs" (like Explore, Discover, or Start) does not automatically turn a link into a button. If the verb describes the "journey" rather than a technical process, use a link.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        When to use a link with action verbs
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        Use a link when the verb is a "metaphor" for moving to a new place.
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>"Explore collection"</strong> → Link to a gallery page.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>"Discover features"</strong> → Link to an information page.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>"Start learning"</strong> → Link to the first topic in a series.
        </li>
      </ul>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        When to use a button with action verbs
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        Use a button when the verb describes a "real-time" change to the system or session.
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>"Start timer"</strong> → Button (starts a countdown).
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>"Start upload"</strong> → Button (begins moving a file).
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>"Start recording"</strong> → Button (activates the microphone/camera).
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
        Do's and don'ts
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
            ✅ Right
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>Do use a link if the user can right-click and "Open in new tab."</li>
            <li style={{ marginBottom: '0.75rem' }}>Do use a button if the action saves data or changes a setting.</li>
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
            ❌ Wrong
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>Don't use a button for simple page-to-page navigation.</li>
            <li style={{ marginBottom: '0.75rem' }}>Don't let "marketing language" dictate the code structure.</li>
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
        Accessibility checklist
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        Every navigation component must meet these basic requirements to ensure all users can learn effectively:
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
            <strong>Keyboard access:</strong> The user can reach and activate the link using only the Tab and Enter keys.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Visual focus:</strong> There is a clear "focus ring" around the link when it is highlighted by a keyboard.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Clear destination:</strong> The URL shown in the browser bottom-bar (on hover) matches the expected destination.
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>No confusion:</strong> The component looks like a high-priority action but follows standard link behavior.
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
          Don't let action-oriented labels fool you. If all you're doing is navigating to content, use a link—even if the label says "Start" or uses action verbs. The semantic correctness is determined by <strong>technical behavior</strong>, not <strong>marketing language</strong>.
        </p>
      </div>
    </div>
  )
}
