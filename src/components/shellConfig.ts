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
  // Firm shell (executive-first IA, 2026-08-09). Phase 2 inserts TECHNOLOGY
  // after SERVICES. CM legacy pages (/system, /labs, /themes, /offers) are
  // reached via /technology and the footer, not the header.
  cm: {
    nav: [
      { label: 'SERVICES', href: '/services' },
      { label: 'TECHNOLOGY', href: '/technology' },
      { label: 'EXPERIENCE', href: '/experience' },
      { label: 'APPROACH', href: '/approach' },
      { label: 'ABOUT', href: '/about' },
    ],
    // TODO(terry): CTA wording (spec §8.2) — interim neutral label.
    cta: {
      label: 'CONTACT',
      shortLabel: 'CONTACT',
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
