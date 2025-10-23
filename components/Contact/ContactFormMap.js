'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ContactForm() {
  const [form, setForm] = useState({ company: '', name: '', phone: '', email: '', message: '', consent: false })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.consent) return alert('You must accept the Privacy Policy.')
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([k,v]) => formData.append(k,v))
      formData.append('type','Contact Form Inquiry')
      const res = await fetch('/api/request-quote',{ method:'POST', body:formData })
      const result = await res.json()
      if(result.success){ 
        alert('✅ Your message has been sent!')
        setForm({ company: '', name: '', phone: '', email: '', message: '', consent: false })
      } else alert('❌ Failed to send.')
    } catch(err){ console.error(err); alert('❌ Something went wrong.') }
    setLoading(false)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity:0, y:20 }}
      whileInView={{ opacity:1, y:0 }}
      transition={{ duration:0.5 }}
      className="bg-gray-50 rounded-2xl p-8 sm:p-10 shadow-lg max-w-3xl mx-auto flex flex-col gap-4"
    >
      <h3 className="text-3xl font-bold text-gray-900 text-center mb-6">Get In Touch</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full text-base"
        />
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full text-base"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full text-base"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full text-base"
        />
      </div>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        placeholder="Project Detail"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
      />

      <label className="flex items-start text-sm text-gray-600 mt-2">
        <input
          type="checkbox"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          className="mt-1 mr-2 accent-blue-600"
        />
        <span>
          By sending this form, I confirm that I have read and accept the <Link href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800">Privacy Policy</Link>
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg mt-4 w-auto justify-center text-base transition"
      >
        {loading ? 'Sending...' : 'Submit Inquiry →'}
      </button>
    </motion.form>
  )
}
