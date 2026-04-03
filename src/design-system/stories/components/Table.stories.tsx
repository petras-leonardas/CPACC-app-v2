import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '../../components/Table/Table'
import { Badge } from '../../components/Badge/Badge'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A compound table component built on semantic \`<table>\` HTML with consistent
styling, dark mode support, and accessible structure.

**Sub-components:**
- \`Table\` — Root wrapper with rounded border and overflow scroll
- \`TableHead\` — Header section with background
- \`TableBody\` — Body with row dividers
- \`TableRow\` — Row with optional \`interactive\` and \`expanded\` states
- \`TableHeaderCell\` — Column header with \`width\` and \`align\` props
- \`TableCell\` — Standard cell with \`align\` and \`colSpan\` props

**Expandable rows:** Handled by the consumer, not the component.
Render a second \`<TableRow>\` with a \`<TableCell colSpan={...}>\` for expanded content.

**Usage:**
\`\`\`tsx
<Table aria-label="Results">
  <TableHead>
    <TableRow>
      <TableHeaderCell width="narrow">#</TableHeaderCell>
      <TableHeaderCell>Name</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>Item</TableCell>
    </TableRow>
  </TableBody>
</Table>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

// ─── Basic ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Table aria-label="Sample data">
      <TableHead>
        <TableRow>
          <TableHeaderCell width="narrow">#</TableHeaderCell>
          <TableHeaderCell>Topic</TableHeaderCell>
          <TableHeaderCell width="narrow" align="right">Questions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Theoretical Models of Disability</TableCell>
          <TableCell align="right">15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>Categories and Characteristics of Disabilities</TableCell>
          <TableCell align="right">20</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>Assistive Technologies and Adaptive Strategies</TableCell>
          <TableCell align="right">18</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// ─── Interactive Rows ────────────────────────────────────────────────────────

export const InteractiveRows: Story = {
  render: () => (
    <Table aria-label="Question review">
      <TableHead>
        <TableRow>
          <TableHeaderCell width="narrow">#</TableHeaderCell>
          <TableHeaderCell width="narrow">Status</TableHeaderCell>
          <TableHeaderCell>Question</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow interactive onClick={() => alert('Review question 1')}>
          <TableCell>1</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" size="sm">Answered</Badge>
          </TableCell>
          <TableCell>Which model views disability as a result of societal barriers?</TableCell>
        </TableRow>
        <TableRow interactive onClick={() => alert('Review question 2')}>
          <TableCell>2</TableCell>
          <TableCell>
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300" size="sm">Skipped</Badge>
          </TableCell>
          <TableCell>What is the primary purpose of Section 508?</TableCell>
        </TableRow>
        <TableRow interactive onClick={() => alert('Review question 3')}>
          <TableCell>3</TableCell>
          <TableCell>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" size="sm">Answered</Badge>
          </TableCell>
          <TableCell>Which principle of universal design addresses "simple and intuitive use"?</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// ─── Expandable Rows ─────────────────────────────────────────────────────────

function ExpandableExample() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]))

  const toggle = (index: number) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  const questions = [
    { num: 1, correct: true, text: 'Which model views disability as a deficiency within the individual?', answer: 'Medical Model', correctAnswer: 'Medical Model', explanation: 'The medical model focuses on the individual\'s impairment as the primary issue.' },
    { num: 2, correct: false, text: 'What is the primary focus of WCAG 2.1?', answer: 'Physical accessibility', correctAnswer: 'Web content accessibility', explanation: 'WCAG (Web Content Accessibility Guidelines) specifically addresses digital content accessibility.' },
    { num: 3, correct: true, text: 'Which assistive technology converts text to speech?', answer: 'Screen reader', correctAnswer: 'Screen reader', explanation: 'Screen readers are assistive technologies that read digital text aloud.' },
  ]

  return (
    <Table aria-label="Test results">
      <TableHead>
        <TableRow>
          <TableHeaderCell width="narrow">Result</TableHeaderCell>
          <TableHeaderCell width="narrow">#</TableHeaderCell>
          <TableHeaderCell>Question</TableHeaderCell>
          <TableHeaderCell width="narrow">{''}</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {questions.map((q) => (
          <>
            <TableRow
              key={q.num}
              interactive
              expanded={expanded.has(q.num)}
              onClick={() => toggle(q.num)}
              aria-expanded={expanded.has(q.num)}
            >
              <TableCell>
                {q.correct ? (
                  <span className="inline-flex w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 3.5L5.5 9.5L2.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400" /></svg>
                  </span>
                ) : (
                  <span className="inline-flex w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400" /></svg>
                  </span>
                )}
              </TableCell>
              <TableCell>{q.num}</TableCell>
              <TableCell>{q.text}</TableCell>
              <TableCell>
                <svg
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                  className={`text-gray-400 transition-transform duration-200 ${expanded.has(q.num) ? 'rotate-180' : ''}`}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </TableCell>
            </TableRow>
            {expanded.has(q.num) && (
              <TableRow key={`${q.num}-detail`}>
                <TableCell colSpan={4} className="bg-gray-50 dark:bg-gray-800 px-6 py-4">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">Your answer: </span>
                      <span className={q.correct ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>{q.answer}</span>
                    </div>
                    {!q.correct && (
                      <div>
                        <span className="font-medium text-gray-500 dark:text-gray-400">Correct answer: </span>
                        <span className="text-green-700 dark:text-green-400">{q.correctAnswer}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-500 dark:text-gray-400">Explanation: </span>
                      <span className="text-gray-700 dark:text-gray-300">{q.explanation}</span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  )
}

export const ExpandableRows: Story = {
  render: () => <ExpandableExample />,
}

// ─── Empty State ─────────────────────────────────────────────────────────────

export const EmptyState: Story = {
  render: () => (
    <Table aria-label="Empty table">
      <TableHead>
        <TableRow>
          <TableHeaderCell>#</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} align="center" className="py-8 text-gray-500 dark:text-gray-400">
            No items to display
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
