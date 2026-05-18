import type { Metadata } from 'next'
import Link from 'next/link'
import { DocPage, DocBanner, DocSection } from '@/components'
import { site } from '@/content/site'

const { offers } = site.pages

export const metadata: Metadata = {
  title: 'Offers — Atheryon',
  description: 'Three commercial paths into the Atheryon platform: license the code, license the prompt archive, or engage Terry for a consult.',
  openGraph: {
    title: 'Offers — Atheryon',
    description: 'Three commercial paths into the Atheryon platform.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Offers — Atheryon',
    description: 'Three commercial paths into the Atheryon platform.',
  },
  alternates: { canonical: 'https://atheryon.com.au/offers' },
}

const OFFER_LINKS = [
  { href: '/offers/code', number: '01', title: 'Buy the code', blurb: offers.code.hero.lede },
  { href: '/offers/prompts', number: '02', title: 'License the prompts', blurb: offers.prompts.hero.lede },
  { href: '/offers/consult', number: '03', title: 'Consult', blurb: offers.consult.hero.lede },
] as const

export default function OffersPage() {
  return (
    <DocPage>
      <DocBanner
        label="atheryon / offers"
        title="Three commercial paths"
        body="The Atheryon platform is available as licensable code, as a directorial prompt archive, or as a senior-led consult engagement. Pick the one that matches how you want to absorb the work."
      />
      <DocSection label="§01 / Choose your path" title="">
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoal/15 border border-charcoal/15">
          {OFFER_LINKS.map((o) => (
            <li key={o.href} className="bg-bone p-6 flex flex-col">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-charcoal/60 mb-2">
                {o.number}
              </div>
              <Link
                href={o.href}
                className="font-display text-2xl font-medium text-charcoal tracking-tight underline-offset-4 hover:underline mb-3"
              >
                {o.title}
              </Link>
              <p className="text-base text-charcoal/80 leading-relaxed">{o.blurb}</p>
            </li>
          ))}
        </ul>
      </DocSection>
    </DocPage>
  )
}
