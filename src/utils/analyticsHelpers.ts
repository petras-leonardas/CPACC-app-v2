import { trackEvent, identifyUser } from './analytics'

// ===========================
// USER PROFILE MANAGEMENT
// ===========================

interface UserProfile {
  totalTestsTaken: number
  totalTopicsViewed: number
  averageScore: number
  preferredTestType: string
  userLevel: 'beginner' | 'intermediate' | 'advanced'
  prefersTTS: boolean
  hasSubmittedFeedback: boolean
  lastTestDate: string
  firstVisitDate: string
  totalSessionCount: number
  totalTimeSpentMinutes: number
}

const PROFILE_KEY = 'user_analytics_profile'

function getUserProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(PROFILE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return getDefaultProfile()
      }
    }
  } catch {
    // localStorage unavailable (private browsing, disabled, SecurityError)
  }
  return getDefaultProfile()
}

function getDefaultProfile(): UserProfile {
  return {
    totalTestsTaken: 0,
    totalTopicsViewed: 0,
    averageScore: 0,
    preferredTestType: '',
    userLevel: 'beginner',
    prefersTTS: false,
    hasSubmittedFeedback: false,
    lastTestDate: '',
    firstVisitDate: new Date().toISOString(),
    totalSessionCount: 0,
    totalTimeSpentMinutes: 0
  }
}

function updateUserProfile(updates: Partial<UserProfile>) {
  const current = getUserProfile()
  const updated = { ...current, ...updates }
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated))
  } catch {
    // localStorage full or unavailable (QuotaExceededError, SecurityError)
  }
  
  // Update Amplitude user properties
  identifyUser({
    totalTestsTaken: updated.totalTestsTaken,
    totalTopicsViewed: updated.totalTopicsViewed,
    averageScore: updated.averageScore,
    userLevel: updated.userLevel,
    prefersTTS: updated.prefersTTS,
    hasSubmittedFeedback: updated.hasSubmittedFeedback,
    daysSinceFirstVisit: calculateDaysSince(updated.firstVisitDate)
  })
}

export function incrementTestCount(score: number, testType: string) {
  const profile = getUserProfile()
  const newTotal = profile.totalTestsTaken + 1
  const newAvg = ((profile.averageScore * profile.totalTestsTaken) + score) / newTotal
  
  updateUserProfile({
    totalTestsTaken: newTotal,
    averageScore: Math.round(newAvg),
    lastTestDate: new Date().toISOString(),
    preferredTestType: testType,
    userLevel: newAvg > 80 ? 'advanced' : newAvg > 60 ? 'intermediate' : 'beginner'
  })
}

export function incrementTopicViewCount() {
  const profile = getUserProfile()
  updateUserProfile({
    totalTopicsViewed: profile.totalTopicsViewed + 1
  })
}

export function markTTSUsed() {
  const profile = getUserProfile()
  if (!profile.prefersTTS) {
    updateUserProfile({ prefersTTS: true })
  }
}

export function markFeedbackSubmitted() {
  updateUserProfile({ hasSubmittedFeedback: true })
}

// ===========================
// FEATURE DISCOVERY TRACKING
// ===========================

const FEATURE_USAGE_KEY = 'feature_usage_'

export function trackFirstTimeFeatureUse(featureName: string, properties?: Record<string, string | number | boolean>) {
  const key = `${FEATURE_USAGE_KEY}${featureName}`
  try {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, new Date().toISOString())
      const profile = getUserProfile()
      trackEvent('Feature First Used', {
        feature: featureName,
        daysSinceFirstVisit: calculateDaysSince(profile.firstVisitDate),
        ...properties
      })
    }
  } catch {
    // localStorage unavailable — skip first-use tracking
  }
}

// ===========================
// SESSION TRACKING
// ===========================

interface StudySession {
  sessionId: string
  startTime: number
  topicsViewed: Set<string>
  testsTaken: number
  totalScore: number
  testsCompleted: number
}

let currentSession: StudySession | null = null

export function startStudySession() {
  if (!currentSession) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
    currentSession = {
      sessionId,
      startTime: Date.now(),
      topicsViewed: new Set(),
      testsTaken: 0,
      totalScore: 0,
      testsCompleted: 0
    }
    
    trackEvent('Study Session Started', {
      sessionId,
      timestamp: currentSession.startTime
    })
  }
}

export function addTopicToSession(topicId: string) {
  if (currentSession) {
    currentSession.topicsViewed.add(topicId)
  }
}

export function addTestToSession(score: number) {
  if (currentSession) {
    currentSession.testsTaken++
    currentSession.testsCompleted++
    currentSession.totalScore += score
  }
}

export function endStudySession() {
  if (currentSession) {
    const duration = Math.round((Date.now() - currentSession.startTime) / 1000 / 60) // minutes
    
    // Only track if session was at least 2 minutes
    if (duration >= 2) {
      trackEvent('Study Session Ended', {
        sessionId: currentSession.sessionId,
        duration,
        topicsViewed: currentSession.topicsViewed.size,
        testsTaken: currentSession.testsTaken,
        averageScore: currentSession.testsCompleted > 0 
          ? Math.round(currentSession.totalScore / currentSession.testsCompleted)
          : 0
      })
      
      // Update profile
      const profile = getUserProfile()
      updateUserProfile({
        totalSessionCount: profile.totalSessionCount + 1,
        totalTimeSpentMinutes: profile.totalTimeSpentMinutes + duration
      })
    }
    
    currentSession = null
  }
}

// ===========================
// CONTENT TRACKING
// ===========================

const VIEWED_TOPICS_KEY = 'viewed_topics_order'

export function trackTopicFirstView(topicId: string, topicTitle: string) {
  const viewedTopics = getViewedTopics()
  
  if (!viewedTopics.some(t => t.topicId === topicId)) {
    const viewOrder = viewedTopics.length + 1
    viewedTopics.push({ topicId, topicTitle, timestamp: Date.now() })
    try {
      localStorage.setItem(VIEWED_TOPICS_KEY, JSON.stringify(viewedTopics))
    } catch {
      // localStorage full or unavailable
    }
    
    const profile = getUserProfile()
    trackEvent('Content First Viewed', {
      contentType: 'topic',
      contentId: topicId,
      contentTitle: topicTitle,
      viewOrder,
      sessionNumber: profile.totalSessionCount
    })
  }
}

function getViewedTopics(): Array<{ topicId: string; topicTitle: string; timestamp: number }> {
  try {
    const stored = localStorage.getItem(VIEWED_TOPICS_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
  } catch {
    // localStorage unavailable
  }
  return []
}

export function saveTestScore(topicId: string, score: number) {
  try {
    localStorage.setItem(`test_score_${topicId}`, score.toString())
    localStorage.setItem(`test_date_${topicId}`, Date.now().toString())
  } catch {
    // localStorage full or unavailable — test score won't persist across reloads
  }
}

export function getTestHistory(topicId: string): { score: number; date: number } | null {
  try {
    const score = localStorage.getItem(`test_score_${topicId}`)
    const date = localStorage.getItem(`test_date_${topicId}`)
    
    if (score && date) {
      const parsedScore = parseInt(score)
      const parsedDate = parseInt(date)
      // Guard against corrupted localStorage data
      if (isNaN(parsedScore) || isNaN(parsedDate)) return null
      return { score: parsedScore, date: parsedDate }
    }
  } catch {
    // localStorage unavailable
  }
  return null
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function calculateDaysSince(dateString: string): number {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return 0 // Guard against corrupted date strings
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function getDeviceType(): string {
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// ===========================
// VIEWPORT TRACKING
// ===========================

type ViewportCategory = 
  | 'Mobile (<768px)' 
  | 'Tablet (768-1023px)' 
  | 'Small Desktop (1024-1439px)' 
  | 'Large Desktop (1440-1919px)' 
  | 'HD Desktop (1920px+)'

function getViewportCategory(): ViewportCategory {
  const width = window.innerWidth
  if (width < 768) return 'Mobile (<768px)'
  if (width < 1024) return 'Tablet (768-1023px)'
  if (width < 1440) return 'Small Desktop (1024-1439px)'
  if (width < 1920) return 'Large Desktop (1440-1919px)'
  return 'HD Desktop (1920px+)'
}

export function getViewportData() {
  return {
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    viewportCategory: getViewportCategory(),
  }
}

function getConnectionType(): string {
  const connection = (navigator as Navigator & { connection?: { effectiveType?: string } }).connection
  return connection?.effectiveType || 'unknown'
}

// ===========================
// ERROR TRACKING
// ===========================

export function setupErrorTracking() {
  // JavaScript errors
  window.addEventListener('error', (event) => {
    // Only send the basename of the source file — full URLs leak bundle
    // hashing patterns and internal paths to the analytics provider.
    const filename = event.filename ? event.filename.split('/').pop() || '' : ''
    trackEvent('JavaScript Error', {
      errorMessage: event.message,
      errorSource: filename,
      errorLine: event.lineno,
      errorColumn: event.colno,
      page: window.location.pathname
    })
  })

  // Unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackEvent('Unhandled Promise Rejection', {
      errorMessage: event.reason?.message || String(event.reason),
      page: window.location.pathname
    })
  })
}

// ===========================
// PERFORMANCE TRACKING
// ===========================

export function trackPagePerformance(pageName: string) {
  if (typeof window === 'undefined' || !window.performance) return
  
  // Wait for load to complete
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (perfData) {
        trackEvent('Page Load Performance', {
          page: pageName,
          loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
          domInteractive: Math.round(perfData.domInteractive - perfData.fetchStart),
          connectionType: getConnectionType(),
          deviceType: getDeviceType()
        })
      }
    }, 0)
  }, { once: true })
}

// ===========================
// KEYBOARD & ACCESSIBILITY
// ===========================

let keyboardNavCount = 0
let keyboardUserDetected = false

export function setupAccessibilityTracking(pageName: string): () => void {
  const handler = (e: KeyboardEvent) => {
    if (['Tab', 'Enter', 'ArrowUp', 'ArrowDown', 'Escape', ' '].includes(e.key)) {
      keyboardNavCount++
      
      // Detect keyboard user after 5 keyboard navigation actions
      if (keyboardNavCount === 5 && !keyboardUserDetected) {
        keyboardUserDetected = true
        trackEvent('Keyboard Navigation Detected', {
          page: pageName,
          likelyKeyboardUser: true
        })
      }
    }
  }
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}

// ===========================
// COPY/PASTE TRACKING
// ===========================

export function setupContentCopyTracking(topicId: string): () => void {
  const handler = () => {
    const selection = window.getSelection()?.toString()
    if (selection && selection.length > 10) {
      trackEvent('Content Copied', {
        topicId,
        textLength: selection.length,
        firstWords: selection.substring(0, 50)
      })
    }
  }
  document.addEventListener('copy', handler)
  return () => document.removeEventListener('copy', handler)
}

// ===========================
// THEME DETECTION TRACKING
// ===========================

const THEME_DETECTED_KEY = 'theme_detected_session'

export function trackInitialTheme(theme: 'light' | 'dark', source: 'saved-preference' | 'system-preference' | 'default') {
  // Only track once per session
  try {
    const sessionId = sessionStorage.getItem(THEME_DETECTED_KEY)
    if (sessionId) return
    
    sessionStorage.setItem(THEME_DETECTED_KEY, 'true')
  } catch {
    // sessionStorage unavailable — still proceed with tracking
  }
  
  trackEvent('Theme Detected', {
    theme,
    source,
    systemPrefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    deviceType: getDeviceType()
  })
}
