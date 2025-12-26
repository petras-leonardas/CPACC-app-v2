import { Icon } from './Icon'

interface TopicNavigationProps {
  topics: Array<{ id: string; title: string }>
  currentTopicIndex: number
  onNavigateToPreviousTopic: () => void
  onNavigateToNextTopic: () => void
  onScrollToTop: () => void
}

export function TopicNavigation({
  topics,
  currentTopicIndex,
  onNavigateToPreviousTopic,
  onNavigateToNextTopic,
  onScrollToTop
}: TopicNavigationProps) {
  const hasPrevious = currentTopicIndex > 0
  const hasNext = currentTopicIndex < topics.length - 1
  const currentTopic = topics[currentTopicIndex]
  const previousTopic = hasPrevious ? topics[currentTopicIndex - 1] : null
  const nextTopic = hasNext ? topics[currentTopicIndex + 1] : null

  return (
    <nav 
      className="mt-8 mb-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
      aria-label="Topic navigation"
    >
      <div className="flex flex-col gap-4">
        {/* Top row: Previous and Next buttons */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <button
            onClick={onNavigateToPreviousTopic}
            disabled={!hasPrevious}
            className={`flex-1 flex items-start gap-2 px-4 py-3 rounded-lg font-medium transition-all min-w-0 ${
              hasPrevious
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
            aria-label={
              previousTopic 
                ? `Navigate to previous topic: ${previousTopic.title}` 
                : 'Previous topic unavailable - you are viewing the first topic in this domain'
            }
            aria-disabled={!hasPrevious}
          >
            <Icon name="chevron-left" customSize={20} className="flex-shrink-0 mt-0.5" />
            <span className="text-left flex-1 min-w-0">
              {previousTopic ? (
                <>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">Previous</span>
                  <span className="block text-sm break-words">{previousTopic.title}</span>
                </>
              ) : (
                <span className="text-sm">No previous topic</span>
              )}
            </span>
          </button>

          <button
            onClick={onNavigateToNextTopic}
            disabled={!hasNext}
            className={`flex-1 flex items-start gap-2 px-4 py-3 rounded-lg font-medium transition-all min-w-0 ${
              hasNext
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            }`}
            aria-label={
              nextTopic 
                ? `Navigate to next topic: ${nextTopic.title}` 
                : 'Next topic unavailable - you are viewing the last topic in this domain'
            }
            aria-disabled={!hasNext}
          >
            <span className="text-left sm:text-right flex-1 min-w-0 order-1 sm:order-none">
              {nextTopic ? (
                <>
                  <span className="block text-xs text-gray-600 dark:text-gray-400">Next</span>
                  <span className="block text-sm break-words">{nextTopic.title}</span>
                </>
              ) : (
                <span className="text-sm">No next topic</span>
              )}
            </span>
            <Icon name="chevron-right" customSize={20} className="flex-shrink-0 mt-0.5 order-2 sm:order-none" />
          </button>
        </div>

        {/* Bottom row: Section indicator and Back to top */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Topic {currentTopicIndex + 1} of {topics.length}
            </span>
            {currentTopic && (
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline truncate max-w-xs">
                · {currentTopic.title}
              </span>
            )}
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
            aria-label="Scroll to top of page"
            title="Back to top"
          >
            <Icon name="arrow-up" customSize={16} />
            <span className="hidden sm:inline">Back to top</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
