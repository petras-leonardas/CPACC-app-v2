import React from 'react'
import { cn } from '../../utils/cn'
import { layout } from '../../tokens/layout'
import type { SpacingSize, AlignItems } from './Layout.types'

export interface GridProps {
  /**
   * Number of columns (will be responsive by default)
   * @default 12
   */
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  /**
   * Gap between grid items
   * @default 'md'
   */
  gap?: SpacingSize
  /**
   * Enable responsive column behavior
   * @default true
   */
  responsive?: boolean
  /**
   * Align items vertically
   */
  alignItems?: AlignItems
  /**
   * Justify items horizontally
   */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch'
  /**
   * Semantic HTML element
   * @default 'div'
   */
  as?: 'div' | 'section' | 'article'
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
 * Grid - 12-column responsive grid system
 * 
 * Provides a flexible grid layout with automatic responsive behavior.
 * Use with col-span-* classes on children for column control.
 * 
 * @example
 * ```tsx
 * <Grid cols={12} gap="lg">
 *   <div className="col-span-8">Main content</div>
 *   <div className="col-span-4">Sidebar</div>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols = 12,
      gap = 'md',
      responsive = true,
      alignItems,
      justifyItems,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Column class mapping
    const colClass = {
      1: 'grid-cols-1',
      2: responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
      3: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
      4: responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
      6: responsive ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-6',
      12: 'grid-cols-12',
    }[cols]

    // Alignment classes
    const alignClass = alignItems ? `items-${alignItems}` : ''
    const justifyClass = justifyItems ? `justify-items-${justifyItems}` : ''

    return (
      <Component
        ref={ref}
        className={cn(
          'grid',
          colClass,
          layout.spacing[gap],
          alignClass,
          justifyClass,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Grid.displayName = 'Grid'
