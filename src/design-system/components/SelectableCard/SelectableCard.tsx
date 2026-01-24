import React from 'react'
import { cn } from '../../utils/cn'
import { components, brand } from '../../tokens'

export interface SelectableCardProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  selected?: boolean
  onClick?: () => void
  children: React.ReactNode
}

export const SelectableCard = React.forwardRef<HTMLButtonElement, SelectableCardProps>(
  ({ selected = false, className, children, disabled, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isDark, setIsDark] = React.useState(false)

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

    const getBackgroundColor = () => {
      if (disabled) {
        return isDark ? 'rgb(0, 0, 0)' : 'rgb(249, 250, 251)'
      }
      if (selected) {
        return isDark ? 'rgb(26, 26, 26)' : 'rgb(255, 247, 237)'
      }
      if (isHovered && !disabled) {
        return isDark ? components.background.tertiary.dark : components.background.tertiary.light
      }
      return isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)'
    }

    const getBorderColor = () => {
      if (disabled) {
        return isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)'
      }
      if (selected) {
        return brand.orange[500]
      }
      if (isHovered && !disabled) {
        return isDark ? 'rgb(75, 85, 99)' : 'rgb(107, 114, 128)'
      }
      return isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)'
    }

    const getBorderWidth = () => {
      return '2px'
    }

    const getShadow = () => {
      if (disabled) return 'none'
      if (isHovered && !disabled && !selected) {
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.05)'
      }
      return 'none'
    }

    const baseStyles = 'w-full text-left transition-all duration-200 relative'
    const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'
    const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(baseStyles, focusStyles, disabledStyles, 'p-4', className)}
        style={{
          borderRadius: '16px',
          backgroundColor: getBackgroundColor(),
          borderWidth: getBorderWidth(),
          borderStyle: 'solid',
          borderColor: getBorderColor(),
          boxShadow: getShadow(),
          '--tw-ring-color': isDark ? components.border.focus.dark : components.border.focus.light,
        } as React.CSSProperties}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-pressed={selected}
        {...props}
      >
        {children}
        {selected && (
          <div 
            className="absolute top-4 right-4"
            aria-hidden="true"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="10" fill={brand.orange[500]} />
              <path
                d="M14.5 6.5L8.5 12.5L5.5 9.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </button>
    )
  }
)

SelectableCard.displayName = 'SelectableCard'
