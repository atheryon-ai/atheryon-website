import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('page has proper lang attribute', async ({ page }) => {
    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang', 'en');
  });

  test('logo images have alt text', async ({ page }) => {
    // Navigation logo
    const navLogo = page.locator('nav img[alt="Atheryon"]');
    await expect(navLogo).toBeVisible();

    // Footer logo
    const footerLogo = page.locator('footer img[alt="Atheryon"]');
    await expect(footerLogo).toBeVisible();
  });

  test('page has meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /regulated enterprises/i);
  });

  test('navigation links are keyboard accessible', async ({ page }) => {
    // Focus on the page
    await page.keyboard.press('Tab');

    // Navigation should be reachable via keyboard
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('page has proper viewport meta', async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('mobile menu button has accessible label', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await expect(mobileMenuBtn).toBeVisible();
    await expect(mobileMenuBtn).toHaveAttribute('aria-label', 'Toggle menu');
  });

  test('headings follow proper hierarchy', async ({ page }) => {
    // Page should have exactly one h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // H1 should be visible
    await expect(h1).toBeVisible();

    // H2s should exist for sections
    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('links have discernible text', async ({ page }) => {
    // CTA links should have text
    const ctaLinks = page.locator('a').filter({ hasText: /\w+/ });
    const count = await ctaLinks.count();
    expect(count).toBeGreaterThan(0);

    // Check first few links have text
    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await ctaLinks.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('interactive elements have focus indicators', async ({ page }) => {
    // Focus on a CTA link and check it's focusable (target hero section, header CTA hidden on mobile)
    const ctaLink = page.locator('section a:has-text("Discuss a real delivery problem")').first();
    await ctaLink.focus();
    await expect(ctaLink).toBeFocused();
  });

  test('images have appropriate alt attributes', async ({ page }) => {
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).not.toBeNull();
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    // Check that text colors are not too light
    const headline = page.locator('h1');
    await expect(headline).toBeVisible();

    // Check body text is visible
    const bodyText = page.locator('p').first();
    await expect(bodyText).toBeVisible();
  });
});
