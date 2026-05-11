import { test, expect } from '@playwright/test';

/**
 * Route testing to ensure all pages load correctly.
 * This catches Azure SWA routing misconfigurations where URL changes
 * but page content doesn't load (falls back to index.html).
 *
 * Routes covered match the current IA (post-/reality pivot). The 8 legacy
 * URLs (/how-we-work, /cdm-platform, etc.) now 301-redirect — those
 * behaviours are tested in tests/redirects.spec.ts, not here.
 */

const routes = [
  { path: '/', title: /Atheryon/, h1: /Reality is built on data/i },
  { path: '/reality', title: /Architects of Your Reality/, h1: /Reality is built on data/i },
  { path: '/data', title: /Data/, h1: /Data/i },
  { path: '/ai-direction', title: /AI Direction/, h1: /AI Direction/i },
  { path: '/transformation', title: /Transformation/, h1: /Transformation/i },
  { path: '/labs', title: /Labs/, h1: /Atheryon Labs/i },
  { path: '/labs/themes', title: /Themes — Atheryon Labs/, h1: /Explore the labs surface/i },
  { path: '/about', title: /About/, h1: /Built by practitioners/i },
  { path: '/contact', title: /Contact/, h1: /Request a confidential discussion/i },
  { path: '/programs', title: /Programs/, h1: /Industry IP for AI agents/i },
  { path: '/programs/mib-insight', title: /MiB Insight Program/, h1: /Industry IP ready for AI agents/i },
];

test.describe('Route Loading', () => {
  for (const route of routes) {
    test(`${route.path} loads correctly`, async ({ page }) => {
      await page.goto(route.path);

      await expect(page).toHaveTitle(route.title);

      const h1 = page.locator('h1').first();
      // /labs/themes renders its h1 as .sr-only (visually hidden for a11y);
      // the on-screen "Explore the labs surface" heading is rendered by
      // <Section title=…> as an <h2>. Validate the h1 text but skip the
      // visibility check for that route.
      if (route.path === '/labs/themes') {
        await expect(h1).toHaveText(route.h1);
      } else {
        await expect(h1).toBeVisible();
        await expect(h1).toHaveText(route.h1);
      }
    });
  }
});

test.describe('Direct URL Access', () => {
  test('contact page loads on direct access', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.locator('h1').first()).toContainText('Request a confidential discussion');
  });

  test('about page loads on direct access', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveTitle(/About/);
  });

  test('reality (homepage equivalent) loads on direct access', async ({ page }) => {
    await page.goto('/reality');
    await expect(page).toHaveTitle(/Architects of Your Reality/);
    await expect(page.locator('h1').first()).toContainText('Reality is built on data');
  });
});

test.describe('Navigation Between Pages', () => {
  test('can navigate from homepage to contact and back', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Atheryon/);

    // The /reality closing section has a "Request a session" link to /contact
    await page.getByRole('link', { name: /Request a session/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1').first()).toContainText('Request a confidential discussion');

    // Navigate back via header logo link
    await page.locator('header a').first().click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1').first()).toContainText('Reality is built on data');
  });
});
