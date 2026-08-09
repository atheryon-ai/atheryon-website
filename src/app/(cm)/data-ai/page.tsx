import type { Metadata } from 'next'
import Link from 'next/link'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

const page = v3.pages.dataAi
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
  alternates: { canonical: 'https://atheryon.com.au/data-ai' },
}

export default function DataAiPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      {([s.data, s.transformation, s.ai] as const).map((section) => (
        <DocSection key={section.title} label={section.label} title={section.title}>
          <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
            {section.body}
          </p>
        </DocSection>
      ))}

      <DocSection label={s.arms.label} title={s.arms.title}>
        <ul className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.arms.links.map((link) => (
            <li key={link.href} className="grid grid-cols-1 sm:grid-cols-[12rem_1fr] gap-2 sm:gap-6 py-5">
              <Link
                href={link.href}
                className="font-display text-lg md:text-xl font-medium text-charcoal border-b border-charcoal/30 hover:border-charcoal transition-colors w-fit"
              >
                {link.label}
              </Link>
              <p className="text-base text-charcoal/75 leading-relaxed">{link.note}</p>
            </li>
          ))}
        </ul>
      </DocSection>

      <DocFooter label="atheryon / data-ai / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
