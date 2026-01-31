export function ToastNotificationsArticle() {
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
        Toast notifications: Transient feedback done right
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Toast notifications provide brief, non-intrusive feedback about an action's outcome. Our implementation prioritizes accessibility, user control, and clear visual communication while following industry best practices.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why toast notifications matter
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Toast notifications serve as a communication bridge between the system and the user. They confirm that an action was successful, alert users to errors, or provide timely information—all without disrupting the user's workflow.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        When to use toasts
      </h3>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Use Case</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Example</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Why Toast Works</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Success Confirmation</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Feedback submitted. Thank you!"
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              User needs acknowledgment but doesn't need to take further action.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Background Process</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Settings saved automatically"
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Non-blocking confirmation of system action.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Recoverable Errors</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Connection lost. Retrying..."
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Informational alert that doesn't require immediate user action.
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
        Our design decisions
      </h2>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        1. Progress indicator with visual countdown
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We include a <strong>3px progress bar</strong> at the top of the toast that shrinks from left to right over 4 seconds. This provides a clear visual cue of how much time remains before the toast disappears.
      </p>

      <div style={{ 
        background: '#f0fdf4', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #bbf7d0',
        marginBottom: '1.5rem'
      }}>
        <p style={{ margin: '0', fontSize: '1rem', lineHeight: '1.6' }}>
          <strong>Why this matters:</strong> Research shows that users experience less anxiety when they understand system timing. The progress bar removes uncertainty about when the notification will disappear.
        </p>
      </div>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        2. Hover-to-pause functionality
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        When users hover over the toast, the countdown <strong>pauses</strong>. When they move their mouse away, the timer <strong>resets to full duration</strong> and starts again.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>User Action</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>System Response</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Mouse enters toast</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Progress bar freezes at current position
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Gives user time to read without pressure
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Mouse leaves toast</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Progress bar resets to 100% and restarts
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Fresh countdown ensures adequate reading time
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #bfdbfe',
        marginBottom: '1.5rem'
      }}>
        <p style={{ margin: '0', fontSize: '1rem', lineHeight: '1.6' }}>
          <strong>Accessibility benefit:</strong> Users with motor impairments or cognitive disabilities may need more time to read content. Hover-to-pause provides that control without requiring explicit interaction.
        </p>
      </div>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        3. No manual dismiss button
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We intentionally omit a close button. The toast auto-dismisses after 4 seconds, and users can extend this time by hovering. This reduces visual clutter and interaction demands.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        4. Bottom-center positioning
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Toasts appear at the <strong>bottom center</strong> of the viewport. This placement:
      </p>

      <ul style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem', marginLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>Avoids obscuring primary content at the top</li>
        <li style={{ marginBottom: '0.5rem' }}>Works well across different screen sizes</li>
        <li style={{ marginBottom: '0.5rem' }}>Follows the natural reading flow (actions confirmed after completion)</li>
        <li>Provides equal visibility for left-to-right and right-to-left layouts</li>
      </ul>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        5. High-contrast, semantic colors
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We use solid background colors (not just borders) to ensure the toast stands out clearly against any page content.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Variant</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Light Mode</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Dark Mode</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Contrast Ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Success</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#bbf7d0', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>green[200]</code> bg<br/>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>green[900]</code> text
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#166534', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>green[800]</code> bg<br/>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>green[50]</code> text
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              7.35:1 (AAA compliant)
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Error</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#fecaca', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>red[200]</code> bg<br/>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>red[900]</code> text
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#991b1b', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>red[800]</code> bg<br/>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>red[50]</code> text
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              8.1:1 (AAA compliant)
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
        Accessibility requirements
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Our toast implementation follows <strong>WCAG 2.1</strong> guidelines and considers users of all abilities.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>WCAG Criterion</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Requirement</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Our Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>1.4.3 Contrast</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              4.5:1 minimum for normal text (AA)<br/>
              7:1 for enhanced (AAA)
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              7.35:1+ ratio achieved (AAA)
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>4.1.3 Status Messages</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Status messages must be programmatically determinable
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Uses <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>role="alert"</code> and <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>aria-live="polite"</code>
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>2.2.1 Timing Adjustable</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Users can extend time limits
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Hover pauses timer; mouse-out resets to full duration
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>1.4.1 Use of Color</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Color not sole indicator of meaning
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Icons (checkmark/alert) provide redundant indication
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
            <li style={{ marginBottom: '0.75rem' }}>Keep messages short and actionable (under 10 words).</li>
            <li style={{ marginBottom: '0.75rem' }}>Use semantic colors (green for success, red for error).</li>
            <li style={{ marginBottom: '0.75rem' }}>Include an icon for quick visual recognition.</li>
            <li style={{ marginBottom: '0.75rem' }}>Allow users to pause auto-dismiss on hover.</li>
            <li>Stack multiple toasts with consistent spacing.</li>
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
            <li style={{ marginBottom: '0.75rem' }}>Use toasts for critical errors that require action.</li>
            <li style={{ marginBottom: '0.75rem' }}>Display multiple toasts simultaneously (queue them).</li>
            <li style={{ marginBottom: '0.75rem' }}>Make toasts disappear too quickly (&lt;3 seconds).</li>
            <li style={{ marginBottom: '0.75rem' }}>Include interactive elements like links or buttons.</li>
            <li>Use only color to convey meaning.</li>
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
        Industry analysis: How others do it
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We analyzed toast implementations from leading design systems to inform our decisions.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Design System</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Approach</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Our Takeaway</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material Design (Google)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Snackbars" at bottom of screen, single action allowed, 4-10 second duration
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Validated our bottom positioning and 4-second default timing.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Progress indicator optional, hover pauses timer, supports stacking
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Directly inspired our progress bar and hover-to-pause functionality.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Atlassian Design</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Flags" with auto-dismiss, top-right positioning, bold semantic colors
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Confirmed importance of high-contrast semantic backgrounds.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Shopify Polaris</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Bottom-center position, 5-second default, no progress indicator
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Validated bottom-center as optimal for commerce UIs.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Radix UI</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Highly accessible, swipe-to-dismiss, pause on hover, programmatic control
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Best-in-class accessibility patterns adopted.
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
        Implementation specs
      </h2>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Property</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Value</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '45%' }}>Token / Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Position</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Fixed, bottom-center
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              16px from bottom edge, horizontally centered
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Width</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              300px min, 400px max
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Readable without being obtrusive
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Border radius</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              8px
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>radius.lg</code> token
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Padding</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              16px horizontal, 12px vertical
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Comfortable touch target and reading space
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Progress bar height</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              3px
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Visible but not distracting
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Auto-dismiss</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              4000ms default
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Enough time to read ~20 words at average speed
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Entry animation</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Fade in + slide up
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              200ms duration, draws attention without jarring
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Z-index</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              200
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Above modals (50) and dropdowns
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
        Usage example
      </h2>

      <div style={{ 
        background: '#1f2937', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        overflowX: 'auto'
      }}>
        <pre style={{ 
          margin: '0',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          color: '#e5e7eb'
        }}>
{`// Using the useToast hook
import { useToast } from '@/design-system'

function FeedbackForm() {
  const { success, error } = useToast()

  const handleSubmit = async () => {
    try {
      await submitFeedback(data)
      success('Feedback submitted. Thank you!')
    } catch (err) {
      error('Failed to submit. Please try again.')
    }
  }
}`}
        </pre>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <div style={{ 
        background: '#f3f4f6', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #d1d5db',
        fontStyle: 'italic',
        fontSize: '1rem',
        color: '#6b7280'
      }}>
        <p style={{ margin: '0' }}>
          <strong>Note:</strong> This documentation reflects our current toast implementation. For interactive examples and the full component API, see the Toast component in the Components section of Storybook.
        </p>
      </div>
    </div>
  )
}
