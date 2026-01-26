import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Flexbox utility for consistent spacing. Replaces manual flex/gap classes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Stack direction',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
    spacing: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Spacing between items',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Align items',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Justify content',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow wrapping',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Stack>

export default meta
type Story = StoryObj<typeof meta>

const Box = ({ children, bg = 'blue' }: { children: React.ReactNode; bg?: string }) => {
  const bgClass = bg === 'blue' ? 'bg-blue-500' : bg === 'purple' ? 'bg-purple-500' : bg === 'green' ? 'bg-green-500' : 'bg-orange-500'
  return (
    <div className={`${bgClass} text-white px-4 py-3 rounded font-medium`}>
      {children}
    </div>
  )
}

export const Default: Story = {
  args: {
    spacing: 'md',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
}

export const VerticalStack: Story = {
  args: {
    direction: 'vertical',
    spacing: 'lg',
    children: (
      <>
        <Box>First Item</Box>
        <Box bg="purple">Second Item</Box>
        <Box bg="green">Third Item</Box>
      </>
    ),
  },
}

export const HorizontalStack: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    children: (
      <>
        <Box>Button 1</Box>
        <Box bg="purple">Button 2</Box>
        <Box bg="green">Button 3</Box>
      </>
    ),
  },
}

export const SpacingVariations: Story = {
  args: { children: <div /> },
  render: (args) => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">xs (8px)</p>
        <Stack {...args} spacing="xs">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">sm (16px)</p>
        <Stack {...args} spacing="sm">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">md (24px) - Default</p>
        <Stack {...args} spacing="md">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">lg (32px)</p>
        <Stack {...args} spacing="lg">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">xl (48px)</p>
        <Stack {...args} spacing="xl">
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Stack>
      </div>
    </div>
  ),
}

export const AlignmentOptions: Story = {
  args: { children: <div />, spacing: 'md' },
  render: (args) => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">align: start</p>
        <Stack {...args} direction="horizontal" align="start">
          <Box>Short</Box>
          <div className="bg-purple-500 text-white px-4 py-8 rounded font-medium">Tall</div>
          <Box bg="green">Medium</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">align: center</p>
        <Stack {...args} direction="horizontal" align="center">
          <Box>Short</Box>
          <div className="bg-purple-500 text-white px-4 py-8 rounded font-medium">Tall</div>
          <Box bg="green">Medium</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">align: end</p>
        <Stack {...args} direction="horizontal" align="end">
          <Box>Short</Box>
          <div className="bg-purple-500 text-white px-4 py-8 rounded font-medium">Tall</div>
          <Box bg="green">Medium</Box>
        </Stack>
      </div>
    </div>
  ),
}

export const JustifyOptions: Story = {
  args: { children: <div />, spacing: 'md' },
  render: (args) => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">justify: start</p>
        <Stack {...args} direction="horizontal" justify="start">
          <Box>1</Box>
          <Box bg="purple">2</Box>
          <Box bg="green">3</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">justify: center</p>
        <Stack {...args} direction="horizontal" justify="center">
          <Box>1</Box>
          <Box bg="purple">2</Box>
          <Box bg="green">3</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">justify: end</p>
        <Stack {...args} direction="horizontal" justify="end">
          <Box>1</Box>
          <Box bg="purple">2</Box>
          <Box bg="green">3</Box>
        </Stack>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">justify: between</p>
        <Stack {...args} direction="horizontal" justify="between">
          <Box>1</Box>
          <Box bg="purple">2</Box>
          <Box bg="green">3</Box>
        </Stack>
      </div>
    </div>
  ),
}

export const WithDividers: Story = {
  args: {
    direction: 'vertical',
    spacing: 'sm',
    divider: <div className="h-px bg-gray-300 dark:bg-gray-700" />,
    children: (
      <>
        <div className="text-gray-900 dark:text-gray-100">First item</div>
        <div className="text-gray-900 dark:text-gray-100">Second item</div>
        <div className="text-gray-900 dark:text-gray-100">Third item</div>
      </>
    ),
  },
}

export const HorizontalWithDividers: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    divider: <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />,
    children: (
      <>
        <div className="text-gray-900 dark:text-gray-100 font-medium">Nav Item 1</div>
        <div className="text-gray-900 dark:text-gray-100 font-medium">Nav Item 2</div>
        <div className="text-gray-900 dark:text-gray-100 font-medium">Nav Item 3</div>
      </>
    ),
  },
}

export const WrappingBehavior: Story = {
  args: {
    direction: 'horizontal',
    spacing: 'md',
    wrap: true,
    children: (
      <>
        {Array.from({ length: 12 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </>
    ),
  },
}

export const NavigationExample: Story = {
  args: { children: <div /> },
  render: (args) => (
    <Stack {...args} direction="horizontal" spacing="md" as="nav">
      <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 font-medium">
        Home
      </a>
      <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 font-medium">
        About
      </a>
      <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 font-medium">
        Services
      </a>
      <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-blue-600 font-medium">
        Contact
      </a>
    </Stack>
  ),
}

export const CardList: Story = {
  args: { children: <div /> },
  render: (args) => (
    <Stack {...args} spacing="lg">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Card Title 1</h3>
        <p className="text-gray-600 dark:text-gray-400">Card description goes here.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Card Title 2</h3>
        <p className="text-gray-600 dark:text-gray-400">Card description goes here.</p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Card Title 3</h3>
        <p className="text-gray-600 dark:text-gray-400">Card description goes here.</p>
      </div>
    </Stack>
  ),
}
