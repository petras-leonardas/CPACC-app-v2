// ---------------------------------------------------------------------------
// Amplitude SDK is loaded LAZILY via dynamic import() so its ~57 KB (gzip)
// bundle is not on the critical path.  The SDK is only downloaded when a
// user has consented to analytics AND is on a production domain.
// ---------------------------------------------------------------------------

type AmplitudeSDK = typeof import('@amplitude/analytics-browser')

const AMPLITUDE_API_KEY = '5239a3d3f98603c3698d05941df91c3e'
const CONSENT_KEY = 'amplitude-consent'

// Only enable analytics on production domains
const PRODUCTION_DOMAINS = ['cpacc-mastery-final.petras-leonardas.workers.dev', 'cpaccmastery.com']
const IS_PRODUCTION = typeof window !== 'undefined' && PRODUCTION_DOMAINS.includes(window.location.hostname)

let isInitialized = false
let amplitudeSDK: AmplitudeSDK | null = null

export const initializeAmplitude = async () => {
  if (isInitialized) return

  // Disable analytics on non-production environments
  if (!IS_PRODUCTION) return

  const hasConsent = getConsent()
  
  if (hasConsent) {
    try {
      amplitudeSDK = await import('@amplitude/analytics-browser')
      amplitudeSDK.init(AMPLITUDE_API_KEY, undefined, {
        autocapture: {
          elementInteractions: true,
        },
      })
      isInitialized = true
    } catch {
      // Analytics SDK failed to load (e.g. ad-blocker, network error).
      // Non-critical — all trackEvent/identifyUser calls will no-op.
    }
  }
}

export const setConsent = (granted: boolean) => {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? 'true' : 'false')
  } catch {
    // localStorage full or unavailable (QuotaExceededError, SecurityError).
    // Consent still takes effect for the current page session via the
    // initializeAmplitude() call below; it just won't persist across reloads.
  }
  
  if (granted && !isInitialized) {
    initializeAmplitude()
  }
}

export const getConsent = (): boolean => {
  try {
    const localValue = localStorage.getItem(CONSENT_KEY) === 'true'
    if (!localValue) return false

    // Guard against cookie/localStorage desync: if the user cleared cookies
    // but localStorage still says 'true', the consent banner will re-appear
    // (react-cookie-consent checks its own cookie).  In that case, revoke
    // the localStorage value so analytics doesn't fire before re-consent.
    const hasCookie = document.cookie.split(';').some(c => c.trim().startsWith(`${CONSENT_KEY}=`))
    if (!hasCookie) {
      localStorage.removeItem(CONSENT_KEY)
      return false
    }

    return true
  } catch {
    // localStorage unavailable (private browsing, disabled, SecurityError).
    // Treat as no consent — analytics will not initialize.
    return false
  }
}

export const trackEvent = (eventName: string, eventProperties?: Record<string, string | number | boolean>) => {
  if (!isInitialized || !amplitudeSDK || !getConsent()) return
  
  amplitudeSDK.track(eventName, eventProperties)
}

export const trackPageView = (pageName: string, properties?: Record<string, string | number | boolean>) => {
  trackEvent('Page Viewed', {
    page: pageName,
    ...properties,
  })
}

export const identifyUser = (userProperties: Record<string, string | number | boolean>) => {
  if (!isInitialized || !amplitudeSDK || !getConsent()) return
  
  const identifyEvent = new amplitudeSDK.Identify()
  Object.entries(userProperties).forEach(([key, value]) => {
    identifyEvent.set(key, value)
  })
  amplitudeSDK.identify(identifyEvent)
}
