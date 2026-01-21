'use client'

import { useEffect, useRef, useState } from 'react'

interface ClientCanvasProps {
  className?: string
}

// Logo images stored locally in /public/logos/clients/
// Set enabled: true/false to toggle each logo
const allLogos = [
  {
    name: 'Microsoft',
    url: '/logos/clients/microsoft.svg',
    scale: 0.85,
    enabled: false,
  },
  {
    name: 'S&P Global',
    url: '/logos/clients/sp-global.svg',
    scale: 0.55,
    enabled: false,
  },
  {
    name: 'Westpac',
    url: '/logos/clients/westpac.svg',
    scale: 0.6,
    enabled: false,
  },
  {
    name: 'CBA',
    url: '/logos/clients/cba.svg',
    scale: 1,
    enabled: false,
  },
  {
    name: 'Credit Suisse',
    url: '/logos/clients/credit-suisse.svg',
    scale: 2.4,
    enabled: false,
  },
  {
    name: 'Barclays',
    url: '/logos/clients/barclays.svg',
    scale: 1,
    enabled: false,
  },
]

const logoUrls = allLogos.filter((logo) => logo.enabled)

export function ClientCanvas({ className = '' }: ClientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const offsetRef = useRef(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [imagesLoaded, setImagesLoaded] = useState(false)

  useEffect(() => {
    // Load all logo images
    let loadedCount = 0
    const images: HTMLImageElement[] = []

    logoUrls.forEach((logo, index) => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        if (loadedCount === logoUrls.length) {
          imagesRef.current = images
          setImagesLoaded(true)
        }
      }
      img.onerror = () => {
        // If image fails, still count it
        loadedCount++
        if (loadedCount === logoUrls.length) {
          imagesRef.current = images
          setImagesLoaded(true)
        }
      }
      img.src = logo.url
      images[index] = img
    })
  }, [])

  useEffect(() => {
    if (!imagesLoaded) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const spacing = 180
      const totalWidth = logoUrls.length * spacing
      const logoHeight = 28
      const y = (rect.height - logoHeight) / 2

      // Smooth scrolling
      offsetRef.current = (offsetRef.current + 0.5) % totalWidth

      // Apply grayscale filter
      ctx.filter = 'grayscale(100%) opacity(60%)'

      // Draw logos twice for seamless loop
      for (let i = 0; i < 3; i++) {
        imagesRef.current.forEach((img, index) => {
          if (!img.complete || img.naturalWidth === 0) return

          const scale = logoUrls[index].scale
          const scaledHeight = logoHeight * scale
          const aspectRatio = img.naturalWidth / img.naturalHeight
          const drawWidth = scaledHeight * aspectRatio
          const lx = (index * spacing) + (i * totalWidth) - offsetRef.current + 40
          const ly = y + (logoHeight - scaledHeight) / 2 // Center vertically

          if (lx > -spacing && lx < rect.width + spacing) {
            ctx.drawImage(img, lx, ly, drawWidth, scaledHeight)
          }
        })
      }

      ctx.filter = 'none'
      animationRef.current = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [imagesLoaded])

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-10"
        style={{ width: '100%', height: '40px' }}
      />
    </div>
  )
}
