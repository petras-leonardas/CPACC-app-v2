import type { Meta, StoryObj } from '@storybook/react'
import { Settings, Play, Pause, Heart, Share2, MoreVertical, X, Check, Plus } from '../../icons'
import { IconButton } from './IconButton'

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant - Primary (filled navy), Secondary (outlined navy), Ghost (transparent)',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Primary: Story = {
  args: {
    variant: 'primary',
    icon: <Settings />,
    'aria-label': 'Open settings',
    tooltip: 'Open settings',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    icon: <Settings />,
    'aria-label': 'Open settings',
    tooltip: 'Open settings',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    icon: <Settings />,
    'aria-label': 'Open settings',
    tooltip: 'Open settings',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    icon: <Settings />,
    'aria-label': 'Loading',
    tooltip: 'Loading...',
    loading: true,
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Brand Color Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <IconButton variant="primary" icon={<Settings />} aria-label="Settings" />
          <IconButton variant="secondary" icon={<Settings />} aria-label="Settings" />
          <IconButton variant="ghost" icon={<Settings />} aria-label="Settings" />
        </div>
      </div>

      <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🎨 Icon-Only Buttons
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Perfect for toolbars, media controls, and compact interfaces where space is limited.
          All variants maintain the same styling as regular buttons.
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Size Variants
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton size="sm" variant="primary" icon={<Settings />} aria-label="Settings" />
          <IconButton size="md" variant="primary" icon={<Settings />} aria-label="Settings" />
          <IconButton size="lg" variant="primary" icon={<Settings />} aria-label="Settings" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          All Variants in All Sizes
        </h3>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <IconButton size="sm" variant="primary" icon={<Play />} aria-label="Play" />
            <IconButton size="sm" variant="secondary" icon={<Play />} aria-label="Play" />
            <IconButton size="sm" variant="ghost" icon={<Play />} aria-label="Play" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton size="md" variant="primary" icon={<Play />} aria-label="Play" />
            <IconButton size="md" variant="secondary" icon={<Play />} aria-label="Play" />
            <IconButton size="md" variant="ghost" icon={<Play />} aria-label="Play" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <IconButton size="lg" variant="primary" icon={<Play />} aria-label="Play" />
            <IconButton size="lg" variant="secondary" icon={<Play />} aria-label="Play" />
            <IconButton size="lg" variant="ghost" icon={<Play />} aria-label="Play" />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Loading States
        </h3>
        <div className="flex flex-wrap gap-4">
          <IconButton variant="primary" icon={<Settings />} aria-label="Loading" loading />
          <IconButton variant="secondary" icon={<Settings />} aria-label="Loading" loading />
          <IconButton variant="ghost" icon={<Settings />} aria-label="Loading" loading />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Loading Sizes
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton size="sm" icon={<Settings />} aria-label="Loading" loading />
          <IconButton size="md" icon={<Settings />} aria-label="Loading" loading />
          <IconButton size="lg" icon={<Settings />} aria-label="Loading" loading />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Disabled States
        </h3>
        <div className="flex flex-wrap gap-4">
          <IconButton variant="primary" icon={<Settings />} aria-label="Settings" disabled />
          <IconButton variant="secondary" icon={<Settings />} aria-label="Settings" disabled />
          <IconButton variant="ghost" icon={<Settings />} aria-label="Settings" disabled />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8 p-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Media Controls
        </h3>
        <div className="flex gap-2 items-center">
          <IconButton variant="ghost" size="sm" icon={<Play />} aria-label="Play" />
          <IconButton variant="ghost" size="sm" icon={<Pause />} aria-label="Pause" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Action Bar
        </h3>
        <div className="flex gap-2 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <IconButton variant="ghost" icon={<Heart />} aria-label="Like" />
          <IconButton variant="ghost" icon={<Share2 />} aria-label="Share" />
          <IconButton variant="ghost" icon={<MoreVertical />} aria-label="More options" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Modal Actions
        </h3>
        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <span className="text-gray-900 dark:text-gray-100">Are you sure?</span>
          <div className="flex gap-2">
            <IconButton variant="ghost" size="sm" icon={<X />} aria-label="Cancel" />
            <IconButton variant="primary" size="sm" icon={<Check />} aria-label="Confirm" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Floating Action Button
        </h3>
        <div className="relative h-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <IconButton 
            variant="primary" 
            size="lg" 
            icon={<Plus />} 
            aria-label="Add new item"
            className="absolute bottom-4 right-4"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const FocusStates: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          🔍 Try Keyboard Navigation
        </h3>
        <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
          Press Tab to navigate between icon buttons. Notice the orange focus ring using your brand accent color.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <IconButton variant="primary" icon={<Play />} aria-label="Play" />
        <IconButton variant="secondary" icon={<Pause />} aria-label="Pause" />
        <IconButton variant="ghost" icon={<Settings />} aria-label="Settings" />
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
          Use the Storybook toolbar to toggle dark mode and see how icon buttons adapt automatically with WCAG AAA compliance.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          All Variants (Try Dark Mode)
        </h3>
        <div className="flex flex-wrap gap-4">
          <IconButton variant="primary" icon={<Settings />} aria-label="Settings" />
          <IconButton variant="secondary" icon={<Play />} aria-label="Play" />
          <IconButton variant="ghost" icon={<Heart />} aria-label="Like" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
          ♿ Accessibility Requirements
        </h3>
        <div className="text-sm text-green-800 dark:text-green-200 space-y-2">
          <p><strong>Icon buttons require an aria-label</strong> for screen reader users who can't see the icon. Additionally, icon buttons have a built-in tooltip feature that can be used to provide a clear and concise description of the button's purpose.</p>
          <pre className="bg-green-100 dark:bg-green-900 p-3 rounded mt-2 overflow-x-auto">
{`<IconButton 
  icon={<Settings />} 
  aria-label="Open settings"  // ✅ Required!
  tooltip="Open settings menu"
/>`}
          </pre>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Examples with Clear Labels
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <IconButton variant="primary" icon={<Play />} aria-label="Play audio" />
            <code className="text-sm text-gray-600 dark:text-gray-400">aria-label="Play audio"</code>
          </div>
          <div className="flex items-center gap-3">
            <IconButton variant="secondary" icon={<Share2 />} aria-label="Share this content" />
            <code className="text-sm text-gray-600 dark:text-gray-400">aria-label="Share this content"</code>
          </div>
          <div className="flex items-center gap-3">
            <IconButton variant="ghost" icon={<X />} aria-label="Close modal" />
            <code className="text-sm text-gray-600 dark:text-gray-400">aria-label="Close modal"</code>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
