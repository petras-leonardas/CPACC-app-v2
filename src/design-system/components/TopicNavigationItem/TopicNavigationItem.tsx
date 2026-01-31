import React, { useState, useEffect } from 'react'
import { components, typography } from '../../tokens'
import { Link } from '../Link/Link'
import { cn } from '../../utils/cn'

export interface TopicNavigationItemProps {
  /**
   * Navigation destination URL (renders as Link)
   * Either href or onClick must be provided
   */
  href?: string
  /**
   * Click handler (renders as button)
   * Either href or onClick must be provided
   */
  onClick?: () => void
  /**
   * Topic title
   */
  children: React.ReactNode
  /**
   * Optional subcategory label (e.g., "A", "B", "C")
   */
  subCategory?: string
  /**
   * Whether this item should appear emphasized (bolder text)
   * Useful for footer actions like "Test all topics"
   */
  emphasized?: boolean
  /**
   * Data attribute for tracking
   */
  'data-tracking-id'?: string
  /**
   * Additional CSS classes
   */
  className?: string
}

// Focus styles matching design system pattern
const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-[var(--focus-ring-color)]'

/**
 * TopicNavigationItem component for domain topic lists
 * 
 * Features:
 * - Horizontal layout with topic title and chevron
 * - Optional subcategory prefix (e.g., "A. Topic Title")
 * - Hover state: Background color change
 * - Focus state: Orange focus ring (consistent with design system)
 * - Chevron icon on the right
 * - Dark mode support with design tokens
 * - Supports both link (href) and button (onClick) modes
 * - Optional emphasized styling for footer actions
 * 
 * @example
 * // Link-based navigation
 * <TopicNavigationItem href="/domain/topic-id">
 *   Theoretical models of disability
 * </TopicNavigationItem>
 * 
 * @example
 * // Button-based action (e.g., opens modal)
 * <TopicNavigationItem onClick={() => handleClick()}>
 *   Select this topic
 * </TopicNavigationItem>
 * 
 * @example
 * // Emphasized footer action
 * <TopicNavigationItem onClick={handleTestAll} emphasized>
 *   Test all topics
 * </TopicNavigationItem>
 */
export function TopicNavigationItem({
  href,
  onClick,
  children,
  subCategory,
  emphasized = false,
  'data-tracking-id': dataTrackingId,
  className = '',
}: TopicNavigationItemProps) {
  const [isDark, setIsDark] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

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

  // Focus ring color (orange accent from design system)
  const focusRingColor = isDark
    ? components.border.focus.dark   // #F39C52
    : components.border.focus.light  // #E67E22

  // Hover background colors
  const hoverBg = isDark
    ? components.background.tertiary.dark
    : components.background.tertiary.light

  // Text colors
  const textColor = isDark
    ? components.text.primary.dark
    : components.text.primary.light

  // Chevron color
  const chevronColor = isDark
    ? components.text.tertiary.dark
    : components.text.tertiary.light

  const chevronHoverColor = isDark
    ? components.text.secondary.dark
    : components.text.secondary.light

  // Shared styles for both button and link
  const sharedClassName = cn(
    'flex items-center justify-between px-4 py-2 rounded-lg',
    'transition-colors duration-200 ease-in-out',
    'group w-full text-left',
    focusStyles,
    className
  )

  const sharedStyle = {
    backgroundColor: isHovered ? hoverBg : 'transparent',
    '--focus-ring-color': focusRingColor,
  } as React.CSSProperties

  // Content to render inside the item
  const itemContent = (
    <>
      {/* Topic title with optional subcategory */}
      <div className="flex items-center gap-3">
        <span
          style={{
            fontSize: typography.fontSize['body-2'].size,
            lineHeight: typography.fontSize['body-2'].lineHeight,
            fontWeight: emphasized ? typography.fontWeight.medium : typography.fontWeight.regular,
            color: textColor,
          }}
        >
          {subCategory && `${subCategory}. `}{children}
        </span>
      </div>

      {/* Chevron icon */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="flex-shrink-0"
        style={{
          color: isHovered ? chevronHoverColor : chevronColor,
        }}
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </>
  )

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        data-tracking-id={dataTrackingId}
        className={sharedClassName}
        style={sharedStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {itemContent}
      </button>
    )
  }

  // Render as link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        data-tracking-id={dataTrackingId}
        underline="none"
        className={sharedClassName}
        style={sharedStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {itemContent}
      </Link>
    )
  }

  // Fallback: render as a div if neither href nor onClick provided
  // (shouldn't happen in practice, but provides graceful fallback)
  return (
    <div
      data-tracking-id={dataTrackingId}
      className={cn(sharedClassName, 'cursor-default')}
      style={sharedStyle}
    >
      {itemContent}
    </div>
  )
}
