import React from 'react'
import { cn } from '../../utils/cn'
import { components, typography } from '../../tokens'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   */
  variant?: 'primary' | 'secondary' | 'ghost'
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
 * Focus styles using brand orange accent
 * Note: Ring color is applied via inline style using --focus-ring-color CSS variable
 */
const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-[var(--focus-ring-color)]'

/**
 * Disabled styles
 */
const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

/**
 * Variant styles using brand color tokens with dark mode support
 */
const getVariantStyles = (variant: ButtonProps['variant'], isDark: boolean) => {
  switch (variant) {
    case 'primary':
      return {
        className: 'shadow-sm',
        style: {
          backgroundColor: isDark 
            ? components.button.primary.background.dark 
            : components.button.primary.background.light,
          color: isDark 
            ? components.button.primary.text.dark 
            : components.button.primary.text.light,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isDark 
            ? components.button.primary.border.dark 
            : components.button.primary.border.light,
        },
        hoverStyle: {
          backgroundColor: isDark 
            ? components.button.primary.backgroundHover.dark 
            : components.button.primary.backgroundHover.light,
        },
        focusRingColor: isDark 
          ? components.border.focus.dark 
          : components.border.focus.light,
      }
    case 'secondary':
      return {
        className: '',
        style: {
          backgroundColor: isDark 
            ? components.button.outline.background.dark 
            : components.button.outline.background.light,
          color: isDark 
            ? components.button.outline.text.dark 
            : components.button.outline.text.light,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: isDark 
            ? components.button.outline.border.dark 
            : components.button.outline.border.light,
        },
        hoverStyle: {
          backgroundColor: isDark 
            ? components.button.outline.backgroundHover.dark 
            : components.button.outline.backgroundHover.light,
        },
        focusRingColor: isDark 
          ? components.border.focus.dark 
          : components.border.focus.light,
      }
    case 'ghost':
      return {
        className: '',
        style: {
          backgroundColor: isDark 
            ? components.button.ghost.background.dark 
            : components.button.ghost.background.light,
          color: isDark 
            ? components.button.ghost.text.dark 
            : components.button.ghost.text.light,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
        },
        hoverStyle: {
          backgroundColor: isDark 
            ? components.button.ghost.backgroundHover.dark 
            : components.button.ghost.backgroundHover.light,
        },
        focusRingColor: isDark 
          ? components.border.focus.dark 
          : components.border.focus.light,
      }
    default:
      return getVariantStyles('primary', isDark)
  }
}

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
 * Loading spinner component
 */
const LoadingSpinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const spinnerSize = size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
  return (
    <svg
      className={cn('animate-spin', spinnerSize)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
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
    const [isDark, setIsDark] = React.useState(false)

    // Detect dark mode
    React.useEffect(() => {
      const checkDarkMode = () => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
      }

      // Initial check
      checkDarkMode()

      // Watch for changes
      const observer = new MutationObserver(checkDarkMode)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })

      return () => observer.disconnect()
    }, [])

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
        {loading && <LoadingSpinner size={size} />}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
