import type { Topic } from '../data/topics'
import { topicDetailedContent } from '../data/topicContent/index'
import { Icon } from './Icon'

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
      <article>
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
          {topic.description}
        </p>
      </article>
    )
  }

  // Start at 1 because index 0 is reserved for the page title in TTS queue
  let paragraphCounter = 1

  return (
    <article aria-labelledby="topic-title">
      {/* Overview section - includes introduction and learning points */}
      <section id="overview" aria-labelledby="overview-heading">
        {/* Visually hidden heading for screen reader navigation */}
        <h2 id="overview-heading" className="sr-only">Overview</h2>
        {/* Introduction */}
        <div className="mb-8 space-y-4">
          {detailedContent.introduction.map((paragraph, index) => {
            const currentIndex = paragraphCounter++
            const isReading = currentReadingIndex === currentIndex
            const hasHtml = paragraph.includes('<') && paragraph.includes('>')
            
            return (
              <p 
                key={index} 
                data-tts-index={currentIndex}
                className={`text-base leading-relaxed transition-all duration-300 ${
                  isReading 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                {...(hasHtml ? { dangerouslySetInnerHTML: { __html: paragraph } } : { children: paragraph })}
              />
            )
          })}
        </div>

        {/* Learning Points */}
        {detailedContent.learningPoints && detailedContent.learningPoints.length > 0 && (
          <aside 
            aria-labelledby="learning-heading"
            className="mb-8 bg-yellow-50/25 dark:bg-yellow-950/[0.08] border border-yellow-200 dark:border-yellow-900/30 rounded-lg p-6"
          >
            <h3 
              id="learning-heading"
              data-tts-index={paragraphCounter++}
              className={`text-lg font-semibold mb-3 transition-all duration-300 flex items-center gap-2 ${
                currentReadingIndex === paragraphCounter - 1
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                  : 'text-gray-900 dark:text-gray-100'
              }`}
            >
              <Icon name="sparkles" customSize={20} className="text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
              <span>{detailedContent.learningPointsHeading || "What you'll learn:"}</span>
            </h3>
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
                    <span className="flex-shrink-0 w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-700/60 rounded-full mt-2" aria-hidden="true"></span>
                    <span 
                      data-tts-index={currentIndex}
                      className={`text-base transition-all duration-300 ${
                        isReading
                          ? 'text-gray-900 dark:text-gray-100'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </li>
                )
              })}
            </ul>
          </aside>
        )}
      </section>

      {/* Main Sections */}
      <div className="space-y-12 mb-8">
        {detailedContent.sections.map((section, sectionIndex) => {
          const sectionId = generateSlug(section.heading)
          const sectionHeadingId = `${sectionId}-heading`
          
          return (
            <section key={sectionIndex} id={sectionId} aria-labelledby={sectionHeadingId}>
              {section.heading && (
                <h2 
                  id={sectionHeadingId}
                  data-tts-index={paragraphCounter++}
                  className={`text-2xl font-bold mb-5 transition-all duration-300 ${
                    currentReadingIndex === paragraphCounter - 1
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {section.heading}
                </h2>
              )}
            
            {/* Section content */}
            {section.content && (
              <div className="space-y-3 mb-4">
                {Array.isArray(section.content) ? (
                  section.content.map((paragraph, pIndex) => {
                    const currentIndex = paragraphCounter++
                    const isReading = currentReadingIndex === currentIndex
                    const hasHtml = paragraph.includes('<') && paragraph.includes('>')
                    
                    return (
                      <p 
                        key={pIndex} 
                        data-tts-index={currentIndex}
                        className={`text-base leading-relaxed transition-all duration-300 ${
                          isReading
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                        {...(hasHtml ? { dangerouslySetInnerHTML: { __html: paragraph } } : { children: paragraph })}
                      />
                    )
                  })
                ) : section.content ? (
                  <p 
                    data-tts-index={paragraphCounter++}
                    className={`text-base leading-relaxed transition-all duration-300 ${
                      currentReadingIndex === paragraphCounter - 1
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                ) : null}
              </div>
            )}

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="space-y-4 mt-6 mb-0">
                {section.subsections.map((subsection, subIndex) => {
                  const subsectionId = generateSlug(subsection.heading || `subsection-${subIndex}`)
                  const subsectionHeadingId = `${subsectionId}-heading`
                  // If content is a string (not array), render as paragraph
                  const isParagraph = !Array.isArray(subsection.content)
                  
                  return (
                    <section 
                      key={subIndex}
                      aria-labelledby={subsection.heading ? subsectionHeadingId : undefined}
                    >
                      {subsection.heading && (
                        <h3 
                          id={subsectionHeadingId}
                          data-tts-index={paragraphCounter++}
                          className={`text-lg font-semibold mb-2 transition-all duration-300 ${
                            currentReadingIndex === paragraphCounter - 1
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {subsection.heading}
                        </h3>
                      )}
                      
                      {isParagraph ? (
                        // Render as single paragraph
                        <p 
                          data-tts-index={paragraphCounter++}
                          className={`text-base leading-relaxed transition-all duration-300 ${
                            currentReadingIndex === paragraphCounter - 1
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                          dangerouslySetInnerHTML={{ __html: subsection.content as string }}
                        />
                      ) : (
                        // Array content - render as multiple paragraphs
                        <div className="space-y-3">
                          {Array.isArray(subsection.content) && subsection.content.map((item, itemIndex) => {
                            const currentIndex = paragraphCounter++
                            const isReading = currentReadingIndex === currentIndex
                            const hasHtml = item.includes('<') && item.includes('>')
                            
                            return (
                              <p 
                                key={itemIndex}
                                data-tts-index={currentIndex}
                                className={`text-base leading-relaxed transition-all duration-300 ${
                                  isReading
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-lg -mx-3'
                                    : 'text-gray-700 dark:text-gray-300'
                                }`}
                                {...(hasHtml ? { dangerouslySetInnerHTML: { __html: item } } : { children: item })}
                              />
                            )
                          })}
                        </div>
                      )}
                    </section>
                  )
                })}
              </div>
            )}
            </section>
          )
        })}
      </div>
    </article>
  )
}
