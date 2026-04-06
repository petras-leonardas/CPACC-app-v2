import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { NavigationButton } from '../../components/NavigationButton/NavigationButton'

/**
 * NavigationButton is used for topic-level navigation (Previous/Next).
 * 
 * It renders as a semantic `<a>` element with an `href`, ensuring correct link
 * behaviour: right-click → "Open in new tab", crawlability, and the `link` role
 * announced to screen readers.
 * 
 * ## Design Principles
 * - Matches NavigationItem visual pattern for consistency
 * - Navy background + white text + orange border when used in navigation context
 * - Directional layout (icon left for previous, right for next)
 * - All colors from design tokens
 * - Dark mode support
 * 
 * ## Usage
 * Use this component for:
 * - Previous/Next topic navigation
 * - Domain transitions
 * - Any sequential content navigation
 * 
 * Always provide an `href` so the link is accessible and crawlable. Use `onClick`
 * with `e.preventDefault()` for SPA routing alongside the real `href`.
 */
const meta = {
  title: 'Components/NavigationButton',
  component: NavigationButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Navigation button for sequential topic/content navigation with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'Navigation destination URL',
    },
    direction: {
      control: 'select',
      options: ['previous', 'next'],
      description: 'Direction of navigation (affects icon placement)',
    },
    label: {
      control: 'text',
      description: 'Small label text (e.g., "Previous", "Next")',
    },
    title: {
      control: 'text',
      description: 'Main title text (topic name)',
    },
    active: {
      control: 'boolean',
      description: 'Whether this represents the current item',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for SPA navigation (call e.preventDefault() first)',
    },
  },
} satisfies Meta<typeof NavigationButton>

export default meta
type Story = StoryObj<typeof meta>

// Mock icon components
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

/**
 * Previous link - icon on the left, text aligned left
 */
export const Previous: Story = {
  args: {
    href: '/disabilities-challenges-assistive-technology/1a-theoretical-models',
    direction: 'previous',
    label: 'Previous',
    title: 'Medical model',
    icon: <ChevronLeft />,
    'aria-label': 'Navigate to previous topic: Medical model',
  },
}

/**
 * Next link - icon on the right, text aligned right
 */
export const Next: Story = {
  args: {
    href: '/disabilities-challenges-assistive-technology/1c-assistive-technology',
    direction: 'next',
    label: 'Next',
    title: 'Social model',
    icon: <ChevronRight />,
    'aria-label': 'Navigate to next topic: Social model',
  },
}


/**
 * Side by side comparison showing both directions
 */
export const Comparison: Story = {
  args: { direction: 'next', label: '', title: '' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <NavigationButton
        href="/disabilities-challenges-assistive-technology/1a-theoretical-models"
        direction="previous"
        label="Previous"
        title="Medical model"
        icon={<ChevronLeft />}
        onClick={(e) => { e.preventDefault(); console.log('Previous clicked') }}
      />
      <NavigationButton
        href="/disabilities-challenges-assistive-technology/1c-assistive-technology"
        direction="next"
        label="Next"
        title="Social model"
        icon={<ChevronRight />}
        onClick={(e) => { e.preventDefault(); console.log('Next clicked') }}
      />
    </div>
  ),
}

/**
 * Domain navigation example with longer titles
 */
export const DomainTransition: Story = {
  args: { direction: 'next', label: '', title: '' },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <NavigationButton
        href="/disabilities-challenges-assistive-technology"
        direction="previous"
        label="Previous Domain"
        title="Disabilities, challenges & assistive technologies"
        icon={<ChevronLeft />}
      />
      <NavigationButton
        href="/standards-laws-management-strategies"
        direction="next"
        label="Next Domain"
        title="Standards, laws & management strategies"
        icon={<ChevronRight />}
      />
    </div>
  ),
}

/**
 * Interactive demo showing all states
 */
export const InteractiveDemo: Story = {
  args: { direction: 'next', label: '', title: '' },
  render: () => {
    const topics = [
      { title: 'Medical model', id: '1a-theoretical-models' },
      { title: 'Social model', id: '1b-types-of-disabilities' },
      { title: 'Biopsychosocial model', id: '1c-assistive-technology' },
      { title: 'Economic model', id: '1d-disability-etiquette' },
    ]
    const [currentIndex, setCurrentIndex] = React.useState(1)

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Interactive Demo:</strong> Click links to navigate through topics.
            The active state shows which topic you're currently on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentIndex > 0 && (
            <NavigationButton
              href={`/disabilities-challenges-assistive-technology/${topics[currentIndex - 1].id}`}
              direction="previous"
              label="Previous"
              title={topics[currentIndex - 1].title}
              icon={<ChevronLeft />}
              onClick={(e) => { e.preventDefault(); setCurrentIndex(Math.max(0, currentIndex - 1)) }}
            />
          )}
          {currentIndex < topics.length - 1 && (
            <NavigationButton
              href={`/disabilities-challenges-assistive-technology/${topics[currentIndex + 1].id}`}
              direction="next"
              label="Next"
              title={topics[currentIndex + 1].title}
              icon={<ChevronRight />}
              onClick={(e) => { e.preventDefault(); setCurrentIndex(Math.min(topics.length - 1, currentIndex + 1)) }}
            />
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Currently viewing: <strong>{topics[currentIndex].title}</strong>
        </div>
      </div>
    )
  },
}

/**
 * Dark mode preview
 */
export const DarkMode: Story = {
  args: {
    href: '/disabilities-challenges-assistive-technology/1c-assistive-technology',
    direction: 'next',
    label: 'Next',
    title: 'Social model',
    icon: <ChevronRight />,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
}
