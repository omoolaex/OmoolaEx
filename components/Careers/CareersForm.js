'use client'

import { motion } from 'framer-motion'

export default function CareersForm() {
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-left bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Full Name"
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="url"
              placeholder="LinkedIn or Portfolio URL"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            />
            <select
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">What are you applying for?</option>
              <option value="internship">Internship</option>
              <option value="graduate">Graduate Role</option>
              <option value="experienced">Experienced Position</option>
              <option value="freelance">Freelance/Contract</option>
            </select>
            <select
              required
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full"
            >
              <option value="">Education Level</option>
              <option value="secondary">Secondary School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="self-taught">Self-Taught</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Preferred Role (e.g., Frontend Developer, Design Intern)"
              className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-full md:col-span-2"
            />
          </div>

          <textarea
            placeholder="Briefly introduce yourself and your interest in working with OmoolaEx"
            rows={5}
            className="mt-6 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <div className="flex items-start text-sm text-gray-600 mt-4">
            <input type="checkbox" className="mt-1 mr-2 accent-blue-600" required />
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
            className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg w-full transition"
          >
            Submit Application →
          </button>
        </motion.form>
      </div>
    </section>
  )
}
