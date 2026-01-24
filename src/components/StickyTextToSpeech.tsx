import { Icon } from './Icon'
import { trackEvent } from '../utils/analytics'
import { trackFirstTimeFeatureUse, markTTSUsed } from '../utils/analyticsHelpers'
import { Heading, IconButton } from '../design-system'

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
    trackFirstTimeFeatureUse('tts', { location: 'sticky-tts' })
    markTTSUsed()
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
              <Heading as="h3" className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {isPlaying ? 'Audio playing...' : 'Audio paused'}
              </Heading>
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
              <IconButton
                onClick={handlePrevious}
                icon={<Icon name="skip-back" customSize={16} />}
                tooltip="Previous sentence"
                variant="secondary"
                size="sm"
                data-tracking-id="tts-sticky-previous"
                aria-label="Previous sentence"
              />
              
              {isPlaying && (
                <IconButton
                  onClick={handlePause}
                  icon={<Icon name="pause" customSize={16} />}
                  tooltip="Pause"
                  variant="primary"
                  size="sm"
                  data-tracking-id="tts-sticky-pause"
                  aria-label="Pause narration"
                />
              )}
              
              {isPaused && (
                <IconButton
                  onClick={handlePlay}
                  icon={<Icon name="play" customSize={16} />}
                  tooltip="Resume"
                  variant="primary"
                  size="sm"
                  data-tracking-id="tts-sticky-play"
                  aria-label="Resume narration"
                />
              )}
              
              <IconButton
                onClick={handleNext}
                icon={<Icon name="skip-forward" customSize={16} />}
                tooltip="Next sentence"
                variant="secondary"
                size="sm"
                data-tracking-id="tts-sticky-next"
                aria-label="Next sentence"
              />
              
              <IconButton
                onClick={handleStop}
                icon={<Icon name="square" customSize={16} />}
                tooltip="Stop"
                variant="secondary"
                size="sm"
                data-tracking-id="tts-sticky-stop"
                aria-label="Stop narration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
