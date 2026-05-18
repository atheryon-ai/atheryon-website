// Per-mode shell configuration — drives nav + CTA in HomeNav.
// Route-group layouts (app/(cm)/layout.tsx, app/ma/layout.tsx,
// app/mortgages/layout.tsx) pass the matching mode to HomeNav, so the
// correct HTML is emitted at static-export build time. No client mode
// detection, no FOUC on direct loads to /ma or /mortgages.

export type Mode = 'cm' | 'ma' | 'mortgages'

export type ShellConfig = {
  nav: { label: string; href: string }[]
  cta: { label: string; shortLabel: string; href: string }
}

export const shellConfig: Record<Mode, ShellConfig> = {
  cm: {
    nav: [
      { label: 'THEMES', href: '/themes' },
      { label: 'OFFERS', href: '/offers' },
      { label: 'SYSTEM', href: '/system' },
    ],
    cta: {
      label: 'BOOK SYSTEM ASSESSMENT',
      shortLabel: 'BOOK',
      href: '/contact',
    },
  },
  ma: {
    nav: [
      { label: 'APPROACH', href: '/ma/approach' },
      { label: 'OFFERS', href: '/ma/offers' },
    ],
    cta: {
      label: 'BOOK M&A REVIEW',
      shortLabel: 'REVIEW',
      href: '/contact?topic=ma-execution',
    },
  },
  mortgages: {
    // Mortgages is buried (hidden from the practice toggle) while it's
    // being built out. The practice toggle still derives wayfinding; this
    // shell config gives the page a sensible CTA in case visitors arrive
    // via a direct link.
    nav: [],
    cta: {
      label: 'TALK ABOUT MORTGAGES',
      shortLabel: 'TALK',
      href: '/contact?topic=mortgages',
    },
  },
}
