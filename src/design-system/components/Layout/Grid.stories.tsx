import type { Meta, StoryObj } from '@storybook/react'
import { Grid } from './Grid'
import { Container } from './Container'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '12-column responsive grid system. Use col-span-* classes on children to control column widths.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 6, 12],
      description: 'Number of columns',
      table: {
        defaultValue: { summary: '12' },
      },
    },
    gap: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Gap between items',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive behavior',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const GridItem = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 dark:border-blue-400 rounded p-4 text-center', className)}>
    <p className="text-gray-900 dark:text-gray-100 font-medium">{children}</p>
  </div>
)

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')

export const Default: Story = {
  args: {
    cols: 12,
    gap: 'md',
    children: (
      <>
        <GridItem className="col-span-12">col-span-12</GridItem>
        <GridItem className="col-span-6">col-span-6</GridItem>
        <GridItem className="col-span-6">col-span-6</GridItem>
        <GridItem className="col-span-4">col-span-4</GridItem>
        <GridItem className="col-span-4">col-span-4</GridItem>
        <GridItem className="col-span-4">col-span-4</GridItem>
      </>
    ),
  },
}

export const TwoColumn: Story = {
  args: {
    cols: 2,
    gap: 'lg',
    children: (
      <>
        <GridItem>Column 1</GridItem>
        <GridItem>Column 2</GridItem>
        <GridItem>Column 3</GridItem>
        <GridItem>Column 4</GridItem>
      </>
    ),
  },
}

export const ThreeColumn: Story = {
  args: {
    cols: 3,
    gap: 'md',
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
}

export const FourColumn: Story = {
  args: {
    cols: 4,
    gap: 'md',
    children: (
      <>
        {Array.from({ length: 8 }, (_, i) => (
          <GridItem key={i}>Item {i + 1}</GridItem>
        ))}
      </>
    ),
  },
}

export const GapVariations: Story = {
  args: { children: <div /> },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gap: xs (8px)</p>
        <Grid cols={3} gap="xs">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gap: sm (16px)</p>
        <Grid cols={3} gap="sm">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gap: md (24px) - Default</p>
        <Grid cols={3} gap="md">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gap: lg (32px)</p>
        <Grid cols={3} gap="lg">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gap: xl (48px)</p>
        <Grid cols={3} gap="xl">
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
    </div>
  ),
}

export const ContentSidebarLayout: Story = {
  args: { children: <div /> },
  render: () => (
    <Container size="xl">
      <Grid cols={12} gap="lg">
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Main Content (8 columns)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              This is the main content area, taking up 8 columns on desktop.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              On mobile, it takes full width (12 columns).
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Sidebar (4 columns)
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              This sidebar takes 4 columns on desktop and full width on mobile.
            </p>
          </div>
        </div>
      </Grid>
    </Container>
  ),
}

export const AsymmetricLayout: Story = {
  args: { children: <div /> },
  render: () => (
    <Container size="xl">
      <Grid cols={12} gap="md">
        <GridItem className="col-span-12">Full Width Header</GridItem>
        <GridItem className="col-span-12 md:col-span-7">Wide Column (7)</GridItem>
        <GridItem className="col-span-12 md:col-span-5">Narrow Column (5)</GridItem>
        <GridItem className="col-span-12 md:col-span-4">Col 4</GridItem>
        <GridItem className="col-span-12 md:col-span-4">Col 4</GridItem>
        <GridItem className="col-span-12 md:col-span-4">Col 4</GridItem>
      </Grid>
    </Container>
  ),
}

export const AlignmentOptions: Story = {
  args: { children: <div /> },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">alignItems: start</p>
        <Grid cols={3} gap="md" alignItems="start">
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4 h-32">Tall</div>
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4 h-16">Short</div>
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4 h-24">Medium</div>
        </Grid>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">alignItems: center</p>
        <Grid cols={3} gap="md" alignItems="center">
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4 h-32">Tall</div>
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4 h-16">Short</div>
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4 h-24">Medium</div>
        </Grid>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">alignItems: stretch (default)</p>
        <Grid cols={3} gap="md" alignItems="stretch">
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4">Item 1</div>
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4">Item 2<br/>Extra<br/>Lines</div>
          <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 p-4">Item 3</div>
        </Grid>
      </div>
    </div>
  ),
}

export const ResponsiveVsFixed: Story = {
  args: { children: <div /> },
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Responsive (default) - Adapts to screen size
        </p>
        <Grid cols={3} gap="md" responsive={true}>
          <GridItem>1 col mobile → 2 tablet → 3 desktop</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Grid>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Fixed - Always 3 columns
        </p>
        <Grid cols={3} gap="md" responsive={false}>
          <GridItem>Always 3 columns</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
        </Grid>
      </div>
    </div>
  ),
}
