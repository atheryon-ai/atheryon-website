import { Footer } from '@/components'
import { HomeNav } from '@/components/home'

/**
 * (cm) route group — the firm shell. Wraps the homepage and all universal
 * pages (about, contact, privacy, terms) plus the function-2 depth routes
 * (themes, system, labs, offers). The group name is historical: it predates
 * the two-function IA and is kept because route-group folders do not affect
 * URLs and renaming it would touch every page in the tree.
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
