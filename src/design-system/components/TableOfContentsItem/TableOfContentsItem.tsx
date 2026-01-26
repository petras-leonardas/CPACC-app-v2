import React, { useState, useEffect } from 'react'
import { components, brand, typography } from '../../tokens'

export interface TableOfContentsItemProps {
  /**
   * Whether this item is currently active (visible in viewport)
   */
  active?: boolean
  /**
   * Click handler
   */
  onClick?: () => void
  /**
   * Item text content
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * TableOfContentsItem component for on-page navigation
 * 
 * Features:
 * - Active state: Navy background, white text, orange left border
 * - Hover state: Light gray background
 * - Focus state: Orange focus ring
 * - Dark mode support with design tokens
 * - Semantic button element for click handling
 * - Accessibility support
 * 
 * @example
 * // Default item
 * <TableOfContentsItem onClick={() => scrollToSection('overview')}>
 *   Overview
 * </TableOfContentsItem>
 * 
 * @example
 * // Active item
 * <TableOfContentsItem active onClick={() => scrollToSection('medical-model')}>
 *   Medical model
 * </TableOfContentsItem>
 */
export function TableOfContentsItem({
  active = false,
  onClick,
  children,
  className = '',
}: TableOfContentsItemProps) {
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

  // Active state: Navy background with white text
  // Inactive state: Transparent background with gray text
  const colors = active
    ? {
        background: isDark ? brand.navy[600] : brand.navy[500],
        color: components.text.inverse.light,
        hoverBackground: isDark ? brand.navy[600] : brand.navy[500], // No hover change when active
      }
    : {
        background: 'transparent',
        color: isDark 
          ? components.text.secondary.dark 
          : components.text.secondary.light,
        hoverBackground: isDark 
          ? components.background.tertiary.dark 
          : components.background.tertiary.light,
      }

  const fontWeight = active
    ? typography.fontWeight.medium
    : typography.fontWeight.regular

  // Focus ring color (same as Button and NavigationItem)
  const focusRingColor = isDark 
    ? components.border.focus.dark 
    : components.border.focus.light

  // Active state styling with orange left border (like NavigationItem)
  const activeStyles = active
    ? {
        borderLeft: `8px solid ${brand.orange[500]}`,
        paddingLeft: 'calc(1.5rem - 8px)', // 24px total (16px + 8px border)
        borderRadius: '0 0.375rem 0.375rem 0', // Remove left corners, keep right rounded
        marginLeft: '-2px', // Overlap the gray border on the container
      }
    : {
        borderLeft: '8px solid transparent',
        paddingLeft: 'calc(1rem - 8px)', // 16px total (8px + 8px transparent border)
        borderRadius: '0.375rem', // All corners rounded
      }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        block w-full py-1.5 text-left
        transition-all duration-200 ease-in-out
        cursor-pointer
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
        dark:focus-visible:ring-offset-gray-950 focus-visible:ring-[var(--focus-ring-color)]
        ${className}
      `}
      style={{
        backgroundColor: colors.background,
        color: colors.color,
        fontSize: typography.fontSize.small.size,
        lineHeight: typography.fontSize.small.lineHeight,
        fontWeight,
        textDecoration: 'none',
        paddingRight: '1rem',
        '--focus-ring-color': focusRingColor,
        ...activeStyles,
      } as React.CSSProperties & { '--focus-ring-color': string }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = colors.hoverBackground
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.background
      }}
    >
      {children}
    </button>
  )
}
