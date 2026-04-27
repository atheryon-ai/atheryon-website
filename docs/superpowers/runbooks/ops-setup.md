# MiB Insight Program — Operations Runbook

This document covers the manual fulfillment workflow Terry follows for each Insight Program sale, plus initial ops setup. Per-sale ops takes ~10 minutes.

## One-time setup

### 1. Choose and create the tracking sheet

Pick one of: Notion · Airtable · Google Sheets. Create a single tracking sheet with these columns:

| Column | Type | Notes |
|--------|------|-------|
| Stripe Payment ID | text | from Stripe email/dashboard |
| Buyer email | email | from Stripe |
| Buyer name | text | from Stripe |
| Company | text | optional, from custom field |
| GitHub username | text | from custom field |
| Use case | text | optional, from custom field |
| Purchase date | date | |
| Expiry date | date | purchase date + 30 days |
| Status | select | active / expired / extended / refunded |
| Day-25 reminder sent | checkbox | |
| Day-30 revoked | checkbox | |
| Notes | text | per-buyer notes |

Save a calendar link to this sheet somewhere accessible (Stripe email signature, browser bookmark).

### 2. Create the private materials repo

Create a new private GitHub repository (e.g., `atheryon-ai/mib-insight-program-materials`).

Initial contents (placeholder until real content authoring begins):

- `README.md` — curriculum index (5 modules, brief descriptions)
- `PROGRAM_TERMS.md` — Polyform Internal Use 1.0.0 verbatim, plus Atheryon clauses (30-day window, no redistribution, no production use)
- `modules/01-foundations/` — placeholder
- `modules/02-front-office-trading/` — placeholder
- `modules/03-middle-office/` — placeholder
- `modules/04-back-office/` — placeholder
- `modules/05-compliance-reporting/` — placeholder

(Real content authoring is a separate effort — see the spec.)

### 3. Save email templates

Save these as Gmail templates (Settings → Advanced → Templates → enable, then compose → save). Three templates total.

#### Template A: Welcome (sent immediately after invitation)

```
Subject: Welcome to the MiB Insight Program

Hi [Name],

Thanks for joining the MiB Insight Program. Your access is active for 30 days, until [DATE].

You've been added to the program materials here: [GITHUB_URL]
Please read PROGRAM_TERMS.md before you start.

Suggested first step: open the Foundations module — it shows how to use the IP with your AI agent in about 15 minutes.

Reply to this email any time.

— Terry
```

#### Template B: Day-25 nudge

```
Subject: Five days left on your MiB Insight Program access

Hi [Name],

A quick heads-up — your Insight Program access expires in 5 days, on [EXPIRY_DATE].

Two options worth considering:

  1. Extend access — 30 more days for $5,000. Reply and I'll send a code.
  2. Move up to the Build Program — implementation IP plus 12 months of access. Happy to walk you through it.

If neither fits, no problem — your access ends [EXPIRY_DATE] and you can return any time.

— Terry
```

#### Template C: Day-30 revocation + upsell

```
Subject: Your MiB Insight Program access has ended

Hi [Name],

Your 30-day Insight Program access has ended. Per PROGRAM_TERMS.md, please remove any local copies of the materials.

If you got value from the program — and want to take it further — the Build Program is the next step: implementation IP, 12-month access, and ongoing updates. Happy to walk you through it.

Either way, thanks for joining.

— Terry
```

### 4. Set up the Stripe-email watch

Make sure `terry.tsakiris@atheryon.com.au` is the email on the Stripe account so payment notifications land in the right inbox. Consider a Gmail filter to label and star Stripe payment notifications so they're hard to miss.

## Per-sale workflow (run on every Stripe payment notification)

1. **Open the Stripe Dashboard** session and confirm payment cleared
2. **Copy the buyer's GitHub username** from the Stripe custom field
3. **Add as collaborator**: GitHub repo → Settings → Collaborators → Add → set permission to **Read**
4. **Send Welcome email** (Template A) — fill in [Name], [DATE = purchase + 30 days], [GITHUB_URL = the materials repo]
5. **Log in tracking sheet**: copy Stripe Payment ID, email, name, company, GitHub username, use case, purchase date, expiry date, status = `active`
6. **Set two calendar reminders**:
   - Day 25: title "Day-25 nudge — [Buyer name]" — action: send Template B
   - Day 30: title "Day-30 revoke — [Buyer name]" — action: remove collaborator + send Template C, mark sheet `expired`

## Edge cases

- **Wrong GitHub username at checkout**: reply to Welcome email asking confirmation; ask for the correct username; update the collaborator invite.
- **Refund request**: policy is no refunds after access; exception at Terry's discretion. If granted, refund via Stripe + remove collaborator.
- **Extension request**: invoice via Stripe (use Stripe Invoicing → Customer → New invoice → "Insight Program — 30-day extension" — $5,000) and update the expiry date in the tracking sheet.
- **Add team members**: invoice each additional seat ($5,000 each) and add the additional GitHub usernames as separate collaborators.
- **Public leak of IP**: DMCA via GitHub support + notice email citing PROGRAM_TERMS.md.
- **Chargeback**: revoke collaborator immediately; respond to dispute via Stripe.

## Trigger to upgrade to Approach 2 (automation)

Move from manual to automated when **any** of:
- Sustained > 5 sales/month for two consecutive months
- A sale lands while you're asleep / travelling and fulfillment lags by hours
- Tracking-sheet drift — a day-30 reminder gets missed

Approach 2 work: ~1–2 weeks. Migrate to Stripe Checkout (custom fields collected via Checkout, not Payment Link), build an Azure SWA Function for the `checkout.session.completed` webhook, integrate the GitHub API for collaborator-add, build a scheduled SWA Function for revocation, and persist access state in Azure Table Storage.
