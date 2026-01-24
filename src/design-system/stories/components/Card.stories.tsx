import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '../../components/Card/Card'
import { Button } from '../../components/Button/Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A versatile bordered card container component for grouping related content.

**Features:**
- 16px border radius
- 16px padding on all sides
- Consistent border styling
- Dark mode support (white → black)
- Optional interactive mode for navigation

**Card Types:**
- **Card** - Container with optional interactivity (this component)
- **SelectableCard** - Button for selection/toggle patterns

**Usage:**

*Static Content:*
\`\`\`tsx
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
\`\`\`

*Navigation (wrap in Link):*
\`\`\`tsx
<Link href="/page">
  <Card interactive>
    <h3>Clickable Card</h3>
    <p>Click anywhere to navigate</p>
  </Card>
</Link>
\`\`\`

*Selection patterns:*
Use SelectableCard instead for radio/checkbox-like behavior.
        `,
      },
    },
  },
  argTypes: {
    interactive: {
      control: 'boolean',
      description: 'Adds hover states (border color change, shadow, cursor pointer) for use in navigation contexts',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: (
      <div className="min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Card content goes here
        </p>
      </div>
    ),
  },
}

export const ContentExample: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Topic Navigation
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This card contains custom content and could include buttons, links, or other interactive elements.
        </p>
      </div>
    ),
  },
}

export const ButtonsExample: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Card with Actions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Cards can contain interactive elements like buttons and links.
        </p>
        <div className="flex gap-2">
          <Button variant="primary" size="sm">
            Primary Action
          </Button>
          <Button variant="secondary" size="sm">
            Secondary
          </Button>
        </div>
      </div>
    ),
  },
}

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <div>
        <div className="flex items-center gap-3 mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Interactive Card for Navigation
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Hover over this card to see the interactive state. In production, wrap this Card in a Link component.
        </p>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100">
          View details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    ),
  },
}

export const InteractiveComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Static vs Interactive Cards
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Static Card (default)
          </p>
          <Card>
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Information Card
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No hover state. Use for static content or when interactions are on child elements.
            </p>
          </Card>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Interactive Card (hover to see effect)
          </p>
          <Card interactive>
            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Navigation Card
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Hover state active. Border changes to gray-400, shadow appears, cursor becomes pointer.
            </p>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Learn more →
            </span>
          </Card>
        </div>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
          💡 When to use interactive
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Card is wrapped in a Link component for navigation</li>
          <li>Entire card should be clickable (not just a button inside)</li>
          <li>Need visual feedback that the card is interactive</li>
        </ul>
      </div>
    </div>
  ),
}
