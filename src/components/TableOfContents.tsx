import { useEffect, useState, useRef, useCallback } from 'react'
import { TableOfContents as TableOfContentsDS } from '../design-system'
import { trackEvent } from '../utils/analytics'

interface TOCItem {
  id: string
  title: string
}

interface TableOfContentsProps {
  items: TOCItem[]
  topicId?: string
}

export function TableOfContents({ items, topicId }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || '')
  const [isScrolling, setIsScrolling] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Skip updates during programmatic scroll to prevent flashing
        if (isScrolling) return
        
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
  }, [items, isScrolling])

  const handleItemClick = useCallback((id: string) => {
    // Immediately set clicked item as active
    setActiveId(id)
    
    // Suspend IntersectionObserver updates during scroll
    setIsScrolling(true)
    
    const element = document.getElementById(id)
    if (element) {
      // Track TOC click
      const item = items.find(i => i.id === id)
      const scrollContainer = element.closest('.overflow-auto')
      const scrollPosition = scrollContainer ? Math.round((scrollContainer.scrollTop / scrollContainer.scrollHeight) * 100) : 0
      
      trackEvent('TOC Section Clicked', {
        sectionId: id,
        sectionTitle: item?.title || '',
        topicId: topicId || 'unknown',
        scrollPosition
      })
      
      // Find the scrolling container (the main content area in Layout)
      if (scrollContainer) {
        const elementTop = element.offsetTop
        const offset = 184 // Offset from top to account for sticky header and provide padding
        scrollContainer.scrollTo({ top: elementTop - offset, behavior: 'smooth' })
      } else {
        // Fallback to window scroll
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      
      // Re-enable observer after scroll completes
      setTimeout(() => {
        setIsScrolling(false)
      }, 800)
    } else {
      // If element not found, re-enable observer immediately
      setIsScrolling(false)
    }
  }, [items, topicId])

  // Keyboard navigation handler
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (items.length === 0) return

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => {
          const next = prev < items.length - 1 ? prev + 1 : prev
          itemRefs.current[next]?.focus()
          return next
        })
        break
      
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => {
          const next = prev > 0 ? prev - 1 : prev
          itemRefs.current[next]?.focus()
          return next
        })
        break
      
      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        itemRefs.current[0]?.focus()
        break
      
      case 'End':
        event.preventDefault()
        const lastIndex = items.length - 1
        setFocusedIndex(lastIndex)
        itemRefs.current[lastIndex]?.focus()
        break
    }
  }, [items])

  // Initialize itemRefs array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length)
  }, [items])

  if (items.length === 0) return null

  // Convert items to design system format
  const dsItems = items.map(item => ({
    id: item.id,
    label: item.title,
  }))

  return (
    <div 
      className="sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto"
      onKeyDown={handleKeyDown}
      role="navigation"
      aria-label="Table of contents with keyboard navigation"
    >
      <TableOfContentsDS
        title="On this page"
        items={dsItems}
        activeId={activeId}
        onItemClick={handleItemClick}
      />
    </div>
  )
}
