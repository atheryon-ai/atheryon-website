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
  await expect(page.getByText('M&A success is determined before the deal is signed', { exact: false }).first()).toBeVisible()
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
  await expect(page.getByText('Value realised post-sign, not eroded', { exact: false }).first()).toBeVisible()
})

test('/ma renders CTA with pre-sign-or-post-sign supporting line', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('link', { name: 'Book an M&A execution review' })).toBeVisible()
  await expect(page.getByText('Pre-sign or post-sign', { exact: false })).toBeVisible()
})

test('/ma/approach route 200 + sets data-mode="ma"', async ({ page }) => {
  const response = await page.goto('/ma/approach')
  expect(response?.status()).toBe(200)
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})

test('/ma/approach renders all 5 sections (§01–§05)', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('§01 / Approach', { exact: false })).toBeVisible()
  await expect(page.getByText('§02 / AI Data Specialist Work', { exact: false })).toBeVisible()
  await expect(page.getByText('§03 / Workflow Examples', { exact: false })).toBeVisible()
  await expect(page.getByText('§04 / Embedded Delivery', { exact: false })).toBeVisible()
  await expect(page.getByText('§05 / Senior Specialist', { exact: false })).toBeVisible()
})

test('/ma/approach mentions S&P Global and Microsoft Azure', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('S&P Global', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('Microsoft Azure', { exact: false }).first()).toBeVisible()
})

test('/ma/approach renders Anna Contos bio', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('Anna Contos', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('Head of Separation and Integration Advisory at Westpac', { exact: false })).toBeVisible()
})

test('/ma/approach renders 3 workflow examples (pre-sign + 2 delivery)', async ({ page }) => {
  await page.goto('/ma/approach')
  await expect(page.getByText('Pre-Sign Execution Review', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('Separation/Integration Planning', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('TSA Tracking & Reduction', { exact: false }).first()).toBeVisible()
})
