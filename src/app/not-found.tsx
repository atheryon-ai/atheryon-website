import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection } from '@/components'

export const metadata: Metadata = {
  title: 'Page not found — Atheryon',
  description: 'The page you requested does not exist on atheryon.com.au.',
  robots: { index: false, follow: false },
}

const NAV = [
  { label: 'Home', tag: 'Atheryon home', href: '/' },
  { label: 'System', tag: 'Reference architecture', href: '/system' },
  { label: 'Workflows', tag: 'Capital markets AI workflows', href: '/workflows' },
  { label: 'Offers', tag: 'Engagement model', href: '/offers' },
  { label: 'About', tag: 'Banking lineage', href: '/about' },
  { label: 'Labs', tag: 'Working reference platform', href: '/labs' },
  { label: 'Contact', tag: 'Book system assessment', href: '/contact' },
] as const

export default function NotFound() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / 404 / not-found"
        title="That page is not on the map."
        body="The URL you followed does not match a known page on atheryon.com.au."
      />

      <DocSection label="§01 / Navigation">
        <p className="text-base md:text-lg text-charcoal/80 leading-relaxed max-w-3xl mb-8">
          If you arrived from an external link, the page may have moved or been retired. The links below cover the current information architecture.
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-px bg-charcoal/15 border border-charcoal/15">
          {NAV.map((item, i) => (
            <li key={item.href} className="bg-bone p-5 flex flex-col">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-charcoal/60 mb-2">
                {String(i + 1).padStart(2, '0')} · {item.tag}
              </div>
              <Link
                href={item.href}
                className="font-display text-xl font-medium text-charcoal tracking-tight underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
      </DocSection>
    </DocPage>
  )
}
