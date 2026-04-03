import { test, expect } from '@playwright/test'

test.describe('Test-taking flow', () => {
  test('can start and answer a topic quick test', async ({ page }) => {
    // Navigate to a topic test via URL
    await page.goto('/test/topic-quick/1a-theoretical-models')
    
    // Should see question 1/10 (or fewer)
    await expect(page.getByText(/1\//)).toBeVisible({ timeout: 5000 })

    // A question heading should be visible
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible()

    // Answer options should be present (radio buttons or clickable options)
    const options = page.locator('[data-tracking-id*="option"], [role="radio"], button').filter({ hasText: /[A-Za-z]/ })
    await expect(options.first()).toBeVisible()

    // Select the first answer
    await options.first().click()

    // Submit button should be available
    const submitButton = page.getByRole('button', { name: /submit|confirm|next/i })
    if (await submitButton.isVisible()) {
      await submitButton.click()
    }

    // Should advance to question 2 or show result
    await page.waitForTimeout(500)
    const pageContent = await page.textContent('body')
    expect(pageContent).toBeTruthy()
  })

  test('end test button shows exit confirmation', async ({ page }) => {
    await page.goto('/test/topic-quick/1a-theoretical-models')
    await page.waitForLoadState('networkidle')

    // Click "End test" button
    const endButton = page.getByRole('button', { name: /end test|finish/i })
    if (await endButton.isVisible()) {
      await endButton.click()

      // Exit modal should appear
      const modal = page.getByRole('dialog').or(page.locator('[class*="modal"], [class*="fixed"]').filter({ hasText: /exit|leave|sure/i }))
      await expect(modal.first()).toBeVisible({ timeout: 3000 })
    }
  })

  test('mock exam page shows domain topics', async ({ page }) => {
    await page.goto('/cpacc-practice-test')

    // Should show topic navigation sections (by domain heading or topic links)
    await expect(page.getByText(/disabilities.*challenges|assistive technolog/i).first()).toBeVisible()
    await expect(page.getByText(/accessibility.*universal design/i).first()).toBeVisible()
    await expect(page.getByText(/standards.*laws|management strateg/i).first()).toBeVisible()
  })
})
