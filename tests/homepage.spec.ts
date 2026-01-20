import { test, expect } from '@playwright/test';

test.describe('Atheryon Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Atheryon | AI-Driven Data for Leading Financial Institutions');
  });

  test('displays navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    const logo = nav.locator('.nav-logo img');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('alt', 'Atheryon');
  });

  test('displays hero section with correct content', async ({ page }) => {
    const heroBadge = page.locator('.hero-badge');
    await expect(heroBadge).toBeVisible();
    await expect(heroBadge).toContainText('Atheryon - A Direct2Client Company');

    const heroTitle = page.locator('.hero h1');
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText('Using AI To Make Your Data AI-Ready');

    const heroDescription = page.locator('.hero-description');
    await expect(heroDescription).toBeVisible();
    await expect(heroDescription).toContainText('Microsoft Partner');
    await expect(heroDescription).toContainText('TeraHelix');
  });

  test('displays hero call-to-action button', async ({ page }) => {
    const approachBtn = page.locator('.hero-buttons .btn-primary');
    await expect(approachBtn).toBeVisible();
    await expect(approachBtn).toHaveText('Our Approach');
  });

  test('displays Who We Help section', async ({ page }) => {
    const section = page.locator('#who-we-help');
    await expect(section).toBeVisible();

    const sectionTitle = section.locator('.section-title');
    await expect(sectionTitle).toHaveText('Who We Help');

    // Check service cards
    const serviceCards = section.locator('.service-card');
    await expect(serviceCards).toHaveCount(3);

    // Financial Markets
    await expect(serviceCards.nth(0).locator('h3')).toHaveText('Financial Markets');

    // Treasury
    await expect(serviceCards.nth(1).locator('h3')).toHaveText('Treasury');

    // Risk & Compliance
    await expect(serviceCards.nth(2).locator('h3')).toHaveText('Risk & Compliance');
  });

  test('displays Problem section', async ({ page }) => {
    const section = page.locator('#problem');
    await expect(section).toBeVisible();

    const sectionTitle = section.locator('.section-title');
    await expect(sectionTitle).toContainText('The World Is Moving Fast');

    const problemCard = section.locator('.problem-card');
    await expect(problemCard).toBeVisible();
    await expect(problemCard.locator('h3')).toContainText('AI Is An Accelerant');
  });

  test('displays Solution section with all services', async ({ page }) => {
    const section = page.locator('#solution');
    await expect(section).toBeVisible();

    const sectionTitle = section.locator('.section-title');
    await expect(sectionTitle).toContainText('Data Foundations For Every Critical Outcome');

    // Check solution cards
    const solutionCards = section.locator('.solution-card');
    await expect(solutionCards).toHaveCount(4);

    // Data Migration
    await expect(solutionCards.nth(0).locator('h3')).toHaveText('Data Migration');
    await expect(solutionCards.nth(0).locator('.tagline')).toContainText('Migrate faster');

    // Data Platform Delivery
    await expect(solutionCards.nth(1).locator('h3')).toHaveText('Data Platform Delivery');

    // Capital Markets Expertise
    await expect(solutionCards.nth(2).locator('h3')).toHaveText('Capital Markets Expertise');

    // Trade Surveillance
    await expect(solutionCards.nth(3).locator('h3')).toContainText('Trade Surveillance');
  });

  test('displays CTA section', async ({ page }) => {
    const ctaSection = page.locator('.cta-section');
    await expect(ctaSection).toBeVisible();

    const ctaCard = ctaSection.locator('.cta-card');
    await expect(ctaCard.locator('h2')).toContainText('Ready to Transform Your Data');

    const ctaButton = ctaCard.locator('.btn-primary');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveText('Get In Touch');
  });

  test('displays footer with links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer brand
    const footerBrand = footer.locator('.footer-brand');
    await expect(footerBrand.locator('img')).toBeVisible();
    await expect(footerBrand.locator('p')).toContainText('Microsoft Partner');

    // Check contact email
    const emailLink = footer.locator('a[href="mailto:info@atheryon.com.au"]');
    await expect(emailLink).toBeVisible();
  });

  test('navigation links scroll to sections', async ({ page }) => {
    // Click on Who We Help link
    await page.locator('.nav-links a[href="#who-we-help"]').click();
    await page.waitForTimeout(500);

    const whoWeHelpSection = page.locator('#who-we-help');
    await expect(whoWeHelpSection).toBeInViewport();
  });

  test('animated orbs are present', async ({ page }) => {
    const orb1 = page.locator('.orb-1');
    const orb2 = page.locator('.orb-2');
    const orb3 = page.locator('.orb-3');

    await expect(orb1).toBeAttached();
    await expect(orb2).toBeAttached();
    await expect(orb3).toBeAttached();
  });
});
