import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SEO } from '../components/SEO'
import { cpacc_topics } from '../data/topics'
import { usePageTracking } from '../hooks/usePageTracking'
import { trackEvent } from '../utils/analytics'
import { Heading, Text, Button, IconButton, Container } from '../design-system'

export function MockExamPage() {
  usePageTracking('Practice Test Hub')
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; title: string; subCategory?: string } | null>(null)
  const [expandedDomain, setExpandedDomain] = useState<number | null>(null)

  const handleFullMock = () => {
    trackEvent('Test Button Clicked', {
      testType: 'mock-exam',
      questionCount: 80,
      location: 'practice-hub',
    })
    navigate('/test/mock-exam', { state: { from: '/cpacc-practice-test' } })
  }

  const handleQuickTest = () => {
    trackEvent('Test Button Clicked', {
      testType: 'quick-test',
      questionCount: 20,
      location: 'practice-hub',
    })
    navigate('/test/quick-test', { state: { from: '/cpacc-practice-test' } })
  }

  const handleSuperQuickTest = () => {
    trackEvent('Test Button Clicked', {
      testType: 'super-quick-test',
      questionCount: 10,
      location: 'practice-hub',
    })
    navigate('/test/super-quick-test', { state: { from: '/cpacc-practice-test' } })
  }

  const handleTopicQuickTest = (topicId: string) => {
    navigate(`/test/topic-quick/${topicId}`, { state: { from: '/cpacc-practice-test' } })
  }

  const handleTopicFullTest = (topicId: string) => {
    navigate(`/test/${topicId}`, { state: { from: '/cpacc-practice-test' } })
  }

  const handleTopicClick = (topic: { id: string; title: string; subCategory?: string }) => {
    trackEvent('Topic Selected', {
      topicId: topic.id,
      topicTitle: topic.title,
      location: 'practice-hub',
    })
    setSelectedTopic(topic)
  }

  const handleCloseModal = () => {
    trackEvent('Modal Closed', {
      modalType: 'topic-selection',
      location: 'practice-hub',
    })
    setSelectedTopic(null)
  }

  const handleDomainToggle = (domainIndex: number, isExpanded: boolean) => {
    trackEvent('Domain Accordion Toggled', {
      domain: domainIndex + 1,
      action: isExpanded ? 'collapsed' : 'expanded',
      location: 'practice-hub',
    })
    setExpandedDomain(isExpanded ? null : domainIndex)
  }

  const handleStartTest = (mode: '10' | 'all') => {
    if (!selectedTopic) return
    
    // Check if this is a domain test (pattern: domain-X-all)
    const isDomainTest = selectedTopic.id.includes('domain-') && selectedTopic.id.includes('-all')
    
    trackEvent('Modal Test Type Selected', {
      testMode: mode === '10' ? 'quick' : 'comprehensive',
      topicId: selectedTopic.id,
      topicTitle: selectedTopic.title,
      isDomainTest,
      location: 'practice-hub-modal',
    })
    
    if (isDomainTest) {
      // Domain test routing
      if (mode === '10') {
        // Route to domain quick test
        navigate(`/test/domain-quick/${selectedTopic.id}`, { state: { from: '/cpacc-practice-test' } })
      } else {
        // Route to domain comprehensive test
        navigate(`/test/${selectedTopic.id}`, { state: { from: '/cpacc-practice-test' } })
      }
    } else {
      // Regular topic test routing
      if (mode === '10') {
        handleTopicQuickTest(selectedTopic.id)
      } else {
        handleTopicFullTest(selectedTopic.id)
      }
    }
    setSelectedTopic(null)
  }

  return (
    <>
      <SEO 
        title="CPACC Practice Test - Free Mock Exams"
        description="Practice for CPACC certification with free 20 and 80-question mock exams covering all three domains. Build confidence before your CPACC exam."
        canonical="/cpacc-practice-test"
      />
      <main className="flex-1 overflow-y-auto flex flex-col">
        <Container size="xl" padding="md" className="flex-1 py-8 md:py-12">
        
        {/* Page Header */}
        <div className="mb-8">
          <Heading as="h1" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Practice
          </Heading>
          <Text variant="body1" className="text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            Use exam-style questions to practice applying accessibility concepts in context. This page works for CPACC candidates — and also for anyone who wants a structured way to check their accessibility fundamentals.
          </Text>
        </div>

        {/* Quick Knowledge Check Section */}
        <div className="mb-6">
          <Heading as="h2" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Quick knowledge check
          </Heading>
          <Text variant="body2" className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
            Test your knowledge on all accessibility topics in random order. Both options cover all three CPACC domains with questions distributed proportionally.
          </Text>
        </div>

        {/* Two quick test cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Super quick test card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <Heading as="h2" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                10 question test
              </Heading>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                ~10 minutes
              </span>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Perfect for a quick confidence check
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Test one or two concepts rapidly
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Takes just a few minutes
                </span>
              </li>
            </ul>
            
            <Button 
              onClick={handleSuperQuickTest}
              data-tracking-id="practice-super-quick-test-start"
              variant="primary"
              size="md"
              className="w-full md:w-auto inline-flex items-center gap-2 justify-center"
            >
              Start test
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Button>
          </div>

          {/* Quick knowledge check card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <Heading as="h2" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                20 question test
              </Heading>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                ~20 minutes
              </span>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Great for designers & engineers learning the basics
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Identify gaps fast — then jump back into a domain
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Easy to fit into a short break or team learning session
                </span>
              </li>
            </ul>
            
            <Button 
              onClick={handleQuickTest}
              data-tracking-id="practice-quick-test-start"
              variant="secondary"
              size="md"
              className="w-full md:w-auto inline-flex items-center gap-2 justify-center"
            >
              Start test
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mock Exam Section */}
        <div className="mb-6">
          <Heading as="h2" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            CPACC mock exam
          </Heading>
          <Text variant="body2" className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
            Experience a full-length CPACC practice exam. Get the closest simulation to exam day conditions with 80 questions covering all domains.
          </Text>
        </div>

        {/* Full mock card */}
        <div className="mb-12">
          {/* Full mock card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <Heading as="h2" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                80 question test
              </Heading>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                ~2 hours
              </span>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Closest to an end-to-end exam experience
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Best when you want a realistic readiness check
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Ideal 1–2 weeks before exam day (or as a milestone)
                </span>
              </li>
            </ul>
            
            <Button 
              onClick={handleFullMock}
              data-tracking-id="practice-mock-exam-start"
              variant="secondary"
              size="md"
              className="w-full md:w-auto inline-flex items-center gap-2 justify-center"
            >
              Start test
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Button>
          </div>

        </div>

        {/* Topic-based testing section */}
        <div className="mt-12">
          <Heading as="h2" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Topic Deep Dive
          </Heading>
          <Text variant="body2" className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl mb-6">
            Focus your practice on specific topics within each domain. Choose quick 10-question tests or comprehensive tests with all available questions.
          </Text>

          {/* Domain sections */}
          <div className="space-y-4">
            {cpacc_topics.map((domain, domainIndex) => {
              const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))
              const domainTitles = [
                'Disabilities, Challenges & Assistive Technologies',
                'Accessibility & Universal Design',
                'Standards, Laws & Management Strategies'
              ]
              
              const isExpanded = expandedDomain === domainIndex
              
              return (
                <div key={domain.id} className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleDomainToggle(domainIndex, isExpanded)}
                    data-tracking-id={`practice-domain-${domainIndex + 1}-toggle`}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg"
                  >
                    <Heading as="h3" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {domainTitles[domainIndex]}
                    </Heading>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-gray-400 dark:text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  
                  {isExpanded && (
                  <div className="px-6 pb-6 space-y-2">
                    {regularTopics.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => handleTopicClick(topic)}
                        data-tracking-id={`practice-topic-${topic.id}-select`}
                        className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group w-full text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                            {topic.subCategory && `${topic.subCategory}. `}{topic.title}
                          </span>
                        </div>
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    ))}
                    
                    {/* Divider */}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                    
                    {/* Test entire domain option */}
                    <button
                      onClick={() => handleTopicClick({
                        id: `${domain.id}-all`,
                        title: domainTitles[domainIndex]
                      })}
                      data-tracking-id={`practice-domain-${domainIndex + 1}-all-select`}
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group w-full text-left"
                    >
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Test all topics
                      </span>
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        </Container>
      </main>

    {/* Topic Test Selection Modal */}
    {selectedTopic && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={handleCloseModal}>
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 max-w-2xl w-full relative" onClick={(e) => e.stopPropagation()}>
          <IconButton
            onClick={handleCloseModal}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            }
            tooltip="Close modal"
            variant="ghost"
            data-tracking-id="practice-modal-close"
            className="absolute top-4 right-4"
            aria-label="Close modal"
          />
          
          <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Test topic
          </p>
          <Heading as="h3" className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {selectedTopic.subCategory && `${selectedTopic.subCategory}. `}{selectedTopic.title}
          </Heading>
          <Text variant="body2" className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Choose your test time
          </Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Quick test card */}
            <button
              onClick={() => handleStartTest('10')}
              data-tracking-id="practice-modal-quick-test"
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all text-left group"
            >
              <Heading as="h4" className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Quick knowledge check
              </Heading>
              <Text variant="body2" className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Perfect for a rapid knowledge check with 10 questions.
              </Text>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                10 minutes
              </span>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                <span>Choose test</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
            
            {/* Full test card */}
            <button
              onClick={() => handleStartTest('all')}
              data-tracking-id="practice-modal-comprehensive-test"
              className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all text-left group"
            >
              <Heading as="h4" className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Comprehensive
              </Heading>
              <Text variant="body2" className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Comprehensive practice on this topic. Test your complete understanding.
              </Text>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                10 minutes or more
              </span>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:gap-3 transition-all">
                <span>Choose test</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
