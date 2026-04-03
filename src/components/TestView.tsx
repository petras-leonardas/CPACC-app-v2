import { useEffect } from 'react'
import { trackEvent } from '../utils/analytics'
import { TestErrorState } from './Test/TestErrorState'
import { TestResultsScreen } from './Test/TestResultsScreen'
import { TestExitModal } from './Test/TestExitModal'
import { TestQuestionCard } from './Test/TestQuestionCard'
import { TestReviewScreen } from './Test/TestReviewScreen'
import { Heading, Text, Button, Container } from '../design-system'
import { useTestNavigation } from '../hooks/useTestNavigation'
import { useTestQuestions, trackAnswerSelection } from '../hooks/useTestQuestions'

export type TestType =
  | 'mock-exam'
  | 'quick-test'
  | 'super-quick-test'
  | 'topic-quick'
  | 'domain-quick'
  | 'domain-comprehensive'
  | 'topic-test'

/** Human-readable labels for analytics events */
export const TEST_TYPE_LABELS: Record<TestType, string> = {
  'mock-exam': 'Mock Exam',
  'quick-test': 'Quick Test',
  'super-quick-test': 'Super Quick Test',
  'topic-quick': 'Topic Quick Test',
  'domain-quick': 'Domain Quick Test',
  'domain-comprehensive': 'Domain Comprehensive Test',
  'topic-test': 'Topic Test',
}

interface TestViewProps {
  topicId: string
  topicTitle: string
  onBack: () => void
  onNavigationAttempt?: (interceptor: (callback: () => void) => void) => void
  testType: TestType
  domainNumber?: string
}

export function TestView({ topicId, topicTitle: _topicTitle, onBack, onNavigationAttempt, testType, domainNumber = '1' }: TestViewProps) {
  const {
    questions,
    loading,
    selectedAnswer,
    setSelectedAnswer,
    currentQuestionIndex,
    answers,
    showReview,
    reviewingIndex,
    finalResults,
    showResult,
    isTransitioning,
    answerHistory,
    setAnswerHistory,
    activeQuestionIndex,
    currentQuestion,
    totalQuestions,
    questionHeadingRef,
    handleSubmit,
    handleSkip,
    handleReviewQuestion,
    handleBackToReview,
    handleSubmitTest,
    handleRestart,
  } = useTestQuestions({ topicId, testType, domainNumber })

  const {
    showExitModal,
    isExiting,
    handleExitClick,
    handleCancelExit,
    handleConfirmExit,
    animateExit,
  } = useTestNavigation({
    onBack,
    onNavigationAttempt,
    showResult,
    answers,
    totalQuestions,
    testType,
  })

  // Track test pause/resume (tab visibility)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!currentQuestion || showResult || showReview) return

      if (document.hidden) {
        trackEvent('Test Session Paused', {
          questionNumber: activeQuestionIndex + 1,
          testType,
          progress: Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100),
          pauseReason: 'tab_hidden'
        })
      } else {
        trackEvent('Test Session Resumed', {
          questionNumber: activeQuestionIndex + 1,
          testType
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [currentQuestion, activeQuestionIndex, currentQuestionIndex, totalQuestions, showResult, showReview, testType])

  // Scroll to top when question changes or review screen appears
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [activeQuestionIndex, showReview])

  // Update URL with current question ID and subject for tracking/debugging
  useEffect(() => {
    if (currentQuestion && !showResult && !showReview) {
      const url = new URL(window.location.href)
      url.searchParams.set('q', currentQuestion.id)
      if (currentQuestion.subject) {
        url.searchParams.set('subject', currentQuestion.subject)
      }
      window.history.replaceState(null, '', url.toString())
    }
  }, [currentQuestion, showResult, showReview])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={onBack}
            variant="primary"
            size="md"
            className="mb-6"
          >
            ← Finish
          </Button>
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4"></div>
            <Text variant="body1" className="text-xl text-gray-600 dark:text-gray-400">Loading questions...</Text>
          </div>
        </div>
      </div>
    )
  }

  // No questions found
  if (questions.length === 0) {
    return <TestErrorState error="There are no questions available for this topic yet." onBack={onBack} />
  }

  // Results screen
  if (showResult && finalResults) {
    return (
      <TestResultsScreen
        score={finalResults.score}
        totalQuestions={totalQuestions}
        answeredQuestions={finalResults.answeredQuestions}
        onRestart={handleRestart}
        onBack={() => animateExit(onBack)}
        isExiting={isExiting}
      />
    )
  }

  // Review screen (shown after all questions have been seen)
  if (showReview && reviewingIndex === null) {
    const reviewQuestions = questions.map((question, index) => ({
      question,
      selectedAnswer: answers.get(index) ?? null
    }))

    return (
      <>
        <TestReviewScreen
          questions={reviewQuestions}
          onReviewQuestion={handleReviewQuestion}
          onSubmitTest={handleSubmitTest}
          onExitClick={handleExitClick}
          isExiting={isExiting}
        />
        <TestExitModal
          isOpen={showExitModal}
          onCancel={handleCancelExit}
          onConfirm={handleConfirmExit}
          hasUnsavedProgress={true}
        />
      </>
    )
  }

  // Question screen - early return if no current question
  if (!currentQuestion) {
    return null
  }

  const progress = totalQuestions > 0 ? ((activeQuestionIndex + 1) / totalQuestions) * 100 : 0

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isExiting ? 'animate-[fadeOut_350ms_ease-in_forwards]' : 'animate-[fadeIn_700ms_ease-out]'}`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        :root { --progress-bar-color: #E67E22; --progress-bar-track: #353A56; }
        .dark { --progress-bar-color: #F39C52; --progress-bar-track: #2A2E44; }
      `}</style>
      <Container size="md" padding="md" className="py-6 md:py-10">
        {/* Progress toolbar: counter | progress bar | finish test */}
        <div className="flex items-center gap-4 mb-8">
          <Text variant="body2" className="text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium tabular-nums">
            {activeQuestionIndex + 1}/{questions.length}
          </Text>
          <div className="flex-1 h-3.5 rounded-full" style={{ backgroundColor: 'var(--progress-bar-track)' }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%`, backgroundColor: 'var(--progress-bar-color)' }}
            />
          </div>
          <Button
            onClick={handleExitClick}
            variant="secondary"
            size="sm"
            data-tracking-id="test-end"
          >
            End test
          </Button>
        </div>

        {/* Question content with fade transition */}
        <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Question */}
        <div className="mb-8">
          <Text variant="small" className="text-gray-500 dark:text-gray-400 mb-2">
            Question {activeQuestionIndex + 1}
          </Text>
          <Heading as="h2" ref={questionHeadingRef} tabIndex={-1} className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 outline-none">
            {currentQuestion.question}
          </Heading>
        </div>

        <TestQuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onSelectAnswer={(index) => trackAnswerSelection(index, activeQuestionIndex, answerHistory, setAnswerHistory, setSelectedAnswer)}
          onSubmit={handleSubmit}
          onSkip={handleSkip}
          isReviewMode={reviewingIndex !== null}
          onBackToReview={handleBackToReview}
        />
        </div>
      </Container>

      <TestExitModal
        isOpen={showExitModal}
        onCancel={handleCancelExit}
        onConfirm={handleConfirmExit}
        hasUnsavedProgress={true}
      />
    </div>
  )
}
