import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import type { Topic } from '../data/topics'

interface BreadcrumbDropdownProps {
  domainNumber: number
  domainTitle: string
  domainPath: string
  topics: Topic[]
  currentTopicId?: string
  showCurrentTopicText?: boolean
}

export function BreadcrumbDropdown({ 
  domainNumber, 
  domainTitle, 
  domainPath, 
  topics, 
  currentTopicId,
  showCurrentTopicText = true
}: BreadcrumbDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  const regularTopics = topics.filter(t => !t.id.includes('-all'))
  const testAllTopic = topics.find(t => t.id.includes('-all'))
  const currentTopic = currentTopicId ? topics.find(t => t.id === currentTopicId) : null

  const handleTestAllClick = () => {
    const testAllId = `domain-${domainNumber}-all`
    navigate(`/test/${testAllId}`, { state: { from: `/${domainPath}` } })
    setIsOpen(false)
  }

  return (
    <nav className="hidden md:block bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li className="relative">
            <div ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setIsOpen(!isOpen)
                }
              }}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded px-2 py-1 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <span>{domainTitle}</span>
              <Icon 
                name="chevron-down" 
                customSize={16} 
                className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isOpen && (
              <div className="absolute left-0 top-full mt-2 w-max max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="py-1 max-h-96 overflow-y-auto">
                  {regularTopics.map((topic) => {
                    const isCurrentTopic = topic.id === currentTopicId
                    return (
                      <div
                        key={topic.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          navigate(`/${domainPath}/${topic.id}`)
                          setIsOpen(false)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            navigate(`/${domainPath}/${topic.id}`)
                            setIsOpen(false)
                          }
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between group cursor-pointer ${
                          isCurrentTopic
                            ? 'bg-gray-50 dark:bg-gray-700/50'
                            : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {topic.subCategory && (
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex-shrink-0">
                              {topic.subCategory}
                            </span>
                          )}
                          <span className={`whitespace-nowrap ${
                            isCurrentTopic
                              ? 'text-gray-900 dark:text-gray-100 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {topic.title}
                          </span>
                        </div>
                        {isCurrentTopic && (
                          <Icon name="check" customSize={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    )
                  })}
                  
                  {testAllTopic && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          handleTestAllClick()
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      >
                        <Icon name="clipboard-list" customSize={16} className="text-gray-500 dark:text-gray-400" />
                        <span>{testAllTopic.title}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            </div>
          </li>

          {showCurrentTopicText && currentTopic && (
            <>
              <li className="text-gray-400 dark:text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </li>
              <li className="text-gray-900 dark:text-gray-100 font-medium">
                {currentTopic.title}
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  )
}
