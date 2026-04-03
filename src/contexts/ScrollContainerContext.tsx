import { createContext, useContext, useRef } from 'react'
import type { RefObject, ReactNode } from 'react'

const ScrollContainerContext = createContext<RefObject<HTMLElement | null>>({ current: null })

/**
 * Provides a ref to the main scrollable container in the Layout.
 * Use `useScrollContainer()` in child components to access it
 * instead of `document.querySelector('.flex-1.overflow-auto')`.
 */
export function ScrollContainerProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null)
  return (
    <ScrollContainerContext.Provider value={ref}>
      {children}
    </ScrollContainerContext.Provider>
  )
}

/**
 * Returns a ref to the main scroll container element.
 * The ref is set by the Layout component.
 */
export function useScrollContainer(): RefObject<HTMLElement | null> {
  return useContext(ScrollContainerContext)
}
