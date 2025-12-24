import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom'
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMeasured, setIsMeasured] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<{ top: number; left: number; transform: string }>({ top: 0, left: 0, transform: 'translateX(-50%)' })
  const buttonRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && !isMeasured && buttonRef.current && tooltipRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const isTop = position === 'top'
      
      const PADDING = 8
      const viewportWidth = window.innerWidth
      
      // Start with centered position
      let left = rect.left + rect.width / 2
      const transform = 'translateX(-50%)'
      
      // Calculate tooltip bounds with centered position
      const tooltipWidth = tooltipRect.width
      const tooltipLeft = left - tooltipWidth / 2
      const tooltipRight = left + tooltipWidth / 2
      
      // Adjust if tooltip would overflow left edge
      if (tooltipLeft < PADDING) {
        left = PADDING + tooltipWidth / 2
      }
      
      // Adjust if tooltip would overflow right edge
      if (tooltipRight > viewportWidth - PADDING) {
        left = viewportWidth - PADDING - tooltipWidth / 2
      }
      
      setTooltipStyle({
        top: isTop ? rect.top - tooltipRect.height - 8 : rect.bottom + 8,
        left,
        transform
      })
      setIsMeasured(true)
    }
    
    if (!isVisible && isMeasured) {
      setIsMeasured(false)
    }
  }, [isVisible, isMeasured, position, content])

  const isTop = position === 'top'
  const arrowClasses = isTop
    ? 'top-full -mt-1 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700'
    : 'bottom-full -mb-1 border-4 border-transparent border-b-gray-900 dark:border-b-gray-700'

  const tooltipContent = isVisible ? (
    <div 
      ref={tooltipRef}
      className={`fixed px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded whitespace-nowrap pointer-events-none animate-fade-in z-[9999]`}
      style={{ top: `${tooltipStyle.top}px`, left: `${tooltipStyle.left}px`, transform: tooltipStyle.transform }}
    >
      <div className={`absolute ${arrowClasses} left-1/2 -translate-x-1/2`} />
      {content}
    </div>
  ) : null

  return (
    <>
      <div 
        ref={buttonRef}
        className="relative inline-flex"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  )
}
