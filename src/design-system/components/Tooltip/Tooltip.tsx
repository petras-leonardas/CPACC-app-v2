import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { components, typography, radius } from '../../tokens'

export interface TooltipProps {
  /**
   * Tooltip content text
   */
  content: string
  /**
   * Element to wrap with tooltip
   */
  children: ReactNode
  /**
   * Tooltip position relative to trigger
   */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * Delay before showing tooltip (ms)
   */
  delay?: number
}

/**
 * Tooltip component using CPACC Mastery design tokens
 * 
 * Features:
 * - Smart positioning with viewport overflow detection
 * - Dark mode support with design tokens
 * - Touch device detection (hides on touch-only devices)
 * - Portal rendering for proper z-index layering
 * - Smooth animations
 * - Typography tokens for consistent text styling
 * 
 * @example
 * <Tooltip content="Settings">
 *   <IconButton icon={<Settings />} aria-label="Settings" />
 * </Tooltip>
 */
export function Tooltip({ 
  content, 
  children, 
  position = 'top',
  delay = 200 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMeasured, setIsMeasured] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<{ 
    top: number
    left: number
    transform: string 
  }>({ top: 0, left: 0, transform: '' })
  const [hasHoverCapability, setHasHoverCapability] = useState(true)
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )
  
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

  // Detect hover capability (hide tooltips on touch-only devices)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)')
    setHasHoverCapability(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setHasHoverCapability(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Calculate tooltip position with smart overflow detection
  useEffect(() => {
    if (isVisible && !isMeasured && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      
      const PADDING = 8
      const SPACING = 8 // Distance between trigger and tooltip
      const viewportWidth = window.innerWidth
      
      let top = 0
      let left = 0
      let transform = ''

      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - SPACING
          left = triggerRect.left + triggerRect.width / 2
          transform = 'translateX(-50%)'
          
          // Check horizontal overflow
          const tooltipLeft = left - tooltipRect.width / 2
          const tooltipRight = left + tooltipRect.width / 2
          
          if (tooltipLeft < PADDING) {
            left = PADDING + tooltipRect.width / 2
          } else if (tooltipRight > viewportWidth - PADDING) {
            left = viewportWidth - PADDING - tooltipRect.width / 2
          }
          break

        case 'bottom':
          top = triggerRect.bottom + SPACING
          left = triggerRect.left + triggerRect.width / 2
          transform = 'translateX(-50%)'
          
          // Check horizontal overflow
          const bottomTooltipLeft = left - tooltipRect.width / 2
          const bottomTooltipRight = left + tooltipRect.width / 2
          
          if (bottomTooltipLeft < PADDING) {
            left = PADDING + tooltipRect.width / 2
          } else if (bottomTooltipRight > viewportWidth - PADDING) {
            left = viewportWidth - PADDING - tooltipRect.width / 2
          }
          break

        case 'left':
          top = triggerRect.top + triggerRect.height / 2
          left = triggerRect.left - tooltipRect.width - SPACING
          transform = 'translateY(-50%)'
          break

        case 'right':
          top = triggerRect.top + triggerRect.height / 2
          left = triggerRect.right + SPACING
          transform = 'translateY(-50%)'
          break
      }
      
      setTooltipStyle({ top, left, transform })
      setIsMeasured(true)
    }
    
    if (!isVisible && isMeasured) {
      setIsMeasured(false)
    }
  }, [isVisible, isMeasured, position])

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Tooltip colors using design tokens - inverted for better visibility
  // Light mode uses dark tooltip, dark mode uses light tooltip
  const tooltipBg = isDark 
    ? components.background.elevated.light  // Dark mode = light tooltip
    : components.background.elevated.dark   // Light mode = dark tooltip
  const tooltipText = isDark 
    ? components.text.primary.light         // Dark mode = dark text
    : components.text.primary.dark          // Light mode = light text
  const tooltipBorder = isDark
    ? components.border.default.light       // Dark mode = light border
    : components.border.default.dark        // Light mode = dark border

  const tooltipContent = isVisible ? (
    <div 
      ref={tooltipRef}
      className="fixed pointer-events-none z-[9999] animate-fade-in"
      style={{ 
        top: `${tooltipStyle.top}px`, 
        left: `${tooltipStyle.left}px`, 
        transform: tooltipStyle.transform 
      }}
    >
      <div 
        className="relative px-3 py-2 shadow-lg border whitespace-nowrap"
        style={{
          backgroundColor: tooltipBg,
          color: tooltipText,
          borderColor: tooltipBorder,
          fontSize: typography.fontSize.small.size,
          lineHeight: typography.fontSize.small.lineHeight,
          fontWeight: typography.fontWeight.medium,
          borderRadius: radius.md,
        }}
      >
        {content}
      </div>
    </div>
  ) : null

  // Skip tooltip on touch-only devices
  if (!hasHoverCapability) {
    return <>{children}</>
  }

  return (
    <>
      <div 
        ref={triggerRef}
        className="relative inline-flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  )
}
