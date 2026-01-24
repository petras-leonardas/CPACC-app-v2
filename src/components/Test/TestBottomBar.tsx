interface TestBottomBarProps {
  currentQuestionNumber: number
  totalQuestions: number
  showFeedback: boolean
  skipButtonText: string
  onSkip: () => void
}

/**
 * Sticky bottom bar for test navigation
 * Shows question counter and skip button only
 * Submit/Next buttons are now in TestQuestionCard
 */
export function TestBottomBar({
  currentQuestionNumber,
  totalQuestions,
  showFeedback,
  skipButtonText,
  onSkip
}: TestBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-row items-center justify-between gap-3">
        {/* Question counter */}
        <div className="flex-shrink-0">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Question {currentQuestionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Desktop: Skip button */}
        <div className="hidden md:flex flex-shrink-0">
          <button
            onClick={onSkip}
            disabled={showFeedback}
            data-tracking-id="test-skip-question"
            className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-600 dark:disabled:hover:text-gray-400 disabled:no-underline"
          >
            {skipButtonText}
          </button>
        </div>

        {/* Mobile: Skip button */}
        <div className="md:hidden flex-shrink-0">
          <button
            onClick={onSkip}
            disabled={showFeedback}
            data-tracking-id="test-skip-question"
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline transition-colors font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-gray-600 dark:disabled:hover:text-gray-400 disabled:no-underline"
          >
            {skipButtonText}
          </button>
        </div>
      </div>
    </div>
  )
}
