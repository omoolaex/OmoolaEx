'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ServicesCTA() {
  return (
    <section className="relative bg-blue-600 py-24 text-white overflow-hidden">
      {/* Background abstract shapes */}
      <motion.div 
        className="absolute top-0 left-1/2 w-[120%] h-[500px] -translate-x-1/2 rounded-full bg-blue-400/20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[100%] h-[300px] rounded-full bg-blue-300/20 blur-3xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-blue-100 mb-6 leading-relaxed">
          Whether you need comprehensive IT consulting services in Nigeria, strategic guidance on a specific technology challenge, or a partner to support your digital transformation journey, <strong>OmoolaEx is here to help.</strong>
        </p>
        <p className="text-lg sm:text-xl text-blue-100 mb-12 leading-relaxed">
          <strong>Get in touch today</strong> and let&apos;s discuss how our services can drive your business forward.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1"
        >
          Contact Us to Discuss Your Needs →
        </Link>
      </motion.div>
    </section>
  )
}
