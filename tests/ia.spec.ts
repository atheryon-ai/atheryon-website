import { test, expect } from '@playwright/test'

// Information architecture. Retired-route 301s live in staticwebapp.config.json
// and only apply on Azure, so those cases are gated on SWA_BASE_URL.

const SWA_BASE_URL = process.env.SWA_BASE_URL

const shellRoutes = [
  { path: '/ma', heading: 'Making Transactions Executable' },
  { path: '/experience', heading: 'Experience' },
  { path: '/data-ai', heading: 'Data, Transformation, AI' },
  { path: '/data-ai/supply-chain', heading: 'Supply Chain' },
] as const

const NAMED_EMPLOYERS = [
  'Westpac',
  'Pepper',
  'KKR',
  'PIMCO',
  'Commonwealth Bank',
  'CBA',
  'Count Financial',
  'Financial Wisdom',
  'CommInsure',
  'Deutsche',
] as const

for (const route of shellRoutes) {
  test(`${route.path} renders the firm shell and keeps Contact Us in the header`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()
    await expect(page.locator('.home-nav-cta')).toBeVisible()
    await expect(page.locator('main').getByRole('link', { name: /discuss a situation|contact us/i })).toHaveCount(0)
  })
}

test('function sub-nav is Overview and Experience, no Approach', async ({ page }) => {
  await page.goto('/ma')
  const maNav = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(maNav.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience#ma')
  await expect(maNav.getByRole('link', { name: 'Approach' })).toHaveCount(0)

  await page.goto('/data-ai')
  const dataNav = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(dataNav.getByRole('link', { name: 'Experience' })).toHaveAttribute('href', '/experience#data-ai')
  await expect(dataNav.getByRole('link', { name: 'Approach' })).toHaveCount(0)
})

test('global and function navigation expose the current location', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'M&A SERVICES', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  )
  const armNav = page.getByRole('navigation', { name: 'Arm sections' })
  await expect(armNav.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'page')
  await expect(armNav.getByRole('link', { name: 'Experience' })).not.toHaveAttribute('aria-current', 'page')

  await page.goto('/labs')
  await expect(page.locator('.home-nav-links').getByRole('link', { name: 'DATA & AI', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  )
})

test('/experience is the only cases page and carries CRO for both functions', async ({ page }) => {
  await page.goto('/experience')
  await expect(page.locator('#ma')).toBeVisible()
  await expect(page.locator('#data-ai')).toBeVisible()
  await expect(page.getByText('Context').first()).toBeVisible()
  await expect(page.getByText('more than $20 billion', { exact: false }).first()).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Program Recovery & Delivery' })).toBeVisible()
  await expect(page.locator('main').locator('a[href="/ma/experience"]')).toHaveCount(0)
})

test('/experience#ma leads with the mortgage acquisition in Context / Role / Outcome', async ({ page }) => {
  await page.goto('/experience#ma')

  await expect(
    page.getByText(
      'Selected transactions and transformation programs delivered by Atheryon principals across current engagements and prior leadership roles.',
    ),
  ).toBeVisible()
  await expect(
    page.getByText(
      'Work across banking, wealth, capital markets and non-bank financial institutions, including a home-loan portfolio of more than $20 billion.',
    ),
  ).toBeVisible()

  const firstCase = page.locator('ol > li').first()
  await expect(firstCase.getByRole('heading', { name: '$20bn+ Mortgage Portfolio Acquisition' })).toBeVisible()
  await expect(firstCase.getByText('Context', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Role', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Outcome', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('more than $20 billion', { exact: false })).toBeVisible()
  await expect(firstCase.getByText('Integration Director for the acquiring specialist mortgage servicer')).toBeVisible()
  await expect(page.getByText(/\bRAMS\b/)).toHaveCount(0)

  await expect(page.getByRole('heading', { name: 'Sale & Separation of Major Financial Advice Businesses' })).toBeVisible()
  await expect(
    page.getByText('Delivered the successful sale of a major financial advice business in four months, a record timeframe for the bank'),
  ).toBeVisible()
  await expect(page.getByText('{{')).toHaveCount(0)

  const bodyText = await page.locator('#ma').innerText()
  for (const name of NAMED_EMPLOYERS) {
    expect(bodyText).not.toContain(name)
  }
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

test('/approach is retired from the app', async ({ page }) => {
  const response = await page.goto('/approach')
  expect(response?.status()).toBe(404)
})

test('/data-ai#ma sends visitors to /ma', async ({ page }) => {
  await page.goto('/data-ai#ma')
  await expect(page).toHaveURL(/\/ma\/?$/)
  await expect(page.getByRole('heading', { level: 1, name: 'Making Transactions Executable' })).toBeVisible()
})

test('/contact is the firm enquiry form, not a fork', async ({ page }) => {
  const response = await page.goto('/contact')
  expect(response?.status()).toBe(200)

  await expect(page.locator('form select#topic')).toBeVisible()
  for (const value of ['ma-execution', 'data-ai']) {
    await expect(page.locator(`form select#topic option[value="${value}"]`)).toHaveCount(1)
  }
  await expect(page.locator('form select#topic option[value="capital-markets"]')).toHaveCount(0)
  await expect(page.locator('main').locator('a[href="/ma/contact"]')).toHaveCount(0)
})

test('/contact?topic=ma-execution prefills the M&A path with field order and privacy disclosure', async ({ page }) => {
  await page.goto('/contact?topic=ma-execution')

  const labels = await page.locator('form label').allTextContents()
  const trimmed = labels.map((label) => label.trim().replace(/\s*\*$/, '').trim())
  expect(trimmed[0]).toMatch(/^Name/i)
  expect(trimmed[1]).toMatch(/^Company/i)
  expect(trimmed[2]).toMatch(/^Email/i)
  expect(trimmed[3]).toMatch(/(message|situation)/i)

  await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible()
  await expect(page.getByText('How your enquiry is handled')).toBeVisible()
  await expect(page.getByText('Submissions are processed by Formspree', { exact: false })).toBeVisible()
  await expect(
    page.getByLabel('How your enquiry is handled').getByRole('link', { name: 'Privacy Policy' }),
  ).toHaveAttribute('href', '/privacy')

  await expect(page.getByLabel(/name/i)).toBeVisible()
  await expect(page.locator('label[for="message"]')).toContainText('Tell us about the situation')
  await expect(page.locator('textarea')).toHaveValue(/M&A execution review/)
})

test('function-2 topic slugs pre-fill the same enquiry path', async ({ page }) => {
  for (const topic of ['data-ai', 'capital-markets']) {
    await page.goto(`/contact?topic=${topic}`)
    await expect(page.locator('form textarea#message')).toHaveValue(/Data, transformation and AI program/)
  }
})

test('Contact Us from each function presets that function on the firm form', async ({ page }) => {
  await page.goto('/ma')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute('href', '/contact?topic=ma-execution')
  await page.goto('/data-ai')
  await expect(page.locator('.home-nav-cta')).toHaveAttribute('href', '/contact?topic=data-ai')
})

test('/ma is offer then engage, with four service lines and collapsed workflows', async ({ page }) => {
  await page.goto('/ma')

  await expect(page.getByText('Atheryon was founded on a simple observation:')).toBeVisible()
  await expect(
    page.getByText('Transaction value is lost when separation and integration requirements are discovered too late.'),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Why Clients Choose Atheryon' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Our Belief' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'How we work' })).toHaveCount(0)
  await expect(page.getByText('Clients engage Atheryon to:')).toHaveCount(0)
  await expect(page.getByText('The earlier these requirements are understood')).toHaveCount(0)
  await expect(page.getByText('Our Belief')).toHaveCount(0)

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

  await expect(page.getByText('TSA strategy', { exact: true })).toBeVisible()
  await expect(page.getByText('TSA design and exit planning', { exact: true })).toBeVisible()
  await expect(page.getByText('TSA establishment and exit management', { exact: true })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Representative engagements' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: '$20bn+ Mortgage Portfolio Acquisition' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Operating Model Transformation' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Selected cases' })).toHaveCount(0)

  await expect(page.getByRole('heading', { name: 'How we engage' })).toBeVisible()
  await expect(page.getByText('embedded senior specialists', { exact: false })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'From pre-sign to operational independence' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Governance and regulatory posture' })).toBeVisible()
  await expect(page.getByText('6–18 months')).toHaveCount(0)
  await expect(page.getByText('{{')).toHaveCount(0)

  const workflowDetails = page.locator('details').filter({ hasText: 'Three transaction workflows' })
  await expect(workflowDetails.locator('summary')).toContainText('Inputs, AI agents, processing and outputs')
  await expect(workflowDetails.getByRole('heading', { name: 'Pre-Sign Execution Review' })).toBeHidden()
  await workflowDetails.locator('summary').click()
  for (const name of ['Pre-Sign Execution Review', 'Separation & Integration Planning', 'TSA Tracking & Exit']) {
    await expect(workflowDetails.getByRole('heading', { name })).toBeVisible()
  }
})

test('/data-ai carries the function principle, pillars, service lines and method', async ({ page }) => {
  await page.goto('/data-ai')

  await expect(page.getByRole('heading', { level: 1, name: 'Data, Transformation, AI' })).toBeVisible()
  await expect(
    page.getByText('Data is only valuable when it can be trusted. AI is only valuable when it can be deployed responsibly.'),
  ).toBeVisible()

  for (const pillar of ['Data Platforms', 'Transformation Delivery', 'AI & Accelerated Delivery']) {
    await expect(page.getByRole('heading', { level: 3, name: pillar })).toBeVisible()
  }
  await expect(page.getByRole('heading', { name: 'Experience in regulated environments' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the function delivers' })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Service lines' })).toBeVisible()
  for (const line of [
    'Systems & Platform Delivery',
    'Market Data & Reference Data Environments',
    'Data Foundations',
    'Regulatory Platforms',
  ]) {
    await expect(page.getByRole('heading', { level: 3, name: line })).toBeVisible()
  }

  await expect(page.getByRole('heading', { name: 'Delivery examples' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Program recovery' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Embedded delivery', exact: true })).toBeVisible()
  await expect(page.getByText('APRA CPS 234', { exact: false })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the work is directed' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Controls come first' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Regulatory reporting', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the function engages' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Advisory assessment' })).toBeVisible()
  await expect(page.getByText('AI agents have been used to migrate from AWS to Azure.')).toBeVisible()

  await expect(page.getByRole('heading', { name: 'How the function works' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Where it shows up' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Representative engagements' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Pre-Sign Execution Review' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'TSA Tracking & Reduction' })).toHaveCount(0)
  await expect(page.getByText('$84M', { exact: true })).toHaveCount(0)
  await expect(page.getByText('Stalled after $50 million', { exact: false })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'Selected cases' })).toHaveCount(0)
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/data-ai keeps depth pages reachable and does not host cases', async ({ page }) => {
  await page.goto('/data-ai')

  await expect(page.getByRole('navigation', { name: 'Arm sections' }).getByRole('link', { name: 'Experience' })).toHaveAttribute(
    'href',
    '/experience#data-ai',
  )

  for (const [label, href] of [
    ['Labs', '/labs'],
    ['M&A Transaction Services', '/ma#technology-data-migration'],
    ['Supply Chain', '/data-ai/supply-chain'],
  ] as const) {
    await expect(page.locator('main').getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
  await expect(page.locator('main').locator('a[href="/ma#technology-data-migration"]')).toHaveCount(1)
})

test('footer Firm matches the unique URLs and Technology stays on function 2', async ({ page }) => {
  await page.goto('/')
  const homeFooter = page.getByLabel('Footer navigation')
  await expect(homeFooter.getByRole('link', { name: 'M&A Transaction Services', exact: true })).toHaveAttribute('href', '/ma')
  await expect(homeFooter.getByRole('link', { name: 'Experience', exact: true })).toHaveAttribute('href', '/experience')
  await expect(homeFooter.getByRole('link', { name: 'Data, Transformation, AI', exact: true })).toHaveAttribute(
    'href',
    '/data-ai',
  )
  await expect(homeFooter.getByRole('link', { name: 'Approach', exact: true })).toHaveCount(0)
  await expect(homeFooter.getByRole('link', { name: 'Contact', exact: true })).toHaveCount(0)
  await expect(homeFooter.getByRole('link', { name: 'Capital Markets', exact: true })).toHaveCount(0)
  await expect(homeFooter.getByText('Technology', { exact: true })).toHaveCount(0)
  await expect(page.locator('footer a[href^="mailto:info@atheryon.com.au"]')).toBeVisible()

  await page.goto('/ma')
  const maFooter = page.getByLabel('Footer navigation')
  await expect(maFooter.getByText('Technology', { exact: true })).toHaveCount(0)
  await expect(maFooter.getByRole('link', { name: 'Labs', exact: true })).toHaveCount(0)

  await page.goto('/data-ai')
  const dataFooter = page.getByLabel('Footer navigation')
  await expect(dataFooter.getByText('Technology', { exact: true })).toHaveCount(1)
  for (const [label, href] of [
    ['Labs', '/labs'],
    ['System', '/system'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(dataFooter.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
  await expect(dataFooter.getByRole('link', { name: 'Themes', exact: true })).toHaveCount(0)

  await page.goto('/labs')
  const labsFooter = page.getByLabel('Footer navigation')
  await expect(labsFooter.getByRole('link', { name: 'Labs', exact: true })).toBeVisible()
  await expect(labsFooter.getByRole('link', { name: 'Themes', exact: true })).toHaveCount(0)
})

test('function-2 depth routes still resolve', async ({ page }) => {
  for (const path of ['/system', '/labs', '/themes', '/offers']) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
  }
})

test('/labs evidence strip has exactly four populated proof items', async ({ page }) => {
  await page.goto('/labs')
  const section = page.locator('section').filter({
    has: page.getByRole('heading', { name: 'What was built, how fast' }),
  })
  const proofItems = section.locator('ul').first().locator(':scope > li')
  await expect(proofItems).toHaveCount(4)
  for (const item of await proofItems.all()) {
    await expect(item).not.toBeEmpty()
  }
})

test('/roadmap is gone and is not linked from the footer', async ({ page }) => {
  const response = await page.goto('/roadmap')
  expect(response?.status()).toBe(404)
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Roadmap', exact: true })).toHaveCount(0)
})

test('/blog is gone and is not linked from the footer', async ({ page }) => {
  const index = await page.goto('/blog')
  expect(index?.status()).toBe(404)
  const post = await page.goto('/blog/why-claude')
  expect(post?.status()).toBe(404)
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Writing', exact: true })).toHaveCount(0)
})

test.describe('retired-route redirects (SWA only)', () => {
  test.skip(!SWA_BASE_URL, 'Set SWA_BASE_URL to test deployed redirects')

  for (const [from, to] of [
    ['/services', '/ma'],
    ['/ma/offers', '/ma'],
    ['/ma/system', '/ma'],
    ['/ma/workflows', '/ma'],
    ['/technology', '/data-ai'],
    ['/ma/experience', '/experience#ma'],
    ['/ma/approach', '/ma'],
    ['/ma/contact', '/contact?topic=ma-execution'],
    ['/approach', '/data-ai'],
    ['/data-ai/experience', '/experience#data-ai'],
    ['/data-ai/approach', '/data-ai'],
    ['/data-ai/contact', '/contact?topic=data-ai'],
    ['/capital-markets', '/data-ai'],
    ['/capital-markets/experience', '/experience#data-ai'],
    ['/capital-markets/approach', '/data-ai'],
    ['/capital-markets/contact', '/contact?topic=data-ai'],
  ] as const) {
    test(`${from} 301s to ${to}`, async ({ request }) => {
      const response = await request.get(`${SWA_BASE_URL}${from}`, { maxRedirects: 0 })
      expect(response.status()).toBe(301)
      const location = response.headers()['location'] ?? ''
      const pathAndQuery = (href: string) => href.split('#')[0]
      expect(pathAndQuery(location)).toBe(pathAndQuery(to))
    })
  }
})
