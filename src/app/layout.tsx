import type { Metadata } from 'next'
import { Header, Footer } from '@/components'
import { site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  title: site.pages.home.title,
  description: site.pages.home.description,
  openGraph: {
    title: site.pages.home.title,
    description: site.pages.home.description,
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
