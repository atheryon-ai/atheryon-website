# Prompt: finish the dead-code cleanup

Paste everything below the line into Claude Code.

---

You are finishing a cleanup pass that was started but could not be verified. The previous session had no working shell, so roughly twenty edits landed without a single compile. Your first job is to prove the current state builds. Your second is to remove three things that are provably dead.

## Step 0 — establish a green baseline before touching anything

```bash
rm -rf src/app/mortgages src/components/ModeSetter.tsx
npx next build
```

Both paths are already unreferenced by the rest of the tree; the previous session removed every import but could not delete files. The build will fail until they are gone, because `src/app/mortgages/page.tsx` still imports `v2Mortgages`, which no longer exists.

If the build fails for any other reason, stop and fix that before continuing. Do not start the deletions below on a red build. Report what broke.

Once green, run `npx playwright test --project=chromium` and note the result. That is your reference point for everything after.

## Step 1 — delete `v2Ma`

`src/content/site.ts:918` exports `const v2Ma`. Nothing imports it. Verify that yourself before deleting:

```bash
rg "v2Ma" src/
```

Expect three hits, all inside `site.ts`: the export itself, a comment at roughly line 1533 saying items were ported from it, and `export type V2Ma = typeof v2Ma` at roughly line 2268. If you find an import anywhere, stop and report.

Delete the whole `v2Ma` object and the `V2Ma` type. Leave the line-1533 comment but reword it so it does not reference a symbol that no longer exists — the provenance note is worth keeping, the dangling reference is not.

Note what this also removes: `v2Ma` contains a page definition with `route: '/ma/offers'`, a route that has no `page.tsx`. That phantom is the reason this block is worth deleting rather than leaving alone.

Build again before moving on.

## Step 2 — remove the dead placeholder blocks

`{{PLACEHOLDER}}` strings in `site.ts` are intentional TODO markers, and `isPending` guards hide the blocks that would render them. Most of those guards now protect content that has since been filled in and renders fine. Only two clusters are genuinely dead.

**Confirm the live set first.** Run this and read the result before deleting anything:

```bash
rg "\{\{[A-Z_]+\}\}" src/
```

You should find exactly six values in `site.ts`, and nothing else outside comments:

- lines ~119, ~129, ~139 — `'Built in {{WEEKS}} weeks · {{PRS}} PRs · …'`, three identical feature footers
- lines ~199-201 — `promptShown`, `correctionShown`, `prLink`

If the grep shows more or fewer, the file has moved on. Re-scope against what you actually find and say so.

**Delete:**

- those six values
- the JSX in `src/app/(cm)/labs/page.tsx` that renders them: the `f.footer` block at roughly line 167, the prompt/correction block at roughly 279, and the `prLink` block at roughly 293
- the local `const isPending` at `labs/page.tsx:10`, once its last use is gone

**Do not touch these guards. They protect content that renders today:**

| File | Guard | Renders |
|---|---|---|
| `(cm)/ma/page.tsx:131` | `s.engagement.body` | "How we engage" section, live |
| `(cm)/capital-markets/page.tsx:11` | `s.principle.statement` | the pull-quote, live |
| `(cm)/data-ai/page.tsx:12` | `s.principle.statement` | live |
| `(cm)/system/page.tsx:68,77,113,125` | four section bodies | all live |

`src/lib/pending.ts` stays — those four files still import it.

**One tidy-up while you are here:** `system/page.tsx:10` defines its own local copy of `isPending`, duplicating `lib/pending.ts`. Its guards are staying, so replace the local definition with an import from `@/lib/pending`. That leaves exactly one definition in the repo.

Build again.

## Step 3 — correct CLAUDE.md

The Key paths section still lists `src/app/mortgages/` as a buried stub with its own layout. It no longer exists. Remove the entry and any sentence describing a second route group; there is one shell now, `(cm)`, covering every route.

Do not attempt the wider CLAUDE.md and design-standard rewrite here. That is scoped separately in `docs/reviews/2026-08-12-prompt-docs-reconciliation.md`. Touch only the mortgages line.

## Do not

- Touch `src/components/StatusBadge.tsx`. Its contrast fix is current and verified in a browser.
- Remove the `8` / `31` counts in `src/content/metrics.ts`. Terry declined that on 2026-08-12; the TODO stays until he sources or retires them.
- Remove the `Mode` union in `shellConfig.ts` even though it now has one member. It is deliberate — a second practice shell would rethread it through HomeNav and Footer.
- Delete the Mortgages entry from `/roadmap`. The practice is real; only its page was removed. It renders as an unlinked item by design.
- Change any colour, token or CSS rule.

## Acceptance

1. `npx next build` passes.
2. `npx playwright test --project=chromium` matches the Step 0 baseline. No new failures.
3. `rg "v2Ma|v2Mortgages|ModeSetter|/ma/offers|data-mode" src/` returns nothing outside explanatory comments.
4. `rg "\{\{[A-Z_]+\}\}" src/` returns nothing outside comments in `lib/pending.ts`.
5. `npm run verify:production-ready` passes.
6. Visit `/labs` and `/roadmap` on the dev deploy after pushing. `/labs` should read continuously with no gap where the deleted blocks were; `/roadmap` should show Mortgages as plain text, not a link.

## Context

Full findings: `docs/reviews/2026-08-12-site-review.md`. The mortgages removal rationale is in the header comment above `mortgagesRoadmap` in `site.ts`.

CLAUDE.md's copy rules apply to anything you write: Australian spelling, one em dash per page maximum, no "X, not Y" corrective contrast.
