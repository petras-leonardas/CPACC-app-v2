import React from 'react'
import { components, brand, typography } from '../../tokens'
import { useDarkMode } from '../../hooks/useDarkMode'
import { focusRingClassesOnDark } from '../../utils/focusStyles'

export interface NavigationButtonProps {
  /**
   * Navigation destination URL. Provides a real href for right-click → Open in new tab,
   * crawlability, and correct link semantics.
   */
  href?: string
  /**
   * Click handler for SPA navigation. Called after e.preventDefault()
   * so React Router handles the transition instead of a full page load.
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  /**
   * Direction of navigation
   */
  direction: 'previous' | 'next'
  /**
   * Label text (e.g., "Previous", "Next")
   */
  label: string
  /**
   * Main title text
   */
  title: string
  /**
   * Optional icon component
   */
  icon?: React.ReactNode
  /**
   * Whether this is the current/active item
   */
  active?: boolean
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Data attribute for tracking
   */
  'data-tracking-id'?: string
  /**
   * Accessibility label
   */
  'aria-label'?: string
}

/**
 * NavigationButton component for topic prev/next navigation
 * 
 * Features:
 * - Matches NavigationItem visual pattern
 * - Active state: Navy background, white text, orange left border
 * - Hover state: Light gray background (when not active)
 * - Focus state: Orange focus ring
 * - Dark mode support with design tokens
 * - Directional layout (icon placement based on direction)
 * - Accessibility support
 * 
 * @example
 * // Previous navigation
 * <NavigationButton
 *   href="/domain-1/medical-model"
 *   direction="previous"
 *   label="Previous"
 *   title="Medical model"
 *   icon={<ChevronLeft />}
 *   onClick={(e) => { e.preventDefault(); navigate('/domain-1/medical-model') }}
 * />
 * 
 * @example
 * // Next navigation
 * <NavigationButton
 *   href="/domain-1/social-model"
 *   direction="next"
 *   label="Next"
 *   title="Social model"
 *   icon={<ChevronRight />}
 *   onClick={(e) => { e.preventDefault(); navigate('/domain-1/social-model') }}
 * />
 */
export function NavigationButton({
  href,
  onClick,
  direction,
  label,
  title,
  icon,
  active = false,
  className = '',
  'data-tracking-id': dataTrackingId,
  'aria-label': ariaLabel,
}: NavigationButtonProps) {
  const isDark = useDarkMode()

  // Active state: Navy background with white text
  // Inactive state: Transparent background with gray text
  const colors = active
    ? {
        background: isDark ? brand.navy[600] : brand.navy[500],
        color: components.text.inverse.light,
        hoverBackground: isDark ? brand.navy[600] : brand.navy[500],
      }
    : {
        background: 'transparent',
        color: isDark 
          ? components.text.primary.dark 
          : components.text.primary.light,
        hoverBackground: isDark 
          ? components.background.tertiary.dark 
          : components.background.tertiary.light,
      }

  // Focus ring color (same as other navigation components)
  const focusRingColor = isDark 
    ? components.border.focus.dark 
    : components.border.focus.light

  // Active state styling with orange left border
  // Must match NavigationItem padding calculations for aligned text
  const borderStyles = active
    ? {
        borderLeft: `8px solid ${brand.orange[500]}`,
        paddingLeft: 'calc(1rem + 8px)',
      }
    : {
        borderLeft: '8px solid transparent',
        paddingLeft: 'calc(1rem - 8px)',
      }

  const isPrevious = direction === 'previous'

  return (
    <a
      href={href}
      onClick={onClick}
      className={`
        block w-full rounded-lg px-4 py-3 text-left
        transition-all duration-200 ease-in-out
        no-underline cursor-pointer
        ${focusRingClassesOnDark}
        ${className}
      `}
      style={{
        backgroundColor: colors.background,
        color: colors.color,
        textDecoration: 'none',
        '--focus-ring-color': focusRingColor,
        ...borderStyles,
      } as React.CSSProperties}
      data-tracking-id={dataTrackingId}
      aria-label={ariaLabel}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = colors.hoverBackground
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = colors.background
        }
      }}
    >
      <div className={`flex items-center gap-3 ${isPrevious && icon ? 'flex-row' : icon ? 'flex-row-reverse' : 'flex-row'}`}>
        {icon && (
          <div className="flex-shrink-0">
            {icon}
          </div>
        )}
        <div className={`flex-1 min-w-0 ${!icon ? 'text-left' : isPrevious ? 'text-left' : 'text-right'}`}>
          <div
            style={{
              fontSize: typography.fontSize.small.size,
              lineHeight: typography.fontSize.small.lineHeight,
              fontWeight: typography.fontWeight.regular,
              color: active ? components.text.inverse.light : (isDark ? components.text.secondary.dark : components.text.secondary.light),
              opacity: 0.8,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: typography.fontSize['body-1'].size,
              lineHeight: typography.fontSize['body-1'].lineHeight,
              fontWeight: active ? typography.fontWeight.medium : typography.fontWeight.regular,
              marginTop: '0.25rem',
            }}
            className="truncate"
          >
            {title}
          </div>
        </div>
      </div>
    </a>
  )
}
