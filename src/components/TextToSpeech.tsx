import { useState, useEffect, useRef } from 'react'
import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import type { DetailedTopicContent } from '../data/topicContent'

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
  const [isSupported] = useState(() => {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  })
  
  useEffect(() => {
    onStateChange?.({ isPlaying, isPaused, playbackRate, currentIndex: currentIndexRef.current })
  }, [isPlaying, isPaused, playbackRate, onStateChange])
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const textQueueRef = useRef<string[]>([])
  const currentIndexRef = useRef(-1)
  const isNavigatingRef = useRef(false)
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

  const speakNext = (customRate?: number) => {
    if (currentIndexRef.current >= textQueueRef.current.length) {
      handleStop()
      return
    }
    
    const text = textQueueRef.current[currentIndexRef.current]
    if (!text) return
    
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
      window.speechSynthesis.resume()
      setIsPaused(false)
      setIsPlaying(true)
    } else {
      // Cancel any existing speech before starting fresh
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
    window.speechSynthesis.pause()
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
    
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    currentIndexRef.current = -1
    textQueueRef.current = []
  }

  const handlePreviousSentence = () => {
    if (!isSupported) return
    if (!isPlaying && !isPaused) return
    
    // If queue is empty, rebuild it first
    if (!textQueueRef.current.length) {
      textQueueRef.current = buildTextQueue()
    }
    
    if (!textQueueRef.current.length) return
    
    // Clear highlights from current section before navigating
    const currentElement = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
    if (currentElement) {
      clearWordHighlights(currentElement)
    }
    
    window.speechSynthesis.cancel()
    
    if (currentIndexRef.current > 0) {
      currentIndexRef.current--
    }
    
    setIsPlaying(true)
    setIsPaused(false)
    
    // Clear navigation flag and speak next
    setTimeout(() => {
      isNavigatingRef.current = false
      speakNext()
    }, 50)
  }

  const handleNextSentence = () => {
    if (!isSupported) return
    if (!isPlaying && !isPaused) return
    
    // If queue is empty, rebuild it first
    if (!textQueueRef.current.length) {
      textQueueRef.current = buildTextQueue()
    }
    
    if (!textQueueRef.current.length) return
    
    // Clear highlights from current section before navigating
    const currentElement = document.querySelector(`[data-tts-index="${currentIndexRef.current}"]`)
    if (currentElement) {
      clearWordHighlights(currentElement)
    }
    
    window.speechSynthesis.cancel()
    
    if (currentIndexRef.current < textQueueRef.current.length - 1) {
      currentIndexRef.current++
    }
    
    setIsPlaying(true)
    setIsPaused(false)
    
    // Clear navigation flag and speak next
    setTimeout(() => {
      isNavigatingRef.current = false
      speakNext()
    }, 50)
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
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Speed Control */}
          <div className="flex items-center gap-2">
            <label htmlFor="playback-speed" className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Speed:
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
                  window.speechSynthesis.cancel()
                  speakNext(newRate)  // Pass new rate directly to avoid stale state
                }
              }}
              className="px-3 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            >
              <option value="1.0">1× (Normal)</option>
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
