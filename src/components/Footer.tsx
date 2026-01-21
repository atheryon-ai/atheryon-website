import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/content/site'
import { TechPartnerLogos } from './ClientLogos'

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section - Dark with subtle gradient */}
      <div className="px-6 py-20 md:py-28">
        <div className="max-w-container mx-auto">
          <div className="relative bg-neutral-900 rounded-3xl px-8 py-16 md:px-16 md:py-20 overflow-hidden">
            {/* Subtle gradient accents */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-atheryon-blue/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Ready to turn potential into{' '}
                <span className="text-brand-orange">production?</span>
              </h2>
              <p className="text-lg text-neutral-400 mb-10 leading-relaxed">
                {site.pages.home.finalCta.text}
              </p>
              <Link
                href={site.pages.home.finalCta.cta.href}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-neutral-900 bg-white rounded-full hover:bg-warm-100 transition-all shadow-button hover:shadow-button-hover"
              >
                {site.pages.home.finalCta.cta.label}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links Section - Minimal */}
      <div className="bg-warm-100 border-t border-neutral-500/10">
        <div className="max-w-container mx-auto px-6 py-16 md:py-20">
          {/* Tech Partners */}
          <div className="mb-16">
            <TechPartnerLogos />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-xl shadow-soft overflow-hidden border border-neutral-500/10">
                  <Image
                    src="/logo.png"
                    alt={site.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <span className="font-semibold text-xl text-neutral-900 tracking-tight">
                  {site.name}
                </span>
              </Link>
              <p className="text-neutral-600 leading-relaxed max-w-sm mb-6">
                {site.tagline}
              </p>
              <div className="flex items-center gap-4">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/TsakirisTerence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-neutral-500/10 flex items-center justify-center text-neutral-500 hover:text-atheryon-blue hover:border-atheryon-blue/30 transition-all shadow-soft"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* Email */}
                <a
                  href={`mailto:${site.email}`}
                  className="w-10 h-10 rounded-full bg-white border border-neutral-500/10 flex items-center justify-center text-neutral-500 hover:text-atheryon-blue hover:border-atheryon-blue/30 transition-all shadow-soft"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-5 tracking-tight">Services</h4>
              <ul className="space-y-3">
                {site.footer.links.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-5 tracking-tight">Resources</h4>
              <ul className="space-y-3">
                {site.footer.links.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-neutral-900 mb-5 tracking-tight">Company</h4>
              <ul className="space-y-3">
                {site.footer.links.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar - Minimal */}
          <div className="mt-16 pt-8 border-t border-neutral-500/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              {site.footer.legal.copyright}
            </p>
            <div className="flex gap-6">
              {site.footer.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
