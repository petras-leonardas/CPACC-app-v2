import { brand, base, semantic, components } from '../index'

/**
 * CSS Variable Generation for CPACC Mastery Design System
 * 
 * Converts design tokens into CSS custom properties for runtime theming.
 * Supports both light and dark modes.
 */

interface CSSVariables {
  [key: string]: string
}

/**
 * Generate CSS variables for light mode
 */
export function generateLightModeCSSVariables(): CSSVariables {
  return {
    // Brand Colors - Navy
    '--brand-navy-50': brand.navy[50],
    '--brand-navy-100': brand.navy[100],
    '--brand-navy-200': brand.navy[200],
    '--brand-navy-300': brand.navy[300],
    '--brand-navy-400': brand.navy[400],
    '--brand-navy-500': brand.navy[500],
    '--brand-navy-600': brand.navy[600],
    '--brand-navy-700': brand.navy[700],
    '--brand-navy-800': brand.navy[800],
    '--brand-navy-900': brand.navy[900],

    // Brand Colors - Orange
    '--brand-orange-50': brand.orange[50],
    '--brand-orange-100': brand.orange[100],
    '--brand-orange-200': brand.orange[200],
    '--brand-orange-300': brand.orange[300],
    '--brand-orange-400': brand.orange[400],
    '--brand-orange-500': brand.orange[500],
    '--brand-orange-600': brand.orange[600],
    '--brand-orange-700': brand.orange[700],
    '--brand-orange-800': brand.orange[800],
    '--brand-orange-900': brand.orange[900],

    // Brand Colors - Teal
    '--brand-teal-50': brand.teal[50],
    '--brand-teal-100': brand.teal[100],
    '--brand-teal-200': brand.teal[200],
    '--brand-teal-300': brand.teal[300],
    '--brand-teal-400': brand.teal[400],
    '--brand-teal-500': brand.teal[500],
    '--brand-teal-600': brand.teal[600],
    '--brand-teal-700': brand.teal[700],
    '--brand-teal-800': brand.teal[800],
    '--brand-teal-900': brand.teal[900],

    // Surface Colors
    '--surface-notebook': brand.surface.notebook.light,

    // System Colors - Gray
    '--gray-50': base.gray[50],
    '--gray-100': base.gray[100],
    '--gray-200': base.gray[200],
    '--gray-300': base.gray[300],
    '--gray-400': base.gray[400],
    '--gray-500': base.gray[500],
    '--gray-600': base.gray[600],
    '--gray-700': base.gray[700],
    '--gray-800': base.gray[800],
    '--gray-900': base.gray[900],
    '--gray-950': base.gray[950],

    // System Colors - Green
    '--green-50': base.green[50],
    '--green-100': base.green[100],
    '--green-200': base.green[200],
    '--green-300': base.green[300],
    '--green-400': base.green[400],
    '--green-500': base.green[500],
    '--green-600': base.green[600],
    '--green-700': base.green[700],
    '--green-800': base.green[800],
    '--green-900': base.green[900],
    '--green-950': base.green[950],

    // System Colors - Red
    '--red-50': base.red[50],
    '--red-100': base.red[100],
    '--red-200': base.red[200],
    '--red-300': base.red[300],
    '--red-400': base.red[400],
    '--red-500': base.red[500],
    '--red-600': base.red[600],
    '--red-700': base.red[700],
    '--red-800': base.red[800],
    '--red-900': base.red[900],
    '--red-950': base.red[950],

    // System Colors - Amber
    '--amber-50': base.amber[50],
    '--amber-100': base.amber[100],
    '--amber-200': base.amber[200],
    '--amber-300': base.amber[300],
    '--amber-400': base.amber[400],
    '--amber-500': base.amber[500],
    '--amber-600': base.amber[600],
    '--amber-700': base.amber[700],
    '--amber-800': base.amber[800],
    '--amber-900': base.amber[900],
    '--amber-950': base.amber[950],

    // Semantic Tokens - Brand
    '--color-brand-primary': semantic.brandPrimary.light,
    '--color-brand-accent': semantic.brandAccent.light,
    '--color-brand-secondary': semantic.brandSecondary.light,

    // Semantic Tokens - System States
    '--color-success': semantic.success.light,
    '--color-error': semantic.error.light,
    '--color-warning': semantic.warning.light,
    '--color-info': semantic.info.light,

    // Component Tokens - Text
    '--text-primary': components.text.primary.light,
    '--text-secondary': components.text.secondary.light,
    '--text-tertiary': components.text.tertiary.light,
    '--text-disabled': components.text.disabled.light,
    '--text-brand': components.text.brand.light,
    '--text-accent': components.text.accent.light,

    // Component Tokens - Background
    '--bg-page': components.background.page.light,
    '--bg-primary': components.background.primary.light,
    '--bg-secondary': components.background.secondary.light,
    '--bg-tertiary': components.background.tertiary.light,
    '--bg-elevated': components.background.elevated.light,

    // Component Tokens - Border
    '--border-default': components.border.default.light,
    '--border-hover': components.border.hover.light,
    '--border-focus': components.border.focus.light,
    '--border-active': components.border.active.light,

    // Component Tokens - Button Primary
    '--button-primary-bg': components.button.primary.background.light,
    '--button-primary-bg-hover': components.button.primary.backgroundHover.light,
    '--button-primary-text': components.button.primary.text.light,
    '--button-primary-border': components.button.primary.border.light,

    // Component Tokens - Button Secondary
    '--button-secondary-bg': components.button.secondary.background.light,
    '--button-secondary-bg-hover': components.button.secondary.backgroundHover.light,
    '--button-secondary-text': components.button.secondary.text.light,
    '--button-secondary-border': components.button.secondary.border.light,

    // Component Tokens - Button Outline
    '--button-outline-bg': components.button.outline.background.light,
    '--button-outline-bg-hover': components.button.outline.backgroundHover.light,
    '--button-outline-text': components.button.outline.text.light,
    '--button-outline-border': components.button.outline.border.light,

    // Component Tokens - Button Ghost
    '--button-ghost-bg': components.button.ghost.background.light,
    '--button-ghost-bg-hover': components.button.ghost.backgroundHover.light,
    '--button-ghost-text': components.button.ghost.text.light,

    // Component Tokens - Input
    '--input-bg': components.input.background.light,
    '--input-bg-disabled': components.input.backgroundDisabled.light,
    '--input-border': components.input.border.light,
    '--input-border-hover': components.input.borderHover.light,
    '--input-border-focus': components.input.borderFocus.light,
    '--input-text': components.input.text.light,
    '--input-placeholder': components.input.placeholder.light,

    // Component Tokens - Navigation
    '--nav-item-default': components.navigation.item.default.light,
    '--nav-item-hover': components.navigation.item.hover.light,
    '--nav-item-selected-bg': components.navigation.item.selected.background.light,
    '--nav-item-selected-text': components.navigation.item.selected.text.light,
    '--nav-item-selected-accent': components.navigation.item.selected.accent.light,
  }
}

/**
 * Generate CSS variables for dark mode
 */
export function generateDarkModeCSSVariables(): CSSVariables {
  return {
    // Surface Colors
    '--surface-notebook': brand.surface.notebook.dark,

    // Semantic Tokens - Brand
    '--color-brand-primary': semantic.brandPrimary.dark,
    '--color-brand-accent': semantic.brandAccent.dark,
    '--color-brand-secondary': semantic.brandSecondary.dark,

    // Semantic Tokens - System States
    '--color-success': semantic.success.dark,
    '--color-error': semantic.error.dark,
    '--color-warning': semantic.warning.dark,
    '--color-info': semantic.info.dark,

    // Component Tokens - Text
    '--text-primary': components.text.primary.dark,
    '--text-secondary': components.text.secondary.dark,
    '--text-tertiary': components.text.tertiary.dark,
    '--text-disabled': components.text.disabled.dark,
    '--text-brand': components.text.brand.dark,
    '--text-accent': components.text.accent.dark,

    // Component Tokens - Background
    '--bg-page': components.background.page.dark,
    '--bg-primary': components.background.primary.dark,
    '--bg-secondary': components.background.secondary.dark,
    '--bg-tertiary': components.background.tertiary.dark,
    '--bg-elevated': components.background.elevated.dark,

    // Component Tokens - Border
    '--border-default': components.border.default.dark,
    '--border-hover': components.border.hover.dark,
    '--border-focus': components.border.focus.dark,
    '--border-active': components.border.active.dark,

    // Component Tokens - Button Primary
    '--button-primary-bg': components.button.primary.background.dark,
    '--button-primary-bg-hover': components.button.primary.backgroundHover.dark,
    '--button-primary-text': components.button.primary.text.dark,
    '--button-primary-border': components.button.primary.border.dark,

    // Component Tokens - Button Secondary
    '--button-secondary-bg': components.button.secondary.background.dark,
    '--button-secondary-bg-hover': components.button.secondary.backgroundHover.dark,
    '--button-secondary-text': components.button.secondary.text.dark,
    '--button-secondary-border': components.button.secondary.border.dark,

    // Component Tokens - Button Outline
    '--button-outline-bg': components.button.outline.background.dark,
    '--button-outline-bg-hover': components.button.outline.backgroundHover.dark,
    '--button-outline-text': components.button.outline.text.dark,
    '--button-outline-border': components.button.outline.border.dark,

    // Component Tokens - Button Ghost
    '--button-ghost-bg': components.button.ghost.background.dark,
    '--button-ghost-bg-hover': components.button.ghost.backgroundHover.dark,
    '--button-ghost-text': components.button.ghost.text.dark,

    // Component Tokens - Input
    '--input-bg': components.input.background.dark,
    '--input-bg-disabled': components.input.backgroundDisabled.dark,
    '--input-border': components.input.border.dark,
    '--input-border-hover': components.input.borderHover.dark,
    '--input-border-focus': components.input.borderFocus.dark,
    '--input-text': components.input.text.dark,
    '--input-placeholder': components.input.placeholder.dark,

    // Component Tokens - Navigation
    '--nav-item-default': components.navigation.item.default.dark,
    '--nav-item-hover': components.navigation.item.hover.dark,
    '--nav-item-selected-bg': components.navigation.item.selected.background.dark,
    '--nav-item-selected-text': components.navigation.item.selected.text.dark,
    '--nav-item-selected-accent': components.navigation.item.selected.accent.dark,
  }
}

/**
 * Convert CSS variables object to inline style string
 * Useful for applying to a root element
 */
export function cssVariablesToString(variables: CSSVariables): string {
  return Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')
}

/**
 * Convert CSS variables object to React CSSProperties
 * Useful for applying via style prop
 */
export function cssVariablesToReactStyle(variables: CSSVariables): React.CSSProperties {
  return variables as React.CSSProperties
}

/**
 * Generate complete CSS string for both light and dark modes
 */
export function generateCompleteCSSString(): string {
  const lightVars = generateLightModeCSSVariables()
  const darkVars = generateDarkModeCSSVariables()

  const lightCSS = Object.entries(lightVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  const darkCSS = Object.entries(darkVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')

  return `:root {
${lightCSS}
}

.dark {
${darkCSS}
}
`
}
