/**
 * Typography Design Tokens
 * 
 * Source of truth for all typography in the CPACC application.
 * These tokens are imported by Tailwind config and documented in Storybook.
 */

export const typography = {
  /**
   * Font Family Stack
   * 
   * Uses platform-native system fonts for optimal accessibility.
   * 
   * Rationale:
   * - No font loading delay (better performance)
   * - Familiar reading experience per platform
   * - Optimal rendering (fonts designed for each OS)
   * - Accessibility tested by platform vendors
   * - WCAG compliance built-in
   * 
   * Platform-specific rendering:
   * - macOS/iOS: SF Pro (San Francisco)
   * - Windows: Segoe UI
   * - Android: Roboto
   * - Linux: Ubuntu or system default
   */
  fontFamily: {
    sans: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ],
    mono: [
      'ui-monospace',
      'SFMono-Regular',
      'SF Mono',
      'Menlo',
      'Consolas',
      'Liberation Mono',
      'monospace',
    ],
  },

  /**
   * Font Size Scale
   * 
   * Mobile-first responsive typography with desktop overrides.
   * Based on Figma design system specifications.
   */
  fontSize: {
    h1: {
      mobile: '1.75rem',      // 28px
      desktop: '2.25rem',     // 36px
      lineHeight: {
        mobile: '2.25rem',    // 36px
        desktop: '2.75rem',   // 44px
      },
      fontWeight: 700,
      usage: 'Page titles and primary headings',
    },
    h2: {
      mobile: '1.5rem',       // 24px
      desktop: '1.875rem',    // 30px
      lineHeight: {
        mobile: '2rem',       // 32px
        desktop: '2.25rem',   // 36px
      },
      fontWeight: 700,
      usage: 'Section headings',
    },
    h3: {
      mobile: '1rem',         // 16px
      desktop: '1.125rem',    // 18px
      lineHeight: {
        mobile: '1.5rem',     // 24px
        desktop: '1.625rem',  // 26px
      },
      fontWeight: 600,
      usage: 'Subsection headings and card titles',
    },
    'body-1': {
      size: '1rem',           // 16px
      lineHeight: '1.5rem',   // 24px
      fontWeight: 400,
      usage: 'Primary body text, main content',
    },
    'body-2': {
      size: '0.875rem',       // 14px
      lineHeight: '1.375rem', // 22px
      fontWeight: 400,
      usage: 'Secondary body text, supporting content',
    },
    small: {
      size: '0.75rem',        // 12px
      lineHeight: '1.25rem',  // 20px
      fontWeight: 400,
      usage: 'Labels, captions, and fine print',
    },
    'button-lg': {
      size: '0.875rem',       // 14px
      lineHeight: '1.375rem', // 22px
      fontWeight: 500,
      usage: 'Button text (large size)',
    },
  },

  /**
   * Font Weight Scale
   */
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  /**
   * Line Height Scale
   */
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
}
