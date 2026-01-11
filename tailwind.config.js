/** @type {import('tailwindcss').Config} */
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
      
      // Custom typography scale based on Figma design system
      fontSize: {
        // Heading 1 - Page titles
        'h1': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '700' }],      // 28px/36px mobile
        'h1-desktop': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '700' }],  // 36px/44px desktop
        
        // Heading 2 - Section headings
        'h2': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],          // 24px/32px mobile
        'h2-desktop': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }], // 30px/36px desktop
        
        // Heading 3 - Subsection headings, card titles
        'h3': ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],          // 16px/24px mobile
        'h3-desktop': ['1.125rem', { lineHeight: '1.625rem', fontWeight: '600' }], // 18px/26px desktop
        
        // Body 1 - Primary body text (16px/24px)
        'body-1': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],      // 16px/24px
        
        // Body 2 - Secondary body text (14px/22px)
        'body-2': ['0.875rem', { lineHeight: '1.375rem', fontWeight: '400' }], // 14px/22px
        
        // Small text - Labels, captions (12px/20px)
        'small': ['0.75rem', { lineHeight: '1.25rem', fontWeight: '400' }],   // 12px/20px
        
        // Button large (14px/22px)
        'button-lg': ['0.875rem', { lineHeight: '1.375rem', fontWeight: '500' }], // 14px/22px medium weight
      },
    },
  },
  plugins: [
    // Custom typography utilities plugin
    function({ addUtilities }) {
      addUtilities({
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
