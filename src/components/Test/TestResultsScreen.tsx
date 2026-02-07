import { useState } from 'react'
import type { Question } from '../../data/questions'
import { Button, Heading, Text, Container } from '../../design-system'

interface AnsweredQuestion {
  question: Question
  selectedAnswer: number | null
  isCorrect: boolean
}

interface TestResultsScreenProps {
  score: number
  totalQuestions: number
  answeredQuestions: AnsweredQuestion[]
  onRestart: () => void
  onBack: () => void
  isExiting?: boolean
}

/**
 * Results screen component for test view
 * Displays final score, per-question breakdown with explanations
 */
export function TestResultsScreen({ 
  score, 
  totalQuestions, 
  answeredQuestions,
  onRestart, 
  onBack,
  isExiting = false 
}: TestResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())

  const toggleQuestion = (index: number) => {
    setExpandedQuestions(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedQuestions(new Set(answeredQuestions.map((_, i) => i)))
  }

  const collapseAll = () => {
    setExpandedQuestions(new Set())
  }
  
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 py-8 ${isExiting ? 'animate-[fadeOut_350ms_ease-in_forwards]' : 'animate-[fadeIn_400ms_ease-out]'}`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
      <Container size="md" padding="md">
        {/* Summary section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-12 text-center mb-8">
          <Heading as="h1" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Test Complete!
          </Heading>
          <Text variant="body1" as="p" className="text-5xl md:text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            {score}/{totalQuestions}
          </Text>
          <Text variant="body1" as="p" className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            You got {percentage}% correct
          </Text>
          
          <div className="flex gap-4 justify-center">
            <Button
              onClick={onRestart}
              data-tracking-id="test-retry"
              variant="primary"
              size="lg"
            >
              Retry Test
            </Button>
            <Button
              onClick={onBack}
              data-tracking-id="test-finish"
              variant="secondary"
              size="lg"
            >
              Finish
            </Button>
          </div>
        </div>

        {/* Question breakdown */}
        {answeredQuestions.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <Heading as="h2" className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Question Breakdown
              </Heading>
              <button
                onClick={expandedQuestions.size === answeredQuestions.length ? collapseAll : expandAll}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                {expandedQuestions.size === answeredQuestions.length ? 'Collapse all' : 'Expand all'}
              </button>
            </div>

            <div className="space-y-3">
              {answeredQuestions.map((item, index) => {
                const isExpanded = expandedQuestions.has(index)
                const wasSkipped = item.selectedAnswer === null

                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Question header - always visible */}
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full text-left p-4 md:p-5 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors cursor-pointer"
                    >
                      {/* Status indicator */}
                      <div className="flex-shrink-0 mt-0.5">
                        {item.isCorrect ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400" />
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Question text */}
                      <div className="flex-1 min-w-0">
                        <Text variant="small" as="span" className="text-gray-500 dark:text-gray-400">
                          Question {index + 1}
                        </Text>
                        <Text variant="body1" as="p" className="text-gray-900 dark:text-gray-100 mt-0.5">
                          {item.question.question}
                        </Text>
                      </div>

                      {/* Expand/collapse chevron */}
                      <div className="flex-shrink-0 mt-1">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-gray-100 dark:border-gray-700">
                        {/* User's answer */}
                        <div className="mt-4 mb-3">
                          <Text variant="small" as="p" bold className="text-gray-500 dark:text-gray-400 mb-1">
                            Your answer
                          </Text>
                          {wasSkipped ? (
                            <Text variant="body2" as="p" className="text-gray-400 dark:text-gray-500 italic">
                              Skipped
                            </Text>
                          ) : (
                            <Text variant="body2" as="p" className={item.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                              {item.question.options[item.selectedAnswer!]}
                            </Text>
                          )}
                        </div>

                        {/* Correct answer (show if wrong or skipped) */}
                        {!item.isCorrect && (
                          <div className="mb-3">
                            <Text variant="small" as="p" bold className="text-gray-500 dark:text-gray-400 mb-1">
                              Correct answer
                            </Text>
                            <Text variant="body2" as="p" className="text-green-700 dark:text-green-400">
                              {item.question.options[item.question.correctAnswer]}
                            </Text>
                          </div>
                        )}

                        {/* Explanation */}
                        {item.question.explanation && (
                          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <Text variant="small" as="p" bold className="text-gray-500 dark:text-gray-400 mb-1">
                              Explanation
                            </Text>
                            <Text variant="body2" as="p" className="text-gray-700 dark:text-gray-300">
                              {item.question.explanation}
                            </Text>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Bottom actions */}
            <div className="flex gap-4 justify-center mt-8">
              <Button
                onClick={onRestart}
                data-tracking-id="test-retry-bottom"
                variant="primary"
                size="lg"
              >
                Retry Test
              </Button>
              <Button
                onClick={onBack}
                data-tracking-id="test-finish-bottom"
                variant="secondary"
                size="lg"
              >
                Finish
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
