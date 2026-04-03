import React from 'react'
import { cn } from '../../utils/cn'
import { Tooltip } from '../Tooltip/Tooltip'
import { useDarkMode } from '../../hooks/useDarkMode'
import {
  focusStyles,
  disabledStyles,
  getVariantStyles,
  LoadingSpinner,
  iconButtonSpinnerSizes,
} from '../Button/buttonStyles'
import type { ButtonVariant } from '../Button/buttonStyles'

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Visual style variant
   */
  variant?: ButtonVariant
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean
  /**
   * Icon to display (required)
   */
  icon: React.ReactNode
  /**
   * Accessible label for screen readers (required)
   */
  'aria-label': string
  /**
   * Optional tooltip text to display on hover
   * When provided, automatically wraps button with Tooltip component
   */
  tooltip?: string
  /**
   * Tooltip position (only used if tooltip prop is provided)
   */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

/**
 * Base button styles (no gap since icon-only)
 */
const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200'

/**
 * Size styles - square dimensions for icon-only buttons
 */
const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return {
        className: 'p-1.5 w-8 h-8',
        iconSize: 16,
      }
    case 'md':
      return {
        className: 'p-2.5 w-10 h-10',
        iconSize: 20,
      }
    case 'lg':
      return {
        className: 'p-3 w-12 h-12',
        iconSize: 24,
      }
  }
}

/**
 * Icon-only Button component using CPACC Mastery brand colors
 * 
 * Features:
 * - Brand color integration (Navy primary, Orange focus)
 * - Multiple variants: primary (filled navy), secondary (outlined navy), ghost (transparent)
 * - Three sizes: sm (32px), md (40px), lg (48px)
 * - Loading state with spinner
 * - Full accessibility support with required aria-label
 * - Keyboard navigation ready
 * - Dark mode support
 * 
 * @example
 * <IconButton 
 *   icon={<Settings />} 
 *   aria-label="Open settings" 
 *   variant="primary" 
 * />
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    tooltip,
    tooltipPosition = 'top',
    className, 
    disabled, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const isDark = useDarkMode()

    const variantConfig = getVariantStyles(variant, isDark)
    const sizeConfig = getSizeStyles(size)

    const combinedStyle = {
      ...variantConfig.style,
      ...(isHovered && !disabled && !loading ? variantConfig.hoverStyle : {}),
    }

    const button = (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          focusStyles,
          disabledStyles,
          sizeConfig.className,
          variantConfig.className,
          className
        )}
        style={{
          ...combinedStyle,
          '--focus-ring-color': variantConfig.focusRingColor,
        } as React.CSSProperties}
        disabled={disabled || loading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {loading ? <LoadingSpinner sizeClass={iconButtonSpinnerSizes[size]} /> : icon}
      </button>
    )

    // Wrap with Tooltip if tooltip prop is provided
    if (tooltip) {
      return (
        <Tooltip content={tooltip} position={tooltipPosition}>
          {button}
        </Tooltip>
      )
    }

    return button
  }
)

IconButton.displayName = 'IconButton'
