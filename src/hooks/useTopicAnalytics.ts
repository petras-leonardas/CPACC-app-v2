import { useEffect, useRef } from 'react'
import { trackEvent } from '../utils/analytics'
import {
  trackTopicFirstView,
  incrementTopicViewCount,
  setupContentCopyTracking,
  trackPagePerformance,
  setupAccessibilityTracking,
  startStudySession,
  addTopicToSession,
  endStudySession
} from '../utils/analyticsHelpers'

interface UseTopicAnalyticsParams {
  topicId: string | undefined
  topicTitle: string
  domainNumber: number | undefined
}

/**
 * Custom hook for managing topic analytics tracking
 * Handles:
 * - First view and view count tracking
 * - Study session management
 * - Content copy tracking
 * - Page performance tracking
 * - Accessibility tracking
 * - Scroll depth tracking
 */
export function useTopicAnalytics({
  topicId,
  topicTitle,
  domainNumber
}: UseTopicAnalyticsParams) {
  const pageLoadTimeRef = useRef<number>(0)

  // Initialize page load time on mount
  useEffect(() => {
    pageLoadTimeRef.current = Date.now()
  }, [])

  // Track first topic view and start session
  useEffect(() => {
    if (topicId && topicId !== 'all-topics') {
      trackTopicFirstView(topicId, topicTitle)
      incrementTopicViewCount()
      addTopicToSession(topicId)
    }
    
    // Start study session on mount
    startStudySession()
    
    // Setup tracking utilities
    if (topicId) {
      setupContentCopyTracking(topicId)
    }
    trackPagePerformance(topicTitle)
    setupAccessibilityTracking(topicTitle)
    
    // End session on unmount
    return () => {
      endStudySession()
    }
  }, [topicId, topicTitle])

  // Scroll depth tracking
  useEffect(() => {
    const scrollContainer = document.querySelector('.flex-1.overflow-auto') as HTMLElement
    if (!scrollContainer) return
    
    const milestones = [25, 50, 75, 90, 100]
    const trackedMilestones = new Set<number>()
    
    const handleScrollDepth = () => {
      const scrollPercent = Math.round(
        (scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight)) * 100
      )
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
          trackedMilestones.add(milestone)
          trackEvent('Content Scroll Depth', {
            depth: milestone,
            topicId: topicId || 'unknown',
            topicTitle: topicTitle,
            timeToReach: Math.round((Date.now() - pageLoadTimeRef.current) / 1000),
            domainNumber: domainNumber || 0
          })
        }
      })
    }
    
    scrollContainer.addEventListener('scroll', handleScrollDepth)
    return () => scrollContainer.removeEventListener('scroll', handleScrollDepth)
  }, [topicId, topicTitle, domainNumber])
}
