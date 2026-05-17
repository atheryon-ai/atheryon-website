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
