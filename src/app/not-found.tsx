import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection, Footer } from '@/components'
import { HomeNav } from '@/components/home'

export const metadata: Metadata = {
  title: 'Page not found — Atheryon',
  description: 'The page you requested does not exist on atheryon.com.au.',
  robots: { index: false, follow: false },
}

const NAV = [
  // Same places the header lists, in the same order, then the firm-level
  // pages. This list had drifted behind an earlier IA: it offered no Capital
  // Markets and no Data & AI, so two of the three header destinations were
  // unreachable from a 404.
  { label: 'Home', tag: 'Atheryon home', href: '/' },
  { label: 'M&A', tag: 'Making Transactions Executable', href: '/ma' },
  { label: 'Capital Markets', tag: 'Systems, data and delivery', href: '/capital-markets' },
  { label: 'Data & AI', tag: 'The foundation under both arms', href: '/data-ai' },
  { label: 'Experience', tag: 'Representative experience', href: '/experience' },
  { label: 'Approach', tag: 'Method and governance', href: '/approach' },
  { label: 'About', tag: 'Story and co-founders', href: '/about' },
  { label: 'Writing', tag: 'Essays from the practice', href: '/blog' },
  { label: 'Contact', tag: 'Discuss a situation', href: '/contact' },
] as const

/**
 * 404 page lives at the app root (outside any route group), so it inherits the
 * minimal root layout — no shell. We wrap with HomeNav + Footer directly,
 * defaulting to the CM shell since 404 is universal. Visitors who hit a bad URL
 * still get the brand + a path back into the IA.
 */
export default function NotFound() {
  return (
    <>
      <HomeNav mode="cm" />
      <main>
        <DocPage>
          <DocBanner
            label="atheryon / 404 / not-found"
            title="That page is not on the map."
            body="The URL you followed does not match a known page on atheryon.com.au."
          />

          <DocSection label="Navigation">
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
      </main>
      <Footer />
    </>
  )
}
