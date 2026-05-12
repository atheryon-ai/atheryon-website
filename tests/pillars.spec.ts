import { test, expect } from '@playwright/test'

const pillars = [
  {
    path: '/data',
    eyebrow: '01 · Data',
    h1: 'Data',
    proofAlt: /schema editor/i,
    closingLabel: /Request a session/i,
    closingHref: '/contact',
    whatWeDoCount: 4,
  },
  {
    path: '/ai-direction',
    eyebrow: '02 · AI Direction',
    h1: 'AI Direction',
    proofAlt: /analytics/i,
    closingLabel: /Request access/i,
    closingHref: '/contact?topic=ai-direction',
    whatWeDoCount: 4,
  },
  {
    path: '/transformation',
    eyebrow: '03 · Transformation',
    h1: 'Transformation',
    proofAlt: /trade board/i,
    closingLabel: /Request a session/i,
    closingHref: '/contact',
    whatWeDoCount: 5,
  },
]

for (const p of pillars) {
  test.describe(p.path, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(p.path)
    })

    test('returns 200 with hero eyebrow + H1 + breadcrumb', async ({ page }) => {
      await expect(page.getByText(p.eyebrow)).toBeVisible()
      await expect(page.getByRole('heading', { level: 1, name: p.h1 })).toBeVisible()
      await expect(page.getByRole('link', { name: /Back to Reality/i })).toHaveAttribute('href', '/reality')
    })

    test('"What we do" grid renders expected card count', async ({ page }) => {
      const cards = page.getByTestId('pillar-service-card')
      await expect(cards).toHaveCount(p.whatWeDoCount)
    })

    test('Floor 13 nudge is present', async ({ page }) => {
      await expect(page.getByRole('link', { name: /Generate a Reality Blueprint/i })).toHaveAttribute('href', '/reality#floor-13')
    })

    test('proof band has the right screenshot alt text', async ({ page }) => {
      await expect(page.getByAltText(p.proofAlt)).toBeVisible()
    })

    test('closing CTA links to contact', async ({ page }) => {
      await expect(page.getByRole('link', { name: p.closingLabel })).toHaveAttribute('href', p.closingHref)
    })
  })
}
