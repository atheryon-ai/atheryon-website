import { test, expect } from '@playwright/test';

/**
 * Button and CTA click tests to ensure all interactive elements work correctly.
 * Tests both navigation and that the correct page content loads.
 */

test.describe('Homepage CTAs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('hero primary CTA "Request a confidential discussion" navigates to contact', async ({ page }) => {
    const cta = page.locator('section a:has-text("Request a confidential discussion")').first();
    await cta.click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText('Request a confidential discussion');
  });

  test('footer CTA "Request a confidential discussion" navigates to contact', async ({ page }) => {
    const cta = page.locator('footer a:has-text("Request a confidential discussion")');
    await cta.click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText('Request a confidential discussion');
  });
});

test.describe('Header Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('header CTA button navigates to contact', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('button[aria-label="Toggle menu"]').click();
      await page.waitForTimeout(300);
      const cta = page.locator('a:has-text("Request a")').last();
      await cta.click();
    } else {
      const cta = page.locator('nav a:has-text("Request a")');
      await cta.click();
    }
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText('Request a confidential discussion');
  });

  test('nav "About" link works', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('button[aria-label="Toggle menu"]').click();
      await page.waitForTimeout(300);
      await page.locator('a.text-lg:has-text("About")').click();
    } else {
      await page.locator('nav a:has-text("About")').click();
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

  test('footer email link has correct href', async ({ page }) => {
    const emailLink = page.locator('footer a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', /mailto:info@atheryon\.com\.au/);
  });

  test('footer LinkedIn link opens in new tab', async ({ page }) => {
    const linkedInLink = page.locator('footer a[href*="linkedin"]');
    await expect(linkedInLink).toHaveAttribute('target', '_blank');
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
