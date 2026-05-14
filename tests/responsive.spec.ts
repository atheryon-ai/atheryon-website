import { test, expect } from '@playwright/test';

/**
 * Responsive layout coverage for the post-pivot homepage (= /reality content).
 *
 * The old grid of "Data cannot be trusted / No single source of truth / etc."
 * cards no longer exists. We instead exercise the structures that are stable
 * on the new IA: hero CTAs, header, the 3 pillar cards, Floor 13 dials, and
 * the footer. There's no FAQ accordion on the homepage either — the FAQ lives
 * on /programs/mib-insight, where it's covered by its own visual check.
 */

test.describe('Responsive Design', () => {
  test('desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Mobile menu button is hidden at lg+ breakpoints.
    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await expect(mobileMenuBtn).not.toBeVisible();

    // Header nav is visible.
    await expect(page.locator('nav a:has-text("Reality")').first()).toBeVisible();

    // Hero is visible.
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    await expect(page.locator('footer')).toBeVisible();
  });

  test('mobile layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await expect(mobileMenuBtn).toBeVisible();

    const heroHeadline = page.locator('h1');
    await expect(heroHeadline).toBeVisible();

    // The hero primary CTA on mobile.
    const primaryCta = page.getByRole('link', { name: /Enter Floor 13/i }).first();
    await expect(primaryCta).toBeVisible();
  });

  test('tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Pillars section is the canonical mid-page structural element on the
    // post-pivot homepage. It renders the three pillar cards.
    const pillarCards = page.getByTestId('reality-pillar-card');
    await expect(pillarCards).toHaveCount(3);
  });

  test('hero section adapts to screen size', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'large desktop' },
      { width: 1280, height: 720, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      const heroHeadline = page.locator('h1');
      await expect(heroHeadline).toBeVisible();

      // Primary CTA is "Enter Floor 13" on all viewports.
      const primaryCta = page.getByRole('link', { name: /Enter Floor 13/i }).first();
      await expect(primaryCta).toBeVisible();
    }
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await mobileMenuBtn.click();
    await page.waitForTimeout(300);

    // Mobile menu is an inset-0 fixed overlay; assert the new IA links exist.
    const mobileNav = page.locator('.lg\\:hidden.fixed').first();
    await expect(mobileNav.locator('a:has-text("Reality")')).toBeVisible();
    await expect(mobileNav.locator('a:has-text("About")').first()).toBeVisible();

    const closeBtn = page.locator('button[aria-label="Close menu"]');
    await closeBtn.click();
    await page.waitForTimeout(300);

    await expect(mobileMenuBtn).toBeVisible();
  });

  test('pillar cards are responsive', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Pillar grid renders at all viewports; on desktop it's 3 cards in a row.
    const cards = page.getByTestId('reality-pillar-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const firstCard = page.getByTestId('reality-pillar-card').first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toBeVisible();
  });

  test('footer adapts to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    // Post-pivot footer is a text wordmark (no <img>) + flat link list +
    // LinkedIn + © year.
    await expect(footer).toContainText('Atheryon');
    await expect(footer.locator('a[href*="linkedin"]')).toBeVisible();
  });

  // Regression for /qa 2026-05-14: the mobile menu overlay was a descendant
  // of <header className="... backdrop-blur-xl ...">, so backdrop-filter
  // created a containing block and the drawer's `fixed inset-0` resolved
  // to the header's ~72px height instead of the full viewport. Visually
  // the user saw only the logo + close X — all six nav links were clipped.
  // The existing 'mobile menu opens and closes' test passes even with the
  // bug because Playwright's toBeVisible() trusts bounding boxes set by
  // layout; this stronger test asserts the drawer covers the viewport.
  test('mobile menu drawer covers full viewport (not clipped to header)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    await page.getByRole('button', { name: 'Toggle menu' }).click();
    await page.waitForTimeout(150);

    const drawer = page.locator('div.lg\\:hidden.fixed.inset-0').first();
    const box = await drawer.boundingBox();
    expect(box).not.toBeNull();
    // Drawer must cover the full viewport, not just the 72px header strip.
    expect(box!.height).toBeGreaterThan(700);
  });
});
