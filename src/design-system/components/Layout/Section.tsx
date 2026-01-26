import React from 'react'
import { cn } from '../../utils/cn'
import { layout } from '../../tokens/layout'
import { Container } from './Container'
import type { BackgroundVariant, SectionPadding, ContainerSize } from './Layout.types'

export interface SectionProps {
  /**
   * Semantic HTML element
   * @default 'section'
   */
  as?: 'section' | 'article' | 'aside' | 'div' | 'main'
  /**
   * Background treatment
   * @default 'default'
   */
  background?: BackgroundVariant
  /**
   * Vertical padding
   * @default 'md'
   */
  padding?: SectionPadding
  /**
   * Automatically wrap children in Container
   * @default false
   */
  container?: boolean
  /**
   * Container size (only used if container=true)
   * @default 'xl'
   */
  containerSize?: ContainerSize
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Child elements
   */
  children: React.ReactNode
}

/**
 * Section - Semantic page sections with consistent styling
 * 
 * Provides consistent background treatments and vertical padding for page sections.
 * Can automatically wrap children in a Container for convenience.
 * 
 * @example
 * ```tsx
 * <Section background="subtle" padding="lg" container>
 *   <h2>Section Title</h2>
 *   <p>Section content...</p>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = 'section',
      background = 'default',
      padding = 'md',
      container = false,
      containerSize = 'xl',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const content = container ? (
      <Container size={containerSize}>{children}</Container>
    ) : (
      children
    )

    return (
      <Component
        ref={ref as any}
        className={cn(
          layout.section.padding[padding],
          layout.section.background[background],
          className
        )}
        {...props}
      >
        {content}
      </Component>
    )
  }
)

Section.displayName = 'Section'
