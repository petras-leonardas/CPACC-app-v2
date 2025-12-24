interface TTSQuotaState {
  used: number          // Characters used this month
  resetDate: string     // ISO date string for next reset (1st of next month)
  limit: number         // Monthly character limit (1M for Neural2 voices)
}

const QUOTA_KEY = 'ttsQuota'
const MONTHLY_LIMIT = 1_000_000 // 1 million characters for Neural2 voices

/**
 * Get the first day of next month
 */
function getNextMonthStart(): string {
  const now = new Date()
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return nextMonth.toISOString()
}

/**
 * Initialize or get quota state from localStorage
 */
export function getTTSQuota(): TTSQuotaState {
  try {
    const stored = localStorage.getItem(QUOTA_KEY)
    
    if (stored) {
      const quota: TTSQuotaState = JSON.parse(stored)
      const now = new Date()
      const resetDate = new Date(quota.resetDate)
      
      // Check if we need to reset (new month)
      if (now >= resetDate) {
        const newQuota: TTSQuotaState = {
          used: 0,
          resetDate: getNextMonthStart(),
          limit: MONTHLY_LIMIT
        }
        localStorage.setItem(QUOTA_KEY, JSON.stringify(newQuota))
        return newQuota
      }
      
      return quota
    }
    
    // First time - initialize
    const initialQuota: TTSQuotaState = {
      used: 0,
      resetDate: getNextMonthStart(),
      limit: MONTHLY_LIMIT
    }
    localStorage.setItem(QUOTA_KEY, JSON.stringify(initialQuota))
    return initialQuota
    
  } catch (error) {
    console.error('Error reading TTS quota:', error)
    // Return safe default
    return {
      used: 0,
      resetDate: getNextMonthStart(),
      limit: MONTHLY_LIMIT
    }
  }
}

/**
 * Update quota with character usage
 */
export function updateTTSQuota(charactersUsed: number): void {
  try {
    const quota = getTTSQuota()
    quota.used += charactersUsed
    localStorage.setItem(QUOTA_KEY, JSON.stringify(quota))
  } catch (error) {
    console.error('Error updating TTS quota:', error)
  }
}

/**
 * Check if quota is available for given character count
 */
export function hasQuotaAvailable(charactersNeeded: number = 0): boolean {
  const quota = getTTSQuota()
  return (quota.used + charactersNeeded) < quota.limit
}

/**
 * Get remaining quota characters
 */
export function getRemainingQuota(): number {
  const quota = getTTSQuota()
  return Math.max(0, quota.limit - quota.used)
}

/**
 * Get quota usage percentage (0-100)
 */
export function getQuotaPercentage(): number {
  const quota = getTTSQuota()
  return Math.min(100, (quota.used / quota.limit) * 100)
}

/**
 * Reset quota manually (for testing)
 */
export function resetTTSQuota(): void {
  const quota: TTSQuotaState = {
    used: 0,
    resetDate: getNextMonthStart(),
    limit: MONTHLY_LIMIT
  }
  localStorage.setItem(QUOTA_KEY, JSON.stringify(quota))
}
