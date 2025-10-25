'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    reason: '',
    projectType: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    attachment: null,
    consent: false,
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const enquiryReasons = [
    'General Inquiry',
    'Request IT Consulting',
    'Partnership / Collaboration',
    'Press / Media',
    'Careers / Volunteering',
    'Other',
  ]

  const projectTypes = [
    'IT Strategy & Digital Transformation',
    'Custom Software Development',
    'Cloud & Infrastructure',
    'Cybersecurity & Risk',
    'Data Analytics & Automation',
    'Brand & Digital Growth',
    'Not sure / Need advice',
  ]

  const budgets = [
    'Below ₦500,000',
    '₦500,000 - ₦2,000,000',
    '₦2,000,000 - ₦5,000,000',
    'Above ₦5,000,000',
    'Not sure / NDA first',
  ]

  const timelines = [
    'Flexible',
    'Within 1 month',
    '1-3 months',
    '3+ months',
    'ASAP',
  ]

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
      ...(name === 'reason' ? { projectType: '', budget: '', timeline: '', attachment: null } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) {
      alert('Please accept the Privacy Policy to continue.')
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('phone', form.phone || 'N/A')
      formData.append('company', form.company || 'N/A')
      formData.append('website', form.website || 'N/A')
      formData.append('reason', form.reason || 'General Inquiry')
      formData.append('projectType', form.projectType || 'N/A')
      formData.append('subject', form.subject || 'N/A')
      formData.append('message', form.message || 'N/A')
      formData.append('budget', form.budget || 'N/A')
      formData.append('timeline', form.timeline || 'N/A')
      if (form.attachment) formData.append('attachment', form.attachment)

      const res = await fetch('/api/contact', { method: 'POST', body: formData })
      const json = await res.json()

      if (json.success) {
        setStatus({ type: 'success', message: '✅ Message sent. We will be in touch shortly.' })
        setForm({
          name: '',
          email: '',
          phone: '',
          company: '',
          website: '',
          reason: '',
          projectType: '',
          subject: '',
          message: '',
          budget: '',
          timeline: '',
          attachment: null,
          consent: false,
        })
      } else {
        setStatus({ type: 'error', message: json.message || '❌ Submission failed. Try again.' })
      }
    } catch (err) {
      console.error('Contact submit error', err)
      setStatus({ type: 'error', message: '❌ Something went wrong. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  // Helper to decide whether to expand project fields
  const expandForProject = form.reason === 'Request IT Consulting' || form.reason === 'Partnership / Collaboration'

  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12" id="contact-form">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">Get in touch</h2>
          <p className="mt-3 text-gray-600 text-center">
            Tell us briefly about your needs — pick a reason and we&apos;ll guide the next steps.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              required
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              type="email"
              required
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone (optional)"
              type="tel"
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company / Organization (optional)"
              className="p-3 border border-gray-300 rounded-lg w-full"
            />
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="Website (optional)"
              type="url"
              className="p-3 border border-gray-300 rounded-lg w-full md:col-span-2"
            />

            <select
              name="reason"
              value={form.reason}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg w-full"
            >
              <option value="">Reason for contact</option>
              {enquiryReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* Project type appears when appropriate */}
            <div className="w-full">
              {expandForProject ? (
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  required
                  className="p-3 border border-gray-300 rounded-lg w-full"
                >
                  <option value="">Select service of interest</option>
                  {projectTypes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject (optional)"
                  className="p-3 border border-gray-300 rounded-lg w-full"
                />
              )}
            </div>

            {/* If expanded for project we show budget & timeline fields */}
            {expandForProject && (
              <>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg w-full"
                >
                  <option value="">Budget range (optional)</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg w-full"
                >
                  <option value="">Timeline / urgency</option>
                  {timelines.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message — tell us what you need (required)"
            rows={6}
            required
            className="mt-4 p-3 border border-gray-300 rounded-lg w-full"
          />

          {/* Attachment (optional) */}
          <div className="mt-4 border-2 border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-600">
            <label className="block font-medium text-gray-700 mb-2">Attachment (optional)</label>
            <input
              type="file"
              name="attachment"
              accept=".pdf,.doc,.docx,.ppt,.zip"
              onChange={handleChange}
              className="w-full text-sm"
            />
          </div>

          <div className="flex items-start text-sm text-gray-600 mt-4">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1 mr-2 accent-blue-600"
              required
            />
            <span>
              {"I consent to OmoolaEx storing my data in line with the "}
              <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
              {"."}
            </span>
          </div>

          {status && (
            <div
              className={`mt-4 p-3 rounded ${status.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}
            >
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-gradient-to-r from-blue-400 to-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message →'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
