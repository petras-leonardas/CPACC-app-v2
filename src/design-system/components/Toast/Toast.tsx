import { useEffect, useState, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import { radius, shadows, base } from '../../tokens'
import { CheckCircle, AlertCircle } from '../../icons'
import { Text } from '../Text/Text'

export type ToastVariant = 'success' | 'error'

export interface ToastProps {
  /**
   * Unique identifier for the toast
   */
  id: string
  /**
   * Message to display
   */
  message: string
  /**
   * Toast variant
   * @default 'success'
   */
  variant?: ToastVariant
  /**
   * Duration in milliseconds before auto-dismiss
   * @default 4000
   */
  duration?: number
  /**
   * Callback when toast is dismissed
   */
  onDismiss: (id: string) => void
}

/**
 * Individual Toast component with progress indicator and hover-to-pause functionality
 */
export function Toast({
  id,
  message,
  variant = 'success',
  duration = 4000,
  onDismiss,
}: ToastProps) {
  const [isDark, setIsDark] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [progress, setProgress] = useState(100)
  
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const pausedProgressRef = useRef<number>(100)

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

  // Animate in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = useCallback(() => {
    setIsLeaving(true)
    setTimeout(() => {
      onDismiss(id)
    }, 200) // Match animation duration
  }, [id, onDismiss])

  // Progress animation using requestAnimationFrame
  useEffect(() => {
    if (isHovered) {
      // Pause: cancel animation and store current progress
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = null
      }
      pausedProgressRef.current = progress
      startTimeRef.current = null
      return
    }

    // Start or resume animation
    // When mouse leaves, reset to 100%
    if (pausedProgressRef.current < 100 && !startTimeRef.current) {
      setProgress(100)
      pausedProgressRef.current = 100
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100)
      
      setProgress(newProgress)

      if (newProgress > 0) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        handleDismiss()
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered, duration, handleDismiss])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const getVariantStyles = () => {
    if (variant === 'success') {
      // Light: green[200] bg with green[900] text = 7.35:1 contrast (AAA)
      // Dark: green[800] bg with green[50] text = 9.73:1 contrast (AAA)
      return {
        icon: <CheckCircle size={20} />,
        iconColor: isDark ? base.green[200] : base.green[800],
        backgroundColor: isDark ? base.green[800] : base.green[200],
        textColor: isDark ? base.green[50] : base.green[900],
        progressColor: isDark ? base.green[400] : base.green[700],
      }
    }
    // Light: red[200] bg with red[900] text = 6.5:1 contrast (AAA)
    // Dark: red[800] bg with red[50] text = 8.1:1 contrast (AAA)
    return {
      icon: <AlertCircle size={20} />,
      iconColor: isDark ? base.red[200] : base.red[800],
      backgroundColor: isDark ? base.red[800] : base.red[200],
      textColor: isDark ? base.red[50] : base.red[900],
      progressColor: isDark ? base.red[400] : base.red[700],
    }
  }

  const styles = getVariantStyles()

  return (
    <div
      role="alert"
      aria-live="polite"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative overflow-hidden min-w-[300px] max-w-[400px] transition-all duration-200',
        isVisible && !isLeaving ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{
        backgroundColor: styles.backgroundColor,
        borderRadius: radius.lg,
        boxShadow: isDark ? shadows.dark.lg : shadows.light.lg,
      }}
    >
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-[3px] transition-none"
        style={{
          width: `${progress}%`,
          backgroundColor: styles.progressColor,
          borderTopLeftRadius: radius.lg,
          borderTopRightRadius: progress > 99 ? radius.lg : 0,
        }}
      />
      
      {/* Content */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span style={{ color: styles.iconColor, flexShrink: 0 }}>
          {styles.icon}
        </span>
        <Text 
          variant="body2"
          className="flex-1 font-medium"
          style={{ color: styles.textColor }}
        >
          {message}
        </Text>
      </div>
    </div>
  )
}

/**
 * Toast container that renders toasts in bottom center
 */
export interface ToastContainerProps {
  toasts: Array<{
    id: string
    message: string
    variant?: ToastVariant
    duration?: number
  }>
  onDismiss: (id: string) => void
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return createPortal(
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-2"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          onDismiss={onDismiss}
        />
      ))}
    </div>,
    document.body
  )
}
