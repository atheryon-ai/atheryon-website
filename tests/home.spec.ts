import { test, expect } from '@playwright/test'

test('homepage renders the dark navy AI-platform hero', async ({ page }) => {
  await page.goto('/')

  // Top nav lockup is visible
  await expect(page.getByText('ATHERYON', { exact: true })).toBeVisible()
  await expect(page.getByText('DATA.', { exact: false }).first()).toBeVisible()

  // Hero copy
  await expect(
    page.getByRole('heading', { level: 1 }),
  ).toContainText('capital markets AI systems')
  await expect(page.getByText('AI agents.', { exact: false }).first()).toBeVisible()

  // 3 domain cards
  await expect(page.getByText('Capital Markets Systems', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('Data Platforms', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('AI Agent Systems', { exact: false }).first()).toBeVisible()

  // 3-offer strip
  await expect(page.getByText('Buy the code', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('License prompts', { exact: false }).first()).toBeVisible()
  await expect(page.getByText('Consult', { exact: true }).first()).toBeVisible()

  // CTA card
  await expect(
    page.getByText('A Reference System. Proven Architecture.', { exact: false }),
  ).toBeVisible()

  // Background should be deep navy (sanity check, computed style on body)
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  )
  expect(bg).toMatch(/rgb\((6|7|8), (10|11|12), (28|29|30)\)/)
})
