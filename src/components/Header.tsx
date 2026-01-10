import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FeedbackModal } from './FeedbackModal'
import { Tooltip } from './Tooltip'
import { trackEvent } from '../utils/analytics'

interface HeaderProps {
  onMenuClick?: () => void
  isSidebarOpen?: boolean
}

export function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isHoveringToggle, setIsHoveringToggle] = useState(false)

  const handleMenuToggle = () => {
    trackEvent('Navigation Toggle Clicked', {
      action: isSidebarOpen ? 'collapse' : 'expand',
      location: 'header',
    })
    onMenuClick?.()
  }

  const handleLogoClick = () => {
    trackEvent('Logo Clicked', {
      destination: 'home',
      location: 'header',
    })
  }

  const handleFeedbackClick = () => {
    trackEvent('Feedback Button Clicked', {
      location: 'header',
    })
    setIsFeedbackModalOpen(true)
  }

  const handleThemeToggle = () => {
    trackEvent('Theme Toggled', {
      from: theme,
      to: theme === 'light' ? 'dark' : 'light',
      location: 'header',
    })
    toggleTheme()
  }
  
  // Determine which icon to show based on state
  const getToggleIcon = () => {
    if (isSidebarOpen) {
      // When open, show double chevron-left to indicate "close/collapse"
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
      )
    } else if (isHoveringToggle) {
      // When closed and hovering, show double chevron-right to indicate "expand"
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
          <polyline points="13 17 18 12 13 7" />
          <polyline points="6 17 11 12 6 7" />
        </svg>
      )
    } else {
      // When closed and not hovering, show hamburger menu
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      )
    }
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        {/* Navigation Toggle Button */}
        <Tooltip content={isSidebarOpen ? "Collapse navigation" : "Expand navigation"} position="bottom">
          <button
            onClick={handleMenuToggle}
            onMouseEnter={() => setIsHoveringToggle(true)}
            onMouseLeave={() => setIsHoveringToggle(false)}
            data-tracking-id="header-menu-toggle"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-label="Toggle navigation menu"
          >
            {getToggleIcon()}
          </button>
        </Tooltip>

        {/* Logo */}
        <a href="/" onClick={handleLogoClick} data-tracking-id="header-logo" className="flex items-center">
          <img
            src={theme === 'dark' 
              ? "https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Logo%20-%20With%20title%20-%20Dark%20mode.svg"
              : "https://pub-4e395a6ee72e47c4abad0c42f00f2141.r2.dev/Logo%20-%20With%20title.svg"
            }
            alt="CPACC Mastery"
            className="h-10"
          />
        </a>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Feedback Button */}
        <button
          onClick={handleFeedbackClick}
          data-tracking-id="header-feedback"
          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 flex items-center gap-2"
          aria-label="Send feedback"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-700 dark:text-gray-300"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden md:inline">Feedback</span>
        </button>

        {/* Theme Toggle */}
        <Tooltip content={theme === 'light' ? 'Dark mode' : 'Light mode'} position="bottom">
          <button
            onClick={handleThemeToggle}
            data-tracking-id="header-theme-toggle"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
          {theme === 'light' ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 dark:text-gray-300"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700 dark:text-gray-300"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
          </button>
        </Tooltip>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </header>
  )
}
