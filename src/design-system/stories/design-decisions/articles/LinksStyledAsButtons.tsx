export function LinksStyledAsButtonsArticle() {
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
        Why links and buttons should be styled differently
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Understand the critical difference between links and buttons to ensure our interface is accessible, predictable, and easy to use for everyone.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why visual consistency matters
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        In digital design, a <strong>"mental model"</strong> is what a user expects to happen when they interact with an element. When we style a link to look like a button, we break that expectation. This creates confusion, especially for people using assistive technologies like screen readers or keyboards.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The golden rule
      </h3>

      <div style={{ 
        background: '#eff6ff', 
        padding: '2rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: '1.8', 
          margin: '0 0 1rem 0',
          color: '#1e40af',
          fontWeight: '600'
        }}>
          Visual appearance must match semantic meaning.
        </p>
        <ul style={{ 
          fontSize: '1.125rem', 
          lineHeight: '1.75',
          marginLeft: '1.5rem',
          marginBottom: '0',
          color: '#1e40af'
        }}>
          <li style={{ marginBottom: '0.5rem' }}>
            If it takes the user to a new page, it is a <strong>Link</strong>.
          </li>
          <li>
            If it triggers a change on the current page, it is a <strong>Button</strong>.
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
        Competitive analysis: Industry standards
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Every major design system agrees that styling links as buttons is a harmful "anti-pattern" that should be avoided.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Design system</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Stance on links styled as buttons</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '50%' }}>Primary reasoning</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material Design</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ Not allowed</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Visual appearance must match the technical "role."
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Polaris (Shopify)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ Not allowed</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              False expectations hurt the user experience.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ Not allowed</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Research shows cognitive confusion for disabled users.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ Avoid</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Mixing styles breaks the consistency of the system.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Nielsen Norman</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ Not allowed</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Violates fundamental usability heuristics.
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
        Technical differences
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Links and buttons behave differently for the computer and the user. Mixing them up causes technical failures.
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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '37.5%' }}>Link (&lt;a&gt;)</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '37.5%' }}>Button (&lt;button&gt;)</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Main purpose</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Navigates to a new URL or page section.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Performs an action (Submit, Close, Save).
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Keyboard trigger</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Activated by the <strong>Enter</strong> key only.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Activated by <strong>Enter</strong> OR <strong>Spacebar</strong>.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Right-click</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Shows "Open in new tab" options.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Shows standard browser context menu.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Screen reader</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Announces as "Link."
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Announces as "Button."
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
        Usage guidelines
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Follow these "Do's and don'ts" to ensure your designs remain accessible and professional.
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
            <li style={{ marginBottom: '0.75rem' }}>Do use an underline or an arrow icon to indicate a link.</li>
            <li style={{ marginBottom: '0.75rem' }}>Do use buttons for actions like "Submit" or "Delete."</li>
            <li>Do ensure links are clearly visible within blocks of text.</li>
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
            <li style={{ marginBottom: '0.75rem' }}>Don't use a solid background "pill" shape for navigation.</li>
            <li style={{ marginBottom: '0.75rem' }}>Don't use a button to take a user to a different website.</li>
            <li>Don't rely on color alone to identify a link.</li>
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
        Recommended patterns
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        If you need a link to have more visual weight than a standard text link, use one of these approved patterns instead of styling it as a button.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        1. Emphasis link
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Use a <strong>bold font weight</strong> and a <strong>thicker underline</strong> to make the link stand out without looking like a button.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        2. Directional link
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Add an <strong>arrow icon (→)</strong> to the end of the link text. This signals to the user that they are "going somewhere else."
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        3. Action cards
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Place a standard link inside a <strong>visually weighted card</strong> component. The card draws the eye, while the link provides the correct technical behavior.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Accessibility checklist (WCAG 2.2)
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        Use this checklist to verify your implementation:
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
            <strong>Role matches look:</strong> Does the visual design match the HTML tag?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Keyboard accessible:</strong> If it looks like a button, does the Spacebar work? (If not, it should be a link).
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Context menus:</strong> Does right-clicking the element show "Open in new tab" if it navigates?
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            <strong>Clear labels:</strong> Does the text clearly describe where the link goes? (Avoid "Click here").
          </li>
        </ul>
      </div>
    </div>
  )
}
