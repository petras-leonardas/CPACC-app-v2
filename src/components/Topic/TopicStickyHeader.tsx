import type { RefObject } from 'react'
import { Heading, Button, IconButton, ArrowLeft } from '../../design-system'

interface TopicStickyHeaderProps {
  isMinimized: boolean
  topicTitle: string
  onBackClick: () => void
  onTestClick: () => void
  headingRef?: RefObject<HTMLHeadingElement | null>
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
  onTestClick,
  headingRef
}: TopicStickyHeaderProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isMinimized ? 'gap-3 py-2' : 'gap-6 py-6'}`}>
          {/* Left: Back button + Title */}
          <div className={`flex items-center min-w-0 flex-1 transition-all duration-300 ${isMinimized ? 'gap-2' : 'gap-3'}`}>
            <IconButton
              onClick={onBackClick}
              data-tracking-id="topic-back-button"
              icon={<ArrowLeft size={isMinimized ? 18 : 20} />}
              aria-label="Back to domain overview"
              tooltip="Back"
              variant="ghost"
              size={isMinimized ? 'sm' : 'md'}
            />
            <Heading 
              as={isMinimized ? "h2" : "h1"} 
              ref={headingRef}
              tabIndex={-1}
              className={`font-semibold text-gray-900 dark:text-gray-100 truncate transition-all duration-300 outline-none ${
                isMinimized ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'
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
              size={isMinimized ? "md" : "lg"}
              className="whitespace-nowrap"
              aria-label="Quick knowledge test"
            >
              <span className={isMinimized ? "hidden sm:inline" : ""}>Quick knowledge test</span>
              <span className={isMinimized ? "inline sm:hidden" : "hidden"}>Test</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
