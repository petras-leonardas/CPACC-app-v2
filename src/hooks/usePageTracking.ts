import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView, trackEvent } from '../utils/analytics'
import { getViewportData } from '../utils/analyticsHelpers'

export const usePageTracking = (pageName?: string) => {
  const location = useLocation()
  const startTimeRef = useRef<number>(0)
  const currentPageRef = useRef<string>('')

  useEffect(() => {
    const page = pageName || location.pathname
    const viewportData = getViewportData()
    
    // Track page view with viewport data
    trackPageView(page, {
      path: location.pathname,
      search: location.search,
      ...viewportData,
    })
    
    // Set start time for new page
    startTimeRef.current = Date.now()
    currentPageRef.current = page
    
    // Cleanup: Track time spent when leaving page
    return () => {
      const endTime = Date.now()
      const durationMs = endTime - startTimeRef.current
      const durationSeconds = Math.floor(durationMs / 1000)
      
      // Only track if user spent at least 1 second (filter out immediate bounces)
      if (durationSeconds >= 1) {
        trackEvent('Page Time Spent', {
          page: currentPageRef.current,
          path: location.pathname,
          durationSeconds,
          durationMinutes: Math.round((durationSeconds / 60) * 10) / 10, // Rounded to 1 decimal
        })
      }
    }
  }, [location, pageName])
}
