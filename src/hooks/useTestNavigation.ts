import { useState, useEffect, useCallback } from 'react'
import { trackEvent } from '../utils/analytics'

interface UseTestNavigationParams {
  onBack: () => void
  onNavigationAttempt?: (interceptor: (callback: () => void) => void) => void
  showResult: boolean
  answers: Map<number, number | null>
  totalQuestions: number
  testType: string
}

interface UseTestNavigationReturn {
  showExitModal: boolean
  isExiting: boolean
  exitMethod: string | null
  handleExitClick: () => void
  handleCancelExit: () => void
  handleConfirmExit: () => void
  animateExit: (callback: () => void) => void
}

export function useTestNavigation({
  onBack,
  onNavigationAttempt,
  showResult,
  answers,
  totalQuestions,
  testType,
}: UseTestNavigationParams): UseTestNavigationReturn {
  const [showExitModal, setShowExitModal] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [exitMethod, setExitMethod] = useState<'ui-button' | 'browser-back' | 'sidebar-navigation' | null>(null)
  const [isExiting, setIsExiting] = useState(false)

  const animateExit = useCallback((callback: () => void) => {
    setIsExiting(true)
    setTimeout(() => {
      callback()
    }, 350)
  }, [])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showExitModal) {
        handleCancelExit()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showExitModal])

  // Register navigation interceptor with parent
  useEffect(() => {
    if (onNavigationAttempt) {
      const interceptor = (callback: () => void) => {
        setExitMethod('sidebar-navigation')
        setPendingNavigation(() => callback)
        setShowExitModal(true)
      }
      onNavigationAttempt(interceptor)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Track browser back button
  useEffect(() => {
    if (showResult) return

    const handlePopState = () => {
      setExitMethod('browser-back')
      setShowExitModal(true)
      window.history.pushState(null, '', window.location.href)
    }

    window.history.pushState(null, '', window.location.href)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [showResult])

  function handleExitClick() {
    const questionsAnswered = answers.size
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0

    trackEvent('Test Exit Clicked', {
      questionsRemaining: totalQuestions - questionsAnswered,
      totalQuestions,
      exitMethod: 'ui-button',
      questionsAnswered,
      completionPercentage,
    })

    setExitMethod('ui-button')
    setPendingNavigation(null)
    setShowExitModal(true)
  }

  function handleCancelExit() {
    const questionsAnswered = answers.size
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0

    trackEvent('Test Exit Cancelled', {
      questionsRemaining: totalQuestions - questionsAnswered,
      totalQuestions,
      exitMethod: exitMethod || 'unknown',
      questionsAnswered,
      completionPercentage,
    })

    setShowExitModal(false)
    setPendingNavigation(null)
    setExitMethod(null)
  }

  function handleConfirmExit() {
    const questionsAnswered = answers.size
    const completionPercentage = totalQuestions > 0 ? Math.round((questionsAnswered / totalQuestions) * 100) : 0

    trackEvent('Test Exit Confirmed', {
      questionsRemaining: totalQuestions - questionsAnswered,
      totalQuestions,
      questionsAnswered,
      exitMethod: exitMethod || 'unknown',
      completionPercentage,
      testType,
    })

    setShowExitModal(false)
    setExitMethod(null)
    if (pendingNavigation) {
      animateExit(() => {
        pendingNavigation()
        setPendingNavigation(null)
      })
    } else {
      animateExit(onBack)
    }
  }

  return {
    showExitModal,
    isExiting,
    exitMethod,
    handleExitClick,
    handleCancelExit,
    handleConfirmExit,
    animateExit,
  }
}
