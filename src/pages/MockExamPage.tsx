import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SEO } from '../components/SEO'
import { cpacc_topics } from '../data/topics'
import { usePageTracking } from '../hooks/usePageTracking'
import { trackEvent } from '../utils/analytics'
import { Heading, Text, Button, IconButton, Container, Card, Badge, Clock, Grid, TopicNavigationList, TopicNavigationItem } from '../design-system'

export function MockExamPage() {
  usePageTracking('Practice Test Hub')
  const navigate = useNavigate()
  const [selectedTopic, setSelectedTopic] = useState<{ id: string; title: string; subCategory?: string } | null>(null)

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
        title="Free CPACC Practice Tests & Mock Exams"
        description="Practice for CPACC certification with free 20 and 80-question mock exams covering all three domains. Build confidence before your CPACC exam."
        canonical="/cpacc-practice-test"
      />
      <main className="flex-1 overflow-y-auto flex flex-col">
      <div className="flex-1">
        <Container size="xl" padding="md" className="py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <Heading as="h1" className="mb-3">
            Practice
          </Heading>
          <Grid cols={12}>
            <Text variant="body1" className="col-span-12 md:col-span-8">
              Use exam-style questions to practice applying accessibility concepts in context. This page works for CPACC candidates — and also for anyone who wants a structured way to check their accessibility fundamentals.
            </Text>
          </Grid>
        </div>

        {/* Quick Knowledge Check Section */}
        <div className="mb-6">
          <Heading as="h2" className="mb-2">
            Quick knowledge check
          </Heading>
          <Grid cols={12}>
            <Text variant="body2" className="col-span-12 md:col-span-8">
              Test your knowledge on all accessibility topics in random order. Both options cover all three CPACC domains with questions distributed proportionally.
            </Text>
          </Grid>
        </div>

        {/* Two quick test cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Super quick test card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Heading as="h3">
                10 question test
              </Heading>
              <Badge icon={Clock} size="sm">Approx. 10 min</Badge>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Perfect for a quick confidence check
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Test one or two concepts rapidly
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Takes just a few minutes
                </Text>
              </li>
            </ul>
            
            <Button 
              onClick={handleSuperQuickTest}
              data-tracking-id="practice-super-quick-test-start"
              variant="primary"
              size="md"
              className="w-full md:w-auto"
            >
              Start quick knowledge test
            </Button>
          </Card>

          {/* Quick knowledge check card */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Heading as="h3">
                20 question test
              </Heading>
              <Badge icon={Clock} size="sm">Approx. 20 min</Badge>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Great for designers & engineers learning the basics
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Identify gaps fast — then jump back into a domain
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Easy to fit into a short break or team learning session
                </Text>
              </li>
            </ul>
            
            <Button 
              onClick={handleQuickTest}
              data-tracking-id="practice-quick-test-start"
              variant="secondary"
              size="md"
              className="w-full md:w-auto"
            >
              Start quick knowledge test
            </Button>
          </Card>
        </div>

        {/* Mock Exam Section */}
        <div className="mb-6">
          <Heading as="h2" className="mb-2">
            CPACC mock exam
          </Heading>
          <Grid cols={12}>
            <Text variant="body2" className="col-span-12 md:col-span-8">
              Experience a full-length CPACC practice exam. Get the closest simulation to exam day conditions with 80 questions covering all domains.
            </Text>
          </Grid>
        </div>

        {/* Full mock card */}
        <div className="mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Heading as="h3">
                80 question test
              </Heading>
              <Badge icon={Clock} size="sm">Approx. 2 hrs</Badge>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Closest to an end-to-end exam experience
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Best when you want a realistic readiness check
                </Text>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                <Text as="span" variant="body2">
                  Ideal 1–2 weeks before exam day (or as a milestone)
                </Text>
              </li>
            </ul>
            
            <Button 
              onClick={handleFullMock}
              data-tracking-id="practice-mock-exam-start"
              variant="secondary"
              size="md"
              className="w-full md:w-auto"
            >
              Start mock exam
            </Button>
          </Card>
        </div>

        {/* Topic-based testing section */}
        <div className="mt-12">
          <Heading as="h2" className="mb-2">
            Topic Deep Dive
          </Heading>
          <Grid cols={12} className="mb-6">
            <Text variant="body2" className="col-span-12 md:col-span-8">
              Focus your practice on specific topics within each domain. Choose quick 10-question tests or comprehensive tests with all available questions.
            </Text>
          </Grid>

          {/* Domain sections - flat card layout */}
          <div className="space-y-4">
            {cpacc_topics.map((domain, domainIndex) => {
              const regularTopics = domain.topics.filter(t => !t.id.includes('-all'))
              const domainTitles = [
                'Disabilities, challenges & assistive technologies',
                'Accessibility & universal design',
                'Standards, laws & management strategies'
              ]
              
              return (
                <TopicNavigationList 
                  key={domain.id} 
                  title={domainTitles[domainIndex]}
                >
                  {regularTopics.map((topic) => (
                    <TopicNavigationItem
                      key={topic.id}
                      onClick={() => handleTopicClick(topic)}
                      subCategory={topic.subCategory}
                      data-tracking-id={`practice-topic-${topic.id}-select`}
                    >
                      {topic.title}
                    </TopicNavigationItem>
                  ))}
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                  
                  {/* Test entire domain option */}
                  <TopicNavigationItem
                    onClick={() => handleTopicClick({
                      id: `${domain.id}-all`,
                      title: domainTitles[domainIndex]
                    })}
                    emphasized
                    data-tracking-id={`practice-domain-${domainIndex + 1}-all-select`}
                  >
                    Test all topics
                  </TopicNavigationItem>
                </TopicNavigationList>
              )
            })}
          </div>
        </div>

        </Container>
      </div>
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
