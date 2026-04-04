import type { DetailedTopicContent } from '../data/topicContent'
import { trackEvent } from '../utils/analytics'
import { useTTSSettings } from '../hooks/useTTSSettings'
import { useTTSEngine } from '../hooks/useTTSEngine'
import { TTSProgressDisplay } from './TTS/TTSProgressDisplay'
import { TTSMediaControls } from './TTS/TTSMediaControls'
import { TTSSettingsMenu } from './TTS/TTSSettingsMenu'

interface TextToSpeechProps {
  content: DetailedTopicContent
  title: string
  onStateChange?: (state: { isPlaying: boolean; isPaused: boolean; playbackRate: number; currentIndex: number }) => void
}

export function TextToSpeech({ content, title, onStateChange }: TextToSpeechProps) {
  const { voice: selectedVoice, playbackRate, setVoice: setSelectedVoice, setPlaybackRate } = useTTSSettings()

  const {
    isPlaying,
    isPaused,
    isSupported,
    timeRemaining,
    currentIndex,
    totalSections,
    handlePlay,
    handlePause,
    handleStop,
    handlePreviousSentence,
    handleNextSentence,
    handleVoiceChangeComplete,
    handleSpeedChangeComplete,
  } = useTTSEngine({
    content,
    title,
    selectedVoice,
    playbackRate,
    setPlaybackRate,
    onStateChange,
  })

  if (!isSupported) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm mb-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Text-to-speech is not available in your browser. Try using a modern browser like Chrome, Edge, or Safari.
        </p>
      </div>
    )
  }

  const isActive = isPlaying || isPaused

  return (
    <div className={`${isActive ? 'sticky top-[112px] z-50 -mt-[26px] md:-mt-[34px] backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-t rounded-b-2xl' : 'bg-white dark:bg-gray-900 rounded-xl border mb-8'} border-gray-200 dark:border-gray-800 p-4 md:p-6 shadow-sm transition-all duration-300`}>
      <div className="flex items-center justify-between gap-2 md:gap-4">
        <TTSProgressDisplay
          isPlaying={isPlaying}
          isPaused={isPaused}
          timeRemaining={timeRemaining}
        />

        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          <TTSSettingsMenu
            voice={selectedVoice}
            playbackRate={playbackRate}
            onVoiceChange={setSelectedVoice}
            onSpeedChange={setPlaybackRate}
            onVoiceChangeComplete={handleVoiceChangeComplete}
            onSpeedChangeComplete={handleSpeedChangeComplete}
          />

          <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

          <TTSMediaControls
            isPlaying={isPlaying}
            isPaused={isPaused}
            currentIndex={currentIndex}
            totalSections={totalSections}
            onPlay={() => {
              trackEvent('TTS Play Clicked', { location: 'inline-tts', wasResume: isPaused })
              handlePlay()
            }}
            onPause={() => {
              trackEvent('TTS Pause Clicked', { location: 'inline-tts' })
              handlePause()
            }}
            onStop={() => {
              trackEvent('TTS Stop Clicked', { location: 'inline-tts' })
              handleStop()
            }}
            onPrevious={() => {
              trackEvent('TTS Previous Clicked', { location: 'inline-tts' })
              handlePreviousSentence()
            }}
            onNext={() => {
              trackEvent('TTS Next Clicked', { location: 'inline-tts' })
              handleNextSentence()
            }}
          />
        </div>
      </div>
    </div>
  )
}
