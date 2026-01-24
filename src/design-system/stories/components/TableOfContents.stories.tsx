import type { Meta, StoryObj } from '@storybook/react'
import { TableOfContents } from '../../components/TableOfContents/TableOfContents'
import { useState } from 'react'

const meta = {
  title: 'Components/TableOfContents',
  component: TableOfContents,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'On-page navigation component for jumping to different sections within a page. Commonly used in documentation and long-form content to improve navigation and user experience.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title for the table of contents',
      table: {
        defaultValue: { summary: '"On this page"' },
      },
    },
    items: {
      control: 'object',
      description: 'Array of navigation items',
    },
    activeId: {
      control: 'text',
      description: 'ID of the currently active (visible) section',
    },
    onItemClick: {
      action: 'clicked',
      description: 'Callback fired when an item is clicked',
    },
  },
} satisfies Meta<typeof TableOfContents>

export default meta
type Story = StoryObj<typeof meta>

// Sample items representing a typical topic page
const sampleItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'medical-model', label: 'Medical model' },
  { id: 'social-model', label: 'Social model' },
  { id: 'biopsychosocial-model', label: 'Biopsychosocial model' },
  { id: 'economic-model', label: 'Economic model' },
  { id: 'functional-solutions-model', label: 'Functional solutions model' },
  { id: 'social-identity-model', label: 'Social identity or cultural affiliation model' },
  { id: 'charity-model', label: 'Charity model' },
  { id: 'conclusion', label: 'Conclusion' },
  { id: 'key-takeaways', label: 'Key takeaways' },
]

/**
 * Default table of contents showing typical page sections.
 * Active state shows navy background, white text, and orange left border.
 */
export const Default: Story = {
  args: {
    title: 'On this page',
    items: sampleItems,
    activeId: 'medical-model',
  },
}

/**
 * Active state styling demonstration.
 * All active items use navy background with white text and orange border.
 */
export const ActiveState: Story = {
  args: {
    title: 'On this page',
    items: sampleItems,
    activeId: 'key-takeaways',
  },
}

/**
 * Interactive example - click items to see active state change
 */
const InteractiveDemo = () => {
  const [activeId, setActiveId] = useState('overview')
  
  return (
    <TableOfContents
      title="On this page"
      items={sampleItems}
      activeId={activeId}
      onItemClick={(id) => {
        setActiveId(id)
        console.log('Clicked:', id)
      }}
    />
  )
}

export const Interactive: Story = {
  render: () => <InteractiveDemo />,
}

/**
 * Keyboard Navigation & Accessibility
 * 
 * The TableOfContents component implements comprehensive keyboard navigation
 * following WCAG 2.1 Level AA guidelines and WAI-ARIA authoring practices.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div style={{ 
        padding: '1.5rem',
        backgroundColor: '#f9fafb',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
          Keyboard Navigation Guide
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <strong style={{ color: '#F39C52' }}>Tab</strong>
            <p style={{ margin: '0.25rem 0 0', color: '#6b7280' }}>
              Navigate into and out of the Table of Contents
            </p>
          </div>
          
          <div>
            <strong style={{ color: '#F39C52' }}>↑ / ↓ Arrow Keys</strong>
            <p style={{ margin: '0.25rem 0 0', color: '#6b7280' }}>
              Move focus between navigation items
            </p>
          </div>
          
          <div>
            <strong style={{ color: '#F39C52' }}>Home</strong>
            <p style={{ margin: '0.25rem 0 0', color: '#6b7280' }}>
              Jump to the first item
            </p>
          </div>
          
          <div>
            <strong style={{ color: '#F39C52' }}>End</strong>
            <p style={{ margin: '0.25rem 0 0', color: '#6b7280' }}>
              Jump to the last item
            </p>
          </div>
          
          <div>
            <strong style={{ color: '#F39C52' }}>Enter / Space</strong>
            <p style={{ margin: '0.25rem 0 0', color: '#6b7280' }}>
              Activate the focused item (scrolls to section)
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        padding: '1.5rem',
        backgroundColor: '#eff6ff',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        borderLeft: '4px solid #3b82f6',
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1e40af' }}>
          Accessibility Features
        </h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#1e40af' }}>
          <li>Semantic <code>&lt;nav&gt;</code> landmark with ARIA label</li>
          <li>Skip link for quick access (first tab stop on page)</li>
          <li>Proper focus management with visible focus indicators</li>
          <li>Screen reader announcements for active section</li>
          <li>High contrast focus ring (orange) meets WCAG contrast requirements</li>
          <li>Dark mode support with proper contrast ratios</li>
        </ul>
      </div>

      <div style={{ 
        padding: '1.5rem',
        backgroundColor: '#fefce8',
        borderRadius: '0.5rem',
        borderLeft: '4px solid #eab308',
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem', color: '#854d0e' }}>
          Screen Reader Support
        </h4>
        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#854d0e' }}>
          <li><strong>Landmark Navigation:</strong> Press <kbd>D</kbd> (NVDA/JAWS) to jump between landmarks</li>
          <li><strong>Heading Navigation:</strong> Press <kbd>H</kbd> to navigate by headings</li>
          <li><strong>Skip Link:</strong> First tab stop announces "Skip to table of contents"</li>
          <li><strong>Active State:</strong> Announced as "active" or "selected" by screen readers</li>
        </ul>
      </div>

      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: '2rem 0 1rem' }}>
        Try It Out
      </h4>
      <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
        Use your keyboard to navigate this example:
      </p>
      <InteractiveDemo />
    </div>
  ),
}
