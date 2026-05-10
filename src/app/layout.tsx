import type { Metadata } from 'next'
import { Header, Footer } from '@/components'
import { site } from '@/content/site'
import './globals.css'

// NOTE: Task 19 stub — original metadata pulled from `site.pages.home.{title,description}`,
// which was deleted with the legacy homepage. Task 20 will replace these with
// `site.pages.reality.{title,description}` (or whatever the new homepage block names them).
export const metadata: Metadata = {
  title: site.name,
  description: site.tagline,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: 'website',
    siteName: site.name,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-body antialiased">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
