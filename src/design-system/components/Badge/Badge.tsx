import React from 'react'
import { cn } from '../../utils/cn'
import type { LucideIcon } from '../../icons'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Size of the badge */
  size?: 'sm' | 'md' | 'lg'
  /** Optional icon to display on the left side */
  icon?: LucideIcon
  children: React.ReactNode
}

/**
 * Size styles mapped to design system typography tokens:
 * - sm: uses 'small' typography (12px)
 * - md: uses 'body-2' typography (14px)
 * - lg: uses 'body-1' typography (16px)
 * 
 * Note: We use text-small, text-body-2, text-body-1 for font sizing only,
 * NOT the cpacc-* classes which include color overrides that would
 * reduce contrast on the badge background.
 */
const sizeStyles = {
  sm: 'px-2 py-0.5 text-small',
  md: 'px-2.5 py-0.5 text-body-2',
  lg: 'px-3 py-1 text-body-1',
}

/**
 * Icon sizes that match the typography scale
 */
const iconSizes = {
  sm: 12,
  md: 14,
  lg: 16,
}

/**
 * Badge component using design system tokens.
 * 
 * Colors (from tokens/colors/base.ts):
 * - Light mode: gray-200 (#e5e7eb) background, gray-900 (#111827) text
 *   Contrast ratio: ~12.6:1 (WCAG AAA compliant)
 * - Dark mode: gray-800 (#1f2937) background, gray-100 (#f3f4f6) text
 *   Contrast ratio: ~11.8:1 (WCAG AAA compliant)
 * 
 * Typography: Uses text-body-* classes for font sizing only (not cpacc-*
 * classes which include color that would reduce contrast).
 * 
 * @example
 * // Basic badge
 * <Badge>Label</Badge>
 * 
 * // Badge with icon
 * <Badge icon={Clock}>5 min read</Badge>
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ size = 'md', icon: Icon, className, children, ...props }, ref) => {
    const iconSize = iconSizes[size]

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          // Colors using design system tokens (base.gray)
          'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {Icon && (
          <Icon
            size={iconSize}
            className="shrink-0 mr-1.5"
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
