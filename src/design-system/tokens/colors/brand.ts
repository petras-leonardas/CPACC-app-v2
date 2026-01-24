/**
 * Brand Color Palette
 * 
 * Core brand colors for CPACC Mastery with full scales for flexibility.
 * These colors are optimized for both light and dark modes.
 */

export const brand = {
  /**
   * Navy - Primary brand color
   * Usage: CTAs, navigation active states, logo, primary interactive elements
   * Light mode: 500
   * Dark mode: 400
   */
  navy: {
    50: '#F0F1F4',
    100: '#D9DBE3',
    200: '#B3B8C7',
    300: '#8D95AB',
    400: '#6B7399', // Dark mode primary
    500: '#353A56', // Light mode primary (original brand color)
    600: '#2A2E44',
    700: '#1F2133',
    800: '#141622',
    900: '#0A0B11',
  },

  /**
   * Orange - Accent/Focus color
   * Usage: Focus states, logo accent, navigation highlights, interactive accents
   * Light mode: 500
   * Dark mode: 400
   */
  orange: {
    50: '#FEF5ED',
    100: '#FDE4CF',
    200: '#FAC99F',
    300: '#F7AE6F',
    400: '#F39C52', // Dark mode accent
    500: '#E67E22', // Light mode accent (original brand color)
    600: '#C8631D',
    700: '#954A16',
    800: '#63320E',
    900: '#321907',
  },

  /**
   * Teal - Secondary accent color
   * Usage: Logo, decorative accents, secondary interactive elements
   * Light mode: 400
   * Dark mode: 300
   */
  teal: {
    50: '#F0F7F8',
    100: '#D9ECEF',
    200: '#B3DADF',
    300: '#92C5CC', // Dark mode secondary
    400: '#7BAEB5', // Light mode secondary (original brand color)
    500: '#5F8B91',
    600: '#4A6D72',
    700: '#364F53',
    800: '#233437',
    900: '#121A1C',
  },

  /**
   * Surface colors - Special background treatments
   */
  surface: {
    /**
     * Notebook - Main page background for study/note-taking feel
     * Light mode: Original #F2F2F1
     * Dark mode: Rich dark navy complementing brand navy
     */
    notebook: {
      light: '#F2F2F1', // Original brand background
      dark: '#0F121A',  // Even darker navy for optimal dark mode contrast
    },
  },
}
