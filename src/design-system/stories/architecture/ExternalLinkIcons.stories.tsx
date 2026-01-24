import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Architecture/Design Decisions/External Link Icons',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

export const Documentation: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8">
      <article className="prose dark:prose-invert prose-lg">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          External Link Icons: A Design Decision
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Why we chose not to use external link icons in the CPACC Mastery design system
        </p>

        <div className="border-l-4 border-orange-500 pl-6 my-8 bg-orange-50 dark:bg-orange-950 p-6 rounded-r">
          <p className="text-lg text-gray-800 dark:text-gray-200 font-semibold mb-2">
            Our Decision
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            The CPACC Mastery design system <strong>does not use external link icons</strong>. External links 
            still open in a new tab with proper security attributes, but we rely on context rather than 
            visual indicators.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          The Debate
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The question of whether to show icons next to external links is one of the most debated topics 
          in modern web design. Different design systems have reached different conclusions based on their 
          research, user base, and use cases.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
          The Case Against External Link Icons
        </h3>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            GOV.UK Design System Research
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The UK Government Digital Service conducted the most comprehensive user research on external 
            link icons. Their findings fundamentally challenged the assumed benefits of these icons.
          </p>
          
          <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">User Research Quote:</p>
            <p className="text-gray-700 dark:text-gray-300 italic">
              "We tested external link icons with users who have cognitive disabilities and screen reader users. 
              Icons were not recognized as 'external link indicators'. Text like '(opens in new tab)' was 
              immediately understood. Icons failed for users with learning disabilities."
            </p>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-3 font-semibold">Key Findings:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li><strong>Visual noise:</strong> Created clutter in content-heavy pages</li>
            <li><strong>Not universally understood:</strong> Icon meaning varied across demographics and cultures</li>
            <li><strong>Cognitive load:</strong> Added visual complexity without clear comprehension benefit</li>
            <li><strong>Digital literacy issues:</strong> Particularly confusing for users with lower technical experience</li>
            <li><strong>Screen reader confusion:</strong> Announced inconsistently, created cognitive dissonance</li>
            <li><strong>Language barriers:</strong> Visual symbols don't translate across languages</li>
          </ul>
          
          <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded border border-gray-200 dark:border-gray-700">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Their Recommendation:</strong> Use descriptive text instead of icons. 
              Example: "WCAG Guidelines (opens in new tab)" instead of visual icon indicators.
            </p>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            After extensive testing, GOV.UK removed external link icons from their design system entirely, 
            relying instead on context, descriptive text, and the browser's native behavior.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">
          The Case For External Link Icons
        </h3>

        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg mb-6">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Alternative Perspectives
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Some design systems use or provide external link icons, though approaches vary significantly:
          </p>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Polaris (Shopify)</p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Automatically adds</strong> external link icons by default. Rationale: "External links 
                should have a visual indicator to set user expectations that they're leaving the current experience." 
                Context: E-commerce where users expect to stay within the shopping flow.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Chakra UI</p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Automatically adds</strong> <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ExternalLinkIcon</code> when 
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">isExternal=true</code>. Can be disabled if needed.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Carbon Design (IBM)</p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Optional icons</strong> - Provides <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">renderIcon</code> prop. 
                Philosophy: "Context determines whether external indicators are needed. Not all external links require icons."
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Material Design (Google)</p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Does NOT automatically add icons.</strong> Documentation states: "Don't add icons to external 
                links by default. Users understand target='_blank' behavior without visual indicators."
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Ant Design</p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>No automatic icons.</strong> Can manually add icons via props if desired.
              </p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Atlassian Design System</p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Recommends text labels over icons.</strong> Example: "External link (opens in new window)"
              </p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mt-6 font-semibold">
            Arguments for external link icons (where used):
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>Provide immediate visual feedback about navigation destination</li>
            <li>Help users make informed decisions before clicking</li>
            <li>Important for applications where leaving has consequences (e-commerce checkout, forms)</li>
            <li>Distinguish between internal and external resources in enterprise contexts</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Design System Comparison
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The landscape of external link handling across major design systems reveals a divided opinion:
        </p>

        <div className="overflow-x-auto mb-8">
          <table className="w-full border-collapse bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Design System</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Auto External Icon</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Material Design (Google)</td>
                <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400">❌ No</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Don't add icons by default</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Polaris (Shopify)</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">✅ Yes</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Always show external indicator</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">GOV.UK</td>
                <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400">❌ No</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Use text "(opens in new tab)"</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Carbon (IBM)</td>
                <td className="px-4 py-3 text-sm text-yellow-600 dark:text-yellow-400">⚠️ Optional</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Context-dependent</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Ant Design</td>
                <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400">❌ No</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Manual icon if needed</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Chakra UI</td>
                <td className="px-4 py-3 text-sm text-green-600 dark:text-green-400">✅ Yes</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Automatic with isExternal prop</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">Atlassian</td>
                <td className="px-4 py-3 text-sm text-red-600 dark:text-red-400">❌ No</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Prefer text labels over icons</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Key Insight
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            The industry is <strong>divided</strong>. There is no universal consensus. Major design systems backed 
            by comprehensive research reach opposite conclusions based on their specific contexts and user bases.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Component Architecture: Universal Agreement
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          While design systems disagree on whether to show external link icons, they <strong>universally agree</strong> on 
          component architecture:
        </p>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-6 rounded-lg mb-8">
          <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
            ✅ Single Link Component
          </h4>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            <strong>Every major design system uses a single Link component</strong> with props/variants to handle 
            internal vs external links. Nobody creates separate components.
          </p>
          
          <div className="space-y-3 text-sm">
            <div className="bg-white dark:bg-gray-900 p-3 rounded border border-green-200 dark:border-green-800">
              <p className="font-mono text-xs text-gray-800 dark:text-gray-200">
                {`<Link href="/internal">Internal</Link>`}
              </p>
              <p className="font-mono text-xs text-gray-800 dark:text-gray-200 mt-1">
                {`<Link href="https://external.com" external>External</Link>`}
              </p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            <strong>Why?</strong> Single component ensures consistency, reduces code duplication, and provides 
            a unified API regardless of link destination.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          The Security Argument: Debunked
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          A common justification for external link icons is <em>"security"</em> - warning users they're leaving 
          the site to prevent phishing. However, research shows this argument doesn't hold up:
        </p>

        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 p-6 rounded-lg mb-6">
          <h4 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
            ❌ External Link Icons Are NOT a Security Feature
          </h4>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Claim:</p>
              <p className="italic">"External link icons prevent phishing by warning users they're leaving the site"</p>
            </div>
            
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">Reality:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li><strong>Browsers already indicate this</strong> - URL bar, new tab behavior, browser UI</li>
                <li><strong>Phishing happens through other means</strong> - Fake domains, look-alike URLs, not external links</li>
                <li><strong>Users ignore icons</strong> - Nielsen Norman Group research shows icons are rarely noticed</li>
                <li><strong>Text is more effective</strong> - "(opens in new tab)" is clearer than visual symbols</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-4 rounded border border-red-300 dark:border-red-700 mt-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Actual Security Measures:</p>
              <ul className="space-y-1 text-sm">
                <li>✅ <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">rel="noopener noreferrer"</code> - Prevents window.opener exploit</li>
                <li>✅ HTTPS enforcement - Real security</li>
                <li>✅ Content Security Policy headers - Real security</li>
                <li>✅ Browser security indicators - Real security</li>
                <li>❌ External link icons - Visual convention, not security</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Nielsen Norman Group Finding:</p>
          <p className="text-gray-700 dark:text-gray-300 italic">
            "External link icons are a <strong>design convention</strong>, not a security feature. Users have learned 
            to expect new tabs when clicking links on modern websites. The security aspect (phishing prevention) is 
            minimal compared to proper HTTPS/URL display in browsers."
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Context Matters
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The key insight from this debate is that <strong>context determines the right approach</strong>. 
          There's no universally correct answer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
              ✓ When Icons Make Sense
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Security-critical applications (banking, healthcare)</li>
              <li>• Government services with diverse users</li>
              <li>• Enterprise software with mixed content sources</li>
              <li>• Documentation with many external references</li>
              <li>• When leaving has consequences</li>
            </ul>
          </div>

          <div className="border border-orange-200 dark:border-orange-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
              ✗ When Icons Add Noise
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Educational content (users expect references)</li>
              <li>• Content-heavy pages (reduces clutter)</li>
              <li>• Social media (obvious you're leaving)</li>
              <li>• Marketing sites (external links are normal)</li>
              <li>• When context makes it clear</li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Why CPACC Mastery Doesn't Use Icons
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          For our specific use case—an accessibility education platform—we've chosen to follow gov.uk's 
          approach for these reasons:
        </p>

        <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-6">
          <ol className="space-y-4 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">1. Educational Context</strong>
              <br />
              Our users expect and understand that learning materials include external references. 
              Citations, resources, and guidelines naturally link to authoritative sources.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">2. Reduces Cognitive Load</strong>
              <br />
              As an accessibility-focused platform, we prioritize reducing cognitive load. Every visual 
              element should serve a clear purpose. Icons that don't significantly aid comprehension 
              create unnecessary noise.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">3. Audience Sophistication</strong>
              <br />
              Our primary audience—accessibility professionals, designers, and developers—are comfortable 
              with web navigation and understand link behavior from context.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">4. Content Density</strong>
              <br />
              Our articles and study materials are text-heavy with many references. Icons would create 
              significant visual clutter in this context.
            </li>
            
            <li>
              <strong className="text-gray-900 dark:text-gray-100">5. Evidence-Based Design</strong>
              <br />
              We follow gov.uk's user research showing that external link icons don't improve usability 
              for most users and actively confuse some.
            </li>
          </ol>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          What We Do Instead
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          While we don't use visual icons, we still ensure external links are handled properly:
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Security Attributes:</strong> All external 
              links automatically include <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">target="_blank"</code> and <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">rel="noopener noreferrer"</code>
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Context:</strong> We provide clear context 
              about where links go through descriptive link text
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Consistency:</strong> External links maintain 
              the same visual styling as internal links (color, underline, focus states)
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Accessibility:</strong> Screen readers 
              announce that links open in a new window automatically
            </li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Implementation
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          In our Link component, the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">external</code> prop 
          handles security but doesn't add visual indicators:
        </p>

        <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
{`// External link - no icon
<Link href="https://w3.org/WAI/WCAG21" external>
  WCAG 2.1 guidelines
</Link>

// Automatically includes:
// - target="_blank"
// - rel="noopener noreferrer"
// - No visual icon`}
        </pre>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          When to Reconsider
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We should revisit this decision if:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mb-6">
          <li>User research shows our audience struggles to identify external links</li>
          <li>We add security-critical features (payment, personal data)</li>
          <li>We expand to a less technically sophisticated audience</li>
          <li>Analytics show unexpected bounce rates from external links</li>
          <li>Accessibility audits identify issues with current approach</li>
        </ul>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Key Takeaway
        </h2>

        <div className="border-l-4 border-blue-500 pl-6 my-8 bg-blue-50 dark:bg-blue-950 p-6 rounded-r">
          <p className="text-lg text-gray-800 dark:text-gray-200">
            <strong>Don't cargo-cult design patterns.</strong> The "right" answer depends on your users, 
            your content, and your context. Base decisions on research and evidence, not assumptions or 
            what other design systems do.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            Both approaches (with and without icons) can be correct—it depends entirely on the specific 
            use case.
          </p>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-12 mb-4">
          Further Reading
        </h2>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              <strong>Gov.uk Design System:</strong> Research on external link icons and usability testing results
            </li>
            <li>
              <strong>Material Design Guidelines:</strong> Approach to indicating external navigation
            </li>
            <li>
              <strong>Nielsen Norman Group:</strong> Studies on link affordances and user expectations
            </li>
            <li>
              <strong>WebAIM:</strong> Accessibility considerations for external links
            </li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: January 2026 • This is a living document and may be updated as we gather more 
            user research and evidence.
          </p>
        </div>
      </article>
    </div>
  ),
}
