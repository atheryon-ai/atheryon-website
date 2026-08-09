// Per-mode shell configuration — drives nav + CTA in HomeNav.
// Route-group layouts (app/(cm)/layout.tsx, app/ma/layout.tsx,
// app/mortgages/layout.tsx) pass the matching mode to HomeNav, so the
// correct HTML is emitted at static-export build time. No client mode
// detection, no FOUC on direct loads to /ma or /mortgages.

export type Mode = 'cm' | 'mortgages'

export type ShellConfig = {
  nav: { label: string; href: string }[]
  cta: { label: string; shortLabel: string; href: string }
}

export const shellConfig: Record<Mode, ShellConfig> = {
  // Firm shell (rev 5 arms model). /approach left the nav (linked from body
  // copy and footer); CM legacy pages are reached via /capital-markets and
  // the footer, not the header.
  cm: {
    // Slim top bar (Terry 2026-08-09): arms + underpinning + about. The
    // per-arm sub-pages (experience / approach / contact) hang off each
    // arm's own sub-nav row, not the header.
    nav: [
      { label: 'M&A', href: '/ma' },
      { label: 'CAPITAL MARKETS', href: '/capital-markets' },
      { label: 'DATA & AI', href: '/data-ai' },
      { label: 'ABOUT', href: '/about' },
    ],
    cta: {
      label: 'DISCUSS A SITUATION',
      shortLabel: 'DISCUSS',
      href: '/contact',
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
