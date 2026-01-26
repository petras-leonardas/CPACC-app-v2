export function SkipLinksArticle() {
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
        Skip links: Bypassing repetitive content
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Skip links are essential navigation tools that let keyboard and screen reader users jump directly to a page's main content. By bypassing repetitive elements like headers and menus, we create a faster, more inclusive experience.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why skip links matter
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        For most users, navigating a website involves clicking on what they see. However, users who rely on keyboards or screen readers must "tab" through every single link in the header before reaching the actual content.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The impact on users
      </h3>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>User Type</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>The Problem</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>The Skip Link Solution</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Keyboard Users</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Must press 'Tab' 20–30 times on every page to skip the menu.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              1 Tab + 1 Enter. Users reach content in seconds.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Screen Readers</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Must listen to the entire navigation menu announced on every page load.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Instant bypass. The user jumps straight to the "Main" region.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Cognitive Needs</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              High "interaction cost" leads to mental fatigue and frustration.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top', background: '#dcfce7' }}>
              Lower effort. Reduces the number of decisions and actions required.
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
        We follow the <strong>WCAG 2.4.1 (Bypass Blocks)</strong> standard. This is a <strong>Level A requirement</strong>, meaning it is a mandatory baseline for our products.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Compliance checklist
      </h3>

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
            The skip link is the very first focusable element in the code (top of the <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;body&gt;</code>).
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            The link is visually hidden by default but becomes visible when it receives keyboard focus.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            The link points to a valid id on the <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;main&gt;</code> element (e.g., <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>href="#main-content"</code>).
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            The target element is semantic (using the <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;main&gt;</code> tag).
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
        Implementation standards
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We use the <strong>"Hidden Until Focused"</strong> pattern. This keeps the interface clean for mouse users while providing a clear "safety net" for keyboard users.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Design specs
      </h3>

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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '45%' }}>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Placement</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Absolute (Top-Left)
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Ensures it is the first thing seen when tabbing.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Visibility</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Hidden until <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>:focus</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Prevents visual clutter for sighted mouse users.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Contrast</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              4.5:1 minimum
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Ensures readability in both light and dark modes.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Target</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;main id="main-content"&gt;</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Directs focus to the most important part of the page.
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
            <li style={{ marginBottom: '0.75rem' }}>Use clear text like "Skip to main content."</li>
            <li style={{ marginBottom: '0.75rem' }}>Ensure the link is high-contrast when visible.</li>
            <li style={{ marginBottom: '0.75rem' }}>Add <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>tabindex="-1"</code> to the target if focus is lost.</li>
            <li>Support dark mode styling.</li>
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
            <li style={{ marginBottom: '0.75rem' }}>Use vague text like "Skip Navigation."</li>
            <li style={{ marginBottom: '0.75rem' }}>Hide the link even when it has focus.</li>
            <li style={{ marginBottom: '0.75rem' }}>Target a <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;div&gt;</code> that might be deleted later.</li>
            <li>Use JavaScript if a simple HTML link works.</li>
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
        Competitive analysis: Industry leaders
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We looked at how world-class organizations handle skip links to ensure our implementation is superior.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Organization</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Strategy</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '45%' }}>Our Takeaway</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Single link + Shortcut hint
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Excellent for "power users" who want extra speed.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GitHub</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Multiple skip links
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Great for complex apps; allows skipping to "Search" or "Code."
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>BBC</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              High-contrast focus box
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              A benchmark for visual clarity and brand alignment.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Yale University</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Always visible
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Maximum discoverability, though it uses permanent header space.
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
        How to test
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        Always verify your skip link manually before shipping.
      </p>

      <div style={{ 
        background: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <ul style={{ 
          fontSize: '1.125rem', 
          lineHeight: '1.75',
          marginLeft: '1.5rem',
          marginBottom: '0'
        }}>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Keyboard Test:</strong> Refresh the page and press Tab. The skip link should pop into view.
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Action Test:</strong> Press Enter. The page should scroll down to the main heading.
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Sequence Test:</strong> Press Tab again. The focus should move to the first link inside the main content, not back to the header.
          </li>
          <li style={{ marginBottom: '0' }}>
            <strong>Screen Reader Test:</strong> Using VoiceOver or NVDA, ensure the first thing announced is "Skip to main content, link."
          </li>
        </ul>
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
          <strong>Note:</strong> This documentation serves as the official guide for skip link implementation within our design system. For technical code snippets, please refer to our React component library.
        </p>
      </div>
    </div>
  )
}
