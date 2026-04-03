import React from 'react'
import { cn } from '../../utils/cn'
import { typography } from '../../tokens'
import { useDarkMode } from '../../hooks/useDarkMode'
import {
  focusStyles,
  disabledStyles,
  getVariantStyles,
  LoadingSpinner,
  buttonSpinnerSizes,
} from './buttonStyles'
import type { ButtonVariant } from './buttonStyles'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   */
  variant?: ButtonVariant
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * Full width button
   */
  fullWidth?: boolean
  /**
   * Loading state - shows spinner and disables interaction
   */
  loading?: boolean
  /**
   * Icon to display before children
   */
  leftIcon?: React.ReactNode
  /**
   * Icon to display after children
   */
  rightIcon?: React.ReactNode
  /**
   * Button content
   */
  children: React.ReactNode
}

/**
 * Base button styles
 */
const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200'

/**
 * Size styles using typography tokens
 */
const getSizeStyles = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return {
        className: 'px-3 py-1.5 min-h-[32px]',
        style: {
          fontSize: typography.fontSize.small.size,
          lineHeight: typography.fontSize.small.lineHeight,
          fontWeight: typography.fontWeight.medium,
        },
      }
    case 'md':
      return {
        className: 'px-4 py-2.5 min-h-[40px]',
        style: {
          fontSize: typography.fontSize['body-2'].size,
          lineHeight: typography.fontSize['body-2'].lineHeight,
          fontWeight: typography.fontWeight.medium,
        },
      }
    case 'lg':
      return {
        className: 'px-6 py-3 min-h-[48px]',
        style: {
          fontSize: typography.fontSize['body-1'].size,
          lineHeight: typography.fontSize['body-1'].lineHeight,
          fontWeight: typography.fontWeight.medium,
        },
      }
  }
}

/**
 * Production-ready Button component using CPACC Mastery brand colors
 * 
 * Features:
 * - Brand color integration (Navy primary, Orange focus)
 * - Multiple variants: primary (filled navy), secondary (outlined navy), ghost (transparent)
 * - Three sizes: sm, md, lg
 * - Loading state with spinner
 * - Icon support (left/right)
 * - Full accessibility support
 * - Keyboard navigation ready
 * - Dark mode support
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    className, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const isDark = useDarkMode()

    const variantConfig = getVariantStyles(variant, isDark)
    const sizeConfig = getSizeStyles(size)

    const combinedStyle = {
      ...variantConfig.style,
      ...sizeConfig.style,
      ...(isHovered && !disabled && !loading ? variantConfig.hoverStyle : {}),
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          focusStyles,
          disabledStyles,
          sizeConfig.className,
          variantConfig.className,
          fullWidth && 'w-full',
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
        {loading && <LoadingSpinner sizeClass={buttonSpinnerSizes[size]} />}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
