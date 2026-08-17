import { test, expect } from '@playwright/test'

test('homepage carries the rev-5 hero stack, arms and founders', async ({ page }) => {
  await page.goto('/')

  // Brand lockup (wordmark only)
  await expect(page.getByText('ATHERYON', { exact: true })).toBeVisible()

  // Viewport-1 statement band: three-line serif hero + subheading
  const h1 = page.locator('h1')
  await expect(h1).toContainText('Clarity for')
  await expect(h1).toContainText('critical decisions.')
  await expect(h1).toContainText('Leadership for complex execution.')
  await expect(
    page.getByText(
      'Atheryon supports financial-services leaders across M&A, data and AI-enabled transformation.',
    ),
  ).toBeVisible()

  // Slim top nav (functions spec §5): the two functions plus about. Three
  // items — Capital Markets left the header when it became a sector.
  for (const [label, href] of [
    ['M&A SERVICES', '/ma'],
    ['DATA & AI', '/data-ai'],
    ['ABOUT', '/about'],
  ] as const) {
    await expect(
      page.locator('.home-nav-links').getByRole('link', { name: label, exact: true }),
    ).toHaveAttribute('href', href)
  }
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'APPROACH' })).toHaveCount(0)
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'CAPITAL MARKETS' })).toHaveCount(0)
  await expect(page.locator('.home-nav-links a')).toHaveCount(3)

  // Two explore links (spec §4), function 1 first. The third went when Data,
  // Transformation, AI stopped being an underpinning and became function 2.
  await expect(page.getByText('Choose the capability you need')).toBeVisible()
  for (const [label, href] of [
    ['Explore M&A Transaction Services', '/ma'],
    ['Explore Data, Transformation, AI', '/data-ai'],
  ] as const) {
    await expect(
      page.getByRole('main').getByRole('link', { name: label, exact: true }),
    ).toHaveAttribute('href', href)
  }

  // Firm-level track record (Terry 2026-08-16): three credentials, no
  // case write-ups. $20bn+ traces to maExperience case 01; 25+ years to
  // Anna's /about bio. Case figures (4 months, $84M, 5 years to 18 months)
  // live on /experience.
  await expect(page.getByRole('heading', { name: 'Track Record' })).toBeVisible()
  await expect(page.getByText('$20bn+', { exact: true })).toBeVisible()
  await expect(page.getByText('Deal value supported')).toBeVisible()
  await expect(page.getByText('25+ years', { exact: true })).toBeVisible()
  await expect(page.getByText('>$1bn')).toHaveCount(0)
  await expect(page.getByText('4 months', { exact: true })).toHaveCount(0)
  await expect(page.getByText('10 months')).toHaveCount(0)
  await expect(page.getByText('$84M', { exact: true })).toHaveCount(0)
  await expect(page.getByText('5 years to 18 months', { exact: true })).toHaveCount(0)
  await expect(page.getByText('AI agents have been used to migrate from AWS to Azure.')).toHaveCount(0)
  // Casing check: the sector is NBFIs, never NBFIS. It now appears in the
  // foundation strip and the track-record tile.
  await expect(page.getByText(/NBFIs/)).toHaveCount(2)
  await expect(page.getByText(/NBFIS/)).toHaveCount(0)

  await expect(page.getByText('Atheryon provides hands-on leadership across the M&A lifecycle')).toBeVisible()
  await expect(
    page.getByText('Reference implementations run on Microsoft Azure, and Atheryon is a Microsoft partner.'),
  ).toBeVisible()

  // Why Clients Choose Atheryon and Our Belief are M&A copy and live on
  // /ma (Terry 2026-08-09 reviews). The homepage rewrite's Why / Contact
  // blocks stay off this page: three numbered sections, header CTA only.
  await expect(page.getByRole('heading', { name: 'Why Clients Choose Atheryon' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Why Atheryon' })).toHaveCount(0)
  await expect(page.getByText('Better decisions are made when the implications of execution are understood early.')).toHaveCount(0)
  await expect(page.getByText('Ready to move forward with clarity')).toHaveCount(0)

  // Function principles live with the sub pages (Terry 2026-08-09), not here
  await expect(page.getByText('Atheryon was founded on a simple observation:')).toHaveCount(0)

  // Parallel function sections: function 1 proof + function 2 proof
  await expect(page.getByRole('heading', { name: 'M&A Transaction Services', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Data, Transformation, AI', exact: true })).toBeVisible()

  // Functions inside the poster band: bronze-ticked labels, function 1 first,
  // both linking. The bronze rule beneath them now carries the four sectors;
  // it used to carry DATA · TRANSFORMATION · AI, which became function 2's
  // own name (spec §4).
  await expect(page.locator('main').getByRole('link', { name: 'M&A TRANSACTION SERVICES', exact: true })).toHaveAttribute('href', '/ma')
  await expect(page.locator('main').getByRole('link', { name: 'DATA, TRANSFORMATION, AI', exact: true })).toHaveAttribute('href', '/data-ai')
  await expect(page.getByText('DATA · TRANSFORMATION · AI')).toHaveCount(0)
  // FoundationRule joins its items into one interpuncted string, so assert
  // the strip rather than each sector as a separate element.
  await expect(
    page.getByText('CAPITAL MARKETS · BANKING · WEALTH · NBFIs'),
  ).toBeVisible()

  // Founders block, no employer names, linking to /about. Each line is the
  // function name (spec §4). Scoped to the name row so the function-section
  // titles on the same page do not collide.
  await expect(
    page.getByRole('heading', { name: 'Anna Contos' }).locator('..').getByText('M&A Transaction Services', { exact: true }),
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'Terry Tsakiris' }).locator('..').getByText('Data, Transformation, AI', { exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'About the co-founders' })).toHaveAttribute('href', '/about')

  // CTAs (rev 4 label)
  await expect(page.locator('.home-nav-cta')).toHaveAttribute('href', '/contact')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute('aria-label', 'CONTACT US')
  await expect(page.locator('main').getByRole('link', { name: /discuss a situation|contact us/i })).toHaveCount(0)

  // Background should be deep navy #0E2A3A (sanity check, computed style on body)
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  )
  expect(bg).toMatch(/rgb\((13|14|15), (41|42|43), (57|58|59)\)/)
})

test('about page renders positioning, story and co-founder bios', async ({ page }) => {
  await page.goto('/about')

  // Appendix B positioning statement (rev 3 wording) + audience line
  await expect(page.getByText('understand and execute complex transactions, transformations and technology-driven change', { exact: false })).toBeVisible()
  await expect(page.getByText('Boards, executive teams, investors, private equity sponsors and corporate development teams', { exact: false })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Our story' })).toBeVisible()

  await expect(page.getByRole('heading', { level: 3, name: 'Anna Contos' })).toBeVisible()
  await expect(page.getByText('Co-Founder, M&A Transaction Services')).toBeVisible()

  await expect(page.getByRole('heading', { level: 3, name: 'Terry Tsakiris' })).toBeVisible()
  await expect(page.getByText('Co-Founder, Data, Transformation & AI')).toBeVisible()

  const terry = page.locator('#terry-tsakiris')
  await expect(terry).toContainText('lead our Data, Transformation & AI practice')
  await expect(terry).toContainText('front-office risk, P&L attribution')
  await expect(terry).toContainText('Fixed Income, Equities, FX and Rates')
  await expect(terry).toContainText('applied responsibly')

  // Both bios stay genericised: no named employers on the page.
  const bodyText = await page.locator('main').innerText()
  for (const name of [
    'Westpac', 'Commonwealth Bank', 'CBA', 'Credit Suisse', 'Barclays',
    'Deutsche', 'Capco', 'CommInsure', 'Count Financial', 'BT Panorama',
    'Goldman',
  ]) {
    expect(bodyText).not.toContain(name)
  }

  const portraits = page.locator('main img[alt*="Co-Founder"]')
  await expect(portraits).toHaveCount(2)
  const ratios = await portraits.evaluateAll((images) =>
    images.map((image) => {
      const rect = image.parentElement!.getBoundingClientRect()
      return Number((rect.width / rect.height).toFixed(2))
    }),
  )
  expect(ratios).toEqual([0.8, 0.8])
})

test('about page Anna LinkedIn uses the public AU profile URL', async ({ page }) => {
  await page.goto('/about')
  // www.linkedin.com/in/anna-contos-7685a7 authwalls guests; au.linkedin.com
  // is the public profile that actually opens.
  await expect(
    page.locator('#anna-contos').getByRole('link', { name: 'LinkedIn profile' }),
  ).toHaveAttribute('href', 'https://au.linkedin.com/in/anna-contos-7685a7')
})
