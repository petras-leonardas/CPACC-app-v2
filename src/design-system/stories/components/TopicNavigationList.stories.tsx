import type { Meta, StoryObj } from '@storybook/react'
import { TopicNavigationList } from '../../components/TopicNavigationList'
import { TopicNavigationItem } from '../../components/TopicNavigationItem'

const meta = {
  title: 'Components/Navigation/TopicNavigationList',
  component: TopicNavigationList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopicNavigationList>

export default meta
type Story = StoryObj<typeof meta>

export const Domain1Example: Story = {
  args: { children: <div /> },
  render: () => (
    <TopicNavigationList>
      <TopicNavigationItem 
        href="/disabilities-challenges-assistive-technology/disability-models" 
        subCategory="A"
      >
        Theoretical models of disability
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/disabilities-challenges-assistive-technology/disability-categories" 
        subCategory="B"
      >
        Categories and characteristics of disability
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/disabilities-challenges-assistive-technology/assistive-tech" 
        subCategory="C"
      >
        Assistive technologies and adaptive strategies
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/disabilities-challenges-assistive-technology/web-accessibility" 
        subCategory="D"
      >
        Web accessibility fundamentals
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/disabilities-challenges-assistive-technology/document-accessibility" 
        subCategory="E"
      >
        Document accessibility
      </TopicNavigationItem>
    </TopicNavigationList>
  ),
}

export const Domain2Example: Story = {
  args: { children: <div /> },
  render: () => (
    <TopicNavigationList>
      <TopicNavigationItem 
        href="/accessibility-universal-design/principles" 
        subCategory="A"
      >
        Principles of universal design
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/accessibility-universal-design/wcag" 
        subCategory="B"
      >
        Web Content Accessibility Guidelines (WCAG)
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/accessibility-universal-design/aria" 
        subCategory="C"
      >
        ARIA and accessible rich internet applications
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/accessibility-universal-design/testing" 
        subCategory="D"
      >
        Accessibility testing and evaluation
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/accessibility-universal-design/design-patterns" 
        subCategory="E"
      >
        Accessible design patterns
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/accessibility-universal-design/mobile" 
        subCategory="F"
      >
        Mobile accessibility
      </TopicNavigationItem>
    </TopicNavigationList>
  ),
}

export const ShortList: Story = {
  args: { children: <div /> },
  render: () => (
    <TopicNavigationList>
      <TopicNavigationItem 
        href="/domain/topic-1" 
        subCategory="A"
      >
        First topic
      </TopicNavigationItem>
      <TopicNavigationItem 
        href="/domain/topic-2" 
        subCategory="B"
      >
        Second topic
      </TopicNavigationItem>
    </TopicNavigationList>
  ),
}

export const WithCustomClassName: Story = {
  args: { children: <div /> },
  render: () => (
    <TopicNavigationList className="max-w-2xl mx-auto">
      <TopicNavigationItem href="/topic-1">Topic 1</TopicNavigationItem>
      <TopicNavigationItem href="/topic-2">Topic 2</TopicNavigationItem>
      <TopicNavigationItem href="/topic-3">Topic 3</TopicNavigationItem>
    </TopicNavigationList>
  ),
}

export const ResponsiveExample: Story = {
  args: { children: <div /> },
  render: () => (
    <div>
      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
        This component is fully responsive and works on all screen sizes. The container has consistent padding and spacing.
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
          Categories and characteristics including visual, auditory, motor, and cognitive disabilities
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

export const UsageInDomainPage: Story = {
  args: { children: <div /> },
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Domain 1: Disabilities, Challenges & Assistive Technologies
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          This domain introduces how disability is defined, experienced, and shaped by the interaction 
          between people, environments, and systems.
        </p>
      </div>
      
      <TopicNavigationList>
        <TopicNavigationItem 
          href="/disabilities-challenges-assistive-technology/disability-models" 
          subCategory="A"
          data-tracking-id="domain-1-topic-disability-models"
        >
          Theoretical models of disability
        </TopicNavigationItem>
        <TopicNavigationItem 
          href="/disabilities-challenges-assistive-technology/disability-categories" 
          subCategory="B"
          data-tracking-id="domain-1-topic-disability-categories"
        >
          Categories and characteristics of disability
        </TopicNavigationItem>
        <TopicNavigationItem 
          href="/disabilities-challenges-assistive-technology/assistive-tech" 
          subCategory="C"
          data-tracking-id="domain-1-topic-assistive-tech"
        >
          Assistive technologies and adaptive strategies
        </TopicNavigationItem>
        <TopicNavigationItem 
          href="/disabilities-challenges-assistive-technology/web-accessibility" 
          subCategory="D"
          data-tracking-id="domain-1-topic-web-accessibility"
        >
          Web accessibility fundamentals
        </TopicNavigationItem>
        <TopicNavigationItem 
          href="/disabilities-challenges-assistive-technology/document-accessibility" 
          subCategory="E"
          data-tracking-id="domain-1-topic-document-accessibility"
        >
          Document accessibility
        </TopicNavigationItem>
      </TopicNavigationList>
    </div>
  ),
}
