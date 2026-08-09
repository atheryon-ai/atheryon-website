import { test, expect } from '@playwright/test'

// Visual regression baselines (design-standard AC, 2026-08-09). Captured
// after the poster comparison passed: / viewport 1 reproduces
// docs/superpowers/specs/atheryon-poster-2026-08-09.svg. Playwright
// suffixes snapshot files per platform (-darwin); these baselines serve
// local runs — a CI runner on another OS would need its own set.
const routes = ['/', '/ma', '/experience'] as const
const viewports = [
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'mobile', width: 390, height: 844 },
] as const

for (const route of routes) {
  for (const vp of viewports) {
    test(`${route} matches the visual baseline at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })
      await page.goto(route)
      await page.evaluate(() => document.fonts.ready)
      await expect(page).toHaveScreenshot(
        `${route === '/' ? 'home' : route.slice(1)}-${vp.name}.png`,
        { fullPage: true, maxDiffPixelRatio: 0.02, animations: 'disabled' },
      )
    })
  }
}
