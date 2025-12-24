import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  title: string
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    )

    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Find the scrolling container (the main content area in Layout)
      const scrollContainer = element.closest('.overflow-auto')
      if (scrollContainer) {
        const elementTop = element.offsetTop
        const offset = 100 // Offset from top
        scrollContainer.scrollTo({ top: elementTop - offset, behavior: 'smooth' })
      } else {
        // Fallback to window scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  if (items.length === 0) return null

  return (
    <nav className="sticky top-8 pl-8 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
        On this page
      </h3>
        <ul className="space-y-2 border-l-2 border-gray-200 dark:border-gray-800">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-1.5 text-sm transition-colors -ml-0.5 border-l-2 ${
                  activeId === item.id
                    ? 'border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 font-medium'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
    </nav>
  )
}
