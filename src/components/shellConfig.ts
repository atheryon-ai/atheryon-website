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
  // Firm shell (functions-and-sectors spec §5). /approach retired
  // 2026-08-16 (method lives on the function landings); function-2 depth
  // pages are reached via /data-ai and the footer, not the header.
  cm: {
    // Slim top bar: the two functions plus about. Three items — Capital
    // Markets left the header when it stopped being a function and became
    // one of four sectors. Function sub-nav is Overview · Experience on
    // both functions; each landing carries its own method. Contact Us is
    // header-only.
    nav: [
      { label: 'M&A SERVICES', href: '/ma' },
      { label: 'DATA & AI', href: '/data-ai' },
      { label: 'ABOUT', href: '/about' },
    ],
    cta: {
      // shortLabel MUST stay shorter than label. It renders below 420px via
      // .home-nav-cta-short, and the header is a 3-column grid (brand · CTA ·
      // MENU) with no room to spare at 375px. When the CTA became "Contact Us"
      // in 6636eb7 both fields were set to the same string — the earlier values
      // were BOOK / TALK / REVIEW — which made the small-viewport swap render
      // an identical-width label and saved nothing. That silently overflowed
      // the header by 4px on every page using this shell.
      label: 'CONTACT US',
      shortLabel: 'CONTACT',
      href: '/contact',
    },
  },
}
