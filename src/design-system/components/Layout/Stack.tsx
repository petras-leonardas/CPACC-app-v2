import React from 'react'
import { cn } from '../../utils/cn'
import { layout } from '../../tokens/layout'
import type { SpacingSize, AlignItems, JustifyContent } from './Layout.types'

export interface StackProps {
  /**
   * Stack direction
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal'
  /**
   * Spacing between items
   * @default 'md'
   */
  spacing?: SpacingSize
  /**
   * Align items
   */
  align?: AlignItems
  /**
   * Justify content
   */
  justify?: JustifyContent
  /**
   * Allow wrapping
   * @default false
   */
  wrap?: boolean
  /**
   * Divider element between items
   */
  divider?: React.ReactNode
  /**
   * Semantic HTML element
   * @default 'div'
   */
  as?: 'div' | 'section' | 'nav' | 'ul' | 'ol'
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
 * Stack - Flexbox utility for consistent spacing
 * 
 * Provides vertical or horizontal stacking with consistent gaps.
 * Eliminates the need for manual flex/gap classes.
 * 
 * @example
 * ```tsx
 * <Stack spacing="lg" align="center">
 *   <Button>Action 1</Button>
 *   <Button>Action 2</Button>
 * </Stack>
 * ```
 */
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      spacing = 'md',
      align,
      justify,
      wrap = false,
      divider,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row'
    const alignClass = align ? `items-${align}` : ''
    const justifyClass = justify ? `justify-${justify}` : ''
    const wrapClass = wrap ? 'flex-wrap' : ''

    // If divider is provided, we need to intersperse it between children
    const childrenArray = React.Children.toArray(children)
    const content = divider && childrenArray.length > 1
      ? childrenArray.reduce<React.ReactNode[]>((acc, child, index) => {
          if (index === 0) return [child]
          return [...acc, <div key={`divider-${index}`}>{divider}</div>, child]
        }, [])
      : children

    return (
      <Component
        ref={ref as any}
        className={cn(
          'flex',
          flexDirection,
          layout.spacing[spacing],
          alignClass,
          justifyClass,
          wrapClass,
          className
        )}
        {...props}
      >
        {content}
      </Component>
    )
  }
)

Stack.displayName = 'Stack'
