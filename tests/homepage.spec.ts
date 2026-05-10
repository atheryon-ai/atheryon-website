import { test, expect } from '@playwright/test'

test.describe('homepage /', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renders the /reality hero', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /Reality is built on data/i })).toBeVisible()
  })

  test('Floor 13 switchboard is reachable', async ({ page }) => {
    await expect(page.getByTestId('floor13-dial')).toHaveCount(3)
  })
})
