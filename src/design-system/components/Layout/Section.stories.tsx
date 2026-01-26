import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './Section'

const meta = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Semantic page sections with consistent backgrounds and padding.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['section', 'article', 'aside', 'div', 'main'],
      description: 'Semantic HTML element',
      table: {
        defaultValue: { summary: 'section' },
      },
    },
    background: {
      control: 'select',
      options: ['default', 'subtle', 'elevated', 'inverse'],
      description: 'Background treatment',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Vertical padding',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    container: {
      control: 'boolean',
      description: 'Wrap children in Container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    containerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Container size (only if container=true)',
      table: {
        defaultValue: { summary: 'xl' },
      },
    },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

const ExampleContent = ({ title }: { title: string }) => (
  <div className="py-8">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <p className="text-gray-700 dark:text-gray-300">
      This is example content demonstrating the Section component with various backgrounds and padding options.
    </p>
  </div>
)

export const Default: Story = {
  args: {
    children: <ExampleContent title="Default Section" />,
    container: true,
  },
}

export const BackgroundVariants: Story = {
  args: { children: <div /> },
  render: () => (
    <div>
      <Section background="default" padding="lg" container>
        <ExampleContent title="Default Background (Transparent)" />
      </Section>
      <Section background="subtle" padding="lg" container>
        <ExampleContent title="Subtle Background (Gray 50)" />
      </Section>
      <Section background="elevated" padding="lg" container>
        <ExampleContent title="Elevated Background (White + Shadow)" />
      </Section>
      <Section background="inverse" padding="lg" container>
        <ExampleContent title="Inverse Background (Dark)" />
      </Section>
    </div>
  ),
}

export const PaddingVariations: Story = {
  args: { children: <div /> },
  render: () => (
    <div className="bg-gray-100 dark:bg-gray-900">
      <Section background="subtle" padding="none" container>
        <div className="border-t-4 border-b-4 border-blue-500">
          <ExampleContent title="No Padding" />
        </div>
      </Section>
      <Section background="subtle" padding="sm" container>
        <div className="border-t-4 border-b-4 border-purple-500">
          <ExampleContent title="Small Padding (py-4 md:py-6)" />
        </div>
      </Section>
      <Section background="subtle" padding="md" container>
        <div className="border-t-4 border-b-4 border-green-500">
          <ExampleContent title="Medium Padding (py-6 md:py-8)" />
        </div>
      </Section>
      <Section background="subtle" padding="lg" container>
        <div className="border-t-4 border-b-4 border-orange-500">
          <ExampleContent title="Large Padding (py-8 md:py-12)" />
        </div>
      </Section>
      <Section background="subtle" padding="xl" container>
        <div className="border-t-4 border-b-4 border-red-500">
          <ExampleContent title="Extra Large Padding (py-12 md:py-16)" />
        </div>
      </Section>
    </div>
  ),
}

export const WithContainer: Story = {
  args: { children: <div /> },
  render: () => (
    <div>
      <Section background="subtle" padding="lg" container={false}>
        <div className="bg-blue-100 dark:bg-blue-900 p-4">
          <p className="text-center font-medium">Without Container - Full Width</p>
        </div>
      </Section>
      <Section background="elevated" padding="lg" container containerSize="lg">
        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded">
          <p className="text-center font-medium">With Container (lg) - Constrained Width</p>
        </div>
      </Section>
    </div>
  ),
}

export const AlternatingSections: Story = {
  args: { children: <div /> },
  render: () => (
    <div>
      <Section background="default" padding="lg" container>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Hero Section
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Default background with no special treatment
        </p>
      </Section>

      <Section background="subtle" padding="xl" container>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Features Section
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Feature 1</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Feature 2</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Feature 3</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
          </div>
        </div>
      </Section>

      <Section background="elevated" padding="lg" container>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Content Section
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Elevated background with shadow for emphasis
        </p>
      </Section>

      <Section background="inverse" padding="xl" container>
        <h2 className="text-2xl font-bold mb-4">Call to Action</h2>
        <p className="mb-6">Dark background with light text for contrast</p>
        <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
          Get Started
        </button>
      </Section>
    </div>
  ),
}

export const FullPageLayout: Story = {
  args: { children: <div /> },
  render: () => (
    <div className="min-h-screen flex flex-col">
      <Section as="section" background="elevated" padding="md" container>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Site Logo</h1>
          <nav className="flex gap-4">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900">About</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900">Contact</a>
          </nav>
        </div>
      </Section>

      <Section as="main" background="default" padding="xl" container className="flex-1">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Main Content Area
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          This demonstrates a full page layout using Section components.
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          The main section has flex-1 to take up remaining space, creating a sticky footer effect.
        </p>
      </Section>

      <Section as="section" background="subtle" padding="lg" container>
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 Your Company. All rights reserved.
        </div>
      </Section>
    </div>
  ),
}
