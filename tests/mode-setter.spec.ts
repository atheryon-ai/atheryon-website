import { test, expect } from '@playwright/test'

// ModeSetter derives <html data-mode> from the pathname; the accent styling
// for each shell depends on it. The PracticeToggle and the /ma shell were
// retired in the exec-first IA restructure (2026-08-09).

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
