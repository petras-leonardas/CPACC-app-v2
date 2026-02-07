export function ActionOrientedButtonLabelsArticle() {
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
        Action-oriented button labels
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Button labels are one of the smallest pieces of UI copy, yet they carry outsized weight. A well-chosen label tells the user exactly what will happen next. A vague one forces them to guess. This article documents why we chose action-oriented labels for our test flow buttons, how major design systems approach this problem, and why the distinction between buttons and links matters for accessibility.
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
        Our test view has three key interactive controls:
      </p>

      <ol style={{ fontSize: '1.125rem', lineHeight: '1.75', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li style={{ marginBottom: '0.5rem' }}>A primary button to lock in the user's answer.</li>
        <li style={{ marginBottom: '0.5rem' }}>A secondary button to defer a question for later.</li>
        <li style={{ marginBottom: '0.5rem' }}>A secondary button to permanently skip a question the user cannot answer.</li>
      </ol>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The original labels were <strong>"Submit Answer"</strong>, <strong>"Skip Question"</strong>, and <strong>"I don't know"</strong>. While functional, each had issues:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Old label</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Problem</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '40%' }}>Type of issue</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Submit Answer</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Submit" is a legacy form verb that describes what the <em>system</em> does, not what the <em>user</em> achieves. It also implies immediate processing, but our flow defers results until the end.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              System-centric language; misleading mental model
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Skip Question</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Skip" focuses on avoidance rather than progress. It doesn't communicate that the question will return later in the queue. "Question" is redundant — the user can already see it.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Avoidance framing; redundant object noun
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>I don't know</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              This is a <em>state declaration</em>, not an action. It describes how the user feels, not what clicking the button will do. In a study context, it can feel discouraging.
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Not action-oriented; negative emotional framing
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
        What the research says
      </h2>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The verb-first principle
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Every major design system and UX research body converges on the same core rule: <strong>button labels should lead with a verb that describes the action the button performs</strong>. This is not a stylistic preference — it directly impacts usability, task completion rates, and accessibility.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Nielsen Norman Group's research on UI copy found that clear, action-oriented labels increase task completion rates by up to 23% in usability studies, and users spend 40% less time processing button purpose when labels use action verbs. Their guidance is explicit: <em>"Lead with verbs or verb phrases that clearly outline what will happen after the command is selected"</em> and <em>"Labels should clearly describe what the button will do, while being substantial and succinct enough to stand alone. Avoid generic labels."</em>
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        How major design systems approach button labels
      </h3>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Design system</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '80%' }}>Guidance</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>GOV.UK</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <em>"Write button text in sentence case, describing the action it performs."</em> Examples: "Save and continue", "Accept and send", "Add another". The UK Government Design System explicitly lists approved verb-first labels for common actions, treating button copy as a first-class design decision.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Carbon (IBM)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <em>"Button labels should clearly indicate the action of the button. Use active verbs, such as Add or Delete."</em> IBM maintains a comprehensive action labels glossary defining the exact verb to use for every common UI action (Add, Apply, Approve, Cancel, Clear, Close, Confirm, Create, Delete, etc.), ensuring consistency across all products.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material Design (Google)</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <em>"Buttons have label text that describes the action that will occur when the user interacts with it."</em> Material emphasizes that labels must predict the outcome of the interaction, not merely name the control.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Atlassian</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Recommends the <em>"verb + preposition + object"</em> format (e.g., "Move to trash", "Add to board"), keeping labels between 3–6 words. Action labels should describe outcomes, not interface mechanics.
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#1e40af' }}>
          The pattern across all design systems
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          Every system agrees: button labels should be <strong>verb-led</strong>, <strong>action-oriented</strong>, <strong>specific to the outcome</strong>, and written in <strong>sentence case</strong>. No major design system recommends noun-only labels, state declarations, or title case for buttons.
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
        Why this matters for screen reader users
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        When a screen reader encounters a button, it announces the element's role and its accessible name. For example:
      </p>

      <div style={{ 
        background: '#f9fafb', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        marginBottom: '1.5rem',
        fontFamily: 'monospace',
        fontSize: '0.95rem',
        lineHeight: '1.8'
      }}>
        <div>&ldquo;<strong>Confirm answer</strong>, button&rdquo; &mdash; the user knows exactly what will happen</div>
        <div>&ldquo;<strong>Come back later</strong>, button&rdquo; &mdash; the user understands the question will return</div>
        <div>&ldquo;<strong>Pass</strong>, button&rdquo; &mdash; a clear, neutral action</div>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Compare this to the old labels:
      </p>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '2rem',
        fontFamily: 'monospace',
        fontSize: '0.95rem',
        lineHeight: '1.8'
      }}>
        <div>&ldquo;<strong>Submit Answer</strong>, button&rdquo; &mdash; submit what? to where? is there immediate feedback?</div>
        <div>&ldquo;<strong>I don't know</strong>, button&rdquo; &mdash; this is a statement, not an action. What does clicking it <em>do</em>?</div>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Screen reader users frequently navigate by listing all buttons on a page (using a rotor or elements list). In this mode, buttons are presented as a flat list, stripped of their surrounding context. A label like "I don't know" is meaningless in isolation — the user has no idea which question it refers to or what action it triggers. An action verb like "Pass" is immediately clear regardless of context.
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        This aligns with <strong>WCAG 2.4.6 — Headings and Labels (Level AA)</strong>: <em>"Labels describe topic or purpose."</em> A button labelled with an action verb inherently describes its purpose. A button labelled with a state declaration ("I don't know") describes the user's feeling, not the button's function.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Buttons vs links: the semantic divide
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        A related but equally important principle is knowing <em>when to use a button at all</em>. The HTML specification draws a clear line:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '15%' }}>Element</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Purpose</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Keyboard behavior</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Screen reader announcement</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;button&gt;</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Performs an <strong>action</strong> on the current page (submit, toggle, delete, confirm)
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Activated by both <kbd>Enter</kbd> and <kbd>Space</kbd>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              &ldquo;[label], button&rdquo;
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;a href&gt;</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <strong>Navigates</strong> to a new page, section, or resource
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Activated by <kbd>Enter</kbd> only; supports right-click, middle-click, open-in-new-tab
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              &ldquo;[label], link&rdquo;
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
        The "Settings" anti-pattern
      </h3>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Consider a common mistake: a button labelled <strong>"Settings"</strong> that navigates the user to a settings page.
      </p>

      <div style={{ 
        background: '#fef2f2', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #fca5a5',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#991b1b' }}>
          &#10007; Incorrect: button used for navigation
        </h4>
        <pre style={{ 
          background: '#1f2937', 
          color: '#f9fafb', 
          padding: '1rem', 
          borderRadius: '0.375rem', 
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          margin: '0'
        }}>
{`<button onclick="window.location='/settings'">Settings</button>`}
        </pre>
        <ul style={{ fontSize: '1rem', lineHeight: '1.75', marginTop: '0.75rem', marginBottom: '0', marginLeft: '1.5rem' }}>
          <li>Screen reader announces "Settings, button" — user expects an action, not navigation</li>
          <li><kbd>Space</kbd> activates it, but the result is a page change — breaking user expectations</li>
          <li>Right-click, middle-click, and "open in new tab" all break</li>
          <li>"Settings" is a noun, not a verb — it describes a destination, not an action</li>
        </ul>
      </div>

      <div style={{ 
        background: '#dcfce7', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #86efac',
        marginBottom: '2rem'
      }}>
        <h4 style={{ marginTop: '0', marginBottom: '0.75rem', fontSize: '1.125rem', fontWeight: '600', color: '#166534' }}>
          &#10003; Correct: link used for navigation
        </h4>
        <pre style={{ 
          background: '#1f2937', 
          color: '#f9fafb', 
          padding: '1rem', 
          borderRadius: '0.375rem', 
          overflow: 'auto',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          margin: '0'
        }}>
{`<a href="/settings">Settings</a>`}
        </pre>
        <ul style={{ fontSize: '1rem', lineHeight: '1.75', marginTop: '0.75rem', marginBottom: '0', marginLeft: '1.5rem' }}>
          <li>Screen reader announces "Settings, link" — user expects navigation</li>
          <li>All native link behaviors work (right-click, open-in-new-tab, browser history)</li>
          <li>A noun label is appropriate here because links describe <em>destinations</em></li>
        </ul>
      </div>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The A11Y Collective summarises it well: <em>"If it triggers an action, it should be a button. The semantics matter."</em> And conversely: <em>"If clicking the element will change the URL or redirect the user, it's a link. Full stop."</em>
      </p>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        This is why a button should always be labelled with a <strong>verb</strong> (it does something) while a link can be labelled with a <strong>noun</strong> (it goes somewhere). Using a noun on a button or a verb like "Click here" on a link violates both semantic HTML expectations and assistive technology announcements.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        More examples of the semantic divide
      </h3>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Scenario</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Correct element</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '35%' }}>Label</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Delete an item from a list</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}><code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;button&gt;</code> — performs an action</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"Delete item" (verb + object)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Navigate to user profile</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}><code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;a href&gt;</code> — changes page</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"Profile" or "View profile" (destination)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Open a modal dialog</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}><code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;button&gt;</code> — triggers UI change</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"Edit settings" (verb + object)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Go to documentation</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}><code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;a href&gt;</code> — navigates away</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"Documentation" or "Read the docs" (destination)</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Submit a form</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}><code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;button&gt;</code> — processes data</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>"Save and continue" (verb + outcome)</td>
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
        Our decision
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Applying these principles to our test flow, we changed the labels as follows:
      </p>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Before</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>After</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '60%' }}>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Submit Answer</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Confirm answer &rarr;</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              "Confirm" accurately describes the user's action — they are locking in their choice. Unlike "submit," it doesn't imply immediate processing or feedback. The arrow indicates forward progression. Written in sentence case per GOV.UK guidelines.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb', background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>Skip Question</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Come back later</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Communicates that the question will return — reducing anxiety about missing it. Focuses on the positive outcome (you'll get another chance) rather than avoidance (skipping). Removes the redundant "question" noun.
            </td>
          </tr>
          <tr style={{ background: '#f0fdf4' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>I don't know</td>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Pass</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Converts a self-judgment statement into a neutral, familiar action. "Pass" is widely understood from quiz and game contexts. It's concise, non-judgmental, and makes sense in isolation when listed in a screen reader's button list.
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
        WCAG compliance
      </h2>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1e40af' }}>
          WCAG 2.4.6 — Headings and Labels (Level AA)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          <em>"Headings and labels describe topic or purpose."</em> Action-oriented button labels inherently satisfy this criterion because they describe the button's purpose through the action it performs. A label like "Confirm answer" directly communicates purpose; "I don't know" does not.
        </p>
      </div>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1e40af' }}>
          WCAG 4.1.2 — Name, Role, Value (Level A)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          <em>"For all user interface components, the name and role can be programmatically determined."</em> Using the correct semantic element (button for actions, link for navigation) ensures that the role matches the behavior. Using a button for navigation (the "Settings" anti-pattern) violates this criterion because the announced role ("button") misrepresents the actual behavior (navigation).
        </p>
      </div>

      <div style={{ 
        background: '#eff6ff', 
        padding: '1.5rem', 
        borderRadius: '0.5rem',
        border: '2px solid #3b82f6',
        marginBottom: '2rem'
      }}>
        <h3 style={{ marginTop: '0', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: '600', color: '#1e40af' }}>
          WCAG 2.1.1 — Keyboard (Level A)
        </h3>
        <p style={{ fontSize: '1.125rem', lineHeight: '1.75', margin: '0' }}>
          Buttons and links have different keyboard activation patterns. Buttons respond to both <kbd>Enter</kbd> and <kbd>Space</kbd>; links respond only to <kbd>Enter</kbd>. Using the wrong element means keyboard users encounter unexpected behavior — pressing <kbd>Space</kbd> on a link-disguised-as-button scrolls the page instead of activating the control.
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
        Testing checklist
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
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Screen reader button list:</strong> Do all buttons make sense when listed out of context (VoiceOver rotor / NVDA elements list)?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Verb-first labels:</strong> Does every button label lead with an action verb or clearly imply an action?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Sentence case:</strong> Are all button labels in sentence case (only first word capitalised)?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Semantic correctness:</strong> Are all action triggers using <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;button&gt;</code> and all navigational elements using <code style={{ background: '#f3f4f6', padding: '0.15rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>&lt;a href&gt;</code>?
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>No state declarations:</strong> Are there any buttons labelled with feelings or states rather than actions?
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>&#9744;</span>
            <strong>Outcome clarity:</strong> Can a user predict what will happen before clicking each button?
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
        References
      </h2>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>GOV.UK Design System — Button component:</strong>{' '}
          <a href="https://design-system.service.gov.uk/components/button/" style={{ color: '#2563eb' }}>design-system.service.gov.uk/components/button</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Write button text in sentence case, describing the action it performs."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Carbon Design System (IBM) — Action Labels:</strong>{' '}
          <a href="https://carbondesignsystem.com/guidelines/content/action-labels/" style={{ color: '#2563eb' }}>carbondesignsystem.com/guidelines/content/action-labels</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            Comprehensive glossary of approved action verbs for UI labels.
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Material Design — Buttons:</strong>{' '}
          <a href="https://m3.material.io/components/buttons/guidelines" style={{ color: '#2563eb' }}>m3.material.io/components/buttons/guidelines</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Buttons have label text that describes the action that will occur."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Nielsen Norman Group — UI Copy:</strong>{' '}
          <a href="https://www.nngroup.com/articles/ui-copy/" style={{ color: '#2563eb' }}>nngroup.com/articles/ui-copy</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Lead with verbs or verb phrases that clearly outline what will happen."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Nielsen Norman Group — Button States:</strong>{' '}
          <a href="https://www.nngroup.com/articles/button-states-communicate-interaction/" style={{ color: '#2563eb' }}>nngroup.com/articles/button-states-communicate-interaction</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "Labels should clearly describe what the button will do. Avoid generic labels."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>The A11Y Collective — Buttons vs Links:</strong>{' '}
          <a href="https://www.a11y-collective.com/blog/button-vs-link/" style={{ color: '#2563eb' }}>a11y-collective.com/blog/button-vs-link</a>
          <br /><span style={{ color: '#6b7280', fontSize: '1rem' }}>
            "If it triggers an action, it should be a button. If clicking will change the URL, it's a link."
          </span>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>WCAG 2.4.6 — Headings and Labels (Level AA):</strong>{' '}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html" style={{ color: '#2563eb' }}>w3.org/WAI/WCAG21/Understanding/headings-and-labels</a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>WCAG 4.1.2 — Name, Role, Value (Level A):</strong>{' '}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html" style={{ color: '#2563eb' }}>w3.org/WAI/WCAG21/Understanding/name-role-value</a>
        </li>
        <li style={{ marginBottom: '0' }}>
          <strong>WCAG 2.1.1 — Keyboard (Level A):</strong>{' '}
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html" style={{ color: '#2563eb' }}>w3.org/WAI/WCAG21/Understanding/keyboard</a>
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
        Summary
      </h2>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          Button labels should lead with <strong>action verbs</strong> that describe what clicking will do — not system jargon ("submit"), not state declarations ("I don't know"), not nouns ("settings").
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Every major design system (GOV.UK, Carbon, Material, Atlassian) converges on verb-led, sentence-case button labels.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Screen reader users navigate by button lists — labels must be meaningful in isolation.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Buttons are for <strong>actions</strong>; links are for <strong>navigation</strong>. Using the wrong element creates keyboard behavior mismatches and misleading screen reader announcements.
        </li>
        <li style={{ marginBottom: '0' }}>
          In a learning context, positive, action-oriented language ("Come back later", "Pass") is preferable to negative framing ("I don't know", "Skip") because it encourages continued engagement.
        </li>
      </ul>
    </div>
  )
}
