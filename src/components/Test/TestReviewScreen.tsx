import { Fragment, useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useTest } from '../../contexts/TestContext'
import { usePageTracking } from '../../hooks/usePageTracking'
import {
  Heading, Text, Button, Badge, Container,
  Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell,
  ChevronRight,
} from '../../design-system'

/**
 * Review screen — shown after all questions have been seen.
 * Displays a table of answered vs skipped questions.
 * Each row is clickable to go back and re-answer that question.
 *
 * Route: /test/.../:topicId/review
 */
export function TestReviewScreen() {
  const {
    phase,
    questions,
    answers,
    isExiting,
    goToReviewQuestion,
    submitTest,
    handleExitClick,
  } = useTest()

  usePageTracking('Test - Review')
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Focus the heading on mount so screen readers announce the review screen
  useEffect(() => {
    const timer = setTimeout(() => {
      headingRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // ─── Route Guard ─────────────────────────────────────────────────
  if (phase !== 'reviewing' && phase !== 'reviewing-question') {
    if (phase === 'completed') {
      return <Navigate to="../results" replace />
    }
    return <Navigate to=".." replace />
  }

  // Build review data from context
  const reviewQuestions = questions.map((question, index) => ({
    question,
    selectedAnswer: answers.get(index) ?? null,
  }))

  const answeredCount = reviewQuestions.filter(q => q.selectedAnswer !== null).length
  const skippedCount = reviewQuestions.length - answeredCount

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isExiting ? 'animate-test-fade-out' : 'animate-test-fade-in'}`}>
      <Container size="md" padding="md" className="py-6 md:py-10">
        {/* Header */}
        <div className="mb-8">
          <Heading as="h1" ref={headingRef} tabIndex={-1} className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 outline-none">
            Review your answers
          </Heading>

          {/* Completion summary */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 md:p-6 mb-5">
            <Text variant="body1" as="p" className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {answeredCount} of {questions.length} questions answered
            </Text>

            {/* Segmented progress bar */}
            <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 mb-3">
              {answeredCount > 0 && (
                <div
                  className="bg-green-500 dark:bg-green-400 transition-all duration-500 ease-out"
                  style={{ width: `${(answeredCount / questions.length) * 100}%` }}
                />
              )}
              {skippedCount > 0 && (
                <div
                  className="bg-orange-400 dark:bg-orange-500 transition-all duration-500 ease-out"
                  style={{ width: `${(skippedCount / questions.length) * 100}%` }}
                />
              )}
            </div>

            {/* Legend + Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 dark:bg-green-400 shrink-0" />
                  <Text variant="small" as="span" className="text-gray-600 dark:text-gray-300">
                    {answeredCount} Answered
                  </Text>
                </div>
                {skippedCount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 dark:bg-orange-500 shrink-0" />
                    <Text variant="small" as="span" className="text-gray-600 dark:text-gray-300">
                      {skippedCount} Skipped
                    </Text>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={submitTest}
                  variant="primary"
                  size="md"
                  data-tracking-id="test-review-submit-top"
                >
                  Submit test
                </Button>
                <Button
                  onClick={handleExitClick}
                  variant="secondary"
                  size="md"
                  data-tracking-id="test-review-exit-top"
                >
                  End test
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Question table */}
        <Table aria-label="Question review">
          <TableHead>
            <TableRow>
              <TableHeaderCell width="narrow" className="hidden sm:table-cell">#</TableHeaderCell>
              <TableHeaderCell width="narrow">Status</TableHeaderCell>
              <TableHeaderCell>Question</TableHeaderCell>
              <TableHeaderCell width="narrow">{''}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviewQuestions.map((item, index) => {
              const isSkipped = item.selectedAnswer === null

              return (
                <Fragment key={index}>
                  <TableRow
                    interactive
                    onClick={() => goToReviewQuestion(index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        goToReviewQuestion(index)
                      }
                    }}
                    aria-label={`Question ${index + 1}: ${isSkipped ? 'Skipped' : 'Answered'}. ${item.question.question}`}
                  >
                    <TableCell className="hidden sm:table-cell font-medium tabular-nums text-gray-600 dark:text-gray-300">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {isSkipped ? (
                        <Badge size="sm" className="bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100">
                          Skipped
                        </Badge>
                      ) : (
                        <Badge size="sm" className="bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-200">
                          Answered
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="max-w-0 sm:max-w-none">
                      <span className="line-clamp-2 sm:line-clamp-none">{item.question.question}</span>
                    </TableCell>
                    <TableCell>
                      <ChevronRight
                        size={18}
                        className="text-gray-400 dark:text-gray-500"
                      />
                    </TableCell>
                  </TableRow>
                </Fragment>
              )
            })}
          </TableBody>
        </Table>

        {/* Bottom actions */}
        <div className="flex flex-wrap gap-4 justify-start mt-8">
          <Button
            onClick={submitTest}
            variant="primary"
            size="lg"
            data-tracking-id="test-review-submit"
          >
            Submit test
          </Button>
          <Button
            onClick={handleExitClick}
            variant="secondary"
            size="lg"
            data-tracking-id="test-review-exit"
          >
            End test
          </Button>
        </div>
      </Container>
    </div>
  )
}
