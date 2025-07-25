'use client'

import { motion } from 'framer-motion'

export default function ContactMapForm() {
  return (
    <section className="relative py-20 px-4 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in touch</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Please feel free to get in touch with us via any convenient means (phone, WhatsApp, email, or contact form).
            We will be glad to answer your questions as soon as possible.
          </p>
        </div>

        {/* Map + Form Row */}
        <div className="relative flex flex-col md:flex-row items-start gap-0">
        {/* === MAP Embed === */}
        <div className="relative z-10 h-[650px] flex-[1.3]">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d63414.382875904455!2d3.302495291416431!3d6.597241874618649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x103b922679c1e587%3A0xcf6fc79939b93046!2s26D%20Olowu%20St%2C%20Allen%2C%20Ikeja%20101233%2C%20Lagos!3m2!1d6.597147!2d3.3436421!5e0!3m2!1sen!2sng!4v1753379284848!5m2!1sen!2sng"
            style={{
                width: '100%',
                height: '100%',
                borderBottomRightRadius: '8rem',
                borderBottomLeftRadius: '1rem',
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '0',
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute top-0 left-0 w-full h-full object-cover"
            ></iframe>
        </div>

        {/* === FORM === */}
        <motion.form
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 bg-white -ml-32 mt-10 md:mt-10 p-8 rounded-tl-[5rem] w-full max-w-[45%] flex-[1]"
            style={{
            borderTopLeftRadius: '5rem',
            borderTopRightRadius: '0',
            borderBottomRightRadius: '0',
            borderBottomLeftRadius: '0',
            boxShadow: 'none',
            }}
        >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Connect With Your Next Great Hire Today!
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Company"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              placeholder="Project Detail"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            ></textarea>

            <div className="flex items-start text-sm text-gray-600 mb-4">
              <input type="checkbox" className="mt-1 mr-2 accent-blue-600" />
              <span>
                By sending this form I confirm that I have read and accept the{' '}
                <a href="/privacy-policy" className="underline text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </a>
              </span>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:to-orange-600 transition text-white font-bold py-3 px-6 rounded-lg w-full"
            >
              GET CONSULTATION →
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}