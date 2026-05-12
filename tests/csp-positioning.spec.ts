import { test, expect } from '@playwright/test'

test.describe('CSP positioning — /reality (Task 2 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reality')
  })

  test('"The Atheryon Standard" section is present with weeks-vs-years anchor', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /decision-grade is the standard/i })).toBeVisible()
    await expect(page.getByText(/weeks.*not years/i)).toBeVisible()
  })

  test('transition copy leads with the standard, not the problem', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /architect.*decision-grade reality/i })).toBeVisible()
  })
})

test.describe('CSP positioning — /ai-direction (Task 3 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-direction')
  })

  test('hero positioning mentions cloud-agnostic in addition to model-agnostic', async ({ page }) => {
    const heroSection = page.locator('section', { has: page.getByRole('heading', { level: 1, name: 'AI Direction' }) })
    await expect(heroSection).toContainText(/cloud-agnostic/i)
  })

  test('model-agnostic card names Vertex AI / Gemini alongside Anthropic Claude', async ({ page }) => {
    const card = page.getByTestId('pillar-service-card').filter({ hasText: /Model.{0,3}agnostic/i })
    await expect(card).toBeVisible()
    await expect(card).toContainText(/cloud.{0,3}agnostic/i)
    await expect(card).toContainText(/Vertex AI/i)
    await expect(card).toContainText(/Gemini/i)
    await expect(card).toContainText(/Anthropic/i)
  })
})

test.describe('CSP positioning — /labs (Task 4 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/labs')
  })

  test('hero body positions Labs as a marketplace-bound platform', async ({ page }) => {
    await expect(page.getByText(/marketplace-bound platform/i)).toBeVisible()
  })

  test('method economics paragraph positions Labs as licensable platform IP', async ({ page }) => {
    await expect(page.getByText(/platform IP/i)).toBeVisible()
  })
})

test.describe('CSP positioning — /transformation (Task 5 target)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/transformation')
  })

  test('"What we do" grid renders 5 cards (was 4, +1 for Partner Co-Sell)', async ({ page }) => {
    const cards = page.getByTestId('pillar-service-card')
    await expect(cards).toHaveCount(5)
  })

  test('Partner Co-Sell card is present and does NOT name Google', async ({ page }) => {
    const card = page.getByTestId('pillar-service-card').filter({ hasText: /Partner Co-Sell/i })
    await expect(card).toBeVisible()
    await expect(card).not.toContainText(/Google/i)
    await expect(card).not.toContainText(/GCP/i)
    await expect(card).not.toContainText(/Vertex/i)
  })
})

test.describe('Microsoft preservation guardrail (Task 6)', () => {
  test('Reality hero partner strip still lists Microsoft', async ({ page }) => {
    await page.goto('/reality')
    await expect(page.getByText('Microsoft partner')).toBeVisible()
  })

  test('Labs evidence partners still lists Microsoft Partner', async ({ page }) => {
    await page.goto('/labs')
    await expect(page.getByText('Microsoft Partner', { exact: true })).toBeVisible()
  })

  test('About founder bio still references Microsoft partner', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByText(/Microsoft partner/i)).toBeVisible()
  })

  test('Labs banker-wedge bio still references Microsoft partner', async ({ page }) => {
    await page.goto('/labs')
    const bankerSection = page.locator('section', { hasText: /Why a banker beats a consultancy/i })
    await expect(bankerSection).toContainText(/Microsoft partner/i)
  })
})
