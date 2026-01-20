import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('desktop layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Navigation pill container should be visible on desktop
    const navPill = page.locator('nav .rounded-full').first();
    await expect(navPill).toBeVisible();

    // Mobile menu button should be hidden on desktop (lg:hidden)
    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await expect(mobileMenuBtn).not.toBeVisible();

    // Hero section should be visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Footer should be visible
    await expect(page.locator('footer')).toBeVisible();
  });

  test('mobile layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu button should be visible
    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await expect(mobileMenuBtn).toBeVisible();

    // Hero headline should still be visible
    const heroHeadline = page.locator('h1');
    await expect(heroHeadline).toBeVisible();

    // CTA buttons should be visible in hero section (header CTA is hidden on mobile)
    const ctaButtons = page.locator('section a:has-text("Discuss a real delivery problem")').first();
    await expect(ctaButtons).toBeVisible();
  });

  test('tablet layout displays correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Content should be visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Problem cards should be visible
    await expect(page.locator('h3:has-text("AI POC purgatory")')).toBeVisible();
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

      // Hero headline should always be visible
      const heroHeadline = page.locator('h1');
      await expect(heroHeadline).toBeVisible();

      // CTA buttons should be visible on all sizes (target hero section, header CTA hidden on mobile)
      const primaryCta = page.locator('section a:has-text("Discuss a real delivery problem")').first();
      await expect(primaryCta).toBeVisible();
    }
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Click mobile menu button
    const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
    await mobileMenuBtn.click();

    // Wait for menu animation
    await page.waitForTimeout(300);

    // Mobile menu should be visible with navigation links in the overlay
    const mobileNav = page.locator('.lg\\:hidden.fixed');
    await expect(mobileNav.locator('a:has-text("How We Work")')).toBeVisible();
    await expect(mobileNav.locator('a:has-text("About")')).toBeVisible();

    // Close menu button should be visible
    const closeBtn = page.locator('button[aria-label="Close menu"]');
    await closeBtn.click();

    // Wait for menu to close
    await page.waitForTimeout(300);

    // Mobile menu button should be visible again
    await expect(mobileMenuBtn).toBeVisible();
  });

  test('cards are responsive', async ({ page }) => {
    // Desktop - cards in a row
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Problem cards should all be visible
    await expect(page.locator('h3:has-text("AI POC purgatory")')).toBeVisible();
    await expect(page.locator('h3:has-text("Untrusted platforms")')).toBeVisible();
    await expect(page.locator('h3:has-text("Expensive change")')).toBeVisible();
    await expect(page.locator('h3:has-text("Migration meaning loss")')).toBeVisible();

    // Mobile - cards stack
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Cards should still be visible but may need scrolling
    const firstCard = page.locator('h3:has-text("AI POC purgatory")');
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toBeVisible();
  });

  test('footer adapts to mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await page.locator('footer').scrollIntoViewIfNeeded();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer logo should be visible
    await expect(footer.locator('img[alt="Atheryon"]')).toBeVisible();

    // Contact email should be visible
    const emailLink = footer.locator('a[href="mailto:info@atheryon.com.au"]');
    await expect(emailLink).toBeVisible();
  });

  test('FAQ accordion works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Scroll to FAQ section
    const faqSection = page.locator('h2:has-text("Frequently asked questions")');
    await faqSection.scrollIntoViewIfNeeded();

    // FAQ questions should be visible
    await expect(page.locator('text=What industries do you work with?')).toBeVisible();
  });
});
