import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-bone border-t border-charcoal/10 py-10">
      <div className="max-w-container mx-auto px-6 flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center justify-between text-sm text-charcoal/70">
        <div className="font-display text-xl text-charcoal">Atheryon</div>
        <nav className="flex gap-2 -mx-3">
          <Link href="/contact" className="inline-block px-3 py-3 hover:text-charcoal">Contact</Link>
          <Link href="/privacy" className="inline-block px-3 py-3 hover:text-charcoal">Privacy</Link>
          <a href="https://www.linkedin.com/in/terencetsakiris/" className="inline-block px-3 py-3 hover:text-charcoal">LinkedIn</a>
        </nav>
        <div>© {year} Atheryon</div>
      </div>
    </footer>
  )
}
