import { useEffect, useRef } from 'react'
import { trackEvent } from '../utils/analytics'
import { NavigationItem } from '../design-system'

interface SidebarProps {
  onHomeClick: () => void
  onMockExamClick: () => void
  onDomain1Click: () => void
  onDomain2Click: () => void
  onDomain3Click: () => void
  onAboutClick: () => void
  isOpen: boolean
  onClose?: () => void
  isHomePage: boolean
  isMockExamPage: boolean
  isDomain1Page: boolean
  isDomain2Page: boolean
  isDomain3Page: boolean
  isAboutPage: boolean
}

export function Sidebar({ onHomeClick, onMockExamClick, onDomain1Click, onDomain2Click, onDomain3Click, onAboutClick, isOpen, onClose, isHomePage, isMockExamPage, isDomain1Page, isDomain2Page, isDomain3Page, isAboutPage }: SidebarProps) {
  const firstNavItemRef = useRef<HTMLAnchorElement>(null)

  // Handle Escape key to close sidebar on mobile
  useEffect(() => {
    if (!isOpen) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Focus first navigation item when sidebar opens on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      // Small delay to ensure element is rendered
      setTimeout(() => {
        firstNavItemRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleHomeClick = () => {
    trackEvent('Sidebar Navigation Clicked', {
      destination: 'home',
      location: 'sidebar',
    })
    onHomeClick()
  }

  const handleDomain1Click = () => {
    trackEvent('Sidebar Navigation Clicked', {
      destination: 'domain-1',
      domainTitle: 'Disabilities, challenges & assistive technologies',
      location: 'sidebar',
    })
    onDomain1Click()
  }

  const handleDomain2Click = () => {
    trackEvent('Sidebar Navigation Clicked', {
      destination: 'domain-2',
      domainTitle: 'Accessibility & universal design',
      location: 'sidebar',
    })
    onDomain2Click()
  }

  const handleDomain3Click = () => {
    trackEvent('Sidebar Navigation Clicked', {
      destination: 'domain-3',
      domainTitle: 'Standards, laws & management strategies',
      location: 'sidebar',
    })
    onDomain3Click()
  }

  const handlePracticeClick = () => {
    trackEvent('Sidebar Navigation Clicked', {
      destination: 'practice',
      location: 'sidebar',
    })
    onMockExamClick()
  }

  const handleAboutClick = () => {
    trackEvent('Sidebar Navigation Clicked', {
      destination: 'about',
      location: 'sidebar',
    })
    onAboutClick()
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40 lg:hidden top-16"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        aria-label="Site navigation"
        className={`
          w-72 bg-surface-primary border-r border-semantic overflow-hidden
          transition-all duration-300 ease-in-out
          fixed lg:relative top-16 lg:top-0 left-0 bottom-0 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isOpen ? 'lg:w-72' : 'lg:w-0 lg:border-0 lg:p-0'}
        `}
      >
      <div className={`h-full overflow-y-auto p-4 flex flex-col ${!isOpen ? 'lg:hidden' : ''}`}>
      <nav aria-label="Primary navigation" className="space-y-2">
        {/* Home */}
        <NavigationItem
          href="/"
          onClick={(e) => {
            e.preventDefault()
            handleHomeClick()
            if (firstNavItemRef.current) {
              (e.currentTarget as HTMLAnchorElement).blur()
            }
          }}
          active={isHomePage}
          data-tracking-id="sidebar-home"
        >
          Home
        </NavigationItem>

        {/* Divider */}
        <div className="border-t border-semantic my-4"></div>

        {/* Domain 1 */}
        <NavigationItem
          href="/disabilities-challenges-assistive-technology"
          onClick={(e) => {
            e.preventDefault()
            handleDomain1Click()
          }}
          active={isDomain1Page}
          subtitle="5 topics (A–E)"
          data-tracking-id="sidebar-domain-1"
        >
          Disabilities, challenges & assistive technologies
        </NavigationItem>

        {/* Domain 2 */}
        <NavigationItem
          href="/accessibility-universal-design"
          onClick={(e) => {
            e.preventDefault()
            handleDomain2Click()
          }}
          active={isDomain2Page}
          subtitle="6 topics (A–F)"
          data-tracking-id="sidebar-domain-2"
        >
          Accessibility & universal design
        </NavigationItem>

        {/* Domain 3 */}
        <NavigationItem
          href="/standards-laws-management-strategies"
          onClick={(e) => {
            e.preventDefault()
            handleDomain3Click()
          }}
          active={isDomain3Page}
          subtitle="6 topics (A–F)"
          data-tracking-id="sidebar-domain-3"
        >
          Standards, laws & management strategies
        </NavigationItem>

        {/* Divider */}
        <div className="border-t border-semantic my-4"></div>

        {/* Practice */}
        <NavigationItem
          href="/cpacc-practice-test"
          onClick={(e) => {
            e.preventDefault()
            handlePracticeClick()
          }}
          active={isMockExamPage}
          data-tracking-id="sidebar-practice"
        >
          Practice
        </NavigationItem>

      </nav>
      
      {/* About the Creator - pushed to bottom */}
      <div className="mt-auto pt-6 border-t border-semantic">
        <NavigationItem
          href="/about"
          onClick={(e) => {
            e.preventDefault()
            handleAboutClick()
          }}
          active={isAboutPage}
          data-tracking-id="sidebar-about"
        >
          About the creator
        </NavigationItem>
      </div>
      
      </div>
    </aside>
    </>
  )
}
