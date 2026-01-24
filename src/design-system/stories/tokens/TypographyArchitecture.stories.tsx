import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from '../../components/Heading/Heading'
import { Text } from '../../components/Text/Text'

const meta: Meta = {
  title: 'Architecture/Typography Components',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const WhyTypographyComponents: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="mb-12">
          <Heading as="h1">Typography as Components: Architecture & Benefits</Heading>
          <Text variant="body1" className="mt-4">
            Understanding why modern design systems implement typography as both tokens AND components, 
            with a focus on accessibility, consistency, and developer experience.
          </Text>
        </div>

        {/* The Problem */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <Heading as="h2">The Problem with Tokens Alone</Heading>
          
          <Text variant="body1" className="mt-4">
            Traditional design systems only provided design tokens (values like font sizes, weights, colors). 
            Developers had to manually apply these tokens correctly, which led to several issues:
          </Text>

          <div className="mt-6 space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <Text variant="body2" bold className="text-red-900 dark:text-red-100">
                    Accessibility Violations
                  </Text>
                  <Text variant="body2" className="mt-1 text-red-800 dark:text-red-200">
                    Developers could style a <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">{'<div>'}</code> to 
                    look like a heading, breaking semantic HTML structure. Screen readers rely on proper heading tags 
                    (h1-h6) to navigate content, and when visual headings aren't semantic, users with disabilities 
                    lose critical navigation capabilities.
                  </Text>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <Text variant="body2" bold className="text-red-900 dark:text-red-100">
                    SEO Impact
                  </Text>
                  <Text variant="body2" className="mt-1 text-red-800 dark:text-red-200">
                    Search engines use heading hierarchy to understand page structure and content importance. 
                    When headings aren't properly marked up with h1-h6 tags, search engines can't accurately 
                    index content, directly impacting discoverability.
                  </Text>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <Text variant="body2" bold className="text-red-900 dark:text-red-100">
                    Inconsistency
                  </Text>
                  <Text variant="body2" className="mt-1 text-red-800 dark:text-red-200">
                    Without components, developers must remember utility class names 
                    (<code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">.cpacc-heading-1</code>, 
                    <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">.cpacc-body-1</code>). 
                    This leads to mistakes, forgotten classes, and visual inconsistencies across the application.
                  </Text>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">❌</span>
                <div>
                  <Text variant="body2" bold className="text-red-900 dark:text-red-100">
                    No Type Safety
                  </Text>
                  <Text variant="body2" className="mt-1 text-red-800 dark:text-red-200">
                    Utility classes are strings with no TypeScript validation. Typos like 
                    <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">.cpacc-heading-11</code> or 
                    <code className="bg-red-100 dark:bg-red-900/50 px-1 rounded">.cpacc-bod-1</code> fail silently, 
                    appearing in production without warning.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Standard */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <Heading as="h2">Industry Standard: Typography Components</Heading>
          
          <Text variant="body1" className="mt-4">
            Leading design systems have recognized these problems and adopted a <strong>component-based approach</strong> 
            alongside design tokens. This isn't a novel idea—it's industry best practice.
          </Text>

          <div className="mt-6 space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <Text variant="body2" bold className="text-blue-900 dark:text-blue-100">
                Material-UI (Google)
              </Text>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>
{`<Typography variant="h1">Page Title</Typography>
<Typography variant="body1">Content</Typography>`}
                </code>
              </pre>
              <Text variant="small" className="mt-2">
                Used by thousands of applications. Enforces semantic HTML while maintaining Google's design language.
              </Text>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <Text variant="body2" bold className="text-purple-900 dark:text-purple-100">
                Chakra UI
              </Text>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>
{`<Heading as="h1" size="2xl">Page Title</Heading>
<Text fontSize="md">Content</Text>`}
                </code>
              </pre>
              <Text variant="small" className="mt-2">
                Accessible by default. Enforces heading hierarchy and provides built-in ARIA support.
              </Text>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <Text variant="body2" bold className="text-green-900 dark:text-green-100">
                Radix Themes
              </Text>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>
{`<Heading as="h1" size="9">Page Title</Heading>
<Text size="3">Content</Text>`}
                </code>
              </pre>
              <Text variant="small" className="mt-2">
                Built by accessibility experts. Prioritizes semantic HTML and screen reader compatibility.
              </Text>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <Text variant="body2" bold className="text-amber-900 dark:text-amber-100">
                Polaris (Shopify)
              </Text>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded mt-2 text-sm overflow-x-auto">
                <code>
{`<Text variant="headingLg" as="h1">Page Title</Text>
<Text variant="bodyMd">Content</Text>`}
                </code>
              </pre>
              <Text variant="small" className="mt-2">
                Powers Shopify's admin interface. Ensures WCAG 2.1 AA compliance across all merchant tools.
              </Text>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
            <Text variant="body2" className="text-blue-800 dark:text-blue-200">
              <strong>Pattern Recognition:</strong> Notice how all major design systems use a similar API? 
              Component-based typography isn't experimental—it's proven at scale by Google, Shopify, and 
              other accessibility-focused organizations.
            </Text>
          </div>
        </div>

        {/* Our Approach */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <Heading as="h2">CPACC Design System Approach</Heading>
          
          <Text variant="body1" className="mt-4">
            We've adopted a <strong>hybrid architecture</strong> that combines the best of both worlds:
          </Text>

          <div className="mt-6 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <Text variant="body2" bold>Design Tokens (Source of Truth)</Text>
                  <Text variant="body2" className="mt-1">
                    <code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">typography.ts</code> defines 
                    all values: font sizes, weights, line heights. This is the single source of truth.
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 dark:bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <Text variant="body2" bold>Utility Classes (Backward Compatible)</Text>
                  <Text variant="body2" className="mt-1">
                    Tailwind generates <code className="bg-white dark:bg-gray-800 px-1 rounded">.cpacc-heading-1</code> etc. 
                    Existing code keeps working, no breaking changes.
                  </Text>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <Text variant="body2" bold>Typography Components (Recommended)</Text>
                  <Text variant="body2" className="mt-1">
                    <code className="bg-white dark:bg-gray-800 px-1 rounded">{'<Heading>'}</code> and 
                    <code className="bg-white dark:bg-gray-800 px-1 rounded ml-1">{'<Text>'}</code> components 
                    enforce best practices while using the same underlying tokens.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Benefits */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-8 mb-8 border-2 border-green-300 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">♿</span>
            <Heading as="h2">Accessibility Benefits (Primary Focus)</Heading>
          </div>

          <Text variant="body1" className="mb-6">
            For a CPACC certification application, accessibility isn't optional—it's our core mission. 
            Typography components directly support multiple WCAG 2.1 success criteria:
          </Text>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">✓</span>
                <div>
                  <Text variant="body2" bold className="text-green-900 dark:text-green-100">
                    WCAG 2.1.1 (Level A): Keyboard Navigation
                  </Text>
                </div>
              </div>
              <Text variant="body2">
                Screen readers use heading landmarks to navigate. When users press H (or 1-6), screen readers 
                jump between properly marked headings. Components <strong>enforce</strong> semantic HTML, ensuring 
                navigation always works. With utility classes alone, developers could style divs as headings, 
                breaking this critical navigation pattern.
              </Text>
              <div className="mt-3 bg-green-50 dark:bg-green-900/30 p-3 rounded">
                <Text variant="small" className="text-green-800 dark:text-green-200">
                  <strong>Real Impact:</strong> A blind user can press "1" to jump to the main heading, 
                  "2" to navigate sections. Components guarantee this works every time.
                </Text>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">✓</span>
                <div>
                  <Text variant="body2" bold className="text-green-900 dark:text-green-100">
                    WCAG 1.3.1 (Level A): Info and Relationships
                  </Text>
                </div>
              </div>
              <Text variant="body2">
                Information structure must be programmatically determinable. Heading hierarchy (h1 → h2 → h3) 
                conveys content relationships. Components make it impossible to accidentally skip levels 
                (e.g., h1 → h3), maintaining the semantic structure assistive technology depends on.
              </Text>
              <div className="mt-3 bg-green-50 dark:bg-green-900/30 p-3 rounded">
                <Text variant="small" className="text-green-800 dark:text-green-200">
                  <strong>Real Impact:</strong> Screen readers announce "Heading level 2" so users understand 
                  they're in a subsection. Proper hierarchy provides context and orientation.
                </Text>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">✓</span>
                <div>
                  <Text variant="body2" bold className="text-green-900 dark:text-green-100">
                    WCAG 1.4.3 (Level AA): Contrast Ratio
                  </Text>
                </div>
              </div>
              <Text variant="body2">
                Components automatically apply design system colors that meet contrast requirements (4.5:1 for body text, 
                3:1 for large text). The <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.cpacc-*</code> classes 
                include both light and dark mode variants, ensuring contrast in all themes. Manual implementation often 
                misses these dark mode considerations.
              </Text>
              <div className="mt-3 bg-green-50 dark:bg-green-900/30 p-3 rounded">
                <Text variant="small" className="text-green-800 dark:text-green-200">
                  <strong>Real Impact:</strong> Users with low vision or color blindness can read all text. 
                  Dark mode maintains contrast ratios automatically.
                </Text>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">✓</span>
                <div>
                  <Text variant="body2" bold className="text-green-900 dark:text-green-100">
                    WCAG 1.4.4 (Level AA): Resize Text
                  </Text>
                </div>
              </div>
              <Text variant="body2">
                Typography tokens use relative units (rem) instead of pixels, allowing text to scale when users 
                increase browser font size. Components inherit this behavior automatically. Users who need larger 
                text can scale to 200% without loss of content or functionality.
              </Text>
              <div className="mt-3 bg-green-50 dark:bg-green-900/30 p-3 rounded">
                <Text variant="small" className="text-green-800 dark:text-green-200">
                  <strong>Real Impact:</strong> Users with low vision can increase font size system-wide, 
                  and our application respects that preference.
                </Text>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl">✓</span>
                <div>
                  <Text variant="body2" bold className="text-green-900 dark:text-green-100">
                    WCAG 2.4.6 (Level AA): Headings and Labels
                  </Text>
                </div>
              </div>
              <Text variant="body2">
                Headings must describe topic or purpose. By enforcing semantic HTML, components ensure headings 
                are properly marked up and programmatically exposed. This helps all users—especially those using 
                assistive technology—quickly locate and understand content organization.
              </Text>
              <div className="mt-3 bg-green-50 dark:bg-green-900/30 p-3 rounded">
                <Text variant="small" className="text-green-800 dark:text-green-200">
                  <strong>Real Impact:</strong> Screen reader users can generate a heading outline to understand 
                  page structure before reading content.
                </Text>
              </div>
            </div>
          </div>

          <div className="bg-green-100 dark:bg-green-900/40 border-2 border-green-400 dark:border-green-600 rounded-lg p-4 mt-6">
            <Text variant="body2" bold className="text-green-900 dark:text-green-100 mb-2">
              Why This Matters for CPACC
            </Text>
            <Text variant="body2" className="text-green-800 dark:text-green-200">
              As an accessibility certification platform, we must <strong>practice what we teach</strong>. 
              Typography components aren't just convenient—they're a commitment to accessibility that our 
              users can learn from. Every properly implemented heading is a teaching moment demonstrating 
              WCAG compliance in action.
            </Text>
          </div>
        </div>

        {/* SEO Benefits */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">🔍</span>
            <Heading as="h2">SEO Benefits</Heading>
          </div>

          <Text variant="body1" className="mb-6">
            Search engines rely on proper HTML structure to understand and rank content. Typography components 
            directly improve SEO:
          </Text>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <Text variant="body2" bold>Semantic HTML Structure</Text>
                <Text variant="body2" className="mt-1">
                  Search engine crawlers prioritize content in h1-h6 tags. When headings are properly marked 
                  (not styled divs), search engines accurately index content hierarchy and keyword relevance.
                </Text>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <Text variant="body2" bold>Content Hierarchy</Text>
                <Text variant="body2" className="mt-1">
                  Proper heading levels (h1 for title, h2 for sections, h3 for subsections) help search engines 
                  understand content organization, improving featured snippet eligibility and answer box placement.
                </Text>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <Text variant="body2" bold>One H1 Per Page</Text>
                <Text variant="body2" className="mt-1">
                  Components make it easy to follow SEO best practice: exactly one h1 per page. TypeScript 
                  enforces this at compile time, preventing accidental duplicate h1s that dilute keyword focus.
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Experience */}
        <div className="bg-white dark:bg-gray-900 rounded-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <Heading as="h2">Developer Experience Benefits</Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <Text variant="body2" bold className="text-blue-900 dark:text-blue-100">Type Safety</Text>
              <Text variant="body2" className="mt-2 text-blue-800 dark:text-blue-200">
                TypeScript autocomplete guides developers. Can't use invalid props like 
                <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded ml-1">as="p"</code> on Heading.
              </Text>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <Text variant="body2" bold className="text-purple-900 dark:text-purple-100">Consistency</Text>
              <Text variant="body2" className="mt-2 text-purple-800 dark:text-purple-200">
                One API across the application. No remembering different class names or patterns. 
                Every heading follows the same structure.
              </Text>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <Text variant="body2" bold className="text-green-900 dark:text-green-100">Easy Refactoring</Text>
              <Text variant="body2" className="mt-2 text-green-800 dark:text-green-200">
                Change design tokens once, all components update. No find-and-replace across 
                hundreds of files.
              </Text>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
              <Text variant="body2" bold className="text-amber-900 dark:text-amber-100">Onboarding</Text>
              <Text variant="body2" className="mt-2 text-amber-800 dark:text-amber-200">
                New developers learn one component API, not dozens of utility classes. 
                Storybook provides instant examples.
              </Text>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-lg p-8 text-white">
          <Heading as="h2" className="text-white">The Bottom Line</Heading>
          
          <div className="mt-6 space-y-4">
            <Text variant="body1" className="text-white">
              Typography components aren't just about convenience—they're about <strong>enforcing accessibility 
              as a default</strong>, not an afterthought. When accessibility is built into the component API, 
              it becomes automatic rather than optional.
            </Text>

            <Text variant="body1" className="text-white">
              For the CPACC Design System, this means:
            </Text>

            <ul className="space-y-2 ml-6">
              <li className="text-white">
                <Text variant="body2" className="text-white">
                  ✓ Every heading is semantic HTML (WCAG compliance by default)
                </Text>
              </li>
              <li className="text-white">
                <Text variant="body2" className="text-white">
                  ✓ Screen reader navigation works without extra effort
                </Text>
              </li>
              <li className="text-white">
                <Text variant="body2" className="text-white">
                  ✓ SEO benefits from proper document structure
                </Text>
              </li>
              <li className="text-white">
                <Text variant="body2" className="text-white">
                  ✓ Developers can't accidentally break accessibility
                </Text>
              </li>
              <li className="text-white">
                <Text variant="body2" className="text-white">
                  ✓ We practice the accessibility principles we teach
                </Text>
              </li>
            </ul>

            <div className="bg-white/10 rounded-lg p-4 mt-6">
              <Text variant="body2" className="text-white">
                <strong>This is how modern, accessibility-focused design systems work.</strong> We're not 
                inventing a new pattern—we're following industry best practices established by Google, 
                Shopify, and accessibility experts worldwide.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}
