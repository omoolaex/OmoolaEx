'use client'

import { motion } from 'framer-motion'

export default function ContactMapForm() {
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

        {/* Map + Form */}
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
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-tl-[3rem] shadow-md p-6 sm:p-8 w-full lg:max-w-[500px] lg:-ml-32 z-20"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
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