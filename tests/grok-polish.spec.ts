import { test, expect } from '@playwright/test'

test('/system §01 renders the architecture diagram at desktop and mobile', async ({ page }) => {
  // The §01 diagram is one responsive <figure> (no SVG, no separate mobile fallback);
  // it must render its key layers at both desktop and mobile widths.
  const figure = page.locator('figure').filter({ hasText: /Operational Data Store/i })

  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/system')
  await expect(figure).toBeVisible()
  await expect(figure.getByText('Data Sources', { exact: true })).toBeVisible()
  await expect(figure.getByText('Operational Outputs', { exact: true })).toBeVisible()

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/system')
  await expect(figure).toBeVisible()
  await expect(figure.getByText('Data Sources', { exact: true })).toBeVisible()
  await expect(figure.getByText('Operational Outputs', { exact: true })).toBeVisible()
})

test('/ma/contact form field order is Name, Company, Email, Message', async ({ page }) => {
  // The enquiry form lives on the arm contact pages; root /contact is a
  // chooser (Terry 2026-08-09).
  await page.goto('/ma/contact')
  const labels = await page.locator('form label').allTextContents()
  const trimmed = labels.map((l) => l.trim().replace(/\s*\*$/, '').trim())
  expect(trimmed[0]).toMatch(/^Name/i)
  expect(trimmed[1]).toMatch(/^Company/i)
  expect(trimmed[2]).toMatch(/^Email/i)
  expect(trimmed[3]).toMatch(/(message|situation)/i)
})

test('Footer has info@atheryon.com.au mailto link', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('footer a[href^="mailto:info@atheryon.com.au"]')).toBeVisible()
})

test('/system mobile page does not horizontally overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/system')
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(scrollWidth, 'mobile overflow on /system').toBeLessThanOrEqual(375)
})

test('/labs evidence strip has exactly four populated proof items', async ({ page }) => {
  await page.goto('/labs')
  const evidence = page.getByRole('heading', { name: 'What was built, how fast' }).locator('..').locator('..')
  const proofItems = evidence.locator('ul').first().locator(':scope > li')
  await expect(proofItems).toHaveCount(4)
  for (const item of await proofItems.all()) {
    await expect(item).not.toBeEmpty()
  }
})
