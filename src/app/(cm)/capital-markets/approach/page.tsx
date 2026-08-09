import type { Metadata } from 'next'
import { ArmSubNav } from '@/components/ArmSubNav'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

const page = v3.pages.cmApproach
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
  alternates: { canonical: 'https://atheryon.com.au/capital-markets/approach' },
}

export default function CmApproachPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />
      <ArmSubNav base="/capital-markets" />

      <DocSection label={s.examples.label} title={s.examples.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.examples.items.map((example) => (
            <li
              key={example.id}
              className="grid grid-cols-1 md:grid-cols-[minmax(16rem,0.5fr)_minmax(0,1.5fr)] gap-2 md:gap-8 py-6"
            >
              <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-charcoal leading-tight">
                {example.name}
              </h3>
              <p className="text-base md:text-lg text-charcoal/85 leading-relaxed max-w-3xl">
                {example.body}
              </p>
            </li>
          ))}
        </ol>
      </DocSection>

      <DocSection label={s.delivery.label} title={s.delivery.title}>
        <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed">
          {s.delivery.body}
        </p>
      </DocSection>

      <DocFooter label="atheryon / capital markets / approach / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
