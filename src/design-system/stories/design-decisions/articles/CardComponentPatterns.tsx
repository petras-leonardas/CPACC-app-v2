export function CardComponentPatternsArticle() {
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
        Card component patterns
      </h1>
      
      <p style={{ 
        fontSize: '1.25rem', 
        color: '#6b7280', 
        marginBottom: '3rem',
        lineHeight: '1.75'
      }}>
        Cards are flexible containers used to group related information together. Because they are used for different tasks—like reading info, clicking a link, or making a choice—it is important to use the right version to keep the experience accessible for everyone.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        The challenge with card interactions
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        One single component cannot handle every interaction type. Using the wrong HTML structure can break browser features like "open in new tab" or confuse people who use screen readers. To solve this, we split cards into two distinct categories based on how a user interacts with them.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '2px solid #e5e7eb' }} />

      <h2 style={{ 
        fontSize: '2rem', 
        fontWeight: '600', 
        marginTop: '2.5rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Component types
      </h2>

      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse',
        marginBottom: '2rem',
        fontSize: '1rem'
      }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Component</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Primary use</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>HTML element</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '25%' }}>Interaction type</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Card</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Static info or navigation
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>&lt;div&gt;</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Non-interactive or Link
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>SelectableCard</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Choosing an option
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace' }}>&lt;button&gt;</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Selection (Toggle)
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
        1. Card
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The standard <strong>Card</strong> is a visual container. It is a "box" for content. If the entire card needs to lead to another page, we wrap this container in a link.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        When to use this component
      </h3>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          To group static text and images.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          As a container for other interactive elements like buttons or links.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          For navigation when the whole card is clickable.
        </li>
      </ul>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Card properties
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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Type</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '55%' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>interactive</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>boolean</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              When true, adds hover and active visual states. Use this when the card is wrapped in a link.
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
        Design "do's and don'ts"
      </h3>

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
          <h4 style={{ 
            marginTop: '0', 
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#166534'
          }}>
            Do
          </h4>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>✅ Wrap the card in a <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;Link&gt;</code> for navigation.</li>
            <li style={{ marginBottom: '0.75rem' }}>✅ Use <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>interactive</code> to show users the card is clickable.</li>
          </ul>
        </div>

        <div style={{ 
          background: '#fee2e2', 
          padding: '1.5rem', 
          borderRadius: '0.5rem',
          border: '2px solid #fca5a5'
        }}>
          <h4 style={{ 
            marginTop: '0', 
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#991b1b'
          }}>
            Don't
          </h4>
          <ul style={{ marginLeft: '1.25rem', marginBottom: '0', fontSize: '1rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.75rem' }}>❌ Use a <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>&lt;button&gt;</code> to navigate to a new page.</li>
            <li style={{ marginBottom: '0.75rem' }}>❌ Put a button inside a card that is already a link.</li>
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
        2. SelectableCard
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        The <strong>SelectableCard</strong> is used when a user needs to pick an option, like choosing a pricing plan or selecting a category. It acts like a large, stylized radio button or checkbox.
      </p>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        When to use this component
      </h3>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          When a user needs to select or deselect an item.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          In forms where a visual "card" represents a choice.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          When you need to track a "pressed" or "checked" state.
        </li>
      </ul>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        SelectableCard properties
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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '20%' }}>Type</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '55%' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>selected</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>boolean</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Controls the visual selection state and sets aria-pressed.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>onClick</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>function</code>
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              The action that happens when the user clicks or taps the card.
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
        Accessibility requirements
      </h3>

      <ul style={{ 
        fontSize: '1.125rem', 
        lineHeight: '1.75',
        marginLeft: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Semantic Role:</strong> Uses a <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>&lt;button&gt;</code> element so screen readers identify it as an action.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>State Announcement:</strong> Uses <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.375rem', fontFamily: 'monospace', fontSize: '1rem' }}>aria-pressed</code> to tell users if the card is currently selected.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Keyboard Support:</strong> Must be reachable via the Tab key and triggered by Space or Enter.
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
        Competitive analysis
      </h2>

      <p style={{ fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
        Our approach prioritizes clean HTML semantics compared to other industry leaders.
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
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '30%' }}>Approach</th>
            <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', width: '45%' }}>Rationale</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>IBM Carbon</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Separate components
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Very similar to our approach; clear and accessible.
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Atlassian</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Props for everything
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Flexible, but can lead to "nested interactive" errors.
            </td>
          </tr>
          <tr>
            <td style={{ padding: '1rem', verticalAlign: 'top', fontWeight: '600' }}>Material Design</td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Composition
            </td>
            <td style={{ padding: '1rem', verticalAlign: 'top' }}>
              Relies on the developer to wrap elements correctly every time.
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
        Implementation checklist
      </h2>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Interaction rules
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
            Use <strong>Card</strong> if the user is going to a new URL.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Use <strong>SelectableCard</strong> if the user is staying on the page to make a choice.
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Ensure focus indicators (outlines) are clearly visible when using a keyboard.
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Never place a "Delete" or "Edit" button inside a card that is already a link.
          </li>
        </ul>
      </div>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Screen reader checks
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
            Navigation cards are announced as "Link."
          </li>
          <li style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            Selection cards are announced as "Button" and mention if they are "Pressed."
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            The text inside the card provides a clear label for the action.
          </li>
        </ul>
      </div>

      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600', 
        marginTop: '2rem',
        marginBottom: '1rem',
        color: '#111827'
      }}>
        Browser behavior
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
            Right-click "Open in new tab" works for navigation cards.
          </li>
          <li style={{ marginBottom: '0', paddingLeft: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '0' }}>☐</span>
            The browser's "Back" button works as expected after navigating.
          </li>
        </ul>
      </div>
    </div>
  )
}
