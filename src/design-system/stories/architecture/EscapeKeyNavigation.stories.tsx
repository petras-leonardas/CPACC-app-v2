import type { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Architecture/Escape Key Navigation',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Guide: Story = {
  render: () => (
    <div style={{ 
      maxWidth: '900px', 
      margin: '0 auto', 
      padding: '3rem 2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      lineHeight: '1.6',
      color: '#1f2937'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '700' }}>
        Escape Key Navigation: Closing UI Elements
      </h1>
      
      <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '3rem' }}>
        Why the Escape key is essential for keyboard navigation and how to implement it across modals, sidebars, dropdowns, and other overlay UI patterns.
      </div>

      <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        What Is Escape Key Navigation?
      </h2>
      
      <p>The <strong>Escape key (Esc)</strong> is the universal "close" or "cancel" action for keyboard users. When pressed, it should dismiss overlays, close dialogs, exit expanded states, and cancel in-progress actions.</p>

      <p style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '1rem', borderLeft: '4px solid #3b82f6' }}>
        <strong>User Expectation:</strong> Just as clicking outside a modal closes it for mouse users, pressing Escape should close it for keyboard users. This parallel is critical for equivalent user experience.
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Why Escape Key Matters
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Keyboard Navigation Efficiency
      </h3>
      
      <p><strong>Without Escape key support:</strong></p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li>User must Tab through all interactive elements to find the close button</li>
        <li>In complex modals, this could be 10-20 Tab presses</li>
        <li>No quick way to dismiss unexpected or unwanted overlays</li>
      </ul>

      <p><strong>With Escape key support:</strong></p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li>One keypress instantly closes the overlay</li>
        <li>Matches muscle memory from desktop applications</li>
        <li>Provides a universal "undo" for opening dialogs</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. Preventing Keyboard Traps
      </h3>

      <p style={{ background: '#fee2e2', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #ef4444' }}>
        <strong>⚠️ Keyboard Trap:</strong> When focus gets stuck inside an element with no way to escape using the keyboard alone. This is a critical accessibility failure.
      </p>

      <p style={{ marginTop: '1.5rem' }}>
        <strong>Example scenario:</strong>
      </p>
      <ol style={{ marginLeft: '1.5rem' }}>
        <li>User opens a modal on mobile</li>
        <li>Modal has no visible close button (only overlay click)</li>
        <li>User is on keyboard navigation only</li>
        <li><strong>Result:</strong> User is trapped and cannot close the modal</li>
      </ol>

      <p>The Escape key provides a <strong>mandatory alternative</strong> to mouse-only close mechanisms.</p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Consistency with Desktop Applications
      </h3>

      <p>Escape key behavior is standardized across:</p>
      <ul style={{ marginLeft: '1.5rem' }}>
        <li><strong>Windows:</strong> Closes dialogs, cancels operations</li>
        <li><strong>macOS:</strong> Dismisses sheets, closes windows</li>
        <li><strong>Linux:</strong> Exits fullscreen, closes popups</li>
      </ul>

      <p style={{ marginTop: '1rem' }}>Users bring this learned behavior to the web. Not supporting Escape breaks their mental model.</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        WCAG Requirements
      </h2>

      <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '0.5rem', borderLeft: '4px solid #3b82f6' }}>
        <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.75rem', fontWeight: '600' }}>
          WCAG 2.1.2 - No Keyboard Trap (Level A)
        </h3>
        <blockquote style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic' }}>
          "If keyboard focus can be moved to a component using a keyboard interface, then focus can be moved away from that component using only a keyboard interface."
        </blockquote>
        <p style={{ marginBottom: '0.5rem' }}>
          The Escape key is explicitly mentioned as an acceptable method:
        </p>
        <blockquote style={{ borderLeft: '4px solid #3b82f6', paddingLeft: '1rem', margin: '1rem 0', fontStyle: 'italic' }}>
          "If it requires more than unmodified arrow or tab keys or other standard exit methods, users are advised of the method for moving focus away."
        </blockquote>
        <p style={{ marginBottom: '0' }}>
          <strong>Translation:</strong> If users can Tab into a modal/sidebar, they must be able to Tab (or use Escape) out of it.
        </p>
      </div>

      <p style={{ marginTop: '1.5rem' }}>
        <strong>Source:</strong> <a href="https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>WCAG 2.1.2 Understanding Document</a>
      </p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        UI Patterns That Need Escape Key Support
      </h2>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>UI Pattern</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Escape Behavior</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '600' }}>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}><strong>Modal Dialogs</strong></td>
            <td style={{ padding: '0.75rem' }}>Close modal, return focus</td>
            <td style={{ padding: '0.75rem' }}>✅ Critical</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}><strong>Sidebars (mobile)</strong></td>
            <td style={{ padding: '0.75rem' }}>Close sidebar, return focus</td>
            <td style={{ padding: '0.75rem' }}>✅ Critical</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}><strong>Dropdown Menus</strong></td>
            <td style={{ padding: '0.75rem' }}>Close dropdown, focus trigger</td>
            <td style={{ padding: '0.75rem' }}>✅ Critical</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}><strong>Search Overlays</strong></td>
            <td style={{ padding: '0.75rem' }}>Close search, clear input</td>
            <td style={{ padding: '0.75rem' }}>⚠️ Important</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}><strong>Tooltips</strong></td>
            <td style={{ padding: '0.75rem' }}>Dismiss tooltip</td>
            <td style={{ padding: '0.75rem' }}>⚠️ Important</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}><strong>Fullscreen Mode</strong></td>
            <td style={{ padding: '0.75rem' }}>Exit fullscreen</td>
            <td style={{ padding: '0.75rem' }}>✅ Critical</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '0.75rem' }}><strong>Image Lightbox</strong></td>
            <td style={{ padding: '0.75rem' }}>Close lightbox</td>
            <td style={{ padding: '0.75rem' }}>⚠️ Important</td>
          </tr>
        </tbody>
      </table>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        How Design Systems Implement Escape Key
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Material Design (Google)
        </h3>
        <p><strong>Philosophy:</strong> "Dialogs can be dismissed by pressing the Esc key."</p>
        <p style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Implementation:</strong> All Material-UI Dialog components include built-in Escape key handlers. No additional configuration needed.
        </p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<Dialog open={open} onClose={handleClose}>
  {/* Automatically closes on Escape */}
</Dialog>`}</pre>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> Google makes Escape key support automatic and non-optional for modal components.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Source:</strong> <a href="https://m3.material.io/components/dialogs/overview" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>Material Design - Dialogs</a>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Polaris (Shopify)
        </h3>
        <p><strong>Philosophy:</strong> "All overlays can be dismissed with the Escape key."</p>
        <p style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Implementation:</strong> Polaris provides a dedicated <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>KeypressListener</code> component for handling Escape.
        </p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<Modal open={active} onClose={handleClose}>
  <KeypressListener keyCode={Key.Escape} handler={handleClose} />
  {/* Modal content */}
</Modal>`}</pre>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> Shopify explicitly documents and recommends Escape key for all overlays, not just modals.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Source:</strong> <a href="https://polaris.shopify.com/components/overlays/modal" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>Polaris - Modal</a>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Chakra UI
        </h3>
        <p><strong>Philosophy:</strong> "Pressing Escape closes the modal."</p>
        <p style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Implementation:</strong> Chakra provides a <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>closeOnEsc</code> prop that defaults to <code style={{ background: 'rgba(0,0,0,0.1)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>true</code>.
        </p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true}>
  {/* Escape key automatically closes */}
</Modal>`}</pre>
        <p style={{ marginTop: '1rem' }}>You can disable it if needed (rare cases like unsaved form data):</p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<Modal closeOnEsc={false}>
  {/* User must click close button */}
</Modal>`}</pre>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> Make Escape key default behavior, only disable when absolutely necessary (e.g., unsaved changes warning).
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Radix UI
        </h3>
        <p><strong>Philosophy:</strong> "Pressing esc closes the component and returns focus."</p>
        <p style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Implementation:</strong> Radix primitives include Escape key handling and focus management out of the box.
        </p>
        <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      {/* Esc closes and returns focus automatically */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>`}</pre>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> Radix goes beyond just closing — it also restores focus to the element that triggered the dialog. This is the gold standard.
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Source:</strong> <a href="https://www.radix-ui.com/primitives/docs/components/dialog" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>Radix UI - Dialog</a>
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
          Atlassian Design System
        </h3>
        <p><strong>Philosophy:</strong> "Modals are dismissed by pressing Esc or clicking outside."</p>
        <p style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Documentation:</strong> Atlassian explicitly documents both methods (Escape key and click outside) as equal-priority dismissal mechanisms.
        </p>
        <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
          <strong>Best Practice:</strong> Always provide both mouse and keyboard dismissal methods. Never rely on only one.
        </p>
      </div>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Implementation Patterns
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        1. Basic Escape Key Handler
      </h3>

      <p><strong>Our Sidebar Implementation:</strong></p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`// Handle Escape key to close sidebar on mobile
useEffect(() => {
  if (!isOpen) return
  
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  return () => document.removeEventListener('keydown', handleEscape)
}, [isOpen, onClose])`}</pre>

      <p style={{ marginTop: '1.5rem' }}><strong>Key Points:</strong></p>
      <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
        <li>Only listen when the component is open (<code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>if (!isOpen) return</code>)</li>
        <li>Use <code style={{ background: '#f3f4f6', padding: '0.125rem 0.375rem', borderRadius: '0.25rem' }}>e.key === 'Escape'</code> for modern browsers</li>
        <li>Clean up event listener on unmount</li>
        <li>Call the close handler provided by the parent</li>
      </ul>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        2. With Focus Return
      </h3>

      <p>Advanced pattern that returns focus to the triggering element:</p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`const triggerRef = useRef<HTMLButtonElement>(null)

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose()
    // Return focus to trigger element
    triggerRef.current?.focus()
  }
}

return (
  <>
    <button ref={triggerRef} onClick={openModal}>
      Open Modal
    </button>
    {isOpen && <Modal onClose={handleEscape} />}
  </>
)`}</pre>

      <p style={{ background: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
        <strong>Best Practice:</strong> Always return focus to the element that opened the overlay. This maintains keyboard navigation context.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        3. Conditional Escape (Unsaved Changes)
      </h3>

      <p>Some dialogs should warn before closing:</p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    if (hasUnsavedChanges) {
      // Show confirmation dialog
      const confirm = window.confirm('You have unsaved changes. Close anyway?')
      if (confirm) {
        onClose()
      }
    } else {
      onClose()
    }
  }
}`}</pre>

      <p style={{ marginTop: '1rem' }}><strong>When to use:</strong></p>
      <ul style={{ marginLeft: '1.5rem' }}>
        <li>Forms with user input</li>
        <li>Text editors with unsaved content</li>
        <li>Multi-step wizards in progress</li>
      </ul>

      <p style={{ background: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', marginTop: '1rem' }}>
        <strong>⚠️ Warning:</strong> Use sparingly. Most overlays should close immediately on Escape without confirmation.
      </p>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        4. Multiple Overlay Layers
      </h3>

      <p>When multiple overlays are stacked, Escape should close the topmost one:</p>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.stopPropagation() // Prevent closing parent overlays
    onClose()
  }
}`}</pre>

      <p style={{ marginTop: '1rem' }}><strong>Behavior:</strong></p>
      <ol style={{ marginLeft: '1.5rem' }}>
        <li>User opens Modal A</li>
        <li>User opens Modal B from within Modal A</li>
        <li>Pressing Escape closes Modal B (only)</li>
        <li>Pressing Escape again closes Modal A</li>
      </ol>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Testing Escape Key Functionality
      </h2>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Manual Testing
      </h3>

      <ol style={{ marginLeft: '1.5rem', fontSize: '1rem', lineHeight: '1.75rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Open the overlay</strong> (modal, sidebar, dropdown)
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Press Escape</strong> — overlay should close immediately
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Check focus</strong> — focus should return to trigger element (if applicable)
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Test multiple times</strong> — should work consistently
        </li>
      </ol>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Screen Reader Testing
      </h3>

      <p><strong>VoiceOver (Mac):</strong></p>
      <ol style={{ marginLeft: '1.5rem' }}>
        <li>Open overlay</li>
        <li>Press Escape</li>
        <li>VoiceOver should announce the close action (e.g., "Dialog closed")</li>
      </ol>

      <p style={{ marginTop: '1.5rem' }}><strong>NVDA (Windows):</strong></p>
      <ol style={{ marginLeft: '1.5rem' }}>
        <li>Open overlay</li>
        <li>Press Escape</li>
        <li>NVDA should announce focus return</li>
      </ol>

      <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Automated Testing
      </h3>

      <pre style={{ background: '#1f2937', color: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', fontSize: '0.875rem', overflow: 'auto', marginTop: '1rem' }}>{`// Jest + React Testing Library
test('closes modal on Escape key', () => {
  const handleClose = jest.fn()
  render(<Modal isOpen={true} onClose={handleClose} />)
  
  fireEvent.keyDown(document, { key: 'Escape' })
  
  expect(handleClose).toHaveBeenCalledTimes(1)
})`}</pre>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Common Questions
      </h2>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Should all overlays close on Escape?
      </h3>
      <p><strong>Yes, with rare exceptions.</strong> The only time to prevent Escape closing is for critical workflows with unsaved changes. Even then, show a confirmation dialog rather than blocking Escape entirely.</p>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        What about mobile devices without Escape key?
      </h3>
      <p>Provide alternative close mechanisms: visible close button (×), swipe gesture, or tap outside the overlay. Escape key is for keyboard users specifically.</p>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Should Escape close tooltips?
      </h3>
      <p>Generally yes, especially for tooltips that appear on focus. This allows keyboard users to dismiss them quickly if they're obscuring content.</p>

      <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
        Can Escape cause data loss?
      </h3>
      <p>Only if implemented incorrectly. For forms with user input, add an "unsaved changes" check before closing. For read-only overlays, always allow immediate closing.</p>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Key Takeaways
      </h2>

      <ol style={{ marginLeft: '1.5rem', fontSize: '1.125rem', lineHeight: '1.75rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Escape key is required for WCAG 2.1.2 compliance</strong> to prevent keyboard traps
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>All major design systems support Escape key</strong> by default
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Modals, sidebars, and dropdowns must close on Escape</strong> for keyboard users
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <strong>Always return focus</strong> to the triggering element after closing
        </li>
        <li>
          <strong>Test with keyboard navigation</strong> to ensure consistent behavior
        </li>
      </ol>

      <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

      <h2 style={{ fontSize: '1.875rem', marginTop: '2rem', marginBottom: '1rem', fontWeight: '600' }}>
        Additional Resources
      </h2>

      <ul style={{ marginLeft: '1.5rem', fontSize: '1rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            WCAG 2.1.2: No Keyboard Trap
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            ARIA Authoring Practices: Dialog (Modal)
          </a>
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          <a href="https://www.a11yproject.com/posts/how-to-build-accessible-modal-dialogs/" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            A11Y Project: Accessible Modal Dialogs
          </a>
        </li>
        <li>
          <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets" target="_blank" rel="noopener" style={{ color: '#2563eb', textDecoration: 'underline' }}>
            MDN: Keyboard-navigable JavaScript Widgets
          </a>
        </li>
      </ul>

      <div style={{ background: '#353A56', color: '#ffffff', padding: '2rem', borderRadius: '0.5rem', marginTop: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginTop: '0', marginBottom: '1rem', fontWeight: '600' }}>
          Our Implementation
        </h2>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          We've implemented Escape key support that:
        </p>
        <ul style={{ listStyle: 'none', padding: '0', fontSize: '1rem', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li style={{ marginBottom: '0.5rem' }}>✓ Closes sidebar on mobile with Escape</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Only listens when overlay is open</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Cleans up event listeners properly</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Works consistently across browsers</li>
          <li style={{ marginBottom: '0.5rem' }}>✓ Prevents keyboard traps (WCAG 2.1.2)</li>
        </ul>
        <p style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0', fontWeight: '600', color: '#F39C52' }}>
          One keypress. No keyboard trap.
        </p>
      </div>
    </div>
  ),
}
