'use client'

import { motion } from 'framer-motion'

export default function CareersForm() {
  return (
    <section className="bg-gray-100 py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Can&rsquo;t find a role? We&rsquo;d still love to hear from you!
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Join our talent network and we&rsquo;ll reach out when the right opportunity comes up.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-left bg-white p-8 rounded-2xl shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="text"
              placeholder="LinkedIn or Portfolio URL"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <textarea
            placeholder="Tell us a little about yourself"
            rows={5}
            className="mt-6 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <div className="flex items-start text-sm text-gray-600 mt-4">
            <input type="checkbox" className="mt-1 mr-2 accent-blue-600" />
            <span>
              By submitting this form, you accept our{' '}
              <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800">
                privacy policy
              </a>
              .
            </span>
          </div>

          <button
            type="submit"
            className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg w-full transition"
          >
            Submit Your Interest →
          </button>
        </motion.form>
      </div>
    </section>
  )
}