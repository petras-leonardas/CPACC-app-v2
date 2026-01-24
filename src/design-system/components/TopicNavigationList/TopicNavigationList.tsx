import React from 'react'
import { Card } from '../Card/Card'
import { Stack } from '../Layout/Stack'
import { cn } from '../../utils/cn'

export interface TopicNavigationListProps {
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
 * 
 * @example
 * <TopicNavigationList>
 *   <TopicNavigationItem href="/topic-1">Topic 1</TopicNavigationItem>
 *   <TopicNavigationItem href="/topic-2">Topic 2</TopicNavigationItem>
 *   <TopicNavigationItem href="/topic-3">Topic 3</TopicNavigationItem>
 * </TopicNavigationList>
 */
export function TopicNavigationList({
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
      <Stack spacing="sm">
        {children}
      </Stack>
    </Card>
  )
}
