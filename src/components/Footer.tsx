import Link from 'next/link'
import { site, v3 } from '@/content/site'
import type { Mode } from '@/components/shellConfig'

// Firm footer (exec-first IA): grouped columns — Firm / Technology /
// Resources — with the legal links and contact details on a closing row.
// The `mode` prop remains for the mortgages shell, which shares this footer.
export function Footer({ mode = 'cm' }: { mode?: Mode }) {
  void mode
  const year = new Date().getFullYear()
  const legalLinks = site.footer.legal.links

  return (
    <footer className="bg-homev3-bg-soft border-t border-homev3-border py-12 relative z-10">
      <div className="max-w-container mx-auto px-6">
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 text-sm text-white/70"
        >
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-xl text-white">{site.name}</div>
          </div>
          {v3.footer.groups.map((group) => (
            <div key={group.heading}>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">
                {group.heading}
              </div>
              <ul className="space-y-1">
                {group.links.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-block py-1.5 hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mt-10 pt-6 border-t border-homev3-border flex flex-col md:flex-row gap-4 md:items-center justify-between text-sm text-white/70">
          <div className="flex flex-wrap gap-x-4 gap-y-1 -mx-3">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="inline-block px-3 py-3 hover:text-white">
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/terencetsakiris/"
              className="inline-block px-3 py-3 hover:text-white"
            >
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="inline-block px-3 py-3 hover:text-white">
              {site.email}
            </a>
          </div>
          <div>© {year} {site.name}</div>
        </div>
      </div>
    </footer>
  )
}
