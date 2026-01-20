import { test, expect } from '@playwright/test';

test.describe('Atheryon Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Atheryon | From AI Potential to Production Reality');
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
    await expect(heroHeadline).toContainText('AI potential');
    await expect(heroHeadline).toContainText('reality');

    // Check subheadline
    const heroSubheadline = page.locator('section').first().locator('p').first();
    await expect(heroSubheadline).toContainText('regulated enterprises');
  });

  test('displays hero call-to-action buttons', async ({ page }) => {
    // Primary CTA (target hero section, header CTA hidden on mobile)
    const primaryCta = page.locator('section a:has-text("Discuss a real delivery problem")').first();
    await expect(primaryCta).toBeVisible();

    // Secondary CTA
    const secondaryCta = page.locator('section a:has-text("See how we work")').first();
    await expect(secondaryCta).toBeVisible();
  });

  test('displays Who We Work With section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Built for regulated enterprises")');
    await expect(sectionTitle).toBeVisible();

    // Check "We work with" items
    await expect(page.locator('li:has-text("Banks and investment banks")')).toBeVisible();
    await expect(page.locator('li:has-text("Asset managers")')).toBeVisible();

    // Check "Not a fit for" items
    await expect(page.locator('li:has-text("Startups wanting demos")')).toBeVisible();
  });

  test('displays Problems We Solve section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("The challenges we address")');
    await expect(sectionTitle).toBeVisible();

    // Check problem cards
    await expect(page.locator('h3:has-text("AI POC purgatory")')).toBeVisible();
    await expect(page.locator('h3:has-text("Untrusted platforms")')).toBeVisible();
    await expect(page.locator('h3:has-text("Expensive change")')).toBeVisible();
    await expect(page.locator('h3:has-text("Migration meaning loss")')).toBeVisible();
  });

  test('displays What We Do comparison section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("Two things, done well")');
    await expect(sectionTitle).toBeVisible();

    // Check comparison items
    await expect(page.locator('text=Traditional Approach')).toBeVisible();
    await expect(page.locator('text=Atheryon Approach')).toBeVisible();
  });

  test('displays How We Work section', async ({ page }) => {
    const sectionTitle = page.locator('h2:has-text("How we work")');
    await expect(sectionTitle).toBeVisible();

    // Check method steps are present
    await expect(page.locator('text=Frame problem')).toBeVisible();
    await expect(page.locator('text=Model alignment')).toBeVisible();
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
    await expect(footer.locator('h2:has-text("Ready to turn potential")')).toBeVisible();

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
    // On mobile, need to open the mobile menu first
    if (isMobile) {
      const mobileMenuBtn = page.locator('button[aria-label="Toggle menu"]');
      await mobileMenuBtn.click();
      await page.waitForTimeout(300); // Wait for menu animation

      // Click on How We Work link in mobile menu (text-lg class distinguishes from desktop text-sm)
      await page.locator('a.text-lg:has-text("How We Work")').click();
    } else {
      // Click on How We Work link in desktop nav
      await page.locator('nav a:has-text("How We Work")').click();
    }

    await expect(page).toHaveURL(/\/how-we-work/);
  });

  test('tech partners section is visible', async ({ page }) => {
    // Check for tech partner logos area
    const partnersText = page.locator('text=Built on trusted platforms');
    await expect(partnersText).toBeVisible();
  });
});
