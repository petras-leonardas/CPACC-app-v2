import { useState, useEffect, useRef } from 'react'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { DetailedTopicContent } from '../data/topicContent'
import { updateTTSQuota, hasQuotaAvailable } from '../utils/ttsQuota'

interface TextToSpeechProps {
  content: DetailedTopicContent
  title: string
  onStateChange?: (state: { isPlaying: boolean; isPaused: boolean; playbackRate: number; currentIndex: number }) => void
  isHeaderMinimized?: boolean
}

export function TextToSpeech({ content, title, onStateChange, isHeaderMinimized = false }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(() => {
    // Load saved speed from localStorage, default to 2.0
    const saved = localStorage.getItem('ttsPlaybackSpeed')
    return saved ? parseFloat(saved) : 2.0
  })
  const [selectedVoice, setSelectedVoice] = useState(() => {
    // Load saved voice from localStorage, default to browser
    const saved = localStorage.getItem('ttsVoice')
    return saved || 'browser'
  })
  const [isSupported] = useState(() => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  })
  const [usingGoogleTTS, setUsingGoogleTTS] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const timeUpdateIntervalRef = useRef<number | null>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settingsView, setSettingsView] = useState<'main' | 'voice' | 'speed'>('main')
  const settingsMenuRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() => {
    playbackRateRef.current = playbackRate // Keep ref synced with state
    selectedVoiceRef.current = selectedVoice // Keep ref synced with state
    onStateChange?.({ isPlaying, isPaused, playbackRate, currentIndex: currentIndexRef.current })
  }, [isPlaying, isPaused, playbackRate, selectedVoice, onStateChange])
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const nextAudioRef = useRef<HTMLAudioElement | null>(null) // Pre-initialized next audio for instant playback
  const textQueueRef = useRef<string[]>([])
  const currentIndexRef = useRef(-1)
  const playbackRateRef = useRef(playbackRate) // Always has current speed for closures
  const selectedVoiceRef = useRef(selectedVoice) // Always has current voice for closures
  const audioCacheRef = useRef<Map<number, { audioUrl: string; audioBlob: Blob; audioDuration: number; playbackRate: number; voice: string }>>(new Map())
  const prefetchInProgressRef = useRef<Set<number>>(new Set())
  const prefetchAbortControllerRef = useRef<AbortController | null>(null)
  const highlightTimeoutsRef = useRef<number[]>([])
  const handlersRef = useRef<{
    handlePlay?: () => void
    handlePause?: () => void
    handleStop?: () => void
    handlePreviousSentence?: () => void
    handleNextSentence?: () => void
  }>({})

  const buildTextQueue = () => {
    const queue: string[] = []
    
    // Start with the page title for context
    queue.push(title)
    
    content.introduction.forEach(para => queue.push(para))
    
    if (content.learningPoints) {
      queue.push("Understanding these models helps you:")
      content.learningPoints.forEach(point => queue.push(point))
    }
    
    content.sections.forEach(section => {
      queue.push(section.heading)
      
      if (Array.isArray(section.content)) {
        section.content.forEach(para => queue.push(para))
      } else {
        queue.push(section.content)
      }
      
      if (section.subsections) {
        section.subsections.forEach(subsection => {
          queue.push(subsection.heading)
          if (Array.isArray(subsection.content)) {
            subsection.content.forEach(item => queue.push(item))
          } else {
            queue.push(subsection.content)
          }
        })
      }
    })
    
    return queue
  }

  // Prefetch multiple sections ahead (sliding window)
  const prefetchMultipleSections = async (startIndex: number, count: number = 3) => {
    // Create new abort controller for this batch of prefetches
    const abortController = new AbortController()
    prefetchAbortControllerRef.current = abortController
    
    const prefetchPromises: Promise<void>[] = []
    
    for (let i = 0; i < count; i++) {
      const sectionIndex = startIndex + i
      
      // Check if cached audio is valid (exists AND matches current playback rate AND voice)
      const cached = audioCacheRef.current.get(sectionIndex)
      const isCacheValid = cached && 
                          cached.playbackRate === playbackRateRef.current && 
                          cached.voice === selectedVoiceRef.current
      
      console.log('[TTS Cache Validation]', {
        index: sectionIndex,
        hasCached: !!cached,
        cachedRate: cached?.playbackRate,
        cachedVoice: cached?.voice,
        currentRate: playbackRateRef.current,
        currentVoice: selectedVoiceRef.current,
        isValid: isCacheValid
      })
      
      // Clear mismatched cache (wrong speed or wrong voice)
      if (cached && !isCacheValid) {
        console.log('[TTS Cache] Invalidating mismatched cache for index', sectionIndex, 
          '(rate:', cached.playbackRate, 'vs', playbackRateRef.current, 
          'voice:', cached.voice, 'vs', selectedVoiceRef.current, ')')
        URL.revokeObjectURL(cached.audioUrl)
        audioCacheRef.current.delete(sectionIndex)
      }
      
      // Don't prefetch if already in progress, validly cached, or beyond queue
      if (prefetchInProgressRef.current.has(sectionIndex) || 
          isCacheValid ||
          sectionIndex >= textQueueRef.current.length) {
        continue
      }
      
      prefetchInProgressRef.current.add(sectionIndex)
      
      const prefetchPromise = (async () => {
        try {
          console.log('[TTS] Prefetching section', sectionIndex, 'at rate', playbackRateRef.current)
          const text = textQueueRef.current[sectionIndex]
          const response = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text,
              voice: selectedVoiceRef.current
            }),
            signal: abortController.signal
          })
          
          if (!response.ok) {
            console.error('[TTS] Prefetch failed for section', sectionIndex)
            return
          }
          
          const { audioContent, characterCount } = await response.json()
          
          // Update quota
          updateTTSQuota(characterCount)
          
          // Convert base64 to audio blob
          const audioBlob = new Blob(
            [Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))],
            { type: 'audio/mp3' }
          )
          const audioUrl = URL.createObjectURL(audioBlob)
          
          // Create temporary audio to get duration
          const tempAudio = new Audio(audioUrl)
          await new Promise((resolve) => {
            tempAudio.onloadedmetadata = () => resolve(true)
          })
          
          // Cache the audio data with playback rate and voice tracking
          audioCacheRef.current.set(sectionIndex, {
            audioUrl,
            audioBlob,
            audioDuration: tempAudio.duration,
            playbackRate: playbackRateRef.current,
            voice: selectedVoiceRef.current
          })
          
          console.log('[TTS Prefetch Complete]', {
            index: sectionIndex,
            rate: playbackRateRef.current,
            voice: selectedVoiceRef.current,
            cacheSize: audioCacheRef.current.size
          })
          
          console.log('[TTS] Prefetched and cached section', sectionIndex)
        } catch (error) {
          console.error('[TTS] Prefetch error for section', sectionIndex, error)
        } finally {
          prefetchInProgressRef.current.delete(sectionIndex)
        }
      })()
      
      prefetchPromises.push(prefetchPromise)
    }
    
    // Run all prefetches in parallel
    await Promise.allSettled(prefetchPromises)
  }
  
  // Pre-initialize next audio element for instant playback
  const preInitializeNextAudio = async (nextIndex: number, customRate?: number) => {
    if (nextIndex >= textQueueRef.current.length) return
    
    const cachedAudio = audioCacheRef.current.get(nextIndex)
    if (!cachedAudio) return // Only pre-init if already cached
    
    console.log('[TTS] Pre-initializing audio for section', nextIndex)
    
    // Create and configure audio element
    const audio = new Audio(cachedAudio.audioUrl)
    const rateToUse = customRate ?? playbackRateRef.current
    audio.playbackRate = rateToUse
    
    // Store reference
    nextAudioRef.current = audio
  }
  
  // Clear audio cache (on voice/speed change)
  const clearAudioCache = () => {
    console.log('[TTS Cache Clear] Clearing', audioCacheRef.current.size, 'cached entries')
    console.log('[TTS Cache Clear] Clearing', prefetchInProgressRef.current.size, 'in-progress prefetches')
    // Revoke all cached URLs to free memory
    audioCacheRef.current.forEach((cached) => {
      URL.revokeObjectURL(cached.audioUrl)
    })
    audioCacheRef.current.clear()
    prefetchInProgressRef.current.clear()
  }

  // Calculate time remaining based on current progress
  const calculateTimeRemaining = (): number => {
    if (currentIndexRef.current < 0 || !textQueueRef.current.length) return 0
    
    const isAIVoice = usingGoogleTTS && selectedVoice !== 'browser'
    
    if (isAIVoice && audioRef.current) {
      // AI voice: use actual audio duration
      const currentSectionRemaining = Math.max(0, audioRef.current.duration - audioRef.current.currentTime)
      let remainingSectionsTime = 0
      
      // Add time for remaining sections
      for (let i = currentIndexRef.current + 1; i < textQueueRef.current.length; i++) {
        const cached = audioCacheRef.current.get(i)
        if (cached) {
          remainingSectionsTime += cached.audioDuration / playbackRate
        } else {
          // Estimate for uncached
          const chars = textQueueRef.current[i].length
          remainingSectionsTime += (chars / 900 * 60) / playbackRate
        }
      }
      
      return currentSectionRemaining + remainingSectionsTime
    } else {
      // Browser voice: estimate remaining time
      let remainingChars = 0
      for (let i = currentIndexRef.current; i < textQueueRef.current.length; i++) {
        remainingChars += textQueueRef.current[i].length
      }
      return (remainingChars / 900 * 60) / playbackRate
    }
  }

  // Update time remaining periodically
  const startTimeTracking = () => {
    // Clear any existing interval
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current)
    }
    
    // Update time remaining every second
    const updateTime = () => {
      const remaining = calculateTimeRemaining()
      setTimeRemaining(remaining)
    }
    
    updateTime() // Initial update
    timeUpdateIntervalRef.current = window.setInterval(updateTime, 1000)
  }

  const stopTimeTracking = () => {
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current)
      timeUpdateIntervalRef.current = null
    }
    setTimeRemaining(null)
  }

  // Format seconds to mm:ss or hh:mm:ss
  const formatTime = (seconds: number): string => {
    if (!seconds || seconds < 0) return '0:00'
    
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Google Cloud TTS function
  const speakWithGoogle = async (text: string, customRate?: number, customVoice?: string): Promise<boolean> => {
    try {
      const voiceToUse = customVoice || selectedVoice
      console.log('[TTS] Attempting Google TTS with voice:', voiceToUse)
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voice: voiceToUse
        })
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[TTS] Google TTS API failed:', response.status, errorText)
        return false
      }

      // Check if this section is already cached
      const cachedAudio = audioCacheRef.current.get(currentIndexRef.current)
      
      let audioUrl: string
      let audioBlob: Blob
      
      if (cachedAudio) {
        // Use cached audio - instant playback!
        console.log('[TTS] Using cached audio for section', currentIndexRef.current)
        audioUrl = cachedAudio.audioUrl
        audioBlob = cachedAudio.audioBlob
        // Remove from cache after use
        audioCacheRef.current.delete(currentIndexRef.current)
      } else {
        // Fetch fresh audio
        const { audioContent, characterCount } = await response.json()
        
        // Update quota
        updateTTSQuota(characterCount)
        
        // Convert base64 to audio
        audioBlob = new Blob(
          [Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))],
          { type: 'audio/mp3' }
        )
        audioUrl = URL.createObjectURL(audioBlob)
      }
      
      // Create audio element
      if (audioRef.current) {
        audioRef.current.pause()
        URL.revokeObjectURL(audioRef.current.src)
      }
      
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      
      // Apply playback rate (Google TTS doesn't support rate, so adjust audio speed)
      const rateToUse = customRate ?? playbackRateRef.current
      audio.playbackRate = rateToUse
      
      console.log('[TTS Playing]', {
        index: currentIndexRef.current,
        fromCache: !!cachedAudio,
        rate: audio.playbackRate,
        expectedRate: playbackRateRef.current
      })
      
      // Auto-scroll to highlighted element
      const element = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      
      // Clear any previous highlight timeouts
      highlightTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      highlightTimeoutsRef.current = []
      
      // Note: Word-level highlighting removed for AI voices due to inaccurate timing estimation
      // Only section-level highlighting is used (via data-tts-index and currentIndex state)
      
      // Trigger prefetch of next 3 sections in background (sliding window)
      const nextIndex = currentIndexRef.current + 1
      if (nextIndex < textQueueRef.current.length && selectedVoice !== 'browser') {
        // Prefetch 3 sections ahead in parallel
        prefetchMultipleSections(nextIndex, 3).then(() => {
          // Once immediate next is cached, pre-initialize it for instant playback
          preInitializeNextAudio(nextIndex, rateToUse)
        })
      }
      
      // No word-level highlighting for AI voices - metadata load handler removed
      
      // Handle audio end
      audio.onended = () => {
        // Clear any pending highlight timeouts
        highlightTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
        highlightTimeoutsRef.current = []
        
        // Clear word highlights from current section
        if (element) {
          clearWordHighlights(element)
        }
        
        URL.revokeObjectURL(audioUrl)
        currentIndexRef.current++
        
        // Check if we have pre-initialized next audio ready
        const nextIndex = currentIndexRef.current
        if (nextAudioRef.current && nextIndex < textQueueRef.current.length) {
          console.log('[TTS] Using pre-initialized audio for instant playback')
          
          // Clear ALL word highlights from document before starting new section
          document.querySelectorAll('.tts-current-word').forEach(el => {
            el.classList.remove('tts-current-word')
          })
          
          // Move pre-initialized audio to current
          audioRef.current = nextAudioRef.current
          nextAudioRef.current = null
          
          // Set up section scroll for pre-initialized audio
          const nextElement = document.querySelector(`[data-tts-index="${nextIndex}"]`)
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            // Remove from cache after use
            audioCacheRef.current.delete(nextIndex)
          }
          
          // Set up onended handler for the new audio
          audioRef.current.onended = audio.onended
          
          // Apply current playback rate (in case it changed since pre-initialization)
          audioRef.current.playbackRate = playbackRateRef.current
          
          console.log('[TTS Pre-init Audio] Applying rate:', playbackRateRef.current)
          
          // Play immediately - zero latency!
          audioRef.current.play()
          
          // Update state to trigger section highlighting
          setUsingGoogleTTS(true)
          onStateChange?.({ isPlaying: true, isPaused: false, playbackRate, currentIndex: nextIndex })
          
          // Prefetch next sections
          const furtherNext = nextIndex + 1
          if (furtherNext < textQueueRef.current.length && selectedVoice !== 'browser') {
            prefetchMultipleSections(furtherNext, 3).then(() => {
              preInitializeNextAudio(furtherNext, rateToUse)
            })
          }
        } else {
          // Fallback to normal flow if no pre-initialized audio
          speakNext(customRate)
        }
      }
      
      audio.onerror = () => {
        console.error('Audio playback error')
        URL.revokeObjectURL(audioUrl)
        return false
      }
      
      await audio.play()
      console.log('[TTS] Successfully playing Google TTS audio')
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
    
    // Check if user selected browser voice explicitly
    if (voiceToUse === 'browser') {
      // Force browser TTS
      setUsingGoogleTTS(false)
    } else {
      // Check quota and try Google TTS first
      const hasQuota = hasQuotaAvailable(text.length)
      
      if (hasQuota) {
        const success = await speakWithGoogle(text, customRate, customVoice)
        if (success) {
          onStateChange?.({ isPlaying: true, isPaused: false, playbackRate, currentIndex: currentIndexRef.current })
          return
        }
        // If Google fails, fall through to browser TTS
      }
    }
    
    // Fallback to browser TTS (existing code)
    setUsingGoogleTTS(false)
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Use custom rate if provided (for immediate speed changes), otherwise use ref (always current)
    const rateToUse = customRate ?? playbackRateRef.current
    utterance.rate = rateToUse
    utterance.pitch = 1.0
    utterance.volume = 1.0
    
    // Notify about current reading position
    onStateChange?.({ isPlaying: true, isPaused: false, playbackRate, currentIndex: currentIndexRef.current })
    
    // Auto-scroll to highlighted element
    const element = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    
    // Track word boundaries for word-level highlighting
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        // Find the word at this character position
        const wordMatch = text.slice(event.charIndex).match(/^\S+/)
        if (wordMatch) {
          const word = wordMatch[0]
          // Highlight the word in the current section
          const sectionElement = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
          if (sectionElement) {
            highlightWordInElement(sectionElement, word, event.charIndex)
          }
        }
      }
    }
    
    utterance.onend = () => {
      // Clear word highlights when section ends
      const sectionElement = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
      if (sectionElement) {
        clearWordHighlights(sectionElement)
      }
      currentIndexRef.current++
      speakNext()
    }
    
    utterance.onerror = (event) => {
      // Only stop on real errors, not on cancel/interrupt
      if (event.error && event.error !== 'canceled' && event.error !== 'interrupted') {
        handleStop()
      }
    }
    
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const highlightWordInElement = (element: Element, _word: string, charIndex: number) => {
    // Remove previous word highlight
    const prevHighlight = element.querySelector('.tts-current-word')
    if (prevHighlight) {
      prevHighlight.classList.remove('tts-current-word')
    }

    // Find and highlight the current word span
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
    highlights.forEach(el => el.classList.remove('tts-current-word'))
  }

  const handlePlay = () => {
    if (!isSupported) return
    
    if (isPaused) {
      // Resume based on current engine
      if (audioRef.current) {
        audioRef.current.play()
      } else {
        window.speechSynthesis.resume()
      }
      setIsPaused(false)
      setIsPlaying(true)
      startTimeTracking()
    } else {
      // Cancel any existing playback before starting fresh
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      window.speechSynthesis.cancel()
      textQueueRef.current = buildTextQueue()
      currentIndexRef.current = 0
      setIsPlaying(true)
      setIsPaused(false)
      speakNext()
      startTimeTracking()
    }
  }

  const handlePause = () => {
    if (!isSupported || !isPlaying) return
    
    // Pause based on current engine
    if (audioRef.current) {
      audioRef.current.pause()
    } else {
      window.speechSynthesis.pause()
    }
    
    setIsPaused(true)
    setIsPlaying(false)
    // Keep time tracking running when paused so user can see remaining time
  }

  const handleStop = () => {
    if (!isSupported) return
    
    // Clear highlights from current section before stopping
    const currentElement = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
    if (currentElement) {
      clearWordHighlights(currentElement)
    }
    
    // Stop both engines
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
  }

  const handlePreviousSentence = () => {
    if (!isSupported) return
    if (!textQueueRef.current.length) return
    if (!isPlaying && !isPaused) return

    // Clear word highlights from current section
    const currentElement = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
    if (currentElement) {
      clearWordHighlights(currentElement)
    }

    // Cancel current playback
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
  }

  const handleNextSentence = () => {
    if (!isSupported) return
    if (!textQueueRef.current.length) return
    if (!isPlaying && !isPaused) return

    // Clear word highlights from current section
    const currentElement = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
    if (currentElement) {
      clearWordHighlights(currentElement)
    }

    // Cancel current playback
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
  }

  useEffect(() => {
    handlersRef.current = { handlePlay, handlePause, handleStop, handlePreviousSentence, handleNextSentence }
  }, [handlePlay, handlePause, handleStop, handlePreviousSentence, handleNextSentence])

  // Close settings menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsMenuRef.current && !settingsMenuRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSettingsOpen])

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
  }, [])

  if (!isSupported) {
    return null
  }

  return (
    <div className={`${isPlaying || isPaused ? `sticky ${isHeaderMinimized ? 'top-[71px]' : 'top-[88px]'} -mt-6 md:-mt-8 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 rounded-b-xl` : 'bg-white dark:bg-gray-900 rounded-xl'} z-30 border border-gray-200 dark:border-gray-800 p-4 md:p-6 mb-8 shadow-sm transition-all duration-300`}>
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <Icon name="headphones" customSize={20} className={`text-gray-700 dark:text-gray-300 flex-shrink-0 ${(isPlaying || isPaused) ? 'hidden md:block' : ''}`} />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {isPlaying ? 'Playing' : isPaused ? 'Paused' : 'Listen to this page'}
            </h3>
            {(isPlaying || isPaused) && timeRemaining !== null && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5 truncate">
                {selectedVoice === 'browser' ? '~' : ''}{formatTime(timeRemaining)} remaining
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Settings Menu */}
          <div className="relative flex items-center" ref={settingsMenuRef}>
            <Tooltip content="Settings">
              <button
                onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen)
                  setSettingsView('main')
                }}
                className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Open settings"
              >
                <Icon name="settings" customSize={18} />
              </button>
            </Tooltip>
            
            {isSettingsOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                {settingsView === 'main' && (
                  <div className="py-1">
                    <button
                      onClick={() => setSettingsView('voice')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    >
                      <span>Voice</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {selectedVoice === 'en-US-Neural2-C' ? 'Female' : selectedVoice === 'en-US-Wavenet-I' ? 'Male' : 'Browser'}
                        </span>
                        <Icon name="chevron-right" customSize={16} />
                      </div>
                    </button>
                    <button
                      onClick={() => setSettingsView('speed')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                    >
                      <span>Speed</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{playbackRate}×</span>
                        <Icon name="chevron-right" customSize={16} />
                      </div>
                    </button>
                  </div>
                )}
                
                {settingsView === 'voice' && (
                  <div className="py-1">
                    <button
                      onClick={() => setSettingsView('main')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700"
                    >
                      <Icon name="chevron-left" customSize={16} />
                      <span>Back</span>
                    </button>
                    {[
                      { value: 'en-US-Neural2-C', label: 'Female (AI)' },
                      { value: 'en-US-Wavenet-I', label: 'Male (AI)' },
                      { value: 'browser', label: 'Browser' }
                    ].map((voice) => (
                      <button
                        key={voice.value}
                        onClick={() => {
                          console.log('[TTS Voice Change] Old voice:', selectedVoiceRef.current, '→ New voice:', voice.value)
                          setSelectedVoice(voice.value)
                          selectedVoiceRef.current = voice.value  // Update ref synchronously to prevent race condition
                          localStorage.setItem('ttsVoice', voice.value)
                          
                          // Invalidate cached audio and abort in-flight requests (AI voices only)
                          const oldVoiceWasAI = selectedVoice !== 'browser'
                          const newVoiceIsAI = voice.value !== 'browser'
                          
                          if (oldVoiceWasAI || newVoiceIsAI) {
                            // Abort any in-flight prefetch requests
                            if (prefetchAbortControllerRef.current) {
                              console.log('[TTS Voice Change] Aborting in-flight prefetch requests')
                              prefetchAbortControllerRef.current.abort()
                              prefetchAbortControllerRef.current = null
                            }
                            
                            // Clear all cached audio (proper cleanup)
                            clearAudioCache()
                            
                            // Clear pre-initialized next audio
                            nextAudioRef.current = null
                          }
                          
                          if (isPlaying) {
                            if (audioRef.current) {
                              audioRef.current.pause()
                              audioRef.current = null
                            }
                            window.speechSynthesis.cancel()
                            speakNext(undefined, voice.value)
                          }
                          setIsSettingsOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                          selectedVoice === voice.value
                            ? 'text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <span>{voice.label}</span>
                        {selectedVoice === voice.value && <Icon name="check" customSize={16} />}
                      </button>
                    ))}
                  </div>
                )}
                
                {settingsView === 'speed' && (
                  <div className="py-1">
                    <button
                      onClick={() => setSettingsView('main')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700"
                    >
                      <Icon name="chevron-left" customSize={16} />
                      <span>Back</span>
                    </button>
                    {[1.0, 1.25, 1.5, 2.0, 2.25, 2.5, 2.75, 3.0].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => {
                          console.log('[TTS Speed Change] Old rate:', playbackRateRef.current, '→ New rate:', rate)
                          setPlaybackRate(rate)
                          playbackRateRef.current = rate  // Update ref synchronously to prevent race condition
                          localStorage.setItem('ttsPlaybackSpeed', rate.toString())
                          
                          // Invalidate cached audio and abort in-flight requests (AI voices only)
                          if (selectedVoice !== 'browser') {
                            // Abort any in-flight prefetch requests
                            if (prefetchAbortControllerRef.current) {
                              console.log('[TTS Speed Change] Aborting in-flight prefetch requests')
                              prefetchAbortControllerRef.current.abort()
                              prefetchAbortControllerRef.current = null
                            }
                            
                            // Clear all cached audio (proper cleanup)
                            clearAudioCache()
                            
                            // Clear pre-initialized next audio
                            nextAudioRef.current = null
                          }
                          
                          if (isPlaying) {
                            if (audioRef.current) {
                              audioRef.current.pause()
                              audioRef.current = null
                            }
                            window.speechSynthesis.cancel()
                            speakNext(rate)
                          }
                          setIsSettingsOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between ${
                          playbackRate === rate
                            ? 'text-blue-600 dark:text-blue-400 font-medium'
                            : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <span>{rate}×</span>
                        {playbackRate === rate && <Icon name="check" customSize={16} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="flex items-center gap-2 btn-controls">
          {(isPlaying || isPaused) && (
            <Tooltip content="Previous sentence">
              <button
                onClick={handlePreviousSentence}
                disabled={currentIndexRef.current <= 0}
                className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-appear"
                aria-label="Previous sentence"
              >
                <Icon name="skip-back" customSize={18} />
              </button>
            </Tooltip>
          )}
          
          {!isPlaying && !isPaused && (
            <Tooltip content="Play">
              <button
                onClick={handlePlay}
                className="p-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                aria-label="Play narration"
              >
                <Icon name="play" customSize={18} />
              </button>
            </Tooltip>
          )}
          
          {isPlaying && (
            <Tooltip content="Pause">
              <button
                onClick={handlePause}
                className="p-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                aria-label="Pause narration"
              >
                <Icon name="pause" customSize={18} />
              </button>
            </Tooltip>
          )}
          
          {isPaused && (
            <Tooltip content="Resume">
              <button
                onClick={handlePlay}
                className="p-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                aria-label="Resume narration"
              >
                <Icon name="play" customSize={18} />
              </button>
            </Tooltip>
          )}
          
          {(isPlaying || isPaused) && (
            <>
              <Tooltip content="Next sentence">
                <button
                  onClick={handleNextSentence}
                  disabled={currentIndexRef.current >= textQueueRef.current.length - 1}
                  className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed btn-appear"
                  aria-label="Next sentence"
                >
                  <Icon name="skip-forward" customSize={18} />
                </button>
              </Tooltip>
              <Tooltip content="Stop">
                <button
                  onClick={handleStop}
                  className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors btn-appear"
                  aria-label="Stop narration"
                >
                  <Icon name="square" customSize={18} />
                </button>
              </Tooltip>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
