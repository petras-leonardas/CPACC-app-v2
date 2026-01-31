import type { Meta, StoryObj } from '@storybook/react'
import { TopicNavigationItem } from '../../components/TopicNavigationItem'
import { TopicNavigationList } from '../../components/TopicNavigationList'

const meta = {
  title: 'Components/Navigation/TopicNavigationItem',
  component: TopicNavigationItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopicNavigationItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '/domain/topic-id',
    children: 'Theoretical models of disability',
  },
}

export const WithSubCategory: Story = {
  args: {
    href: '/domain/topic-id',
    subCategory: 'A',
    children: 'Theoretical models of disability',
  },
}

export const WithOnClick: Story = {
  args: {
    onClick: () => alert('Topic clicked!'),
    children: 'Click me to trigger an action',
  },
  parameters: {
    docs: {
      description: {
        story: 'TopicNavigationItem can render as a button when using onClick instead of href. Useful for modals or custom actions.',
      },
    },
  },
}

export const Emphasized: Story = {
  args: {
    onClick: () => alert('Test all topics!'),
    emphasized: true,
    children: 'Test all topics',
  },
  parameters: {
    docs: {
      description: {
        story: 'The emphasized prop makes the text bolder. Useful for footer actions like "Test all topics".',
      },
    },
  },
}

export const LongTitle: Story = {
  args: {
    href: '/domain/topic-id',
    subCategory: 'B',
    children: 'Understanding the relationship between disability, accessibility, and universal design in modern contexts',
  },
}

export const InList: Story = {
  args: { href: '', children: '' },
  render: () => (
    <TopicNavigationList>
      <TopicNavigationItem 
        href="/domain/topic-1" 
        subCategory="A"
      >
        Theoretical models of disability
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/domain/topic-2" 
        subCategory="B"
      >
        Categories and characteristics of disability
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/domain/topic-3" 
        subCategory="C"
      >
        Assistive technologies and adaptive strategies
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/domain/topic-4" 
        subCategory="D"
      >
        Web accessibility fundamentals
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/domain/topic-5" 
        subCategory="E"
      >
        Document accessibility
      </TopicNavigationItem>
    </TopicNavigationList>
  ),
}

export const WithFooterAction: Story = {
  args: { href: '', children: '' },
  render: () => (
    <TopicNavigationList>
      <TopicNavigationItem 
        onClick={() => alert('Topic A clicked')}
        subCategory="A"
      >
        Theoretical models of disability
      </TopicNavigationItem>
      <TopicNavigationItem 
        onClick={() => alert('Topic B clicked')}
        subCategory="B"
      >
        Categories and characteristics of disability
      </TopicNavigationItem>
      <TopicNavigationItem 
        onClick={() => alert('Topic C clicked')}
        subCategory="C"
      >
        Assistive technologies and adaptive strategies
      </TopicNavigationItem>
      
      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
      
      {/* Footer action */}
      <TopicNavigationItem 
        onClick={() => alert('Test all topics!')}
        emphasized
      >
        Test all topics
      </TopicNavigationItem>
    </TopicNavigationList>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to add a divider and footer action (like "Test all topics") using the emphasized prop.',
      },
    },
  },
}

export const WithoutSubCategories: Story = {
  args: { href: '', children: '' },
  render: () => (
    <TopicNavigationList>
      <TopicNavigationItem href="/domain/topic-1">
        Theoretical models of disability
      </TopicNavigationItem>
      <TopicNavigationItem href="/domain/topic-2">
        Categories and characteristics of disability
      </TopicNavigationItem>
      <TopicNavigationItem href="/domain/topic-3">
        Assistive technologies and adaptive strategies
      </TopicNavigationItem>
    </TopicNavigationList>
  ),
}

export const MixedSubCategories: Story = {
  args: { href: '', children: '' },
  render: () => (
    <TopicNavigationList>
      <TopicNavigationItem 
        href="/domain/topic-1" 
        subCategory="A"
      >
        First topic with subcategory
      </TopicNavigationItem>
      <TopicNavigationItem href="/domain/topic-2">
        Second topic without subcategory
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/domain/topic-3" 
        subCategory="B"
      >
        Third topic with subcategory
      </TopicNavigationItem>
    </TopicNavigationList>
  ),
}

export const WithTracking: Story = {
  args: {
    href: '/domain/topic-id',
    subCategory: 'A',
    children: 'Theoretical models of disability',
    'data-tracking-id': 'domain-1-topic-disability-models',
  },
}

export const InteractiveExample: Story = {
  args: { href: '', children: '' },
  render: () => (
    <div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
        Hover over items to see the interactive hover state. Use Tab to see the focus ring (orange).
      </p>
      <TopicNavigationList>
        <TopicNavigationItem 
          href="/domain/topic-1" 
          subCategory="A"
        >
          Theoretical models of disability
        </TopicNavigationItem>
        <TopicNavigationItem 
          href="/domain/topic-2" 
          subCategory="B"
        >
          Categories and characteristics of disability
        </TopicNavigationItem>
        <TopicNavigationItem 
          href="/domain/topic-3" 
          subCategory="C"
        >
          Assistive technologies and adaptive strategies
        </TopicNavigationItem>
      </TopicNavigationList>
    </div>
  ),
}

export const ButtonVsLinkComparison: Story = {
  args: { href: '', children: '' },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Link-based (href) - for navigation
        </h3>
        <TopicNavigationList>
          <TopicNavigationItem href="/page-1" subCategory="A">
            Navigate to Page 1
          </TopicNavigationItem>
          <TopicNavigationItem href="/page-2" subCategory="B">
            Navigate to Page 2
          </TopicNavigationItem>
        </TopicNavigationList>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Button-based (onClick) - for actions
        </h3>
        <TopicNavigationList>
          <TopicNavigationItem onClick={() => alert('Opens modal')} subCategory="A">
            Open Modal for Topic A
          </TopicNavigationItem>
          <TopicNavigationItem onClick={() => alert('Opens modal')} subCategory="B">
            Open Modal for Topic B
          </TopicNavigationItem>
        </TopicNavigationList>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TopicNavigationItem can render as either a Link (with href) for navigation or a Button (with onClick) for actions like opening modals.',
      },
    },
  },
}
