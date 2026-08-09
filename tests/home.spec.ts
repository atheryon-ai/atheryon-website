import { test, expect } from '@playwright/test'

test('homepage leads with the transaction story and executive nav', async ({ page }) => {
  await page.goto('/')

  // Brand lockup (practice toggle removed — wordmark only)
  await expect(page.getByText('ATHERYON', { exact: true })).toBeVisible()

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'Making Transactions Executable',
  })).toBeVisible()

  // Executive nav
  for (const [label, href] of [
    ['SERVICES', '/services'],
    ['TECHNOLOGY', '/technology'],
    ['EXPERIENCE', '/experience'],
    ['APPROACH', '/approach'],
    ['ABOUT', '/about'],
  ] as const) {
    await expect(
      page.locator('.home-nav-links').getByRole('link', { name: label }),
    ).toHaveAttribute('href', href)
  }

  // Proof strip figures (verbatim Appendix A claims)
  await expect(page.getByText('$21.4bn')).toBeVisible()
  await expect(page.getByText('>$1bn')).toBeVisible()

  // Why + the single site-wide principle statement
  await expect(page.getByRole('heading', { name: 'Why Atheryon' })).toBeVisible()
  await expect(page.getByText('Transaction value is protected when separation and integration requirements are understood early.')).toBeVisible()

  // Asymmetric capabilities: flagship practice leads
  await expect(page.getByRole('link', { name: 'Transaction Advisory & Execution' })).toHaveAttribute('href', '/services')

  // Hero primary CTA + end-of-document CTA (decided label)
  await expect(page.getByRole('link', { name: 'Discuss a transaction' }).first()).toHaveAttribute('href', '/contact')
  await expect(page.getByRole('link', { name: 'Discuss a transaction' }).last()).toHaveAttribute('href', '/contact')

  // Background should be deep navy (sanity check, computed style on body)
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  )
  expect(bg).toMatch(/rgb\((6|7|8), (10|11|12), (28|29|30)\)/)
})

test('about page renders story and co-founder biographies', async ({ page }) => {
  await page.goto('/about')

  await expect(page.getByRole('heading', { name: 'Our story' })).toBeVisible()

  await expect(page.getByRole('heading', { level: 3, name: 'Anna Contos' })).toBeVisible()
  await expect(page.getByText('Co-Founder, Transaction Advisory & Execution')).toBeVisible()
  await expect(page.getByText('Head of Separation and Integration Advisory at Westpac Group')).toBeVisible()

  await expect(page.getByRole('heading', { level: 3, name: 'Terry Tsakiris' })).toBeVisible()
  await expect(page.getByText('Co-Founder, Technology & Data')).toBeVisible()
  await expect(page.getByText('Markets Operational Data Store')).toBeVisible()
})
