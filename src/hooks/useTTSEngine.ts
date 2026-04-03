import { useState, useEffect, useRef, useCallback } from 'react'
import type { DetailedTopicContent } from '../data/topicContent'
import { updateTTSQuota, hasQuotaAvailable } from '../utils/ttsQuota'
import { trackFirstTimeFeatureUse, markTTSUsed } from '../utils/analyticsHelpers'
import { buildTextQueue } from '../utils/ttsTextProcessing'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UseTTSEngineParams {
  content: DetailedTopicContent
  title: string
  selectedVoice: string
  playbackRate: number
  setPlaybackRate: (rate: number) => void
  onStateChange?: (state: {
    isPlaying: boolean
    isPaused: boolean
    playbackRate: number
    currentIndex: number
  }) => void
}

export interface UseTTSEngineReturn {
  isPlaying: boolean
  isPaused: boolean
  isSupported: boolean
  usingGoogleTTS: boolean
  timeRemaining: number | null
  currentIndex: number
  totalSections: number
  handlePlay: () => void
  handlePause: () => void
  handleStop: () => void
  handlePreviousSentence: () => void
  handleNextSentence: () => void
  handleVoiceChangeComplete: (oldVoice: string, newVoice: string) => void
  handleSpeedChangeComplete: (oldRate: number, newRate: number) => void
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useTTSEngine({
  content,
  title,
  selectedVoice,
  playbackRate,
  setPlaybackRate,
  onStateChange,
}: UseTTSEngineParams): UseTTSEngineReturn {
  // ── State ─────────────────────────────────────────────────────────────
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isSupported] = useState(() => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  })
  const [usingGoogleTTS, setUsingGoogleTTS] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)

  // ── Refs ──────────────────────────────────────────────────────────────
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const nextAudioRef = useRef<HTMLAudioElement | null>(null)
  const textQueueRef = useRef<string[]>([])
  const currentIndexRef = useRef(-1)
  const playbackRateRef = useRef(playbackRate)
  const selectedVoiceRef = useRef(selectedVoice)
  const audioCacheRef = useRef<
    Map<
      number,
      {
        audioUrl: string
        audioBlob: Blob
        audioDuration: number
        playbackRate: number
        voice: string
      }
    >
  >(new Map())
  const prefetchInProgressRef = useRef<Set<number>>(new Set())
  const prefetchAbortControllerRef = useRef<AbortController | null>(null)
  const highlightTimeoutsRef = useRef<number[]>([])
  const timeUpdateIntervalRef = useRef<number | null>(null)

  // Ref to hold latest handler functions (avoids stale closures in event listeners)
  const handlersRef = useRef<{
    handlePlay?: () => void
    handlePause?: () => void
    handleStop?: () => void
    handlePreviousSentence?: () => void
    handleNextSentence?: () => void
  }>({})

  // ── Keep refs synced with props / state ───────────────────────────────
  useEffect(() => {
    playbackRateRef.current = playbackRate
    selectedVoiceRef.current = selectedVoice
    onStateChange?.({
      isPlaying,
      isPaused,
      playbackRate,
      currentIndex: currentIndexRef.current,
    })
  }, [isPlaying, isPaused, playbackRate, selectedVoice, onStateChange])

  // ── Internal helpers (audio cache & prefetch) ─────────────────────────

  const prefetchMultipleSections = async (startIndex: number, count: number = 3) => {
    const abortController = new AbortController()
    prefetchAbortControllerRef.current = abortController

    const prefetchPromises: Promise<void>[] = []

    for (let i = 0; i < count; i++) {
      const sectionIndex = startIndex + i

      const cached = audioCacheRef.current.get(sectionIndex)
      const isCacheValid =
        cached &&
        cached.playbackRate === playbackRateRef.current &&
        cached.voice === selectedVoiceRef.current

      if (cached && !isCacheValid) {
        URL.revokeObjectURL(cached.audioUrl)
        audioCacheRef.current.delete(sectionIndex)
      }

      if (
        prefetchInProgressRef.current.has(sectionIndex) ||
        isCacheValid ||
        sectionIndex >= textQueueRef.current.length
      ) {
        continue
      }

      prefetchInProgressRef.current.add(sectionIndex)

      const prefetchPromise = (async () => {
        try {
          const text = textQueueRef.current[sectionIndex]
          const response = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text,
              voice: selectedVoiceRef.current,
            }),
            signal: abortController.signal,
          })

          if (!response.ok) {
            console.error('[TTS] Prefetch failed for section', sectionIndex)
            return
          }

          const { audioContent, characterCount } = await response.json()
          updateTTSQuota(characterCount)

          const audioBlob = new Blob(
            [Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0))],
            { type: 'audio/mp3' },
          )
          const audioUrl = URL.createObjectURL(audioBlob)

          const tempAudio = new Audio(audioUrl)
          await new Promise((resolve) => {
            tempAudio.onloadedmetadata = () => resolve(true)
          })

          audioCacheRef.current.set(sectionIndex, {
            audioUrl,
            audioBlob,
            audioDuration: tempAudio.duration,
            playbackRate: playbackRateRef.current,
            voice: selectedVoiceRef.current,
          })
        } catch (error) {
          console.error('[TTS] Prefetch error for section', sectionIndex, error)
        } finally {
          prefetchInProgressRef.current.delete(sectionIndex)
        }
      })()

      prefetchPromises.push(prefetchPromise)
    }

    await Promise.allSettled(prefetchPromises)
  }

  const preInitializeNextAudio = async (nextIndex: number, customRate?: number) => {
    if (nextIndex >= textQueueRef.current.length) return

    const cachedAudio = audioCacheRef.current.get(nextIndex)
    if (!cachedAudio) return

    const audio = new Audio(cachedAudio.audioUrl)
    const rateToUse = customRate ?? playbackRateRef.current
    audio.playbackRate = rateToUse

    nextAudioRef.current = audio
  }

  const clearAudioCache = () => {
    audioCacheRef.current.forEach((cached) => {
      URL.revokeObjectURL(cached.audioUrl)
    })
    audioCacheRef.current.clear()
    prefetchInProgressRef.current.clear()
  }

  // ── Time tracking ─────────────────────────────────────────────────────

  const calculateTimeRemaining = (): number => {
    if (currentIndexRef.current < 0 || !textQueueRef.current.length) return 0

    const isAIVoice = usingGoogleTTS && selectedVoice !== 'browser'

    if (isAIVoice && audioRef.current) {
      const currentSectionRemaining = Math.max(
        0,
        audioRef.current.duration - audioRef.current.currentTime,
      )
      let remainingSectionsTime = 0

      for (let i = currentIndexRef.current + 1; i < textQueueRef.current.length; i++) {
        const cached = audioCacheRef.current.get(i)
        if (cached) {
          remainingSectionsTime += cached.audioDuration / playbackRate
        } else {
          const chars = textQueueRef.current[i].length
          remainingSectionsTime += (chars / 900) * 60 / playbackRate
        }
      }

      return currentSectionRemaining + remainingSectionsTime
    } else {
      let remainingChars = 0
      for (let i = currentIndexRef.current; i < textQueueRef.current.length; i++) {
        remainingChars += textQueueRef.current[i].length
      }
      return (remainingChars / 900) * 60 / playbackRate
    }
  }

  const startTimeTracking = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current)
    }

    const updateTime = () => {
      const remaining = calculateTimeRemaining()
      setTimeRemaining(remaining)
    }

    updateTime()
    timeUpdateIntervalRef.current = window.setInterval(updateTime, 1000)
  }

  const stopTimeTracking = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current)
      timeUpdateIntervalRef.current = null
    }
    setTimeRemaining(null)
  }

  // ── Word highlighting helpers ─────────────────────────────────────────

  const highlightWordInElement = (element: Element, _word: string, charIndex: number) => {
    const prevHighlight = element.querySelector('.tts-current-word')
    if (prevHighlight) {
      prevHighlight.classList.remove('tts-current-word')
    }

    const spans = element.querySelectorAll('span[data-word-index]')
    spans.forEach((span) => {
      const wordIndex = parseInt(span.getAttribute('data-word-index') || '0')
      if (wordIndex === charIndex) {
        span.classList.add('tts-current-word')
      }
    })
  }

  const clearWordHighlights = (element: Element) => {
    const highlights = element.querySelectorAll('.tts-current-word')
    highlights.forEach((el) => el.classList.remove('tts-current-word'))
  }

  // ── Core TTS functions ────────────────────────────────────────────────

  const speakWithGoogle = async (
    text: string,
    customRate?: number,
    customVoice?: string,
  ): Promise<boolean> => {
    try {
      const voiceToUse = customVoice || selectedVoice
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: voiceToUse,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[TTS] Google TTS API failed:', response.status, errorText)
        return false
      }

      const cachedAudio = audioCacheRef.current.get(currentIndexRef.current)

      let audioUrl: string
      let audioBlob: Blob

      if (cachedAudio) {
        audioUrl = cachedAudio.audioUrl
        audioBlob = cachedAudio.audioBlob
        audioCacheRef.current.delete(currentIndexRef.current)
      } else {
        const { audioContent, characterCount } = await response.json()
        updateTTSQuota(characterCount)

        audioBlob = new Blob(
          [Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0))],
          { type: 'audio/mp3' },
        )
        audioUrl = URL.createObjectURL(audioBlob)
      }

      if (audioRef.current) {
        audioRef.current.pause()
        URL.revokeObjectURL(audioRef.current.src)
      }

      const audio = new Audio(audioUrl)
      audioRef.current = audio

      const rateToUse = customRate ?? playbackRateRef.current
      audio.playbackRate = rateToUse

      const element = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      highlightTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
      highlightTimeoutsRef.current = []

      // Prefetch next 3 sections in background (sliding window)
      const nextIndex = currentIndexRef.current + 1
      if (nextIndex < textQueueRef.current.length && selectedVoice !== 'browser') {
        prefetchMultipleSections(nextIndex, 3).then(() => {
          preInitializeNextAudio(nextIndex, rateToUse)
        })
      }

      // Handle audio end
      audio.onended = () => {
        highlightTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
        highlightTimeoutsRef.current = []

        if (element) {
          clearWordHighlights(element)
        }

        URL.revokeObjectURL(audioUrl)
        currentIndexRef.current++

        const nextIdx = currentIndexRef.current
        if (nextAudioRef.current && nextIdx < textQueueRef.current.length) {
          document.querySelectorAll('.tts-current-word').forEach((el) => {
            el.classList.remove('tts-current-word')
          })

          audioRef.current = nextAudioRef.current
          nextAudioRef.current = null

          const nextElement = document.querySelector(`[data-tts-index="${nextIdx}"]`)
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            audioCacheRef.current.delete(nextIdx)
          }

          audioRef.current.onended = audio.onended
          audioRef.current.playbackRate = playbackRateRef.current
          audioRef.current.play()

          setUsingGoogleTTS(true)
          onStateChange?.({
            isPlaying: true,
            isPaused: false,
            playbackRate,
            currentIndex: nextIdx,
          })

          const furtherNext = nextIdx + 1
          if (furtherNext < textQueueRef.current.length && selectedVoice !== 'browser') {
            prefetchMultipleSections(furtherNext, 3).then(() => {
              preInitializeNextAudio(furtherNext, rateToUse)
            })
          }
        } else {
          speakNext(customRate)
        }
      }

      audio.onerror = () => {
        console.error('Audio playback error')
        URL.revokeObjectURL(audioUrl)
        return false
      }

      await audio.play()
      setUsingGoogleTTS(true)
      return true
    } catch (error) {
      console.error('[TTS] Google TTS error:', error)
      return false
    }
  }

  const speakNext = async (customRate?: number, customVoice?: string) => {
    if (currentIndexRef.current >= textQueueRef.current.length) {
      handleStop()
      return
    }

    const text = textQueueRef.current[currentIndexRef.current]
    if (!text) return

    const voiceToUse = customVoice || selectedVoice

    if (voiceToUse === 'browser') {
      setUsingGoogleTTS(false)
    } else {
      const hasQuota = hasQuotaAvailable(text.length)

      if (hasQuota) {
        const success = await speakWithGoogle(text, customRate, customVoice)
        if (success) {
          onStateChange?.({
            isPlaying: true,
            isPaused: false,
            playbackRate,
            currentIndex: currentIndexRef.current,
          })
          return
        }
      }
    }

    // Fallback to browser TTS
    setUsingGoogleTTS(false)
    const utterance = new SpeechSynthesisUtterance(text)

    const rateToUse = customRate ?? playbackRateRef.current
    utterance.rate = rateToUse
    utterance.pitch = 1.0
    utterance.volume = 1.0

    onStateChange?.({
      isPlaying: true,
      isPaused: false,
      playbackRate,
      currentIndex: currentIndexRef.current,
    })

    const element = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const wordMatch = text.slice(event.charIndex).match(/^\S+/)
        if (wordMatch) {
          const word = wordMatch[0]
          const sectionElement = document.querySelector(
            `[data-tts-index="${currentIndexRef.current}"]`,
          )
          if (sectionElement) {
            highlightWordInElement(sectionElement, word, event.charIndex)
          }
        }
      }
    }

    utterance.onend = () => {
      const sectionElement = document.querySelector(
        `[data-tts-index="${currentIndexRef.current}"]`,
      )
      if (sectionElement) {
        clearWordHighlights(sectionElement)
      }
      currentIndexRef.current++
      speakNext()
    }

    utterance.onerror = (event) => {
      if (event.error && event.error !== 'canceled' && event.error !== 'interrupted') {
        handleStop()
      }
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  // ── Public playback controls ──────────────────────────────────────────

  const handlePlay = useCallback(() => {
    if (!isSupported) return

    trackFirstTimeFeatureUse('tts', { location: 'inline-tts' })
    markTTSUsed()

    if (isPaused) {
      if (audioRef.current) {
        audioRef.current.play()
      } else {
        window.speechSynthesis.resume()
      }
      setIsPaused(false)
      setIsPlaying(true)
      startTimeTracking()
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      window.speechSynthesis.cancel()
      textQueueRef.current = buildTextQueue(content, title)
      currentIndexRef.current = 0
      setIsPlaying(true)
      setIsPaused(false)
      speakNext()
      startTimeTracking()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported, isPaused, content, title])

  const handlePause = useCallback(() => {
    if (!isSupported || !isPlaying) return

    if (audioRef.current) {
      audioRef.current.pause()
    } else {
      window.speechSynthesis.pause()
    }

    setIsPaused(true)
    setIsPlaying(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported, isPlaying])

  const handleStop = useCallback(() => {
    if (!isSupported) return

    const currentElement = document.querySelector(
      `[data-tts-index="${currentIndexRef.current}"]`,
    )
    if (currentElement) {
      clearWordHighlights(currentElement)
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    window.speechSynthesis.cancel()

    setIsPlaying(false)
    setIsPaused(false)
    setUsingGoogleTTS(false)
    currentIndexRef.current = -1
    textQueueRef.current = []
    stopTimeTracking()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported])

  const handlePreviousSentence = useCallback(() => {
    if (!isSupported) return
    if (!textQueueRef.current.length) return
    if (!isPlaying && !isPaused) return

    const currentElement = document.querySelector(
      `[data-tts-index="${currentIndexRef.current}"]`,
    )
    if (currentElement) {
      clearWordHighlights(currentElement)
    }

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    window.speechSynthesis.cancel()

    if (currentIndexRef.current > 0) {
      currentIndexRef.current--
    }

    setIsPlaying(true)
    setIsPaused(false)
    speakNext()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported, isPlaying, isPaused])

  const handleNextSentence = useCallback(() => {
    if (!isSupported) return
    if (!textQueueRef.current.length) return
    if (!isPlaying && !isPaused) return

    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    window.speechSynthesis.cancel()

    if (currentIndexRef.current < textQueueRef.current.length - 1) {
      currentIndexRef.current++
    }

    setIsPlaying(true)
    setIsPaused(false)
    speakNext()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported, isPlaying, isPaused])

  // ── Settings change handlers ──────────────────────────────────────────

  const handleVoiceChangeComplete = useCallback(
    (oldVoice: string, newVoice: string) => {
      selectedVoiceRef.current = newVoice

      const oldVoiceWasAI = oldVoice !== 'browser'
      const newVoiceIsAI = newVoice !== 'browser'

      if (oldVoiceWasAI || newVoiceIsAI) {
        if (prefetchAbortControllerRef.current) {
          prefetchAbortControllerRef.current.abort()
          prefetchAbortControllerRef.current = null
        }
        clearAudioCache()
        nextAudioRef.current = null
      }

      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
        window.speechSynthesis.cancel()
        speakNext(undefined, newVoice)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPlaying],
  )

  const handleSpeedChangeComplete = useCallback(
    (_oldRate: number, newRate: number) => {
      playbackRateRef.current = newRate

      if (selectedVoice !== 'browser') {
        if (prefetchAbortControllerRef.current) {
          prefetchAbortControllerRef.current.abort()
          prefetchAbortControllerRef.current = null
        }
        clearAudioCache()
        nextAudioRef.current = null
      }

      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
        window.speechSynthesis.cancel()
        speakNext(newRate)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPlaying, selectedVoice],
  )

  // ── Sync handler refs ─────────────────────────────────────────────────
  useEffect(() => {
    handlersRef.current = {
      handlePlay,
      handlePause,
      handleStop,
      handlePreviousSentence,
      handleNextSentence,
    }
  }, [handlePlay, handlePause, handleStop, handlePreviousSentence, handleNextSentence])

  // ── Window custom events ──────────────────────────────────────────────
  useEffect(() => {
    const handlePlayEvent = () => handlersRef.current.handlePlay?.()
    const handlePauseEvent = () => handlersRef.current.handlePause?.()
    const handleStopEvent = () => handlersRef.current.handleStop?.()
    const handleSpeedChangeEvent = (e: Event) => {
      const rate = (e as CustomEvent).detail
      setPlaybackRate(rate)
    }
    const handlePreviousEvent = () => handlersRef.current.handlePreviousSentence?.()
    const handleNextEvent = () => handlersRef.current.handleNextSentence?.()

    window.addEventListener('tts-play', handlePlayEvent)
    window.addEventListener('tts-pause', handlePauseEvent)
    window.addEventListener('tts-stop', handleStopEvent)
    window.addEventListener('tts-speed-change', handleSpeedChangeEvent)
    window.addEventListener('tts-previous', handlePreviousEvent)
    window.addEventListener('tts-next', handleNextEvent)

    return () => {
      window.removeEventListener('tts-play', handlePlayEvent)
      window.removeEventListener('tts-pause', handlePauseEvent)
      window.removeEventListener('tts-stop', handleStopEvent)
      window.removeEventListener('tts-speed-change', handleSpeedChangeEvent)
      window.removeEventListener('tts-previous', handlePreviousEvent)
      window.removeEventListener('tts-next', handleNextEvent)

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
    // setPlaybackRate is a stable setter from useTTSSettings
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Return ────────────────────────────────────────────────────────────

  return {
    isPlaying,
    isPaused,
    isSupported,
    usingGoogleTTS,
    timeRemaining,
    currentIndex: currentIndexRef.current,
    totalSections: textQueueRef.current.length,
    handlePlay,
    handlePause,
    handleStop,
    handlePreviousSentence,
    handleNextSentence,
    handleVoiceChangeComplete,
    handleSpeedChangeComplete,
  }
}
