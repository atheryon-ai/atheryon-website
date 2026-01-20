'use client'

import { useState } from 'react'
import { Hero, Section } from '@/components'
import { site } from '@/content/site'

const { contact } = site.pages

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact from ${formData.name} - ${formData.company || 'No company'}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
  }

  return (
    <>
      <Hero
        headline={contact.hero.headline}
        subheadline={contact.hero.subheadline}
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.company}
                onChange={handleChange}
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
                value={formData.message}
                onChange={handleChange}
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
