import React from 'react'
import { cn } from '../../utils/cn'
import { layout } from '../../tokens/layout'
import type { ContainerSize, PaddingSize } from './Layout.types'

export interface ContainerProps {
  /**
   * Width constraint for the container
   * @default 'xl'
   */
  size?: ContainerSize
  /**
   * Horizontal padding
   * @default 'md'
   */
  padding?: boolean | PaddingSize
  /**
   * Center content horizontally
   * @default true
   */
  center?: boolean
  /**
   * Semantic HTML element
   * @default 'div'
   */
  as?: 'div' | 'main' | 'section' | 'article'
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
 * Container - Content width wrapper with responsive padding
 * 
 * Provides consistent max-width constraints and horizontal padding for page content.
 * Replaces the legacy GridContainer component.
 * 
 * @example
 * ```tsx
 * <Container size="lg" padding="md">
 *   <h1>Page Content</h1>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'xl',
      padding = 'md',
      center = true,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine padding class
    const paddingClass = 
      padding === false ? '' :
      padding === true ? layout.padding.md :
      layout.padding[padding]

    return (
      <Component
        ref={ref}
        className={cn(
          layout.container[size],
          paddingClass,
          center && 'mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Container.displayName = 'Container'
