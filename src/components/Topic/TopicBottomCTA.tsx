import { Heading, Text, Button, Card } from '../../design-system'

interface TopicBottomCTAProps {
  onTestClick: () => void
}

/**
 * Bottom CTA card encouraging users to test their knowledge
 * Appears at the end of topic content
 */
export function TopicBottomCTA({ onTestClick }: TopicBottomCTAProps) {
  return (
    <Card className="mt-12 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <Heading as="h3">
            Ready to check your understanding?
          </Heading>
          <Text variant="body2" className="text-gray-600 dark:text-gray-400 mt-2">
            Take a short test on this topic anytime — the reading stands on its own.
          </Text>
        </div>
        <Button 
          onClick={onTestClick}
          data-tracking-id="topic-cta-quick-test"
          variant="primary"
          size="lg"
          className="w-full md:w-auto flex-shrink-0"
        >
          Quick knowledge check
        </Button>
      </div>
    </Card>
  )
}
