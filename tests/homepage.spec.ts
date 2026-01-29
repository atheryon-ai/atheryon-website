import { test, expect } from '@playwright/test';

test.describe('Atheryon Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Atheryon | Decision-grade data platforms for regulated markets');
  });

  test('displays navigation', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check logo
    const logo = nav.locator('img[alt="Atheryon"]');
    await expect(logo).toBeVisible();

    // Check brand name
    const brandName = nav.locator('text=Atheryon').first();
    await expect(brandName).toBeVisible();
  });

  test('displays hero section with correct content', async ({ page }) => {
    // Check headline contains key text
    const heroHeadline = page.locator('h1');
    await expect(heroHeadline).toBeVisible();
    await expect(heroHeadline).toContainText('data platforms');
    await expect(heroHeadline).toContainText('under pressure');

    // Check subheadline
    const heroSubheadline = page.locator('section').first().locator('p').first();
    await expect(heroSubheadline).toContainText('regulated delivery');
  });

  test('displays hero call-to-action buttons', async ({ page }) => {
    // Primary CTA
    const primaryCta = page.locator('section a:has-text("Request a confidential discussion")').first();
    await expect(primaryCta).toBeVisible();

    // Secondary CTA
    const secondaryCta = page.locator('section a:has-text("How we deliver")').first();
    await expect(secondaryCta).toBeVisible();
  });

  test('displays Who We Work With section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Built for high-stakes environments")');
    await expect(sectionTitle).toBeVisible();

    // Check "We work with" items
    await expect(page.locator('li:has-text("Tier-1 banks and investment banks")')).toBeVisible();
    await expect(page.locator('li:has-text("Capital markets and trading infrastructure")')).toBeVisible();
  });

  test('displays Problems We Solve section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("The problem we solve")');
    await expect(sectionTitle).toBeVisible();

    // Check problem cards
    await expect(page.locator('h3:has-text("Data cannot be trusted")')).toBeVisible();
    await expect(page.locator('h3:has-text("No single source of truth")')).toBeVisible();
    await expect(page.locator('h3:has-text("Regulatory exposure")')).toBeVisible();
    await expect(page.locator('h3:has-text("Stalled programs")')).toBeVisible();
  });

  test('displays What We Do comparison section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("What we deliver")');
    await expect(sectionTitle).toBeVisible();

    // Check comparison items
    await expect(page.locator('text=Traditional')).toBeVisible();
    await expect(page.locator('text=Atheryon')).toBeVisible();
  });

  test('displays How We Work section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("How we work")');
    await expect(sectionTitle).toBeVisible();

    // Check method steps are present
    await expect(page.locator('text=Strategy')).toBeVisible();
    await expect(page.locator('text=Architecture')).toBeVisible();
  });

  test('displays FAQ section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Frequently asked questions")');
    await expect(sectionTitle).toBeVisible();

    // Check FAQ items
    await expect(page.locator('text=What industries do you work with?')).toBeVisible();
    await expect(page.locator('text=What makes Atheryon different')).toBeVisible();
  });

  test('displays footer with CTA and links', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check footer CTA
    await expect(footer.locator('h2:has-text("Ready to discuss")')).toBeVisible();

    // Check footer brand
    await expect(footer.locator('img[alt="Atheryon"]')).toBeVisible();

    // Check footer links
    await expect(footer.locator('text=Services')).toBeVisible();
    await expect(footer.locator('text=Resources')).toBeVisible();
    await expect(footer.locator('text=Company')).toBeVisible();

    // Check contact email
    const emailLink = footer.locator('a[href="mailto:info@atheryon.com.au"]');
    await expect(emailLink).toBeVisible();
  });

  test('navigation links work correctly', async ({ page, isMobile }) => {
    if (isMobile) {
      const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
      await mobileMenuBtn.click();
      await page.waitForTimeout(300);
      await page.locator('a.text-lg:has-text("How We Work")').click();
    } else {
      await page.locator('nav a:has-text("How We Work")').click();
    }

    await expect(page).toHaveURL(/\/how-we-work/);
  });

  test('tech partners section is visible', async ({ page }) => {
    const partnersText = page.locator('text=Built on trusted platforms').first();
    await expect(partnersText).toBeVisible();
  });

  test('primary CTA navigates to contact page', async ({ page }) => {
    const primaryCta = page.locator('section a:has-text("Request a confidential discussion")').first();
    await primaryCta.click();

    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('h1')).toContainText("Let's talk");
  });

  test('secondary CTA navigates to how we work page', async ({ page }) => {
    const secondaryCta = page.locator('section a:has-text("How we deliver")').first();
    await secondaryCta.click();

    await expect(page).toHaveURL(/\/how-we-work/);
    await expect(page).toHaveTitle(/How We Work/);
  });
});
