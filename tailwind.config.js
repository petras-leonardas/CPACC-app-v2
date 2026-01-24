/** @type {import('tailwindcss').Config} */
import { typography, base, components } from './src/design-system/tokens/index'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 12-column grid system matching Figma layout
      maxWidth: {
        'container': '1280px',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      
      // Font families from design system (system fonts for accessibility)
      fontFamily: {
        sans: typography.fontFamily.sans,
        mono: typography.fontFamily.mono,
      },

      // Base colors from design system
      colors: {
        ...base,
        
        // Semantic surface colors - use these for backgrounds
        surface: {
          primary: components.background.primary.light,
          secondary: components.background.secondary.light,
          tertiary: components.background.tertiary.light,
          elevated: components.background.elevated.light,
          'primary-dark': components.background.primary.dark,
          'secondary-dark': components.background.secondary.dark,
          'tertiary-dark': components.background.tertiary.dark,
          'elevated-dark': components.background.elevated.dark,
        },
        
        // Semantic border colors - use these for borders
        'border-default': {
          DEFAULT: components.border.default.light,
          dark: components.border.default.dark,
        },
        'border-hover': {
          DEFAULT: components.border.hover.light,
          dark: components.border.hover.dark,
        },
        'border-focus': {
          DEFAULT: components.border.focus.light,
          dark: components.border.focus.dark,
        },
      },
      
      // Typography scale from design system
      // Mobile-first with desktop overrides
      fontSize: {
        // Heading 1 - Page titles
        'h1': [
          typography.fontSize.h1.mobile, 
          { 
            lineHeight: typography.fontSize.h1.lineHeight.mobile,
            fontWeight: typography.fontSize.h1.fontWeight.toString()
          }
        ],
        'h1-desktop': [
          typography.fontSize.h1.desktop,
          {
            lineHeight: typography.fontSize.h1.lineHeight.desktop,
            fontWeight: typography.fontSize.h1.fontWeight.toString()
          }
        ],
        
        // Heading 2 - Section headings
        'h2': [
          typography.fontSize.h2.mobile,
          {
            lineHeight: typography.fontSize.h2.lineHeight.mobile,
            fontWeight: typography.fontSize.h2.fontWeight.toString()
          }
        ],
        'h2-desktop': [
          typography.fontSize.h2.desktop,
          {
            lineHeight: typography.fontSize.h2.lineHeight.desktop,
            fontWeight: typography.fontSize.h2.fontWeight.toString()
          }
        ],
        
        // Heading 3 - Subsection headings, card titles
        'h3': [
          typography.fontSize.h3.mobile,
          {
            lineHeight: typography.fontSize.h3.lineHeight.mobile,
            fontWeight: typography.fontSize.h3.fontWeight.toString()
          }
        ],
        'h3-desktop': [
          typography.fontSize.h3.desktop,
          {
            lineHeight: typography.fontSize.h3.lineHeight.desktop,
            fontWeight: typography.fontSize.h3.fontWeight.toString()
          }
        ],
        
        // Body 1 - Primary body text
        'body-1': [
          typography.fontSize['body-1'].size,
          {
            lineHeight: typography.fontSize['body-1'].lineHeight,
            fontWeight: typography.fontSize['body-1'].fontWeight.toString()
          }
        ],
        
        // Body 2 - Secondary body text
        'body-2': [
          typography.fontSize['body-2'].size,
          {
            lineHeight: typography.fontSize['body-2'].lineHeight,
            fontWeight: typography.fontSize['body-2'].fontWeight.toString()
          }
        ],
        
        // Small text - Labels, captions
        'small': [
          typography.fontSize.small.size,
          {
            lineHeight: typography.fontSize.small.lineHeight,
            fontWeight: typography.fontSize.small.fontWeight.toString()
          }
        ],
        
        // Button large
        'button-lg': [
          typography.fontSize['button-lg'].size,
          {
            lineHeight: typography.fontSize['button-lg'].lineHeight,
            fontWeight: typography.fontSize['button-lg'].fontWeight.toString()
          }
        ],
      },
    },
  },
  plugins: [
    // Custom utilities plugin for typography and semantic colors
    function({ addUtilities }) {
      addUtilities({
        // Semantic surface backgrounds - auto dark mode
        '.bg-surface-primary': {
          backgroundColor: components.background.primary.light,
        },
        '.dark .bg-surface-primary': {
          backgroundColor: components.background.primary.dark,
        },
        '.bg-surface-secondary': {
          backgroundColor: components.background.secondary.light,
        },
        '.dark .bg-surface-secondary': {
          backgroundColor: components.background.secondary.dark,
        },
        '.bg-surface-tertiary': {
          backgroundColor: components.background.tertiary.light,
        },
        '.dark .bg-surface-tertiary': {
          backgroundColor: components.background.tertiary.dark,
        },
        '.bg-surface-elevated': {
          backgroundColor: components.background.elevated.light,
        },
        '.dark .bg-surface-elevated': {
          backgroundColor: components.background.elevated.dark,
        },
        
        // Semantic borders - auto dark mode
        '.border-semantic': {
          borderColor: components.border.default.light,
        },
        '.dark .border-semantic': {
          borderColor: components.border.default.dark,
        },
        '.border-semantic-hover': {
          borderColor: components.border.hover.light,
        },
        '.dark .border-semantic-hover': {
          borderColor: components.border.hover.dark,
        },
        
        // Heading 1 - Page titles
        '.cpacc-heading-1': {
          '@apply text-h1 md:text-h1-desktop text-gray-900 dark:text-gray-100': {},
        },
        
        // Heading 2 - Section headings
        '.cpacc-heading-2': {
          '@apply text-h2 md:text-h2-desktop text-gray-900 dark:text-gray-100': {},
        },
        
        // Heading 3 - Subsection headings, card titles
        '.cpacc-heading-3': {
          '@apply text-h3 md:text-h3-desktop text-gray-900 dark:text-gray-100': {},
        },
        
        // Body 1 - Regular (16px/24px)
        '.cpacc-body-1': {
          '@apply text-body-1 text-gray-600 dark:text-gray-400': {},
        },
        
        // Body 1 - Bold variant
        '.cpacc-body-1-bold': {
          '@apply text-body-1 font-bold text-gray-900 dark:text-gray-100': {},
        },
        
        // Body 1 - Link variant
        '.cpacc-body-1-link': {
          '@apply text-body-1 text-gray-600 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-gray-100': {},
        },
        
        // Body 2 - Regular (14px/22px)
        '.cpacc-body-2': {
          '@apply text-body-2 text-gray-600 dark:text-gray-400': {},
        },
        
        // Body 2 - Bold variant
        '.cpacc-body-2-bold': {
          '@apply text-body-2 font-bold text-gray-900 dark:text-gray-100': {},
        },
        
        // Body 2 - Link variant
        '.cpacc-body-2-link': {
          '@apply text-body-2 text-gray-600 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-gray-100': {},
        },
        
        // Small text - Regular (12px/20px)
        '.cpacc-text-small': {
          '@apply text-small text-gray-500 dark:text-gray-400': {},
        },
        
        // Small text - Link variant
        '.cpacc-text-small-link': {
          '@apply text-small text-gray-500 dark:text-gray-400 underline hover:text-gray-700 dark:hover:text-gray-300': {},
        },
        
        // Button large (14px/22px)
        '.cpacc-btn-text-lg': {
          '@apply text-button-lg text-gray-900 dark:text-gray-100': {},
        },
      })
    }
  ],
}
