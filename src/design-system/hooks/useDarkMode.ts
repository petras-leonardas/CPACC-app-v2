import { useSyncExternalStore } from 'react'

/**
 * Check if the document element has the 'dark' class.
 * Extracted for reuse as the snapshot function.
 */
function getIsDark(): boolean {
  return document.documentElement.classList.contains('dark')
}

/**
 * Subscribe to dark mode changes on the document element.
 * Uses a MutationObserver watching the class attribute.
 */
function subscribeToDarkMode(callback: () => void): () => void {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

/**
 * Hook that reactively tracks whether dark mode is active.
 *
 * Uses `useSyncExternalStore` so a single MutationObserver subscription
 * is shared across all components that call this hook within the same
 * React tree, instead of each component creating its own observer.
 *
 * @returns `true` when the `<html>` element has class `dark`, `false` otherwise
 */
export function useDarkMode(): boolean {
  return useSyncExternalStore(subscribeToDarkMode, getIsDark, getIsDark)
}
