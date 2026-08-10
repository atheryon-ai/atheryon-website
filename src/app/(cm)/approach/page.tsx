import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

// Chooser page (Terry 2026-08-09): approach is arm-scoped; this route
// stays live as a thin chooser between the two arms.
const page = v3.pages.approach
const s = page.sections

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/approach' },
}

export default function ApproachChooserPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      <DocSection>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.links.map((link) => (
            <li key={link.href} className="grid grid-cols-1 sm:grid-cols-[18rem_1fr] gap-2 sm:gap-6 py-6">
              <Link
                href={link.href}
                className="font-display text-xl md:text-2xl font-medium text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-colors w-fit"
              >
                {link.label}
              </Link>
              <p className="text-base text-charcoal/75 leading-relaxed">{link.note}</p>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocFooter label="atheryon / approach / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
