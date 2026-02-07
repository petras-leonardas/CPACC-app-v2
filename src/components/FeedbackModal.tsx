import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Drawer } from 'vaul'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { trackEvent } from '../utils/analytics'
import { markFeedbackSubmitted } from '../utils/analyticsHelpers'
import {
  Modal,
  Heading,
  Text,
  Button,
  IconButton,
  components,
  base,
  radius,
  X,
  Check,
  AlertCircle,
  Send,
  useToast,
} from '../design-system'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error'
type FeedbackType = 'suggestion' | 'bug' | 'content'

interface FeedbackFormContentProps {
  feedbackType: FeedbackType
  setFeedbackType: (type: FeedbackType) => void
  feedback: string
  setFeedback: (value: string) => void
  email: string
  setEmail: (value: string) => void
  submissionState: SubmissionState
  errorMessage: string
  isDark: boolean
  isMobile: boolean
  handleClose: () => void
  handleSubmit: () => void
}

// Chip component for feedback type selection - matches primary button styling
function FeedbackTypeChip({
  type,
  label,
  isSelected,
  isDisabled,
  isDark,
  onClick,
}: {
  type: FeedbackType
  label: string
  isSelected: boolean
  isDisabled: boolean
  isDark: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Selected state uses primary button colors
  // Unselected state uses outline/secondary button colors
  const getStyles = () => {
    if (isSelected) {
      return {
        backgroundColor: isHovered && !isDisabled
          ? (isDark ? components.button.primary.backgroundHover.dark : components.button.primary.backgroundHover.light)
          : (isDark ? components.button.primary.background.dark : components.button.primary.background.light),
        color: isDark ? components.button.primary.text.dark : components.button.primary.text.light,
        borderColor: isDark ? components.button.primary.border.dark : components.button.primary.border.light,
      }
    }
    return {
      backgroundColor: isHovered && !isDisabled
        ? (isDark ? components.button.outline.backgroundHover.dark : components.button.outline.backgroundHover.light)
        : (isDark ? components.button.outline.background.dark : components.button.outline.background.light),
      color: isDark ? components.button.outline.text.dark : components.button.outline.text.light,
      borderColor: isDark ? components.button.outline.border.dark : components.button.outline.border.light,
    }
  }

  const styles = getStyles()
  const focusRingColor = isDark ? components.border.focus.dark : components.border.focus.light

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-tracking-id={`feedback-type-${type}`}
      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: styles.borderColor,
        borderRadius: radius.full,
        '--tw-ring-color': focusRingColor,
      } as React.CSSProperties}
    >
      {isSelected && <Check size={16} />}
      {label}
    </button>
  )
}

// Separate component for form content to prevent re-mounting on state changes
function FeedbackFormContent({
  feedbackType,
  setFeedbackType,
  feedback,
  setFeedback,
  email,
  setEmail,
  submissionState,
  errorMessage,
  isDark,
  isMobile,
  handleClose,
  handleSubmit,
}: FeedbackFormContentProps) {
  const inputStyles = {
    backgroundColor: isDark ? components.background.secondary.dark : components.background.secondary.light,
    borderColor: isDark ? components.border.default.dark : components.border.default.light,
    color: isDark ? components.text.primary.dark : components.text.primary.light,
    borderRadius: radius.lg,
    borderWidth: '1px',
    borderStyle: 'solid' as const,
  }

  const inputFocusRing = isDark ? components.border.focus.dark : components.border.focus.light

  const isDisabled = submissionState === 'submitting' || submissionState === 'success'

  return (
    <div className="space-y-6">
      {/* Description */}
      {isMobile && (
        <Text className="text-base" style={{ color: isDark ? components.text.secondary.dark : components.text.secondary.light }}>
          Help improve CPACC Mastery — report an issue, suggest an improvement, or share an idea.
        </Text>
      )}
      {!isMobile && (
        <Text className="text-base" style={{ color: isDark ? components.text.secondary.dark : components.text.secondary.light }}>
          Help improve CPACC Mastery — report an issue, suggest an improvement, or share an idea.
        </Text>
      )}

      {/* Error Message */}
      {submissionState === 'error' && errorMessage && (
        <div
          className="p-4 flex items-center gap-3"
          style={{
            backgroundColor: isDark ? `${base.red[900]}33` : base.red[50],
            borderRadius: radius.lg,
            border: `1px solid ${isDark ? base.red[800] : base.red[200]}`,
          }}
        >
          <AlertCircle size={20} style={{ color: isDark ? base.red[400] : base.red[600] }} />
          <Text className="text-sm" style={{ color: isDark ? base.red[200] : base.red[800] }}>
            {errorMessage}
          </Text>
        </div>
      )}

      {/* Feedback Type */}
      <div>
        <label
          className="block text-base font-semibold mb-3"
          style={{ color: isDark ? components.text.primary.dark : components.text.primary.light }}
        >
          Feedback type
        </label>
        <div className="flex flex-wrap gap-2">
          <FeedbackTypeChip
            type="suggestion"
            label="Suggestion"
            isSelected={feedbackType === 'suggestion'}
            isDisabled={isDisabled}
            isDark={isDark}
            onClick={() => {
              trackEvent('Feedback Type Selected', { feedbackType: 'suggestion' })
              setFeedbackType('suggestion')
            }}
          />
          <FeedbackTypeChip
            type="bug"
            label="Bug"
            isSelected={feedbackType === 'bug'}
            isDisabled={isDisabled}
            isDark={isDark}
            onClick={() => {
              trackEvent('Feedback Type Selected', { feedbackType: 'bug' })
              setFeedbackType('bug')
            }}
          />
          <FeedbackTypeChip
            type="content"
            label="Content error"
            isSelected={feedbackType === 'content'}
            isDisabled={isDisabled}
            isDark={isDark}
            onClick={() => {
              trackEvent('Feedback Type Selected', { feedbackType: 'content' })
              setFeedbackType('content')
            }}
          />
        </div>
      </div>

      {/* Your Feedback */}
      <div>
        <label
          htmlFor="feedback-textarea"
          className="block text-base font-semibold mb-1"
          style={{ color: isDark ? components.text.primary.dark : components.text.primary.light }}
        >
          Your feedback
        </label>
        <Text
          variant="small"
          className="mb-3"
          style={{ color: isDark ? components.text.secondary.dark : components.text.secondary.light }}
        >
          Tell me what could be improved or what's confusing...
        </Text>
        <textarea
          id="feedback-textarea"
          value={feedback}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setFeedback(e.target.value)
            }
          }}
          rows={6}
          maxLength={500}
          disabled={isDisabled}
          className="w-full px-4 py-3 resize-none transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            ...inputStyles,
            '--tw-ring-color': inputFocusRing,
          } as React.CSSProperties}
        />
        <div className="mt-2 flex items-center justify-end">
          <Text variant="small" style={{ color: isDark ? components.text.tertiary.dark : components.text.tertiary.light }}>
            {feedback.length}/500 characters
          </Text>
        </div>
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="feedback-email"
          className="block text-base font-semibold mb-3"
          style={{ color: isDark ? components.text.primary.dark : components.text.primary.light }}
        >
          Email (optional)
        </label>
        <input
          id="feedback-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isDisabled}
          className="w-full px-4 py-3 transition-colors focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            ...inputStyles,
            '--tw-ring-color': inputFocusRing,
          } as React.CSSProperties}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          variant="secondary"
          onClick={handleClose}
          disabled={submissionState === 'submitting'}
          data-tracking-id="feedback-cancel"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isDisabled || !feedback.trim()}
          loading={submissionState === 'submitting'}
          rightIcon={submissionState !== 'submitting' ? <Send size={16} /> : undefined}
          data-tracking-id="feedback-send"
        >
          {submissionState === 'submitting' ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  )
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const location = useLocation()
  const { success: showSuccessToast } = useToast()
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('suggestion')
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDark, setIsDark] = useState(false)

  const isMobile = useMediaQuery('(max-width: 768px)')

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

  const handleSubmit = useCallback(async () => {
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

      // Update user profile
      markFeedbackSubmitted()
      
      trackEvent('Feedback Submission Success', {
        feedbackType,
        pageContext: location.pathname,
      })
      
      // Close modal and show success toast
      resetForm()
      onClose()
      showSuccessToast('Feedback submitted. Thank you!')
    } catch (error) {
      setSubmissionState('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit feedback. Please try again.')
      
      trackEvent('Feedback Submission Error', {
        feedbackType,
        error: error instanceof Error ? error.message : 'Unknown error',
        pageContext: location.pathname,
      })
    }
  }, [feedback, feedbackType, email, location.pathname, resetForm, onClose, showSuccessToast])

  if (!isOpen) return null

  const formProps: FeedbackFormContentProps = {
    feedbackType,
    setFeedbackType,
    feedback,
    setFeedback,
    email,
    setEmail,
    submissionState,
    errorMessage,
    isDark,
    isMobile,
    handleClose,
    handleSubmit,
  }

  // Mobile: Use Drawer (bottom sheet) - keep existing pattern for better mobile UX
  if (isMobile) {
    return (
      <Drawer.Root open={isOpen} onOpenChange={(open) => !open && handleClose()} dismissible={submissionState !== 'submitting'}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
          <Drawer.Content
            className="flex flex-col rounded-t-[20px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 z-[100]"
            style={{
              backgroundColor: isDark ? components.background.elevated.dark : components.background.elevated.light,
            }}
          >
            {/* Drawer handle */}
            <div
              className="flex-shrink-0 mx-auto w-12 h-1.5 rounded-full mb-4 mt-4"
              style={{ backgroundColor: isDark ? base.gray[700] : base.gray[300] }}
            />
            
            {/* Header */}
            <div className="px-6 pb-4">
              <div className="flex items-start justify-between">
                <Heading as="h2">Send feedback</Heading>
                <IconButton
                  icon={<X size={20} />}
                  aria-label="Close"
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  disabled={submissionState === 'submitting'}
                  tooltip="Close"
                  tooltipPosition="bottom"
                />
              </div>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto flex-1 px-6 pb-6">
              <FeedbackFormContent {...formProps} />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )
  }

  // Desktop: Use Modal component
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Send feedback"
      size="md"
      closeOnBackdropClick={submissionState !== 'submitting'}
      closeOnEscape={submissionState !== 'submitting'}
    >
      <FeedbackFormContent {...formProps} />
    </Modal>
  )
}
