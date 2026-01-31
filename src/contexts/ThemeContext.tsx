/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useRef } from 'react'
import type { ReactNode } from 'react'
import { 
  generateLightModeCSSVariables, 
  generateDarkModeCSSVariables 
} from '../design-system/tokens'
import { trackInitialTheme } from '../utils/analyticsHelpers'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const hasTrackedTheme = useRef(false)
  
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  
  // Track initial theme on mount
  useEffect(() => {
    if (hasTrackedTheme.current) return
    hasTrackedTheme.current = true
    
    const savedTheme = localStorage.getItem('theme') as Theme | null
    let source: 'saved-preference' | 'system-preference' | 'default'
    
    if (savedTheme) {
      source = 'saved-preference'
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches || 
               window.matchMedia('(prefers-color-scheme: light)').matches) {
      source = 'system-preference'
    } else {
      source = 'default'
    }
    
    trackInitialTheme(theme, source)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    
    // Toggle dark class for Tailwind
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    
    // Inject CSS variables for dynamic theming
    const vars = theme === 'dark' 
      ? generateDarkModeCSSVariables()
      : generateLightModeCSSVariables()
    
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
