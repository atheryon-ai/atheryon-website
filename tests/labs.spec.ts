import { test, expect } from '@playwright/test';

test.describe('/labs page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/labs');
  });

  test('three hero CTAs are present', async ({ page }) => {
    await expect(page.getByRole('link', { name: /See it live/i }).first()).toHaveAttribute('href', 'https://labs.atheryon.ai');
    await expect(page.getByRole('link', { name: /Download the pack/i }).first()).toHaveAttribute('href', '/labs/atheryon-pitch-pack.pdf');
    await expect(page.getByRole('link', { name: /Request a confidential discussion/i }).first()).toHaveAttribute('href', '/contact');
  });

  test('Anthropic/Claude appears exactly once', async ({ page }) => {
    const text = await page.locator('main, body').first().innerText();
    const claudeCount = (text.match(/Claude/g) || []).length;
    const anthropicCount = (text.match(/Anthropic/g) || []).length;
    expect(claudeCount).toBe(1);
    expect(anthropicCount).toBe(1);
  });

  test('eight bank-map boxes render', async ({ page }) => {
    const map = page.getByTestId('labs-bank-map');
    await expect(map).toBeVisible();
    await expect(map.locator('[data-testid="bank-map-box"]')).toHaveCount(8);
  });

  test('three flagship deep-dives render', async ({ page }) => {
    await expect(page.getByTestId('labs-flagship')).toHaveCount(3);
  });

  test('two banker-wedge vignettes render', async ({ page }) => {
    await expect(page.getByTestId('labs-vignette')).toHaveCount(2);
  });

  test('three engagement cards render with single CTA each', async ({ page }) => {
    const cards = page.getByTestId('labs-engagement-card');
    await expect(cards).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(cards.nth(i).getByRole('link')).toHaveCount(1);
    }
  });

  test('PDF download responds', async ({ request }) => {
    const r = await request.head('/labs/atheryon-pitch-pack.pdf');
    expect(r.status()).toBe(200);
  });

  test('no TERRY_PROMPT_EXAMPLE placeholder leaks into rendered page', async ({ page }) => {
    const body = await page.locator('body').innerText();
    expect(body).not.toMatch(/TERRY_PROMPT_EXAMPLE/);
    expect(body).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });

  test('engagement cards have anchor IDs', async ({ page }) => {
    await expect(page.locator('#code')).toBeVisible()
    await expect(page.locator('#prompts')).toBeVisible()
    await expect(page.locator('#advisory')).toBeVisible()
  });
});
