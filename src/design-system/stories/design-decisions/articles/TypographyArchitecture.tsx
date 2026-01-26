export function TypographyComponentsArticle() {
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
        Typography components: Architecture and benefits
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Modern design systems use more than just font sizes and colors. To ensure our tools are accessible to everyone, we use typography components. These are pre-built building blocks that make it easy for developers to use the right text styles while following web standards.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Why tokens alone are not enough
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        In the past, we used design tokens—simple labels for values like font size or weight. While tokens are helpful, relying on them alone often leads to mistakes that hurt our users and our search engine rankings.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Issue</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>What happens</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Why it matters</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Accessibility risks</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              A developer might style a generic box to look like a heading without using the right code.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Screen readers cannot find headings, making the page impossible to navigate for blind users.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>SEO impact</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Search engines look for specific heading tags (like <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;h1&gt;</code>) to understand your content.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              If headings aren't marked correctly, our pages are harder to find on Google.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Inconsistency</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Developers have to remember long lists of names like <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>.cpacc-heading-1</code>.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              It is easy to make typos or use the wrong style, making the app look messy.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>No code safety</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Typos in class names don't show errors until the site is live.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Small mistakes can break the design without anyone noticing during development.
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
        Industry standards
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We are following the lead of the world's best design systems. Using components for text is a proven way to build accessible software at scale.
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>System</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Creator</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '50%' }}>Approach</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material UI</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Google</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Uses a <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;Typography&gt;</code> component to enforce correct web structure.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Chakra UI</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Independent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Provides <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;Heading&gt;</code> and <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;Text&gt;</code> components with built-in accessibility.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Polaris</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Shopify</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Uses specific variants to ensure all merchant tools meet legal accessibility rules.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Radix Themes</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Independent</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Built by experts specifically to support screen readers and keyboards.
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
        The CPACC hybrid architecture
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We use a "best of both worlds" approach. This gives developers flexibility while keeping the application safe and accessible.
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Design Tokens:</strong> These are our "source of truth." We define every font size and line height in one file.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Utility Classes:</strong> We provide shortcuts for CSS (like Tailwind) so old code still works perfectly.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Typography Components:</strong> This is our recommended method. Components like <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;Heading&gt;</code> and <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;Text&gt;</code> use our tokens automatically.
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
        Accessibility and WCAG compliance
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        As an accessibility-focused organization, our code must lead by example. Our typography components help us meet WCAG 2.1 standards (the international rules for web accessibility) automatically.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Key benefits for our users
      </h3>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Easier Navigation:</strong> Blind users can jump between sections using a "heading list." Components ensure every heading is tagged correctly so this works.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Clear Relationships:</strong> Using proper levels (Heading 1, then Heading 2) helps everyone understand how information is organized.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Perfect Contrast:</strong> Our components automatically choose colors that are easy to read for people with low vision.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Predictable Structure:</strong> Assistive tools can build an "outline" of the page, helping users find what they need in seconds.
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
        Usage guidelines
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Follow these simple rules to keep our designs consistent and accessible.
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
            <li style={{ marginBottom: '0.75rem' }}>Use <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;Heading&gt;</code> for any text that introduces a new section.</li>
            <li style={{ marginBottom: '0.75rem' }}>Keep headings in order (e.g., an <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;h2&gt;</code> should always follow an <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;h1&gt;</code>).</li>
            <li style={{ marginBottom: '0.75rem' }}>Use the <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;Text&gt;</code> component for all paragraph and body content.</li>
            <li>Trust the component to handle colors and spacing.</li>
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
            <li style={{ marginBottom: '0.75rem' }}>Don't use a <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;div&gt;</code> and manually style it to look like a heading.</li>
            <li style={{ marginBottom: '0.75rem' }}>Don't skip heading levels just because you like the size of a smaller one.</li>
            <li style={{ marginBottom: '0.75rem' }}>Don't create custom font styles that aren't in the design system.</li>
            <li>Don't override text colors manually; this can break accessibility.</li>
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
        Developer benefits
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Beyond accessibility, these components make coding faster and more reliable:
      </p>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Guided Coding:</strong> Your code editor will suggest the correct options as you type.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>One Source of Truth:</strong> If we decide to change a font size, we change it in one place, and the whole app updates instantly.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Faster Learning:</strong> New developers only need to learn a few simple components instead of hundreds of CSS classes.
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
        Accessibility checklist for developers
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
            Does every page have exactly one <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;h1&gt;</code>?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Are headings used in a logical order (1, 2, 3...)?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Does the text have enough contrast against the background?
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Can a screen reader identify the main sections of the page?
          </li>
        </ul>
      </div>
    </div>
  )
}
