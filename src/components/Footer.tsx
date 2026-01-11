import { Link } from 'react-router-dom'
import { GridContainer } from './Grid'
import { trackEvent } from '../utils/analytics'

export function Footer() {
  const handleFooterLinkClick = (linkType: string) => {
    trackEvent('Footer Link Clicked', {
      linkType,
      location: window.location.pathname,
    })
  }

  return (
    <div className="w-full border-t border-gray-200 dark:border-gray-800 py-6 bg-gray-50 dark:bg-gray-950">
      <GridContainer>
        <p className="cpacc-text-small mb-3">
          © 2026 CPACC Mastery · Independent study resource · Not affiliated with IAAP
        </p>
        <div className="flex gap-2">
          <Link 
            to="/terms" 
            onClick={() => handleFooterLinkClick('terms')} 
            data-tracking-id="footer-terms" 
            className="cpacc-text-small-link"
          >
            Terms
          </Link>
          <span className="cpacc-text-small">·</span>
          <Link 
            to="/privacy" 
            onClick={() => handleFooterLinkClick('privacy')} 
            data-tracking-id="footer-privacy" 
            className="cpacc-text-small-link"
          >
            Privacy
          </Link>
          <span className="cpacc-text-small">·</span>
          <Link 
            to="/accessibility" 
            onClick={() => handleFooterLinkClick('accessibility')} 
            data-tracking-id="footer-accessibility" 
            className="cpacc-text-small-link"
          >
            Accessibility
          </Link>
        </div>
      </GridContainer>
    </div>
  )
}
