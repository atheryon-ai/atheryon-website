import { test, expect } from '@playwright/test'

// MORTGAGES. is intentionally hidden from the practice toggle while the
// practice is being built out (see src/components/PracticeToggle.tsx — the
// item is commented out, not removed). The three tests below assert toggle
// behavior that depends on that link being visible; they're skipped until
// Mortgages is resurfaced. The `/mortgages` route + mode-styling tests at
// the top of this file still run and remain green.

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

test.skip('clicking MORTGAGES. in the toggle navigates and flips data-mode', async ({ page }) => {
  await page.goto('/')
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('cm')

  await page.getByRole('link', { name: 'MORTGAGES.' }).click()
  await page.waitForURL('**/mortgages')

  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('mortgages')
})

test.skip('active practice link has aria-current="page"', async ({ page }) => {
  await page.goto('/mortgages')
  const active = page.getByRole('link', { name: 'MORTGAGES.' })
  await expect(active).toHaveAttribute('aria-current', 'page')

  const inactive = page.getByRole('link', { name: 'CAPITAL MARKETS.' })
  await expect(inactive).not.toHaveAttribute('aria-current', 'page')
})

test.skip('keyboard: Tab to first toggle link and activate with Enter navigates', async ({ page }) => {
  await page.goto('/')
  // Walk the focus order until we land on the CAPITAL MARKETS. link, then Tab to MORTGAGES.
  await page.keyboard.press('Tab') // first focusable — depends on the doc, usually the brand Link wrapper
  // Direct focus is more reliable than guessing tab depth for a static-export page:
  await page.getByRole('link', { name: 'MORTGAGES.' }).focus()
  await page.keyboard.press('Enter')
  await page.waitForURL('**/mortgages')
  expect(page.url()).toContain('/mortgages')
})
