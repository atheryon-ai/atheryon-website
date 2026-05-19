import type { Metadata } from 'next'
import {
  HomeHero,
  BuiltForGrid,
  HomeStrip,
  ReferenceSystemCTA,
  HomeWritingStrip,
} from '@/components/home'
import { v2 } from '@/content/site'

const home = v2.pages.home

export const metadata: Metadata = {
  title: home.title,
  description: home.description,
  openGraph: { title: home.title, description: home.description },
  twitter: {
    card: 'summary_large_image',
    title: home.title,
    description: home.description,
  },
  alternates: { canonical: 'https://atheryon.com.au/' },
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BuiltForGrid />
      <HomeStrip />
      <ReferenceSystemCTA />
      <HomeWritingStrip />
    </>
  )
}
