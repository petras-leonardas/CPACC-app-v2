import { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { FeedbackModal } from './FeedbackModal'
import { Footer } from './Footer'
import { useScrollContainer } from '../contexts/ScrollContainerContext'

interface LayoutProps {
  navigationInterceptor: ((callback: () => void) => void) | null
}

export function Layout({ navigationInterceptor }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Initialize sidebar state based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 1024
  })
  const [userClosedSidebar, setUserClosedSidebar] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  // Ref to the main content container (shared via context)
  const scrollContainerRef = useScrollContainer()
  // Callback ref to set both the scroll container context ref and local usage
  const mainContentRef = useCallback((node: HTMLDivElement | null) => {
    (scrollContainerRef as React.MutableRefObject<HTMLElement | null>).current = node
  }, [scrollContainerRef])

  // Check if we're in test mode
  const isTestMode = location.pathname.startsWith('/test')
  
  // Scroll to top on route change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, scrollContainerRef])


  // Handle responsive behavior on resize
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024
      
      if (isDesktop && !userClosedSidebar && !isTestMode) {
        setIsSidebarOpen(true)
      } else if (!isDesktop && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen, userClosedSidebar, isTestMode])

  const toggleSidebar = () => {
    const newState = !isSidebarOpen
    setIsSidebarOpen(newState)
    if (!newState && window.innerWidth >= 1024) {
      setUserClosedSidebar(true)
    } else if (newState) {
      setUserClosedSidebar(false)
    }
  }

  const createNavHandler = (path: string) => () => {
    const doNavigate = () => {
      navigate(path)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
    if (isTestMode && navigationInterceptor) {
      navigationInterceptor(doNavigate)
    } else {
      doNavigate()
    }
  }

  const handleHomeClick = createNavHandler('/')
  const handleMockExamClick = createNavHandler('/cpacc-practice-test')
  const handleDomain1Click = createNavHandler('/disabilities-challenges-assistive-technology')
  const handleDomain2Click = createNavHandler('/accessibility-universal-design')
  const handleDomain3Click = createNavHandler('/standards-laws-management-strategies')
  const handleAboutClick = createNavHandler('/about')


  return (
    <>
      {/* Screen reader announcements */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isSidebarOpen ? 'Navigation menu opened' : ''}
      </div>
      
      {!isTestMode && <Header onMenuClick={toggleSidebar} onFeedbackClick={() => setIsFeedbackModalOpen(true)} isSidebarOpen={isSidebarOpen} />}
      <div className={`flex h-screen overflow-hidden ${isTestMode ? '' : 'pt-16'}`}>
        {!isTestMode && <Sidebar
          onHomeClick={handleHomeClick}
          onMockExamClick={handleMockExamClick}
          onDomain1Click={handleDomain1Click}
          onDomain2Click={handleDomain2Click}
          onDomain3Click={handleDomain3Click}
          onAboutClick={handleAboutClick}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isHomePage={location.pathname === '/'}
          isMockExamPage={location.pathname === '/cpacc-practice-test'}
          isDomain1Page={location.pathname.startsWith('/disabilities-challenges-assistive-technology')}
          isDomain2Page={location.pathname.startsWith('/accessibility-universal-design')}
          isDomain3Page={location.pathname.startsWith('/standards-laws-management-strategies')}
          isAboutPage={location.pathname === '/about'}
        />}
        <main 
          id="main-content" 
          ref={mainContentRef} 
          className="flex-1 overflow-auto transition-all duration-300 [scrollbar-gutter:stable]"
          onFocus={(e) => {
            e.currentTarget.style.outline = '3px solid #F39C52'
            e.currentTarget.style.outlineOffset = '0px'
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none'
            e.currentTarget.style.outlineOffset = '0px'
          }}
          aria-label="Main content"
          tabIndex={-1}
        >
          <div className="flex flex-col min-h-full">
            <div className="flex-1">
              <Outlet />
            </div>
            {!isTestMode && <Footer />}
          </div>
        </main>
      </div>
      
      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </>
  )
}
