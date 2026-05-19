import type { Metadata } from 'next'
import { MaHero, MaWhenClientsCallUs, MaStrip } from '@/components/ma'
import { HomeWritingStrip } from '@/components/home'
import { v2Ma } from '@/content/site'

const page = v2Ma.home

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  openGraph: { title: page.title, description: page.description },
  twitter: {
    card: 'summary_large_image',
    title: page.title,
    description: page.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/ma' },
}

// ─────────────────────────────────────────────────────────────────────────────
// /ma — M&A practice landing. Consulting-archetype marketing landing (not the
// /system-shaped tech landing). M&A is senior-led advisory + embedded
// execution, not a productized AI platform; the page is structured to
// signal that (text-led hero, senior-specialist panel, no system diagram).
// Deep methodology + Anna Contos full bio + workflow examples live on
// /ma/approach (the M&A equivalent of /system for CM).
// ─────────────────────────────────────────────────────────────────────────────

export default function MaHomePage() {
  return (
    <>
      <MaHero />
      <MaWhenClientsCallUs />
      <MaStrip />
      <HomeWritingStrip />
    </>
  )
}
