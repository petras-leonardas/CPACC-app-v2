import { cn } from '../../utils/cn'
import { components } from '../../tokens'
import { focusRingClasses } from '../../utils/focusStyles'

/**
 * Shared styles, variant logic, and components used by both Button and IconButton.
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/**
 * Focus styles using brand orange accent.
 * Ring color is applied via inline style using --focus-ring-color CSS variable.
 * @deprecated Import `focusRingClasses` from '../../utils/focusStyles' directly.
 */
export const focusStyles = focusRingClasses

/**
 * Disabled styles
 */
export const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

/**
 * Return value from getVariantStyles
 */
export interface VariantConfig {
  className: string
  style: Record<string, string>
  hoverStyle: Record<string, string>
  focusRingColor: string
}

/**
 * Variant styles using brand color tokens with dark mode support.
 * Shared between Button and IconButton.
 */
export function getVariantStyles(variant: ButtonVariant | undefined, isDark: boolean): VariantConfig {
  switch (variant) {
    case 'primary':
      return {
        className: 'shadow-sm',
        style: {
          backgroundColor: isDark 
            ? components.button.primary.background.dark 
            : components.button.primary.background.light,
          color: isDark 
            ? components.button.primary.text.dark 
            : components.button.primary.text.light,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: isDark 
            ? components.button.primary.border.dark 
            : components.button.primary.border.light,
        },
        hoverStyle: {
          backgroundColor: isDark 
            ? components.button.primary.backgroundHover.dark 
            : components.button.primary.backgroundHover.light,
        },
        focusRingColor: isDark 
          ? components.border.focus.dark 
          : components.border.focus.light,
      }
    case 'secondary':
      return {
        className: '',
        style: {
          backgroundColor: isDark 
            ? components.button.outline.background.dark 
            : components.button.outline.background.light,
          color: isDark 
            ? components.button.outline.text.dark 
            : components.button.outline.text.light,
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: isDark 
            ? components.button.outline.border.dark 
            : components.button.outline.border.light,
        },
        hoverStyle: {
          backgroundColor: isDark 
            ? components.button.outline.backgroundHover.dark 
            : components.button.outline.backgroundHover.light,
        },
        focusRingColor: isDark 
          ? components.border.focus.dark 
          : components.border.focus.light,
      }
    case 'ghost':
      return {
        className: '',
        style: {
          backgroundColor: isDark 
            ? components.button.ghost.background.dark 
            : components.button.ghost.background.light,
          color: isDark 
            ? components.button.ghost.text.dark 
            : components.button.ghost.text.light,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'transparent',
        },
        hoverStyle: {
          backgroundColor: isDark 
            ? components.button.ghost.backgroundHover.dark 
            : components.button.ghost.backgroundHover.light,
        },
        focusRingColor: isDark 
          ? components.border.focus.dark 
          : components.border.focus.light,
      }
    default:
      return getVariantStyles('primary', isDark)
  }
}

/**
 * Loading spinner SVG. Sizes are parameterized per consumer.
 */
export function LoadingSpinner({ sizeClass }: { sizeClass: string }) {
  return (
    <svg
      className={cn('animate-spin', sizeClass)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

/**
 * Spinner size class lookup for Button (text buttons)
 */
export const buttonSpinnerSizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

/**
 * Spinner size class lookup for IconButton (icon-only buttons)
 */
export const iconButtonSpinnerSizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}
