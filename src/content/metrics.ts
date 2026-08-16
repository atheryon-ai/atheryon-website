// Single source of truth for the platform counts quoted in site copy.
//
// Every number here is DERIVED from themes.ts, which is a verbatim copy of
// labs-platform's `src/lib/themes/themes.ts`. Re-sync is a plain `cp`; nothing
// in the copied file is hand-edited, so the counts move on their own.
//
// MORTGAGES FILTER (2026-08-16, Terry). Upstream added a sixth business
// function, Mortgages, in `2026-05-05-mortgages-section-resurface.md`. The
// mortgages PRACTICE was retired from this website on 2026-08-12 (the
// /mortgages stub + layout) and 2026-08-15 (/roadmap), so its themes are
// excluded from every published count and from the /labs/themes bands. The
// filter lives HERE and not in themes.ts on purpose: editing the copied file
// would break the "verbatim copy" re-sync contract and force the same surgery
// on every future sync. (It also would not typecheck — BUSINESS_THEMES_BY_
// FUNCTION is a Record keyed on BusinessFunction, so the key cannot simply be
// dropped.) Consumers must read the PUBLISHED_* exports below, never the raw
// themes.ts exports, or retired mortgages content leaks back onto the site.
//
// The former "8 banking functions / 31 flagship surfaces" vocabulary is gone.
// The 8 was never a platform-taxonomy count — it summarised the eight career
// domain boxes on /labs (site.ts evidence.boxes), which is why it never
// reconciled with upstream. That stat now derives from the list it describes.
// The 31 had no source anywhere in labs-platform (checked 2026-08-16: not in
// CAPABILITIES.md, not in docs/generated/stats.md, not in themes.ts) and has
// been retired in favour of the derived surface count.
//
// /themes (buyerThemes.ts, currently 7 entries) is a separate editorial cut of
// the same platform aimed at buyers; its count is also derived here.

import {
  ALL_THEMES,
  BUSINESS_THEMES_BY_FUNCTION,
  FUNCTION_ORDER,
  ODS_THEMES,
  pageCountFor,
  type BusinessFunction,
  type Theme,
} from './themes'
import { buyerThemes } from './buyerThemes'

/** Business functions retired from the public site — excluded from all counts. */
const RETIRED_FUNCTIONS: readonly BusinessFunction[] = ['mortgages']

const isPublished = (fn: BusinessFunction) => !RETIRED_FUNCTIONS.includes(fn)

/** The business functions this site publishes, in upstream display order. */
export const PUBLISHED_FUNCTION_ORDER: readonly BusinessFunction[] =
  FUNCTION_ORDER.filter(isPublished)

/** Themes grouped by published function — the /labs/themes band source. */
export const PUBLISHED_THEMES_BY_FUNCTION: ReadonlyArray<
  readonly [BusinessFunction, readonly Theme[]]
> = PUBLISHED_FUNCTION_ORDER.map((fn) => [fn, BUSINESS_THEMES_BY_FUNCTION[fn]] as const)

/** Every published theme: the ODS plane plus the published business functions. */
export const PUBLISHED_THEMES: readonly Theme[] = [
  ...ODS_THEMES,
  ...PUBLISHED_FUNCTION_ORDER.flatMap((fn) => [...BUSINESS_THEMES_BY_FUNCTION[fn]]),
]

export const metrics = {
  labs: {
    /** 27 — every published theme (32 upstream, less the 5 mortgages themes) */
    themes: PUBLISHED_THEMES.length,
    /** 112 — sum of per-theme page counts across published themes */
    pages: pageCountFor(PUBLISHED_THEMES),
    /** 5 — Front Office, Risk & Analytics, Operations, Compliance, Treasury/Finance */
    businessUnits: PUBLISHED_FUNCTION_ORDER.length,
    /** 6 — the 5 business units plus the Operational Data Store */
    surfaces: PUBLISHED_FUNCTION_ORDER.length + 1,
  },
  /** 7 — the buyer-facing theme entries on /themes */
  buyerThemes: buyerThemes.length,
} as const

/** Upstream totals including retired functions. Not for publication — kept so a
 *  future re-sync can show what the filter is holding back. */
export const upstreamTotals = {
  themes: ALL_THEMES.length,
  pages: pageCountFor(ALL_THEMES),
  businessFunctions: FUNCTION_ORDER.length,
} as const
