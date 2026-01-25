import { Tooltip } from '../Tooltip'
import { Icon } from '../Icon'
import { Heading, Button } from '../../design-system'

interface TopicStickyHeaderProps {
  isMinimized: boolean
  topicTitle: string
  onBackClick: () => void
  onTestClick: () => void
}

/**
 * Sticky header for topic detail pages
 * Shows back button, title, and test CTA
 * Minimizes on scroll for better reading experience
 */
export function TopicStickyHeader({
  isMinimized,
  topicTitle,
  onBackClick,
  onTestClick
}: TopicStickyHeaderProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`flex items-center justify-between gap-4 transition-all duration-300 ${isMinimized ? 'py-2' : 'py-4'}`}>
          {/* Left: Back button + Title */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <Tooltip content="Back">
              <button
                onClick={onBackClick}
                data-tracking-id="topic-back-button"
                className={`flex-shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 ${
                  isMinimized ? 'p-1.5' : 'p-2'
                }`}
                aria-label="Back to domain overview"
              >
                <Icon name="arrow-left" customSize={isMinimized ? 18 : 20} />
              </button>
            </Tooltip>
            <Heading 
              as={isMinimized ? "h2" : "h1"} 
              className={`font-semibold text-gray-900 dark:text-gray-100 truncate transition-all duration-300 ${
                isMinimized ? 'text-base md:text-lg' : 'text-lg md:text-xl'
              }`}
            >
              {topicTitle}
            </Heading>
          </div>

          {/* Right: Test CTA */}
          <div className="flex-shrink-0">
            <Button
              onClick={onTestClick}
              data-tracking-id="topic-header-quick-test"
              variant="primary"
              size={isMinimized ? "sm" : "md"}
              className="whitespace-nowrap flex items-center"
              aria-label="Quick test"
            >
              <span className={isMinimized ? "hidden sm:inline" : ""} aria-hidden="true">Quick test</span>
              <span className={isMinimized ? "inline sm:hidden" : "hidden"} aria-hidden="true">Test</span>
              <Icon name="arrow-right" customSize={14} className="ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
