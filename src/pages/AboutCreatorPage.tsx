import { useState, useEffect } from 'react'
import { SEO } from '../components/SEO'
import { usePageTracking } from '../hooks/usePageTracking'
import { trackEvent } from '../utils/analytics'
import { Heading, Text, Link, Button, Container, Grid, Card, ChevronLeft, ChevronRight } from '../design-system'

const MEDIUM_RSS_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@leodesignstheworld'

const ARTICLES_PER_PAGE = 3

interface MediumArticle {
  title: string
  pubDate: string
  link: string
  thumbnail: string
  description: string
  categories: string[]
}

/** Extract the first <img src="..."> from HTML content as a fallback thumbnail. */
function extractImageFromHtml(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/)
  return match?.[1] ?? ''
}

/** Strip HTML tags and truncate to a max length for a plain-text excerpt. */
function stripHtmlToExcerpt(html: string, maxLength = 120): string {
  const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

/** Format "2026-01-22 09:18:18" → "Jan 22, 2026" */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function AboutCreatorPage() {
  usePageTracking('About the Creator')

  const [articles, setArticles] = useState<MediumArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [articlePage, setArticlePage] = useState(0)

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const visibleArticles = articles.slice(
    articlePage * ARTICLES_PER_PAGE,
    (articlePage + 1) * ARTICLES_PER_PAGE
  )

  useEffect(() => {
    let cancelled = false

    async function fetchArticles() {
      try {
        const response = await fetch(MEDIUM_RSS_URL)
        const data = await response.json()

        if (!cancelled && data.status === 'ok' && Array.isArray(data.items)) {
          setArticles(data.items)
        } else if (!cancelled) {
          setHasError(true)
        }
      } catch {
        if (!cancelled) setHasError(true)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    fetchArticles()
    return () => {
      cancelled = true
    }
  }, [])

  const handleLinkClick = (destination: string, url: string) => {
    trackEvent('Creator Link Clicked', {
      destination,
      url,
    })
  }

  const handleArticleClick = (title: string, url: string) => {
    trackEvent('Creator Link Clicked', {
      destination: 'medium-article',
      url,
      articleTitle: title,
    })
  }

  return (
    <>
      <SEO
        title="About the creator"
        description="Learn about Leo Bacevicius, the product designer behind CPACC Mastery — a free accessibility certification study resource."
        canonical="/about"
      />

      <main className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1">
          <Container size="xl" padding="md" className="py-6 md:py-8">
            {/* Page Header */}
            <Heading as="h1" className="mb-8">
              About the creator
            </Heading>

            {/* Hero: Bio + Photo */}
            <div className="mb-10">
              <Grid cols={12} gap="lg">
                {/* Left Column - Name, role, bio (8 columns) */}
                <div className="col-span-12 lg:col-span-8">
                  <Heading as="h2" className="mb-1">
                    Leo Bacevicius
                  </Heading>
                  <Text
                    variant="body2"
                    className="text-content-secondary mb-6"
                  >
                    Product builder, design at heart
                  </Text>

                  <Text variant="body1" className="mb-4">
                    I created CPACC Mastery as a study companion for myself
                    first. As someone with Auditory Processing Disorder (APD), I
                    needed a way to engage with certification material that
                    worked for my brain &mdash; which is why features like
                    text-to-speech exist here.
                  </Text>
                  <Text variant="body1" className="mb-6">
                    My hope is that this resource helps others on their own
                    journey to understanding and championing accessibility.
                  </Text>

                  {/* Find me elsewhere */}
                  <Heading as="h3" className="mb-3">
                    Find me elsewhere
                  </Heading>
                  <nav
                    aria-label="Creator links"
                    className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4"
                  >
                    <Link
                      href="https://www.linkedin.com/in/leobacevicius"
                      external
                      onClick={() =>
                        handleLinkClick(
                          'linkedin',
                          'https://www.linkedin.com/in/leobacevicius'
                        )
                      }
                      underline="always"
                      data-tracking-id="creator-linkedin"
                    >
                      LinkedIn
                    </Link>
                    <Link
                      href="https://medium.com/@leodesignstheworld"
                      external
                      onClick={() =>
                        handleLinkClick(
                          'medium',
                          'https://medium.com/@leodesignstheworld'
                        )
                      }
                      underline="always"
                      data-tracking-id="creator-medium"
                    >
                      Medium
                    </Link>
                    <Link
                      href="https://leodesignstheworld.com/"
                      external
                      onClick={() =>
                        handleLinkClick(
                          'portfolio',
                          'https://leodesignstheworld.com/'
                        )
                      }
                      underline="always"
                      data-tracking-id="creator-portfolio"
                    >
                      Portfolio
                    </Link>
                  </nav>
                </div>

                {/* Right Column - Photo (4 columns, hidden on mobile) */}
                <div className="hidden lg:col-span-4 lg:flex items-start justify-center">
                  <img
                    src="/leo-bacevicius.jpg"
                    alt="Leo Bacevicius, creator of CPACC Mastery"
                    className="rounded-xl w-full max-w-[280px] shadow-md"
                    width={280}
                    height={373}
                    loading="eager"
                  />
                </div>
              </Grid>
            </div>

            {/* Articles Section */}
            <div className="border-t border-semantic pt-8 mb-10">
              <Heading as="h2" className="mb-2">
                Articles &amp; writing
              </Heading>
              <Text variant="body2" className="text-content-secondary mb-6">
                Recent posts from Medium
              </Text>

              {isLoading && (
                <Grid cols={12} gap="md">
                  {Array.from({ length: ARTICLES_PER_PAGE }).map((_, i) => (
                    <div key={i} className="col-span-12 md:col-span-4">
                      <Card className="h-full animate-pulse">
                        <div className="aspect-[16/9] rounded-lg bg-gray-200 dark:bg-gray-700 mb-4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/2" />
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                      </Card>
                    </div>
                  ))}
                </Grid>
              )}

              {hasError && (
                <Text variant="body2" className="text-content-secondary">
                  Unable to load articles right now.{' '}
                  <Link
                    href="https://medium.com/@leodesignstheworld"
                    external
                    underline="always"
                    onClick={() =>
                      handleLinkClick(
                        'medium',
                        'https://medium.com/@leodesignstheworld'
                      )
                    }
                    data-tracking-id="creator-medium-fallback"
                  >
                    Visit my Medium profile
                  </Link>{' '}
                  to read them directly.
                </Text>
              )}

              {!isLoading && !hasError && visibleArticles.length > 0 && (
                <>
                  <Grid cols={12} gap="md">
                    {visibleArticles.map((article) => {
                      const thumbnail =
                        article.thumbnail ||
                        extractImageFromHtml(article.description)
                      const excerpt = stripHtmlToExcerpt(article.description)

                      return (
                        <Link
                          key={article.link}
                          href={article.link}
                          external
                          showExternalIcon={false}
                          onClick={() =>
                            handleArticleClick(article.title, article.link)
                          }
                          className="col-span-12 md:col-span-4 no-underline group"
                          data-tracking-id="creator-article"
                        >
                          <Card interactive className="h-full">
                            {thumbnail && (
                              <img
                                src={thumbnail}
                                alt={article.title}
                                className="w-full aspect-[16/9] object-cover rounded-lg mb-4"
                                loading="lazy"
                              />
                            )}
                            <Heading as="h3" className="text-base mb-1">
                              {article.title}
                            </Heading>
                            <Text
                              variant="small"
                              className="text-content-secondary mb-3"
                            >
                              <time dateTime={article.pubDate}>
                                {formatDate(article.pubDate)}
                              </time>
                            </Text>
                            <Text
                              variant="small"
                              className="text-content-secondary"
                            >
                              {excerpt}
                            </Text>
                          </Card>
                        </Link>
                      )
                    })}
                  </Grid>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<ChevronLeft size={16} />}
                        onClick={() => {
                          const newPage = articlePage - 1
                          setArticlePage(newPage)
                          trackEvent('Articles Paginated', {
                            direction: 'previous',
                            page: newPage + 1,
                            totalPages,
                          })
                        }}
                        disabled={articlePage === 0}
                        aria-label="Previous articles"
                        data-tracking-id="creator-articles-previous"
                      >
                        Previous
                      </Button>
                      <Text variant="small" className="text-content-secondary">
                        {articlePage + 1} of {totalPages}
                      </Text>
                      <Button
                        variant="secondary"
                        size="sm"
                        rightIcon={<ChevronRight size={16} />}
                        onClick={() => {
                          const newPage = articlePage + 1
                          setArticlePage(newPage)
                          trackEvent('Articles Paginated', {
                            direction: 'next',
                            page: newPage + 1,
                            totalPages,
                          })
                        }}
                        disabled={articlePage === totalPages - 1}
                        aria-label="Next articles"
                        data-tracking-id="creator-articles-next"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>


          </Container>
        </div>
      </main>
    </>
  )
}
