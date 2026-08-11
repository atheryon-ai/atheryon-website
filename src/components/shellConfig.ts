// Shell configuration — drives nav + CTA in HomeNav.
//
// There is one shell. `app/(cm)/layout.tsx` renders it for every route and
// passes its mode to HomeNav, so the correct HTML is emitted at static-export
// build time with no client mode detection. Route-group folders `(name)` do
// not affect URLs, so /ma and /capital-markets sit inside that group and
// inherit the firm shell rather than carrying layouts of their own.
//
// The mortgages mode and its separate layout were removed on 2026-08-12; see
// mortgagesRoadmap in content/site.ts. `Mode` stays a union so that a second
// practice shell can be reinstated without rethreading HomeNav and Footer.

export type Mode = 'cm'

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
}
