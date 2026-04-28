import { test, expect } from '@playwright/test';

test.describe('Programs index page', () => {
  test('renders title, hero, and Insight Program card', async ({ page }) => {
    await page.goto('/programs');
    await expect(page).toHaveTitle(/Programs/);
    await expect(page.locator('h1').first()).toContainText('Industry IP for AI agents');
    await expect(page.getByText('MiB Insight Program').first()).toBeVisible();
    await expect(page.getByText('$14,000').first()).toBeVisible();
  });

  test('Insight Program card links to product page', async ({ page }) => {
    await page.goto('/programs');
    const link = page.getByRole('link', { name: /Learn more/i }).first();
    await expect(link).toHaveAttribute('href', '/programs/mib-insight');
  });
});

test.describe('MiB Insight product page', () => {
  test('renders hero, price, and Get access CTA', async ({ page }) => {
    await page.goto('/programs/mib-insight');
    await expect(page).toHaveTitle(/MiB Insight Program/);
    await expect(page.locator('h1').first()).toContainText('Industry IP ready for AI agents');
    await expect(page.getByText('$14,000').first()).toBeVisible();
    const cta = page.getByRole('link', { name: /Get access/i }).first();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', /^https:\/\/buy\.stripe\.com\//);
  });
});

test.describe('MiB Insight thanks page', () => {
  test('renders welcome message', async ({ page }) => {
    await page.goto('/programs/mib-insight/thanks');
    await expect(page.locator('h1').first()).toContainText('Welcome to the MiB Insight Program');
  });
});
