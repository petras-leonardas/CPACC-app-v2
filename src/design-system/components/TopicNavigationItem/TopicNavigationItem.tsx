import React, { useState, useEffect } from 'react'
import { components, typography } from '../../tokens'
import { Link } from '../Link/Link'

export interface TopicNavigationItemProps {
  /**
   * Navigation destination URL
   */
  href: string
  /**
   * Topic title
   */
  children: React.ReactNode
  /**
   * Optional subcategory label (e.g., "A", "B", "C")
   */
  subCategory?: string
  /**
   * Data attribute for tracking
   */
  'data-tracking-id'?: string
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * TopicNavigationItem component for domain topic lists
 * 
 * Features:
 * - Horizontal layout with topic title and chevron
 * - Optional subcategory prefix (e.g., "A. Topic Title")
 * - Hover state: Background color change
 * - Chevron icon on the right
 * - Dark mode support with design tokens
 * - Semantic link for navigation
 * 
 * @example
 * // Simple topic item
 * <TopicNavigationItem href="/domain/topic-id">
 *   Theoretical models of disability
 * </TopicNavigationItem>
 * 
 * @example
 * // With subcategory
 * <TopicNavigationItem 
 *   href="/domain/topic-id" 
 *   subCategory="A"
 *   data-tracking-id="domain-1-topic-disability-models"
 * >
 *   Theoretical models of disability
 * </TopicNavigationItem>
 */
export function TopicNavigationItem({
  href,
  children,
  subCategory,
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

  return (
    <Link
      href={href}
      data-tracking-id={dataTrackingId}
      underline="none"
      className={`
        flex items-center justify-between px-4 py-3 rounded-lg
        transition-colors duration-200 ease-in-out
        group
        ${className}
      `}
      style={{
        backgroundColor: isHovered ? hoverBg : 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Topic title with optional subcategory */}
      <div className="flex items-center gap-3">
        <span
          style={{
            fontSize: typography.fontSize['body-2'].size,
            lineHeight: typography.fontSize['body-2'].lineHeight,
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
    </Link>
  )
}
