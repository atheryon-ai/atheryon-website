import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    const navPill = page.locator('nav .rounded-full').first();
    await expect(navPill).toBeVisible();

    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await expect(mobileMenuBtn).not.toBeVisible();

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

    const ctaButtons = page.locator('section a:has-text("Request a confidential discussion")').first();
    await expect(ctaButtons).toBeVisible();
  });

  test('tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    await expect(page.locator('h3:has-text("Data cannot be trusted")')).toBeVisible();
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

      const primaryCta = page.locator('section a:has-text("Request a confidential discussion")').first();
      await expect(primaryCta).toBeVisible();
    }
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await mobileMenuBtn.click();

    await page.waitForTimeout(300);

    const mobileNav = page.locator('.lg\\:hidden.fixed');
    await expect(mobileNav.locator('a:has-text("How We Work")')).toBeVisible();
    await expect(mobileNav.locator('a:has-text("About")')).toBeVisible();

    const closeBtn = page.locator('button[aria-label="Close menu"]');
    await closeBtn.click();

    await page.waitForTimeout(300);

    await expect(mobileMenuBtn).toBeVisible();
  });

  test('cards are responsive', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    await expect(page.locator('h3:has-text("Data cannot be trusted")')).toBeVisible();
    await expect(page.locator('h3:has-text("No single source of truth")')).toBeVisible();
    await expect(page.locator('h3:has-text("Regulatory exposure")')).toBeVisible();
    await expect(page.locator('h3:has-text("Stalled programs")')).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const firstCard = page.locator('h3:has-text("Data cannot be trusted")');
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toBeVisible();
  });

  test('footer adapts to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.locator('footer').scrollIntoViewIfNeeded();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    await expect(footer.locator('img[alt="Atheryon"]')).toBeVisible();

    const emailLink = footer.locator('a[href="mailto:info@atheryon.com.au"]');
    await expect(emailLink).toBeVisible();
  });

  test('FAQ accordion works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const faqSection = page.locator('h2:has-text("Frequently asked questions")');
    await faqSection.scrollIntoViewIfNeeded();

    await expect(page.locator('text=What industries do you work with?')).toBeVisible();
  });
});
