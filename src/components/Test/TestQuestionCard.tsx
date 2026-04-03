import { useRef, useCallback } from 'react'
import type { Question } from '../../data/questions'
import { Button, RadioCard, Text } from '../../design-system'

interface TestQuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
  onSubmit: () => void
  onSkip: () => void
  isReviewMode?: boolean
  onBackToReview?: () => void
}

/**
 * Question card component displaying question and answer options
 * Implements WAI-ARIA radio group pattern for keyboard navigation:
 * - Tab moves focus into/out of the group
 * - Arrow keys move between options and select them
 * - Wraps around from last to first and vice versa
 */
export function TestQuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  onSubmit,
  onSkip,
  isReviewMode = false,
  onBackToReview,
}: TestQuestionCardProps) {
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  const hasSelection = selectedAnswer !== null
  const focusedIndex = selectedAnswer ?? 0

  const setCardRef = useCallback((index: number) => (el: HTMLButtonElement | null) => {
    cardRefs.current[index] = el
  }, [])

  const getTabIndex = (index: number): number => {
    if (!hasSelection) return 0
    return index === focusedIndex ? 0 : -1
  }

  const handleRadioGroupKeyDown = (e: React.KeyboardEvent) => {
    const count = question.options.length
    let newIndex: number | null = null
    const currentFocused = cardRefs.current.findIndex(ref => ref === document.activeElement)
    const baseIndex = currentFocused >= 0 ? currentFocused : focusedIndex

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      newIndex = (baseIndex + 1) % count
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      newIndex = (baseIndex - 1 + count) % count
    }

    if (newIndex !== null) {
      onSelectAnswer(newIndex)
      cardRefs.current[newIndex]?.focus()
    }
  }

  return (
    <div className="flex flex-col gap-6 items-start">
      <div className="flex-1 w-full">
        <div
          className="space-y-4"
          role="radiogroup"
          aria-label="Answer options"
          onKeyDown={handleRadioGroupKeyDown}
        >
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index

            return (
              <RadioCard
                key={index}
                ref={setCardRef(index)}
                selected={isSelected}
                onClick={() => onSelectAnswer(index)}
                tabIndex={getTabIndex(index)}
              >
                <Text variant="body1" as="span" className="text-gray-900 dark:text-gray-100">
                  {option}
                </Text>
              </RadioCard>
            )
          })}
        </div>
        
        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            onClick={hasSelection ? onSubmit : onSkip}
            data-tracking-id={hasSelection ? 'test-submit-answer' : 'test-skip-question'}
            variant={hasSelection ? 'primary' : 'secondary'}
            size="lg"
            className="w-full sm:w-auto sm:min-w-[200px] text-center justify-center"
          >
            {hasSelection ? 'Next question →' : 'Skip question'}
          </Button>
          {isReviewMode && onBackToReview && (
            <Button
              onClick={onBackToReview}
              data-tracking-id="test-back-to-review"
              variant="ghost"
              size="lg"
            >
              Back to review
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
