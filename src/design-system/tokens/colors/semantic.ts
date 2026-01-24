import { base } from './base'
import { brand } from './brand'

export const semantic = {
  /**
   * Brand Primary - Navy
   * Your main brand color for CTAs, primary actions, and key interactive elements
   */
  brandPrimary: {
    light: brand.navy[500], // #353A56
    dark: brand.navy[400],  // #6B7399
  },

  /**
   * Brand Accent - Orange
   * Focus states, highlights, and accent interactions
   */
  brandAccent: {
    light: brand.orange[500], // #E67E22
    dark: brand.orange[400],  // #F39C52
  },

  /**
   * Brand Secondary - Teal
   * Secondary accents, decorative elements
   */
  brandSecondary: {
    light: brand.teal[400],  // #7BAEB5
    dark: brand.teal[300],   // #92C5CC
  },

  // Keep existing semantic colors for system states
  success: {
    light: base.green[600],
    dark: base.green[400],
  },
  error: {
    light: base.red[600],
    dark: base.red[400],
  },
  warning: {
    light: base.amber[600],
    dark: base.amber[400],
  },
  info: {
    light: base.green[500],
    dark: base.green[300],
  },
}
