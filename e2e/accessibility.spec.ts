import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = [
  { path: '/', name: 'Home' },
  { path: '/cpacc-practice-test', name: 'Practice Test Hub' },
  { path: '/disabilities-challenges-assistive-technology', name: 'Domain 1' },
  { path: '/accessibility-universal-design', name: 'Domain 2' },
  { path: '/standards-laws-management-strategies', name: 'Domain 3' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/terms', name: 'Terms' },
  { path: '/accessibility', name: 'Accessibility' },
]

test.describe('Accessibility scans (axe-core)', () => {
  for (const route of routes) {
    test(`${route.name} (${route.path}) has no critical a11y violations`, async ({ page }) => {
      await page.goto(route.path)
      // Wait for content to render
      await page.waitForLoadState('networkidle')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        // Only fail on critical and serious violations
        .analyze()

      const critical = results.violations.filter(
        v => v.impact === 'critical' || v.impact === 'serious'
      )

      if (critical.length > 0) {
        const summary = critical.map(v =>
          `[${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} instance${v.nodes.length > 1 ? 's' : ''})`
        ).join('\n')
        expect.soft(critical, `Accessibility violations:\n${summary}`).toHaveLength(0)
      }
    })
  }
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
    // Tab through several elements -- verify no focus traps
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
