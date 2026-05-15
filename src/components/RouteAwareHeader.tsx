'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { HomeNav } from './home/HomeNav'

export function RouteAwareHeader() {
  const pathname = usePathname()
  if (pathname === '/') {
    return <HomeNav />
  }
  return <Header />
}
