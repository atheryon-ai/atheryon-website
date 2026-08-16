import { test, expect } from '@playwright/test'

const SKIP_LOCAL_REDIRECTS = !process.env.SWA_BASE_URL

test('/themes index renders all 7 buyer themes', async ({ page }) => {
  const response = await page.goto('/themes')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'Front Office Trading', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Middle Office Ops', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Compliance & Surveillance', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Risk & Analytics', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Treasury', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Entity Intelligence', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Foundation / ODS', exact: true })).toBeVisible()
})

test('/themes index shows status badges for shipped + roadmap rows', async ({ page }) => {
  await page.goto('/themes')
  // Foundation/ODS is shipped → at least one SHIPPED badge visible.
  await expect(page.locator('[data-status="shipped"]').first()).toBeVisible()
  // Treasury is roadmap → at least one ROADMAP badge visible.
  await expect(page.locator('[data-status="roadmap"]').first()).toBeVisible()
})

const SHIPPED_ROWS = [
  { id: 'middle-office-ops', name: 'Middle Office Ops', workflowName: 'Trade lifecycle automation' },
  { id: 'compliance-surveillance', name: 'Compliance & Surveillance', workflowName: 'Risk reporting generation' },
  { id: 'risk-analytics', name: 'Risk & Analytics', workflowName: 'Portfolio analytics pipeline' },
  { id: 'foundation-ods', name: 'Foundation / ODS', workflowName: 'Financial data ingestion and structuring' },
] as const

const ROADMAP_ROWS = [
  { id: 'front-office-trading', name: 'Front Office Trading' },
  { id: 'treasury', name: 'Treasury' },
  { id: 'entity-intelligence', name: 'Entity Intelligence' },
] as const

for (const row of SHIPPED_ROWS) {
  test(`/themes/${row.id} renders SHIPPED badge + embedded workflow`, async ({ page }) => {
    const response = await page.goto(`/themes/${row.id}`)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: row.name, exact: true })).toBeVisible()
    await expect(page.locator('[data-status="shipped"]').first()).toBeVisible()
    await expect(page.getByText(row.workflowName, { exact: false }).first()).toBeVisible()
  })
}

for (const row of ROADMAP_ROWS) {
  test(`/themes/${row.id} renders ROADMAP marker (no workflow)`, async ({ page }) => {
    const response = await page.goto(`/themes/${row.id}`)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: row.name, exact: true })).toBeVisible()
    await expect(page.locator('[data-status="roadmap"]').first()).toBeVisible()
    await expect(page.getByText('ROADMAP', { exact: false }).first()).toBeVisible()
  })
}

test('legacy /workflows redirects to /themes', async ({ page }) => {
  test.skip(SKIP_LOCAL_REDIRECTS, 'requires SWA_BASE_URL — skipped in local next dev')
  const response = await page.goto('/workflows')
  expect(response?.url()).toContain('/themes')
})

// /roadmap was removed on 2026-08-15 (Terry): it was the last surface still
// advertising the mortgages practice and it published dates for unshipped
// work. Deliberately no redirect — the URL 404s.
test('/roadmap is gone and is not linked from the footer', async ({ page }) => {
  const response = await page.goto('/roadmap')
  expect(response?.status()).toBe(404)

  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Roadmap', exact: true })).toHaveCount(0)
})

// /blog was removed on 2026-08-16 (Terry). Deliberately no redirect — the
// URL 404s, as does the one post that lived under it.
test('/blog is gone and is not linked from the footer', async ({ page }) => {
  const index = await page.goto('/blog')
  expect(index?.status()).toBe(404)
  const post = await page.goto('/blog/why-claude')
  expect(post?.status()).toBe(404)

  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Writing', exact: true })).toHaveCount(0)
})
