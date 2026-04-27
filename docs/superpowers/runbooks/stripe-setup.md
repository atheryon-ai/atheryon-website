# Stripe Setup Runbook — MiB Insight Program

**One-time setup performed by Terry in the Stripe Dashboard.** Estimated time: 30–45 min.

## Pre-requisites

- Stripe account active (Atheryon)
- Bank account connected for payouts
- ABN / tax info entered for invoice/receipt compliance
- Default currency confirmed (USD recommended for global buyers)

## 1. Brand the Stripe checkout

1. Stripe Dashboard → **Settings** → **Branding**
2. Upload Atheryon logo (`public/logo.png` from this repo)
3. Set primary brand colour to match the site (`#0F172A` neutral-900) and accent to brand-orange
4. Save

## 2. Enable Stripe Tax

1. Stripe Dashboard → **Tax** → **Get started**
2. Add your tax registrations (Australia GST minimum; add others as needed)
3. Set tax behaviour: **Inclusive** or **Exclusive** depending on your preference (Exclusive is the default for B2B)
4. Save

## 3. Create the Product

1. Stripe Dashboard → **Products** → **Add product**
2. **Name:** `MiB Insight Program — Industry IP for AI Agents`
3. **Description:** `Industry IP ready for AI agents. Bootstrap a market-platform pitch and prototype with your AI agent in days. 30-day access.`
4. **Image:** upload an Atheryon-branded image (square, 512×512+)
5. **Pricing:**
   - Type: **One-time**
   - Amount: **19999.00 USD**
   - Tax behaviour: per Stripe Tax settings
6. **Tax category:** "Digital download" or "Educational service" (whichever your jurisdiction prefers; "Educational service" is preferred for the procurement-bypass framing)
7. Save the product. Note the Product ID (`prod_…`).

## 4. Create the Payment Link

1. Stripe Dashboard → **Payment Links** → **New**
2. Select the MiB Insight Program product (price: $19,999 USD)
3. **Custom fields** — add three:
   - `GitHub username` — type: text, required ✅
   - `Company name` — type: text, optional
   - `Use case (one line)` — type: text, optional
4. **Promotion codes** — toggle ON ("Allow customers to redeem promotion codes")
5. **Tax collection** — toggle ON
6. **Confirmation page** — choose "Don't show confirmation page; redirect to your website" → URL: `https://atheryon.com.au/programs/mib-insight/thanks` (replace with the production URL when known)
7. **Receipt template** — verify the line item reads exactly `MiB Insight Program — 30-day access`. If not, edit the product description and confirm Stripe propagates it.
8. Save and copy the Payment Link URL (looks like `https://buy.stripe.com/...`).

## 5. Create initial Promotion Codes

Create at least three to seed the library — you'll add per-deal codes as needed.

1. Stripe Dashboard → **Coupons** → **New coupon**
2. Examples:
   - `INSIGHT-30` — 30% off, multi-use, no expiry
   - `INSIGHT-50` — 50% off, multi-use, no expiry
   - `INSIGHT-LAUNCH` — first 5 buyers, $5,000 off, expires 30 days
3. For each coupon, click "Promotion codes" → **New** to create a customer-facing code with the same effect (Stripe keeps coupons and promotion codes as separate concepts).

## 6. Update the website with the Payment Link URL

In `src/content/site.ts`, find both occurrences of:

```ts
ctaHref: 'https://buy.stripe.com/REPLACE_ME',
```

and replace with the actual Payment Link URL from Step 4.

```bash
npx next build
npm run verify:production-ready  # must pass cleanly — fails while REPLACE_ME placeholders exist
git add src/content/site.ts
git commit -m "chore(programs): set Stripe Payment Link URL for MiB Insight"
```

The `verify:production-ready` script greps `src/` for `REPLACE_ME`. It's a pre-deploy guardrail — run it locally before pushing, and consider adding it as a CI step gate.

## 7. End-to-end test using a Stripe test card

1. Switch the Stripe Dashboard to **test mode** (toggle in the top-left)
2. Create a duplicate of the Payment Link in test mode
3. Open the test Payment Link in an incognito window
4. Use card `4242 4242 4242 4242`, any future expiry, any CVC
5. Fill the GitHub username field with `test-user`
6. Apply a promotion code if you want to test the flow
7. Complete checkout
8. Verify the redirect lands at `/programs/mib-insight/thanks`
9. Check the Stripe Dashboard for the test payment + custom-field data
10. Switch back to **live mode**

## 8. Configure Stripe email notifications

Stripe Dashboard → **Settings** → **Email** → confirm `terry.tsakiris@atheryon.com.au` is set to receive successful-payment notifications. (You rely on these to trigger the manual fulfillment workflow.)
