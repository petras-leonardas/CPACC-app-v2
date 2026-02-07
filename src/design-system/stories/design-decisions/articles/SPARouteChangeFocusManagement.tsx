export function SPARouteChangeFocusManagementArticle() {
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
        SPA route-change focus management
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        When a user navigates between pages in a Single Page Application, the browser does not perform a full page load. This means focus is never reset, and screen readers may announce nothing at all about the new content. This article documents the research behind our decision to programmatically focus the page heading on route changes, including user testing results, competitor analysis, and WCAG rationale.
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
        In a traditional multi-page website, navigating to a new URL triggers a full page load. The browser resets focus to the top of the document, and screen readers announce the new page title. Users always know where they are.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        In a Single Page Application (SPA) built with React Router, clicking a link to another page does <strong>not</strong> trigger a full page load. Instead, React swaps the rendered content in place. This creates two critical accessibility issues:
      </p>

      <ol style={{ fontSize: '1.125rem', lineHeight: '1.75', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Focus is orphaned.</strong> The element that had focus (e.g. a "Next topic" button) may still exist in the DOM or may be removed entirely. Either way, focus is left in the wrong position on the new page.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Screen readers stay silent.</strong> Since no new page was loaded, the screen reader does not announce anything about the new content. The user has no idea the page changed.
        </li>
      </ol>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#991b1b' }}>
          Our specific case
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          On our topic detail pages, pressing Tab to the "Next topic" button, then Enter, navigates to the next topic. The page scrolls to top visually, but <strong>keyboard focus remains at the same DOM position</strong>. Pressing Tab again lands on the next element in DOM order — the user ends up mid-page instead of at the top. A screen reader user hears nothing about the new topic.
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
        Research findings
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        We surveyed established accessibility research, framework implementations, and government design systems to determine the best approach. The evidence overwhelmingly points to one strategy.
      </p>

      {/* GatsbyJS user testing */}
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        GatsbyJS: User testing with Fable Tech Labs
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        GatsbyJS conducted real user testing with screen reader users through{' '}
        <a href="https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Fable Tech Labs
        </a>
        {' '}to evaluate different focus management strategies for client-side route changes. They tested multiple approaches and reported their findings in their{' '}
        <a href="https://www.gatsbyjs.com/blog/2020-02-10-accessible-client-side-routing-improvements/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          accessible client-side routing improvements article
        </a>.
      </p>

      <div style={{ 
        background: '#f0fdf4', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #86efac',
        marginBottom: '2rem'
      }}>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.75', margin: '0', fontStyle: 'italic', color: '#166534', fontWeight: '500' }}>
          "Focusing on a heading was found to be the best experience as it would save time and make it clear what happened."
        </p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.75rem', marginBottom: '0' }}>
          — GatsbyJS user testing results, as cited by Up Your A11y
        </p>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Gatsby ultimately implemented a dual approach: focus management on the wrapper element, plus an ARIA live region that announces "Navigated to [page title]" to ensure consistent behaviour across all screen reader and browser combinations. They found that NVDA with Firefox and VoiceOver with Safari in particular did not reliably announce focused elements on route change, making the live region a valuable secondary mechanism.
      </p>

      {/* Up Your A11y */}
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        Up Your A11y: Focus on route change in React
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The{' '}
        <a href="https://www.upyoura11y.com/handling-focus/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Up Your A11y guide on handling focus
        </a>
        {' '}provides an interactive demonstration of the problem. They show that after a client-side route change without focus management:
      </p>

      <ul style={{ fontSize: '1.125rem', lineHeight: '1.75', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>The screen reader informs the user they pressed a link</li>
        <li style={{ marginBottom: '0.5rem' }}>New content is fetched and rendered</li>
        <li style={{ marginBottom: '0.5rem' }}>The screen reader announces <strong>nothing</strong> about the new content</li>
        <li style={{ marginBottom: '0.5rem' }}>Focus remains on the link from the previous page, even though it may no longer be visible</li>
      </ul>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Their recommended solution is to focus the <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;h1&gt;</code> heading of the new page by giving it <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex={'{-1}'}</code>, using a ref to focus it on mount, and disabling the visible focus outline.
      </p>

      {/* City of Helsinki */}
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        City of Helsinki Accessibility Model
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The{' '}
        <a href="https://saavutettavuusmalli.hel.fi/en/saavutettavuus-palvelukehityksessa/toteutus-ja-ohjelmistotestaus/single-page-applications-spas-notes-on-accessibility/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          Helsinki SPA accessibility guide
        </a>
        {' '}provides a formal rule:
      </p>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #93c5fd',
        marginBottom: '1.5rem'
      }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0', fontStyle: 'italic', color: '#1e40af' }}>
          "When you switch to a new page context, move the browser focus to a pre-designated spot in the new page. Normally, this position is at the top of the page, on the first DOM element."
        </p>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        They explicitly reference <strong>WCAG 2.4.3 Focus Order</strong> and warn that without focus management:
      </p>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '1.5rem'
      }}>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0', fontStyle: 'italic', color: '#991b1b' }}>
          "The browser focus may land at a random location on the new page or even detach from it altogether, as the DOM node that hosted the focus is removed from DOM. Non-visual users in particular will find the situation difficult to comprehend."
        </p>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Crucially, Helsinki also documents an <strong>exception</strong> relevant to our case: for multi-step processes (such as navigating between topics in sequence), focus does not need to go to the very top of the page. Instead, it should go to the beginning of the content — in our case, the topic heading. This gives users the context they need while saving them from re-navigating past the site header and navigation.
      </p>

      {/* React Router discussion */}
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        React Router: Community discussion
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The{' '}
        <a href="https://github.com/remix-run/react-router/discussions/9555" style={{ color: '#2563eb', textDecoration: 'underline' }}>
          React Router GitHub discussion #9555
        </a>
        {' '}highlights that React Router does not handle focus management on route change out of the box. The discussion explores several options, and the community consensus aligns with focusing a heading in the changed layout as the most accessible approach. Historically, Reach Router (now merged into React Router) provided some built-in focus management, but this is no longer automatic.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Approaches compared
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Three main strategies emerged from the research:
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '22%' }}>Approach</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '22%' }}>Used by</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '28%' }}>Pros</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '28%' }}>Cons</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>
                A. Focus the <code style={{ background: '#dcfce7', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>&lt;h1&gt;</code> heading
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>Gatsby (user-tested), Up Your A11y, GOV.UK, Helsinki</td>
              <td style={{ padding: '0.75rem 1rem' }}>Screen reader announces page context immediately. Keyboard users start at logical top. <strong>User-tested as best experience.</strong></td>
              <td style={{ padding: '0.75rem 1rem' }}>Requires <code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>tabIndex={'{-1}'}</code> and <code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>outline: none</code> on non-interactive element</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>
                B. Focus a wrapper <code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>&lt;div&gt;</code>
              </td>
              <td style={{ padding: '0.75rem 1rem' }}>Reach Router (default behaviour)</td>
              <td style={{ padding: '0.75rem 1rem' }}>Framework-level, no heading ref needed</td>
              <td style={{ padding: '0.75rem 1rem' }}>Screen reader may announce nothing useful. Magnification and voice navigation users get confused by large unfocusable target.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>C. Focus skip link</td>
              <td style={{ padding: '0.75rem 1rem' }}>Gatsby (recommended enhancement)</td>
              <td style={{ padding: '0.75rem 1rem' }}>Ideal for magnification and switch users — small, interactive target</td>
              <td style={{ padding: '0.75rem 1rem' }}>Not useful if user wants to read content immediately. Adds complexity.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ 
        background: '#f0fdf4', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #86efac',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#166534' }}>
          Our decision: Option A — Focus the heading
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          This is the approach with the strongest evidence. It was the winner in Gatsby's real user testing, recommended by Helsinki's formal accessibility model, demonstrated by Up Your A11y, and aligns with WCAG 2.4.3 Focus Order. The implementation cost is minimal (a ref, <code style={{ background: '#dcfce7', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>tabIndex={'{-1}'}</code>, and a <code style={{ background: '#dcfce7', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>useEffect</code>), and the user experience improvement is significant.
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
        WCAG compliance
      </h2>

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '25%' }}>Criterion</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '15%' }}>Level</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '60%' }}>How our implementation satisfies it</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>2.1.1 Keyboard</td>
              <td style={{ padding: '0.75rem 1rem' }}>A</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus is placed at a logical starting point, allowing keyboard users to navigate the new content sequentially without guessing.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>2.4.3 Focus Order</td>
              <td style={{ padding: '0.75rem 1rem' }}>A</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus moves to the page heading, preserving a meaningful and operable navigation sequence. The Helsinki Accessibility Model specifically cites this criterion for SPA focus management.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>3.2.1 On Focus</td>
              <td style={{ padding: '0.75rem 1rem' }}>A</td>
              <td style={{ padding: '0.75rem 1rem' }}>Moving focus to the heading does not initiate any change of context — it simply communicates where the user is on the new page.</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>3.2.3 Consistent Navigation</td>
              <td style={{ padding: '0.75rem 1rem' }}>AA</td>
              <td style={{ padding: '0.75rem 1rem' }}>The same focus management pattern is applied consistently across all topic-to-topic navigation transitions (next, previous, and cross-domain).</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: '500' }}>4.1.3 Status Messages</td>
              <td style={{ padding: '0.75rem 1rem' }}>AA</td>
              <td style={{ padding: '0.75rem 1rem' }}>By focusing the heading, screen readers announce the new page context, serving as an implicit status message that the navigation was successful.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Implementation
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The implementation spans two files:
      </p>

      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        1. TopicStickyHeader.tsx
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        The heading component accepts an optional <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>headingRef</code> and applies <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex={'{-1}'}</code> so it can receive programmatic focus without being in the natural Tab order:
      </p>

      <pre style={{ 
        background: '#1f2937', 
        color: '#e5e7eb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        overflow: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '1.5rem'
      }}>
{`<Heading 
  as={isMinimized ? "h2" : "h1"} 
  ref={headingRef}
  tabIndex={-1}
  className="... outline-none"
>
  {topicTitle}
</Heading>`}
      </pre>

      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        2. TopicDetailPage.tsx
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
        A <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>useEffect</code> watches the <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>topicId</code> route parameter. On change (but not on initial mount), it focuses the heading:
      </p>

      <pre style={{ 
        background: '#1f2937', 
        color: '#e5e7eb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem', 
        overflow: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6',
        marginBottom: '1.5rem'
      }}>
{`const topicHeadingRef = useRef<HTMLHeadingElement>(null)
const isInitialMount = useRef(true)

useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false
    return
  }
  setTimeout(() => {
    topicHeadingRef.current?.focus()
  }, 0)
}, [topicId])`}
      </pre>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Key design choices:
      </p>

      <ul style={{ fontSize: '1.125rem', lineHeight: '1.75', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong><code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>isInitialMount</code> guard:</strong> Prevents focusing the heading on the first page load. Users arriving from an external link or bookmark should not have focus forced to the heading — the browser's default behaviour is correct for initial loads.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong><code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>setTimeout(fn, 0)</code>:</strong> Defers the focus call to the next microtask, ensuring React has committed the new DOM before we attempt to focus. Without this, the ref may still point to the previous heading element.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong><code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>tabIndex={'{-1}'}</code>:</strong> Makes the heading programmatically focusable without adding it to the Tab order. Users cannot Tab to the heading manually, which would be unexpected for a non-interactive element.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong><code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>outline-none</code>:</strong> Hides the focus ring on the heading since it is a non-interactive element and showing a focus ring would be visually confusing.
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
        Expected behaviour after the fix
      </h2>

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '30%' }}>Action</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '35%' }}>Visual result</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '35%' }}>Screen reader announcement</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Click "Next topic"</td>
              <td style={{ padding: '0.75rem 1rem' }}>Page scrolls to top, new topic content renders</td>
              <td style={{ padding: '0.75rem 1rem' }}>Announces new topic title (e.g. "Disability Demographics and Statistics, heading level 1")</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Press Tab</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus moves to Back button (first interactive element)</td>
              <td style={{ padding: '0.75rem 1rem' }}>Announces "Back to domain overview, button"</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Click "Previous topic"</td>
              <td style={{ padding: '0.75rem 1rem' }}>Same as above, previous topic loads</td>
              <td style={{ padding: '0.75rem 1rem' }}>Announces previous topic title</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Cross-domain navigation</td>
              <td style={{ padding: '0.75rem 1rem' }}>Navigates to domain overview page</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus is not managed (different page component renders)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Future considerations
      </h2>

      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        ARIA live region announcement
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Gatsby's research found that some screen reader and browser combinations (notably NVDA with Firefox and VoiceOver with Safari) do not reliably announce focused elements on client-side route changes. Their solution was to add an <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>aria-live="assertive"</code> region that announces "Navigated to [page title]" on every route change. This is a worthwhile enhancement to consider if we encounter reliability issues across different assistive technology combinations.
      </p>

      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        marginTop: '1.5rem',
        marginBottom: '0.75rem',
        color: '#111827'
      }}>
        Global route-change handler
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Currently, focus management is implemented per-page. As the application grows, a centralised route-change focus handler (e.g. a custom React Router wrapper or hook) could ensure consistent behaviour across all pages without requiring each page component to manage its own focus. This mirrors the approach taken by Gatsby at the framework level.
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

      <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          fontSize: '1rem',
          lineHeight: '1.6'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '50%' }}>Test</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827', width: '50%' }}>Expected result</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Navigate to a topic page directly (URL or bookmark)</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus is <strong>not</strong> forced to heading (initial mount is skipped)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Click "Next topic" button via keyboard</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus moves to new topic heading</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Click "Previous topic" button via keyboard</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus moves to previous topic heading</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Press Tab after heading receives focus</td>
              <td style={{ padding: '0.75rem 1rem' }}>Focus moves to next interactive element (Back button)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>Tab through page — heading should <strong>not</strong> appear in Tab order</td>
              <td style={{ padding: '0.75rem 1rem' }}>Heading is only focusable programmatically, not via Tab key</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>VoiceOver + Safari: navigate between topics</td>
              <td style={{ padding: '0.75rem 1rem' }}>VoiceOver announces new topic title and heading level</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td style={{ padding: '0.75rem 1rem' }}>No visible focus ring appears on heading</td>
              <td style={{ padding: '0.75rem 1rem' }}><code style={{ background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>outline-none</code> ensures no visible ring</td>
            </tr>
          </tbody>
        </table>
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

      <ul style={{ fontSize: '1.125rem', lineHeight: '2', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li>
          <a href="https://www.gatsbyjs.com/blog/2020-02-10-accessible-client-side-routing-improvements/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Gatsby — Accessibility Improvements to Client Side Routing (2020)
          </a>
        </li>
        <li>
          <a href="https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Gatsby — User Testing of Accessible Client-Side Routing with Fable Tech Labs (2019)
          </a>
        </li>
        <li>
          <a href="https://www.upyoura11y.com/handling-focus/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Up Your A11y — Handling Focus on Route Change in React
          </a>
        </li>
        <li>
          <a href="https://saavutettavuusmalli.hel.fi/en/saavutettavuus-palvelukehityksessa/toteutus-ja-ohjelmistotestaus/single-page-applications-spas-notes-on-accessibility/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            City of Helsinki — Single Page Applications: Notes on Accessibility
          </a>
        </li>
        <li>
          <a href="https://github.com/remix-run/react-router/discussions/9555" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            React Router — Focus Management Discussion #9555
          </a>
        </li>
        <li>
          <a href="https://gomakethings.com/shifting-focus-on-route-change-with-react-router/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            Go Make Things — Shifting Focus on Route Change with React Router
          </a>
        </li>
        <li>
          <a href="https://jshakespeare.com/accessible-route-change-react-router-autofocus-heading/" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            James Shakespeare — Making Route Changes Accessible with an Autofocusing h1
          </a>
        </li>
        <li>
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            WCAG 2.1 — Understanding Success Criterion 2.4.3: Focus Order
          </a>
        </li>
      </ul>
    </div>
  )
}
