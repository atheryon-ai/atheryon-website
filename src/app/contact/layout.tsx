import type { Metadata } from 'next'
import { site } from '@/content/site'

const { contact } = site.pages

export const metadata: Metadata = {
  title: contact.title,
  description: contact.description,
  openGraph: {
    title: contact.title,
    description: contact.description,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
