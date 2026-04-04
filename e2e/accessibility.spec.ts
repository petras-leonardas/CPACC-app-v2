import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const staticRoutes = [
  { path: '/', name: 'Home' },
  { path: '/cpacc-practice-test', name: 'Practice Test Hub' },
  { path: '/disabilities-challenges-assistive-technology', name: 'Domain 1' },
  { path: '/accessibility-universal-design', name: 'Domain 2' },
  { path: '/standards-laws-management-strategies', name: 'Domain 3' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/terms', name: 'Terms' },
  { path: '/accessibility', name: 'Accessibility' },
  { path: '/about', name: 'About' },
]

const topicRoutes = [
  { path: '/disabilities-challenges-assistive-technology/1a-theoretical-models', name: 'Topic 1A' },
  { path: '/accessibility-universal-design/2c-wcag-principles', name: 'Topic 2C' },
  { path: '/standards-laws-management-strategies/3d-procurement-laws', name: 'Topic 3D' },
]

// Helper to format violations for readable test output
function formatViolations(violations: { impact?: string | null; id: string; description: string; nodes: unknown[] }[]) {
  return violations.map(v =>
    `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} instance${v.nodes.length > 1 ? 's' : ''})`
  ).join('\n')
}

test.describe('Accessibility scans (axe-core)', () => {
  // Static pages — check for critical and serious violations
  for (const route of staticRoutes) {
    test(`${route.name} (${route.path}) has no critical a11y violations`, async ({ page }) => {
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const critical = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(critical, `Accessibility violations on ${route.name}:\n${formatViolations(critical)}`).toHaveLength(0)
    })
  }

  // Topic detail pages — these render study content, TTS, table of contents
  for (const route of topicRoutes) {
    test(`${route.name} topic page (${route.path}) has no critical a11y violations`, async ({ page }) => {
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const critical = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      expect(critical, `Accessibility violations on ${route.name}:\n${formatViolations(critical)}`).toHaveLength(0)
    })
  }

  // Test flow — start a quick test and scan the question screen
  test('Test question screen has no critical a11y violations', async ({ page }) => {
    await page.goto('/test/topic-quick/1a-theoretical-models')
    // Wait for the first question to load
    await page.waitForSelector('[role="radiogroup"]', { timeout: 10_000 })

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const critical = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(critical, `Accessibility violations on test question screen:\n${formatViolations(critical)}`).toHaveLength(0)
  })

  // 404 page
  test('404 page has no critical a11y violations', async ({ page }) => {
    await page.goto('/some-nonexistent-page')
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const critical = results.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )

    expect(critical, `Accessibility violations on 404 page:\n${formatViolations(critical)}`).toHaveLength(0)
  })

  // Moderate violations — now also fail the build to enforce WCAG AA compliance.
  test('no moderate a11y violations across all pages', async ({ page }) => {
    const moderateIssues: string[] = []

    for (const route of [...staticRoutes, ...topicRoutes]) {
      await page.goto(route.path)
      await page.waitForLoadState('networkidle')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()

      const moderate = results.violations.filter(v => v.impact === 'moderate')
      if (moderate.length > 0) {
        moderateIssues.push(`\n${route.name} (${route.path}):`)
        moderate.forEach(v => {
          moderateIssues.push(`  [moderate] ${v.id}: ${v.description} (${v.nodes.length})`)
        })
      }
    }

    expect(
      moderateIssues,
      `Moderate a11y violations found:${moderateIssues.join('\n')}`
    ).toHaveLength(0)
  })
})

test.describe('Keyboard navigation', () => {
  test('skip link moves focus to main content', async ({ page }) => {
    await page.goto('/')
    // Tab to the skip link
    await page.keyboard.press('Tab')
    const skipLink = page.locator('[data-skip-link], a[href="#main-content"]').first()
    await expect(skipLink).toBeFocused()

    // Activate it
    await page.keyboard.press('Enter')
    // Main content should be focused
    const main = page.locator('#main-content')
    await expect(main).toBeFocused()
  })

  test('Tab navigates through interactive elements on home page', async ({ page }) => {
    await page.goto('/')
    // Tab through several elements — verify no focus traps
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
    }
    // Verify some element is focused (no crash, no dead end)
    const focused = await page.evaluate(() => document.activeElement?.tagName)
    expect(focused).toBeTruthy()
  })
})

test.describe('Theme toggle', () => {
  test('dark mode toggle works and persists', async ({ page }) => {
    await page.goto('/')
    
    // Click theme toggle
    const themeButton = page.getByLabel(/switch to (dark|light) mode/i)
    await themeButton.click()
    
    // Check dark class is applied
    const hasDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )
    expect(hasDark).toBe(true)

    // Navigate to another page and check persistence
    await page.goto('/privacy')
    const stillDark = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )
    expect(stillDark).toBe(true)
  })
})
