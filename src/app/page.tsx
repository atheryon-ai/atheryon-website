import type { Metadata } from 'next'
import {
  HomeHero,
  BuiltForGrid,
  HomeStrip,
  ReferenceSystemCTA,
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

// Inline server-rendered style block applies the dark navy theme before
// hydration. Eliminates the FOUC the JS-toggled body.home-v3 class caused.
// When React unmounts this page (navigating to an interior route), the style
// tag is removed and the interior pages' bone/charcoal palette takes over.
const homepageStyles = `
  body { background: #060b1c !important; color: #ffffff; font-family: 'Inter', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
  body::before {
    content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background:
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.10), transparent 60%),
      radial-gradient(ellipse 60% 40% at 50% 30%, rgba(59, 130, 246, 0.06), transparent 70%);
  }
`

export default function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: homepageStyles }} />
      <HomeHero />
      <BuiltForGrid />
      <HomeStrip />
      <ReferenceSystemCTA />
    </>
  )
}
