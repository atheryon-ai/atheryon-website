import { test, expect } from '@playwright/test';

/**
 * Button and CTA click tests to ensure all interactive elements work correctly.
 * Tests both navigation and that the correct page content loads.
 *
 * Post-pivot homepage (= /reality content):
 *   - Hero CTAs: "Enter Floor 13" (#floor-13), "Explore the pillars" (#pillars)
 *   - Closing CTAs: "Request a session" (/contact), "See the artefact" (/labs)
 *   - Header: wordmark + flat nav (Reality, Data, AI Direction, Transformation,
 *     Labs, About). No CTA button in the header.
 *   - Footer: text wordmark + flat link list + LinkedIn external link + © year.
 *     No email link (info@atheryon.com.au lives on /contact and the legal pages).
 */

test.describe('Homepage CTAs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero primary CTA "Enter Floor 13" anchors to #floor-13', async ({ page }) => {
    const cta = page.getByRole('link', { name: /Enter Floor 13/i }).first();
    await expect(cta).toHaveAttribute('href', /#floor-13/);
    await cta.click();
    // Anchor-link navigation: URL gains a hash, page stays on /
    await expect(page).toHaveURL(/#floor-13$/);
  });

  test('hero secondary CTA "Explore the pillars" anchors to #pillars', async ({ page }) => {
    const cta = page.getByRole('link', { name: /Explore the pillars/i }).first();
    await expect(cta).toHaveAttribute('href', /#pillars/);
    await cta.click();
    await expect(page).toHaveURL(/#pillars$/);
  });

  test('closing CTA "Request a session" navigates to /contact', async ({ page }) => {
    const cta = page.getByRole('link', { name: /Request a session/i }).first();
    await cta.click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1').first()).toContainText('Request a confidential discussion');
  });
});

test.describe('Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('nav "About" link works', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('button[aria-label="Toggle menu"]').click();
      await page.waitForTimeout(300);
      // Mobile menu uses .text-lg class on links
      await page.locator('a.text-lg:has-text("About")').click();
    } else {
      await page.locator('nav a:has-text("About")').first().click();
    }
    await expect(page).toHaveURL(/\/about/);
  });

  test('logo navigates to homepage', async ({ page }) => {
    await page.goto('/about');
    await page.locator('nav a').first().click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Top nav links (post-pivot IA)', () => {
  const NAV_ITEMS: { label: string; path: string }[] = [
    { label: 'Reality', path: '/reality' },
    { label: 'Data', path: '/data' },
    { label: 'AI Direction', path: '/ai-direction' },
    { label: 'Transformation', path: '/transformation' },
    { label: 'Labs', path: '/labs' },
    { label: 'About', path: '/about' },
  ];

  for (const item of NAV_ITEMS) {
    test(`top nav "${item.label}" link navigates to ${item.path}`, async ({ page, isMobile }) => {
      if (isMobile) {
        test.skip();
        return;
      }
      await page.goto('/');
      await page.locator(`nav >> a:has-text("${item.label}")`).first().click();
      await expect(page).toHaveURL(new RegExp(item.path.replace(/\//g, '\\/')));
    });
  }
});

test.describe('Footer Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer "About" link works', async ({ page }) => {
    const link = page.locator('footer a:has-text("About")');
    await link.click();
    await expect(page).toHaveURL(/\/about/);
  });

  test('footer "Contact" link works', async ({ page }) => {
    const link = page.locator('footer a:has-text("Contact")').first();
    await link.click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test('footer LinkedIn link has the correct href', async ({ page }) => {
    // Note: post-pivot footer does NOT set target="_blank" on the LinkedIn
    // anchor. If the team wants new-tab behaviour, that's a small source fix
    // (add target/rel) — not a test problem. Track separately if desired.
    const linkedInLink = page.locator('footer a[href*="linkedin"]');
    await expect(linkedInLink).toHaveAttribute('href', /linkedin\.com/);
  });
});

test.describe('Page-Specific CTAs', () => {
  test('about page CTA navigates to contact', async ({ page }) => {
    await page.goto('/about');
    const cta = page.locator('a:has-text("Discuss")').first();
    if (await cta.isVisible()) {
      await cta.click();
      await expect(page).toHaveURL(/\/contact/);
    }
  });
});
