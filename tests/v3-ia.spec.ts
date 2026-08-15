import { test, expect } from '@playwright/test'

// Executive-first IA (2026-08-09): L2 routes exist and carry the firm
// shell. Contact Us lives in the header only (Terry 2026-08-15).

const routes = [
  { path: '/ma', heading: 'Making Transactions Executable' },
  { path: '/ma/experience', heading: 'Representative Experience' },
  { path: '/ma/approach', heading: 'Our Approach' },
  { path: '/data-ai/experience', heading: 'Experience' },
  { path: '/data-ai/approach', heading: 'Our Approach' },
  { path: '/data-ai', heading: 'Data, Transformation, AI' },
  { path: '/data-ai/supply-chain', heading: 'Supply Chain' },
] as const

// The firm-level routes stopped being choosers on 2026-08-15 (Terry): each one
// is a destination that stacks both functions, function 1 first, rather than a
// fork the visitor has to resolve before seeing anything.
for (const [path, throughLinks] of [
  ['/experience', ['/ma/experience', '/data-ai/experience']],
  ['/approach', ['/ma/approach', '/data-ai/approach']],
] as const) {
  test(`${path} stacks both functions, function 1 first, and links through`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)

    const sections = page.locator('main section')
    await expect(sections.filter({ hasText: 'M&A Transaction Services' }).first()).toBeVisible()
    await expect(sections.filter({ hasText: 'Data, Transformation, AI' }).first()).toBeVisible()

    // Order is a rule (spec §7: function 1 before function 2 wherever both
    // appear), so assert it rather than trusting the section titles above,
    // which pass in either order.
    const ordered = await page
      .locator('main')
      .locator(`a[href="${throughLinks[0]}"], a[href="${throughLinks[1]}"]`)
      .evaluateAll((links) => links.map((l) => l.getAttribute('href')))
    expect(ordered).toEqual([...throughLinks])

    for (const href of throughLinks) {
      await expect(page.locator('main').locator(`a[href="${href}"]`)).toHaveCount(1)
    }
  })
}

test('/contact is the firm enquiry form, not a fork', async ({ page }) => {
  const response = await page.goto('/contact')
  expect(response?.status()).toBe(200)

  // The form itself, with a practice to choose rather than a page to choose.
  await expect(page.locator('form select#topic')).toBeVisible()
  for (const value of ['ma-execution', 'data-ai']) {
    await expect(page.locator(`form select#topic option[value="${value}"]`)).toHaveCount(1)
  }
  // Capital markets is a sector, not something to choose (spec §4).
  await expect(page.locator('form select#topic option[value="capital-markets"]')).toHaveCount(0)
  await expect(page.locator('main').locator('a[href="/ma/contact"]')).toHaveCount(0)
})

// The slug outlived the arm: old ?topic=capital-markets links must still
// pre-fill rather than silently landing on an empty message (spec §4).
test('an old capital-markets topic link still pre-fills the enquiry', async ({ page }) => {
  await page.goto('/contact?topic=capital-markets')
  await expect(page.locator('form textarea#message')).toHaveValue(
    /Data, transformation and AI program/,
  )
})

test('Contact Us from /data-ai goes to the function-2 contact page', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute('href', '/data-ai/contact')
})

test('/data-ai carries the function principle and its three disciplines', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(
    page.getByText(
      'Atheryon has delivered those platforms and has led APRA engagement at executive level.',
    ),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the function works' })).toBeVisible()
  for (const discipline of ['Data', 'Transformation', 'AI']) {
    await expect(page.getByRole('heading', { level: 3, name: discipline, exact: true })).toBeVisible()
  }
})

test('/data-ai absorbed the markets depth and platform links', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(page.getByRole('heading', { name: 'Published depth: capital markets' })).toBeVisible()
  for (const line of [
    'Capital Markets Systems & Platform Delivery',
    'Market Data & Reference Data Environments',
    'Data Foundations',
    'Regulatory Markets Platforms',
  ]) {
    await expect(page.getByRole('heading', { level: 3, name: line })).toBeVisible()
  }
  // The one cross-link back into a transaction (spec §4.6).
  await expect(
    page.locator('main').locator('a[href="/ma#technology-data-migration"]'),
  ).toHaveCount(1)
})

test('global and function navigation expose the current location', async ({ page }) => {
  await page.goto('/ma/experience')
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'M&A', exact: true })).toHaveAttribute('aria-current', 'page')
  const armNav = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(armNav.getByRole('link', { name: 'Experience' })).toHaveAttribute('aria-current', 'page')
  await expect(armNav.getByRole('link', { name: 'Overview' })).not.toHaveAttribute('aria-current', 'page')

  // The function-2 depth pages have no header item of their own, so they
  // light up DATA & AI (spec §5).
  await page.goto('/labs')
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'DATA & AI', exact: true })).toHaveAttribute('aria-current', 'page')
})

for (const route of routes) {
  test(`${route.path} renders the firm shell and keeps Contact Us in the header`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()

    // The <html data-mode> assertion that sat here was removed on 2026-08-12
    // with ModeSetter and the [data-mode] CSS blocks. Every surface is CM
    // blue, resolved from :root, so there is no per-mode attribute to check.

    await expect(page.locator('.home-nav-cta')).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: /discuss a situation|contact us/i })).toHaveCount(0)
  })
}

test('/ma (M&A arm) lists the four service lines with deduped TSA scope', async ({ page }) => {
  await page.goto('/ma')

  // The transaction principle, Why Atheryon and How we work live here now
  // (Terry 2026-08-09: M&A-specific content leaves the homepage)
  await expect(page.getByText('Atheryon was founded on a simple observation:')).toBeVisible()
  await expect(page.getByText('Transaction value is protected when separation and integration requirements are understood early.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Why Clients Choose Atheryon' })).toBeVisible()
  await expect(page.getByText('The quality of outcomes is often determined before execution begins.')).toBeVisible()
  await expect(page.getByText('That belief sits at the heart of everything we do.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How we work' })).toBeVisible()

  for (const line of [
    'Transaction Readiness',
    'Separation & Integration Strategy',
    'Execution Leadership',
    'Technology, Data & Migration Readiness',
  ]) {
    await expect(page.getByRole('heading', { name: line })).toBeVisible()
  }

  const serviceIndex = page.getByRole('navigation', { name: 'Service line index' })
  await expect(serviceIndex.getByRole('link')).toHaveCount(4)
  await expect(serviceIndex.getByRole('link', { name: /Transaction Readiness/ })).toHaveAttribute('href', '#transaction-readiness')

  // TSA dedupe: each line owns distinct scope
  await expect(page.getByText('TSA strategy', { exact: true })).toBeVisible()
  await expect(page.getByText('TSA design and exit planning', { exact: true })).toBeVisible()
  await expect(page.getByText('TSA establishment and exit management', { exact: true })).toBeVisible()

  // Engagement model (decided 2026-08-09): embedded, no stated durations
  await expect(page.getByRole('heading', { name: 'How we engage' })).toBeVisible()
  await expect(page.getByText('embedded senior specialists', { exact: false })).toBeVisible()
  await expect(page.getByText('6–18 months')).toHaveCount(0)
  await expect(page.getByText('{{')).toHaveCount(0)

  // Rev 7: the three transaction workflows live here as collapsed detail
  // under service line 04
  const workflowDetails = page.locator('details').filter({ hasText: 'Three transaction workflows' })
  await expect(workflowDetails.locator('summary')).toContainText('Inputs, AI agents, processing and outputs')
  await expect(workflowDetails.getByRole('heading', { name: 'Pre-Sign Execution Review' })).toBeHidden()
  await workflowDetails.locator('summary').click()
  for (const name of [
    'Pre-Sign Execution Review',
    'Separation/Integration Planning',
    'TSA Tracking & Reduction',
  ]) {
    await expect(workflowDetails.getByRole('heading', { name })).toBeVisible()
  }
})

test('/ma/experience normalises cases to Context / Role / Outcome with the mortgage acquisition first', async ({ page }) => {
  await page.goto('/ma/experience')

  await expect(page.getByText('Representative experience spans Atheryon engagements and programs led by Atheryon principals in prior senior roles.')).toBeVisible()

  const firstCase = page.locator('ol > li').first()
  await expect(firstCase.getByRole('heading', { name: 'Landmark Mortgage Portfolio Acquisition' })).toBeVisible()
  await expect(firstCase.getByText('Context', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Role', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Outcome', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('more than $20 billion at signing', { exact: false })).toBeVisible()
  // De-named per Terry 2026-08-10: the deal name must not appear anywhere.
  // Exact + case-sensitive, else "programs" matches on a substring.
  await expect(page.getByText(/\bRAMS\b/)).toHaveCount(0)

  await expect(page.getByRole('heading', { name: 'Sale & Separation of a Major Financial Advice Business' })).toBeVisible()

  // Terry 2026-08-09: capital markets and M&A experience do not share a
  // page — the CM cases live at /capital-markets#experience only
  await expect(page.getByRole('heading', { name: 'Capital markets experience' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Recovery of a Failed $84M Data & Analytics Program' })).toHaveCount(0)
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/data-ai is function 2, keeping the depth pages reachable', async ({ page }) => {
  const response = await page.goto('/data-ai')
  expect(response?.status()).toBe(200)

  await expect(page.getByRole('heading', { level: 1, name: 'Data, Transformation, AI' })).toBeVisible()

  // Content separation (rev 7, renamed by the functions spec §1): the two
  // functions do not mix. The three transaction workflows live on /ma, and
  // this page's transaction role is exactly one cross-link line.
  await expect(page.getByRole('heading', { name: 'Pre-Sign Execution Review' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'TSA Tracking & Reduction' })).toHaveCount(0)

  // Cases and delivery patterns live on the function's sub-pages; the
  // landing carries the function sub-nav.
  await expect(page.getByRole('navigation', { name: 'Arm sections' }).getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/data-ai/experience')
  await expect(page.getByText('{{')).toHaveCount(0)

  // Depth links out of /data-ai. Scoped to <main> — the footer carries
  // identically named links but sits outside <main> in the (cm) layout, so
  // this cannot collide.
  for (const [label, href] of [
    ['System', '/system'],
    ['Labs', '/labs'],
    ['Themes', '/themes'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(page.locator('main').getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
})

// Capital Markets stopped being a function on 2026-08-15 and became one of
// four sectors. The route must not come back as a page, and it must not
// appear in the header.
test('/capital-markets is retired as a route and a nav item', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'CAPITAL MARKETS' })).toHaveCount(0)
  await expect(page.locator('.home-nav-links a')).toHaveCount(3)
})

test('/data-ai/experience carries the three Appendix C cases', async ({ page }) => {
  await page.goto('/data-ai/experience')
  for (const name of [
    'Recovery of a Failed $84M Data & Analytics Program',
    'First Near Real-Time Front Office Risk System',
    'Regulatory Markets Platform: Surveillance, Reporting, Record Keeping',
  ]) {
    await expect(page.getByRole('heading', { name })).toBeVisible()
  }
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/data-ai/approach carries the delivery patterns and embedded delivery', async ({ page }) => {
  await page.goto('/data-ai/approach')
  await expect(page.getByRole('heading', { name: 'Delivery examples' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Program recovery' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Embedded delivery', exact: true })).toBeVisible()
  await expect(page.getByText('APRA CPS 234', { exact: false })).toBeVisible()

  // Council build 2026-08-10: method principles + engagement paths
  await expect(page.getByRole('heading', { name: 'How the work is directed' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Controls come first' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the arm engages' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Advisory assessment' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Regulatory reporting', exact: true })).toBeVisible()
})

test('CM legacy routes still resolve and the footer groups them under Technology', async ({ page }) => {
  for (const path of ['/system', '/labs', '/themes', '/offers']) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
  }

  // Council review 2026-08-10: the Technology column is function-2 material.
  // It renders on function-2 surfaces only, never on function 1 or neutral
  // ones.
  await page.goto('/data-ai')
  const cmFooter = page.getByLabel('Footer navigation')
  await expect(cmFooter.getByText('Technology', { exact: true })).toHaveCount(1)
  for (const [label, href] of [
    ['System', '/system'],
    ['Labs', '/labs'],
    ['Themes', '/themes'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(cmFooter.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }

  await page.goto('/ma')
  const maFooter = page.getByLabel('Footer navigation')
  await expect(maFooter.getByText('Technology', { exact: true })).toHaveCount(0)
  await expect(maFooter.getByRole('link', { name: 'Labs', exact: true })).toHaveCount(0)

  await page.goto('/')
  const footer = page.getByLabel('Footer navigation')
  await expect(footer.getByText('Technology', { exact: true })).toHaveCount(0)
  // One row per function: the Capital Markets and Data. Transformation. AI.
  // pair collapsed into one when the arm retired into function 2 (spec §5).
  await expect(footer.getByRole('link', { name: 'Data, Transformation, AI', exact: true })).toHaveAttribute('href', '/data-ai')
  await expect(footer.getByRole('link', { name: 'Capital Markets', exact: true })).toHaveCount(0)
})

// Retired routes 301 on the SWA (redirects live in staticwebapp.config.json,
// which only applies on Azure — not `next dev`). Gated behind SWA_BASE_URL
// like the legacy-redirect tests in offers.spec.ts. Rev 5: /ma itself is
// reprieved as the M&A arm; only its children (and /services) redirect.
const SWA_BASE_URL = process.env.SWA_BASE_URL

test.describe('retired-route redirects (SWA only)', () => {
  test.skip(!SWA_BASE_URL, 'Set SWA_BASE_URL to test deployed redirects')

  for (const [from, to] of [
    ['/services', '/ma'],
    ['/ma/offers', '/ma'],
    ['/ma/system', '/ma'],
    ['/ma/workflows', '/ma'],
    ['/technology', '/data-ai'],
  ] as const) {
    test(`${from} 301s to ${to}`, async ({ request }) => {
      const response = await request.get(`${SWA_BASE_URL}${from}`, {
        maxRedirects: 0,
      })
      expect(response.status()).toBe(301)
      // SWA emits a relative Location header.
      expect(response.headers()['location']).toBe(to)
    })
  }
})

test('/ma/contact renders the enquiry form with the privacy disclosure beside it', async ({ page }) => {
  await page.goto('/ma/contact')

  await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible()
  await expect(page.getByText('How your enquiry is handled')).toBeVisible()
  await expect(page.getByText('Submissions are processed by Formspree', { exact: false })).toBeVisible()
  await expect(
    page.getByLabel('How your enquiry is handled').getByRole('link', { name: 'Privacy Policy' }),
  ).toHaveAttribute('href', '/privacy')

  // M&A enquiry path; message label per REV 7 punch list
  await expect(page.getByLabel(/name/i)).toBeVisible()
  await expect(page.locator('label[for="message"]')).toContainText('Tell us about the situation')
  await expect(page.locator('textarea')).toHaveValue(/M&A execution review/)
})

test('/data-ai/contact pre-fills the function-2 enquiry path', async ({ page }) => {
  await page.goto('/data-ai/contact')
  await expect(page.getByText('technology, data or transformation program you are considering', { exact: false })).toBeVisible()
  await expect(page.locator('textarea')).toHaveValue(/Data, transformation and AI program/)
})
