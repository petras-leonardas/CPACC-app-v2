import { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { cpacc_topics } from '../data/topics'

interface LayoutProps {
  questionCounts: Record<string, number>
  navigationInterceptor: ((callback: () => void) => void) | null
}

export function Layout({ questionCounts, navigationInterceptor }: LayoutProps) {
  const navigate = useNavigate()
  const { topicId } = useParams()
  const location = useLocation()
  
  // Initialize sidebar state based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth >= 1024
  })
  const [userClosedSidebar, setUserClosedSidebar] = useState(false)

  // Track previous pathname to detect transitions
  const prevPathnameRef = useRef(location.pathname)

  // Check if we're in test mode
  const isTestMode = location.pathname.startsWith('/test')

  // Close sidebar when transitioning TO test mode, reopen when leaving on desktop
  useEffect(() => {
    const wasTestMode = prevPathnameRef.current.startsWith('/test')
    const isNowTestMode = location.pathname.startsWith('/test')
    
    // Close sidebar when transitioning from non-test to test
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (!wasTestMode && isNowTestMode) {
      setIsSidebarOpen(false)
    }
    
    // Reopen sidebar when transitioning from test to non-test on desktop
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleTopicSelect = (selectedTopicId: string) => {
    // If in test mode and interceptor exists, show confirmation modal
    if (isTestMode && navigationInterceptor) {
      navigationInterceptor(() => {
        navigate(`/topics/${selectedTopicId}`)
        if (window.innerWidth < 1024) {
          setIsSidebarOpen(false)
        }
      })
    } else {
      navigate(`/topics/${selectedTopicId}`)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      }
    }
  }

  return (
    <>
      <Header onMenuClick={toggleSidebar} />
      <div className="flex h-screen overflow-hidden pt-16">
        <Sidebar
          domains={cpacc_topics}
          selectedTopicId={topicId || (location.pathname.startsWith('/topics') ? 'all-topics' : '')}
          onTopicSelect={handleTopicSelect}
          onHomeClick={handleHomeClick}
          questionCounts={questionCounts}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isHomePage={location.pathname === '/'}
        />
        <div className="flex-1 overflow-auto transition-all duration-300">
          <Outlet />
        </div>
      </div>
    </>
  )
}
