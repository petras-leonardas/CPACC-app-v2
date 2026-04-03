import { useNavigate, useLocation } from 'react-router-dom'
import { SEO } from './SEO'
import { Heading, Text, Button, Container, Stack } from '../design-system'
import { usePageTracking } from '../hooks/usePageTracking'
import { ChevronLeft } from '../design-system/icons'

interface LegalPageLayoutProps {
  /** Page title used in heading and SEO */
  title: string
  /** Analytics page name */
  pageName: string
  /** SEO description */
  description: string
  /** Canonical URL path (e.g. "/privacy") */
  canonical: string
  /** Last updated date string */
  lastUpdated: string
  /** Page content sections */
  children: React.ReactNode
}

/**
 * Shared layout for legal/policy pages (Privacy, Terms, Accessibility Statement).
 * Provides consistent structure: SEO, back button, heading, date, and content wrapper.
 */
export function LegalPageLayout({
  title,
  pageName,
  description,
  canonical,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  usePageTracking(pageName)
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    // Safe back navigation: only use history if the user arrived from within the app
    if (location.key !== 'default') {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
      />
      <main className="flex-1">
        <Container size="md" padding="md" className="py-8 md:py-12">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ChevronLeft size={16} />}
            onClick={handleBack}
            className="mb-6"
          >
            Back
          </Button>

          <Heading as="h1" className="mb-6">
            {title}
          </Heading>

          <Text variant="small" className="text-sm text-gray-600 dark:text-gray-400 mb-8">
            Last updated: {lastUpdated}
          </Text>

          <Stack spacing="lg" className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            {children}
          </Stack>
        </Container>
      </main>
    </>
  )
}
