import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Navigation should show links
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).toBeVisible();

    // Mobile menu button should be hidden
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).not.toBeVisible();

    // All sections should be visible
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('#who-we-help')).toBeVisible();
    await expect(page.locator('#problem')).toBeVisible();
    await expect(page.locator('#solution')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('mobile layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Navigation links should be hidden on mobile
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).not.toBeVisible();

    // Mobile menu button should be visible
    const mobileMenuBtn = page.locator('.mobile-menu-btn');
    await expect(mobileMenuBtn).toBeVisible();

    // Hero content should still be visible
    const heroContent = page.locator('.hero-content');
    await expect(heroContent).toBeVisible();

    // Service cards should stack vertically
    const serviceCards = page.locator('.service-card');
    await expect(serviceCards).toHaveCount(3);
  });

  test('tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Content should be visible
    await expect(page.locator('.hero')).toBeVisible();
    await expect(page.locator('#who-we-help')).toBeVisible();

    // Solutions grid should adapt
    const solutionCards = page.locator('.solution-card');
    await expect(solutionCards).toHaveCount(4);
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

      const hero = page.locator('.hero');
      await expect(hero).toBeVisible();

      const heroContent = page.locator('.hero-content');
      await expect(heroContent).toBeVisible();

      // Hero buttons should be visible on all sizes
      const heroButtons = page.locator('.hero-buttons .btn');
      await expect(heroButtons.first()).toBeVisible();
    }
  });

  test('service cards are responsive', async ({ page }) => {
    // Desktop - cards in a row
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    const serviceCards = page.locator('.service-card');
    await expect(serviceCards).toHaveCount(3);

    // All cards should be visible
    for (let i = 0; i < 3; i++) {
      await expect(serviceCards.nth(i)).toBeVisible();
    }

    // Mobile - cards stack
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Cards should still be visible but stacked
    for (let i = 0; i < 3; i++) {
      await serviceCards.nth(i).scrollIntoViewIfNeeded();
      await expect(serviceCards.nth(i)).toBeVisible();
    }
  });

  test('footer adapts to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.locator('footer').scrollIntoViewIfNeeded();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer brand should be visible
    const footerBrand = footer.locator('.footer-brand');
    await expect(footerBrand).toBeVisible();

    // Contact email should be visible
    const emailLink = footer.locator('a[href="mailto:info@atheryon.com.au"]');
    await expect(emailLink).toBeVisible();
  });
});
