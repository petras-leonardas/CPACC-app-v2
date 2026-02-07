import { useRef, useCallback } from 'react'
import type { Question } from '../../data/questions'
import { Button, RadioCard, Text } from '../../design-system'

interface TestQuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
  onSubmit: () => void
  onSkip: () => void
  skipButtonText: string
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
  skipButtonText,
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
        
        {/* Submit and Skip buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button
            onClick={onSubmit}
            disabled={selectedAnswer === null}
            data-tracking-id="test-submit-answer"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Confirm answer →
          </Button>
          <Button
            onClick={onSkip}
            data-tracking-id="test-skip-question"
            variant="ghost"
            size="lg"
          >
            {skipButtonText}
          </Button>
        </div>
      </div>
    </div>
  )
}
