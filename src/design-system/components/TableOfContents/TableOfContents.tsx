import { typography } from '../../tokens'
import { TableOfContentsItem } from '../TableOfContentsItem/TableOfContentsItem'

export interface TableOfContentsItem {
  /**
   * Unique identifier for the section (used for scrolling)
   */
  id: string
  /**
   * Display label for the item
   */
  label: string
}

export interface TableOfContentsProps {
  /**
   * Title for the table of contents
   * @default "On this page"
   */
  title?: string
  /**
   * List of navigation items
   */
  items: TableOfContentsItem[]
  /**
   * Currently active (visible) section ID
   */
  activeId?: string
  /**
   * Click handler for navigation items
   */
  onItemClick?: (id: string) => void
  /**
   * Additional CSS classes for the container
   */
  className?: string
}

/**
 * TableOfContents component for on-page navigation
 * 
 * Features:
 * - Displays a list of page sections for quick navigation
 * - Active state: Navy background, white text, orange left border
 * - Hover state: Light gray background on inactive items
 * - Dark mode support
 * - Sticky positioning support via className
 * - Semantic nav element with proper ARIA
 * 
 * @example
 * <TableOfContents
 *   items={[
 *     { id: 'overview', label: 'Overview' },
 *     { id: 'medical-model', label: 'Medical model' },
 *     { id: 'social-model', label: 'Social model' },
 *   ]}
 *   activeId="medical-model"
 *   onItemClick={(id) => scrollToSection(id)}
 * />
 */
export function TableOfContents({
  title = 'On this page',
  items,
  activeId,
  onItemClick,
  className = '',
}: TableOfContentsProps) {
  if (items.length === 0) return null

  return (
    <nav 
      aria-label="Table of contents"
      className={className}
    >
      {/* Title */}
      <h3 
        style={{
          fontSize: typography.fontSize.small.size,
          lineHeight: typography.fontSize.small.lineHeight,
          fontWeight: typography.fontWeight.semibold,
          marginBottom: '1rem',
        }}
        className="text-gray-900 dark:text-gray-100"
      >
        {title}
      </h3>

      {/* Navigation items */}
      <ul className="space-y-2 border-l-2 border-gray-200 dark:border-gray-800">
        {items.map((item) => (
          <li key={item.id}>
            <TableOfContentsItem
              active={activeId === item.id}
              onClick={() => onItemClick?.(item.id)}
            >
              {item.label}
            </TableOfContentsItem>
          </li>
        ))}
      </ul>
    </nav>
  )
}
