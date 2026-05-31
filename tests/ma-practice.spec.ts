import { test, expect } from '@playwright/test'

test('/ma route 200 + sets data-mode="ma" on <html>', async ({ page }) => {
  const response = await page.goto('/ma')
  expect(response?.status()).toBe(200)
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})

test('/ma renders hero thesis headline', async ({ page }) => {
  await page.goto('/ma')
  await expect(
    page.getByRole('heading', { level: 1, name: /Talk to us before signing/i }),
  ).toBeVisible()
})

test('/ma renders pre-sign trigger as #1', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByText('Late-stage deal negotiation', { exact: false })).toBeVisible()
})

test('/ma surfaces Anna Contos as practice lead', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('heading', { level: 3, name: 'Anna Contos' })).toBeVisible()
})

test('/ma renders primary CTA → /ma/contact', async ({ page }) => {
  await page.goto('/ma')
  const cta = page.getByRole('link', { name: /BOOK M&A REVIEW/i }).first()
  await expect(cta).toBeVisible()
  await expect(cta).toHaveAttribute('href', '/ma/contact')
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

test('/ma/offers route 200 + sets data-mode="ma"', async ({ page }) => {
  const response = await page.goto('/ma/offers')
  expect(response?.status()).toBe(200)
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})

test('/ma/offers renders single Embedded Execution Specialists offer card', async ({ page }) => {
  await page.goto('/ma/offers')
  await expect(page.getByRole('heading', { name: 'Embedded Execution Specialists', exact: true })).toBeVisible()
  await expect(page.getByText('Anna Contos leads the practice', { exact: false })).toBeVisible()
})

test('/ma/offers explains Code and Prompts are CM-only', async ({ page }) => {
  await page.goto('/ma/offers')
  await expect(page.getByText('Not offered for M&A', { exact: false })).toBeVisible()
  await expect(page.getByText('We do not productise M&A separately', { exact: false })).toBeVisible()
  await expect(page.getByRole('link', { name: /See capital-markets offers/ })).toBeVisible()
})

test('Clicking M&A pill in toggle navigates to /ma (no longer 301 to /)', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'M&A.' }).click()
  await page.waitForURL('**/ma')
  await expect.poll(async () =>
    page.evaluate(() => document.documentElement.dataset.mode),
  ).toBe('ma')
})
