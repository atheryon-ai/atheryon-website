import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('homepage screenshot', async ({ page }) => {
    await page.goto('/');

    // Wait for animations to settle
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });

  test('hero section screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    const hero = page.locator('.hero');
    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('CTA button hover state', async ({ page }) => {
    await page.goto('/');

    const ctaButton = page.locator('.hero-buttons .btn-primary');
    await ctaButton.hover();

    await expect(ctaButton).toHaveScreenshot('cta-button-hover.png', {
      maxDiffPixelRatio: 0.1,
    });
  });

  test('mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Wait for animations to settle
    await page.waitForTimeout(1500);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      maxDiffPixelRatio: 0.1,
      fullPage: true,
    });
  });
});
