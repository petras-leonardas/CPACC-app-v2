import type { Topic } from '../data/topics'
import { topicDetailedContent } from '../data/topicContent'
import { wrapWordsWithSpans } from '../utils/textUtils'

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

  let paragraphCounter = 0

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
        <div className="mb-8 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-6">
          <h2 
            data-tts-index={paragraphCounter++}
            className={`text-lg font-semibold mb-3 transition-all duration-300 ${
              currentReadingIndex === paragraphCounter - 1
                ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                : 'text-gray-900 dark:text-gray-100'
            }`}
          >
            {wrapWordsWithSpans("Understanding these models helps you:", 0)}
          </h2>
          <ul className="space-y-2">
            {detailedContent.learningPoints.map((point, index) => {
              const currentIndex = paragraphCounter++
              const isReading = currentReadingIndex === currentIndex
              return (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full mt-2"></span>
                  <span 
                    data-tts-index={currentIndex}
                    className={`text-base transition-all duration-300 ${
                      isReading
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -ml-3'
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

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="space-y-4 mt-6">
                {section.subsections.map((subsection, subIndex) => (
                  <div key={subIndex}>
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
                    <ul className="space-y-2">
                      {Array.isArray(subsection.content) ? (
                        subsection.content.map((item, itemIndex) => {
                          const currentIndex = paragraphCounter++
                          const isReading = currentReadingIndex === currentIndex
                          return (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"></span>
                              <span 
                                data-tts-index={currentIndex}
                                className={`text-base transition-all duration-300 ${
                                  isReading
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -ml-3'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                {wrapWordsWithSpans(item, 0)}
                              </span>
                            </li>
                          )
                        })
                      ) : (
                        <li className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-600 dark:bg-gray-400 rounded-full mt-2"></span>
                          <span 
                            data-tts-index={paragraphCounter++}
                            className={`text-base transition-all duration-300 ${
                              currentReadingIndex === paragraphCounter - 1
                                ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -ml-3'
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
