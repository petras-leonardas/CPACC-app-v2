import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Badge',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <Badge variant="info" size="sm">
        Small
      </Badge>
      <Badge variant="info" size="md">
        Medium
      </Badge>
      <Badge variant="info" size="lg">
        Large
      </Badge>
    </div>
  ),
}

export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Status Indicators</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="default">Draft</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Tags & Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">React</Badge>
          <Badge variant="info">TypeScript</Badge>
          <Badge variant="info">Tailwind</Badge>
          <Badge variant="info">Accessibility</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">With Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            <span className="mr-1">✓</span>
            Completed
          </Badge>
          <Badge variant="warning">
            <span className="mr-1">⚠</span>
            Review
          </Badge>
          <Badge variant="error">
            <span className="mr-1">✕</span>
            Rejected
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">In Context</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span className="text-gray-900 dark:text-gray-100">Accessibility Report</span>
            <Badge variant="success">Passed</Badge>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span className="text-gray-900 dark:text-gray-100">Color Contrast Check</span>
            <Badge variant="warning">Needs Review</Badge>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span className="text-gray-900 dark:text-gray-100">WCAG Compliance</span>
            <Badge variant="error">Failed</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}
