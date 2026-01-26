export function FooterLinkUnderlinesArticle() {
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
        Footer link underlines
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        In the CPACC Mastery design system, footer links are always underlined. This ensures they are easy to find and use for everyone, regardless of how they browse the web.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Our design decision
      </h2>

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
          margin: '0',
          color: '#1e40af',
          fontWeight: '500'
        }}>
          We have decided that footer links must always be underlined by default, rather than only showing an underline when a user hovers over them. While many modern websites remove underlines to look "cleaner," doing so creates barriers for users with disabilities. By keeping underlines visible, we ensure our navigation meets high accessibility standards.
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
        Why accessibility matters
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        A "hover-only" underline pattern relies almost entirely on color to show that text is clickable. This causes several problems for different groups of users.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Who is affected?
      </h3>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>User group</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '70%' }}>Why hover-only underlines fail them</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Color blind users</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              They may not be able to tell the difference between blue links and gray text.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Low vision users</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Subtle color changes are often impossible to see.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Keyboard users</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              They navigate using the "Tab" key and never trigger a "hover" state.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Mobile/Tablet users</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Touch screens do not have a "hover" state; the first interaction is a click.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Cognitive disabilities</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Underlines provide a clear, familiar "clue" that text is interactive.
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
        WCAG compliance
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Underlining links helps us meet <strong>WCAG 2.2 Success Criterion 1.4.1 (Use of Color)</strong>. This rule states that color should not be the only way we show information or actions.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Competitive patterns
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Many SaaS and e-commerce brands prioritize a "minimalist" look over accessibility. Here is how our approach compares to common industry trends.
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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '37.5%' }}>Modern "Aesthetic" Trend</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '37.5%' }}>CPACC Mastery Standard</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Link Visibility</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Hidden until hover (Hover-only)
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Always visible
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Primary Indicator</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Color alone
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Shape and line (Underline)
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Visual Noise</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Low (Minimalist)
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Moderate (Functional)
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Usability Score</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Lower (Requires searching)
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Higher (Instant recognition)
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
        Our Link component supports three modes. Use this table to decide which one fits your needs.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Mode</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>When to use</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Accessibility note</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#dcfce7' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>underline="always"</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <strong>Default.</strong> Use for all text links in footers, body content, and sidebars.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Safest choice. Best for WCAG compliance.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#fef3c7' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>underline="hover"</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Use only when other clues (like icons or buttons) make the link obvious.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#f59e0b', fontWeight: '600' }}>⚠️ Risky.</span> Can be invisible to some users.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>underline="none"</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Use only when a link wraps a large component like a Card or a Button.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Only use if the component has its own "clickable" look.
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
        Implementation do's and don'ts
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
            Do
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>✅ Do keep underlines visible to help users scan the page quickly.</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Do ensure your link color has a 4.5:1 contrast ratio against the background.</li>
            <li>✅ Do follow the patterns used by leaders like GOV.UK and WebAIM.</li>
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
            Don't
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>❌ Don't remove underlines just to make the footer look "cleaner."</li>
            <li style={{ marginBottom: '0.75rem' }}>❌ Don't assume a user can see the difference between link text and regular text.</li>
            <li>❌ Don't sacrifice functionality for temporary design trends.</li>
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
        Rationale for CPACC Mastery
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        As an accessibility education platform, our design system is a teaching tool. We choose "Always Underlined" for these core reasons:
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Mission alignment:</strong> We must practice what we preach. We cannot teach accessibility while ignoring it in our own footer.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Predictability:</strong> Users expect underlines. When a design is predictable, it is easier to use.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Universal design:</strong> Underlines work for everyone, including those using screen magnifiers or specialized keyboards.
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
        Implementation example
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        In our Footer component, we use the standard Link component. No extra code is needed because the default state is set to always.
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
{`// The default behavior ensures accessibility automatically
<Link href="/privacy-policy">
  Privacy Policy
</Link>`}
      </pre>

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
            Are all footer links underlined by default?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Does the link text remain readable when the underline is present?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Is the link color distinct from the footer background color?
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Does the link have a clear "focus state" for keyboard users?
          </li>
        </ul>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

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
          fontWeight: '600'
        }}>
          Key takeaway: Never trade accessibility for an aesthetic trend. Underlines are a proven, universal tool that makes the web work for everyone.
        </p>
      </div>
    </div>
  )
}
