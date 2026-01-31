import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { ToastContainer } from './Toast'
import type { ToastVariant } from './Toast'

interface ToastItem {
  id: string
  message: string
  variant?: ToastVariant
  duration?: number
}

interface ToastContextValue {
  /**
   * Show a toast notification
   */
  showToast: (message: string, options?: { variant?: ToastVariant; duration?: number }) => void
  /**
   * Show a success toast
   */
  success: (message: string, duration?: number) => void
  /**
   * Show an error toast
   */
  error: (message: string, duration?: number) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export interface ToastProviderProps {
  children: ReactNode
}

/**
 * Provider component that enables toast notifications throughout the app.
 * Wrap your app with this provider to use the useToast hook.
 * 
 * @example
 * // In App.tsx or main layout
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * 
 * // In any component
 * const { success, error } = useToast()
 * success('Operation completed!')
 */
export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((
    message: string,
    options?: { variant?: ToastVariant; duration?: number }
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newToast: ToastItem = {
      id,
      message,
      variant: options?.variant || 'success',
      duration: options?.duration,
    }
    setToasts((prev) => [...prev, newToast])
  }, [])

  const success = useCallback((message: string, duration?: number) => {
    showToast(message, { variant: 'success', duration })
  }, [showToast])

  const error = useCallback((message: string, duration?: number) => {
    showToast(message, { variant: 'error', duration })
  }, [showToast])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, success, error }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

/**
 * Hook to show toast notifications.
 * Must be used within a ToastProvider.
 * 
 * @example
 * const { success, error } = useToast()
 * 
 * // Show success toast
 * success('Feedback submitted. Thank you!')
 * 
 * // Show error toast
 * error('Something went wrong')
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
