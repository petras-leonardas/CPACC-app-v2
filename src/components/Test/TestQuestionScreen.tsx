import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useTest } from '../../contexts/TestContext'
import { TestQuestionCard } from './TestQuestionCard'
import { TestErrorState } from './TestErrorState'
import { usePageTracking } from '../../hooks/usePageTracking'
import { Heading, Text, Button, Container } from '../../design-system'

/**
 * Test question screen — the index route for the test flow.
 *
 * Handles phases: loading, error, answering, reviewing-question.
 * Redirects to sibling routes for reviewing and completed phases.
 */
export function TestQuestionScreen() {
  const {
    phase,
    questions,
    activeQuestionIndex,
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    selectAnswer,
    isReviewMode,
    isTransitioning,
    isExiting,
    handleExitClick,
    submitAnswer,
    skipQuestion,
    backToReview,
    exitToOrigin,
    questionHeadingRef,
  } = useTest()

  usePageTracking('Test - Questions')

  // Scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [activeQuestionIndex])

  // ─── Route Guards ────────────────────────────────────────────────

  if (phase === 'reviewing') {
    return <Navigate to="review" replace />
  }

  if (phase === 'completed') {
    return <Navigate to="results" replace />
  }

  // ─── Loading ─────────────────────────────────────────────────────

  if (phase === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 pt-24">
        <Container size="md" padding="none">
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-700 p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 dark:border-gray-100 mx-auto mb-4" />
            <Text variant="body1" className="text-xl text-gray-600 dark:text-gray-400">
              Loading questions...
            </Text>
          </div>
        </Container>
      </div>
    )
  }

  // ─── Error ───────────────────────────────────────────────────────

  if (phase === 'error' || questions.length === 0) {
    return (
      <TestErrorState
        error="There are no questions available for this topic yet."
        onBack={exitToOrigin}
      />
    )
  }

  // ─── Question ────────────────────────────────────────────────────

  if (!currentQuestion) return null

  const progress = totalQuestions > 0 ? ((activeQuestionIndex + 1) / totalQuestions) * 100 : 0

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isExiting ? 'animate-test-fade-out' : 'animate-test-fade-in'}`}>
      <Container size="md" padding="md" className="py-6 md:py-10">
        {/* Progress toolbar: counter | progress bar | end test */}
        <div className="flex items-center gap-4 mb-8">
          <Text variant="body2" className="text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium tabular-nums">
            {activeQuestionIndex + 1}/{questions.length}
          </Text>
          <div className="flex-1 h-3.5 rounded-full bg-[var(--progress-bar-track)]">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-[var(--progress-bar-color)]"
              style={{ width: `${progress}%` }}
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
          <div className="mb-8">
            <Text variant="small" className="text-gray-500 dark:text-gray-400 mb-2">
              Question {activeQuestionIndex + 1}
            </Text>
            <Heading
              as="h2"
              ref={questionHeadingRef}
              tabIndex={-1}
              className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 outline-none"
            >
              {currentQuestion.question}
            </Heading>
          </div>

          <TestQuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={selectAnswer}
            onSubmit={submitAnswer}
            onSkip={skipQuestion}
            isReviewMode={isReviewMode}
            onBackToReview={backToReview}
          />
        </div>
      </Container>
    </div>
  )
}
