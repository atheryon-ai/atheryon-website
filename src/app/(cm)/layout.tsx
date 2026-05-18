import { Footer } from '@/components'
import { HomeNav } from '@/components/home'

/**
 * (cm) route group — the Capital Markets shell. Wraps the homepage and all
 * universal pages (about, contact, privacy, terms, roadmap) plus CM-specific
 * routes (themes, system, labs, offers).
 *
 * Route-group folders `(name)` don't affect URLs; they only scope the layout.
 * Each group renders its own HomeNav variant + Footer, so the correct shell
 * HTML is server-rendered at static-export build time (no FOUC).
 */
export default function CMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HomeNav mode="cm" />
      <main>{children}</main>
      <Footer />
    </>
  )
}
