import type { Metadata } from 'next'
import { ModeSetter } from '@/components/ModeSetter'
import { site, v2 } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://atheryon.com.au'),
  title: v2.pages.home.title,
  description: v2.pages.home.description,
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
    title: v2.pages.home.title,
    description: v2.pages.home.description,
    type: 'website',
    siteName: site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: v2.pages.home.title,
    description: v2.pages.home.description,
  },
}

/**
 * Root layout — minimal shell. The HomeNav + Footer live inside route-group
 * layouts ((cm), ma, mortgages) so each practice gets server-rendered nav +
 * CTA + accent. ModeSetter stays here because it still drives the
 * `data-mode` CSS variable for accent colours across all groups.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ModeSetter />
        {children}
      </body>
    </html>
  )
}
