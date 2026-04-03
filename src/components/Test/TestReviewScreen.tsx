import type { Question } from '../../data/questions'
import { Heading, Text, Button, Container } from '../../design-system'

interface QuestionStatus {
  question: Question
  selectedAnswer: number | null
}

interface TestReviewScreenProps {
  questions: QuestionStatus[]
  onReviewQuestion: (index: number) => void
  onSubmitTest: () => void
  onExitClick: () => void
  isExiting?: boolean
}

/**
 * Review screen shown after all questions have been seen.
 * Displays a summary of answered vs skipped questions.
 * Skipped questions are clickable so the user can go back and answer them.
 */
export function TestReviewScreen({
  questions,
  onReviewQuestion,
  onSubmitTest,
  onExitClick,
  isExiting = false,
}: TestReviewScreenProps) {
  const answeredCount = questions.filter(q => q.selectedAnswer !== null).length
  const skippedCount = questions.length - answeredCount

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 ${isExiting ? 'animate-[fadeOut_350ms_ease-in_forwards]' : 'animate-[fadeIn_400ms_ease-out]'}`}>
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
              onClick={onSubmitTest}
              variant="primary"
              size="md"
              data-tracking-id="test-review-submit-top"
            >
              Submit test
            </Button>
            <Button
              onClick={onExitClick}
              variant="secondary"
              size="md"
              data-tracking-id="test-review-exit-top"
            >
              End test
            </Button>
          </div>
        </div>

        {/* Question list */}
        <div className="space-y-3 mb-8">
          {questions.map((item, index) => {
            const isSkipped = item.selectedAnswer === null

            if (isSkipped) {
              return (
                <button
                  key={index}
                  onClick={() => onReviewQuestion(index)}
                  className="w-full text-left bg-white dark:bg-gray-800 rounded-2xl border-2 border-orange-200 dark:border-orange-800 p-4 md:p-5 flex items-start gap-3 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-md transition-all cursor-pointer group"
                >
                  {/* Status indicator */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600 dark:text-orange-400">
                        <polyline points="13 17 18 12 13 7" />
                        <polyline points="6 17 11 12 6 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Question text */}
                  <div className="flex-1 min-w-0">
                    <Text variant="small" as="span" className="text-orange-600 dark:text-orange-400 font-medium">
                      Question {index + 1} — Skipped
                    </Text>
                    <Text variant="body1" as="p" className="text-gray-900 dark:text-gray-100 mt-0.5 line-clamp-2">
                      {item.question.question}
                    </Text>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 mt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-orange-500">
                      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              )
            }

            return (
              <button
                key={index}
                onClick={() => onReviewQuestion(index)}
                className="w-full text-left bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-4 md:p-5 flex items-start gap-3 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all cursor-pointer group"
              >
                {/* Status indicator */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400" />
                    </svg>
                  </div>
                </div>

                {/* Question text */}
                <div className="flex-1 min-w-0">
                  <Text variant="small" as="span" className="text-green-600 dark:text-green-400 font-medium">
                    Question {index + 1} — Answered
                  </Text>
                  <Text variant="body1" as="p" className="text-gray-900 dark:text-gray-100 mt-0.5 line-clamp-2">
                    {item.question.question}
                  </Text>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-50 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gray-400">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-start">
          <Button
            onClick={onSubmitTest}
            variant="primary"
            size="lg"
            data-tracking-id="test-review-submit"
          >
            Submit test
          </Button>
          <Button
            onClick={onExitClick}
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
