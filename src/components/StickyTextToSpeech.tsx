import { Icon } from './Icon'
import { Tooltip } from './Tooltip'
import { trackEvent } from '../utils/analytics'

interface StickyTextToSpeechProps {
  isPlaying: boolean
  isPaused: boolean
  playbackRate: number
  onPlay: () => void
  onPause: () => void
  onStop: () => void
  onSpeedChange: (rate: number) => void
  onPrevious: () => void
  onNext: () => void
}

export function StickyTextToSpeech({
  isPlaying,
  isPaused,
  playbackRate,
  onPlay,
  onPause,
  onStop,
  onSpeedChange,
  onPrevious,
  onNext,
}: StickyTextToSpeechProps) {

  const handleSpeedChange = (rate: number) => {
    trackEvent('TTS Speed Changed', {
      newSpeed: rate,
      previousSpeed: playbackRate,
      location: 'sticky-tts',
    })
    onSpeedChange(rate)
  }

  const handlePlay = () => {
    trackEvent('TTS Play Clicked', {
      location: 'sticky-tts',
      wasResume: isPaused,
    })
    onPlay()
  }

  const handlePause = () => {
    trackEvent('TTS Pause Clicked', {
      location: 'sticky-tts',
    })
    onPause()
  }

  const handleStop = () => {
    trackEvent('TTS Stop Clicked', {
      location: 'sticky-tts',
    })
    onStop()
  }

  const handlePrevious = () => {
    trackEvent('TTS Previous Clicked', {
      location: 'sticky-tts',
    })
    onPrevious()
  }

  const handleNext = () => {
    trackEvent('TTS Next Clicked', {
      location: 'sticky-tts',
    })
    onNext()
  }
  const showControls = isPlaying || isPaused

  if (!showControls) {
    return null
  }

  return (
    <div className="sticky bottom-8 mt-6 mb-4">
      <div className="bg-gray-100/80 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Icon name="headphones" customSize={18} className="text-gray-700 dark:text-gray-300" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {isPlaying ? 'Audio playing...' : 'Audio paused'}
              </h3>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <label htmlFor="sticky-playback-speed" className="text-xs text-gray-600 dark:text-gray-400">Speed:</label>
              <select
                id="sticky-playback-speed"
                value={playbackRate.toFixed(1)}
                onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                disabled={isPlaying}
                data-tracking-id="tts-sticky-speed-select"
                className="px-2.5 py-1 text-xs rounded border border-gray-300/50 dark:border-gray-600/50 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
            
            {/* Play/Pause/Stop Controls */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-300/50 dark:border-gray-600/50">
              <Tooltip content="Previous sentence">
                <button
                  onClick={handlePrevious}
                  data-tracking-id="tts-sticky-previous"
                  className="p-2 bg-gray-200/60 dark:bg-gray-700/60 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300/60 dark:hover:bg-gray-600/60 transition-colors"
                  aria-label="Previous sentence"
                >
                  <Icon name="skip-back" customSize={16} />
                </button>
              </Tooltip>
              
              {isPlaying && (
                <Tooltip content="Pause">
                  <button
                    onClick={handlePause}
                    data-tracking-id="tts-sticky-pause"
                    className="p-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                    aria-label="Pause narration"
                  >
                    <Icon name="pause" customSize={16} />
                  </button>
                </Tooltip>
              )}
              
              {isPaused && (
                <Tooltip content="Resume">
                  <button
                    onClick={handlePlay}
                    data-tracking-id="tts-sticky-play"
                    className="p-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                    aria-label="Resume narration"
                  >
                    <Icon name="play" customSize={16} />
                  </button>
                </Tooltip>
              )}
              
              <Tooltip content="Next sentence">
                <button
                  onClick={handleNext}
                  data-tracking-id="tts-sticky-next"
                  className="p-2 bg-gray-200/60 dark:bg-gray-700/60 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300/60 dark:hover:bg-gray-600/60 transition-colors"
                  aria-label="Next sentence"
                >
                  <Icon name="skip-forward" customSize={16} />
                </button>
              </Tooltip>
              
              <Tooltip content="Stop">
                <button
                  onClick={handleStop}
                  data-tracking-id="tts-sticky-stop"
                  className="p-2 bg-gray-200/60 dark:bg-gray-700/60 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-300/60 dark:hover:bg-gray-600/60 transition-colors"
                  aria-label="Stop narration"
                >
                  <Icon name="square" customSize={16} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
