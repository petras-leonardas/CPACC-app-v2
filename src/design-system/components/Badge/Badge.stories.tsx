import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'
import { Clock, Check, BookOpen, Sparkles } from '../../icons'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    icon: {
      control: false,
      description: 'Optional Lucide icon to display on the left side',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const WithIcon: Story = {
  args: {
    icon: Clock,
    children: '5 min read',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const SizesWithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <Badge size="sm" icon={Clock}>Small</Badge>
      <Badge size="md" icon={Clock}>Medium</Badge>
      <Badge size="lg" icon={Clock}>Large</Badge>
    </div>
  ),
}

export const LightMode: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8 bg-white rounded-lg">
      <Badge size="sm">Small</Badge>
      <Badge size="md" icon={Clock}>5 min read</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light' },
  },
}

export const DarkMode: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8 bg-gray-900 rounded-lg dark">
      <Badge size="sm">Small</Badge>
      <Badge size="md" icon={Clock}>5 min read</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'dark' },
  },
}

export const IconVariations: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <Badge icon={Clock}>5 min read</Badge>
      <Badge icon={Check}>Completed</Badge>
      <Badge icon={BookOpen}>12 lessons</Badge>
      <Badge icon={Sparkles}>New</Badge>
    </div>
  ),
}

export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Tags & Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Tailwind</Badge>
          <Badge>Accessibility</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          With Icons
        </h3>
        <div className="flex flex-wrap gap-2">
          <Badge icon={Clock}>5 min read</Badge>
          <Badge icon={BookOpen}>12 lessons</Badge>
          <Badge icon={Check}>Completed</Badge>
          <Badge icon={Sparkles}>New feature</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          In Context
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span className="text-gray-900 dark:text-gray-100">Introduction to WCAG</span>
            <Badge icon={Clock}>10 min</Badge>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span className="text-gray-900 dark:text-gray-100">Color Contrast Guidelines</span>
            <Badge icon={Check}>Completed</Badge>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <span className="text-gray-900 dark:text-gray-100">Screen Reader Basics</span>
            <Badge icon={BookOpen}>5 lessons</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}
