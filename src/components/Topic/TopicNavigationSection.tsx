import { NavigationButton, Button, Card } from '../../design-system'
import { Icon } from '../Icon'

interface TopicNavigationSectionProps {
  topics: Array<{ id: string; title: string; subCategory?: string }>
  currentTopicIndex: number
  /** Current domain URL path segment (e.g., "disabilities-challenges-assistive-technology") */
  domainPath: string
  onNavigateToPreviousTopic: () => void
  onNavigateToNextTopic: () => void
  onScrollToTop: () => void
  nextDomainInfo?: { domainTitle: string; domainNumber: number; domainPath: string }
  previousDomainInfo?: { domainTitle: string; domainNumber: number; domainPath: string }
  showPracticeOption?: boolean
}

export function TopicNavigationSection({
  topics,
  currentTopicIndex,
  domainPath,
  onNavigateToPreviousTopic,
  onNavigateToNextTopic,
  onScrollToTop,
  nextDomainInfo,
  previousDomainInfo,
  showPracticeOption
}: TopicNavigationSectionProps) {
  const hasPrevious = currentTopicIndex > 0
  const hasNext = currentTopicIndex < topics.length - 1
  const hasNextDomain = !hasNext && nextDomainInfo
  const hasPreviousDomain = currentTopicIndex === 0 && previousDomainInfo
  const hasPracticeOption = !hasNext && showPracticeOption
  const currentTopic = topics[currentTopicIndex]
  const previousTopic = hasPrevious ? topics[currentTopicIndex - 1] : null
  const nextTopic = hasNext ? topics[currentTopicIndex + 1] : null

  // Compute hrefs for semantic <a> navigation
  const previousHref = previousTopic
    ? `/${domainPath}/${previousTopic.id}`
    : previousDomainInfo
    ? `/${previousDomainInfo.domainPath}`
    : undefined

  const nextHref = nextTopic
    ? `/${domainPath}/${nextTopic.id}`
    : hasPracticeOption
    ? '/cpacc-practice-test'
    : nextDomainInfo
    ? `/${nextDomainInfo.domainPath}`
    : undefined

  return (
    <Card className="mt-8 mb-8">
      <nav aria-label="Topic navigation">
        <div className="flex flex-col gap-4">
        {/* Navigation buttons - Previous and Next */}
        <div className={`grid gap-4 ${(hasPrevious || hasPreviousDomain) && (hasNext || hasNextDomain || hasPracticeOption) ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
          {(hasPrevious || hasPreviousDomain) && (
            <NavigationButton
              href={previousHref}
              direction="previous"
              label={previousTopic ? 'Previous' : 'Previous Domain'}
              title={
                previousTopic 
                  ? `${previousTopic.subCategory ? `${previousTopic.subCategory}. ` : ''}${previousTopic.title}`
                  : previousDomainInfo!.domainTitle
              }
              icon={<Icon name="chevron-left" customSize={20} />}
              onClick={(e) => {
                e.preventDefault()
                onNavigateToPreviousTopic()
              }}
              data-tracking-id="topic-previous"
              aria-label={
                previousTopic
                  ? `Navigate to previous topic: ${previousTopic.title}`
                  : `Navigate to previous domain: ${previousDomainInfo!.domainTitle}`
              }
            />
          )}

          {(hasNext || hasNextDomain || hasPracticeOption) && (
            <NavigationButton
              href={nextHref}
              direction="next"
              label={
                nextTopic 
                  ? 'Next' 
                  : hasPracticeOption 
                  ? 'Ready to Practice?' 
                  : 'Next Domain'
              }
              title={
                nextTopic 
                  ? `${nextTopic.subCategory ? `${nextTopic.subCategory}. ` : ''}${nextTopic.title}`
                  : hasPracticeOption
                  ? 'Go to Practice Page'
                  : nextDomainInfo!.domainTitle
              }
              icon={<Icon name="chevron-right" customSize={20} />}
              onClick={(e) => {
                e.preventDefault()
                onNavigateToNextTopic()
              }}
              data-tracking-id="topic-next"
              aria-label={
                nextTopic 
                  ? `Navigate to next topic: ${nextTopic.title}` 
                  : hasPracticeOption
                  ? 'Navigate to practice page'
                  : `Navigate to next domain: ${nextDomainInfo!.domainTitle}`
              }
            />
          )}
        </div>

        {/* Divider and current topic indicator with Back to top button */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {/* Left: Current topic indicator */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Topic {currentTopicIndex + 1} of {topics.length}
              {currentTopic && (
                <span className="ml-2">
                  · {currentTopic.subCategory && `${currentTopic.subCategory}. `}
                  {currentTopic.title}
                </span>
              )}
            </div>

            {/* Right: Back to top button */}
            <Button
              onClick={onScrollToTop}
              variant="ghost"
              size="sm"
              rightIcon={<Icon name="arrow-up" customSize={16} />}
              aria-label="Scroll to top of page"
            >
              Back to top
            </Button>
          </div>
        </div>
      </div>
      </nav>
    </Card>
  )
}
