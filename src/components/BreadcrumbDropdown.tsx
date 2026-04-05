import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from './Icon'
import { ChevronRight } from '../design-system/icons'
import type { Topic } from '../data/topics'
import { focusRingClasses, getFocusRingStyle } from '../design-system/utils/focusStyles'
import { useDarkMode } from '../design-system/hooks/useDarkMode'

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
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuItemsRef = useRef<(HTMLElement | null)[]>([])
  const navigate = useNavigate()
  const isDark = useDarkMode()

  const regularTopics = topics.filter(t => !t.id.includes('-all'))
  const testAllTopic = topics.find(t => t.id.includes('-all'))
  const currentTopic = currentTopicId ? topics.find(t => t.id === currentTopicId) : null

  // Total menu item count: 1 (domain overview) + topics + optional test-all
  const totalItems = 1 + regularTopics.length + (testAllTopic ? 1 : 0)

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
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Focus the active menu item when focusedIndex changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && menuItemsRef.current[focusedIndex]) {
      menuItemsRef.current[focusedIndex]?.focus()
    }
  }, [isOpen, focusedIndex])

  // Reset focus index when closing
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
    }
  }, [isOpen])

  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => (prev + 1) % totalItems)
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => (prev - 1 + totalItems) % totalItems)
        break
      case 'Tab':
        if (e.shiftKey) {
          // Shift+Tab on first item: close menu, return focus to trigger
          if (focusedIndex <= 0) {
            e.preventDefault()
            setIsOpen(false)
            triggerRef.current?.focus()
          } else {
            // Move to previous item
            e.preventDefault()
            setFocusedIndex(prev => prev - 1)
          }
        } else {
          // Tab on last item: close menu, let focus move naturally
          if (focusedIndex >= totalItems - 1) {
            setIsOpen(false)
          } else {
            // Move to next item
            e.preventDefault()
            setFocusedIndex(prev => prev + 1)
          }
        }
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(totalItems - 1)
        break
    }
  }, [totalItems, focusedIndex])

  const handleTestAllClick = () => {
    const testAllId = `domain-${domainNumber}-all`
    navigate(`/test/${testAllId}`, { state: { from: `/${domainPath}` } })
    setIsOpen(false)
  }

  const setMenuItemRef = (index: number) => (el: HTMLElement | null) => {
    menuItemsRef.current[index] = el
  }

  const focusRingStyle = getFocusRingStyle(isDark)

  return (
    <nav className="hidden md:block bg-white dark:bg-gray-900" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li className="relative">
            <div ref={dropdownRef}>
            <button
              ref={triggerRef}
              type="button"
              onClick={() => {
                const willOpen = !isOpen
                setIsOpen(willOpen)
                if (willOpen) {
                  setFocusedIndex(0)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setIsOpen(true)
                  setFocusedIndex(0)
                }
              }}
              className={`flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded px-2 py-1 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 ${focusRingClasses}`}
              style={focusRingStyle}
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
              <div
                role="menu"
                aria-label={`${domainTitle} topics`}
                onKeyDown={handleMenuKeyDown}
                className="absolute left-0 top-full mt-2 w-max max-w-[min(42rem,calc(100vw-2rem))] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
              >
                <div className="py-1 max-h-96 overflow-y-auto">
                  {/* Domain Overview Link */}
                  <button
                    ref={setMenuItemRef(0)}
                    type="button"
                    role="menuitem"
                    tabIndex={focusedIndex === 0 ? 0 : -1}
                    onClick={() => {
                      navigate(`/${domainPath}`)
                      setIsOpen(false)
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer font-medium text-gray-900 dark:text-gray-100 ${focusRingClasses}`}
                    style={focusRingStyle}
                  >
                    {domainTitle}
                  </button>
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1" role="separator" />
                  
                  {regularTopics.map((topic, index) => {
                    const isCurrentTopic = topic.id === currentTopicId
                    const menuIndex = index + 1
                    return (
                      <button
                        key={topic.id}
                        ref={setMenuItemRef(menuIndex)}
                        type="button"
                        role="menuitem"
                        tabIndex={focusedIndex === menuIndex ? 0 : -1}
                        onClick={() => {
                          navigate(`/${domainPath}/${topic.id}`)
                          setIsOpen(false)
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between group cursor-pointer ${focusRingClasses} ${
                          isCurrentTopic
                            ? 'bg-gray-50 dark:bg-gray-700/50'
                            : ''
                        }`}
                        style={focusRingStyle}
                        aria-current={isCurrentTopic ? 'true' : undefined}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className={`whitespace-nowrap ${
                            isCurrentTopic
                              ? 'text-gray-900 dark:text-gray-100 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {topic.subCategory && `${topic.subCategory}. `}{topic.title}
                          </span>
                        </div>
                        {isCurrentTopic && (
                          <Icon name="check" customSize={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    )
                  })}
                  
                  {testAllTopic && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1" role="separator" />
                      <button
                        ref={setMenuItemRef(1 + regularTopics.length)}
                        type="button"
                        role="menuitem"
                        tabIndex={focusedIndex === 1 + regularTopics.length ? 0 : -1}
                        onClick={(e) => {
                          e.preventDefault()
                          handleTestAllClick()
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${focusRingClasses}`}
                        style={focusRingStyle}
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
                <ChevronRight size={16} aria-hidden="true" />
              </li>
              <li className="text-gray-900 dark:text-gray-100 font-medium">
                {currentTopic.subCategory && (
                  <span>{currentTopic.subCategory}. </span>
                )}
                {currentTopic.title}
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  )
}
