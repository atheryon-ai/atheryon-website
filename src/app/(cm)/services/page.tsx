import type { Metadata } from 'next'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'
import { isPending } from '@/lib/pending'

const page = v3.pages.services
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
  alternates: { canonical: 'https://atheryon.com.au/services' },
}

export default function ServicesPage() {
  return (
    <DocPage>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      <DocSection label={s.lines.label} title={s.lines.title}>
        <ol className="border-y border-charcoal/15 divide-y divide-charcoal/15">
          {s.lines.items.map((line) => (
            <li key={line.id} id={line.id} className="py-10 md:py-12 scroll-mt-24">
              <div className="font-mono text-xs tabular-nums tracking-[0.18em] text-charcoal/50 mb-3">
                {line.index}
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-charcoal leading-tight mb-3">
                {line.name}
              </h3>
              <p className="max-w-3xl text-base md:text-lg text-charcoal/85 leading-relaxed mb-8">
                {line.tagline}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15">
                  {line.items.map((item) => (
                    <li key={item} className="py-3 font-mono text-sm text-charcoal">
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="space-y-6 text-base text-charcoal/85 leading-relaxed">
                  {line.body.split('\n\n').map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </DocSection>

      {!isPending(s.engagement.body) && (
        <DocSection label={s.engagement.label} title={s.engagement.title}>
          <div className="max-w-3xl space-y-6 text-base md:text-lg text-charcoal/85 leading-relaxed">
            {s.engagement.body.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </DocSection>
      )}

      <DocFooter label="atheryon / services / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
