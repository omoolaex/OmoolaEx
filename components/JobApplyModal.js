'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function JobApplyModal({ show, onClose, jobTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: jobTitle || '',
    linkedin: '',
    resume: null,
    coverLetter: '',
  })
  const [loading, setLoading] = useState(false)

  const backdropRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare multipart/form-data
      const payload = new FormData()
      payload.append('name', formData.name)
      payload.append('email', formData.email)
      payload.append('phone', formData.phone)
      payload.append('company', formData.linkedin || 'N/A') // storing LinkedIn as company
      payload.append('type', 'Job Application')
      payload.append('budget', formData.position || jobTitle || 'N/A') // using budget for role/position
      payload.append('timeline', 'N/A')
      payload.append('contactMethod', 'Any')
      payload.append('message', `Cover Letter:\n${formData.coverLetter || 'N/A'}`)

      if (formData.resume) {
        payload.append('resume', formData.resume)
      }

      const res = await fetch('/api/request-quote', {
        method: 'POST',
        body: payload,
      })

      const result = await res.json()
      if (result.success) {
        alert('✅ Application submitted successfully!')
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: jobTitle || '',
          linkedin: '',
          resume: null,
          coverLetter: '',
        })
        onClose()
      } else {
        alert('❌ Failed to submit. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('❌ Something went wrong while submitting.')
    }
    setLoading(false)
  }

  const handleOutsideClick = (e) => {
    if (backdropRef.current && e.target === backdropRef.current) {
      onClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={backdropRef}
          onClick={handleOutsideClick}
          className="fixed inset-0 z-50 backdrop-blur-md bg-black/20 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={onClose}
              aria-label="Close"
            >
              &times;
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Apply for {jobTitle}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              We’re excited to learn more about you. Please complete the form below.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="linkedin"
                placeholder="LinkedIn or Portfolio URL"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />

              {/* Styled File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-sm text-gray-600">
                <label className="block font-medium text-gray-700 mb-2">
                  Upload Your Resume (PDF, DOC)
                </label>
                <input
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleChange}
                  required
                  className="w-full text-sm text-gray-600"
                />
              </div>

              <textarea
                name="coverLetter"
                placeholder="Why do you want to join OmoolaEx?"
                rows="4"
                value={formData.coverLetter}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-semibold py-3 rounded-lg transition cursor-pointer"
              >
                {loading ? 'Submitting...' : 'Submit Application →'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}