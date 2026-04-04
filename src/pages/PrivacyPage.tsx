import { Heading, Text, Link } from '../design-system'
import { LegalPageLayout } from '../components/LegalPageLayout'

export function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      pageName="Privacy Policy"
      description="Privacy policy for CPACC Mastery - how we collect, use, and protect your data"
      canonical="/privacy"
      lastUpdated="April 3, 2026"
    >
      {/* Introduction */}
      <section>
        <Heading as="h2" className="mb-4">
          Introduction
        </Heading>
        <Text variant="body1">
          CPACC Mastery ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website at cpaccmastery.com (the "Site").
        </Text>
      </section>

      {/* Information We Collect */}
      <section>
        <Heading as="h2" className="mb-4">
          Information We Collect
        </Heading>
        
        <Heading as="h3" className="mb-3 mt-4">
          Analytics Data (Consent Required)
        </Heading>
        <Text variant="body1" className="mb-3">
          With your consent, we use Amplitude Analytics to understand how users interact with our Site. This data is only collected after you accept the cookie consent banner. It includes:
        </Text>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li>Pages visited and time spent on pages</li>
          <li>Click events, navigation patterns, and element interactions (automatically captured)</li>
          <li>Device type, browser, viewport size, and operating system</li>
          <li>General location (country/city level)</li>
          <li>Referral source (how you found our site)</li>
          <li>Study progress such as test scores, topics viewed, and learning patterns</li>
          <li>User engagement classification (e.g., beginner, intermediate, or advanced level based on cumulative usage such as topics viewed, tests completed, and time spent)</li>
          <li>Text-to-speech preferences and feature usage</li>
          <li>Navigation method detection (e.g., whether you appear to be navigating primarily by keyboard)</li>
          <li>Theme preference and system-level color scheme setting (light or dark mode)</li>
          <li>Network connection type (e.g., 4G, 3G) for performance analysis</li>
          <li>When you copy text from the site, a short excerpt (up to 50 characters) of the copied content</li>
          <li>JavaScript errors and page load performance metrics (to help us identify and fix technical issues)</li>
        </ul>
        <Text variant="body1" className="mb-3">
          If you decline the consent banner, none of the above data is collected.
        </Text>

        <Heading as="h3" className="mb-3 mt-4">
          Basic Site Analytics (No Consent Required)
        </Heading>
        <Text variant="body1" className="mb-3">
          We use Cloudflare Web Analytics, a privacy-focused analytics service that does not use cookies, does not track individual users, and does not collect personal information. This service runs on all page visits regardless of your consent choice and collects only:
        </Text>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li>Page URL and referrer</li>
          <li>Browser and country (aggregated, not tied to individuals)</li>
        </ul>
        <Text variant="body1">
          This data is used solely to understand overall traffic patterns. It cannot be used to identify you personally.
        </Text>

        <Heading as="h3" className="mb-3 mt-4">
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
        <Heading as="h2" className="mb-4">
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
        <Heading as="h2" className="mb-4">
          Cookies and Tracking Technologies
        </Heading>
        <Text variant="body1" className="mb-3">
          We use a small number of cookies:
        </Text>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li><strong>Consent storage:</strong> Your analytics consent choice is stored in both a cookie (set by the consent banner library) and in your browser's localStorage (under the key "amplitude-consent"). Both are set regardless of your choice so that the consent banner does not reappear on every visit. If the two values are ever out of sync, consent is automatically revoked as a safety measure.</li>
          <li><strong>Analytics cookies:</strong> If you accept analytics, the Amplitude SDK sets session and device identification cookies to distinguish unique visitors. These cookies are only set after you provide consent.</li>
        </ul>
        <Text variant="body1" className="mb-3">
          Preferences such as your theme (light/dark mode), text-to-speech settings, and study progress are stored in your browser's local storage, not in cookies. This data remains on your device and is not transmitted to our servers.
        </Text>
        <Text variant="body1">
          You can manage or delete cookies through your browser settings. Clearing cookies will reset your consent preference, and you will be asked again on your next visit.
        </Text>
      </section>

      {/* Third-Party Services */}
      <section>
        <Heading as="h2" className="mb-4">
          Third-Party Services
        </Heading>
        
        <Heading as="h3" className="mb-3 mt-4">
          Amplitude Analytics
        </Heading>
        <Text variant="body1" className="mb-3">
          We use Amplitude to analyze user behavior. Amplitude may collect and process data according to their privacy policy. You can learn more at:
        </Text>
        <Text variant="body1" className="mb-4">
          <Link 
            href="https://amplitude.com/privacy" 
            external
            underline="always"
          >
            https://amplitude.com/privacy
          </Link>
        </Text>

        <Heading as="h3" className="mb-3 mt-4">
          Cloudflare
        </Heading>
        <Text variant="body1">
          Our Site is hosted on Cloudflare Pages and uses Cloudflare D1 for data storage. Cloudflare Web Analytics collects basic, anonymous traffic data on all page visits (see "Basic Site Analytics" above). Cloudflare may also collect technical information as part of their hosting service. Learn more at:
        </Text>
        <Text variant="body1" className="mt-2 mb-4">
          <Link 
            href="https://www.cloudflare.com/privacypolicy/" 
            external
            underline="always"
          >
            https://www.cloudflare.com/privacypolicy/
          </Link>
        </Text>

        <Heading as="h3" className="mb-3 mt-4">
          Google Cloud Text-to-Speech
        </Heading>
        <Text variant="body1" className="mb-3">
          When you use the text-to-speech feature, the text content of the topic you are reading is sent to the Google Cloud Text-to-Speech API through our server to generate audio. No personal information is included in these requests -- only the study content text. Google may process this data according to their privacy policy:
        </Text>
        <Text variant="body1" className="mb-4">
          <Link 
            href="https://policies.google.com/privacy" 
            external
            underline="always"
          >
            https://policies.google.com/privacy
          </Link>
        </Text>

        <Heading as="h3" className="mb-3 mt-4">
          Resend (Email Delivery)
        </Heading>
        <Text variant="body1" className="mb-3">
          When you submit feedback, we use Resend to send an email notification so we can review and respond to your submission. If you provide your email address in the feedback form, it is transmitted through Resend's servers. Learn more at:
        </Text>
        <Text variant="body1">
          <Link 
            href="https://resend.com/legal/privacy-policy" 
            external
            underline="always"
          >
            https://resend.com/legal/privacy-policy
          </Link>
        </Text>
      </section>

      {/* Local Storage */}
      <section>
        <Heading as="h2" className="mb-4">
          Data Stored on Your Device
        </Heading>
        <Text variant="body1" className="mb-3">
          To provide a personalized experience without requiring an account, the Site stores the following data in your browser's local storage. This data never leaves your device and is not transmitted to our servers:
        </Text>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li><strong>Theme preference:</strong> Your light or dark mode choice</li>
          <li><strong>Study progress:</strong> Practice test scores, dates of past tests, and which topics you have viewed</li>
          <li><strong>Text-to-speech settings:</strong> Your preferred voice, playback speed, and monthly usage quota</li>
          <li><strong>Analytics consent:</strong> Whether you accepted or declined the consent banner</li>
        </ul>
        <Text variant="body1">
          You can clear this data at any time through your browser settings (clearing site data or local storage for cpaccmastery.com). Doing so will reset your preferences and study progress.
        </Text>
      </section>

      {/* Data Storage and Security */}
      <section>
        <Heading as="h2" className="mb-4">
          Data Storage, Retention, and Security
        </Heading>
        <Text variant="body1" className="mb-3">
          Data that is transmitted to external services is stored as follows:
        </Text>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li><strong>Feedback submissions</strong> are stored in a Cloudflare D1 database and retained indefinitely unless you request deletion.</li>
          <li><strong>Analytics data</strong> is processed and retained by Amplitude according to their data retention policies.</li>
          <li><strong>Cloudflare Web Analytics</strong> data is aggregated and anonymized; it cannot be traced back to individual users.</li>
        </ul>
        <Text variant="body1" className="mb-3">
          All data transmitted between your browser and our servers is encrypted using HTTPS.
        </Text>
        <Text variant="body1">
          Amplitude processes analytics data in the United States. Cloudflare operates a global network and may process data in various countries. By using the Site and accepting analytics consent, you acknowledge that your data may be transferred to and processed in countries outside your own, where data protection laws may differ.
        </Text>
      </section>

      {/* Your Rights */}
      <section>
        <Heading as="h2" className="mb-4">
          Your Rights and Choices
        </Heading>
        <Text variant="body1" className="mb-3">You have the right to:</Text>
        <ul className="list-disc list-outside ml-6 space-y-2 mb-4">
          <li><strong>Opt out of analytics:</strong> Decline the consent banner when it first appears. If you previously accepted, you can reset your preference by clearing cookies for cpaccmastery.com in your browser settings. The consent banner will reappear on your next visit, allowing you to decline.</li>
          <li><strong>Clear local data:</strong> Delete your locally stored preferences and study progress by clearing site data for cpaccmastery.com in your browser settings.</li>
          <li><strong>Request deletion:</strong> Ask us to delete any feedback submissions you have made.</li>
          <li><strong>Request your data:</strong> Ask for a copy of any data we hold about you.</li>
          <li><strong>Correct your information:</strong> Request updates or corrections to any data we hold.</li>
        </ul>
        <Text variant="body1">
          To exercise any of these rights, contact us at the email address listed below.
        </Text>
      </section>

      {/* Children's Privacy */}
      <section>
        <Heading as="h2" className="mb-4">
          Children's Privacy
        </Heading>
        <Text variant="body1">
          Our Site is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
        </Text>
      </section>

      {/* Changes to Policy */}
      <section>
        <Heading as="h2" className="mb-4">
          Changes to This Privacy Policy
        </Heading>
        <Text variant="body1">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Site after changes constitutes acceptance of the updated policy.
        </Text>
      </section>

      {/* Contact */}
      <section>
        <Heading as="h2" className="mb-4">
          Contact Us
        </Heading>
        <Text variant="body1" className="mb-3">
          If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
        </Text>
        <Text variant="body1" className="font-medium">
          Email: petras.leonardas@gmail.com
        </Text>
      </section>
    </LegalPageLayout>
  )
}
