/**
 * Layout Tokens
 * Design tokens for layout components (Container, Grid, Stack, Section)
 */

export const layout = {
  container: {
    sm: 'max-w-2xl',   // 672px - Forms, legal content
    md: 'max-w-4xl',   // 896px - Articles, privacy pages
    lg: 'max-w-6xl',   // 1152px - Default content
    xl: 'max-w-7xl',   // 1280px - Wide layouts, dashboards
    full: 'w-full',    // Edge-to-edge
  },
  padding: {
    none: '',
    sm: 'px-4',
    md: 'px-4 md:px-8',
    lg: 'px-6 md:px-12',
  },
  spacing: {
    xs: 'gap-2',   // 8px
    sm: 'gap-4',   // 16px
    md: 'gap-6',   // 24px
    lg: 'gap-8',   // 32px
    xl: 'gap-12',  // 48px
    '2xl': 'gap-16', // 64px
  },
  section: {
    padding: {
      none: 'py-0',
      sm: 'py-4 md:py-6',
      md: 'py-6 md:py-8',
      lg: 'py-8 md:py-12',
      xl: 'py-12 md:py-16',
    },
    background: {
      default: 'bg-transparent',
      subtle: 'bg-gray-50 dark:bg-gray-900',
      elevated: 'bg-white dark:bg-gray-800 shadow-sm',
      inverse: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900',
    }
  }
} as const
