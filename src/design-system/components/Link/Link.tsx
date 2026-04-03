import React from 'react'
import { cn } from '../../utils/cn'
import { components } from '../../tokens'
import { useDarkMode } from '../../hooks/useDarkMode'
import { ArrowUpRight } from '../../icons'
import { focusRingClasses } from '../../utils/focusStyles'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link content
   */
  children: React.ReactNode
  /**
   * URL to navigate to (required)
   */
  href: string
  /**
   * Opens link in new tab with security attributes
   */
  external?: boolean
  /**
   * Show an external link icon after the text.
   * Defaults to the value of `external`. Set to `false` to hide the icon
   * on external links that wrap non-text content (e.g. cards).
   */
  showExternalIcon?: boolean
  /**
   * Text decoration style
   */
  underline?: 'none' | 'hover' | 'always'
}

/**
 * Base link styles - inline element that flows with text
 */
const baseStyles = 'inline-flex items-baseline gap-1 transition-colors duration-200'

/**
 * Focus styles: shared focus ring + rounded-sm for inline text links
 */
const focusStyles = `${focusRingClasses} rounded-sm`

/**
 * Link color styles using design tokens with dark mode support
 */
const getLinkStyles = (isDark: boolean) => {
  return {
    style: {
      color: isDark 
        ? components.button.ghost.text.dark 
        : components.button.ghost.text.light,
    },
    hoverStyle: {
      color: isDark 
        ? components.button.outline.text.dark 
        : components.button.outline.text.light,
    },
    focusRingColor: isDark 
      ? components.border.focus.dark 
      : components.border.focus.light,
  }
}


/**
 * Underline styles
 */
const getUnderlineStyles = (underline: LinkProps['underline']) => {
  switch (underline) {
    case 'always':
      return 'underline'
    case 'hover':
      return 'hover:underline'
    case 'none':
      return 'no-underline'
    default:
      return 'underline' // Default: always underlined
  }
}

/**
 * Link component using CPACC Mastery design tokens
 * 
 * A simple text hyperlink that works inline with paragraphs.
 * 
 * Features:
 * - Inline text link with color from design tokens
 * - Underline (always, hover, or none)
 * - External link handling with security
 * - Same orange focus ring as Button for consistency
 * - Keyboard accessible
 * - Dark mode support
 * - External link icon (ArrowUpRight) shown automatically for external links
 * 
 * @example
 * // Simple inline link
 * <p>Read the <Link href="/docs">documentation</Link> for details.</p>
 * 
 * // External link
 * <Link href="https://example.com" external>Visit site</Link>
 * 
 * // No underline
 * <Link href="/about" underline="none">About Us</Link>
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ 
    href,
    external = false,
    showExternalIcon,
    underline = 'always',
    className, 
    children,
    ...props 
  }, ref) => {
    const shouldShowIcon = showExternalIcon ?? external
    const [isHovered, setIsHovered] = React.useState(false)
    const isDark = useDarkMode()

    const linkConfig = getLinkStyles(isDark)
    const underlineClass = getUnderlineStyles(underline)

    const combinedStyle = {
      ...linkConfig.style,
      ...(isHovered ? linkConfig.hoverStyle : {}),
    }

    // Add security attributes for external links
    const externalProps = external ? {
      target: '_blank',
      rel: 'noopener noreferrer',
    } : {}

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          baseStyles,
          focusStyles,
          underlineClass,
          className
        )}
        style={{
          ...combinedStyle,
          '--focus-ring-color': linkConfig.focusRingColor,
        } as React.CSSProperties}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...externalProps}
        {...props}
      >
        {children}
        {shouldShowIcon && (
          <>
            <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 self-center" />
            <span className="sr-only">(opens in new tab)</span>
          </>
        )}
      </a>
    )
  }
)

Link.displayName = 'Link'
