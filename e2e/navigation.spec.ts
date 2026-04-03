import { test, expect } from '@playwright/test'

test.describe('Page navigation', () => {
  test('home page loads with correct heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('can navigate to Domain 1 from home', async ({ page }) => {
    await page.goto('/')
    // Click Domain 1 link
    await page.getByRole('link', { name: /disabilities.*challenges|domain 1/i }).first().click()
    await expect(page).toHaveURL(/disabilities-challenges-assistive-technology/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('can navigate to a topic from domain page', async ({ page }) => {
    await page.goto('/disabilities-challenges-assistive-technology')
    // Click first topic link
    await page.getByRole('link').filter({ hasText: /theoretical models/i }).first().click()
    await expect(page).toHaveURL(/disabilities-challenges-assistive-technology\/1a/)
    // Topic content should be visible
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })

  test('can navigate to practice test hub', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href*="cpacc-practice-test"]').first().click()
    await expect(page).toHaveURL(/cpacc-practice-test/)
  })
})

test.describe('Legacy URL redirects', () => {
  const redirects = [
    { from: '/domain-1', to: '/disabilities-challenges-assistive-technology' },
    { from: '/domain-2', to: '/accessibility-universal-design' },
    { from: '/domain-3', to: '/standards-laws-management-strategies' },
    { from: '/mock-exam', to: '/cpacc-practice-test' },
  ]

  for (const { from, to } of redirects) {
    test(`${from} redirects to ${to}`, async ({ page }) => {
      await page.goto(from)
      await expect(page).toHaveURL(to)
    })
  }
})

test.describe('Legal pages', () => {
  const legalPages = [
    { path: '/privacy', title: 'Privacy Policy' },
    { path: '/terms', title: 'Terms of Service' },
    { path: '/accessibility', title: 'Accessibility Statement' },
  ]

  for (const { path, title } of legalPages) {
    test(`${title} page loads correctly`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible()
      // Back button should be present
      await expect(page.getByRole('button', { name: 'Back', exact: true })).toBeVisible()
    })
  }
})
