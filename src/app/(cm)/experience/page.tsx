import type { Metadata } from 'next'
import { ArmChooser } from '@/components/ArmChooser'
import { DocBanner, DocFooter, DocPage, DocSection } from '@/components/Doc'
import { v3 } from '@/content/site'

// Chooser page (Terry 2026-08-09): experience is arm-scoped; this route
// stays live as a thin chooser between the two arms.
const page = v3.pages.experience
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
  alternates: { canonical: 'https://atheryon.com.au/experience' },
}

export default function ExperienceChooserPage() {
  return (
    <DocPage compact>
      <DocBanner label={s.hero.label} title={s.hero.title} body={s.hero.subtitle} />

      <DocSection>
        <ArmChooser items={s.links} />
      </DocSection>

      <DocFooter label="atheryon / experience / end-of-document" cta={{ ...v3.cta }} />
    </DocPage>
  )
}
