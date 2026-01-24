import type { Meta, StoryObj } from '@storybook/react'
import { NavigationItem } from '../components/NavigationItem'

const meta: Meta<typeof NavigationItem> = {
  title: 'Components/NavigationItem',
  component: NavigationItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Whether the navigation item is currently active',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle text (e.g., topic count)',
    },
    href: {
      control: 'text',
      description: 'Navigation destination URL',
    },
  },
}

export default meta
type Story = StoryObj<typeof NavigationItem>

/**
 * Default navigation item in inactive state
 */
export const Default: Story = {
  args: {
    children: 'Home',
    active: false,
    href: '/home',
  },
}

/**
 * Active navigation item with brand color accent
 */
export const Active: Story = {
  args: {
    children: 'Home',
    active: true,
    href: '/home',
  },
}

/**
 * Navigation item with subtitle (multi-line)
 */
export const WithSubtitle: Story = {
  args: {
    children: 'Disabilities, challenges & assistive technologies',
    subtitle: '5 topics (A-E)',
    active: false,
    href: '/domain-1',
  },
}

/**
 * Active navigation item with subtitle
 */
export const ActiveWithSubtitle: Story = {
  args: {
    children: 'Disabilities, challenges & assistive technologies',
    subtitle: '5 topics (A-E)',
    active: true,
    href: '/domain-1',
  },
}

/**
 * Complete sidebar navigation example
 */
export const SidebarExample: Story = {
  render: () => (
    <div className="w-72 bg-surface-primary border border-semantic rounded-lg p-4 space-y-2">
      <NavigationItem href="/home" active={false}>
        Home
      </NavigationItem>

      <div className="border-t border-semantic my-4" />

      <NavigationItem
        href="/domain-1"
        active={true}
        subtitle="5 topics (A-E)"
      >
        Disabilities, challenges & assistive technologies
      </NavigationItem>

      <NavigationItem
        href="/domain-2"
        active={false}
        subtitle="6 topics (A-F)"
      >
        Accessibility & universal design
      </NavigationItem>

      <NavigationItem
        href="/domain-3"
        active={false}
        subtitle="6 topics (A-F)"
      >
        Standards, laws & management strategies
      </NavigationItem>

      <div className="border-t border-semantic my-4" />

      <NavigationItem href="/practice" active={false}>
        Practice
      </NavigationItem>
    </div>
  ),
}

/**
 * Interactive demo showing all states
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Simple Items
        </h3>
        <div className="w-72 bg-surface-primary border border-semantic rounded-lg p-4 space-y-2">
          <NavigationItem href="/home" active={false}>
            Inactive
          </NavigationItem>
          <NavigationItem href="/home" active={true}>
            Active
          </NavigationItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Items with Subtitles
        </h3>
        <div className="w-72 bg-surface-primary border border-semantic rounded-lg p-4 space-y-2">
          <NavigationItem
            href="/domain-1"
            active={false}
            subtitle="5 topics (A-E)"
          >
            Disabilities, challenges & assistive technologies
          </NavigationItem>
          <NavigationItem
            href="/domain-2"
            active={true}
            subtitle="6 topics (A-F)"
          >
            Accessibility & universal design
          </NavigationItem>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Hover States (Hover over inactive items)
        </h3>
        <div className="w-72 bg-surface-primary border border-semantic rounded-lg p-4 space-y-2">
          <NavigationItem href="/item-1" active={false}>
            Hover over me
          </NavigationItem>
          <NavigationItem href="/item-2" active={false} subtitle="With subtitle">
            Hover over me too
          </NavigationItem>
          <NavigationItem href="/item-3" active={true}>
            Active (no hover effect)
          </NavigationItem>
        </div>
      </div>
    </div>
  ),
}

/**
 * Dark mode demonstration
 */
export const DarkMode: Story = {
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
  render: () => (
    <div className="w-72 bg-surface-primary border border-semantic rounded-lg p-4 space-y-2">
      <NavigationItem href="/home" active={false}>
        Home
      </NavigationItem>
      <div className="border-t border-semantic my-4" />
      <NavigationItem
        href="/domain-1"
        active={true}
        subtitle="5 topics (A-E)"
      >
        Disabilities, challenges & assistive technologies
      </NavigationItem>
      <NavigationItem
        href="/domain-2"
        active={false}
        subtitle="6 topics (A-F)"
      >
        Accessibility & universal design
      </NavigationItem>
    </div>
  ),
}

/**
 * Responsive behavior (try resizing)
 */
export const Responsive: Story = {
  render: () => (
    <div className="max-w-full">
      <div className="bg-surface-primary border border-semantic rounded-lg p-4 space-y-2">
        <NavigationItem
          href="/domain-1"
          active={true}
          subtitle="5 topics (A-E)"
        >
          This is a very long navigation item title that should wrap nicely on smaller screens
        </NavigationItem>
        <NavigationItem
          href="/domain-2"
          active={false}
          subtitle="This is also a very long subtitle that demonstrates text wrapping"
        >
          Another long title for testing
        </NavigationItem>
      </div>
    </div>
  ),
}
