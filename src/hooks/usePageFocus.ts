import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Moves focus to the first <h1> inside the given container (or the
 * container itself) whenever the route path changes.  This ensures
 * screen reader users are oriented to new content after SPA navigation.
 *
 * The first render is intentionally skipped so the browser's native
 * focus handling is used on initial page load.
 */
export function usePageFocus(containerRef: React.RefObject<HTMLElement | null>) {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip the very first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Small delay lets React finish rendering the new page content
    const timer = setTimeout(() => {
      if (!containerRef.current) return

      // Try to find the main heading inside the new page
      const heading = containerRef.current.querySelector<HTMLElement>('h1')
      if (heading) {
        // Make it programmatically focusable if it isn't already
        if (!heading.hasAttribute('tabindex')) {
          heading.setAttribute('tabindex', '-1')
          heading.style.outline = 'none'
        }
        heading.focus({ preventScroll: true })
      } else {
        // Fallback: focus the container itself (the <main> element)
        containerRef.current.focus({ preventScroll: true })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [pathname, containerRef])
}
