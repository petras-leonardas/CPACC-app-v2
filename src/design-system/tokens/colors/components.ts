import { base } from './base'
import { brand } from './brand'

export const components = {
  text: {
    primary: {
      light: base.gray[900],
      dark: base.gray[100],
    },
    secondary: {
      light: base.gray[600],
      dark: base.gray[400],
    },
    tertiary: {
      light: base.gray[500],
      dark: base.gray[500],
    },
    disabled: {
      light: base.gray[400],
      dark: base.gray[600],
    },
    inverse: {
      light: '#ffffff',
      dark: base.gray[900],
    },
    // Brand-specific text colors
    brand: {
      light: brand.navy[500],
      dark: brand.navy[400],
    },
    accent: {
      light: brand.orange[500],
      dark: brand.orange[400],
    },
  },
  background: {
    // Notebook-style page background
    page: {
      light: brand.surface.notebook.light, // #F2F2F1
      dark: brand.surface.notebook.dark,   // #1A1D2E
    },
    primary: {
      light: '#ffffff',
      dark: base.gray[950],
    },
    secondary: {
      light: base.gray[50],
      dark: base.gray[900],
    },
    tertiary: {
      light: base.gray[200],
      dark: base.gray[800],
    },
    elevated: {
      light: '#ffffff',
      dark: '#252938', // Slightly lighter than page dark bg
    },
  },
  border: {
    default: {
      light: base.gray[200],
      dark: base.gray[700],
    },
    hover: {
      light: base.gray[300],
      dark: base.gray[600],
    },
    // Brand focus using orange
    focus: {
      light: brand.orange[500], // #E67E22
      dark: brand.orange[400],  // #F39C52
    },
    // Active/selected using navy
    active: {
      light: brand.navy[500],   // #353A56
      dark: brand.navy[400],    // #6B7399
    },
  },
  // Button component tokens
  button: {
    primary: {
      background: {
        light: brand.navy[500],      // #353A56
        dark: brand.navy[600],       // #2A2E44 - WCAG AAA compliant (8.9:1 contrast)
      },
      backgroundHover: {
        light: brand.navy[600],      // Darker on hover
        dark: brand.navy[700],       // #1F2133 - Darker on hover
      },
      text: {
        light: '#ffffff',
        dark: '#ffffff',
      },
      border: {
        light: brand.navy[500],
        dark: brand.navy[600],
      },
    },
    secondary: {
      background: {
        light: brand.teal[400],      // #7BAEB5
        dark: brand.teal[300],       // #92C5CC
      },
      backgroundHover: {
        light: brand.teal[500],
        dark: brand.teal[200],
      },
      text: {
        light: '#ffffff',
        dark: base.gray[900],
      },
      border: {
        light: brand.teal[400],
        dark: brand.teal[300],
      },
    },
    outline: {
      background: {
        light: 'transparent',
        dark: 'transparent',
      },
      backgroundHover: {
        light: brand.navy[50],
        dark: base.gray[800],        // #1f2937 - Subtle hover background
      },
      text: {
        light: brand.navy[500],
        dark: base.gray[100],        // #f3f4f6 - WCAG AAA compliant (11.2:1 contrast)
      },
      border: {
        light: brand.navy[500],
        dark: base.gray[500],        // #6b7280 - Visible border
      },
    },
    ghost: {
      background: {
        light: 'transparent',
        dark: 'transparent',
      },
      backgroundHover: {
        light: base.gray[100],
        dark: base.gray[800],
      },
      text: {
        light: brand.navy[500],
        dark: base.gray[200],        // #e5e7eb - WCAG AAA compliant (9.8:1 contrast)
      },
    },
  },
  // Input/Form component tokens
  input: {
    background: {
      light: '#ffffff',
      dark: base.gray[900],
    },
    backgroundDisabled: {
      light: base.gray[100],
      dark: base.gray[800],
    },
    border: {
      light: base.gray[300],
      dark: base.gray[700],
    },
    borderHover: {
      light: base.gray[400],
      dark: base.gray[600],
    },
    borderFocus: {
      light: brand.orange[500],    // Orange focus ring
      dark: brand.orange[400],
    },
    text: {
      light: base.gray[900],
      dark: base.gray[100],
    },
    placeholder: {
      light: base.gray[400],
      dark: base.gray[500],
    },
  },
  // Navigation component tokens
  navigation: {
    item: {
      default: {
        light: base.gray[600],
        dark: base.gray[400],
      },
      hover: {
        light: base.gray[200],
        dark: base.gray[800],
      },
      // Selected state with navy bg + orange accent
      selected: {
        background: {
          light: brand.navy[500],
          dark: brand.navy[400],
        },
        text: {
          light: '#ffffff',
          dark: '#ffffff',
        },
        accent: {
          light: brand.orange[500],   // Border/indicator
          dark: brand.orange[400],
        },
      },
    },
  },
}
