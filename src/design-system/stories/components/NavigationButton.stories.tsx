import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { NavigationButton } from '../../components/NavigationButton/NavigationButton'

/**
 * NavigationButton is used for topic-level navigation (Previous/Next).
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
 * ## Note
 * This component is for **navigation actions only**. It should not be used
 * for displaying current state or non-interactive information.
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
      description: 'Click handler for navigation',
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
 * Previous button - icon on the left, text aligned left
 */
export const Previous: Story = {
  args: {
    direction: 'previous',
    label: 'Previous',
    title: 'Medical model',
    icon: <ChevronLeft />,
    'aria-label': 'Navigate to previous topic: Medical model',
  },
}

/**
 * Next button - icon on the right, text aligned right
 */
export const Next: Story = {
  args: {
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
  args: {},
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
      <NavigationButton
        direction="previous"
        label="Previous"
        title="Medical model"
        icon={<ChevronLeft />}
        onClick={() => console.log('Previous clicked')}
      />
      <NavigationButton
        direction="next"
        label="Next"
        title="Social model"
        icon={<ChevronRight />}
        onClick={() => console.log('Next clicked')}
      />
    </div>
  ),
}

/**
 * Domain navigation example with longer titles
 */
export const DomainTransition: Story = {
  args: {},
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <NavigationButton
        direction="previous"
        label="Previous Domain"
        title="Disabilities, challenges & assistive technologies"
        icon={<ChevronLeft />}
      />
      <NavigationButton
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
  args: {},
  render: () => {
    const topics = [
      'Medical model',
      'Social model',
      'Biopsychosocial model',
      'Economic model',
    ]
    const [currentIndex, setCurrentIndex] = React.useState(1)

    return (
      <div className="space-y-6 max-w-2xl">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Interactive Demo:</strong> Click buttons to navigate through topics.
            The active state shows which topic you're currently on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentIndex > 0 && (
            <NavigationButton
              direction="previous"
              label="Previous"
              title={topics[currentIndex - 1]}
              icon={<ChevronLeft />}
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            />
          )}
          {currentIndex < topics.length - 1 && (
            <NavigationButton
              direction="next"
              label="Next"
              title={topics[currentIndex + 1]}
              icon={<ChevronRight />}
              onClick={() => setCurrentIndex(Math.min(topics.length - 1, currentIndex + 1))}
            />
          )}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Currently viewing: <strong>{topics[currentIndex]}</strong>
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
