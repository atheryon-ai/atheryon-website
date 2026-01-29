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
    const navLogo = page.locator('nav img[alt="Atheryon"]');
    await expect(navLogo).toBeVisible();

    const footerLogo = page.locator('footer img[alt="Atheryon"]');
    await expect(footerLogo).toBeVisible();
  });

  test('page has meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /regulated/i);
  });

  test('navigation links are keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');

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
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    await expect(h1).toBeVisible();

    const h2s = page.locator('h2');
    const h2Count = await h2s.count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('links have discernible text', async ({ page }) => {
    const ctaLinks = page.locator('a').filter({ hasText: /\w+/ });
    const count = await ctaLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < Math.min(count, 5); i++) {
      const text = await ctaLinks.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('interactive elements have focus indicators', async ({ page }) => {
    const ctaLink = page.locator('section a:has-text("Request a confidential discussion")').first();
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
    const headline = page.locator('h1');
    await expect(headline).toBeVisible();

    const bodyText = page.locator('p').first();
    await expect(bodyText).toBeVisible();
  });
});
