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
    await expect(page.locator('h1')).toContainText("Let's talk");
  });

  test('hero secondary CTA "How we deliver" navigates to how-we-work', async ({ page }) => {
    const cta = page.locator('section a:has-text("How we deliver")').first();
    await cta.click();
    await expect(page).toHaveURL(/\/how-we-work/);
    await expect(page.locator('h1')).toContainText('How we work');
  });

  test('footer CTA "Request a confidential discussion" navigates to contact', async ({ page }) => {
    const cta = page.locator('footer a:has-text("Request a confidential discussion")');
    await cta.click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText("Let's talk");
  });

  test('"Learn more about our method" link navigates to how-we-work', async ({ page }) => {
    const link = page.locator('a:has-text("Learn more about our method")');
    if (await link.isVisible()) {
      await link.click();
      await expect(page).toHaveURL(/\/how-we-work/);
    }
  });

  test('"View reference architectures" link navigates to reference-architectures', async ({ page }) => {
    const link = page.locator('a:has-text("View reference architectures")');
    if (await link.isVisible()) {
      await link.click();
      await expect(page).toHaveURL(/\/reference-architectures/);
    }
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
    await expect(page.locator('h1')).toContainText("Let's talk");
  });

  test('nav "How We Work" link works', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('button[aria-label="Toggle menu"]').click();
      await page.waitForTimeout(300);
      await page.locator('a.text-lg:has-text("How We Work")').click();
    } else {
      await page.locator('nav a:has-text("How We Work")').click();
    }
    await expect(page).toHaveURL(/\/how-we-work/);
  });

  test('nav "Reference Architectures" link works', async ({ page, isMobile }) => {
    if (isMobile) {
      await page.locator('button[aria-label="Toggle menu"]').click();
      await page.waitForTimeout(300);
      await page.locator('a.text-lg:has-text("Reference Architectures")').click();
    } else {
      await page.locator('nav a:has-text("Reference Architectures")').click();
    }
    await expect(page).toHaveURL(/\/reference-architectures/);
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

test.describe('Services Dropdown (Desktop)', () => {
  test('services dropdown shows menu items', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
      return;
    }

    await page.goto('/');

    const servicesBtn = page.locator('nav button:has-text("Services")');
    await servicesBtn.hover();
    await page.waitForTimeout(300);

    const dropdown = page.locator('nav >> a:has-text("Recovery & Migration")');
    await expect(dropdown).toBeVisible();
  });

  test('services dropdown "Recovery & Migration" link works', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
      return;
    }

    await page.goto('/');
    await page.locator('nav button:has-text("Services")').hover();
    await page.waitForTimeout(300);
    await page.locator('nav >> a:has-text("Recovery & Migration")').click();
    await expect(page).toHaveURL(/\/recovery-migration/);
  });

  test('services dropdown "CDM Platform" link works', async ({ page, isMobile }) => {
    if (isMobile) {
      test.skip();
      return;
    }

    await page.goto('/');
    await page.locator('nav button:has-text("Services")').hover();
    await page.waitForTimeout(300);
    await page.locator('nav >> a:has-text("CDM Platform")').click();
    await expect(page).toHaveURL(/\/cdm-platform/);
  });
});

test.describe('Mobile Menu Services', () => {
  test('mobile services submenu expands and links work', async ({ page, isMobile }) => {
    if (!isMobile) {
      test.skip();
      return;
    }

    await page.goto('/');

    await page.locator('button[aria-label="Toggle menu"]').click();
    await page.waitForTimeout(500);

    const mobileOverlay = page.locator('.fixed.inset-0');
    const mobileServicesBtn = mobileOverlay.locator('button:has-text("Services")');
    await mobileServicesBtn.click();

    await page.waitForTimeout(500);

    const serviceLink = mobileOverlay.locator('a:has-text("Recovery & Migration")');
    await expect(serviceLink).toBeVisible({ timeout: 5000 });
    await serviceLink.click();
    await expect(page).toHaveURL(/\/recovery-migration/);
  });
});

test.describe('Footer Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer "How We Work" link works', async ({ page }) => {
    const link = page.locator('footer a:has-text("How We Work")');
    await link.click();
    await expect(page).toHaveURL(/\/how-we-work/);
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

  test('footer "Reference Architectures" link works', async ({ page }) => {
    const link = page.locator('footer a:has-text("Reference Architectures")');
    await link.click();
    await expect(page).toHaveURL(/\/reference-architectures/);
  });

  test('footer service links work', async ({ page }) => {
    const link = page.locator('footer a:has-text("Recovery & Migration")');
    await link.click();
    await expect(page).toHaveURL(/\/recovery-migration/);
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
  test('how-we-work page CTA navigates to contact', async ({ page }) => {
    await page.goto('/how-we-work');
    const cta = page.locator('a:has-text("Discuss")').first();
    if (await cta.isVisible()) {
      await cta.click();
      await expect(page).toHaveURL(/\/contact/);
    }
  });

  test('about page CTA navigates to contact', async ({ page }) => {
    await page.goto('/about');
    const cta = page.locator('a:has-text("Discuss")').first();
    if (await cta.isVisible()) {
      await cta.click();
      await expect(page).toHaveURL(/\/contact/);
    }
  });
});
