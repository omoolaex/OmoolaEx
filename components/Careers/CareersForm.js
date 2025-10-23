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
    specificRole: '',
    education: '',
    message: '',
    resume: null,
    consent: false,
  })
  const [loading, setLoading] = useState(false)

  // Roles grouped under programmes
  const roleOptions = {
    Volunteer: [
      'Tech Community Volunteer',
      'Digital Training Volunteer',
      'Research & Innovation Volunteer',
      'Creative Design Volunteer',
      'Outreach & Communications Volunteer',
    ],
    Internship: [
      'Frontend Developer Intern',
      'Backend Developer Intern',
      'UI/UX Designer Intern',
      'Digital Marketing Intern',
      'Project Management Intern',
      'Graphics Designer Intern',
      'Content Writer Intern',
    ],
    Graduate: [
      'Graduate IT Consultant',
      'Graduate Software Engineer',
      'Graduate Cybersecurity Analyst',
      'Graduate Project Coordinator',
      'Graduate Business Analyst',
    ],
  }

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
      ...(name === 'roleType' ? { specificRole: '' } : {}), // reset when programme changes
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) {
      alert('Please accept the Privacy Policy to continue.')
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', form.fullName)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('portfolio', form.portfolio || 'N/A')
      formData.append('type', form.roleType)
      formData.append('specificRole', form.specificRole)
      formData.append('education', form.education)
      formData.append('message', form.message)
      if (form.resume) formData.append('resume', form.resume)

      const res = await fetch('/api/request-quote', { method: 'POST', body: formData })
      const result = await res.json()

      if (result.success) {
        alert('✅ Application submitted successfully!')
        setForm({
          fullName: '',
          email: '',
          phone: '',
          portfolio: '',
          roleType: '',
          specificRole: '',
          education: '',
          message: '',
          resume: null,
          consent: false,
        })
      } else {
        alert('❌ Submission failed. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('❌ Something went wrong. Please try again later.')
    }
    setLoading(false)
  }

  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12" id="careers-form">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Submit Your Application
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Apply for our Volunteer, Internship, or Graduate Trainee programmes and begin your journey with OmoolaEx.
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

            {/* Programme Selection */}
            <select
              name="roleType"
              value={form.roleType}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Select Programme</option>
              <option value="Volunteer">Volunteer Programme</option>
              <option value="Internship">Internship Programme</option>
              <option value="Graduate">Graduate Training Programme</option>
            </select>

            {/* Role under Programme */}
            {form.roleType && (
              <select
                name="specificRole"
                value={form.specificRole}
                onChange={handleChange}
                required
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Select Role</option>
                {roleOptions[form.roleType].map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            )}

            <select
              name="education"
              value={form.education}
              onChange={handleChange}
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:col-span-2"
            >
              <option value="">Education Level</option>
              <option value="Secondary School">Secondary School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Self-Taught">Self-Taught</option>
              <option value="Other">Other</option>
            </select>
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
