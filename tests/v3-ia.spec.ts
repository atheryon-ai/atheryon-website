import { test, expect } from '@playwright/test'

// Executive-first IA (2026-08-09): L2 routes exist and carry the firm
// shell. Contact Us lives in the header only (Terry 2026-08-15).

const routes = [
  { path: '/ma', heading: 'Making Transactions Executable' },
  { path: '/experience', heading: 'Experience' },
  { path: '/approach', heading: 'Approach' },
  { path: '/data-ai', heading: 'Data, Transformation, AI' },
  { path: '/data-ai/supply-chain', heading: 'Supply Chain' },
] as const

// One Experience, one Approach (Terry 2026-08-15): the firm pages carry the
// full function copy. Function sub-nav points at hashes, not at the copies
// Task 5 will 301 away.
test('/experience is the only cases page and carries full CRO for both functions', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.locator('#ma')).toBeVisible()
  await expect(page.locator('#data-ai')).toBeVisible()
  await expect(page.getByText('Context').first()).toBeVisible()
  await expect(page.getByText('more than $20 billion', { exact: false }).first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Program Recovery & Delivery' })).toBeVisible()
  await expect(page.locator('main').locator('a[href="/ma/experience"]')).toHaveCount(0)
})

test('/approach is the only method page and carries both functions in full', async ({ page }) => {
  await page.goto('/approach')
  await expect(page.locator('#ma')).toBeVisible()
  await expect(page.locator('#data-ai')).toBeVisible()
  await expect(page.getByText('From pre-sign to operational independence')).toBeVisible()
  await expect(page.getByText('APRA CPS 234', { exact: false })).toBeVisible()
  await expect(page.locator('main').locator('a[href="/ma/approach"]')).toHaveCount(0)
})

test('function sub-nav Experience and Approach point at the firm pages', async ({ page }) => {
  await page.goto('/ma')
  const nav = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(nav.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience#ma')
  await expect(nav.getByRole('link', { name: 'Approach' })).toHaveAttribute('href', '/approach#ma')
  await page.goto('/data-ai')
  const nav2 = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(nav2.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience#data-ai')
  await expect(nav2.getByRole('link', { name: 'Approach' })).toHaveAttribute('href', '/approach#data-ai')
})

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

test('Contact Us from /ma presets the M&A topic on the firm form', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute(
    'href',
    '/contact?topic=ma-execution',
  )
})

test('Contact Us from /data-ai presets the function-2 topic on the firm form', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute(
    'href',
    '/contact?topic=data-ai',
  )
})

test('/data-ai carries the function principle', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(
    page.getByText(
      'Atheryon has delivered those platforms and has led APRA engagement at executive level.',
    ),
  ).toBeVisible()
  // Three-discipline grid cut 2026-08-15 (MECE): the landing is boxes + three links.
  await expect(page.getByRole('heading', { name: 'How the function works' })).toHaveCount(0)
})

test('/data-ai absorbed the markets depth and platform links', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(page.getByRole('heading', { name: 'Service lines' })).toBeVisible()
  for (const line of [
    'Systems & Platform Delivery',
    'Market Data & Reference Data Environments',
    'Data Foundations',
    'Regulatory Platforms',
  ]) {
    await expect(page.getByRole('heading', { level: 3, name: line })).toBeVisible()
  }
  // The one cross-link back into a transaction (spec §4.6).
  await expect(
    page.locator('main').locator('a[href="/ma#technology-data-migration"]'),
  ).toHaveCount(1)
})

test('/ma is offer then engage, not a repeated sermon', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.getByRole('heading', { name: 'Transaction Readiness' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How we engage' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Why Clients Choose Atheryon' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'How we work' })).toHaveCount(0)
  await expect(page.getByText('Our Belief')).toHaveCount(0)
})

test('/data-ai is boxes plus three links, not three indexes', async ({ page }) => {
  await page.goto('/data-ai')
  await expect(page.getByRole('heading', { name: 'Systems & Platform Delivery' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the function works' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Where it shows up' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Representative engagements' })).toBeVisible()
  await expect(page.getByText('$84M', { exact: true })).toBeVisible()
  await expect(page.getByText('AI agents have been used to migrate from AWS to Azure.')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Selected cases' })).toHaveAttribute('href', '/experience#data-ai')
  await expect(page.locator('main').locator('a[href="/labs"]')).toHaveCount(1)
  await expect(page.locator('main').locator('a[href="/ma#technology-data-migration"]')).toHaveCount(1)
  await expect(page.locator('main').locator('a[href="/data-ai/supply-chain"]')).toHaveCount(1)
})

test('global and function navigation expose the current location', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'M&A SERVICES', exact: true })).toHaveAttribute('aria-current', 'page')
  const armNav = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(armNav.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page')
  await expect(armNav.getByRole('link', { name: 'Experience' })).not.toHaveAttribute('aria-current', 'page')

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

  // The transaction principle lives here (Terry 2026-08-09: M&A-specific
  // content leaves the homepage). Why / values / belief cut 2026-08-15 so
  // the landing is offer then engage, not a repeated sermon.
  await expect(page.getByText('Atheryon was founded on a simple observation:')).toBeVisible()
  await expect(page.getByText('Transaction value is lost when separation and integration requirements are discovered too late.')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Why Clients Choose Atheryon' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Our Belief' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'How we work' })).toHaveCount(0)
  await expect(page.getByText('Clients engage Atheryon to:')).toHaveCount(0)
  await expect(page.getByText('The earlier these requirements are understood')).toHaveCount(0)

  for (const line of [
    'Transaction Readiness',
    'Separation & Integration Strategy',
    'Execution Leadership',
    'Technology, Data & Migration Readiness',
  ]) {
    await expect(page.getByRole('heading', { name: line })).toBeVisible()
  }

  const serviceIndex = page.getByRole('list', { name: 'Service lines' })
  await expect(serviceIndex.getByRole('listitem').filter({ has: page.getByRole('heading', { level: 3 }) })).toHaveCount(4)
  await expect(page.locator('#transaction-readiness')).toBeVisible()

  // TSA dedupe: each line owns distinct scope
  await expect(page.getByText('TSA strategy', { exact: true })).toBeVisible()
  await expect(page.getByText('TSA design and exit planning', { exact: true })).toBeVisible()
  await expect(page.getByText('TSA establishment and exit management', { exact: true })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Representative engagements' })).toBeVisible()
  await expect(page.getByRole('heading', { name: '$20bn+ Mortgage Portfolio Acquisition' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Operating Model Transformation' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Selected cases' })).toHaveAttribute('href', '/experience#ma')

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
    'Separation & Integration Planning',
    'TSA Tracking & Exit',
  ]) {
    await expect(workflowDetails.getByRole('heading', { name })).toBeVisible()
  }
})

test('/experience#ma normalises cases to Context / Role / Outcome with the mortgage acquisition first', async ({ page }) => {
  await page.goto('/experience#ma')

  await expect(page.getByText('Selected transactions and transformation programs delivered by Atheryon principals across current engagements and prior leadership roles.')).toBeVisible()
  await expect(page.getByText('Work across banking, wealth, capital markets and non-bank financial institutions, including a home-loan portfolio of more than $20 billion.')).toBeVisible()

  const firstCase = page.locator('ol > li').first()
  await expect(firstCase.getByRole('heading', { name: '$20bn+ Mortgage Portfolio Acquisition' })).toBeVisible()
  await expect(firstCase.getByText('Context', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Role', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Outcome', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('more than $20 billion', { exact: false })).toBeVisible()
  await expect(firstCase.getByText('Integration Director for the acquiring specialist mortgage servicer')).toBeVisible()
  // De-named per Terry 2026-08-10: the deal name must not appear anywhere.
  // Exact + case-sensitive, else "programs" matches on a substring.
  await expect(page.getByText(/\bRAMS\b/)).toHaveCount(0)

  await expect(page.getByRole('heading', { name: 'Sale & Separation of Major Financial Advice Businesses' })).toBeVisible()
  await expect(page.getByText('Delivered the successful sale of a major financial advice business in four months, a record timeframe for the bank')).toBeVisible()
  await expect(page.getByText('{{')).toHaveCount(0)

  const bodyText = await page.locator('#ma').innerText()
  for (const name of [
    'Westpac', 'Pepper', 'KKR', 'PIMCO', 'Commonwealth Bank', 'CBA',
    'Count Financial', 'Financial Wisdom', 'CommInsure', 'Deutsche',
  ]) {
    expect(bodyText).not.toContain(name)
  }
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
  await expect(page.getByRole('navigation', { name: 'Arm sections' }).getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience#data-ai')
  await expect(page.getByText('{{')).toHaveCount(0)

  // Related links out of /data-ai (MECE cut 2026-08-15): Labs + M&A line-04
  // + supply chain. Scoped to <main> — footer Technology still has the
  // platform group and sits outside <main>.
  for (const [label, href] of [
    ['Labs', '/labs'],
    ['M&A Transaction Services', '/ma#technology-data-migration'],
    ['Supply Chain', '/data-ai/supply-chain'],
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

test('/experience#data-ai carries the three Appendix C cases', async ({ page }) => {
  await page.goto('/experience#data-ai')
  for (const name of [
    'Program Recovery & Delivery',
    'First Near Real-Time Front Office Risk System',
    'Regulatory Markets Platform',
  ]) {
    await expect(page.getByRole('heading', { name })).toBeVisible()
  }
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/approach#data-ai carries the delivery patterns and embedded delivery', async ({ page }) => {
  await page.goto('/approach#data-ai')
  await expect(page.getByRole('heading', { name: 'Delivery examples' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Program recovery' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Embedded delivery', exact: true })).toBeVisible()
  await expect(page.getByText('APRA CPS 234', { exact: false })).toBeVisible()

  // Method principles and the three engagement paths live on the firm page
  // (promoted from the deleted /data-ai/approach copy).
  await expect(page.getByRole('heading', { name: 'How the work is directed' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Controls come first' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Regulatory reporting', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the function engages' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Advisory assessment' })).toBeVisible()
})

test('CM legacy routes still resolve and the footer groups them under Technology', async ({ page }) => {
  for (const path of ['/system', '/labs', '/themes', '/offers']) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
  }

  // Council review 2026-08-10: the Technology column is function-2 material.
  // It renders on function-2 surfaces only, never on function 1 or neutral
  // ones. Themes dropped 2026-08-15 so two different "Themes" pages are not
  // collapsed into one footer row.
  await page.goto('/data-ai')
  const cmFooter = page.getByLabel('Footer navigation')
  await expect(cmFooter.getByText('Technology', { exact: true })).toHaveCount(1)
  for (const [label, href] of [
    ['Labs', '/labs'],
    ['System', '/system'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(cmFooter.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
  await expect(cmFooter.getByRole('link', { name: 'Themes', exact: true })).toHaveCount(0)

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

test('footer Firm matches the unique URLs and Technology has no Themes', async ({ page }) => {
  await page.goto('/')
  const firm = page.getByLabel('Footer navigation')
  await expect(firm.getByRole('link', { name: 'M&A Transaction Services', exact: true })).toHaveAttribute('href', '/ma')
  await expect(firm.getByRole('link', { name: 'Experience', exact: true })).toHaveAttribute('href', '/experience')
  await expect(firm.getByRole('link', { name: 'Contact', exact: true })).toHaveCount(0)
  await expect(firm.getByText('Technology', { exact: true })).toHaveCount(0)

  await page.goto('/labs')
  const tech = page.getByLabel('Footer navigation')
  await expect(tech.getByRole('link', { name: 'Labs', exact: true })).toBeVisible()
  await expect(tech.getByRole('link', { name: 'Themes', exact: true })).toHaveCount(0)
})

test('/themes is Buyer themes and /labs/themes is Platform themes', async ({ page }) => {
  await page.goto('/themes')
  await expect(page.getByRole('heading', { level: 1, name: 'Buyer themes' })).toBeVisible()
  await page.goto('/labs/themes')
  await expect(page.getByRole('heading', { name: /Platform themes/i })).toBeVisible()
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
    ['/ma/experience', '/experience#ma'],
    ['/ma/approach', '/approach#ma'],
    ['/ma/contact', '/contact?topic=ma-execution'],
    ['/data-ai/experience', '/experience#data-ai'],
    ['/data-ai/approach', '/approach#data-ai'],
    ['/data-ai/contact', '/contact?topic=data-ai'],
    ['/capital-markets', '/data-ai'],
    ['/capital-markets/experience', '/experience#data-ai'],
    ['/capital-markets/approach', '/approach#data-ai'],
    ['/capital-markets/contact', '/contact?topic=data-ai'],
  ] as const) {
    test(`${from} 301s to ${to}`, async ({ request }) => {
      const response = await request.get(`${SWA_BASE_URL}${from}`, {
        maxRedirects: 0,
      })
      expect(response.status()).toBe(301)
      // SWA emits a relative Location. Fragments in Location are often
      // dropped; assert path + query only. Hashes stay on in-app ArmSubNav.
      const location = response.headers()['location'] ?? ''
      const pathAndQuery = (href: string) => href.split('#')[0]
      expect(pathAndQuery(location)).toBe(pathAndQuery(to))
    })
  }
})

test('/contact?topic=ma-execution renders the enquiry form with the privacy disclosure beside it', async ({ page }) => {
  await page.goto('/contact?topic=ma-execution')

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

test('/contact?topic=data-ai pre-fills the function-2 enquiry path', async ({ page }) => {
  await page.goto('/contact?topic=data-ai')
  await expect(page.locator('textarea')).toHaveValue(/Data, transformation and AI program/)
})
