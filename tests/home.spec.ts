import { test, expect } from '@playwright/test'

test('homepage carries the rev-5 hero stack, arms and founders', async ({ page }) => {
  await page.goto('/')

  // Brand lockup (wordmark only)
  await expect(page.getByText('ATHERYON', { exact: true })).toBeVisible()

  // Viewport-1 poster band (rev 6): three-line serif hero + subheading
  const h1 = page.locator('h1')
  await expect(h1).toContainText('Making')
  await expect(h1).toContainText('Complex Change')
  await expect(h1).toContainText('Executable.')
  await expect(page.getByText('Understanding implications early. Executing with confidence.')).toBeVisible()

  // Executive nav (phase 2: M&A · CAPITAL MARKETS · EXPERIENCE · ABOUT; APPROACH out of nav)
  for (const [label, href] of [
    ['M&A', '/ma'],
    ['CAPITAL MARKETS', '/capital-markets'],
    ['EXPERIENCE', '/experience'],
    ['ABOUT', '/about'],
  ] as const) {
    await expect(
      page.locator('.home-nav-links').getByRole('link', { name: label, exact: true }),
    ).toHaveAttribute('href', href)
  }
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'APPROACH' })).toHaveCount(0)

  // Proof strip figures (verbatim Appendix A claims)
  await expect(page.getByText('$21.4bn')).toBeVisible()
  await expect(page.getByText('>$1bn')).toBeVisible()

  // Principle: once site-wide, founding framing, large type
  await expect(page.getByText('Atheryon was founded on a simple observation:')).toBeVisible()
  await expect(page.getByText('Transaction value is protected when separation and integration requirements are understood early.')).toBeVisible()

  // Arms inside the poster band: bronze-ticked labels, M&A first, both
  // linking; foundation strip beneath
  await expect(page.locator('main').getByRole('link', { name: 'M&A', exact: true })).toHaveAttribute('href', '/ma')
  await expect(page.locator('main').getByRole('link', { name: 'CAPITAL MARKETS', exact: true })).toHaveAttribute('href', '/capital-markets')
  await expect(page.getByText('DATA · TRANSFORMATION · AI')).toBeVisible()

  // Founders block, no employer names, linking to /about
  await expect(page.getByText('Transactions, Separation & Integration, Transformation')).toBeVisible()
  await expect(page.getByText('Capital Markets, Data, Technology & AI')).toBeVisible()
  await expect(page.getByRole('link', { name: 'About the co-founders' })).toHaveAttribute('href', '/about')

  // CTAs (rev 4 label)
  await expect(page.getByRole('link', { name: 'Discuss a situation' }).first()).toHaveAttribute('href', '/contact')
  await expect(page.getByRole('link', { name: 'Discuss a situation' }).last()).toHaveAttribute('href', '/contact')

  // Background should be deep navy (sanity check, computed style on body)
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  )
  expect(bg).toMatch(/rgb\((6|7|8), (10|11|12), (28|29|30)\)/)
})

test('about page renders positioning, story and genericised co-founder bios', async ({ page }) => {
  await page.goto('/about')

  // Appendix B positioning statement (rev 3 wording) + audience line
  await expect(page.getByText('understand and execute complex transactions, transformations and technology-driven change', { exact: false })).toBeVisible()
  await expect(page.getByText('Boards, executive teams, investors, private equity sponsors and corporate development teams', { exact: false })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Our story' })).toBeVisible()

  await expect(page.getByRole('heading', { level: 3, name: 'Anna Contos' })).toBeVisible()
  await expect(page.getByText('Co-Founder, M&A')).toBeVisible()

  await expect(page.getByRole('heading', { level: 3, name: 'Terry Tsakiris' })).toBeVisible()
  await expect(page.getByText('Co-Founder, Capital Markets')).toBeVisible()

  // Bios are genericised: no named employers anywhere on the page
  const bodyText = await page.locator('main').innerText()
  for (const name of [
    'Westpac', 'Commonwealth Bank', 'CBA', 'Credit Suisse', 'Barclays',
    'Deutsche', 'Capco', 'CommInsure', 'Count Financial', 'BT Panorama',
    'Goldman',
  ]) {
    expect(bodyText).not.toContain(name)
  }
})
