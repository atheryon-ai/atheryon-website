import { test, expect } from '@playwright/test';

/**
 * Route testing to ensure all pages load correctly.
 * This catches Azure SWA routing misconfigurations where URL changes
 * but page content doesn't load (falls back to index.html).
 */

const routes = [
  { path: '/', title: /Atheryon/, h1: /Decision-grade data platforms/i },
  { path: '/contact', title: /Contact/, h1: /Let's talk/i },
  { path: '/how-we-work', title: /How We Work/, h1: /How we work/i },
  { path: '/about', title: /About/, h1: /About/i },
  { path: '/reference-architectures', title: /Reference/, h1: /Reference/i },
  { path: '/ai-ready-data', title: /AI-Ready Data/, h1: /AI-Ready Data/i },
  { path: '/recovery-migration', title: /Recovery/, h1: /Recovery/i },
  { path: '/capability-enablement', title: /Capability/, h1: /Capability/i },
  { path: '/cdm-platform', title: /CDM/, h1: /Transform Your Derivatives/i },
  { path: '/m-and-a-execution', title: /M&A/, h1: /M&A/i },
];

test.describe('Route Loading', () => {
  for (const route of routes) {
    test(`${route.path} loads correctly`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);

      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      await expect(h1).toHaveText(route.h1);
    });
  }
});

test.describe('Direct URL Access', () => {
  test('contact page loads on direct access', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.locator('h1')).toContainText("Let's talk");
  });

  test('how-we-work page loads on direct access', async ({ page }) => {
    await page.goto('/how-we-work');
    await expect(page).toHaveTitle(/How We Work/);
  });

  test('about page loads on direct access', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/);
  });
});

test.describe('Navigation Between Pages', () => {
  test('can navigate from homepage to contact and back', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Atheryon/);

    // Navigate to contact via hero CTA
    await page.locator('section a:has-text("Request a confidential discussion")').first().click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText("Let's talk");

    // Navigate back to homepage via logo
    await page.locator('nav a').first().click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('data platforms');
  });
});
