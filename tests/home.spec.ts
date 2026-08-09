import { test, expect } from '@playwright/test'

test('homepage leads with evidence and the commercial practice hierarchy', async ({ page }) => {
  await page.goto('/')

  // Top nav lockup is visible
  await expect(page.getByText('ATHERYON', { exact: true })).toBeVisible()
  await expect(page.getByText('CAPITAL MARKETS.', { exact: false }).first()).toBeVisible()

  await expect(page.getByRole('heading', {
    level: 1,
    name: 'ATHERYON CAPITAL MARKETS | M&A',
  })).toBeVisible()
  await expect(page.getByText('compressing multi-year institutional delivery cycles into weeks')).toBeVisible()

  // Anonymised proof is visible before the ordered service hierarchy.
  await expect(page.getByRole('heading', { name: 'Selected work' })).toBeVisible()
  await expect(page.getByRole('heading', {
    name: 'Tier-1 Australian Banking Divestment & TSA Exit',
  })).toBeVisible()
  await expect(page.getByText('reducing traditional analyst dependency mapping timelines from 6 months to 4 weeks')).toBeVisible()
  await expect(page.getByText('compressing system delivery cycles by 60%')).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Services & practice hierarchy' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'M&A Separation & Integration Advisory' })).toHaveAttribute('href', '/ma')
  await expect(page.getByRole('link', { name: 'Capital Markets System Engineering' })).toHaveAttribute('href', '/system')
  await expect(page.getByRole('link', { name: 'Proprietary Technology & IP Licensing' })).toHaveAttribute('href', '/offers')

  // Background should be deep navy (sanity check, computed style on body)
  const bg = await page.evaluate(() =>
    getComputedStyle(document.body).backgroundColor,
  )
  expect(bg).toMatch(/rgb\((6|7|8), (10|11|12), (28|29|30)\)/)
})

test('about page renders full principal biographies', async ({ page }) => {
  await page.goto('/about')

  await expect(page.getByRole('heading', {
    level: 2,
    name: 'Terry Tsakiris — Founder & Systems Principal',
  })).toBeVisible()
  await expect(page.getByText('over two decades engineering core data infrastructure')).toBeVisible()
  await expect(page.getByText('S&P TeraHelix', { exact: false })).toBeVisible()

  await expect(page.getByRole('heading', {
    level: 2,
    name: 'Anna Contos — Head of M&A Separation & Integration Advisory',
  })).toBeVisible()
  await expect(page.getByText('Head of Separation & Integration Advisory at Westpac')).toBeVisible()
  await expect(page.getByText('Head of Divestment Execution at Commonwealth Bank')).toBeVisible()
})
