import { Section, ClientLogos } from '@/components'
import { site } from '@/content/site'

const { contact } = site.pages

export default function ContactPage() {
  return (
    <>
      {/* Custom hero with reduced height and accent word */}
      <section className="relative py-16 md:py-24 overflow-hidden pt-28 md:pt-36">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-gradient-warm" />

        {/* Subtle decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-atheryon-blue/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-display font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            {contact.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-subheading text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {contact.hero.subheadline}
          </p>

          {/* Client Logos */}
          <div className="mt-12 pt-8 border-t border-neutral-500/10">
            <ClientLogos />
          </div>
        </div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form - native HTML submission to Formspree */}
          <form
            action="https://formspree.io/f/xdkdynak"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {contact.form.fields.name.label} {contact.form.fields.name.required && <span className="text-gray-400">*</span>}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required={contact.form.fields.name.required}
                placeholder={contact.form.fields.name.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {contact.form.fields.email.label} {contact.form.fields.email.required && <span className="text-gray-400">*</span>}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required={contact.form.fields.email.required}
                placeholder={contact.form.fields.email.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                {contact.form.fields.company.label}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder={contact.form.fields.company.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-shadow"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                {contact.form.fields.message.label} {contact.form.fields.message.required && <span className="text-gray-400">*</span>}
              </label>
              <textarea
                id="message"
                name="message"
                required={contact.form.fields.message.required}
                placeholder={contact.form.fields.message.placeholder}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-shadow resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-base font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {contact.form.submitLabel}
            </button>
          </form>

          {/* What to Include */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {contact.whatToInclude.title}
            </h3>
            <ul className="space-y-3 mb-8">
              {contact.whatToInclude.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>

            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">{contact.alternative.text}</p>
              <a
                href={`mailto:${contact.alternative.email}`}
                className="text-gray-900 font-medium hover:underline"
              >
                {contact.alternative.email}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
