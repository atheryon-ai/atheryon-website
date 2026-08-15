import { test, expect } from '@playwright/test'

// Mobile navigation (remediation brief QA §1): disclosure-pattern menu at
// phone width with keyboard support and no horizontal overflow.

test.describe('mobile nav at 390×844', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('menu button reveals executive nav and CTA', async ({ page }) => {
    await page.goto('/')

    const button = page.getByRole('button', { name: 'MENU' })
    await expect(button).toBeVisible()
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    expect((await button.boundingBox())?.height).toBeGreaterThanOrEqual(44)

    const headerCta = page.locator('.home-nav-cta')
    await expect(headerCta).toBeVisible()
    expect((await headerCta.boundingBox())?.height).toBeGreaterThanOrEqual(44)

    // Inline desktop links are hidden at this width
    await expect(page.locator('.home-nav-links')).toBeHidden()

    await button.click()
    const openButton = page.getByRole('button', { name: 'CLOSE' })
    await expect(openButton).toHaveAttribute('aria-expanded', 'true')

    const panel = page.locator('#home-nav-mobile-menu')
    for (const label of ['M&A', 'DATA & AI', 'ABOUT']) {
      await expect(panel.getByRole('link', { name: label })).toBeVisible()
    }
    await expect(panel.getByRole('link', { name: 'CONTACT US' })).toHaveAttribute('href', '/contact')
  })

  test('Escape closes the menu and returns focus to the button', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'MENU' }).click()
    await expect(page.locator('#home-nav-mobile-menu')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.locator('#home-nav-mobile-menu')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'MENU' })).toBeFocused()
  })

  test('selecting a route closes the menu and navigates', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'MENU' }).click()
    await page.locator('#home-nav-mobile-menu').getByRole('link', { name: 'M&A', exact: true }).click()

    await page.waitForURL('**/ma')
    await expect(page.locator('#home-nav-mobile-menu')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'MENU' })).toHaveAttribute('aria-expanded', 'false')
  })

  test('no horizontal overflow with the menu closed or open', async ({ page }) => {
    await page.goto('/')
    const overflow = () =>
      page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(await overflow()).toBeLessThanOrEqual(0)

    await page.getByRole('button', { name: 'MENU' }).click()
    await expect(page.locator('#home-nav-mobile-menu')).toBeVisible()
    expect(await overflow()).toBeLessThanOrEqual(0)
  })
})

test.describe('narrow mobile header at 320×700', () => {
  test.use({ viewport: { width: 320, height: 700 } })

  test('keeps the menu visible, moves the CTA into it and does not overflow', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('.home-nav-cta')).toBeHidden()
    const menu = page.getByRole('button', { name: 'MENU' })
    await expect(menu).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)

    await menu.click()
    const panel = page.locator('#home-nav-mobile-menu')
    await expect(panel.getByRole('link', { name: 'CONTACT US' })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0)
  })
})

test('deployed/static-export menu reaches its open state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'MENU' }).click()
  await expect(page.getByRole('button', { name: 'CLOSE' })).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#home-nav-mobile-menu')).toBeVisible()
})

test.describe('tablet width 768', () => {
  test.use({ viewport: { width: 768, height: 1024 } })

  test('no horizontal overflow at the breakpoint boundary', async ({ page }) => {
    await page.goto('/')
    const delta = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    )
    expect(delta).toBeLessThanOrEqual(0)
  })
})
