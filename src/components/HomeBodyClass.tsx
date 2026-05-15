'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function HomeBodyClass() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname === '/') {
      document.body.classList.add('home-v3')
    } else {
      document.body.classList.remove('home-v3')
    }
    return () => {
      document.body.classList.remove('home-v3')
    }
  }, [pathname])
  return null
}
