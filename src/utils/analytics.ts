import * as amplitude from '@amplitude/analytics-browser'

const AMPLITUDE_API_KEY = '5239a3d3f98603c3698d05941df91c3e'
const CONSENT_KEY = 'amplitude-consent'

// Only enable analytics on production domains
const PRODUCTION_DOMAINS = ['cpacc-mastery-final.petras-leonardas.workers.dev', 'cpaccmastery.com']
const IS_PRODUCTION = typeof window !== 'undefined' && PRODUCTION_DOMAINS.includes(window.location.hostname)

let isInitialized = false

export const initializeAmplitude = () => {
  if (isInitialized) return

  // Disable analytics on non-production environments
  if (!IS_PRODUCTION) return

  const hasConsent = getConsent()
  
  if (hasConsent) {
    amplitude.init(AMPLITUDE_API_KEY, undefined, {
      autocapture: {
        elementInteractions: true,
      },
    })
    isInitialized = true
  }
}

export const setConsent = (granted: boolean) => {
  localStorage.setItem(CONSENT_KEY, granted ? 'true' : 'false')
  
  if (granted && !isInitialized) {
    initializeAmplitude()
  }
}

export const getConsent = (): boolean => {
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
}

export const trackEvent = (eventName: string, eventProperties?: Record<string, string | number | boolean>) => {
  if (!isInitialized || !getConsent()) return
  
  amplitude.track(eventName, eventProperties)
}

export const trackPageView = (pageName: string, properties?: Record<string, string | number | boolean>) => {
  trackEvent('Page Viewed', {
    page: pageName,
    ...properties,
  })
}

export const setUserId = (userId: string) => {
  if (!isInitialized || !getConsent()) return
  
  amplitude.setUserId(userId)
}

export const identifyUser = (userProperties: Record<string, string | number | boolean>) => {
  if (!isInitialized || !getConsent()) return
  
  const identifyEvent = new amplitude.Identify()
  Object.entries(userProperties).forEach(([key, value]) => {
    identifyEvent.set(key, value)
  })
  amplitude.identify(identifyEvent)
}
