import React from 'react'
import { cn } from '../../utils/cn'
import { components, brand, radius, spacing } from '../../tokens'

export interface RadioCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /**
   * Whether this option is currently selected
   */
  selected?: boolean
  /**
   * Click handler
   */
  onClick?: () => void
  /**
   * Content to display next to the radio indicator
   */
  children: React.ReactNode
}

/**
 * RadioCard - A selectable card with radio button indicator
 * 
 * Displays a card-style option with a radio circle on the left.
 * Uses brand tokens for colors, focus states (orange focus ring),
 * and selected state (orange border + indicator).
 * 
 * Designed for single-select question/answer interfaces.
 * 
 * @example
 * ```tsx
 * <RadioCard selected={isSelected} onClick={() => onSelect(index)}>
 *   <Text variant="body1">Option text</Text>
 * </RadioCard>
 * ```
 */
export const RadioCard = React.forwardRef<HTMLButtonElement, RadioCardProps>(
  ({ selected = false, className, children, disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isDark, setIsDark] = React.useState(
      () => document.documentElement.classList.contains('dark')
    )

    // Detect dark mode (consistent with other design system components)
    React.useEffect(() => {
      const checkDarkMode = () => {
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
      }

      checkDarkMode()

      const observer = new MutationObserver(checkDarkMode)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })

      return () => observer.disconnect()
    }, [])

    const getBorderColor = () => {
      if (disabled) {
        return isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)'
      }
      if (selected) {
        return isDark ? brand.orange[400] : brand.orange[500]
      }
      if (isHovered) {
        return isDark
          ? components.border.hover.dark
          : components.border.hover.light
      }
      return isDark
        ? components.border.default.dark
        : components.border.default.light
    }

    const getBackgroundColor = () => {
      if (disabled) {
        return isDark ? 'rgb(0, 0, 0)' : 'rgb(249, 250, 251)'
      }
      if (selected) {
        return isDark ? 'rgb(26, 20, 10)' : 'rgb(255, 247, 237)'
      }
      if (isHovered) {
        return isDark
          ? components.background.tertiary.dark
          : components.background.tertiary.light
      }
      return isDark
        ? components.background.elevated.dark
        : components.background.elevated.light
    }

    const getRadioIndicatorColor = () => {
      if (selected) {
        return isDark ? brand.navy[600] : brand.navy[500]
      }
      if (isHovered && !disabled) {
        return isDark
          ? components.border.hover.dark
          : components.border.hover.light
      }
      return isDark
        ? components.border.default.dark
        : components.border.default.light
    }

    const focusRingColor = isDark
      ? components.border.focus.dark
      : components.border.focus.light

    const textColor = isDark
      ? components.text.primary.dark
      : components.text.primary.light

    const baseStyles = 'w-full text-left transition-all duration-200 relative'
    const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-[var(--focus-ring-color)]'
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    return (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={selected}
        disabled={disabled}
        className={cn(baseStyles, focusStyles, disabledStyles, className)}
        style={{
          borderRadius: radius['2xl'],
          backgroundColor: getBackgroundColor(),
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: getBorderColor(),
          padding: spacing[4],
          color: textColor,
          '--focus-ring-color': focusRingColor,
        } as React.CSSProperties}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: spacing[3] }}>
          {/* Radio indicator */}
          <div
            aria-hidden="true"
            style={{
              flexShrink: 0,
              width: '22px',
              height: '22px',
              borderRadius: radius.full,
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: getRadioIndicatorColor(),
              backgroundColor: selected
                ? (isDark ? brand.navy[600] : brand.navy[500])
                : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '2px',
              transition: 'all 200ms ease',
            }}
          >
            {selected && (
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: radius.full,
                  backgroundColor: '#ffffff',
                }}
              />
            )}
          </div>

          {/* Content */}
          <div style={{ flex: 1 }}>
            {children}
          </div>
        </div>
      </button>
    )
  }
)

RadioCard.displayName = 'RadioCard'
