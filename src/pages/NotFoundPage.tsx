import { useNavigate } from 'react-router-dom'
import { SEO } from '../components/SEO'
import { Heading, Text, Button, Container, Stack } from '../design-system'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        noindex
      />
      <Container size="sm" padding="md" className="py-16 md:py-24">
        <Stack spacing="lg" align="center" className="text-center">
          <Text variant="body1" className="text-6xl font-bold text-gray-300 dark:text-gray-700">
            404
          </Text>
          <Heading as="h1">Page not found</Heading>
          <Text variant="body1">
            The page you're looking for doesn't exist or has been moved.
          </Text>
          <div className="flex gap-3 flex-wrap justify-center pt-2">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Go back
            </Button>
            <Button variant="primary" onClick={() => navigate('/')}>
              Home page
            </Button>
          </div>
        </Stack>
      </Container>
    </>
  )
}
