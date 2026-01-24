/**
 * SkipLink Component
 * 
 * Provides a hidden link that becomes visible on keyboard focus,
 * allowing screen reader and keyboard users to skip directly to main content.
 * 
 * WCAG 2.4.1 - Bypass Blocks (Level A)
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        absolute left-0 -top-10 z-[100]
        bg-gray-900 dark:bg-gray-100 
        text-white dark:text-gray-900
        px-4 py-2 
        font-medium text-sm
        focus:top-0 
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
      "
    >
      Skip to main content
    </a>
  )
}
