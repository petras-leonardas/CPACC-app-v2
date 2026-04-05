import React from 'react'
import { Heading, Text, Button, Container, Stack } from '../design-system'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * React Error Boundary that catches render errors and shows a
 * friendly recovery UI instead of a white screen.
 *
 * Class component is required -- React does not yet support
 * error boundaries as function components.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console for debugging -- the global error tracking in
    // analyticsHelpers.ts will also pick this up via window.onerror
    console.error('[ErrorBoundary] Caught render error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.href = '/'
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6"
          role="alert"
        >
            <Container size="sm">
            <Stack spacing="lg" align="center" className="text-center">
              <Heading as="h1">Something went wrong</Heading>
              <Text variant="body1">
                An unexpected error occurred. You can try again or return to the
                home page.
              </Text>
              {this.state.error && (
                <Text variant="small" className="text-gray-500 dark:text-gray-400 break-all max-w-full">
                  {this.state.error.message}
                </Text>
              )}
              <div className="flex gap-3 flex-wrap justify-center">
                <Button variant="secondary" onClick={this.handleRetry}>
                  Try again
                </Button>
                <Button variant="primary" onClick={this.handleReload}>
                  Go to home page
                </Button>
              </div>
            </Stack>
          </Container>
        </div>
      )
    }

    return this.props.children
  }
}
