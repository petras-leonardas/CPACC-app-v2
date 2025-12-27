import type { Topic } from '../data/topics'
import { topicDetailedContent } from '../data/topicContent'
import { wrapWordsWithSpans } from '../utils/textUtils'
import { Icon } from './Icon'
import { KeyTakeawaysBox } from './KeyTakeawaysBox'

interface TopicContentProps {
  topic: Topic
  currentReadingIndex?: number
}

const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function TopicContent({ topic, currentReadingIndex }: TopicContentProps) {
  const detailedContent = topicDetailedContent[topic.id]

  if (!detailedContent) {
    // Fallback to simple description if no detailed content exists
    return (
      <>
        {/* Description */}
        <div className="mb-8">
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            {topic.description}
          </p>
        </div>

      </>
    )
  }

  // Start at 1 because index 0 is reserved for the page title in TTS queue
  let paragraphCounter = 1

  return (
    <>
      {/* Introduction */}
      <div className="mb-8 space-y-4">
        {detailedContent.introduction.map((paragraph, index) => {
          const currentIndex = paragraphCounter++
          const isReading = currentReadingIndex === currentIndex
          return (
            <p 
              key={index} 
              data-tts-index={currentIndex}
              className={`text-base leading-relaxed transition-all duration-300 ${
                isReading 
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {wrapWordsWithSpans(paragraph, 0)}
            </p>
          )
        })}
      </div>

      {/* Learning Points */}
      {detailedContent.learningPoints && (
        <div className="mb-8 bg-yellow-50/25 dark:bg-yellow-950/[0.08] border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-6">
          <h2 
            data-tts-index={paragraphCounter++}
            className={`text-lg font-semibold mb-3 transition-all duration-300 flex items-center gap-2 ${
              currentReadingIndex === paragraphCounter - 1
                ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            <Icon name="sparkles" customSize={20} className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
            <span>{wrapWordsWithSpans("Understanding these models helps you:", 0)}</span>
          </h2>
          <ul className="space-y-2">
            {detailedContent.learningPoints.map((point, index) => {
              const currentIndex = paragraphCounter++
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
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-700/60 rounded-full mt-2"></span>
                  <span 
                    data-tts-index={currentIndex}
                    className={`text-base transition-all duration-300 ${
                      isReading
                        ? 'text-gray-900 dark:text-gray-100'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {wrapWordsWithSpans(point, 0)}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* Main Sections */}
      <div className="space-y-12 mb-8">
        {detailedContent.sections.map((section, sectionIndex) => {
          const sectionId = generateSlug(section.heading)
          const isKeyTakeaways = section.heading === 'Key takeaways'
          
          // Handle Key Takeaways with dedicated component
          if (isKeyTakeaways && section.subsections && section.subsections.length > 0) {
            const items = Array.isArray(section.subsections[0].content) 
              ? section.subsections[0].content 
              : []
            const startIndex = paragraphCounter
            paragraphCounter += items.length + 1 // +1 for the heading
            return (
              <div key={sectionIndex} id={sectionId}>
                <KeyTakeawaysBox 
                  items={items}
                  currentReadingIndex={currentReadingIndex}
                  startIndex={startIndex}
                />
              </div>
            )
          }
          
          return (
            <section key={sectionIndex} id={sectionId}>
              <h2 
                data-tts-index={paragraphCounter++}
                className={`text-2xl font-bold mb-5 transition-all duration-300 ${
                  currentReadingIndex === paragraphCounter - 1
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {wrapWordsWithSpans(section.heading, 0)}
              </h2>
            
            {/* Section content */}
            {section.content && (
              <div className="space-y-3 mb-4">
                {Array.isArray(section.content) ? (
                  section.content.map((paragraph, pIndex) => {
                    const currentIndex = paragraphCounter++
                    const isReading = currentReadingIndex === currentIndex
                    return (
                      <p 
                        key={pIndex} 
                        data-tts-index={currentIndex}
                        className={`text-base leading-relaxed transition-all duration-300 ${
                          isReading
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {wrapWordsWithSpans(paragraph, 0)}
                      </p>
                    )
                  })
                ) : (
                  <p 
                    data-tts-index={paragraphCounter++}
                    className={`text-base leading-relaxed transition-all duration-300 ${
                      currentReadingIndex === paragraphCounter - 1
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {wrapWordsWithSpans(section.content, 0)}
                  </p>
                )}
              </div>
            )}

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="space-y-4 mt-6">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex}>
                    {subsection.heading && (
                      <h3 
                        data-tts-index={paragraphCounter++}
                        className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                          currentReadingIndex === paragraphCounter - 1
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                            : 'text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {wrapWordsWithSpans(subsection.heading, 0)}
                      </h3>
                    )}
                    <ul className="space-y-2">
                      {Array.isArray(subsection.content) ? (
                        subsection.content.map((item, itemIndex) => {
                          const currentIndex = paragraphCounter++
                          const isReading = currentReadingIndex === currentIndex
                          return (
                            <li 
                              key={itemIndex} 
                              className={`flex items-start gap-3 transition-all duration-300 ${
                                isReading 
                                  ? 'bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg -mx-3' 
                                  : ''
                              }`}
                            >
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"></span>
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
                        })
                      ) : (
                        <li 
                          className={`flex items-start gap-3 transition-all duration-300 ${
                            currentReadingIndex === paragraphCounter
                              ? 'bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg -mx-3'
                              : ''
                          }`}
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"></span>
                          <span 
                            data-tts-index={paragraphCounter++}
                            className={`text-base transition-all duration-300 ${
                              currentReadingIndex === paragraphCounter - 1
                                ? 'text-gray-900 dark:text-gray-100'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {wrapWordsWithSpans(subsection.content, 0)}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            </section>
          )
        })}
      </div>

    </>
  )
}
