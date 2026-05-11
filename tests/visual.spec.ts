import { test, expect } from '@playwright/test';

/**
 * Visual regression tests for the post-pivot site.
 *
 * The /reality hero has two infinite CSS animations (hero-glitch and
 * architecture-reveal). To keep snapshots deterministic we disable
 * animations and reduce motion via emulateMedia + a small style override
 * before taking the screenshot.
 *
 * The old FAQ-on-homepage screenshot was removed: the FAQ lives on
 * /programs/mib-insight now, not on /. The MiB Insight FAQ has its own
 * snapshot below.
 */

async function freezeAnimations(page: import('@playwright/test').Page) {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
}

test.describe('Visual Tests', () => {
  test('homepage screenshot', async ({ page }) => {
    await page.goto('/');
    await freezeAnimations(page);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage.png', {
      maxDiffPixelRatio: 0.15,
      fullPage: true,
    });
  });

  test('hero section screenshot', async ({ page }) => {
    await page.goto('/');
    await freezeAnimations(page);
    await page.waitForTimeout(500);

    const hero = page.locator('section').first();
    await expect(hero).toHaveScreenshot('hero-section.png', {
      maxDiffPixelRatio: 0.15,
    });
  });

  test('CTA button hover state', async ({ page }) => {
    await page.goto('/');
    await freezeAnimations(page);
    await page.waitForTimeout(500);

    // Post-pivot hero primary CTA is "Enter Floor 13".
    const ctaButton = page.getByRole('link', { name: /Enter Floor 13/i }).first();
    await ctaButton.hover();

    await expect(ctaButton).toHaveScreenshot('cta-button-hover.png', {
      maxDiffPixelRatio: 0.15,
    });
  });

  test('mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await freezeAnimations(page);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      maxDiffPixelRatio: 0.15,
      fullPage: true,
    });
  });

  test('footer screenshot', async ({ page }) => {
    await page.goto('/');
    await freezeAnimations(page);

    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    await expect(footer).toHaveScreenshot('footer.png', {
      maxDiffPixelRatio: 0.15,
    });
  });

  test('MiB Insight FAQ section screenshot', async ({ page }) => {
    // The homepage no longer has an FAQ; the FAQ accordion lives at
    // /programs/mib-insight as part of the product page.
    await page.goto('/programs/mib-insight');
    await freezeAnimations(page);
    await page.waitForTimeout(300);

    const faqTitle = page.locator('h2:has-text("Common questions")');
    await faqTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const faqSection = faqTitle.locator('..').locator('..');
    await expect(faqSection).toHaveScreenshot('mib-insight-faq.png', {
      maxDiffPixelRatio: 0.15,
    });
  });
});
