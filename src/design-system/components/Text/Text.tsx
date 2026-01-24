import React from 'react'
import { cn } from '../../utils/cn'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div'
  variant?: 'body1' | 'body2' | 'small'
  bold?: boolean
  children: React.ReactNode
}

/**
 * Text component for body content with consistent typography.
 * 
 * Uses the design system's typography tokens via utility classes (.cpacc-body-*).
 * 
 * @example
 * <Text>Primary body text</Text>
 * <Text variant="body2">Secondary text</Text>
 * <Text variant="small">Caption or label</Text>
 * <Text bold>Bold body text</Text>
 */
export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ as = 'p', variant = 'body1', bold = false, className, children, ...props }, ref) => {
    const Component = as

    // Map variants to utility classes
    const variantClasses = {
      body1: bold ? 'cpacc-body-1-bold' : 'cpacc-body-1',
      body2: bold ? 'cpacc-body-2-bold' : 'cpacc-body-2',
      small: 'cpacc-text-small',
    }

    return (
      <Component
        ref={ref as any}
        className={cn(variantClasses[variant], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'
