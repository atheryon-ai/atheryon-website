import { test, expect } from '@playwright/test'

// Executive-first IA (2026-08-09): L2 routes exist, carry the firm shell,
// and every page ends in a CTA to /contact.

const routes = [
  { path: '/ma', heading: 'Making Transactions Executable' },
  { path: '/ma/experience', heading: 'Representative Experience' },
  { path: '/ma/approach', heading: 'Our Approach' },
  { path: '/capital-markets/experience', heading: 'Capital Markets Experience' },
  { path: '/capital-markets/approach', heading: 'Our Approach' },
  { path: '/data-ai', heading: 'Data. Transformation. AI.' },
] as const

// Chooser pages (Terry 2026-08-09): the firm-level routes stay live and
// offer one link per arm.
for (const [path, links] of [
  ['/experience', [['M&A Experience', '/ma/experience'], ['Capital Markets Experience', '/capital-markets/experience']]],
  ['/approach', [['M&A Approach', '/ma/approach'], ['Capital Markets Approach', '/capital-markets/approach']]],
  ['/contact', [['M&A', '/ma/contact'], ['Capital Markets', '/capital-markets/contact']]],
] as const) {
  test(`${path} is a chooser between the two arms`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    for (const [label, href] of links) {
      await expect(page.locator('main').getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
    }
  })
}

test('/data-ai carries the underpinning principle', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(
    page.getByText(
      'Atheryon faces regulators on behalf of clients and knows what is required.',
    ),
  ).toBeVisible()
})

for (const route of routes) {
  test(`${route.path} renders the firm shell and ends in a contact CTA`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()

    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.dataset.mode),
    ).toBe('cm')

    // DocFooter CTA
    await expect(page.getByRole('link', { name: 'Discuss a situation' }).last()).toHaveAttribute('href', '/contact')
  })
}

test('/ma (M&A arm) lists the four service lines with deduped TSA scope', async ({ page }) => {
  await page.goto('/ma')

  // The transaction principle, Why Atheryon and How we work live here now
  // (Terry 2026-08-09: M&A-specific content leaves the homepage)
  await expect(page.getByText('Atheryon was founded on a simple observation:')).toBeVisible()
  await expect(page.getByText('Transaction value is protected when separation and integration requirements are understood early.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Why Atheryon' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How we work' })).toBeVisible()

  for (const line of [
    'Transaction Readiness',
    'Separation & Integration Strategy',
    'Execution Leadership',
    'Technology, Data & Migration Readiness',
  ]) {
    await expect(page.getByRole('heading', { name: line })).toBeVisible()
  }

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

test('/ma/experience normalises cases to Context / Role / Outcome with RAMS first', async ({ page }) => {
  await page.goto('/ma/experience')

  await expect(page.getByText('Representative experience spans Atheryon engagements and programs led by Atheryon principals in prior senior roles.')).toBeVisible()

  const firstCase = page.locator('ol > li').first()
  await expect(firstCase.getByRole('heading', { name: /RAMS/ })).toBeVisible()
  await expect(firstCase.getByText('Context', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Role', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Outcome', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('approximately $21.4 billion at signing', { exact: false })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Sale & Separation of a Major Financial Advice Business' })).toBeVisible()

  // Terry 2026-08-09: capital markets and M&A experience do not share a
  // page — the CM cases live at /capital-markets#experience only
  await expect(page.getByRole('heading', { name: 'Capital markets experience' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Recovery of a Failed $84M Data & Analytics Program' })).toHaveCount(0)
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/capital-markets is the Capital Markets arm keeping CM depth reachable', async ({ page }) => {
  const response = await page.goto('/capital-markets')
  expect(response?.status()).toBe(200)

  await expect(page.getByRole('heading', { level: 1, name: 'Capital Markets' })).toBeVisible()

  // The arm's principle (Terry, 2026-08-09)
  await expect(page.getByText('Capital markets platforms succeed or fail on the data beneath them.')).toBeVisible()

  // Rev 7: capital markets and transaction content do not mix. The three
  // transaction workflows relocated to /ma; the page's transaction role is
  // exactly one cross-link line to the M&A service line.
  await expect(page.getByRole('heading', { name: 'Pre-Sign Execution Review' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'TSA Tracking & Reduction' })).toHaveCount(0)
  await expect(
    page.locator('main').getByRole('link', { name: /Technology, Data & Migration Readiness/ }),
  ).toHaveAttribute('href', '/ma#technology-data-migration')

  // Cases and delivery patterns live on the arm's sub-pages now; the
  // landing carries the arm sub-nav
  await expect(page.getByRole('navigation', { name: 'Arm sections' }).getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/capital-markets/experience')
  await expect(page.getByText('{{')).toHaveCount(0)

  // CM depth links out of /capital-markets. Scoped to <main> — the footer
  // carries identically named links but sits outside <main> in the (cm)
  // layout, so this cannot collide.
  for (const [label, href] of [
    ['System', '/system'],
    ['Labs', '/labs'],
    ['Themes', '/themes'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(page.locator('main').getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
})

test('/capital-markets/experience carries the three Appendix C cases', async ({ page }) => {
  await page.goto('/capital-markets/experience')
  for (const name of [
    'Recovery of a Failed $84M Data & Analytics Program',
    'First Near Real-Time Front Office Risk System',
    'Regulatory Markets Platform: Surveillance, Reporting, Record Keeping',
  ]) {
    await expect(page.getByRole('heading', { name })).toBeVisible()
  }
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/capital-markets/approach carries the delivery patterns and embedded delivery', async ({ page }) => {
  await page.goto('/capital-markets/approach')
  await expect(page.getByRole('heading', { name: 'Delivery examples' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Program recovery' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Embedded delivery' })).toBeVisible()
  await expect(page.getByText('APRA CPS 234', { exact: false })).toBeVisible()
})

test('CM legacy routes still resolve and the footer groups them under Technology', async ({ page }) => {
  for (const path of ['/system', '/labs', '/themes', '/offers']) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
  }

  await page.goto('/')
  const footer = page.getByLabel('Footer navigation')
  // Only the depth-group heading carries the bare word "Technology";
  // phase 2 adds the Capital Markets link to the Firm group.
  await expect(footer.getByText('Technology', { exact: true })).toHaveCount(1)
  await expect(footer.getByRole('link', { name: 'Capital Markets', exact: true })).toHaveAttribute('href', '/capital-markets')
  for (const [label, href] of [
    ['System', '/system'],
    ['Labs', '/labs'],
    ['Themes', '/themes'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(footer.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
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
    ['/technology', '/capital-markets'],
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

test('/capital-markets/contact pre-fills the capital markets enquiry path', async ({ page }) => {
  await page.goto('/capital-markets/contact')
  await expect(page.getByText('technology or data program you are considering', { exact: false })).toBeVisible()
  await expect(page.locator('textarea')).toHaveValue(/Capital markets engagement/)
})
