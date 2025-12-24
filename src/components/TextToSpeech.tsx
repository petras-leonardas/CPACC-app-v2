import { useState, useEffect, useRef } from 'react'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { DetailedTopicContent } from '../data/topicContent'
import { updateTTSQuota, hasQuotaAvailable } from '../utils/ttsQuota'

interface TextToSpeechProps {
  content: DetailedTopicContent
  onStateChange?: (state: { isPlaying: boolean; isPaused: boolean; playbackRate: number; currentIndex: number }) => void
}

export function TextToSpeech({ content, onStateChange }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(() => {
    // Load saved speed from localStorage, default to 2.0
    const saved = localStorage.getItem('ttsPlaybackSpeed')
    return saved ? parseFloat(saved) : 2.0
  })
  const [selectedVoice, setSelectedVoice] = useState(() => {
    // Load saved voice from localStorage, default to en-US-Wavenet-I
    const saved = localStorage.getItem('ttsVoice')
    return saved || 'en-US-Wavenet-I'
  })
  const [isSupported] = useState(() => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  })
  const [usingGoogleTTS, setUsingGoogleTTS] = useState(false)
  
  useEffect(() => {
    onStateChange?.({ isPlaying, isPaused, playbackRate, currentIndex: currentIndexRef.current })
  }, [isPlaying, isPaused, playbackRate, onStateChange])
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const nextAudioRef = useRef<HTMLAudioElement | null>(null) // Pre-initialized next audio for instant playback
  const textQueueRef = useRef<string[]>([])
  const currentIndexRef = useRef(-1)
  const audioCacheRef = useRef<Map<number, { audioUrl: string; audioBlob: Blob; audioDuration: number }>>(new Map())
  const prefetchInProgressRef = useRef<Set<number>>(new Set())
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
    const prefetchPromises: Promise<void>[] = []
    
    for (let i = 0; i < count; i++) {
      const sectionIndex = startIndex + i
      
      // Don't prefetch if already in progress, cached, or beyond queue
      if (prefetchInProgressRef.current.has(sectionIndex) || 
          audioCacheRef.current.has(sectionIndex) ||
          sectionIndex >= textQueueRef.current.length) {
        continue
      }
      
      prefetchInProgressRef.current.add(sectionIndex)
      
      const prefetchPromise = (async () => {
        try {
          console.log('[TTS] Prefetching section', sectionIndex)
          const text = textQueueRef.current[sectionIndex]
          const response = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text,
              voice: selectedVoice
            })
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
          
          // Cache the audio data
          audioCacheRef.current.set(sectionIndex, {
            audioUrl,
            audioBlob,
            audioDuration: tempAudio.duration
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
    const rateToUse = customRate ?? playbackRate
    audio.playbackRate = rateToUse
    
    // Store reference
    nextAudioRef.current = audio
  }
  
  // Clear audio cache (on voice/speed change)
  const clearAudioCache = () => {
    console.log('[TTS] Clearing audio cache')
    // Revoke all cached URLs to free memory
    audioCacheRef.current.forEach((cached) => {
      URL.revokeObjectURL(cached.audioUrl)
    })
    audioCacheRef.current.clear()
    prefetchInProgressRef.current.clear()
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
      let audioDuration: number
      
      if (cachedAudio) {
        // Use cached audio - instant playback!
        console.log('[TTS] Using cached audio for section', currentIndexRef.current)
        audioUrl = cachedAudio.audioUrl
        audioBlob = cachedAudio.audioBlob
        audioDuration = cachedAudio.audioDuration
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
        
        // Get duration from audio element later
        audioDuration = 0
      }
      
      // Create audio element
      if (audioRef.current) {
        audioRef.current.pause()
        URL.revokeObjectURL(audioRef.current.src)
      }
      
      const audio = new Audio(audioUrl)
      audioRef.current = audio
      
      // Apply playback rate (Google TTS doesn't support rate, so adjust audio speed)
      const rateToUse = customRate ?? playbackRate
      audio.playbackRate = rateToUse
      
      // Auto-scroll to highlighted element
      const element = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      
      // Clear any previous highlight timeouts
      highlightTimeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      highlightTimeoutsRef.current = []
      
      // Set up word highlighting using estimated timing
      
      // Trigger prefetch of next 3 sections in background (sliding window)
      const nextIndex = currentIndexRef.current + 1
      if (nextIndex < textQueueRef.current.length && selectedVoice !== 'browser') {
        // Prefetch 3 sections ahead in parallel
        prefetchMultipleSections(nextIndex, 3).then(() => {
          // Once immediate next is cached, pre-initialize it for instant playback
          preInitializeNextAudio(nextIndex, rateToUse)
        })
      }
      
      // Wait for audio metadata to load, then set up word highlighting
      audio.onloadedmetadata = () => {
        if (!element) return
        
        const currentText = textQueueRef.current[currentIndexRef.current]
        // Split text into words
        const words = currentText.split(/\s+/).filter(w => w.length > 0)
        const finalDuration = audioDuration || audio.duration // Use cached duration or get from audio
        
        // Calculate time per word
        const timePerWord = finalDuration / words.length
        
        // Schedule highlight for each word
        words.forEach((word, index) => {
          const timeOffset = (index * timePerWord * 1000) / rateToUse // Convert to ms and adjust for playback rate
          const timeoutId = setTimeout(() => {
            // Highlight based on word position in text
            const charIndex = currentText.split(/\s+/).slice(0, index).join(' ').length + (index > 0 ? 1 : 0)
            highlightWordInElement(element, word, charIndex)
          }, timeOffset)
          highlightTimeoutsRef.current.push(timeoutId)
        })
      }
      
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
          
          // Set up highlighting and play immediately
          const nextElement = document.querySelector(`[data-tts-index="${nextIndex}"]`)
          if (nextElement) {
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
            
            // Set up word highlighting
            const cachedNext = audioCacheRef.current.get(nextIndex)
            if (cachedNext) {
              const currentText = textQueueRef.current[nextIndex]
              const words = currentText.split(/\s+/).filter(w => w.length > 0)
              const timePerWord = cachedNext.audioDuration / words.length
              
              words.forEach((word, index) => {
                const timeOffset = (index * timePerWord * 1000) / rateToUse
                const timeoutId = setTimeout(() => {
                  const charIndex = currentText.split(/\s+/).slice(0, index).join(' ').length + (index > 0 ? 1 : 0)
                  highlightWordInElement(nextElement, word, charIndex)
                }, timeOffset)
                highlightTimeoutsRef.current.push(timeoutId)
              })
            }
            
            // Remove from cache after use
            audioCacheRef.current.delete(nextIndex)
          }
          
          // Set up onended handler for the new audio
          audioRef.current.onended = audio.onended
          
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
    
    // Use custom rate if provided (for immediate speed changes), otherwise use state
    const rateToUse = customRate ?? playbackRate
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
  }

  const handlePreviousSentence = () => {
    if (!isSupported) return
    if (!textQueueRef.current.length) return
    if (!isPlaying && !isPaused) return

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
    <div className={`${isPlaying || isPaused ? 'sticky top-[88px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70' : 'bg-white dark:bg-gray-900'} z-30 border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-8 shadow-sm transition-all duration-300`}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Icon name="headphones" customSize={20} className="text-gray-700 dark:text-gray-300" />
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {isPlaying ? 'Playing' : isPaused ? 'Paused' : 'Listen to this page'}
            </h3>
            {(isPlaying || isPaused) && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                {usingGoogleTTS ? '🎤 AI Voice' : '🔊 Browser Voice'}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Voice Selection */}
          <div className="relative flex-1">
            <label 
              htmlFor="voice-select" 
              className="absolute -top-2 left-2 px-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 z-10"
            >
              Voice
            </label>
            <select
              id="voice-select"
              value={selectedVoice}
              onChange={(e) => {
                const newVoice = e.target.value
                setSelectedVoice(newVoice)
                
                // Save to localStorage for persistence across pages
                localStorage.setItem('ttsVoice', newVoice)
                
                // Clear audio cache since voice changed
                clearAudioCache()
                
                // If currently playing, restart current sentence with new voice
                if (isPlaying) {
                  if (audioRef.current) {
                    audioRef.current.pause()
                    audioRef.current = null
                  }
                  window.speechSynthesis.cancel()
                  speakNext(undefined, newVoice)  // Pass new voice directly to avoid stale state
                }
              }}
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            >
              <optgroup label="AI Voices - Female">
                <option value="en-US-Neural2-F">Natural Female</option>
                <option value="en-US-Neural2-C">Warm Female</option>
                <option value="en-US-Studio-O">Professional Female</option>
              </optgroup>
              <optgroup label="AI Voices - Male">
                <option value="en-US-Neural2-D">Natural Male</option>
                <option value="en-US-Neural2-J">Clear Male</option>
                <option value="en-US-Wavenet-I">Professional Male</option>
              </optgroup>
              <optgroup label="Browser Voice">
                <option value="browser">Browser Voice</option>
              </optgroup>
            </select>
          </div>
          
          {/* Speed Control */}
          <div className="relative flex-1">
            <label 
              htmlFor="playback-speed" 
              className="absolute -top-2 left-2 px-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 z-10"
            >
              Speed
            </label>
            <select
              id="playback-speed"
              value={playbackRate.toFixed(1)}
              onChange={(e) => {
                const newRate = parseFloat(e.target.value)
                setPlaybackRate(newRate)
                
                // Save to localStorage for persistence across pages
                localStorage.setItem('ttsPlaybackSpeed', newRate.toString())
                
                // If currently playing, restart current sentence with new speed
                if (isPlaying) {
                  if (audioRef.current) {
                    audioRef.current.pause()
                    audioRef.current = null
                  }
                  window.speechSynthesis.cancel()
                  speakNext(newRate)  // Pass new rate directly to avoid stale state
                }
              }}
              className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            >
              <option value="1.0">1×</option>
              <option value="1.25">1.25×</option>
              <option value="1.5">1.5×</option>
              <option value="2.0">2×</option>
              <option value="2.25">2.25×</option>
              <option value="2.5">2.5×</option>
              <option value="2.75">2.75×</option>
              <option value="3.0">3×</option>
            </select>
          </div>
          
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
