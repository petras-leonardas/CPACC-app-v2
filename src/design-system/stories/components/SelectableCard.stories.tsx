import type { Meta, StoryObj } from '@storybook/react'
import { SelectableCard } from '../../components/SelectableCard/SelectableCard'

const meta: Meta<typeof SelectableCard> = {
  title: 'Components/SelectableCard',
  component: SelectableCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A card component that is entirely selectable as a single interactive element. 
Use this when the entire card should act as a button or selection option.

**Features:**
- 16px border radius
- 16px padding on all sides
- Selectable with orange border and checkmark
- Hover state with shadow and darker border
- Dark mode support

**When to use:**
- Selecting between options (e.g., choosing a plan, picking a topic)
- Card-based navigation where the whole card is clickable

**When NOT to use:**
- Cards with multiple independent actions (use regular Card instead)
- Cards with form inputs or other interactive children

**Accessibility:**
- Uses semantic button element
- Keyboard interaction (Enter/Space)
- Shows selected state with aria-pressed
        `,
      },
    },
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the card is in selected state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelectableCard>

export const Default: Story = {
  args: {
    children: (
      <div className="min-h-[120px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selectable card content goes here
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
          Topic Selection
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click anywhere on this card to select it. Hover to see the selection indicator.
        </p>
      </div>
    ),
  },
}
