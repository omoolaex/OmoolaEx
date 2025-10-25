'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CareersForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    roleType: '', // Programme
    programmeType: '', // Programme Type
    specificRole: '', // Role
    education: '',
    message: '',
    resume: null,
    consent: false,
  })

  const [loading, setLoading] = useState(false)

  // --- Role hierarchy ---
  const roleOptions = {
    Volunteer: {
      'Technology & Engineering': [
        'Frontend Development Volunteer',
        'Backend Development Volunteer',
        'Cybersecurity Volunteer',
        'Technical Support Volunteer',
        'Software Testing Volunteer',
      ],
      'Research & Innovation': [
        'Technology Research Volunteer',
        'Data & Insights Volunteer',
        'Innovation Programme Support Volunteer',
      ],
      'Creative & Content': [
        'Content Writing Volunteer',
        'Graphics Design Volunteer',
        'Video Editing Volunteer',
        'UI/UX Design Volunteer',
      ],
      'Digital Engagement & Community': [
        'Digital Marketing Volunteer',
        'Outreach & Communications Volunteer',
        'Community Engagement Volunteer',
        'Events Coordination Volunteer',
      ],
    },
    Internship: {
      'Technology & Engineering': [
        'Frontend Developer Intern',
        'Backend Developer Intern',
        'Cybersecurity Intern',
        'Software Testing Intern',
      ],
      'Creative & Content': [
        'UI/UX Designer Intern',
        'Graphics Designer Intern',
        'Content Writer Intern',
      ],
      'Digital & Business': [
        'Digital Marketing Intern',
        'Project Management Intern',
        'Business Analyst Intern',
      ],
    },
    Graduate: {
      'Technology & Consulting': [
        'Graduate IT Consultant',
        'Graduate Software Engineer',
        'Graduate Cybersecurity Analyst',
      ],
      'Project & Business': [
        'Graduate Project Coordinator',
        'Graduate Business Analyst',
        'Graduate Operations Analyst',
      ],
    },
  }

  // --- Handle Input Changes ---
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
      ...(name === 'roleType' ? { programmeType: '', specificRole: '' } : {}),
      ...(name === 'programmeType' ? { specificRole: '' } : {}),
    }))
  }

  // --- Handle Submit ---
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
      formData.append('linkedin', form.portfolio || 'N/A')
      formData.append(
        'position',
        `${form.roleType} / ${form.programmeType} / ${form.specificRole}`
      )
      formData.append('education', form.education)
      formData.append('coverLetter', form.message || 'N/A')
      if (form.resume) formData.append('resume', form.resume)

      const res = await fetch('/api/job-apply', { method: 'POST', body: formData })
      const result = await res.json()

      if (result.success) {
        alert('✅ Application submitted successfully!')
        setForm({
          fullName: '',
          email: '',
          phone: '',
          portfolio: '',
          roleType: '',
          programmeType: '',
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
            Apply for our Volunteer, Internship, or Graduate Trainee programmes and begin your
            journey with OmoolaEx.
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
            {/* Basic Info */}
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

            {/* Programme Type Selection */}
            {form.roleType && (
              <select
                name="programmeType"
                value={form.programmeType}
                onChange={handleChange}
                required
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Select Programme Type</option>
                {Object.keys(roleOptions[form.roleType]).map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            )}

            {/* Specific Role */}
            {form.programmeType && (
              <select
                name="specificRole"
                value={form.specificRole}
                onChange={handleChange}
                required
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">Select Role</option>
                {roleOptions[form.roleType][form.programmeType].map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            )}

            {/* Education */}
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

          {/* Message */}
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

          {/* Consent */}
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
              <a
                href="/privacy-policy"
                className="underline text-blue-600 hover:text-blue-800"
              >
                Privacy Policy
              </a>{' '}
              and confirm my details are accurate.
            </span>
          </div>

          {/* Submit */}
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
