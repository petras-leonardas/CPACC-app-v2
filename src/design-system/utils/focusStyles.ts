import { components } from '../tokens'

/**
 * Shared focus ring styles for all interactive design system components.
 *
 * Uses the brand orange accent via the `--focus-ring-color` CSS variable.
 * The variable must be set on the element via inline style using `getFocusRingStyle()`.
 *
 * Two variants are provided:
 * - `focusRingClasses` — for components on card/elevated surfaces (gray-900 dark offset)
 * - `focusRingClassesOnDark` — for sidebar/navigation components on the page background (gray-950 dark offset)
 *
 * @example
 * ```tsx
 * <button
 *   className={cn(focusRingClasses, className)}
 *   style={getFocusRingStyle(isDark)}
 * >
 * ```
 */

/**
 * Canonical focus ring classes for components on card/elevated surfaces.
 * Dark mode ring offset: gray-900 (#111827)
 */
export const focusRingClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 focus-visible:ring-[var(--focus-ring-color)]'

/**
 * Focus ring classes for sidebar/navigation components on darker page surfaces.
 * Dark mode ring offset: gray-950 (#030712)
 */
export const focusRingClassesOnDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 focus-visible:ring-[var(--focus-ring-color)]'

/**
 * Returns the inline style object that sets the `--focus-ring-color` CSS variable.
 * Must be spread into the element's `style` prop alongside any other styles.
 */
export function getFocusRingStyle(isDark: boolean): Record<string, string> {
  return {
    '--focus-ring-color': isDark
      ? components.border.focus.dark   // brand.orange[400] = #F39C52
      : components.border.focus.light, // brand.orange[500] = #E67E22
  }
}
