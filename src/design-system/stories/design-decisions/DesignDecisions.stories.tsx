import type { Meta, StoryObj } from '@storybook/react'
import { ButtonsVsLinksArticle } from './articles/ButtonsVsLinks'
import { ButtonsVsLinksCaseStudyArticle } from './articles/ButtonsVsLinksCaseStudy'
import { ButtonsVsLinksStartLearningArticle } from './articles/ButtonsVsLinksStartLearning'
import { CardComponentPatternsArticle } from './articles/CardComponentPatterns'
import { EscapeKeyNavigationArticle } from './articles/EscapeKeyNavigation'
import { ExternalLinkIconsArticle } from './articles/ExternalLinkIcons'
import { FooterLinkUnderlinesArticle } from './articles/FooterLinkUnderlines'
import { LinksStyledAsButtonsArticle } from './articles/LinksStyledAsButtons'
import { SkipLinksArticle } from './articles/SkipLinks'
import { TypographyComponentsArticle } from './articles/TypographyArchitecture'

const meta: Meta = {
  title: 'Design decisions',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const ButtonsVsLinks: Story = {
  name: 'Buttons vs links: semantic guide',
  render: () => <ButtonsVsLinksArticle />,
}

export const ButtonsVsLinksCaseStudy: Story = {
  name: 'Quick test: Button vs. link decision',
  render: () => <ButtonsVsLinksCaseStudyArticle />,
}

export const ButtonsVsLinksStartLearning: Story = {
  name: 'Case study: Start learning component',
  render: () => <ButtonsVsLinksStartLearningArticle />,
}

export const CardComponentPatterns: Story = {
  name: 'Card component patterns',
  render: () => <CardComponentPatternsArticle />,
}

export const EscapeKeyNavigation: Story = {
  name: 'Escape key navigation: Closing UI elements',
  render: () => <EscapeKeyNavigationArticle />,
}

export const ExternalLinkIcons: Story = {
  name: 'External links',
  render: () => <ExternalLinkIconsArticle />,
}

export const FooterLinkUnderlines: Story = {
  name: 'Footer link underlines',
  render: () => <FooterLinkUnderlinesArticle />,
}

export const LinksStyledAsButtons: Story = {
  name: 'Why links and buttons should be styled differently',
  render: () => <LinksStyledAsButtonsArticle />,
}

export const SkipLinks: Story = {
  name: 'Skip links: Bypassing repetitive content',
  render: () => <SkipLinksArticle />,
}

export const TypographyComponents: Story = {
  name: 'Typography as components: Architecture & benefits',
  render: () => <TypographyComponentsArticle />,
}
