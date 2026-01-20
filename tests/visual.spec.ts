import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('homepage screenshot', async ({ page }) => {
    await page.goto('/');

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixelRatio: 0.15,
      fullPage: true,
    });
  });

  test('hero section screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixelRatio: 0.15,
    });
  });

  test('CTA button hover state', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    // Target hero section CTA (header CTA hidden on mobile)
    const ctaButton = page.locator('section a:has-text("Discuss a real delivery problem")').first();
    await ctaButton.hover();

    await expect(ctaButton).toHaveScreenshot('cta-button-hover.png', {
      maxDiffPixelRatio: 0.15,
    });
  });

  test('mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      maxDiffPixelRatio: 0.15,
      fullPage: true,
    });
  });

  test('footer screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixelRatio: 0.15,
    });
  });

  test('FAQ section screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1000);

    const faqTitle = page.locator('h2:has-text("Frequently asked questions")');
    await faqTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const faqSection = faqTitle.locator('..').locator('..');
    await expect(faqSection).toHaveScreenshot('faq-section.png', {
      maxDiffPixelRatio: 0.15,
    });
  });
});
