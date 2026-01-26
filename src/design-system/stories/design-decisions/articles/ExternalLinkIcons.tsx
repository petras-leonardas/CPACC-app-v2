export function ExternalLinkIconsArticle() {
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
        External links
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        This page explains why the CPACC Mastery design system does not use icons for external links and how we ensure a safe, accessible experience without them.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Our decision
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
          In the CPACC Mastery design system, we do not use external link icons. While external links still open in a new tab for convenience, we rely on clear writing and context rather than a visual symbol to tell users they are leaving our site.
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
        Why we don't use icons
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The choice to show an icon next to a link (like a small box with an arrow) is a common debate in design. We have chosen a <strong>"text-first"</strong> approach based on deep research into accessibility and user behavior.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Lessons from GOV.UK
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The UK Government Digital Service (GOV.UK) performed extensive testing on these icons. Their research is the foundation of our decision.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Finding</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '70%' }}>Impact on users</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Low recognition</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Users with cognitive or learning disabilities often didn't know what the icon meant.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Visual noise</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              On pages with many links, icons created clutter that made the text harder to read.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Screen reader issues</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Icons were often announced inconsistently, causing confusion for blind users.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Better alternative</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Users across all groups understood simple text like "(opens in new tab)" much better than an icon.
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
        Our rationale
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        As an accessibility education platform, our "source of truth" is based on these five pillars:
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Educational context:</strong> Our users expect to see links to outside resources like WCAG guidelines.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Lower cognitive load:</strong> We want users to focus on learning, not on decoding small visual symbols.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Content density:</strong> Our study guides have many links. Adding icons to all of them would make the pages look messy.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Audience skill:</strong> Our users are generally familiar with how the web works and understand link behavior.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Evidence-based design:</strong> We prioritize actual user testing data over common design "trends."
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
        Market comparison
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We looked at how other major design systems handle this. There is no single "correct" way, but the industry is moving toward more thoughtful, context-based choices.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Design system</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Uses auto-icons?</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '50%' }}>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material Design (Google)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ No</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Don't add icons by default."
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ No</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Use descriptive text instead.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Atlassian</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#dc2626', fontWeight: '600' }}>❌ No</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Prefers text labels like "(opens in new window)."
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#f59e0b', fontWeight: '600' }}>⚠️ Optional</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Use icons only when the context requires it.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Polaris (Shopify)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#16a34a', fontWeight: '600' }}>✅ Yes</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Always show icons to set user expectations.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Chakra UI</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <span style={{ color: '#16a34a', fontWeight: '600' }}>✅ Yes</span>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Added automatically when a link is marked "external."
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
        Technical implementation
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Even though we don't show an icon, we still follow strict technical rules to keep our users safe.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Security and accessibility
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        All external links must use specific code attributes to prevent security risks and help screen readers.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Attribute</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '65%' }}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>target="_blank"</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Opens the link in a new tab so the user doesn't lose their place.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>rel="noopener noreferrer"</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <strong style={{ color: '#dc2626' }}>Critical Security:</strong> Prevents the new page from accessing or controlling our site.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Descriptive text</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              We use the link text itself to describe the destination (e.g., "Read the WCAG 2.2 spec").
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
            Do
          </h3>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>✅ Use a single <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;Link&gt;</code> component for all links.</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Write descriptive text that makes the destination clear.</li>
            <li>✅ Rely on browser UI and URL bars to show link targets.</li>
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
            <li style={{ marginBottom: '0.75rem' }}>❌ Create a separate "ExternalLink" component.</li>
            <li style={{ marginBottom: '0.75rem' }}>❌ Use vague text like "Click here" or "Link."</li>
            <li>❌ Assume an icon provides "security" against phishing.</li>
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
        Before publishing a page with external links, ensure it meets these CPACC standards:
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
            Does the link text clearly describe where the user is going?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Does the link have a high enough color contrast against the background?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Does the link have a clear "focus state" (like an outline) for keyboard users?
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Is the <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>external</code> prop applied to the component to handle security attributes?
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
        When we might change this
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        We believe in "living" documentation. We will revisit this decision if:
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          Our user research shows people are getting lost or confused.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          We add high-security features like payments or personal health data.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Accessibility audits suggest that our current approach is failing specific user groups.
        </li>
      </ul>
    </div>
  )
}
