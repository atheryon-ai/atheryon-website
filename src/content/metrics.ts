// Single source of truth for the platform counts quoted in site copy.
//
// Two vocabularies exist for the same platform and DO NOT reconcile:
//
//   1. "8 banking functions / 31 flagship surfaces" — marketing framing used
//      on /labs (stats strip) and /offers/code. There is no backing data for
//      either number in this repo.
//      TODO(terry): confirm where 8 and 31 come from (labs-platform?), or
//      retire this vocabulary in favour of the derived counts below.
//
//   2. "26 themes / 111 pages / 6 surfaces" — derived live from themes.ts
//      below, and enforced upstream by the labs-platform contract test
//      (__tests__/themes.test.ts). These update automatically on re-sync.
//
// /themes (buyerThemes.ts, currently 7 entries) is a third, editorial cut of
// the same platform aimed at buyers; its count is also derived here.

import { ALL_THEMES, FUNCTION_ORDER, pageCountFor } from './themes'
import { buyerThemes } from './buyerThemes'

export const metrics = {
  labs: {
    /** 26 — every theme in the labs taxonomy snapshot */
    themes: ALL_THEMES.length,
    /** 111 — sum of per-theme page counts */
    pages: pageCountFor(ALL_THEMES),
    /** 5 — Front Office, Risk & Analytics, Operations, Compliance, Treasury/Finance */
    businessUnits: FUNCTION_ORDER.length,
    /** 6 — the 5 business units plus the Operational Data Store */
    surfaces: FUNCTION_ORDER.length + 1,
  },
  // TODO(terry): unverified marketing counts — see header note.
  bankingFunctions: 8,
  flagshipSurfaces: 31,
  /** 7 — the buyer-facing theme entries on /themes */
  buyerThemes: buyerThemes.length,
} as const
