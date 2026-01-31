import React from 'react'
import { Card } from '../Card/Card'
import { Stack } from '../Layout/Stack'
import { Heading } from '../Heading/Heading'
import { cn } from '../../utils/cn'

export interface TopicNavigationListProps {
  /**
   * Optional title displayed at the top of the card
   */
  title?: string
  /**
   * Navigation items (typically TopicNavigationItem components)
   */
  children: React.ReactNode
  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * TopicNavigationList component - Container for topic navigation items
 * 
 * Built on Card component with navigation-specific styling:
 * - Thicker border (border-2) for visual prominence
 * - More padding (p-6) for comfortable list spacing
 * - Stack for consistent item spacing
 * - Inherits Card's dark mode background (black) for consistency
 * - Optional title prop for card heading
 * 
 * @example
 * // Without title
 * <TopicNavigationList>
 *   <TopicNavigationItem href="/topic-1">Topic 1</TopicNavigationItem>
 *   <TopicNavigationItem href="/topic-2">Topic 2</TopicNavigationItem>
 * </TopicNavigationList>
 * 
 * @example
 * // With title
 * <TopicNavigationList title="Disabilities, Challenges & Assistive Technologies">
 *   <TopicNavigationItem href="/topic-1">Topic 1</TopicNavigationItem>
 *   <TopicNavigationItem href="/topic-2">Topic 2</TopicNavigationItem>
 * </TopicNavigationList>
 */
export function TopicNavigationList({
  title,
  children,
  className = '',
}: TopicNavigationListProps) {
  return (
    <Card 
      className={cn(
        'border-2 p-6',
        className
      )}
    >
      {title && (
        <Heading as="h3" className="mb-4">
          {title}
        </Heading>
      )}
      <Stack spacing="xs">
        {children}
      </Stack>
    </Card>
  )
}
