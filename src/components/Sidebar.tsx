import { useState } from 'react'
import type { Domain } from '../data/topics'

interface SidebarProps {
  domains: Domain[]
  selectedTopicId: string
  onTopicSelect: (topicId: string) => void
  questionCounts: Record<string, number>
}

export function Sidebar({ domains, selectedTopicId, onTopicSelect, questionCounts }: SidebarProps) {
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
    <aside className="w-72 bg-white border-r border-gray-200 h-screen overflow-y-auto p-4">
      <nav className="space-y-2">
        {/* All Topics Button */}
        <button
          onClick={() => onTopicSelect('all-topics')}
          className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${
            selectedTopicId === 'all-topics'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
                className="w-full text-left px-4 py-3 rounded-lg bg-white text-gray-700 border border-gray-300 font-medium hover:bg-gray-50 transition-colors flex items-center justify-between"
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
                          ? 'bg-gray-100 text-gray-900 border border-gray-400'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
                          return total > 0 ? <span className="ml-2 text-gray-500">({total})</span> : null
                        }
                        // For regular topics, show the individual count
                        return questionCounts[topic.subCategory] ? (
                          <span className="ml-2 text-gray-500">({questionCounts[topic.subCategory]})</span>
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
    </aside>
  )
}
