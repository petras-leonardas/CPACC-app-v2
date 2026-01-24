import type { Question } from '../../data/questions'
import { Heading, Text, Button } from '../../design-system'

interface TestQuestionCardProps {
  question: Question
  selectedAnswer: number | null
  showFeedback: boolean
  onSelectAnswer: (index: number) => void
  onSubmit: () => void
  onNext: () => void
  isLastQuestion: boolean
}

/**
 * Question card component displaying question, answer options, and explanation
 * Handles feedback state (correct/incorrect indicators)
 */
export function TestQuestionCard({
  question,
  selectedAnswer,
  showFeedback,
  onSelectAnswer,
  onSubmit,
  onNext,
  isLastQuestion
}: TestQuestionCardProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
      {/* Left side - Options */}
      <div className="flex-1 w-full">
        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrectAnswer = index === question.correctAnswer
            const showCorrectMark = showFeedback && isCorrectAnswer
            const showWrongMark = showFeedback && isSelected && !isCorrectAnswer

            // After feedback, only show: correct answer + selected wrong answer (if applicable)
            const isVisible = !showFeedback || isCorrectAnswer || isSelected

            if (!isVisible) return null

            return (
              <button
                key={index}
                onClick={() => !showFeedback && onSelectAnswer(index)}
                disabled={showFeedback}
                className={`
                  w-full text-left p-4 rounded-lg border-2 transition-all
                  ${!showFeedback && 'hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer'}
                  ${showFeedback && 'cursor-default'}
                  ${isSelected && !showFeedback
                    ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-950'
                    : !showFeedback
                    ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    : ''
                  }
                  ${showCorrectMark
                    ? 'border-green-500 dark:border-green-600 bg-green-50 dark:bg-green-950'
                    : ''
                  }
                  ${showWrongMark
                    ? 'border-red-500 dark:border-red-600 bg-red-50 dark:bg-red-950'
                    : ''
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5
                    ${isSelected && !showFeedback
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-500 dark:bg-blue-400'
                      : !showFeedback
                      ? 'border-gray-300 dark:border-gray-600'
                      : ''
                    }
                    ${showCorrectMark
                      ? 'border-green-500 dark:border-green-400 bg-green-500 dark:bg-green-400'
                      : ''
                    }
                    ${showWrongMark
                      ? 'border-red-500 dark:border-red-400 bg-red-500 dark:bg-red-400'
                      : ''
                    }
                  `}>
                    {isSelected && !showFeedback && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
                        <circle cx="6" cy="6" r="3" fill="currentColor" />
                      </svg>
                    )}
                    {showCorrectMark && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {showWrongMark && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    )}
                  </div>
                  <span className={`
                    flex-1 text-base
                    ${showCorrectMark
                      ? 'text-green-900 dark:text-green-100 font-medium'
                      : showWrongMark
                      ? 'text-red-900 dark:text-red-100'
                      : 'text-gray-900 dark:text-gray-100'
                    }
                  `}>
                    {option}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
        
        {/* Submit or Next button */}
        <div className="mt-6">
          {!showFeedback ? (
            <Button
              onClick={onSubmit}
              disabled={selectedAnswer === null}
              data-tracking-id="test-submit-answer"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Submit Answer →
            </Button>
          ) : (
            <Button
              onClick={onNext}
              data-tracking-id="test-next-question"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {isLastQuestion ? 'Finish →' : 'Next Question →'}
            </Button>
          )}
        </div>
      </div>

      {/* Right side - Explanation */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
          <Heading as="h3" className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Explanation
          </Heading>
          {showFeedback ? (
            <>
              <div className={`mb-4 p-3 rounded-lg ${
                selectedAnswer === question.correctAnswer
                  ? 'bg-green-100 dark:bg-green-950 border border-green-300 dark:border-green-800'
                  : 'bg-red-100 dark:bg-red-950 border border-red-300 dark:border-red-800'
              }`}>
                <Text variant="body2" className={`font-semibold ${
                  selectedAnswer === question.correctAnswer
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {selectedAnswer === question.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                </Text>
              </div>
              <Text variant="body1" className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {question.explanation || 'No explanation available for this question.'}
              </Text>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <div className="mb-4 relative">
                <svg width="120" height="120" viewBox="0 0 120 120" className="text-gray-300">
                  <path
                    d="M 60 20 Q 45 20 35 35 Q 25 50 35 60"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 35 60 Q 40 65 50 65 L 50 75"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="90"
                    r="4"
                    fill="currentColor"
                  />
                  <circle cx="85" cy="30" r="3" fill="currentColor" />
                  <circle cx="25" cy="45" r="2" fill="currentColor" />
                  <circle cx="75" cy="85" r="2" fill="currentColor" />
                </svg>
              </div>
              <Text variant="body2" className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                Submit your answer to reveal the explanation! 🎯
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
