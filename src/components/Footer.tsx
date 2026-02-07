import { useNavigate } from 'react-router-dom'
import { trackEvent } from '../utils/analytics'
import { Text, Link, Container } from '../design-system'

export function Footer() {
  const navigate = useNavigate()

  const handleFooterLinkClick = (e: React.MouseEvent, linkType: string, path: string) => {
    e.preventDefault()
    trackEvent('Footer Link Clicked', {
      linkType,
      location: window.location.pathname,
    })
    navigate(path)
  }

  return (
    <div className="w-full border-t border-gray-200 dark:border-gray-800 py-6 bg-gray-50 dark:bg-gray-950">
      <Container size="xl" padding="md">
        <Text variant="small" className="cpacc-text-small mb-3">
          2026 CPACC Mastery · Independent study resource · Not affiliated with IAAP
        </Text>
        <div className="flex gap-2 text-xs">
          <Link 
            href="/terms" 
            onClick={(e) => handleFooterLinkClick(e, 'terms', '/terms')} 
            data-tracking-id="footer-terms"
          >
            Terms
          </Link>
          <span className="cpacc-text-small">·</span>
          <Link 
            href="/privacy" 
            onClick={(e) => handleFooterLinkClick(e, 'privacy', '/privacy')} 
            data-tracking-id="footer-privacy"
          >
            Privacy
          </Link>
          <span className="cpacc-text-small">·</span>
          <Link 
            href="/accessibility" 
            onClick={(e) => handleFooterLinkClick(e, 'accessibility', '/accessibility')} 
            data-tracking-id="footer-accessibility"
          >
            Accessibility
          </Link>
        </div>
      </Container>
    </div>
  )
}
