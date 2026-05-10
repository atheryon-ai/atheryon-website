import { test, expect } from '@playwright/test'

test.describe('/reality page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/reality')
  })

  test('hero renders with H1 and both CTAs', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /Reality is built on data/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Enter Floor 13/i }).first()).toHaveAttribute('href', /#floor-13/)
    await expect(page.getByRole('link', { name: /Explore the pillars/i })).toHaveAttribute('href', /#pillars/)
  })

  test('three pillar cards link to the pillar pages', async ({ page }) => {
    const cards = page.getByTestId('reality-pillar-card')
    await expect(cards).toHaveCount(3)
    await expect(cards.nth(0).getByRole('link')).toHaveAttribute('href', '/data')
    await expect(cards.nth(1).getByRole('link')).toHaveAttribute('href', '/intelligence')
    await expect(cards.nth(2).getByRole('link')).toHaveAttribute('href', '/transformation')
  })

  test('Floor 13 switchboard has 3 dial buttons', async ({ page }) => {
    const dials = page.getByTestId('floor13-dial')
    await expect(dials).toHaveCount(3)
  })

  test('clicking the Data dial reveals the Data blueprint', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    await expect(page.getByTestId('floor13-blueprint')).toBeVisible()
    await expect(page.getByTestId('floor13-blueprint')).toContainText('Reality Blueprint: Data Foundation')
  })

  test('re-clicking another dial swaps blueprint content (not stacks)', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    await page.getByTestId('floor13-dial').nth(1).getByRole('button').click()
    const titles = page.getByTestId('floor13-blueprint').locator('h3')
    await expect(titles).toHaveCount(1)
    await expect(titles).toContainText('Reality Blueprint: Intelligence Layer')
  })

  test('typed challenge appears in the rendered intro line', async ({ page }) => {
    await page.getByTestId('floor13-input').fill('our risk warehouse is a swamp')
    await page.getByTestId('floor13-generate').click()
    await expect(page.getByTestId('floor13-blueprint')).toContainText('our risk warehouse is a swamp')
  })

  test('Data dial highlights the "Take the code" sell card', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    const recommended = page.getByTestId('floor13-sellcard').filter({ hasText: 'Take the code' })
    await expect(recommended).toHaveAttribute('data-recommended', 'true')
  })

  test('three sell cards link to /labs anchors', async ({ page }) => {
    await page.getByTestId('floor13-dial').nth(0).getByRole('button').click()
    const cards = page.getByTestId('floor13-sellcard')
    await expect(cards).toHaveCount(3)
    await expect(cards.nth(0).getByRole('link')).toHaveAttribute('href', '/labs#code')
    await expect(cards.nth(1).getByRole('link')).toHaveAttribute('href', '/labs#prompts')
    await expect(cards.nth(2).getByRole('link')).toHaveAttribute('href', '/labs#advisory')
  })

  test('no fetch or POST happens when generating a blueprint', async ({ page }) => {
    let networkCalls = 0
    page.on('request', (r) => {
      if (r.method() !== 'GET' || /\/api\//.test(r.url())) networkCalls++
    })
    await page.getByTestId('floor13-input').fill('any text')
    await page.getByTestId('floor13-generate').click()
    expect(networkCalls).toBe(0)
  })

  test('Anthropic and Claude do not appear on /reality', async ({ page }) => {
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/Anthropic/)
    expect(text).not.toMatch(/\bClaude\b/)
  })
})
