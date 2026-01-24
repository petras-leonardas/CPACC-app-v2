import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div'],
      description: 'The HTML element to render',
    },
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'small'],
      description: 'Typography variant',
    },
    bold: {
      control: 'boolean',
      description: 'Apply bold font weight',
    },
  },
}

export default meta
type Story = StoryObj<typeof Text>

export const Body1: Story = {
  args: {
    variant: 'body1',
    children: 'Body 1 - Primary body text (16px). Used for main content and paragraphs throughout the application.',
  },
}

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'Body 2 - Secondary text (14px). Used for supporting content, captions, and less prominent text.',
  },
}

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Small text (12px). Used for labels, captions, fine print, and metadata.',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-2xl">
      <div>
        <Text variant="body1">
          Body 1 - This is the primary body text style. It's used for main content, paragraphs, 
          and most text throughout the application. The text should be easily readable at 16px 
          with comfortable line height for extended reading.
        </Text>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          16px / 24px line height / weight 400
        </p>
      </div>

      <div>
        <Text variant="body2">
          Body 2 - This is the secondary body text style at 14px. It's used for supporting text, 
          captions, and less prominent content. Still readable but slightly smaller than Body 1.
        </Text>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          14px / 22px line height / weight 400
        </p>
      </div>

      <div>
        <Text variant="small">
          Small text - Used for labels, captions, and fine print. Smallest readable size at 12px.
        </Text>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
          12px / 20px line height / weight 400
        </p>
      </div>
    </div>
  ),
}

export const BoldVariants: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-2xl">
      <Text variant="body1" bold>
        Bold Body 1 - Used for emphasis or important information in body text.
      </Text>

      <Text variant="body2" bold>
        Bold Body 2 - Used for emphasis in secondary text or labels.
      </Text>

      <Text variant="body1">
        Regular body text with <Text as="span" bold>inline bold emphasis</Text> for highlighting 
        specific words or phrases within a paragraph.
      </Text>
    </div>
  ),
}

export const DifferentElements: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-2xl">
      <Text as="p" variant="body1">
        As paragraph (default) - Most common for blocks of text
      </Text>

      <Text as="span" variant="body2">
        As span - For inline text within other elements
      </Text>

      <Text as="div" variant="body1">
        As div - When you need a block container with text styling
      </Text>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        The <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">as</code> prop lets you 
        control the HTML element while maintaining consistent typography.
      </p>
    </div>
  ),
}

export const RealWorldExample: Story = {
  render: () => (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-2xl space-y-6">
      <div>
        <Text variant="small" className="text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          Case Study
        </Text>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2 mb-4">
          Improving Accessibility in Higher Education
        </h2>
        
        <Text variant="body1" className="mb-4">
          Universities worldwide are increasingly recognizing the importance of digital 
          accessibility. This case study examines how one institution implemented WCAG 2.1 
          AA standards across all digital platforms.
        </Text>

        <Text variant="body2" className="mb-4">
          The project began with a comprehensive audit of existing systems, revealing 
          significant barriers for students with disabilities. Over 18 months, the team 
          worked to remediate issues and establish new accessibility guidelines.
        </Text>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <Text variant="body2" bold className="mb-2">Key Outcomes:</Text>
          <ul className="space-y-2">
            <li>
              <Text variant="body2">• 95% reduction in accessibility complaints</Text>
            </li>
            <li>
              <Text variant="body2">• 100% of new content meets WCAG 2.1 AA</Text>
            </li>
            <li>
              <Text variant="body2">• Improved user satisfaction by 40%</Text>
            </li>
          </ul>
        </div>

        <Text variant="small" className="text-gray-500 dark:text-gray-500 mt-6">
          Published on January 15, 2026 • 5 min read
        </Text>
      </div>
    </div>
  ),
}

export const WithCustomClasses: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-white dark:bg-gray-900 rounded-lg max-w-2xl">
      <Text variant="body1" className="text-blue-600 dark:text-blue-400">
        Custom colored text using Tailwind classes
      </Text>

      <Text variant="body1" className="italic">
        Italic text for quotes or emphasis
      </Text>

      <Text variant="body1" className="text-center">
        Centered text alignment
      </Text>

      <Text variant="body2" className="underline decoration-2">
        Underlined text with custom decoration
      </Text>

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        The Text component accepts any additional Tailwind classes via the{' '}
        <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">className</code> prop.
      </p>
    </div>
  ),
}

export const UsageGuidelines: Story = {
  render: () => (
    <div className="p-8 bg-white dark:bg-gray-900 rounded-lg max-w-3xl space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        When to Use Text vs Heading
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
            ✅ Use Text Component For:
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
            <li>• Body content and paragraphs</li>
            <li>• Descriptions and explanations</li>
            <li>• Labels and captions</li>
            <li>• Metadata (dates, authors)</li>
            <li>• Inline text within headings</li>
            <li>• Any non-heading text</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            ✅ Use Heading Component For:
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <li>• Page titles (h1)</li>
            <li>• Section headings (h2)</li>
            <li>• Subsection headings (h3)</li>
            <li>• Any structural heading</li>
            <li>• Content that defines hierarchy</li>
            <li>• Screen reader navigation points</li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
        <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">
          💡 Pro Tips
        </h3>
        <div className="text-sm text-amber-800 dark:text-amber-200 space-y-2">
          <div>
            <strong>Variant Selection:</strong> Use body1 for main content, body2 for supporting text, 
            small for metadata.
          </div>
          <div>
            <strong>Bold Text:</strong> Use the <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">bold</code> prop 
            instead of wrapping in <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">{'<strong>'}</code> tags.
          </div>
          <div>
            <strong>Semantic HTML:</strong> Choose the <code className="bg-amber-100 dark:bg-amber-900/50 px-1 rounded">as</code> prop 
            based on HTML semantics, not styling.
          </div>
        </div>
      </div>
    </div>
  ),
}
