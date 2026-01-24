import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { useNavigate } from 'react-router-dom'
import { Heading, Text, Link, Container } from '../design-system'

export function PrivacyPage() {
  usePageTracking('Privacy Policy')
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Privacy policy for CPACC Mastery - how we collect, use, and protect your data"
        canonical="/privacy"
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
            Privacy Policy
          </Heading>
          
          <Text variant="small" className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Last updated: January 11, 2026
          </Text>

          <div className="space-y-8 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            
            {/* Introduction */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Introduction
              </Heading>
              <Text variant="body1">
                CPACC Mastery ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at cpacc-mastery.pages.dev (the "Site").
              </Text>
            </section>

            {/* Information We Collect */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Information We Collect
              </Heading>
              
              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Analytics Data
              </Heading>
              <Text variant="body1" className="mb-3">
                We use Amplitude Analytics to understand how users interact with our Site. This includes:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Pages visited and time spent on pages</li>
                <li>Click events and navigation patterns</li>
                <li>Device type, browser, and operating system</li>
                <li>General location (country/city level)</li>
                <li>Referral source (how you found our site)</li>
              </ul>
              <Text variant="body1">
                Analytics are only collected after you provide cookie consent. You can opt out at any time by managing your cookie preferences.
              </Text>

              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Feedback Form Data
              </Heading>
              <Text variant="body1" className="mb-3">
                When you submit feedback through our feedback form, we collect:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Your email address (optional, if provided)</li>
                <li>Feedback message content</li>
                <li>Page or topic you're providing feedback about</li>
                <li>Timestamp of submission</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                How We Use Your Information
              </Heading>
              <Text variant="body1" className="mb-3">We use the collected information to:</Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Improve the Site's content and user experience</li>
                <li>Understand which topics and features are most valuable</li>
                <li>Identify and fix technical issues</li>
                <li>Respond to feedback and suggestions (if email provided)</li>
                <li>Monitor Site performance and usage patterns</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Cookies and Tracking Technologies
              </Heading>
              <Text variant="body1" className="mb-3">
                We use cookies to:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
                <li>Remember your cookie consent preferences</li>
                <li>Store your theme preference (light/dark mode)</li>
                <li>Enable Amplitude Analytics (only with your consent)</li>
              </ul>
              <Text variant="body1">
                You can manage or disable cookies through your browser settings. However, disabling cookies may affect some Site functionality.
              </Text>
            </section>

            {/* Third-Party Services */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Third-Party Services
              </Heading>
              
              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Amplitude Analytics
              </Heading>
              <Text variant="body1" className="mb-3">
                We use Amplitude to analyze user behavior. Amplitude may collect and process data according to their privacy policy. You can learn more at:
              </Text>
              <Text variant="body1" className="mb-4">
                <Link 
                  href="https://amplitude.com/privacy" 
                  external
                  underline="hover"
                >
                  https://amplitude.com/privacy
                </Link>
              </Text>

              <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">
                Cloudflare
              </Heading>
              <Text variant="body1">
                Our Site is hosted on Cloudflare Pages and uses Cloudflare D1 for data storage. Cloudflare may collect technical information as part of their service. Learn more at:
              </Text>
              <Text variant="body1" className="mt-2">
                <Link 
                  href="https://www.cloudflare.com/privacypolicy/" 
                  external
                  underline="hover"
                >
                  https://www.cloudflare.com/privacypolicy/
                </Link>
              </Text>
            </section>

            {/* Data Storage and Security */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Data Storage and Security
              </Heading>
              <Text variant="body1" className="mb-3">
                Your data is stored securely:
              </Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Feedback submissions are stored in Cloudflare D1 database</li>
                <li>Analytics data is processed by Amplitude</li>
                <li>We use industry-standard security measures</li>
                <li>Data is transmitted over HTTPS encryption</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Your Rights
              </Heading>
              <Text variant="body1" className="mb-3">You have the right to:</Text>
              <ul className="list-disc list-outside ml-6 space-y-2">
                <li>Opt out of analytics by declining cookie consent</li>
                <li>Request deletion of your feedback submissions</li>
                <li>Request a copy of data we have about you</li>
                <li>Update or correct your information</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Children's Privacy
              </Heading>
              <Text variant="body1">
                Our Site is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </Text>
            </section>

            {/* Changes to Policy */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Changes to This Privacy Policy
              </Heading>
              <Text variant="body1">
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Site after changes constitutes acceptance of the updated policy.
              </Text>
            </section>

            {/* Contact */}
            <section>
              <Heading as="h2" className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Contact Us
              </Heading>
              <Text variant="body1" className="mb-3">
                If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </Text>
              <Text variant="body1" className="font-medium">
                Email: [Your contact email - to be added]
              </Text>
            </section>

          </div>
        </Container>
      </main>
    </>
  )
}
