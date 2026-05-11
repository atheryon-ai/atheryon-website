import Link from 'next/link'
import { site } from '@/content/site'

export function Footer() {
  const year = new Date().getFullYear()
  const { pillars, resources, company } = site.footer.links
  const legalLinks = site.footer.legal.links

  return (
    <footer className="bg-bone border-t border-charcoal/10 py-10">
      <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center justify-between text-sm text-charcoal/70">
        <div className="font-display text-xl text-charcoal">{site.name}</div>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 -mx-3">
          {[...pillars, ...resources, ...company, ...legalLinks].map((item) => (
            <Link key={item.href} href={item.href} className="inline-block px-3 py-3 hover:text-charcoal">
              {item.label}
            </Link>
          ))}
          <a href="https://www.linkedin.com/in/terencetsakiris/" className="inline-block px-3 py-3 hover:text-charcoal">
            LinkedIn
          </a>
        </nav>
        <div>© {year} {site.name}</div>
      </div>
    </footer>
  )
}
