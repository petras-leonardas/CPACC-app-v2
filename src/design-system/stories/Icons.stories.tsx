import type { Meta, StoryObj } from '@storybook/react'
import * as Icons from '../icons'

const meta: Meta = {
  title: 'Design tokens/Icons',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const AllIcons: Story = {
  render: () => {
    const iconGroups = {
      'Audio/Media Controls': [
        { name: 'Headphones', Component: Icons.Headphones },
        { name: 'SkipBack', Component: Icons.SkipBack },
        { name: 'Play', Component: Icons.Play },
        { name: 'Pause', Component: Icons.Pause },
        { name: 'SkipForward', Component: Icons.SkipForward },
        { name: 'Square', Component: Icons.Square },
      ],
      'Navigation': [
        { name: 'ArrowLeft', Component: Icons.ArrowLeft },
        { name: 'ArrowUp', Component: Icons.ArrowUp },
        { name: 'ArrowUpRight', Component: Icons.ArrowUpRight },
        { name: 'ChevronLeft', Component: Icons.ChevronLeft },
        { name: 'ChevronRight', Component: Icons.ChevronRight },
        { name: 'ChevronDown', Component: Icons.ChevronDown },
        { name: 'ChevronsLeft', Component: Icons.ChevronsLeft },
        { name: 'ChevronsRight', Component: Icons.ChevronsRight },
        { name: 'Menu', Component: Icons.Menu },
      ],
      'Content/UI': [
        { name: 'Layers', Component: Icons.Layers },
        { name: 'BookOpen', Component: Icons.BookOpen },
        { name: 'Eye', Component: Icons.Eye },
        { name: 'Settings', Component: Icons.Settings },
        { name: 'Check', Component: Icons.Check },
        { name: 'ClipboardCheck', Component: Icons.ClipboardCheck },
        { name: 'ClipboardList', Component: Icons.ClipboardList },
        { name: 'Lightbulb', Component: Icons.Lightbulb },
        { name: 'Sparkles', Component: Icons.Sparkles },
        { name: 'MessageCircle', Component: Icons.MessageCircle },
        { name: 'Moon', Component: Icons.Moon },
        { name: 'Sun', Component: Icons.Sun },
        { name: 'Heart', Component: Icons.Heart },
        { name: 'Share2', Component: Icons.Share2 },
        { name: 'MoreVertical', Component: Icons.MoreVertical },
        { name: 'X', Component: Icons.X },
        { name: 'Plus', Component: Icons.Plus },
      ],
    }

    return (
      <div className="space-y-12 p-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Icon System
          </h1>
          <div className="prose dark:prose-invert max-w-3xl">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Curated set of Lucide icons used in CPACC Mastery. All icons are re-exported from the design system 
              for centralized control while maintaining tree-shaking benefits.
            </p>
          </div>
        </div>

        <div className="p-6 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📦 Usage
          </h3>
          <pre className="text-sm text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 p-3 rounded overflow-x-auto">
{`import { ArrowUpRight, Check, Settings } from '@/design-system'

// Use directly in JSX
<ArrowUpRight className="w-5 h-5" />
<Check size={20} />
<Settings className="text-gray-500" size={24} />`}
          </pre>
        </div>

        {Object.entries(iconGroups).map(([groupName, icons]) => (
          <div key={groupName}>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              {groupName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {icons.map(({ name, Component }) => (
                <div
                  key={name}
                  className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-orange-500 dark:hover:border-orange-400 transition-colors"
                >
                  <Component 
                    size={32} 
                    className="text-gray-900 dark:text-gray-100 mb-3"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400 text-center font-mono">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
            ✅ Benefits
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 list-disc list-inside">
            <li>Single source of truth via design system</li>
            <li>Tree-shaking preserved (only imports used icons)</li>
            <li>Clear "approved" icon list</li>
            <li>Easy to add new icons when needed</li>
            <li>Type-safe with TypeScript</li>
          </ul>
        </div>

        <div className="p-6 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
          <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-2">
            📝 Adding New Icons
          </h3>
          <p className="text-sm text-orange-800 dark:text-orange-200 mb-3">
            To add a new icon from Lucide, update <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">src/design-system/icons/index.ts</code>:
          </p>
          <pre className="text-sm text-orange-800 dark:text-orange-200 bg-orange-100 dark:bg-orange-900 p-3 rounded overflow-x-auto">
{`// 1. Import the icon
export { NewIcon } from 'lucide-react'

// 2. It's now available via design system
import { NewIcon } from '@/design-system'`}
          </pre>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p>
            <strong>Total Icons:</strong> {Object.values(iconGroups).flat().length} • 
            <strong className="ml-2">Source:</strong> <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-orange-600 dark:text-orange-400 hover:underline">Lucide Icons</a>
          </p>
        </div>
      </div>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Icon Sizes
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Lucide icons support custom sizing via the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">size</code> prop or Tailwind classes.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Via Size Prop
          </h3>
          <div className="flex items-center gap-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <Icons.Settings size={16} className="text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">16px</span>
            </div>
            <div className="text-center">
              <Icons.Settings size={20} className="text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">20px</span>
            </div>
            <div className="text-center">
              <Icons.Settings size={24} className="text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">24px</span>
            </div>
            <div className="text-center">
              <Icons.Settings size={32} className="text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">32px</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Via Tailwind Classes
          </h3>
          <div className="flex items-center gap-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <Icons.Check className="w-4 h-4 text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">w-4 h-4</span>
            </div>
            <div className="text-center">
              <Icons.Check className="w-5 h-5 text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">w-5 h-5</span>
            </div>
            <div className="text-center">
              <Icons.Check className="w-6 h-6 text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">w-6 h-6</span>
            </div>
            <div className="text-center">
              <Icons.Check className="w-8 h-8 text-gray-900 dark:text-gray-100 mx-auto mb-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">w-8 h-8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
