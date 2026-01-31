import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { FeedbackModal } from './FeedbackModal'
import { trackEvent } from '../utils/analytics'
import { IconButton, Link, Logo, Button } from '../design-system'
import { MessageCircle, Menu, ChevronsLeft, ChevronsRight, Moon, Sun } from '../design-system/icons'

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
      return <ChevronsLeft size={24} />
    } else if (isHoveringToggle) {
      // When closed and hovering, show double chevron-right to indicate "expand"
      return <ChevronsRight size={24} />
    } else {
      // When closed and not hovering, show hamburger menu
      return <Menu size={24} />
    }
  }

  return (
    <header 
      role="banner" 
      aria-label="Site header"
      className="bg-surface-primary border-b border-semantic h-16 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center gap-4">
        {/* Navigation Toggle Button */}
        <div
          onMouseEnter={() => setIsHoveringToggle(true)}
          onMouseLeave={() => setIsHoveringToggle(false)}
        >
          <IconButton
            onClick={handleMenuToggle}
            variant="ghost"
            icon={getToggleIcon()}
            tooltip={isSidebarOpen ? "Collapse navigation" : "Expand navigation"}
            tooltipPosition="bottom"
            data-tracking-id="header-menu-toggle"
            aria-label="Toggle navigation menu"
          />
        </div>

        {/* Logo */}
        <Link href="/" onClick={handleLogoClick} data-tracking-id="header-logo" className="flex items-center">
          <Logo variant="full" width={90} />
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2">
        {/* Feedback Button */}
        <Button
          onClick={handleFeedbackClick}
          variant="ghost"
          size="sm"
          data-tracking-id="header-feedback"
          aria-label="Send feedback"
          leftIcon={<MessageCircle size={20} />}
          className="hidden md:inline-flex"
        >
          Send feedback
        </Button>
        <IconButton
          onClick={handleFeedbackClick}
          variant="ghost"
          size="sm"
          data-tracking-id="header-feedback-mobile"
          icon={<MessageCircle size={20} />}
          tooltip="Send feedback"
          tooltipPosition="bottom"
          aria-label="Send feedback"
          className="md:hidden"
        />

        {/* Theme Toggle */}
        <IconButton
          onClick={handleThemeToggle}
          variant="ghost"
          icon={theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
          tooltip={theme === 'light' ? 'Dark mode' : 'Light mode'}
          tooltipPosition="bottom"
          data-tracking-id="header-theme-toggle"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        />
      </div>

      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </header>
  )
}
