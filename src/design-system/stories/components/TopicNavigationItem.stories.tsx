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
        Hover over items to see the interactive hover state. The chevron also changes color on hover.
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
