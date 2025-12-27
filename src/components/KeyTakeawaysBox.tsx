import { Icon } from './Icon'
import { wrapWordsWithSpans } from '../utils/textUtils'

interface KeyTakeawaysBoxProps {
  items: string[]
  currentReadingIndex?: number
  startIndex: number
}

export function KeyTakeawaysBox({ items, currentReadingIndex, startIndex }: KeyTakeawaysBoxProps) {
  let itemIndex = startIndex

  return (
    <section className="bg-emerald-100/80 dark:bg-emerald-900/25 rounded-2xl p-6 shadow-md">
      <h2 
        data-tts-index={itemIndex++}
        className={`text-2xl font-bold transition-all duration-300 flex items-center gap-2 mb-3 ${
          currentReadingIndex === startIndex
            ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
            : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        <Icon name="lightbulb" customSize={24} className="text-green-600 dark:text-green-500 flex-shrink-0" />
        {wrapWordsWithSpans('Key takeaways', 0)}
      </h2>
      
      <ul className="space-y-2">
        {items.map((item, index) => {
          const currentIndex = itemIndex++
          const isReading = currentReadingIndex === currentIndex
          return (
            <li 
              key={index} 
              className={`flex items-start gap-3 transition-all duration-300 ${
                isReading 
                  ? 'bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg -mx-3' 
                  : ''
              }`}
            >
              <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-green-600 dark:bg-green-500"></span>
              <span 
                data-tts-index={currentIndex}
                className={`text-base transition-all duration-300 ${
                  isReading
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {wrapWordsWithSpans(item, 0)}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
