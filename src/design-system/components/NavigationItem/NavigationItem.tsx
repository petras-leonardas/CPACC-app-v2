import React, { useState, useEffect } from 'react'
import { components, brand, typography } from '../../tokens'

export interface NavigationItemProps {
  /**
   * Navigation destination URL or hash
   */
  href?: string
  /**
   * Whether this navigation item is currently active
   */
  active?: boolean
  /**
   * Click handler for programmatic navigation
   */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  /**
   * Main navigation text
   */
  children: React.ReactNode
  /**
   * Optional subtitle text (e.g., "5 topics (A-E)")
   */
  subtitle?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Data attribute for tracking
   */
  'data-tracking-id'?: string
}

/**
 * NavigationItem component for sidebar navigation
 * 
 * Features:
 * - Active state with brand color accent
 * - Optional subtitle for multi-line items
 * - Proper semantic HTML (uses Link component)
 * - Dark mode support with design tokens
 * - Hover states
 * - Accessibility support
 * 
 * @example
 * // Simple navigation item
 * <NavigationItem href="/home" active={true}>
 *   Home
 * </NavigationItem>
 * 
 * @example
 * // With subtitle
 * <NavigationItem 
 *   href="/domain-1" 
 *   active={false}
 *   subtitle="5 topics (A-E)"
 * >
 *   Disabilities, challenges & assistive technologies
 * </NavigationItem>
 */
export function NavigationItem({
  href = '#',
  active = false,
  onClick,
  children,
  subtitle,
  className = '',
  'data-tracking-id': dataTrackingId,
}: NavigationItemProps) {
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
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

  // Active state styling
  const activeStyles = active
    ? {
        backgroundColor: isDark ? brand.navy[600] : brand.navy[500],
        color: components.text.inverse.light, // White text on navy background
        borderLeft: `8px solid ${brand.orange[500]}`,
        paddingLeft: 'calc(1rem + 8px)', // Extra 8px padding - creates 16px visual shift to the right
      }
    : {
        backgroundColor: 'transparent',
        borderLeft: '8px solid transparent',
        paddingLeft: 'calc(1rem - 8px)', // Compensate for transparent border
      }

  // Hover state colors
  const hoverBg = isDark
    ? components.background.tertiary.dark
    : components.background.tertiary.light

  // Focus ring color (same as Button component)
  const focusRingColor = isDark 
    ? components.border.focus.dark 
    : components.border.focus.light

  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        block w-full rounded-lg px-4 py-3 text-left
        transition-all duration-200 ease-in-out
        no-underline cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        dark:focus-visible:ring-offset-gray-950 focus-visible:ring-[var(--focus-ring-color)]
        ${className}
      `}
      style={{
        ...activeStyles,
        color: active ? activeStyles.color : (isDark ? components.text.primary.dark : components.text.primary.light),
        textDecoration: 'none',
        '--focus-ring-color': focusRingColor,
      } as React.CSSProperties}
      data-tracking-id={dataTrackingId}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = hoverBg
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      <div className="flex flex-col gap-1">
        {/* Main text */}
        <div
          style={{
            fontSize: typography.fontSize['body-1'].size,
            lineHeight: typography.fontSize['body-1'].lineHeight,
            fontWeight: active ? typography.fontWeight.medium : typography.fontWeight.regular,
          }}
        >
          {children}
        </div>

        {/* Subtitle text */}
        {subtitle && (
          <div
            style={{
              fontSize: typography.fontSize.small.size,
              lineHeight: typography.fontSize.small.lineHeight,
              fontWeight: typography.fontWeight.regular,
              color: active ? components.text.inverse.light : (isDark ? components.text.secondary.dark : components.text.secondary.light),
              opacity: active ? 0.9 : 0.8,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </a>
  )
}
