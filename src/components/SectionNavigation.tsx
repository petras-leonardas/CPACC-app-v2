import { Icon } from './Icon'
import { Button } from '../design-system'

interface TopicNavigationProps {
  topics: Array<{ id: string; title: string; subCategory?: string }>
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
            <Button
              onClick={onNavigateToPreviousTopic}
              data-tracking-id="topic-previous"
              variant="ghost"
              className="flex-1 flex items-center gap-2 min-w-0 justify-start"
              aria-label={
                previousTopic
                  ? `Navigate to previous topic: ${previousTopic.title}`
                  : `Navigate to previous domain: ${previousDomainInfo!.domainTitle}`
              }
            >
              <Icon name="chevron-left" customSize={20} className="flex-shrink-0" />
              <span className="text-left flex-1 min-w-0">
                {previousTopic ? (
                  <>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">Previous</span>
                    <span className="block text-sm break-words">{previousTopic.subCategory && `${previousTopic.subCategory}. `}{previousTopic.title}</span>
                  </>
                ) : (
                  <>
                    <span className="block text-xs text-gray-600 dark:text-gray-400">Previous Domain</span>
                    <span className="block text-sm break-words">{previousDomainInfo!.domainTitle}</span>
                  </>
                )}
              </span>
            </Button>
          )}

          {(hasNext || hasNextDomain || hasPracticeOption) && (
            <Button
              onClick={onNavigateToNextTopic}
              data-tracking-id="topic-next"
              variant="ghost"
              className="flex-1 flex items-center gap-2 min-w-0 justify-start"
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
                    <span className="block text-sm break-words">{nextTopic.subCategory && `${nextTopic.subCategory}. `}{nextTopic.title}</span>
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
              <Icon name="chevron-right" customSize={20} className="flex-shrink-0 order-2 sm:order-none" />
            </Button>
          )}
        </div>

        {/* Bottom row: Current topic + Scroll to top */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current:</div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {currentTopic?.subCategory && (
                <span className="text-gray-500 dark:text-gray-400">{currentTopic.subCategory}. </span>
              )}
              {currentTopic?.title}
            </div>
          </div>

          <Button
            onClick={onScrollToTop}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
            aria-label="Scroll to top of page"
            title="Back to top"
          >
            <Icon name="arrow-up" customSize={16} />
            <span>Back to top</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
