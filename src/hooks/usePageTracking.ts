import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView, trackEvent } from '../utils/analytics'

export const usePageTracking = (pageName?: string) => {
  const location = useLocation()
  const startTimeRef = useRef<number>(0)
  const currentPageRef = useRef<string>('')

  useEffect(() => {
    const page = pageName || location.pathname
    
    // Track page view
    trackPageView(page, {
      path: location.pathname,
      search: location.search,
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
