import { useNavigate } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { trackEvent } from '../utils/analytics'
import { Heading, Text, Button, Container, Card, Badge, Grid } from '../design-system'

export function MockExamPage() {
  usePageTracking('Practice Test Hub')
  const navigate = useNavigate()

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

  return (
    <>
      <SEO 
        title="Free CPACC Practice Tests — Test Your Accessibility Knowledge"
        description="Practice applying accessibility concepts with exam-style questions. Choose from quick, standard, or full-length practice tests covering all three CPACC domains."
        canonical="/cpacc-practice-test"
      />
      <main className="flex-1 flex flex-col">
      <div className="flex-1">
        <Container size="xl" padding="md" className="py-6 md:py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <Heading as="h1" className="mb-3">
            Practice
          </Heading>
          <Grid cols={12}>
            <Text variant="body1" className="col-span-12 md:col-span-8">
              Test your understanding of accessibility concepts with exam-style questions. Choose the format that fits your time.
            </Text>
          </Grid>
        </div>

        {/* Three test cards */}
        <Grid cols={12} gap="md">

          {/* 10 question test */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="p-6 h-full flex flex-col">
              <Heading as="h2" className="mb-4">
                Quick check
              </Heading>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    10 questions across all three domains
                  </Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    Great for a fast confidence check between study sessions
                  </Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    Randomly selected, different every time
                  </Text>
                </li>
              </ul>

              <Badge size="sm" className="self-start mb-4">About 10 minutes</Badge>
              
              <Button 
                onClick={handleSuperQuickTest}
                data-tracking-id="practice-super-quick-test-start"
                variant="primary"
                size="md"
                className="w-full md:w-auto mt-auto"
              >
                Start quick check
              </Button>
            </Card>
          </div>

          {/* 20 question test */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="p-6 h-full flex flex-col">
              <Heading as="h2" className="mb-4">
                Practice test
              </Heading>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    20 questions distributed proportionally across all domains
                  </Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    Helps identify gaps in your understanding
                  </Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    Good for a focused study session or team learning
                  </Text>
                </li>
              </ul>

              <Badge size="sm" className="self-start mb-4">About 20 minutes</Badge>
              
              <Button 
                onClick={handleQuickTest}
                data-tracking-id="practice-quick-test-start"
                variant="secondary"
                size="md"
                className="w-full md:w-auto mt-auto"
              >
                Start practice test
              </Button>
            </Card>
          </div>

          {/* Full practice test */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="p-6 h-full flex flex-col">
              <Heading as="h2" className="mb-4">
                Full practice test
              </Heading>
              
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    80 questions covering all three domains in depth
                  </Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    A thorough test of your accessibility knowledge
                  </Text>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-full mt-2"></span>
                  <Text as="span" variant="body2">
                    Ideal when you want to assess your full understanding
                  </Text>
                </li>
              </ul>

              <Badge size="sm" className="self-start mb-4">About 2 hours</Badge>
              
              <Button 
                onClick={handleFullMock}
                data-tracking-id="practice-mock-exam-start"
                variant="secondary"
                size="md"
                className="w-full md:w-auto mt-auto"
              >
                Start full practice test
              </Button>
            </Card>
          </div>

        </Grid>

        </Container>
      </div>
    </main>
    </>
  )
}
