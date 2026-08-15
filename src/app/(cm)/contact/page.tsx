import type { Metadata } from 'next'
import { ArmChooser } from '@/components/ArmChooser'
import { DocBanner, DocPage, DocSection } from '@/components/Doc'
import { site, v3 } from '@/content/site'

// Chooser page (Terry 2026-08-09): contact is arm-scoped; this route stays
// live as the neutral DISCUSS target choosing between the two arms.
const page = v3.pages.contact
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
  alternates: { canonical: 'https://atheryon.com.au/contact' },
}

export default function ContactChooserPage() {
  return (
    <DocPage compact>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.body} />

      <DocSection>
        <ArmChooser items={s.links} />
      </DocSection>

      <section>
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-sm text-charcoal underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </div>
      </section>
    </DocPage>
  )
}
