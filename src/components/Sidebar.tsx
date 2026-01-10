import { trackEvent } from '../utils/analytics'

interface SidebarProps {
  onHomeClick: () => void
  onMockExamClick: () => void
  onDomain1Click: () => void
  onDomain2Click: () => void
  onDomain3Click: () => void
  onFeedbackClick: () => void
  isOpen: boolean
  onClose?: () => void
  isHomePage: boolean
  isMockExamPage: boolean
  isDomain1Page: boolean
  isDomain2Page: boolean
  isDomain3Page: boolean
}

export function Sidebar({ onHomeClick, onMockExamClick, onDomain1Click, onDomain2Click, onDomain3Click, onFeedbackClick, isOpen, onClose, isHomePage, isMockExamPage, isDomain1Page, isDomain2Page, isDomain3Page }: SidebarProps) {

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

  const handleLinkedInClick = () => {
    trackEvent('External Link Clicked', {
      linkText: 'LinkedIn',
      destination: 'LinkedIn',
      location: 'sidebar',
    })
  }

  const handleFeedbackClick = () => {
    trackEvent('Feedback Button Clicked', {
      location: 'sidebar',
    })
    onFeedbackClick()
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
        className={`
          w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-hidden
          transition-all duration-300 ease-in-out
          fixed lg:relative top-16 lg:top-0 left-0 bottom-0 z-50
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isOpen ? 'lg:w-72' : 'lg:w-0 lg:border-0 lg:p-0'}
        `}
      >
      <div className={`h-full overflow-y-auto p-4 flex flex-col ${!isOpen ? 'lg:hidden' : ''}`}>
      <nav>
        {/* Home Button */}
        <button
          onClick={handleHomeClick}
          data-tracking-id="sidebar-home"
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-between mb-4 ${
            isHomePage
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <span>Home</span>
        </button>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mb-4"></div>

        {/* Domain 1 Button */}
        <button
          onClick={handleDomain1Click}
          data-tracking-id="sidebar-domain-1"
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors mb-3 ${
            isDomain1Page
              ? 'bg-gray-900 dark:bg-gray-100'
              : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <div>
            <div className={`font-medium ${
              isDomain1Page
                ? 'text-white dark:text-gray-900'
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              Disabilities, challenges & assistive technologies
            </div>
            <div className={`text-xs mt-1 ${
              isDomain1Page
                ? 'text-gray-300 dark:text-gray-600'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              5 topics (A–E)
            </div>
          </div>
        </button>

        {/* Domain 2 Button */}
        <button
          onClick={handleDomain2Click}
          data-tracking-id="sidebar-domain-2"
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors mb-3 ${
            isDomain2Page
              ? 'bg-gray-900 dark:bg-gray-100'
              : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <div>
            <div className={`font-medium ${
              isDomain2Page
                ? 'text-white dark:text-gray-900'
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              Accessibility & universal design
            </div>
            <div className={`text-xs mt-1 ${
              isDomain2Page
                ? 'text-gray-300 dark:text-gray-600'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              6 topics (A–F)
            </div>
          </div>
        </button>

        {/* Domain 3 Button */}
        <button
          onClick={handleDomain3Click}
          data-tracking-id="sidebar-domain-3"
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors mb-4 ${
            isDomain3Page
              ? 'bg-gray-900 dark:bg-gray-100'
              : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <div>
            <div className={`font-medium ${
              isDomain3Page
                ? 'text-white dark:text-gray-900'
                : 'text-gray-900 dark:text-gray-100'
            }`}>
              Standards, laws & management strategies
            </div>
            <div className={`text-xs mt-1 ${
              isDomain3Page
                ? 'text-gray-300 dark:text-gray-600'
                : 'text-gray-500 dark:text-gray-400'
            }`}>
              6 topics (A–F)
            </div>
          </div>
        </button>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 mb-4"></div>

        {/* Practice Button */}
        <button
          onClick={handlePracticeClick}
          data-tracking-id="sidebar-practice"
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium flex items-center justify-between ${
            isMockExamPage
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <span>Practice</span>
        </button>

      </nav>
      
      {/* Footer - pushed to bottom */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="px-4 pb-2">
          <h3 className="text-xs font-semibold text-gray-700 dark:text-gray-400 mb-2">
            About the creator
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            Leo Bacevicius · Product Designer
          </p>
          <div className="flex items-center gap-2 text-xs">
            <a 
              href="https://www.linkedin.com/in/leobacevicius" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleLinkedInClick}
              data-tracking-id="sidebar-linkedin"
              className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <button
              onClick={handleFeedbackClick}
              data-tracking-id="sidebar-feedback"
              className="text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline transition-colors"
            >
              Send feedback
            </button>
          </div>
        </div>
      </div>
      
      </div>
    </aside>
    </>
  )
}
