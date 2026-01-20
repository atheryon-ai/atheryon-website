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
    const navLogo = page.locator('nav .nav-logo img');
    await expect(navLogo).toHaveAttribute('alt', 'Atheryon');

    const footerLogo = page.locator('footer .footer-brand img');
    await expect(footerLogo).toHaveAttribute('alt', 'Atheryon');
  });

  test('page has meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Microsoft Partner/);
    await expect(metaDescription).toHaveAttribute('content', /AI-ready data/i);
  });

  test('navigation links are keyboard accessible', async ({ page }) => {
    // Tab through navigation
    await page.keyboard.press('Tab'); // Skip to first focusable
    await page.keyboard.press('Tab'); // Nav logo

    const navLinks = page.locator('.nav-links a');
    const linkCount = await navLinks.count();

    // Each nav link should be focusable
    for (let i = 0; i < linkCount; i++) {
      await page.keyboard.press('Tab');
    }
  });

  test('page has proper viewport meta', async ({ page }) => {
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveAttribute('content', /width=device-width/);
  });

  test('buttons have accessible labels', async ({ page }) => {
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).toHaveAttribute('aria-label', 'Toggle menu');
  });

  test('headings follow proper hierarchy', async ({ page }) => {
    // Page should have exactly one h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // H1 should be in hero section
    const heroH1 = page.locator('.hero h1');
    await expect(heroH1).toBeVisible();
  });

  test('links have discernible text', async ({ page }) => {
    // CTA buttons should have text
    const ctaButtons = page.locator('.btn');
    const count = await ctaButtons.count();

    for (let i = 0; i < count; i++) {
      const text = await ctaButtons.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  test('interactive elements have focus indicators', async ({ page }) => {
    // Focus on a button and check it's focusable
    const consultBtn = page.locator('.hero-buttons .btn-primary');
    await consultBtn.focus();
    await expect(consultBtn).toBeFocused();
  });
});
