import type { Meta, StoryObj } from '@storybook/react'
import { ArrowUpRight } from '../../icons'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
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
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    leftIcon: {
      control: false,
      description: 'Icon to display before button text',
    },
    rightIcon: {
      control: false,
      description: 'Icon to display after button text (ArrowUpRight shown by default)',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Start Learning',
    rightIcon: <ArrowUpRight className="w-4 h-4" />,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Learn More',
    rightIcon: <ArrowUpRight className="w-4 h-4" />,
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancel',
    rightIcon: <ArrowUpRight className="w-4 h-4" />,
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Submitting...',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
}


export const RealWorldExamples: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="space-y-8 p-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Exam Actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="lg">
            Start Practice Exam
          </Button>
          <Button variant="secondary" size="lg">
            View Study Plan
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Navigation
        </h3>
        <div className="flex justify-between gap-3">
          <Button variant="secondary">
            ← Previous Topic
          </Button>
          <Button variant="primary">
            Next Topic →
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Form Actions
        </h3>
        <div className="flex justify-end gap-3">
          <Button variant="ghost">
            Cancel
          </Button>
          <Button variant="primary" loading>
            Saving...
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Full Width CTA
        </h3>
        <Button variant="primary" size="lg" fullWidth>
          Take Practice Exam Now
        </Button>
      </div>

    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const FocusStates: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          🔍 Try Keyboard Navigation
        </h3>
        <p className="text-sm text-orange-800 dark:text-orange-200 mb-4">
          Press Tab to navigate between buttons. Notice the orange focus ring using your brand accent color (#E67E22).
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Tab to Focus</Button>
        <Button variant="secondary">Second Button</Button>
        <Button variant="ghost">Third Button</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const AllSizes: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800 mb-8">
        <h3 className="text-sm font-semibold text-purple-900 dark:text-purple-100 mb-2">
          📏 Button Sizes
        </h3>
        <p className="text-sm text-purple-800 dark:text-purple-200">
          Three sizes available: Small (32px), Medium (40px), and Large (48px)
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Primary Variant
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="sm">Small Button</Button>
          <Button variant="primary" size="md">Medium Button</Button>
          <Button variant="primary" size="lg">Large Button</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Secondary Variant
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="secondary" size="sm">Small Button</Button>
          <Button variant="secondary" size="md">Medium Button</Button>
          <Button variant="secondary" size="lg">Large Button</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Ghost Variant
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="ghost" size="sm">Small Button</Button>
          <Button variant="ghost" size="md">Medium Button</Button>
          <Button variant="ghost" size="lg">Large Button</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          With Icons
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-3 h-3" />}>
            Small with Icon
          </Button>
          <Button variant="primary" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            Medium with Icon
          </Button>
          <Button variant="primary" size="lg" rightIcon={<ArrowUpRight className="w-5 h-5" />}>
            Large with Icon
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}

export const DarkModeComparison: Story = {
  args: {
    children: 'Button',
  },
  render: () => (
    <div className="space-y-8 p-8">
      <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800 mb-8">
        <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 Toggle Dark Mode
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Use the Storybook toolbar to toggle dark mode and see how brand colors adapt automatically.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          All Variants (Try Dark Mode)
        </h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
}
