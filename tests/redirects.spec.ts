import { test, expect } from '@playwright/test'

test.skip(
  process.env.E2E_AGAINST_DEPLOYED !== 'true',
  'Redirects are enforced by Azure SWA — only valid against deployed env. Set E2E_AGAINST_DEPLOYED=true to run.',
)

const redirects = [
  { from: '/cdm-platform', to: '/data' },
  { from: '/recovery-migration', to: '/transformation' },
  { from: '/m-and-a-execution', to: '/transformation' },
  { from: '/capability-enablement', to: '/transformation' },
  { from: '/how-we-work', to: '/reality' },
  { from: '/what-we-deliver', to: '/transformation' },
  { from: '/ai-ready-data', to: '/intelligence' },
  { from: '/reference-architectures', to: '/data' },
]

for (const { from, to } of redirects) {
  test(`${from} redirects to ${to}`, async ({ page }) => {
    const response = await page.goto(from)
    // SWA may serve as 200 after rewrite, so we check the final URL
    expect(page.url()).toContain(to)
    expect(response?.status()).toBeLessThan(400)
  })
}
