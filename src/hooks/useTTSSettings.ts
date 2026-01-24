import { useState, useEffect } from 'react'

/**
 * Voice options for TTS
 */
export type TTSVoice = 'en-US-Neural2-C' | 'en-US-Wavenet-I' | 'browser'

/**
 * Settings for Text-to-Speech functionality
 */
export interface TTSSettings {
  voice: TTSVoice
  playbackRate: number
}

/**
 * Hook return type
 */
export interface UseTTSSettingsReturn {
  voice: TTSVoice
  playbackRate: number
  setVoice: (voice: TTSVoice) => void
  setPlaybackRate: (rate: number) => void
  resetSettings: () => void
}

/**
 * Default TTS settings
 */
const DEFAULT_VOICE: TTSVoice = 'en-US-Wavenet-I' // Male AI voice
const DEFAULT_PLAYBACK_RATE = 1.5

/**
 * localStorage keys
 */
const VOICE_STORAGE_KEY = 'ttsVoice'
const PLAYBACK_RATE_STORAGE_KEY = 'ttsPlaybackSpeed'

/**
 * Custom hook for managing TTS settings (voice and playback speed)
 * 
 * Handles state management and localStorage persistence for TTS settings.
 * Settings are automatically saved to localStorage and restored on mount.
 * 
 * @returns Object containing voice, playbackRate, and setter functions
 * 
 * @example
 * ```tsx
 * const { voice, playbackRate, setVoice, setPlaybackRate } = useTTSSettings()
 * 
 * // Change voice
 * setVoice('en-US-Neural2-C')
 * 
 * // Change speed
 * setPlaybackRate(2.0)
 * ```
 */
export function useTTSSettings(): UseTTSSettingsReturn {
  // Initialize voice from localStorage or default
  const [voice, setVoiceState] = useState<TTSVoice>(() => {
    if (typeof window === 'undefined') return DEFAULT_VOICE
    
    const saved = localStorage.getItem(VOICE_STORAGE_KEY)
    // Validate saved value is a valid voice option
    if (saved === 'en-US-Neural2-C' || saved === 'en-US-Wavenet-I' || saved === 'browser') {
      return saved
    }
    return DEFAULT_VOICE
  })

  // Initialize playback rate from localStorage or default
  const [playbackRate, setPlaybackRateState] = useState<number>(() => {
    if (typeof window === 'undefined') return DEFAULT_PLAYBACK_RATE
    
    const saved = localStorage.getItem(PLAYBACK_RATE_STORAGE_KEY)
    if (saved) {
      const parsed = parseFloat(saved)
      // Validate rate is reasonable (0.5x to 3.0x)
      if (!isNaN(parsed) && parsed >= 0.5 && parsed <= 3.0) {
        return parsed
      }
    }
    return DEFAULT_PLAYBACK_RATE
  })

  // Persist voice to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(VOICE_STORAGE_KEY, voice)
    }
  }, [voice])

  // Persist playback rate to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(PLAYBACK_RATE_STORAGE_KEY, playbackRate.toString())
    }
  }, [playbackRate])

  // Setter for voice
  const setVoice = (newVoice: TTSVoice) => {
    setVoiceState(newVoice)
  }

  // Setter for playback rate
  const setPlaybackRate = (rate: number) => {
    // Validate and clamp rate to reasonable bounds
    const clampedRate = Math.max(0.5, Math.min(3.0, rate))
    setPlaybackRateState(clampedRate)
  }

  // Reset all settings to defaults
  const resetSettings = () => {
    setVoiceState(DEFAULT_VOICE)
    setPlaybackRateState(DEFAULT_PLAYBACK_RATE)
  }

  return {
    voice,
    playbackRate,
    setVoice,
    setPlaybackRate,
    resetSettings,
  }
}
