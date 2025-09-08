'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CareersForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    roleType: '',
    education: '',
    preferredRole: '',
    message: '',
    resume: null,
    consent: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) {
      alert('You must accept the Privacy Policy to proceed.')
      return
    }

    setLoading(true)
    try {
      // Prepare FormData for multipart/form-data
      const formData = new FormData()
      formData.append('name', form.fullName)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('company', form.portfolio || 'N/A') // store LinkedIn/Portfolio
      formData.append('type', 'Career Application')
      formData.append('budget', form.roleType || 'N/A') // using "budget" as roleType
      formData.append('timeline', form.education || 'N/A') // using "timeline" as education level
      formData.append('contactMethod', form.preferredRole || 'Any')
      formData.append(
        'message',
        `Applicant Message:\n${form.message || 'N/A'}\nPortfolio: ${form.portfolio || 'N/A'}`
      )

      if (form.resume) {
        formData.append('resume', form.resume)
      }

      const res = await fetch('/api/request-quote', {
        method: 'POST',
        body: formData,
      })

      const result = await res.json()
      if (result.success) {
        alert('✅ Application submitted successfully!')
        setForm({
          fullName: '',
          email: '',
          phone: '',
          portfolio: '',
          roleType: '',
          education: '',
          preferredRole: '',
          message: '',
          resume: null,
          consent: false,
        })
      } else {
        alert('❌ Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('❌ Something went wrong.')
    }
    setLoading(false)
  }

  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Ready to Launch Your Career at OmoolaEx?
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Whether you&apos;re a student, intern, or a jobseeker ready for your next chapter,
            we are excited to connect.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-left bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Email Address"
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              placeholder="Phone Number"
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              type="url"
              placeholder="LinkedIn or Portfolio URL"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <select
              name="roleType"
              value={form.roleType}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">What are you applying for?</option>
              <option value="Internship">Internship</option>
              <option value="Graduate">Graduate Role</option>
              <option value="Experienced">Experienced Position</option>
              <option value="Freelance">Freelance/Contract</option>
            </select>
            <select
              name="education"
              value={form.education}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Education Level</option>
              <option value="Secondary School">Secondary School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Self-Taught">Self-Taught</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="preferredRole"
              value={form.preferredRole}
              onChange={handleChange}
              type="text"
              placeholder="Preferred Role (e.g., Frontend Developer, Design Intern)"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:col-span-2"
            />
          </div>

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Briefly introduce yourself and your interest in working with OmoolaEx"
            rows={5}
            className="mt-6 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* Resume Upload */}
          <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-600">
            <label className="block font-medium text-gray-700 mb-2">
              Upload Your Resume (optional)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full text-sm text-gray-600"
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
              I agree to the{' '}
              <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>{' '}
              and confirm my details are accurate.
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-gradient-to-r from-blue-400 to-blue-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg w-full transition"
          >
            {loading ? 'Submitting...' : 'Submit Application →'}
          </button>
        </motion.form>
      </div>
    </section>
  )
}