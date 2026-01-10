import { useState, useEffect, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { Drawer } from 'vaul'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { trackEvent } from '../utils/analytics'
import { markFeedbackSubmitted } from '../utils/analyticsHelpers'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const location = useLocation()
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'bug' | 'content'>('suggestion')
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const resetForm = useCallback(() => {
    setFeedbackType('suggestion')
    setFeedback('')
    setEmail('')
    setSubmissionState('idle')
    setErrorMessage('')
  }, [])

  const handleClose = useCallback(() => {
    if (submissionState !== 'submitting') {
      trackEvent('Feedback Modal Closed', {
        hadContent: feedback.length > 0,
        feedbackType,
        submissionState,
      })
      resetForm()
      onClose()
    }
  }, [submissionState, resetForm, onClose, feedback.length, feedbackType])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!feedback.trim()) {
      setErrorMessage('Please enter your feedback')
      return
    }

    trackEvent('Feedback Submitted', {
      feedbackType,
      hasEmail: email.length > 0,
      feedbackLength: feedback.length,
      pageContext: location.pathname,
    })

    setSubmissionState('submitting')
    setErrorMessage('')

    try {
      const pageUrl = window.location.href
      const pageContext = location.pathname

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackType,
          feedbackText: feedback,
          email: email || undefined,
          pageUrl,
          pageContext,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit feedback')
      }

      setSubmissionState('success')
      
      // Update user profile
      markFeedbackSubmitted() // Update user profile after successful submission
      
      trackEvent('Feedback Submission Success', {
        feedbackType,
        pageContext: location.pathname,
      })
      
      // Auto-close after 2 seconds on success
      setTimeout(() => {
        handleClose()
      }, 2000)
    } catch (error) {
      setSubmissionState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.')
      
      trackEvent('Feedback Submission Error', {
        feedbackType,
        error: error instanceof Error ? error.message : 'Unknown error',
        pageContext: location.pathname,
      })
    }
  }, [feedback, feedbackType, email, location.pathname, handleClose])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && submissionState !== 'submitting') {
        resetForm()
        onClose()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, submissionState, onClose, resetForm])

  const isMobile = useMediaQuery('(max-width: 768px)')

  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && submissionState !== 'submitting') {
      handleClose()
    }
  }, [submissionState, handleClose])

  // Shared form content component - memoized to prevent focus loss
  const formContent = useMemo(() => (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Send feedback
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Help improve CPACC Mastery — report an issue, suggest an improvement, or share an idea.
          </p>
        </div>
        {!isMobile && (
          <button
            onClick={handleClose}
            disabled={submissionState === 'submitting'}
            data-tracking-id="feedback-close"
            className="flex-shrink-0 ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 dark:text-gray-400">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Success Message */}
      {submissionState === 'success' && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="font-medium">Feedback submitted successfully! Thank you.</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submissionState === 'error' && errorMessage && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span className="text-sm">{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Feedback Type */}
      <div className="mb-6">
        <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Feedback type
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              trackEvent('Feedback Type Selected', { feedbackType: 'suggestion' })
              setFeedbackType('suggestion')
            }}
            disabled={submissionState === 'submitting' || submissionState === 'success'}
            data-tracking-id="feedback-type-suggestion"
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              feedbackType === 'suggestion'
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Suggestion
          </button>
          <button
            onClick={() => {
              trackEvent('Feedback Type Selected', { feedbackType: 'bug' })
              setFeedbackType('bug')
            }}
            disabled={submissionState === 'submitting' || submissionState === 'success'}
            data-tracking-id="feedback-type-bug"
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              feedbackType === 'bug'
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Bug
          </button>
          <button
            onClick={() => {
              trackEvent('Feedback Type Selected', { feedbackType: 'content' })
              setFeedbackType('content')
            }}
            disabled={submissionState === 'submitting' || submissionState === 'success'}
            data-tracking-id="feedback-type-content"
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              feedbackType === 'content'
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Content error
          </button>
        </div>
      </div>

      {/* Your Feedback */}
      <div className="mb-6">
        <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Your feedback
        </label>
        <textarea
          value={feedback}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setFeedback(e.target.value)
            }
          }}
          placeholder="Tell me what could be improved, or what's confusing..."
          rows={6}
          maxLength={500}
          disabled={submissionState === 'submitting' || submissionState === 'success'}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="mt-2 flex items-center justify-end">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {feedback.length}/500 characters
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Email (optional)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="So I can follow up"
          disabled={submissionState === 'submitting' || submissionState === 'success'}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        {submissionState === 'success' && (
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Closing automatically...
          </p>
        )}
        <div className="flex gap-3 ml-auto">
          <button
            onClick={handleClose}
            disabled={submissionState === 'submitting'}
            data-tracking-id="feedback-cancel"
            className="px-6 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submissionState === 'submitting' || submissionState === 'success' || !feedback.trim()}
            data-tracking-id="feedback-send"
            className="px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submissionState === 'submitting' ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  ), [feedbackType, feedback, email, submissionState, errorMessage, isMobile, handleClose, handleSubmit])

  if (!isOpen) return null

  // Mobile: Use Drawer (bottom sheet)
  if (isMobile) {
    return createPortal(
      <Drawer.Root open={isOpen} onOpenChange={(open) => !open && handleClose()} dismissible={submissionState !== 'submitting'}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
          <Drawer.Content className="bg-white dark:bg-gray-900 flex flex-col rounded-t-[20px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-[100]">
            <div className="flex-shrink-0 mx-auto w-12 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 mb-4 mt-4" />
            <div className="overflow-y-auto flex-1">
              {formContent}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>,
      document.body
    )
  }

  // Desktop: Use centered Dialog
  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {formContent}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
