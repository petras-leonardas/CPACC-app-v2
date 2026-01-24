import type { Meta, StoryObj } from '@storybook/react'
import { Settings, Play, Pause, Heart, Share2, ArrowLeft, ChevronLeft, ChevronRight } from '../../icons'
import { Tooltip } from './Tooltip'
import { IconButton } from '../IconButton/IconButton'
import { Button } from '../Button/Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip position relative to trigger element',
    },
    delay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <IconButton icon={<Settings />} aria-label="Settings" />,
  },
}

export const Positions: Story = {
  render: () => (
    <div className="space-y-8 p-16">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Tooltip Positions
        </h3>
        <div className="flex items-center justify-center gap-12">
          <Tooltip content="Top position" position="top">
            <IconButton icon={<Settings />} aria-label="Settings" />
          </Tooltip>
          
          <Tooltip content="Bottom position" position="bottom">
            <IconButton icon={<Settings />} aria-label="Settings" />
          </Tooltip>
          
          <Tooltip content="Left position" position="left">
            <IconButton icon={<Settings />} aria-label="Settings" />
          </Tooltip>
          
          <Tooltip content="Right position" position="right">
            <IconButton icon={<Settings />} aria-label="Settings" />
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const WithIconButtons: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Media Controls with Tooltips
        </h3>
        <div className="flex gap-2">
          <Tooltip content="Play audio">
            <IconButton icon={<Play />} aria-label="Play" variant="ghost" />
          </Tooltip>
          <Tooltip content="Pause audio">
            <IconButton icon={<Pause />} aria-label="Pause" variant="ghost" />
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Action Bar with Tooltips
        </h3>
        <div className="flex gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <Tooltip content="Like this content">
            <IconButton icon={<Heart />} aria-label="Like" variant="ghost" />
          </Tooltip>
          <Tooltip content="Share with others">
            <IconButton icon={<Share2 />} aria-label="Share" variant="ghost" />
          </Tooltip>
          <Tooltip content="Settings">
            <IconButton icon={<Settings />} aria-label="Settings" variant="ghost" />
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Navigation with Tooltips
        </h3>
        <div className="flex gap-2">
          <Tooltip content="Go back" position="bottom">
            <IconButton icon={<ArrowLeft />} aria-label="Go back" variant="secondary" />
          </Tooltip>
          <Tooltip content="Previous page" position="bottom">
            <IconButton icon={<ChevronLeft />} aria-label="Previous" variant="secondary" />
          </Tooltip>
          <Tooltip content="Next page" position="bottom">
            <IconButton icon={<ChevronRight />} aria-label="Next" variant="secondary" />
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const WithRegularButtons: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Tooltips on Regular Buttons
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Tooltips can be used with any component, not just icon buttons.
        </p>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="This will start your exam">
            <Button variant="primary">Start Practice Exam</Button>
          </Tooltip>
          <Tooltip content="View your progress and study plan">
            <Button variant="secondary">View Study Plan</Button>
          </Tooltip>
          <Tooltip content="Return to the previous page">
            <Button variant="ghost">Cancel</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          With All Button Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Primary button">
            <IconButton icon={<Settings />} aria-label="Settings" variant="primary" />
          </Tooltip>
          <Tooltip content="Secondary button">
            <IconButton icon={<Settings />} aria-label="Settings" variant="secondary" />
          </Tooltip>
          <Tooltip content="Ghost button">
            <IconButton icon={<Settings />} aria-label="Settings" variant="ghost" />
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          With All Button Sizes
        </h3>
        <div className="flex items-center gap-4">
          <Tooltip content="Small size">
            <IconButton icon={<Settings />} aria-label="Settings" size="sm" />
          </Tooltip>
          <Tooltip content="Medium size">
            <IconButton icon={<Settings />} aria-label="Settings" size="md" />
          </Tooltip>
          <Tooltip content="Large size">
            <IconButton icon={<Settings />} aria-label="Settings" size="lg" />
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Smart Positioning
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Tooltips automatically adjust their position to stay within the viewport. Try hovering over buttons near the edges.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Near Left Edge
        </h3>
        <div className="flex justify-start">
          <Tooltip content="This tooltip won't overflow the left edge">
            <IconButton icon={<Settings />} aria-label="Settings" />
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Near Right Edge
        </h3>
        <div className="flex justify-end">
          <Tooltip content="This tooltip won't overflow the right edge">
            <IconButton icon={<Settings />} aria-label="Settings" />
          </Tooltip>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Long Tooltip Text
        </h3>
        <div className="flex justify-center">
          <Tooltip content="This is a very long tooltip that contains a lot of helpful information">
            <IconButton icon={<Settings />} aria-label="Settings" />
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const DarkModeComparison: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Toggle Dark Mode
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Tooltips use design system tokens to automatically adapt to dark mode with proper contrast.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Hover to See Tooltips
        </h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Settings">
            <IconButton icon={<Settings />} aria-label="Settings" variant="primary" />
          </Tooltip>
          <Tooltip content="Play">
            <IconButton icon={<Play />} aria-label="Play" variant="secondary" />
          </Tooltip>
          <Tooltip content="Like">
            <IconButton icon={<Heart />} aria-label="Like" variant="ghost" />
          </Tooltip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const CustomDelay: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Different Delay Times
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Tooltip content="No delay (0ms)" delay={0}>
              <IconButton icon={<Settings />} aria-label="Settings" />
            </Tooltip>
            <span className="text-sm text-gray-600 dark:text-gray-400">Instant (0ms delay)</span>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip content="Default delay (200ms)" delay={200}>
              <IconButton icon={<Play />} aria-label="Play" />
            </Tooltip>
            <span className="text-sm text-gray-600 dark:text-gray-400">Default (200ms delay)</span>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip content="Longer delay (500ms)" delay={500}>
              <IconButton icon={<Heart />} aria-label="Like" />
            </Tooltip>
            <span className="text-sm text-gray-600 dark:text-gray-400">Slower (500ms delay)</span>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-8 p-8 max-w-2xl">
      <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
          ♿ Accessibility Best Practices
        </h3>
        <div className="text-sm text-green-800 dark:text-green-200 space-y-2">
          <p><strong>Tooltips complement, not replace, accessibility labels:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Icon buttons still need <code className="bg-green-100 dark:bg-green-900 px-1 rounded">aria-label</code></li>
            <li>Tooltips are hidden from screen readers (visual enhancement only)</li>
            <li>Don't rely on tooltips for critical information</li>
            <li>Tooltips automatically hide on touch-only devices</li>
          </ul>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Example: Proper Usage
        </h3>
        <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`<Tooltip content="Open settings panel">
  <IconButton 
    icon={<Settings />} 
    aria-label="Settings"  {/* ✅ Still required! */}
  />
</Tooltip>`}
        </pre>
      </div>

      <div className="flex gap-4">
        <Tooltip content="Open settings panel">
          <IconButton icon={<Settings />} aria-label="Settings" />
        </Tooltip>
        <Tooltip content="Play audio content">
          <IconButton icon={<Play />} aria-label="Play" />
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
