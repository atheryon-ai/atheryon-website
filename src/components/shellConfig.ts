// Shell configuration — drives nav + CTA in HomeNav.
//
// There is one shell. `app/(cm)/layout.tsx` renders it for every route and
// passes its mode to HomeNav, so the correct HTML is emitted at static-export
// build time with no client mode detection. Route-group folders `(name)` do
// not affect URLs, so /ma and /data-ai sit inside that group and inherit the
// firm shell rather than carrying layouts of their own.
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
  // Firm shell (functions-and-sectors spec §5). /approach left the nav
  // (linked from body copy and footer); function-2 depth pages are reached
  // via /data-ai and the footer, not the header.
  cm: {
    // Slim top bar: the two functions plus about. Three items — Capital
    // Markets left the header when it stopped being a function and became
    // one of four sectors. The per-function sub-pages (experience /
    // approach / contact) hang off each function's own sub-nav row.
    nav: [
      { label: 'M&A SERVICES', href: '/ma' },
      { label: 'DATA & AI', href: '/data-ai' },
      { label: 'ABOUT', href: '/about' },
    ],
    cta: {
      label: 'CONTACT US',
      shortLabel: 'CONTACT US',
      href: '/contact',
    },
  },
}
