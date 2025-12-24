import { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { FeedbackModal } from './FeedbackModal'

interface LayoutProps {
  questionCounts: Record<string, number>
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

  // Track previous pathname to detect transitions
  const prevPathnameRef = useRef(location.pathname)
  
  // Ref to the main content container
  const mainContentRef = useRef<HTMLDivElement>(null)

  // Check if we're in test mode
  const isTestMode = location.pathname.startsWith('/test')
  
  // Scroll to top on route change
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0)
    }
  }, [location.pathname])

  // Close sidebar when transitioning TO test mode, reopen when leaving on desktop
  useEffect(() => {
    const wasTestMode = prevPathnameRef.current.startsWith('/test')
    const isNowTestMode = location.pathname.startsWith('/test')
    
    // Close sidebar when transitioning from non-test to test
    if (!wasTestMode && isNowTestMode) {
      setIsSidebarOpen(false)
    }
    
    // Reopen sidebar when transitioning from test to non-test on desktop
    if (wasTestMode && !isNowTestMode && window.innerWidth >= 1024) {
      setIsSidebarOpen(true)
      setUserClosedSidebar(false)
    }
    
    // Update the ref for next time
    prevPathnameRef.current = location.pathname
  }, [location.pathname])

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

  const handleHomeClick = () => {
    if (isTestMode && navigationInterceptor) {
      navigationInterceptor(() => {
        navigate('/')
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false)
        }
      })
    } else {
      navigate('/')
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
  }

  const handleMockExamClick = () => {
    if (isTestMode && navigationInterceptor) {
      navigationInterceptor(() => {
        navigate('/mock-exam')
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false)
        }
      })
    } else {
      navigate('/mock-exam')
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
  }

  const handleDomain1Click = () => {
    if (isTestMode && navigationInterceptor) {
      navigationInterceptor(() => {
        navigate('/domain-1')
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false)
        }
      })
    } else {
      navigate('/domain-1')
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
  }

  const handleDomain2Click = () => {
    if (isTestMode && navigationInterceptor) {
      navigationInterceptor(() => {
        navigate('/domain-2')
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false)
        }
      })
    } else {
      navigate('/domain-2')
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
  }

  const handleDomain3Click = () => {
    if (isTestMode && navigationInterceptor) {
      navigationInterceptor(() => {
        navigate('/domain-3')
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false)
        }
      })
    } else {
      navigate('/domain-3')
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
  }


  return (
    <>
      <Header onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex h-screen overflow-hidden pt-16">
        <Sidebar
          onHomeClick={handleHomeClick}
          onMockExamClick={handleMockExamClick}
          onDomain1Click={handleDomain1Click}
          onDomain2Click={handleDomain2Click}
          onDomain3Click={handleDomain3Click}
          onFeedbackClick={() => setIsFeedbackModalOpen(true)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isHomePage={location.pathname === '/'}
          isMockExamPage={location.pathname === '/mock-exam'}
          isDomain1Page={location.pathname.startsWith('/domain-1')}
          isDomain2Page={location.pathname.startsWith('/domain-2')}
          isDomain3Page={location.pathname.startsWith('/domain-3')}
        />
        <div ref={mainContentRef} className="flex-1 overflow-auto transition-all duration-300">
          <Outlet />
        </div>
      </div>
      
      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </>
  )
}
