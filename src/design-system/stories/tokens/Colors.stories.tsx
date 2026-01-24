import type { Meta, StoryObj } from '@storybook/react'
import { base, brand, semantic, components } from '../../tokens'

const meta: Meta = {
  title: 'Design Tokens/Colors',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const ColorSwatch = ({ name, hex }: { name: string; hex: string }) => (
  <div className="flex flex-col">
    <div 
      className="h-20 rounded-lg border border-gray-200 dark:border-gray-700 mb-2"
      style={{ backgroundColor: hex }}
    />
    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</div>
    <div className="text-xs font-mono text-gray-600 dark:text-gray-400">{hex}</div>
  </div>
)

export const Overview: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">CPACC Mastery Color System</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl">
          Complete color palette including brand colors and system colors. All colors are optimized for accessibility and dark mode.
        </p>

        {/* Brand Colors Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">Brand Colors</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
            Your primary brand identity colors for CTAs, navigation, focus states, and accents.
          </p>
          
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Navy - Primary</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Main brand color for CTAs, navigation active states, and primary interactive elements. Light mode uses 500, dark mode uses 400.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {Object.entries(brand.navy).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={shade} hex={hex} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Orange - Accent & Focus</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Focus states, highlights, and interactive accents. Light mode uses 500, dark mode uses 400.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {Object.entries(brand.orange).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={shade} hex={hex} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Teal - Secondary</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Secondary accents and decorative elements. Light mode uses 400, dark mode uses 300.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {Object.entries(brand.teal).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={shade} hex={hex} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Colors Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">System Colors</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
            Supporting colors for UI states, feedback, and neutral elements.
          </p>
          
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Gray - Neutrals</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Text, backgrounds, borders, and general UI elements.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {Object.entries(base.gray).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={shade} hex={hex} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Green - Success</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Success states, confirmations, and positive feedback.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {Object.entries(base.green).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={shade} hex={hex} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Red - Error</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Error states, warnings, and critical alerts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {Object.entries(base.red).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={shade} hex={hex} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Amber - Warning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Warning states and cautionary feedback.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
                {Object.entries(base.amber).map(([shade, hex]) => (
                  <ColorSwatch key={shade} name={shade} hex={hex} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Surface Colors */}
        <div>
          <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">Surface Colors</h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
            Special background treatments for the notebook-style study experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Notebook Light</h3>
              <div 
                className="h-32 rounded-lg border border-gray-300 flex items-center justify-center"
                style={{ backgroundColor: brand.surface.notebook.light }}
              >
                <span className="text-sm font-mono text-gray-600">{brand.surface.notebook.light}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Notebook Dark</h3>
              <div 
                className="h-32 rounded-lg border border-gray-700 flex items-center justify-center"
                style={{ backgroundColor: brand.surface.notebook.dark }}
              >
                <span className="text-sm font-mono text-gray-300">{brand.surface.notebook.dark}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const SemanticTokens: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">Semantic Color Tokens</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Purpose-driven color mappings showing how colors adapt between light and dark modes.
        </p>

        <div className="space-y-12">
          {/* Brand Semantic Tokens */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Brand Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Brand Primary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">CTAs and primary actions</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Light</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.brandPrimary.light }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.brandPrimary.light}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dark</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.brandPrimary.dark }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.brandPrimary.dark}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Brand Accent</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Focus states & highlights</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Light</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.brandAccent.light }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.brandAccent.light}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dark</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.brandAccent.dark }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.brandAccent.dark}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Brand Secondary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Secondary accents</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Light</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.brandSecondary.light }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.brandSecondary.light}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dark</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.brandSecondary.dark }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.brandSecondary.dark}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Semantic Tokens */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">System State Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Success</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Light</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.success.light }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.success.light}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dark</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.success.dark }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.success.dark}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Error</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Light</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.error.light }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.error.light}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dark</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.error.dark }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.error.dark}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Warning</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Light</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.warning.light }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.warning.light}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dark</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.warning.dark }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.warning.dark}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Info</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Light</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.info.light }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.info.light}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Dark</div>
                    <div className="h-16 rounded-lg" style={{ backgroundColor: semantic.info.dark }} />
                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 mt-1">{semantic.info.dark}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ComponentColors: StoryObj = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-950 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Component Colors</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Usage-specific colors for text, backgrounds, and borders
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Text Colors</h2>
          <div className="space-y-3">
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-gray-900 dark:text-gray-100 font-semibold">Primary Text</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                Light: {components.text.primary.light} | Dark: {components.text.primary.dark}
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 font-semibold">Secondary Text</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                Light: {components.text.secondary.light} | Dark: {components.text.secondary.dark}
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-900 rounded-lg">
              <p className="text-gray-400 dark:text-gray-600 font-semibold">Disabled Text</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                Light: {components.text.disabled.light} | Dark: {components.text.disabled.dark}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Background Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-24 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 dark:text-gray-100 font-semibold">Primary</span>
            </div>
            <div className="h-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 dark:text-gray-100 font-semibold">Secondary</span>
            </div>
            <div className="h-24 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-900 dark:text-gray-100 font-semibold">Tertiary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
