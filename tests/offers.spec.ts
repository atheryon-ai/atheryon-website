import { test, expect } from '@playwright/test'

const OFFER_ROUTES = [
  '/offers',
  '/offers/code',
  '/offers/prompts',
  '/offers/consult',
]

const SKIP_LOCAL_REDIRECTS = !process.env.SWA_BASE_URL

for (const route of OFFER_ROUTES) {
  test(`${route} renders without console errors`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })

    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
    expect(consoleErrors).toEqual([])
  })

  test(`${route} fits mobile viewport at 375px (no horizontal overflow)`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(route)
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(scrollWidth).toBeLessThanOrEqual(375)
  })
}

test('Front Office bundle is visible on /offers/prompts', async ({ page }) => {
  await page.goto('/offers/prompts')
  await expect(page.getByRole('heading', { name: 'Front Office bundle' })).toBeVisible()
  await expect(page.getByText('$14,000 AUD').first()).toBeVisible()
})

test('legacy /labs/code redirects to /offers/code', async ({ page }) => {
  test.skip(SKIP_LOCAL_REDIRECTS, 'requires SWA_BASE_URL — skipped in local next dev')
  const response = await page.goto('/labs/code')
  expect(response?.url()).toContain('/offers/code')
})

test('legacy /programs/mib-insight redirects to /offers/prompts', async ({ page }) => {
  test.skip(SKIP_LOCAL_REDIRECTS, 'requires SWA_BASE_URL — skipped in local next dev')
  const response = await page.goto('/programs/mib-insight')
  expect(response?.url()).toContain('/offers/prompts')
})
