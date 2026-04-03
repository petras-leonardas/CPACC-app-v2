import { Fragment } from 'react'
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
          <Heading as="h1" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Review your answers
          </Heading>
          <div className="flex items-center gap-4">
            <Text variant="body2" className="text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-100">{answeredCount}</span> answered
            </Text>
            {skippedCount > 0 && (
              <Text variant="body2" className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-orange-600 dark:text-orange-400">{skippedCount}</span> skipped
              </Text>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
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

        {/* Question table */}
        <Table aria-label="Question review">
          <TableHead>
            <TableRow>
              <TableHeaderCell width="narrow">#</TableHeaderCell>
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
                    <TableCell className="font-medium tabular-nums text-gray-500 dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {isSkipped ? (
                        <Badge size="sm" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                          Skipped
                        </Badge>
                      ) : (
                        <Badge size="sm" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Answered
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="line-clamp-2">
                      {item.question.question}
                    </TableCell>
                    <TableCell>
                      <ChevronRight
                        size={18}
                        className={isSkipped
                          ? 'text-orange-500 dark:text-orange-400'
                          : 'text-gray-300 dark:text-gray-600 group-hover:text-gray-400'}
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
