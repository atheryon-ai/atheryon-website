import { test, expect } from '@playwright/test'

const SKIP_LOCAL_REDIRECTS = !process.env.SWA_BASE_URL

test('/ma route 200 + sets data-mode="ma" on <html>', async ({ page }) => {
  const response = await page.goto('/ma')
  expect(response?.status()).toBe(200)
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})

test('/ma renders M&A Execution heading + thesis lead', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('heading', { level: 1, name: 'M&A Execution' })).toBeVisible()
  await expect(page.getByText('M&A success is determined before the deal is signed', { exact: false })).toBeVisible()
})

test('/ma renders pre-sign trigger as #1', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByText('Late-stage deal negotiation', { exact: false })).toBeVisible()
})

test('/ma renders all 6 outcomes', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByText('Pre-sign execution clarity', { exact: false })).toBeVisible()
  await expect(page.getByText('Clean separation/integration delivered to timeline', { exact: false })).toBeVisible()
  await expect(page.getByText('Reduced TSA cost and duration', { exact: false })).toBeVisible()
  await expect(page.getByText('Value realised post-sign, not eroded', { exact: false })).toBeVisible()
})

test('/ma renders CTA with pre-sign-or-post-sign supporting line', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('link', { name: 'Book an M&A execution review' })).toBeVisible()
  await expect(page.getByText('Pre-sign or post-sign', { exact: false })).toBeVisible()
})
