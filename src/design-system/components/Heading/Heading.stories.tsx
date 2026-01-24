import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'The semantic HTML heading level',
    },
  },
}

export default meta
type Story = StoryObj<typeof Heading>

export const H1: Story = {
  args: {
    as: 'h1',
    children: 'Heading 1 - Page Title',
  },
}

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'Heading 2 - Section Heading',
  },
}

export const H3: Story = {
  args: {
    as: 'h3',
    children: 'Heading 3 - Subsection Heading',
  },
}

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <div>
        <Heading as="h1">Heading 1 - Page Title</Heading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Used for main page titles. Responsive: 28px mobile → 36px desktop
        </p>
      </div>
      
      <div>
        <Heading as="h2">Heading 2 - Section Heading</Heading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Used for major section headings. Responsive: 24px mobile → 30px desktop
        </p>
      </div>
      
      <div>
        <Heading as="h3">Heading 3 - Subsection Heading</Heading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Used for subsections and card titles. Responsive: 16px mobile → 18px desktop
        </p>
      </div>

      <div>
        <Heading as="h4">Heading 4 - Minor Heading</Heading>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          H4-H6 use H3 styling by default
        </p>
      </div>
    </div>
  ),
}

export const SemanticHierarchy: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-3xl">
      <Heading as="h1">Understanding Accessibility</Heading>
      <p className="text-gray-600 dark:text-gray-400">
        This page demonstrates proper heading hierarchy for screen readers and SEO.
      </p>
      
      <Heading as="h2">The Social Model of Disability</Heading>
      <p className="text-gray-600 dark:text-gray-400">
        Content about the social model would go here...
      </p>
      
      <Heading as="h3">Key Principles</Heading>
      <p className="text-gray-600 dark:text-gray-400">
        Subsection content explaining key principles...
      </p>
      
      <Heading as="h3">Implementation Examples</Heading>
      <p className="text-gray-600 dark:text-gray-400">
        More subsection content with examples...
      </p>
      
      <Heading as="h2">Medical vs. Social Models</Heading>
      <p className="text-gray-600 dark:text-gray-400">
        Another major section comparing the two models...
      </p>
    </div>
  ),
}

export const WithCustomClasses: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-white dark:bg-gray-900 rounded-lg">
      <Heading as="h1" className="text-blue-600 dark:text-blue-400">
        Custom Colored Heading
      </Heading>
      
      <Heading as="h2" className="italic">
        Italic Heading
      </Heading>
      
      <Heading as="h3" className="underline decoration-2">
        Underlined Heading
      </Heading>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        You can add custom Tailwind classes while keeping the base typography styles.
      </p>
    </div>
  ),
}

export const AccessibilityNotes: Story = {
  render: () => (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-3xl space-y-6">
      <Heading as="h1">Why Use the Heading Component?</Heading>
      
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
          ✅ Best Practices
        </h4>
        <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
          <li>
            <strong>Semantic HTML:</strong> Always renders the correct heading tag (h1-h6)
          </li>
          <li>
            <strong>Screen Readers:</strong> Proper heading hierarchy helps users navigate
          </li>
          <li>
            <strong>SEO:</strong> Search engines use heading structure to understand content
          </li>
          <li>
            <strong>Consistency:</strong> Enforces design system typography automatically
          </li>
          <li>
            <strong>Type Safety:</strong> TypeScript prevents invalid usage
          </li>
        </ul>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3">
          ❌ Anti-Patterns to Avoid
        </h4>
        <ul className="text-sm text-red-800 dark:text-red-200 space-y-2">
          <li>
            <code className="bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded">
              {'<div className="cpacc-heading-1">'}
            </code> - Wrong element, breaks semantics
          </li>
          <li>
            Skipping heading levels (h1 → h3) - confuses screen readers
          </li>
          <li>
            Using headings only for styling - use Text component instead
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          💡 Usage Tips
        </h4>
        <div className="text-sm text-blue-800 dark:text-blue-200 space-y-3">
          <div>
            <strong>One H1 per page:</strong> Each page should have exactly one h1 (the main title)
          </div>
          <div>
            <strong>Logical hierarchy:</strong> Follow the outline structure: h1 → h2 → h3
          </div>
          <div>
            <strong>Don't skip levels:</strong> If you have an h2, the next deeper level should be h3
          </div>
        </div>
      </div>
    </div>
  ),
}
