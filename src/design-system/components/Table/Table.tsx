import React from 'react'
import { cn } from '../../utils/cn'
import { useDarkMode } from '../../hooks/useDarkMode'
import { focusRingClasses, getFocusRingStyle } from '../../utils/focusStyles'

// ─── Table ───────────────────────────────────────────────────────────────────

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  /** Table content (TableHead, TableBody) */
  children: React.ReactNode
}

/**
 * Root table container with rounded corners and overflow handling.
 *
 * Wraps a semantic `<table>` in a bordered container with horizontal
 * scroll on narrow viewports.
 *
 * @example
 * <Table aria-label="Question review">
 *   <TableHead>
 *     <TableRow>
 *       <TableHeaderCell>#</TableHeaderCell>
 *       <TableHeaderCell>Status</TableHeaderCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>1</TableCell>
 *       <TableCell>Answered</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */
export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <table
          ref={ref}
          className={cn('w-full border-collapse text-left', className)}
          {...props}
        >
          {children}
        </table>
      </div>
    )
  }
)

Table.displayName = 'Table'

// ─── TableHead ───────────────────────────────────────────────────────────────

export interface TableHeadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Header rows */
  children: React.ReactNode
}

/**
 * Table header section. Renders a `<thead>` with a subtle background
 * and bottom border to separate from body rows.
 */
export const TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700',
          className
        )}
        {...props}
      >
        {children}
      </thead>
    )
  }
)

TableHead.displayName = 'TableHead'

// ─── TableBody ───────────────────────────────────────────────────────────────

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  /** Body rows */
  children: React.ReactNode
}

/**
 * Table body section. Renders a `<tbody>` with divider lines between rows.
 */
export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn('divide-y divide-gray-100 dark:divide-gray-800', className)}
        {...props}
      >
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

// ─── TableRow ────────────────────────────────────────────────────────────────

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Row content (TableCell or TableHeaderCell elements) */
  children: React.ReactNode
  /** Adds hover state and pointer cursor for clickable rows */
  interactive?: boolean
  /** Indicates this row is expanded — applies a highlight background */
  expanded?: boolean
}

/**
 * Table row with optional interactive and expanded states.
 *
 * - `interactive`: adds hover background and cursor pointer
 * - `expanded`: applies a highlight background to indicate the row is open
 *
 * For keyboard-accessible interactive rows, the consumer should add
 * `tabIndex={0}`, `role="button"`, and `onKeyDown` handlers.
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, interactive = false, expanded = false, ...props }, ref) => {
    const isDark = useDarkMode()

    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors',
          interactive && 'hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer',
          interactive && focusRingClasses,
          expanded && 'bg-gray-50 dark:bg-gray-800',
          className
        )}
        style={interactive ? getFocusRingStyle(isDark) as React.CSSProperties : undefined}
        {...props}
      >
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'

// ─── TableHeaderCell ─────────────────────────────────────────────────────────

export interface TableHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Cell content */
  children: React.ReactNode
  /** Column width preset */
  width?: 'narrow' | 'auto'
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
}

/**
 * Table header cell with consistent typography and spacing.
 * `width="narrow"` constrains the column for short content like numbers or icons.
 */
export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>(
  ({ className, children, width = 'auto', align = 'left', ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400',
          width === 'narrow' && 'w-px whitespace-nowrap',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          className
        )}
        {...props}
      >
        {children}
      </th>
    )
  }
)

TableHeaderCell.displayName = 'TableHeaderCell'

// ─── TableCell ───────────────────────────────────────────────────────────────

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Cell content */
  children: React.ReactNode
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
}

/**
 * Standard table cell with consistent padding and vertical alignment.
 */
export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, align = 'left', ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn(
          'px-4 py-3 text-sm text-gray-900 dark:text-gray-100 align-top',
          align === 'center' && 'text-center',
          align === 'right' && 'text-right',
          className
        )}
        {...props}
      >
        {children}
      </td>
    )
  }
)

TableCell.displayName = 'TableCell'
