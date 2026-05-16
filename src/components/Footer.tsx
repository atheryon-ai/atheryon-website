import Link from 'next/link'
import { site } from '@/content/site'

export function Footer() {
  const year = new Date().getFullYear()
  const { pillars, resources, company } = site.footer.links
  const legalLinks = site.footer.legal.links

  return (
    <footer className="bg-homev3-bg-soft border-t border-homev3-border py-10 relative z-10">
      <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between text-sm text-white/70">
        <div className="font-display text-xl text-white">{site.name}</div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-4 gap-y-1 -mx-3">
          {[...pillars, ...resources, ...company, ...legalLinks].map((item) => (
            <Link key={item.href} href={item.href} className="inline-block px-3 py-3 hover:text-white">
              {item.label}
            </Link>
          ))}
          <a href="https://www.linkedin.com/in/terencetsakiris/" className="inline-block px-3 py-3 hover:text-white">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="inline-block px-3 py-3 hover:text-white">
            {site.email}
          </a>
        </nav>
        <div>© {year} {site.name}</div>
      </div>
    </footer>
  )
}
