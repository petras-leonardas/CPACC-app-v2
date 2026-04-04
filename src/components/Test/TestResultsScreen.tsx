import { useState, useEffect, useRef, Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useTest } from '../../contexts/TestContext'
import { usePageTracking } from '../../hooks/usePageTracking'
import {
  Button, Heading, Text, Badge, Container, Link,
  Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell,
} from '../../design-system'
import { focusRingClasses, getFocusRingStyle } from '../../design-system/utils/focusStyles'
import { useDarkMode } from '../../design-system/hooks/useDarkMode'
import { DOMAIN_PATHS } from '../../config/domainConfig'

/** Map a question's topicId to its study page URL */
function getTopicUrl(topicId: string): string | null {
  const domainNumber = parseInt(topicId.charAt(0), 10)
  const domainPath = DOMAIN_PATHS[domainNumber]
  if (!domainPath) return null
  return `/${domainPath}/${topicId}`
}

/**
 * Results screen — displays final score and per-question breakdown in a table.
 * Each row expands to show the user's answer, correct answer, and explanation.
 *
 * Route: /test/.../:topicId/results
 */
export function TestResultsScreen() {
  const {
    phase,
    totalQuestions,
    finalResults,
    isExiting,
    restartTest,
    exitToOrigin,
  } = useTest()

  usePageTracking('Test - Results')

  const isDark = useDarkMode()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())
  const [showBreakdown, setShowBreakdown] = useState(false)

  // Focus the heading on mount so screen readers announce the results
  useEffect(() => {
    const timer = setTimeout(() => {
      headingRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // ─── Route Guard ─────────────────────────────────────────────────
  if (phase !== 'completed' || !finalResults) {
    return <Navigate to=".." replace />
  }

  const { score, answeredQuestions } = finalResults
  const percentage = Math.round((score / totalQuestions) * 100)
  const incorrectCount = answeredQuestions.filter(q => q.selectedAnswer !== null && !q.isCorrect).length
  const skippedCount = answeredQuestions.filter(q => q.selectedAnswer === null).length

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 py-8 ${isExiting ? 'animate-test-fade-out' : 'animate-test-fade-in'}`}>
      <Container size="md" padding="md">
        {/* Summary section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center mb-6">
          <Heading as="h1" ref={headingRef} tabIndex={-1} className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 outline-none">
            Your results
          </Heading>
          <Text variant="body1" as="p" className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {score}/{totalQuestions}
          </Text>
          <Text variant="body1" as="p" className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            You scored {percentage}%
          </Text>

          {/* Segmented results bar */}
          <div className="max-w-sm mx-auto mb-6">
            <div className="flex h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 mb-3">
              {score > 0 && (
                <div
                  className="bg-green-500 dark:bg-green-400 transition-all duration-500 ease-out"
                  style={{ width: `${(score / totalQuestions) * 100}%` }}
                />
              )}
              {incorrectCount > 0 && (
                <div
                  className="bg-red-400 dark:bg-red-500 transition-all duration-500 ease-out"
                  style={{ width: `${(incorrectCount / totalQuestions) * 100}%` }}
                />
              )}
              {skippedCount > 0 && (
                <div
                  className="bg-orange-400 dark:bg-orange-500 transition-all duration-500 ease-out"
                  style={{ width: `${(skippedCount / totalQuestions) * 100}%` }}
                />
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 dark:bg-green-400 shrink-0" />
                <Text variant="small" as="span" className="text-gray-600 dark:text-gray-300">
                  {score} correct
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 dark:bg-red-500 shrink-0" />
                <Text variant="small" as="span" className="text-gray-600 dark:text-gray-300">
                  {incorrectCount} incorrect
                </Text>
              </div>
              {skippedCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-400 dark:bg-orange-500 shrink-0" />
                  <Text variant="small" as="span" className="text-gray-600 dark:text-gray-300">
                    {skippedCount} skipped
                  </Text>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={restartTest}
              data-tracking-id="test-retry"
              variant="secondary"
              size="lg"
            >
              Retry test
            </Button>
            <Button
              onClick={exitToOrigin}
              data-tracking-id="test-finish"
              variant="primary"
              size="lg"
            >
              Finish test
            </Button>
          </div>
        </div>

        {/* Question breakdown accordion */}
        {answeredQuestions.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setShowBreakdown(prev => !prev)}
              className={`inline-flex items-center gap-2 rounded-lg px-1 py-1 cursor-pointer transition-colors hover:opacity-80 ${focusRingClasses}`}
              style={getFocusRingStyle(isDark) as React.CSSProperties}
              aria-expanded={showBreakdown}
              aria-controls="question-breakdown-panel"
            >
              <Heading as="h2" className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                Question breakdown
              </Heading>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 shrink-0 ${showBreakdown ? 'rotate-180' : ''}`}
              >
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {showBreakdown && (
              <div id="question-breakdown-panel" className="mt-3 animate-fade-in">

            <Table aria-label="Question breakdown">
              <TableHead>
                <TableRow>
                  <TableHeaderCell width="narrow">Result</TableHeaderCell>
                  <TableHeaderCell width="narrow" className="hidden sm:table-cell">#</TableHeaderCell>
                  <TableHeaderCell>Question</TableHeaderCell>
                  <TableHeaderCell width="narrow">{''}</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {answeredQuestions.map((item, index) => {
                  const isExpanded = expandedQuestions.has(index)
                  const wasSkipped = item.selectedAnswer === null

                  return (
                    <Fragment key={index}>
                      {/* Summary row */}
                      <TableRow
                        interactive
                        expanded={isExpanded}
                        onClick={() => toggleQuestion(index)}
                        aria-expanded={isExpanded}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleQuestion(index)
                          }
                        }}
                      >
                        <TableCell>
                          {wasSkipped ? (
                            <Badge size="sm" className="bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-100">
                              Skipped
                            </Badge>
                          ) : item.isCorrect ? (
                            <Badge size="sm" className="bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-200">
                              Correct
                            </Badge>
                          ) : (
                            <Badge size="sm" className="bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100">
                              Incorrect
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell font-medium tabular-nums text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </TableCell>
                        <TableCell className="max-w-0 sm:max-w-none">
                          <span className="line-clamp-2 sm:line-clamp-none">{item.question.question}</span>
                        </TableCell>
                        <TableCell>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                          >
                            <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </TableCell>
                      </TableRow>

                      {/* Expanded detail row */}
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={4} className="bg-gray-50 dark:bg-gray-800 px-6 py-4">
                            <div className="space-y-3">
                              {/* User's answer */}
                              <div>
                                <Text variant="small" as="p" bold className="text-gray-500 dark:text-gray-400 mb-0.5">
                                  Your answer
                                </Text>
                                {wasSkipped ? (
                                  <Text variant="body2" as="p" className="text-gray-400 dark:text-gray-500 italic">
                                    No answer given
                                  </Text>
                                ) : (
                                  <Text variant="body2" as="p" className={item.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                                    {item.question.options[item.selectedAnswer!]}
                                  </Text>
                                )}
                              </div>

                              {/* Correct answer (show if wrong or skipped) */}
                              {!item.isCorrect && (
                                <div>
                                  <Text variant="small" as="p" bold className="text-gray-500 dark:text-gray-400 mb-0.5">
                                    Correct answer
                                  </Text>
                                  <Text variant="body2" as="p" className="text-green-700 dark:text-green-400">
                                    {item.question.options[item.question.correctAnswer]}
                                  </Text>
                                </div>
                              )}

                              {/* Explanation */}
                              {item.question.explanation && (
                                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                  <Text variant="small" as="p" bold className="text-gray-500 dark:text-gray-400 mb-0.5">
                                    Explanation
                                  </Text>
                                  <Text variant="body2" as="p" className="text-gray-700 dark:text-gray-300">
                                    {item.question.explanation}
                                  </Text>
                                </div>
                              )}

                              {/* Study link for wrong/skipped answers */}
                              {!item.isCorrect && item.question.topicId && getTopicUrl(item.question.topicId) && (
                                <div className="pt-2">
                                  <Link href={getTopicUrl(item.question.topicId)!} underline="always" className="text-sm">
                                    Study this topic
                                  </Link>
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  )
                })}
              </TableBody>
            </Table>

            {/* Bottom actions */}
            <div className="flex gap-4 justify-center mt-8">
              <Button
                onClick={restartTest}
                data-tracking-id="test-retry-bottom"
                variant="secondary"
                size="lg"
              >
              Retake test
              </Button>
              <Button
                onClick={exitToOrigin}
                data-tracking-id="test-finish-bottom"
                variant="primary"
                size="lg"
              >
                Finish test
              </Button>
            </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}
