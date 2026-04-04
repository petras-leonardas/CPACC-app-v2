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
  /** Called when an audio playback error occurs, allowing the UI to show a message */
  onError?: (message: string) => void
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
  onError,
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
  const primaryAbortControllerRef = useRef<AbortController | null>(null)
  const speakSequenceRef = useRef(0)
  const speechSynthKeepaliveRef = useRef<number | null>(null)
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
    // Abort previous in-flight prefetch batch before starting a new one
    prefetchAbortControllerRef.current?.abort()
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
          await new Promise<boolean>((resolve, reject) => {
            // If metadata is already loaded (cached blob URL), resolve immediately
            if (tempAudio.readyState >= 1) {
              resolve(true)
              return
            }
            tempAudio.onloadedmetadata = () => resolve(true)
            tempAudio.onerror = () => reject(new Error('Failed to load audio metadata'))
            setTimeout(() => reject(new Error('Audio metadata load timeout')), 5000)
          })
          // Release the temp Audio element's media resource
          tempAudio.onloadedmetadata = null
          tempAudio.onerror = null
          tempAudio.src = ''

          audioCacheRef.current.set(sectionIndex, {
            audioUrl,
            audioBlob,
            audioDuration: tempAudio.duration,
            playbackRate: playbackRateRef.current,
            voice: selectedVoiceRef.current,
          })
        } catch (error) {
          // Don't log abort errors — they're expected when voice/speed changes or component unmounts
          if (error instanceof DOMException && error.name === 'AbortError') return
          console.error('[TTS] Prefetch error for section', sectionIndex, error)
        } finally {
          prefetchInProgressRef.current.delete(sectionIndex)
        }
      })()

      prefetchPromises.push(prefetchPromise)
    }

    await Promise.allSettled(prefetchPromises)
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
    sequenceId: number,
    customRate?: number,
    customVoice?: string,
  ): Promise<boolean> => {
    try {
      const voiceToUse = customVoice || selectedVoiceRef.current

      // ── BUG-2 FIX: Check cache BEFORE fetching ──────────────────────
      let audioUrl: string
      let audioBlob: Blob
      const cachedAudio = audioCacheRef.current.get(currentIndexRef.current)
      const isCacheValid =
        cachedAudio &&
        cachedAudio.voice === voiceToUse

      if (cachedAudio && isCacheValid) {
        audioUrl = cachedAudio.audioUrl
        audioBlob = cachedAudio.audioBlob
        audioCacheRef.current.delete(currentIndexRef.current)
      } else {
        // Cache miss or stale — fetch from API

        // ── BUG-4 FIX: AbortController for primary fetch ─────────────
        primaryAbortControllerRef.current?.abort()
        const abortController = new AbortController()
        primaryAbortControllerRef.current = abortController

        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, voice: voiceToUse }),
          signal: abortController.signal,
        })

        // ── BUG-3 FIX: Bail if a newer speakNext has been invoked ────
        if (sequenceId !== speakSequenceRef.current) return false

        if (!response.ok) {
          const errorText = await response.text()
          console.error('[TTS] Google TTS API failed:', response.status, errorText)
          return false
        }

        const { audioContent, characterCount } = await response.json()

        // Check sequence again after reading body
        if (sequenceId !== speakSequenceRef.current) return false

        updateTTSQuota(characterCount)

        audioBlob = new Blob(
          [Uint8Array.from(atob(audioContent), (c) => c.charCodeAt(0))],
          { type: 'audio/mp3' },
        )
        audioUrl = URL.createObjectURL(audioBlob)
      }

      // ── BUG-3 FIX: Final sequence check before playing ─────────────
      if (sequenceId !== speakSequenceRef.current) {
        URL.revokeObjectURL(audioUrl)
        return false
      }

      // ── BUG-1 FIX: Reuse existing Audio element for Safari ─────────
      // Safari blocks audio.play() on NEW Audio elements from non-user-gesture
      // contexts (like onended). Reusing the same element that was originally
      // started by a user gesture preserves the autoplay privilege.
      let audio: HTMLAudioElement
      if (audioRef.current) {
        audio = audioRef.current
        // Revoke the old blob URL before swapping src
        if (audio.src && audio.src.startsWith('blob:')) {
          URL.revokeObjectURL(audio.src)
        }
        audio.src = audioUrl
      } else {
        audio = new Audio(audioUrl)
        audioRef.current = audio
      }

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
      if (nextIndex < textQueueRef.current.length && voiceToUse !== 'browser') {
        prefetchMultipleSections(nextIndex, 3).catch(() => {
          // Prefetch is best-effort — swallow errors
        })
      }

      // ── Handle audio end ────────────────────────────────────────────
      // BUG-1 FIX: Reuse the same Audio element instead of swapping to
      // nextAudioRef. This maintains Safari's autoplay privilege chain.
      audio.onended = () => {
        highlightTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))
        highlightTimeoutsRef.current = []

        if (element) {
          clearWordHighlights(element)
        }

        currentIndexRef.current++
        const nextIdx = currentIndexRef.current

        if (nextIdx < textQueueRef.current.length) {
          const cachedNext = audioCacheRef.current.get(nextIdx)
          if (cachedNext && cachedNext.voice === selectedVoiceRef.current) {
            // Cache hit — reuse same Audio element, just swap src
            document.querySelectorAll('.tts-current-word').forEach((el) => {
              el.classList.remove('tts-current-word')
            })

            const nextElement = document.querySelector(`[data-tts-index="${nextIdx}"]`)
            if (nextElement) {
              nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }

            // Revoke old src, set new src on SAME element
            if (audio.src && audio.src.startsWith('blob:')) {
              URL.revokeObjectURL(audio.src)
            }
            audio.src = cachedNext.audioUrl
            audio.playbackRate = playbackRateRef.current
            audioCacheRef.current.delete(nextIdx)

            audio.play().catch(() => {
              // Playback blocked (e.g. autoplay policy or navigation) — reset state
              handleStop()
            })

            setUsingGoogleTTS(true)
            onStateChange?.({
              isPlaying: true,
              isPaused: false,
              playbackRate: playbackRateRef.current,
              currentIndex: nextIdx,
            })

            // Prefetch further ahead
            const furtherNext = nextIdx + 1
            if (furtherNext < textQueueRef.current.length && selectedVoiceRef.current !== 'browser') {
              prefetchMultipleSections(furtherNext, 3).catch(() => {})
            }
          } else {
            // Cache miss — delegate to speakNext for a fresh fetch
            // Revoke current blob URL before speakNext replaces audio.src
            if (audio.src && audio.src.startsWith('blob:')) {
              URL.revokeObjectURL(audio.src)
            }
            speakNext(customRate)
          }
        } else {
          // No more sections — playback complete
          if (audio.src && audio.src.startsWith('blob:')) {
            URL.revokeObjectURL(audio.src)
          }
          handleStop()
        }
      }

      // ── BUG-5 FIX: Reset playback state on audio error ─────────────
      audio.onerror = () => {
        console.error('[TTS] Audio playback error')
        if (audio.src && audio.src.startsWith('blob:')) {
          URL.revokeObjectURL(audio.src)
        }
        handleStop()
        onError?.('Audio playback failed. Please try again.')
      }

      await audio.play()
      setUsingGoogleTTS(true)
      return true
    } catch (error) {
      // BUG-4: Don't treat abort as an error
      if (error instanceof DOMException && error.name === 'AbortError') return false
      console.error('[TTS] Google TTS error:', error)
      return false
    }
  }

  const speakNext = async (customRate?: number, customVoice?: string) => {
    // ── BUG-3 FIX: Increment sequence to cancel any previous in-flight speakNext ──
    const sequenceId = ++speakSequenceRef.current

    // Clear Chrome speechSynthesis keepalive if running
    if (speechSynthKeepaliveRef.current) {
      clearInterval(speechSynthKeepaliveRef.current)
      speechSynthKeepaliveRef.current = null
    }

    if (currentIndexRef.current >= textQueueRef.current.length) {
      handleStop()
      return
    }

    const text = textQueueRef.current[currentIndexRef.current]
    if (!text) return

    const voiceToUse = customVoice || selectedVoiceRef.current

    if (voiceToUse === 'browser') {
      setUsingGoogleTTS(false)
    } else {
      const hasQuota = hasQuotaAvailable(text.length)

      if (hasQuota) {
        const success = await speakWithGoogle(text, sequenceId, customRate, customVoice)

        // BUG-3: Check if we were superseded while awaiting
        if (sequenceId !== speakSequenceRef.current) return

        if (success) {
          onStateChange?.({
            isPlaying: true,
            isPaused: false,
            playbackRate: playbackRateRef.current,
            currentIndex: currentIndexRef.current,
          })
          return
        }
      }
    }

    // BUG-3: Check sequence again before falling back to browser TTS
    if (sequenceId !== speakSequenceRef.current) return

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
      playbackRate: playbackRateRef.current,
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
      // Clear Chrome keepalive before advancing
      if (speechSynthKeepaliveRef.current) {
        clearInterval(speechSynthKeepaliveRef.current)
        speechSynthKeepaliveRef.current = null
      }
      currentIndexRef.current++
      speakNext()
    }

    utterance.onerror = (event) => {
      if (event.error && event.error !== 'canceled' && event.error !== 'interrupted') {
        if (speechSynthKeepaliveRef.current) {
          clearInterval(speechSynthKeepaliveRef.current)
          speechSynthKeepaliveRef.current = null
        }
        handleStop()
        onError?.('Text-to-speech playback failed. Please try again.')
      }
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)

    // ── BUG-10 FIX: Chrome speechSynthesis 15-second timeout workaround ──
    // Chrome has a bug where speechSynthesis stops firing events after ~15s.
    // Periodically calling pause()/resume() keeps the speech alive.
    // Skip on Safari — pause()/resume() is unreliable and can permanently
    // freeze speech instead of keeping it alive.
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    if (!isSafari) {
      speechSynthKeepaliveRef.current = window.setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          window.speechSynthesis.pause()
          window.speechSynthesis.resume()
        }
      }, 10000)
    }
  }

  // ── Public playback controls ──────────────────────────────────────────

  const handlePlay = useCallback(() => {
    if (!isSupported) return

    trackFirstTimeFeatureUse('tts', { location: 'inline-tts' })
    markTTSUsed()

    if (isPaused) {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Playback blocked — reset state
          handleStop()
        })
      } else {
        window.speechSynthesis.resume()
      }
      setIsPaused(false)
      setIsPlaying(true)
      startTimeTracking()
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(audioRef.current.src)
        }
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
      if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
        URL.revokeObjectURL(audioRef.current.src)
      }
      audioRef.current = null
    }
    window.speechSynthesis.cancel()

    // Abort any in-flight primary fetch
    primaryAbortControllerRef.current?.abort()
    primaryAbortControllerRef.current = null

    // Invalidate any in-flight speakNext
    speakSequenceRef.current++

    // Clear Chrome speechSynthesis keepalive
    if (speechSynthKeepaliveRef.current) {
      clearInterval(speechSynthKeepaliveRef.current)
      speechSynthKeepaliveRef.current = null
    }

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
      if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
        URL.revokeObjectURL(audioRef.current.src)
      }
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
      if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
        URL.revokeObjectURL(audioRef.current.src)
      }
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
        primaryAbortControllerRef.current?.abort()
        clearAudioCache()
      }

      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause()
          if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
            URL.revokeObjectURL(audioRef.current.src)
          }
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
        primaryAbortControllerRef.current?.abort()
        clearAudioCache()
      }

      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause()
          if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
            URL.revokeObjectURL(audioRef.current.src)
          }
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

      // Stop any playing audio element and revoke its blob URL
      if (audioRef.current) {
        audioRef.current.pause()
        if (audioRef.current.src && audioRef.current.src.startsWith('blob:')) {
          URL.revokeObjectURL(audioRef.current.src)
        }
        audioRef.current.src = ''
        audioRef.current = null
      }

      // Revoke all cached blob URLs to free memory
      for (const [, cached] of audioCacheRef.current) {
        URL.revokeObjectURL(cached.audioUrl)
      }
      audioCacheRef.current.clear()

      // Abort any in-flight prefetch requests
      if (prefetchAbortControllerRef.current) {
        prefetchAbortControllerRef.current.abort()
      }

      // Abort any in-flight primary fetch
      if (primaryAbortControllerRef.current) {
        primaryAbortControllerRef.current.abort()
      }

      // Invalidate any in-flight speakNext
      speakSequenceRef.current++

      // Clear Chrome speechSynthesis keepalive
      if (speechSynthKeepaliveRef.current) {
        clearInterval(speechSynthKeepaliveRef.current)
      }

      // Clear highlight timeouts
      highlightTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout))

      // Clear time-tracking interval
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current)
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
