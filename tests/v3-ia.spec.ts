import { test, expect } from '@playwright/test'

// Executive-first IA (2026-08-09): L2 routes exist, carry the firm shell,
// and every page ends in a CTA to /contact.

const routes = [
  { path: '/services', heading: 'Transaction Advisory & Execution' },
  { path: '/experience', heading: 'Representative Experience' },
  { path: '/approach', heading: 'Our Approach' },
] as const

for (const route of routes) {
  test(`${route.path} renders the firm shell and ends in a contact CTA`, async ({ page }) => {
    const response = await page.goto(route.path)
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible()

    await expect.poll(async () =>
      page.evaluate(() => document.documentElement.dataset.mode),
    ).toBe('cm')

    // DocFooter CTA
    await expect(page.getByRole('link', { name: /Contact/ }).last()).toHaveAttribute('href', '/contact')
  })
}

test('/services lists the four service lines with deduped TSA scope', async ({ page }) => {
  await page.goto('/services')

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

  // Engagement model is TODO-gated: block must be hidden while pending
  await expect(page.getByText('How we engage')).toHaveCount(0)
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/experience normalises cases to Context / Role / Outcome with RAMS first', async ({ page }) => {
  await page.goto('/experience')

  await expect(page.getByText('Representative experience spans Atheryon engagements and programs led by Atheryon principals in prior senior roles.')).toBeVisible()

  const firstCase = page.locator('ol > li').first()
  await expect(firstCase.getByRole('heading', { name: /RAMS/ })).toBeVisible()
  await expect(firstCase.getByText('Context', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Role', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('Outcome', { exact: true })).toBeVisible()
  await expect(firstCase.getByText('approximately $21.4 billion at signing', { exact: false })).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Sale & Separation of a Major Financial Advice Business' })).toBeVisible()

  // Technology cases are TODO-gated
  await expect(page.getByText('{{')).toHaveCount(0)
})

test('/technology is a practice page keeping CM depth reachable', async ({ page }) => {
  const response = await page.goto('/technology')
  expect(response?.status()).toBe(200)

  await expect(page.getByRole('heading', { level: 1, name: 'Technology & Data' })).toBeVisible()

  // Homepage capabilities secondary entry is live and the flagship still leads
  // (asymmetric presentation), and the nav carries TECHNOLOGY.
  await expect(
    page.locator('.home-nav-links').getByRole('link', { name: 'TECHNOLOGY' }),
  ).toHaveAttribute('href', '/technology')

  // Three delivery workflows (demoted v2Ma AI content)
  await expect(page.getByRole('heading', { name: 'Pre-Sign Execution Review' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'TSA Tracking & Reduction' })).toBeVisible()

  // Partner names are TODO-gated
  await expect(page.getByText('{{')).toHaveCount(0)

  // CM depth links out of /technology
  const depth = page.locator('section', { has: page.getByRole('heading', { name: 'Under the practice' }) })
  for (const [label, href] of [
    ['System', '/system'],
    ['Labs', '/labs'],
    ['Themes', '/themes'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(depth.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
})

test('CM legacy routes still resolve and the footer groups them under Technology', async ({ page }) => {
  for (const path of ['/system', '/labs', '/themes', '/offers']) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
  }

  await page.goto('/')
  const footer = page.getByLabel('Footer navigation')
  // Both the group heading and the /technology practice link carry the word.
  await expect(footer.getByText('Technology', { exact: true })).toHaveCount(2)
  for (const [label, href] of [
    ['System', '/system'],
    ['Labs', '/labs'],
    ['Themes', '/themes'],
    ['Offers', '/offers'],
  ] as const) {
    await expect(footer.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
  }
})

// Retired /ma routes 301 on the SWA (redirects live in
// staticwebapp.config.json, which only applies on Azure — not `next dev`).
// Gated behind SWA_BASE_URL like the legacy-redirect tests in offers.spec.ts.
const SWA_BASE_URL = process.env.SWA_BASE_URL

test.describe('retired /ma redirects (SWA only)', () => {
  test.skip(!SWA_BASE_URL, 'Set SWA_BASE_URL to test deployed redirects')

  for (const [from, to] of [
    ['/ma', '/'],
    ['/ma/approach', '/approach'],
    ['/ma/offers', '/services'],
    ['/ma/contact', '/contact'],
    ['/ma/system', '/approach'],
    ['/ma/workflows', '/approach'],
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

test('/contact renders the enquiry form with the privacy disclosure beside it', async ({ page }) => {
  await page.goto('/contact')

  await expect(page.getByRole('heading', { level: 1, name: 'Contact' })).toBeVisible()
  await expect(page.getByText('How your enquiry is handled')).toBeVisible()
  await expect(page.getByText('Submissions are processed by Formspree', { exact: false })).toBeVisible()
  await expect(
    page.getByLabel('How your enquiry is handled').getByRole('link', { name: 'Privacy Policy' }),
  ).toHaveAttribute('href', '/privacy')

  // Default enquiry path is M&A execution; form fields unchanged
  await expect(page.getByLabel(/name/i)).toBeVisible()
  await expect(page.locator('textarea')).toHaveValue(/M&A execution review/)
})
