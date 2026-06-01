// tests/system.spec.ts
import { test, expect } from '@playwright/test'

test('/system renders 200 with no console errors', async ({ page }) => {
  const consoleErrors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  const response = await page.goto('/system')
  expect(response?.status()).toBe(200)
  expect(consoleErrors).toEqual([])
})

test('§01 shows the two-class agent architecture', async ({ page }) => {
  await page.goto('/system')
  const body = page.locator('body')
  // §01 is a responsive <figure> diagram. Labels render as real mixed-case text
  // with CSS uppercasing, so assert content case-insensitively.
  await expect(page.locator('figure')).toBeVisible()
  await expect(body).toContainText(/ETL AGENTS/i)
  await expect(body).toContainText(/OPERATIONAL DATA STORE \(ODS\)/i)
  await expect(body).toContainText(/OPERATIONS AGENTS/i)
  await expect(body).toContainText('Front Office')
  await expect(body).toContainText('Risk & Analytics')
  await expect(body).toContainText('Compliance')
  await expect(body).toContainText('Treasury / Finance')
  await expect(body).toContainText(/ORCHESTRATOR/i)
  await expect(body).toContainText(/EXPERT SIGN-OFF/i)
  await expect(body).toContainText(/DIRECTORIAL ARCHIVE/i)
})

test('/system fits mobile viewport at 375px (no horizontal overflow)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/system')
  await expect(page.locator('body')).toContainText(/ETL agents/i)
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
  expect(scrollWidth).toBeLessThanOrEqual(375)
})

test('§01 says built on Claude and not Azure OpenAI', async ({ page }) => {
  await page.goto('/system')
  const body = page.locator('body')
  await expect(body).toContainText('Claude')
  await expect(body).not.toContainText('Azure OpenAI')
})
