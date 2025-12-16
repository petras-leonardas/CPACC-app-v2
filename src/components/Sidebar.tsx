import { useState } from 'react'
import type { Domain } from '../data/topics'

interface SidebarProps {
  domains: Domain[]
  selectedTopicId: string
  onTopicSelect: (topicId: string) => void
  onHomeClick: () => void
  questionCounts: Record<string, number>
  isOpen: boolean
  onClose?: () => void
  isHomePage: boolean
}

export function Sidebar({ domains, selectedTopicId, onTopicSelect, onHomeClick, questionCounts, isOpen, onClose, isHomePage }: SidebarProps) {
  // Track which domains are expanded (by default, Domain 1 is open)
  const [expandedDomains, setExpandedDomains] = useState<Set<string>>(new Set(['domain-1']))

  const toggleDomain = (domainId: string) => {
    setExpandedDomains((prev) => {
      // If clicking the already-open domain, close it
      if (prev.has(domainId)) {
        return new Set()
      }
      // Otherwise, close all others and open this one
      return new Set([domainId])
    })
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
      <div className={`h-full overflow-y-auto p-4 ${!isOpen ? 'lg:hidden' : ''}`}>
      <nav className="space-y-2">
        {/* Home Button */}
        <button
          onClick={onHomeClick}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
            isHomePage
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Home
        </button>

        {/* All Topics Button */}
        <button
          onClick={() => onTopicSelect('all-topics')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
            selectedTopicId === 'all-topics'
              ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          All Topics
        </button>

        {/* Domain Sections */}
        {domains.map((domain) => {
          const isExpanded = expandedDomains.has(domain.id)
          
          return (
            <div key={domain.id} className="space-y-2">
              {/* Domain Header - Now Clickable */}
              <button
                onClick={() => toggleDomain(domain.id)}
                className="w-full text-left px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
              >
                <span>{domain.title}</span>
                {/* Chevron Icon */}
                <svg
                  className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Topics in this Domain - Only show when expanded */}
              {isExpanded && (
                <div className="space-y-2 pl-2">
                  {domain.topics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => onTopicSelect(topic.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm ${
                        selectedTopicId === topic.id
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-400 dark:border-gray-600'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {topic.subCategory && !topic.subCategory.includes('-ALL') && (
                        <span className="font-semibold">{topic.subCategory}: </span>
                      )}
                      {topic.title}
                      {topic.subCategory && (() => {
                        // For domain-all topics, sum all questions from that domain
                        if (topic.subCategory.includes('-ALL')) {
                          const domainPrefix = topic.subCategory.charAt(0)
                          const total = Object.keys(questionCounts)
                            .filter(key => key.startsWith(domainPrefix))
                            .reduce((sum, key) => sum + (questionCounts[key] || 0), 0)
                          return total > 0 ? <span className="ml-2 text-gray-500 dark:text-gray-400">({total})</span> : null
                        }
                        // For regular topics, show the individual count
                        return questionCounts[topic.subCategory] ? (
                          <span className="ml-2 text-gray-500 dark:text-gray-400">({questionCounts[topic.subCategory]})</span>
                        ) : null
                      })()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>
      </div>
    </aside>
    </>
  )
}
