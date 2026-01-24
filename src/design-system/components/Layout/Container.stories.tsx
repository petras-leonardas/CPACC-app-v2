import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Content width wrapper with responsive padding. Replaces legacy GridContainer component.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Width constraint',
      table: {
        defaultValue: { summary: 'xl' },
      },
    },
    padding: {
      control: 'select',
      options: [false, true, 'none', 'sm', 'md', 'lg'],
      description: 'Horizontal padding',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    center: {
      control: 'boolean',
      description: 'Center content horizontally',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    as: {
      control: 'select',
      options: ['div', 'main', 'section', 'article'],
      description: 'Semantic HTML element',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

const ExampleContent = ({ label }: { label?: string }) => (
  <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 rounded p-8 text-center">
    <p className="text-gray-900 dark:text-gray-100 font-medium">
      {label || 'Container Content'}
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
      Resize the window to see responsive behavior
    </p>
  </div>
)

export const Default: Story = {
  args: {
    children: <ExampleContent />,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8 p-4 bg-gray-50 dark:bg-gray-950">
      <Container size="sm">
        <ExampleContent label="Small (max-w-2xl / 672px)" />
      </Container>
      <Container size="md">
        <ExampleContent label="Medium (max-w-4xl / 896px)" />
      </Container>
      <Container size="lg">
        <ExampleContent label="Large (max-w-6xl / 1152px)" />
      </Container>
      <Container size="xl">
        <ExampleContent label="Extra Large (max-w-7xl / 1280px) - Default" />
      </Container>
      <Container size="full">
        <ExampleContent label="Full Width (w-full)" />
      </Container>
    </div>
  ),
}

export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-8 bg-gray-50 dark:bg-gray-950">
      <Container size="lg" padding="none">
        <ExampleContent label="No Padding" />
      </Container>
      <Container size="lg" padding="sm">
        <ExampleContent label="Small Padding (px-4)" />
      </Container>
      <Container size="lg" padding="md">
        <ExampleContent label="Medium Padding (px-4 md:px-8)" />
      </Container>
      <Container size="lg" padding="lg">
        <ExampleContent label="Large Padding (px-6 md:px-12)" />
      </Container>
    </div>
  ),
}

export const SemanticHTML: Story = {
  render: () => (
    <div className="space-y-8 p-4 bg-gray-50 dark:bg-gray-950">
      <Container as="main" size="lg">
        <ExampleContent label='as="main" - Main page content' />
      </Container>
      <Container as="section" size="lg">
        <ExampleContent label='as="section" - Content section' />
      </Container>
      <Container as="article" size="md">
        <ExampleContent label='as="article" - Article content' />
      </Container>
    </div>
  ),
}

export const NestedContainers: Story = {
  render: () => (
    <div className="bg-gray-50 dark:bg-gray-950 p-4">
      <Container size="xl" padding="lg">
        <div className="bg-purple-100 dark:bg-purple-900 border-2 border-purple-500 rounded p-8">
          <p className="text-gray-900 dark:text-gray-100 font-medium mb-4">Outer Container (xl)</p>
          <Container size="md" padding="md">
            <div className="bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded p-8">
              <p className="text-gray-900 dark:text-gray-100 font-medium">Inner Container (md)</p>
            </div>
          </Container>
        </div>
      </Container>
    </div>
  ),
}

export const RealPageExample: Story = {
  render: () => (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      <Container size="lg" padding="md" as="main">
        <div className="py-8 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Page Title
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            This demonstrates a typical page layout using the Container component.
            The content is constrained to a readable width with appropriate padding.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Card 1</h3>
              <p className="text-gray-600 dark:text-gray-400">Content inside container</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Card 2</h3>
              <p className="text-gray-600 dark:text-gray-400">Content inside container</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ),
}
