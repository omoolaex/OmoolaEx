'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-b from-[#f8fbff] via-white to-white py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Radial gradient circles */}
        <div className="absolute -top-40 -left-20 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-blue-100 opacity-30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] bg-purple-100 opacity-20 rounded-full blur-[120px]" />

        {/* SVG grid pattern */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#dbeafe" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center px-4 sm:px-6 md:px-12">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-72 sm:h-96 md:h-[600px] lg:h-[650px] overflow-hidden rounded-tr-md rounded-br-[7rem] rounded-bl-md shadow-lg"
        >
          <Image
            src="/images/cta-banner.png"
            alt="Let's Build"
            fill
            className="object-cover rounded-tr-md rounded-br-[3rem] rounded-bl-md"
            priority
          />
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full z-30 max-w-md mx-auto md:mx-0 -mt-2 md:-ml-20 bg-white rounded-xl p-6 sm:p-8 shadow-md"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 sm:mb-4">
            Let’s Build Something Great
          </h2>
          <p className="text-gray-600 mb-5 sm:mb-6 text-sm sm:text-base">
            Fill the form below and we’ll get back to you shortly.
          </p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
            <textarea
              placeholder="Tell us about your project..."
              rows={4}
              className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200"
            />
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-800 hover:scale-[1.02] transition duration-200 font-semibold"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}