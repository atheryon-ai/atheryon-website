import type { Metadata } from 'next'
import { v2 } from '@/content/site'

const contact = v2.pages.contact

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
  openGraph: {
    title: contact.title,
    description: contact.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: contact.title,
    description: contact.description,
  },
  alternates: {
    canonical: 'https://atheryon.com.au/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
