# Phase 2 Hardening — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Close the IA-coherence debt Codex flagged in the post-Phase-2 site review before merging to main. The 3-offer matrix is decided, but multiple legacy surfaces still render the killed 4-tier engagement model. Make the live test SWA internally consistent.

**Architecture:**
- Static export Next.js 14. All redirects via `staticwebapp.config.json`.
- New /offers IA stays. Killed surfaces (/engagements, /approach, EngagementModel component, HomeStrip engagement section, /programs index, /programs/mib-insight/thanks) get retired with SWA 301s where inbound links may exist.
- Content cleanup: site.ts orphans (`mibInsight`, `mibInsightThanks`), llms.txt 4-tier residue, sitemap stale URLs.
- 12 atomic tasks. Sequential. Each independently shippable.

**Tech Stack:** Next.js 14, TypeScript, Tailwind v3, Azure Static Web Apps.

---

## File Structure

### Create
- `src/app/offers/prompts/thanks/page.tsx` — thin confirmation page for the live Stripe success URL (preserves the post-purchase flow)

### Modify
- `src/components/home/HomeStrip.tsx` — replace `EngagementModel` section (the embedded 4-tier strip) with a 3-offer strip pointing to /offers/{code,prompts,consult}
- `src/components/home/HomeStrip.tsx` — drop import of `EngagementModel` if no longer referenced
- `src/components/home/HomeHero.tsx` — reorder/add a CTA so /offers gets a primary route (currently primary CTAs go to /system + /contact only)
- `src/components/home/HomeNav.tsx` — remove `APPROACH` and `ENGAGEMENTS` entries (deleted routes)
- `src/content/site.ts` — drop orphaned `mibInsight` and `mibInsightThanks` content blocks; drop `Programs` from footer.links; drop `/labs/code`, `/labs/prompts`, `/labs/advisory` if anywhere; add `front-office-bundle` topic to contact preset (if TOPIC_LABELS lives there) OR in `src/app/contact/page.tsx` directly
- `src/app/contact/page.tsx` — add `front-office-bundle` to TOPIC_LABELS
- `staticwebapp.config.json` — add 3 new 301 redirects: `/engagements` → `/offers`, `/approach` → `/system`, `/programs` → `/offers`
- `public/sitemap.xml` — remove redirect-era URLs (`/reality`, `/data`, `/ai-direction`, `/transformation`, `/programs`); add `/system`, `/workflows`, `/labs/themes`, `/offers/consult`, `/offers/prompts/thanks`
- `public/llms.txt` — drop 4-tier engagement model references; reflect 3-offer IA + retire references to deleted routes
- `src/components/Footer.tsx` (or `site.ts` footer section) — remove `Programs` link entirely

### Delete
- `src/app/engagements/page.tsx` and its dir
- `src/app/approach/page.tsx` and its dir
- `src/app/programs/page.tsx` and its dir
- `src/components/EngagementModel.tsx` (unless other consumers found — search before deleting)

### Touched but left alone in this plan (out of scope, future phases)
- `/labs/page.tsx` "Code, prompts, advisory" duplicate section — Codex flagged. Phase 4 (themes promotion) will rebuild /labs as the proof gateway and naturally removes this.
- `/workflows/page.tsx` PENDING cells — Phase 5 fills these with real content from labs-platform features.
- Homepage banking-lineage disclaimer parity (`HomeStrip` logos vs `/about` disclaimer text) — content judgment, defer.
- Labs bio mentioning Commonwealth Bank + Westpac — content decision, defer to user.
- `/labs` "See it live" link pointing to www.atheryon.com.au — minor, defer.

---

## Pre-flight

- [ ] **Step 0.1: Verify clean working tree, on `dev`:**

```bash
cd /Users/abigail/repos/atheryon-website
git status --porcelain
git branch --show-current
git log --oneline -3
```

Expected: empty status, branch `dev`, last commit `9876a12` (or newer if Task 15 added anything tracked — unlikely since `.context/` is gitignored).

---

## Task H1: Resolve the `/programs/mib-insight/thanks` redirect chain

**Background:** the live Stripe Payment Link targets `https://atheryon.com.au/programs/mib-insight/thanks`. Phase 2 deleted that page and added a SWA 301 to `/offers/prompts`. A buyer completing checkout lands on a general offer page with no confirmation. Fix by creating a real thanks page at `/offers/prompts/thanks/` (reusing the existing `mibInsightThanks` content in `site.ts:168`) and retargeting the SWA redirect to it.

**Files:**
- Create: `src/app/offers/prompts/thanks/page.tsx`
- Modify: `staticwebapp.config.json` (retarget redirect)

- [ ] **Step 1.1: Read the existing thanks content shape**

```bash
grep -n "mibInsightThanks" src/content/site.ts
sed -n '/mibInsightThanks/,/^    [a-z]*:/p' src/content/site.ts | head -40
```

Note the fields available (likely `title`, `description`, `hero.headline`, `hero.subheadline`, `cta`).

- [ ] **Step 1.2: Create `src/app/offers/prompts/thanks/page.tsx`**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection } from '@/components'
import { site } from '@/content/site'

const t = site.pages.mibInsightThanks

export const metadata: Metadata = {
  title: t.title,
  description: t.description,
  openGraph: { title: t.title, description: t.description },
  twitter: { card: 'summary_large_image', title: t.title, description: t.description },
  alternates: { canonical: 'https://atheryon.com.au/offers/prompts/thanks' },
  robots: { index: false, follow: true },
}

export default function OffersPromptsThanksPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers / prompts / thanks"
        title={t.hero?.headline ?? 'Welcome'}
        body={t.hero?.subheadline ?? 'Thank you. Your welcome email is on its way.'}
      />
      <DocSection label="§01 / Next" title="">
        <div className="max-w-3xl">
          <p className="text-base md:text-lg text-charcoal/85 leading-relaxed">
            Your Front Office bundle access has been confirmed. The welcome email contains
            the onboarding link and asset bundle. If you haven&apos;t received it within 10
            minutes, reply directly to <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
          </p>
          <div className="mt-8">
            <Link
              href="/offers"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-sm font-medium text-bone bg-charcoal hover:bg-ink transition-colors"
            >
              Browse the other offers
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </DocSection>
    </DocPage>
  )
}
```

**Field-shape note:** if `mibInsightThanks` has different field names (e.g. no `hero.headline`/`hero.subheadline`), adjust the references. Run `grep -A 20 "mibInsightThanks:" src/content/site.ts` first to confirm shape. The fallback `?? 'Welcome'` / `?? 'Thank you...'` covers minor name mismatches.

- [ ] **Step 1.3: Retarget the redirect in `staticwebapp.config.json`**

Find this line:
```json
{ "route": "/programs/mib-insight/thanks", "redirect": "/offers/prompts", "statusCode": 301 },
```

Change `"redirect": "/offers/prompts"` to `"redirect": "/offers/prompts/thanks"`. Add a new rewrite:
```json
{ "route": "/offers/prompts/thanks", "rewrite": "/offers/prompts/thanks.html" },
```

(Insert the new rewrite next to the other `/offers/*` rewrites.)

- [ ] **Step 1.4: Validate JSON + typecheck:**
```bash
python3 -m json.tool staticwebapp.config.json > /dev/null && echo "VALID"
npx tsc --noEmit
```
Expected: VALID, zero TypeScript errors.

- [ ] **Step 1.5: Commit:**
```bash
git add src/app/offers/prompts/thanks/page.tsx staticwebapp.config.json
git commit -m "feat(offers): add /offers/prompts/thanks for the Stripe success URL"
```

---

## Task H2: Replace HomeStrip 4-tier engagement section with 3-offer strip

**Files:**
- Modify: `src/components/home/HomeStrip.tsx` — replace the third StripCell that currently renders the 4-tier Engagement Model with a 3-offer strip linking to /offers/code, /offers/prompts, /offers/consult.

- [ ] **Step 2.1: Read the current HomeStrip:**
```bash
nl -ba src/components/home/HomeStrip.tsx | head -200
```

Find the section around line 173 that renders `repeat(4, 1fr)` mapping over `v2.engagement` — that's the 4-tier strip to replace.

- [ ] **Step 2.2: Replace the engagement StripCell body**

Inside the `<StripCell label="Engagement Model">` block, replace the entire inner `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>` block (the one mapping over `v2.engagement`) with a 3-offer grid:

```tsx
<div className="home-strip-engagement-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
  {[
    { id: 'code',    title: 'Buy the code',    desc: 'License the labs platform code', href: '/offers/code' },
    { id: 'prompts', title: 'License prompts', desc: 'Directorial archive + bundles',  href: '/offers/prompts' },
    { id: 'consult', title: 'Consult',         desc: 'Senior-led advisory engagement',  href: '/offers/consult' },
  ].map((o) => (
    <Link
      key={o.id}
      href={o.href}
      style={{
        background: 'var(--homev3-surface)',
        border: '1px solid var(--homev3-border)',
        borderRadius: 6,
        padding: '14px 16px',
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minHeight: 84,
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 700, color: '#ffffff' }}>{o.title}</span>
      <span style={{ fontSize: 11, color: 'var(--homev3-text-soft)' }}>{o.desc}</span>
    </Link>
  ))}
</div>
```

Also change the StripCell label from `"Engagement Model"` to `"Offers"`.

If `import Link from 'next/link'` isn't already in the file, add it at the top.

Drop the import of `EngagementModel` if it's still in this file and no longer used (run a grep first).

- [ ] **Step 2.3: Typecheck:**
```bash
npx tsc --noEmit
```
Expected: zero errors.

- [ ] **Step 2.4: Commit:**
```bash
git add src/components/home/HomeStrip.tsx
git commit -m "feat(home): replace 4-tier engagement strip with 3-offer strip"
```

---

## Task H3: Retire `/engagements`

**Files:**
- Delete: `src/app/engagements/page.tsx` and its dir
- Modify: `src/components/home/HomeNav.tsx` (remove `ENGAGEMENTS` entry)
- Modify: `staticwebapp.config.json` (add redirect)

- [ ] **Step 3.1: Confirm no internal pages link to /engagements:**
```bash
grep -rn '/engagements' src/ public/ 2>/dev/null | grep -v 'node_modules\|tsbuildinfo'
```
You'll find references in HomeNav, llms.txt, site.ts, sitemap, staticwebapp.config.json. Those will be cleaned in their own tasks. Just confirm no surprise references.

- [ ] **Step 3.2: Add SWA redirect.** Open `staticwebapp.config.json`, add to the redirects block (near the other 301s):
```json
{ "route": "/engagements", "redirect": "/offers", "statusCode": 301 },
```
Remove the corresponding `{ "route": "/engagements", "rewrite": "/engagements.html" }` from the rewrites block.

- [ ] **Step 3.3: Remove from HomeNav:**

Open `src/components/home/HomeNav.tsx` and delete the line:
```ts
{ label: 'ENGAGEMENTS', href: '/engagements' },
```

- [ ] **Step 3.4: Delete the page + dir:**
```bash
rm src/app/engagements/page.tsx
rmdir src/app/engagements
```

- [ ] **Step 3.5: Typecheck + JSON validate:**
```bash
rm -rf .next
npx tsc --noEmit
python3 -m json.tool staticwebapp.config.json > /dev/null && echo "VALID"
```
Expected: zero TS errors, valid JSON.

- [ ] **Step 3.6: Commit:**
```bash
git add -A src/app/engagements/ src/components/home/HomeNav.tsx staticwebapp.config.json
git commit -m "chore(ia): retire /engagements (redirect to /offers, drop from nav)"
```

---

## Task H4: Retire `/approach`

Same shape as H3.

**Files:**
- Delete: `src/app/approach/page.tsx` and its dir
- Modify: `src/components/home/HomeNav.tsx` (remove `APPROACH` entry)
- Modify: `staticwebapp.config.json` (add redirect `/approach` → `/system`, remove rewrite)

- [ ] **Step 4.1: Add SWA redirect.** Add to the redirects block:
```json
{ "route": "/approach", "redirect": "/system", "statusCode": 301 },
```
Remove `{ "route": "/approach", "rewrite": "/approach.html" }`.

- [ ] **Step 4.2: Remove from HomeNav.** Delete:
```ts
{ label: 'APPROACH', href: '/approach' },
```

- [ ] **Step 4.3: Delete the page + dir:**
```bash
rm src/app/approach/page.tsx
rmdir src/app/approach
```

- [ ] **Step 4.4: Verify + commit:**
```bash
rm -rf .next
npx tsc --noEmit
python3 -m json.tool staticwebapp.config.json > /dev/null && echo "VALID"
git add -A src/app/approach/ src/components/home/HomeNav.tsx staticwebapp.config.json
git commit -m "chore(ia): retire /approach (redirect to /system, drop from nav)"
```

---

## Task H5: Retire `/programs` (the index, not the deleted MiB sub-pages)

The /programs page advertises MiB Insight (retired) + MiB Build (coming) + MiB Run (coming). Per MiB-1 (retire the brand), the page no longer makes sense. Footer link routes here too.

**Files:**
- Delete: `src/app/programs/page.tsx` and its dir
- Modify: `staticwebapp.config.json` (add redirect, remove rewrite)
- Modify: `src/content/site.ts` (remove Programs / MiB Insight footer links — check the footer.links sub-arrays)
- Modify: `src/components/Footer.tsx` only if footer reads from a different source

- [ ] **Step 5.1: Confirm /programs has no remaining content value.** Read `src/app/programs/page.tsx` and the `site.pages.programs` content block. Confirm both MiB Build + Run are "Coming soon" (`status: 'coming'`) and don't link anywhere productive.

- [ ] **Step 5.2: Add SWA redirect.** Add to redirects:
```json
{ "route": "/programs", "redirect": "/offers", "statusCode": 301 },
```
Remove the rewrite `{ "route": "/programs", "rewrite": "/programs.html" }`.

- [ ] **Step 5.3: Update footer in `src/content/site.ts`.** Find `footer.links` (around line 553). Remove the `Programs` entry and the `MiB Insight` entry if it's still there.

- [ ] **Step 5.4: Delete the page + dir:**
```bash
rm src/app/programs/page.tsx
rmdir src/app/programs
```

- [ ] **Step 5.5: Verify + commit:**
```bash
rm -rf .next
npx tsc --noEmit
python3 -m json.tool staticwebapp.config.json > /dev/null && echo "VALID"
git add -A src/app/programs/ src/content/site.ts staticwebapp.config.json
git commit -m "chore(ia): retire /programs (redirect to /offers, drop from footer)"
```

---

## Task H6: Drop orphaned MiB content blocks from `site.ts`

`mibInsight` (site.ts:74) and `mibInsightThanks` (site.ts:168) blocks no longer render any marketing page. The thanks block was preserved for the Stripe success URL — but Task H1 created a new page at `/offers/prompts/thanks/page.tsx` that already reads `mibInsightThanks`. If that page is keeping the content alive, leave it. Otherwise, delete both.

- [ ] **Step 6.1: Decide.** Confirm whether the new thanks page reads `mibInsightThanks`:
```bash
grep -n "mibInsightThanks" src/app/offers/prompts/thanks/page.tsx
```

- [ ] **Step 6.2: If the thanks page reads mibInsightThanks, only delete `mibInsight`.** If neither block is referenced, delete both. Use the Edit tool to remove the block(s).

- [ ] **Step 6.3: Also delete `site.pages.programs` content block** (no longer rendered after H5). And drop the entry from `site.nav` if `Programs` is there.

- [ ] **Step 6.4: Typecheck + commit:**
```bash
npx tsc --noEmit
git add src/content/site.ts
git commit -m "chore(content): drop orphaned MiB + programs content blocks"
```

---

## Task H7: Add `front-office-bundle` topic to contact prefill

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 7.1: Read TOPIC_LABELS:**
```bash
grep -n "TOPIC_LABELS\|topic ===" src/app/contact/page.tsx | head
```

- [ ] **Step 7.2: Add the new topic entry** to `TOPIC_LABELS` (it's a record/dict). The new entry:
```ts
'front-office-bundle': 'I want the Front Office bundle ($14,000 AUD).',
```

Place alongside the existing topics (which are likely `labs-code`, `labs-prompts`, `labs-advisory`, `ai-direction`, `system-assessment`).

- [ ] **Step 7.3: Typecheck + commit:**
```bash
npx tsc --noEmit
git add src/app/contact/page.tsx
git commit -m "feat(contact): add front-office-bundle topic preset"
```

---

## Task H8: Sitemap full sweep

**Files:**
- Modify: `public/sitemap.xml`

- [ ] **Step 8.1: Read current sitemap:**
```bash
cat public/sitemap.xml
```

- [ ] **Step 8.2: Remove redirect-era URLs** (these all 301 elsewhere via staticwebapp.config.json):
- `/reality`
- `/data`
- `/ai-direction`
- `/transformation`
- `/cdm-platform`, `/recovery-migration`, `/m-and-a-execution`, `/capability-enablement`, `/how-we-work`, `/what-we-deliver`, `/ai-ready-data`, `/intelligence`, `/reference-architectures` (the legacy commercial URLs, if listed)
- `/engagements`, `/approach`, `/programs` (newly retired)

- [ ] **Step 8.3: Add missing live URLs:**
- `/system` (p=0.8)
- `/workflows` (p=0.7)
- `/about` (p=0.7)
- `/labs/themes` (p=0.6)
- `/offers/consult` (p=0.7) — confirm whether already present
- `/offers/prompts/thanks` (p=0.3) — low priority, also has `<meta name="robots" content="noindex">` in the page

- [ ] **Step 8.4: Validate + commit:**
```bash
xmllint --noout public/sitemap.xml 2>&1 || echo "(xmllint may not be installed — visual check instead)"
git add public/sitemap.xml
git commit -m "chore(sitemap): comprehensive sweep — drop redirect-era + retired URLs, add live routes"
```

---

## Task H9: Update `public/llms.txt`

**Files:**
- Modify: `public/llms.txt`

- [ ] **Step 9.1: Read current content:**
```bash
cat public/llms.txt
```

- [ ] **Step 9.2: Update to reflect 3-offer IA.** Specifically:
- Replace any mention of 4-tier engagement model (Advisory/Enablement/Delivery/Licensed System) with the 3-offer language (Code/Prompts/Consult)
- Update routes: remove `/engagements`, `/approach`, `/programs`, `/programs/mib-insight`; add `/offers`, `/offers/code`, `/offers/prompts`, `/offers/consult`
- Update any "Programs" mentions

This is a text/markdown file — small edits, ideally use Edit tool with explicit anchors.

- [ ] **Step 9.3: Commit:**
```bash
git add public/llms.txt
git commit -m "chore(llms): reflect 3-offer IA + drop retired-route references"
```

---

## Task H10: Remove `EngagementModel` component if unused

After H2 replaced the home strip 4-tier section with a 3-offer block, EngagementModel may have no remaining consumers.

- [ ] **Step 10.1: Find remaining usages:**
```bash
grep -rn "EngagementModel\|<EngagementModel" src/ 2>/dev/null
```

If zero usages, delete the file:
```bash
rm src/components/EngagementModel.tsx
```

If usages remain, leave it (note which file consumes it as a DONE_WITH_CONCERNS) — that file probably needs updating in a later phase.

- [ ] **Step 10.2: Typecheck + commit:**
```bash
npx tsc --noEmit
git add -A src/components/EngagementModel.tsx 2>/dev/null
git commit -m "chore(components): remove unused EngagementModel"
```

If the component still has consumers, skip the commit and report DONE_WITH_CONCERNS.

---

## Task H11: Local build + verify

Verification-only task. No commits.

- [ ] **Step 11.1: Static build:**
```bash
rm -rf .next out
npx next build 2>&1 | tail -30
```

Expected: build completes, no errors. Page count should drop by 2-3 (deleted /approach, /engagements, /programs).

- [ ] **Step 11.2: Verify deleted pages absent from out/:**
```bash
ls out/engagements* 2>&1 || echo "(none — correct)"
ls out/approach* 2>&1 || echo "(none — correct)"
ls out/programs* 2>&1 || echo "(none — correct)"
ls out/offers/prompts/thanks* 2>&1
```

- [ ] **Step 11.3: Playwright smoke against local dev:**
```bash
npx playwright test tests/offers.spec.ts --project=chromium 2>&1 | tail -10
```
Expected: 9 passed, 2 skipped (the legacy-redirect tests skip locally as before).

- [ ] **Step 11.4: Visual check via gstack browse (if available):**
```bash
B="$HOME/.claude/skills/gstack/browse/dist/browse"
# Start dev server if not running
curl -s -m 2 http://localhost:3000 >/dev/null || (npx next dev > /tmp/next-dev.log 2>&1 &) && sleep 6
"$B" viewport 1280x800
"$B" goto http://localhost:3000/
"$B" screenshot /tmp/home-after-hardening.png
"$B" viewport 375x812
"$B" goto http://localhost:3000/
sw=$("$B" js "document.documentElement.scrollWidth" 2>/dev/null | grep -oE '[0-9]+')
echo "home mobile scrollWidth: $sw (target 375)"
```

Confirm home doesn't have the 4-tier strip anymore and renders the new 3-offer strip.

No commit.

---

## Task H12: Push + deploy verify

- [ ] **Step 12.1: Confirm pending commits:**
```bash
git log --oneline origin/dev..dev
```
Expected: ~10 commits (H1 through H10 — some may have been DONE_WITH_CONCERNS without commits).

- [ ] **Step 12.2: Push:**
```bash
git push origin dev 2>&1 | tail -5
```

- [ ] **Step 12.3: Watch deploy:**
```bash
gh run list --branch dev --limit 3 | head -5
# Find the most recent "Deploy to Test Environment" run
gh run watch <RUN_ID> --exit-status 2>&1 | tail -15
```

- [ ] **Step 12.4: Verify new redirects on test SWA:**
```bash
TEST=https://polite-flower-03ba3020f.7.azurestaticapps.net
for path in /engagements /approach /programs; do
  echo -n "$path → "
  curl -sI "$TEST$path" | grep -iE "^(HTTP|Location)" | tr '\n' ' '
  echo ""
done
```
Expected: each returns HTTP 301 with Location pointing to /offers, /system, /offers respectively.

- [ ] **Step 12.5: Verify thanks page resolves to a real page (not the generic redirect anymore):**
```bash
curl -sI "$TEST/programs/mib-insight/thanks" | grep -iE "^(HTTP|Location)" | tr '\n' ' '
echo ""
curl -sI "$TEST/offers/prompts/thanks" | head -1
```
Expected: first returns 301 to `/offers/prompts/thanks`; second returns 200.

No commit.

---

## Self-Review Notes

**Codex IA findings addressed:**

| Codex finding | Task |
|---|---|
| /engagements still 4-tier | H3 |
| HomeStrip still 4-tier | H2 |
| /approach stub in nav | H4 |
| /programs sells retired MiB | H5 |
| Footer Programs link | H5 |
| EngagementModel component | H10 |
| llms.txt 4-tier residue | H9 |
| Front Office bundle topic prefill broken | H7 |
| Sitemap stale URLs | H8 |
| Orphaned mibInsight + mibInsightThanks blocks | H1 keeps mibInsightThanks (real consumer), H6 drops mibInsight |

**Codex findings deliberately deferred:**

| Finding | Reason |
|---|---|
| /labs duplicate offer section | Phase 4 (themes promotion) rebuilds /labs |
| /workflows blank cells | Phase 5 fills with real content |
| Homepage banking-lineage disclaimer parity | Content judgment, deferred to user |
| Labs bio Commonwealth/Westpac references | Content judgment, deferred to user |
| /labs "See it live" link | Minor, deferred |

**Final code review Critical from Phase 2** (thanks-page redirect) — addressed by H1.

**Type consistency:** new `mibInsightThanks` is the same block referenced both in H1 and H6 — H6 only deletes it if H1's new page does NOT reference it. The plan accommodates both shapes.
