import { test, expect } from '@playwright/test'

test('/mortgages route sets data-mode="mortgages" on <html>', async ({ page }) => {
  const response = await page.goto('/mortgages')
  expect(response?.status()).toBe(200)
  // Wait briefly for the client-side ModeSetter useEffect to flush.
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('mortgages')
})

test('/ route sets data-mode="cm" on <html>', async ({ page }) => {
  await page.goto('/')
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('cm')
})
