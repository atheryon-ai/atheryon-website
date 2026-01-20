import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/content/site'

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-slate-900 rounded-[2.5rem] px-8 py-16 md:px-16 md:py-20 overflow-hidden">
            {/* Background gradient blobs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-blue/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
                Ready to turn potential into{' '}
                <span className="text-gradient-orange">production?</span>
              </h2>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                {site.pages.home.finalCta.text}
              </p>
              <Link
                href={site.pages.home.finalCta.cta.href}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl"
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

      {/* Footer Links Section */}
      <div className="bg-white border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-xl shadow-card overflow-hidden border border-slate-100">
                  <Image
                    src="/logo.png"
                    alt={site.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
                  {site.name}
                </span>
              </Link>
              <p className="text-slate-600 leading-relaxed max-w-sm mb-6">
                {site.footer.description}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {site.email}
              </a>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="font-display font-semibold text-slate-900 mb-5 tracking-tight">Services</h4>
              <ul className="space-y-3">
                {site.footer.links.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-display font-semibold text-slate-900 mb-5 tracking-tight">Resources</h4>
              <ul className="space-y-3">
                {site.footer.links.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-display font-semibold text-slate-900 mb-5 tracking-tight">Company</h4>
              <ul className="space-y-3">
                {site.footer.links.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              {site.footer.legal.copyright}
            </p>
            <div className="flex gap-6">
              {site.footer.legal.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
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
