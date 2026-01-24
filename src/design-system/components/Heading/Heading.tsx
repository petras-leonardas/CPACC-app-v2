import React from 'react'
import { cn } from '../../utils/cn'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
}

/**
 * Heading component that enforces semantic HTML and applies typography tokens.
 * 
 * Uses the design system's typography tokens via utility classes (.cpacc-heading-*).
 * Automatically applies responsive sizing (mobile → desktop).
 * 
 * @example
 * <Heading as="h1">Page Title</Heading>
 * <Heading as="h2">Section Heading</Heading>
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, className, children, ...props }, ref) => {
    const Component = as

    // Map heading levels to utility classes
    const headingClasses = {
      h1: 'cpacc-heading-1',
      h2: 'cpacc-heading-2',
      h3: 'cpacc-heading-3',
      h4: 'cpacc-heading-3', // h4-h6 use h3 styles by default
      h5: 'cpacc-heading-3',
      h6: 'cpacc-heading-3',
    }

    return (
      <Component
        ref={ref}
        className={cn(headingClasses[as], className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'
