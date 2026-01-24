import type { Meta, StoryObj } from '@storybook/react'
import { 
  generateCompleteCSSString 
} from '../../tokens'

const meta = {
  title: 'Design Tokens/CSS Variables',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => {
    return (
      <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            CSS Variables
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
            Runtime-ready CSS custom properties generated from design tokens. 
            Use these for dynamic theming and to avoid hardcoded color values.
          </p>

          {/* What are CSS Variables */}
          <div className="mb-12 bg-blue-50 dark:bg-blue-950 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
              💡 What are CSS Variables?
            </h2>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              CSS variables (custom properties) allow you to store values that can be reused and changed at runtime. 
              They're perfect for theming because they can be overridden based on context (like dark mode).
            </p>
            <div className="bg-blue-100 dark:bg-blue-900 rounded p-4 font-mono text-sm text-blue-900 dark:text-blue-100">
              {`/* Define in :root */
:root {
  --color-brand-primary: #353A56;
}

/* Override in .dark */
.dark {
  --color-brand-primary: #6B7399;
}

/* Use anywhere */
button {
  background: var(--color-brand-primary);
}`}
            </div>
          </div>

          {/* Usage Examples */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Usage Examples
            </h2>

            <div className="space-y-6">
              {/* Brand Colors */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Brand Colors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div 
                      className="h-16 rounded-lg mb-2"
                      style={{ backgroundColor: 'var(--color-brand-primary)' }}
                    />
                    <code className="text-xs text-gray-600 dark:text-gray-400">
                      var(--color-brand-primary)
                    </code>
                  </div>
                  <div>
                    <div 
                      className="h-16 rounded-lg mb-2"
                      style={{ backgroundColor: 'var(--color-brand-accent)' }}
                    />
                    <code className="text-xs text-gray-600 dark:text-gray-400">
                      var(--color-brand-accent)
                    </code>
                  </div>
                  <div>
                    <div 
                      className="h-16 rounded-lg mb-2"
                      style={{ backgroundColor: 'var(--color-brand-secondary)' }}
                    />
                    <code className="text-xs text-gray-600 dark:text-gray-400">
                      var(--color-brand-secondary)
                    </code>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {`<button style={{ backgroundColor: 'var(--color-brand-primary)' }}>
  Primary CTA
</button>`}
                </div>
              </div>

              {/* Button Tokens */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Button Component Tokens
                </h3>
                <div className="flex gap-3 mb-4">
                  <button
                    style={{
                      backgroundColor: 'var(--button-primary-bg)',
                      color: 'var(--button-primary-text)',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Primary Button
                  </button>
                  <button
                    style={{
                      backgroundColor: 'var(--button-secondary-bg)',
                      color: 'var(--button-secondary-text)',
                      padding: '12px 24px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {`<button style={{
  backgroundColor: 'var(--button-primary-bg)',
  color: 'var(--button-primary-text)'
}}>
  Primary Button
</button>`}
                </div>
              </div>

              {/* Input Focus */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Input Focus States
                </h3>
                <input
                  type="text"
                  placeholder="Click to see focus state..."
                  className="w-full px-4 py-3 rounded-lg mb-4"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    border: '2px solid var(--input-border)',
                    color: 'var(--input-text)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--input-border-focus)'
                    e.target.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--input-border)'
                  }}
                />
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {`<input style={{
  backgroundColor: 'var(--input-bg)',
  border: '2px solid var(--input-border)',
}} 
onFocus={(e) => {
  e.target.style.borderColor = 'var(--input-border-focus)'
}} />`}
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Guide */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Implementation Guide
            </h2>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Step 1: Import CSS Variables
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {`import { 
  generateLightModeCSSVariables, 
  generateDarkModeCSSVariables,
  cssVariablesToReactStyle 
} from '@/design-system'`}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Step 2: Apply to Root Element
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 font-mono text-xs text-gray-800 dark:text-gray-200 overflow-x-auto">
                  {`// In your App.tsx or Layout component
const lightVars = generateLightModeCSSVariables()
const darkVars = generateDarkModeCSSVariables()

export function App() {
  return (
    <div 
      className="light"
      style={cssVariablesToReactStyle(lightVars)}
    >
      {/* Your app */}
    </div>
  )
}

// For dark mode, apply dark variables
<div 
  className="dark"
  style={cssVariablesToReactStyle(darkVars)}
>`}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Step 3: Use in Components
                </h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-4 font-mono text-xs text-gray-800 dark:text-gray-200">
                  {`// React inline styles
<button style={{ 
  backgroundColor: 'var(--button-primary-bg)',
  color: 'var(--button-primary-text)'
}}>

// CSS/SCSS
.my-button {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text);
}

// Tailwind (extend in config)
className="bg-[var(--button-primary-bg)]"`}
                </div>
              </div>
            </div>
          </div>

          {/* Available Variables */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Available Variables
            </h2>
            
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Brand Variables */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Brand Colors
                  </h3>
                  <div className="space-y-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                    <div>--brand-navy-[50-900]</div>
                    <div>--brand-orange-[50-900]</div>
                    <div>--brand-teal-[50-900]</div>
                  </div>
                </div>

                {/* Semantic Variables */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Semantic Tokens
                  </h3>
                  <div className="space-y-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                    <div>--color-brand-primary</div>
                    <div>--color-brand-accent</div>
                    <div>--color-brand-secondary</div>
                    <div>--color-success</div>
                    <div>--color-error</div>
                    <div>--color-warning</div>
                    <div>--color-info</div>
                  </div>
                </div>

                {/* Text Variables */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Text Colors
                  </h3>
                  <div className="space-y-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                    <div>--text-primary</div>
                    <div>--text-secondary</div>
                    <div>--text-tertiary</div>
                    <div>--text-disabled</div>
                    <div>--text-brand</div>
                    <div>--text-accent</div>
                  </div>
                </div>

                {/* Background Variables */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Backgrounds
                  </h3>
                  <div className="space-y-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                    <div>--bg-page</div>
                    <div>--bg-primary</div>
                    <div>--bg-secondary</div>
                    <div>--bg-tertiary</div>
                    <div>--bg-elevated</div>
                    <div>--surface-notebook</div>
                  </div>
                </div>

                {/* Border Variables */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Borders
                  </h3>
                  <div className="space-y-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                    <div>--border-default</div>
                    <div>--border-hover</div>
                    <div>--border-focus</div>
                    <div>--border-active</div>
                  </div>
                </div>

                {/* Component Variables */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Components
                  </h3>
                  <div className="space-y-1 font-mono text-xs text-gray-600 dark:text-gray-400">
                    <div>--button-[variant]-bg</div>
                    <div>--button-[variant]-text</div>
                    <div>--input-bg</div>
                    <div>--input-border-focus</div>
                    <div>--nav-item-selected-bg</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Raw CSS Output */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Complete CSS Output
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Copy this to your global CSS file for static usage:
            </p>
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-6 overflow-x-auto">
              <pre className="font-mono text-xs text-gray-100">
                {generateCompleteCSSString()}
              </pre>
            </div>
          </div>
        </div>
      </div>
    )
  },
}

export const ComparisonTable: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Usage Comparison
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Three ways to use colors from your design system
        </p>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left p-4 text-gray-900 dark:text-gray-100 font-semibold">Approach</th>
                <th className="text-left p-4 text-gray-900 dark:text-gray-100 font-semibold">Code</th>
                <th className="text-left p-4 text-gray-900 dark:text-gray-100 font-semibold">When to Use</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">CSS Variables</td>
                <td className="p-4">
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                    var(--color-brand-primary)
                  </code>
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                  Runtime theming, dynamic values
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">Direct Tokens</td>
                <td className="p-4">
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                    brand.navy[500]
                  </code>
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                  Static values, build-time optimization
                </td>
              </tr>
              <tr>
                <td className="p-4 text-gray-900 dark:text-gray-100 font-medium">Tailwind Classes</td>
                <td className="p-4">
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-800 dark:text-gray-200">
                    bg-brand-navy-500
                  </code>
                </td>
                <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                  Rapid development, utility-first
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ),
}
