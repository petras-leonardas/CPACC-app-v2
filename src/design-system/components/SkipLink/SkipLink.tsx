import { components, brand, typography } from '../../tokens'

export interface SkipLinkProps {
  /**
   * Target ID to skip to (e.g., "#main-content")
   */
  href: string
  /**
   * Text content of the skip link
   */
  children: React.ReactNode
}

/**
 * SkipLink Component
 * 
 * Provides a hidden link that becomes visible on keyboard focus,
 * allowing screen reader and keyboard users to skip directly to content.
 * 
 * Features:
 * - WCAG 2.4.1 Level A compliant (Bypass Blocks)
 * - High contrast orange background with black text
 * - Visible only when focused (sr-only utility)
 * - Consistent styling across all skip links
 * - Design token-based colors and typography
 * - Manually focuses target to show focus indicator
 * 
 * @example
 * <SkipLink href="#main-content">Skip to main content</SkipLink>
 * 
 * @example
 * <SkipLink href="#table-of-contents">Skip to table of contents</SkipLink>
 */
export function SkipLink({ href, children }: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Get target element (remove # from href)
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      console.log('SkipLink: Found target element', targetId, targetElement)
      
      // Focus the element to show the focus ring
      targetElement.focus()
      
      // Verify focus was applied
      console.log('SkipLink: Element focused, activeElement is:', document.activeElement)
      console.log('SkipLink: Is target the active element?', document.activeElement === targetElement)
      
      // Scroll to the element
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      console.error('SkipLink: Target element not found:', targetId)
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="
        sr-only focus:not-sr-only
        focus:absolute focus:top-4 focus:left-4 focus:z-[100]
        focus:rounded-md focus:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2
        dark:focus:ring-offset-gray-950
      "
      style={{
        // Background: Brand orange for visibility and consistency
        '--skip-link-bg': brand.orange[500],
        // Text: Black for maximum contrast with orange background
        '--skip-link-text': components.text.inverse.dark,
        // Focus ring: Darker orange for contrast
        '--skip-link-ring': brand.orange[600],
        
        backgroundColor: 'var(--skip-link-bg)',
        color: 'var(--skip-link-text)',
        padding: '0.5rem 1rem',
        fontSize: typography.fontSize.small.size,
        lineHeight: typography.fontSize.small.lineHeight,
        fontWeight: typography.fontWeight.medium,
      } as React.CSSProperties}
    >
      {children}
    </a>
  )
}
