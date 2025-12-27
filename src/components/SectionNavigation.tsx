import { Icon } from './Icon'

interface TopicNavigationProps {
  topics: Array<{ id: string; title: string }>
  currentTopicIndex: number
  onNavigateToPreviousTopic: () => void
  onNavigateToNextTopic: () => void
  onScrollToTop: () => void
  nextDomainInfo?: { domainTitle: string; domainNumber: number }
  previousDomainInfo?: { domainTitle: string; domainNumber: number }
  showPracticeOption?: boolean
}

export function TopicNavigation({
  topics,
  currentTopicIndex,
  onNavigateToPreviousTopic,
  onNavigateToNextTopic,
  onScrollToTop,
  nextDomainInfo,
  previousDomainInfo,
  showPracticeOption
}: TopicNavigationProps) {
  const hasPrevious = currentTopicIndex > 0
  const hasNext = currentTopicIndex < topics.length - 1
  const hasNextDomain = !hasNext && nextDomainInfo
  const hasPreviousDomain = currentTopicIndex === 0 && previousDomainInfo
  const hasPracticeOption = !hasNext && showPracticeOption
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
          {(hasPrevious || hasPreviousDomain) && (
            <button
              onClick={onNavigateToPreviousTopic}
              className="flex-1 flex items-start gap-2 px-4 py-3 rounded-lg font-medium transition-all min-w-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label={
                previousTopic
                  ? `Navigate to previous topic: ${previousTopic.title}`
                  : `Navigate to previous domain: ${previousDomainInfo!.domainTitle}`
              }
            >
              <Icon name="chevron-left" customSize={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-left flex-1 min-w-0">
                {previousTopic ? (
                  <>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">Previous</span>
                    <span className="block text-sm break-words">{previousTopic.title}</span>
                  </>
                ) : (
                  <>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">Previous Domain</span>
                    <span className="block text-sm break-words">{previousDomainInfo!.domainTitle}</span>
                  </>
                )}
              </span>
            </button>
          )}

          {(hasNext || hasNextDomain || hasPracticeOption) && (
            <button
              onClick={onNavigateToNextTopic}
              className="flex-1 flex items-start gap-2 px-4 py-3 rounded-lg font-medium transition-all min-w-0 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
              aria-label={
                nextTopic 
                  ? `Navigate to next topic: ${nextTopic.title}` 
                  : hasPracticeOption
                  ? 'Navigate to practice page'
                  : `Navigate to next domain: ${nextDomainInfo!.domainTitle}`
              }
            >
              <span className="text-left sm:text-right flex-1 min-w-0 order-1 sm:order-none">
                {nextTopic ? (
                  <>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">Next</span>
                    <span className="block text-sm break-words">{nextTopic.title}</span>
                  </>
                ) : hasPracticeOption ? (
                  <>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">Ready to Practice?</span>
                    <span className="block text-sm break-words">Go to Practice Page</span>
                  </>
                ) : (
                  <>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">Next Domain</span>
                    <span className="block text-sm break-words">{nextDomainInfo!.domainTitle}</span>
                  </>
                )}
              </span>
              <Icon name="chevron-right" customSize={20} className="flex-shrink-0 mt-0.5 order-2 sm:order-none" />
            </button>
          )}
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
