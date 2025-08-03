'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactMapForm() {
  const [form, setForm] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) {
      alert('You must accept the Privacy Policy.')
      return
    }

    setLoading(true)
    try {
      // Prepare FormData
      const formData = new FormData()
      formData.append('company', form.company)
      formData.append('name', form.name)
      formData.append('phone', form.phone)
      formData.append('email', form.email)
      formData.append('message', form.message)
      formData.append('type', 'Contact Form Inquiry')
      formData.append('budget', 'N/A')
      formData.append('timeline', 'N/A')
      formData.append('contactMethod', 'Any')

      // If you add file input in future:
      // formData.append('file', fileInput.files[0])

      const res = await fetch('/api/request-quote', {
        method: 'POST',
        body: formData, // No content-type header needed for FormData
      })

      const result = await res.json()
      if (result.success) {
        alert('✅ Your message has been sent!')
        setForm({ company: '', name: '', phone: '', email: '', message: '', consent: false })
      } else {
        alert('❌ Failed to send. Please try again.')
      }
    } catch (error) {
      console.error(error)
      alert('❌ Something went wrong.')
    }
    setLoading(false)
  }

  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in touch</h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto md:mx-0">
            Please feel free to get in touch with us via any convenient means (phone, WhatsApp, email, or contact form).
            We will be glad to answer your questions as soon as possible.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* === MAP === */}
          <div className="relative z-10 h-[400px] sm:h-[500px] md:h-[550px] lg:h-[700px] w-full lg:flex-[1.5] rounded-[1rem] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63414.382875904455!2d3.302495291416431!3d6.597241874618649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x103b922679c1e587%3A0xcf6fc79939b93046!2s26D%20Olowu%20St%2C%20Allen%2C%20Ikeja%20101233%2C%20Lagos!3m2!1d6.597147!2d3.3436421!5e0!3m2!1sen!2sng!4v1753379284848!5m2!1sen!2sng"
              className="absolute top-0 left-0 w-full h-full object-cover"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* === FORM === */}
          <motion.form
            onSubmit={handleSubmit}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-tl-[3rem] shadow-md p-6 sm:p-8 w-full lg:max-w-[500px] lg:-ml-32 z-20"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
              Connect With Your Next Great Hire Today!
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input name="company" value={form.company} onChange={handleChange}
                type="text" placeholder="Company"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input name="name" value={form.name} onChange={handleChange}
                type="text" placeholder="Your Name"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input name="phone" value={form.phone} onChange={handleChange}
                type="text" placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input name="email" value={form.email} onChange={handleChange}
                type="email" placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              name="message" value={form.message} onChange={handleChange}
              placeholder="Project Detail" rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <div className="flex items-start text-sm text-gray-600 mb-4">
              <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange}
                className="mt-1 mr-2 accent-blue-600" />
              <span>
                By sending this form I confirm that I have read and accept the{' '}
                <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit" disabled={loading}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:to-orange-600 transition text-white font-bold py-3 px-6 rounded-lg w-full"
            >
              {loading ? 'Sending...' : 'GET CONSULTATION →'}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}