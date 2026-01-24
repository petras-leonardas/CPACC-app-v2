import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { useNavigate } from 'react-router-dom'
import { Heading, Text, Container } from '../design-system'

export function AccessibilityPage() {
  usePageTracking('Accessibility Statement')
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Accessibility Statement"
        description="Accessibility commitment and statement for CPACC Mastery"
        canonical="/accessibility"
      />
      <main className="flex-1 overflow-y-auto">
        <Container size="md" padding="md" className="py-8 md:py-12">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-6"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>

          <Heading as="h1" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Accessibility Statement
          </Heading>
          
          <Text variant="small" className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: January 11, 2026
          </Text>

          <div className="space-y-8 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* Commitment */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Our Commitment to Accessibility
              </Heading>
              <Text variant="body1">
                CPACC Mastery is committed to ensuring digital accessibility for all users, including people with disabilities. As a resource dedicated to accessibility education, we strive to practice what we teach and continuously improve the user experience for everyone.
              </Text>
            </section>

            {/* Standards */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Accessibility Standards
              </Heading>
              <Text variant="body1" className="mb-3">
                We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, which include:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li><strong>Perceivable:</strong> Information and user interface components must be presentable to users in ways they can perceive</li>
                <li><strong>Operable:</strong> User interface components and navigation must be operable</li>
                <li><strong>Understandable:</strong> Information and the operation of user interface must be understandable</li>
                <li><strong>Robust:</strong> Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies</li>
              </ul>
            </section>

            {/* Current Features */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Accessibility Features
              </Heading>
              <Text variant="body1" className="mb-3">
                Our website includes the following accessibility features:
              </Text>
              
              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Visual Design
              </Heading>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>High contrast color schemes for readability</li>
                <li>Dark mode option to reduce eye strain</li>
                <li>Consistent and clear visual hierarchy</li>
                <li>Readable font sizes and line spacing</li>
                <li>Color is not the only means of conveying information</li>
              </ul>

              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Navigation
              </Heading>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Keyboard navigation support throughout the site</li>
                <li>Skip navigation links for screen reader users</li>
                <li>Clear and descriptive link text</li>
                <li>Consistent navigation structure</li>
                <li>Breadcrumb navigation for orientation</li>
              </ul>

              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Content
              </Heading>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Semantic HTML for proper structure</li>
                <li>Descriptive headings and labels</li>
                <li>Alternative text for images</li>
                <li>Clear and simple language</li>
                <li>Properly structured content with lists and sections</li>
              </ul>

              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Interactive Features
              </Heading>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Text-to-speech functionality for content reading</li>
                <li>Accessible form controls with proper labels</li>
                <li>Focus indicators for keyboard navigation</li>
                <li>Sufficient time to read and interact with content</li>
                <li>No time limits on practice tests (untimed mode available)</li>
              </ul>

              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Responsive Design
              </Heading>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Mobile-responsive layout that works on all devices</li>
                <li>Content reflows properly at different screen sizes</li>
                <li>Touch targets sized appropriately for mobile use</li>
                <li>Zoom support up to 200% without loss of functionality</li>
              </ul>
            </section>

            {/* Testing */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Accessibility Testing
              </Heading>
              <Text variant="body1" className="mb-3">
                We regularly test our site using:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Automated accessibility testing tools</li>
                <li>Manual testing with keyboard-only navigation</li>
                <li>Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                <li>Browser testing across multiple browsers</li>
                <li>Mobile device testing</li>
              </ul>
            </section>

            {/* Known Issues */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Known Limitations
              </Heading>
              <Text variant="body1" className="mb-3">
                We are continuously working to improve accessibility. Currently known limitations include:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Some complex interactive features may have reduced functionality with certain assistive technologies</li>
                <li>Text-to-speech feature may not work in all browsers</li>
                <li>Some third-party embedded content may not meet WCAG 2.1 AA standards</li>
              </ul>
              <Text variant="body1">
                We are actively working to address these limitations in future updates.
              </Text>
            </section>

            {/* Compatible Technologies */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Compatible Technologies
              </Heading>
              <Text variant="body1" className="mb-3">
                Our site is designed to be compatible with:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
                <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
                <li>Browser zoom and text resizing features</li>
                <li>Voice control software</li>
                <li>Keyboard-only navigation</li>
                <li>Mobile and tablet devices</li>
              </ul>
            </section>

            {/* Feedback */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Feedback and Assistance
              </Heading>
              <Text variant="body1" className="mb-3">
                We welcome your feedback on the accessibility of CPACC Mastery. If you encounter any accessibility barriers or have suggestions for improvement:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Use our feedback form on any topic page</li>
                <li>Email us at: [Your contact email - to be added]</li>
                <li>Provide specific details about the issue and your assistive technology setup</li>
              </ul>
              <Text variant="body1">
                We aim to respond to accessibility feedback within 5 business days and strive to resolve issues as quickly as possible.
              </Text>
            </section>

            {/* Complaints */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Formal Complaints
              </Heading>
              <Text variant="body1">
                If you are not satisfied with our response to your accessibility concern, you may contact us directly with a formal complaint. We take all accessibility concerns seriously and will work with you to find a resolution.
              </Text>
            </section>

            {/* Ongoing Efforts */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Ongoing Improvements
              </Heading>
              <Text variant="body1" className="mb-3">
                Our commitment to accessibility is ongoing. We continuously work to:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Conduct regular accessibility audits</li>
                <li>Incorporate user feedback into design decisions</li>
                <li>Train our team on accessibility best practices</li>
                <li>Stay current with WCAG guidelines and emerging standards</li>
                <li>Test with diverse users and assistive technologies</li>
                <li>Remediate identified accessibility issues promptly</li>
              </ul>
            </section>

            {/* Third-Party Content */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Third-Party Content
              </Heading>
              <Text variant="body1">
                While we strive to ensure that all content on CPACC Mastery is accessible, some third-party content or links to external resources may not meet the same accessibility standards. We are not responsible for the accessibility of external websites but welcome reports of accessibility issues you encounter.
              </Text>
            </section>

            {/* Contact */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Contact Information
              </Heading>
              <Text variant="body1" className="mb-3">
                For questions about accessibility or to report accessibility issues:
              </Text>
              <Text variant="body1" className="font-medium mb-2">
                Email: [Your contact email - to be added]
              </Text>
              <Text variant="small" className="text-sm text-gray-600 dark:text-gray-400">
                We aim to respond to all accessibility inquiries within 5 business days.
              </Text>
            </section>

            {/* Closing */}
            <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <Text variant="small" className="text-sm italic">
                This statement reflects our ongoing commitment to accessibility and will be updated as we continue to improve and expand our site.
              </Text>
            </section>

          </div>
        </Container>
      </main>
    </>
  )
}
