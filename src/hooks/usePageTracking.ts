import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '../utils/analytics'

export const usePageTracking = (pageName?: string) => {
  const location = useLocation()

  useEffect(() => {
    const page = pageName || location.pathname
    trackPageView(page, {
      path: location.pathname,
      search: location.search,
    })
  }, [location, pageName])
}
