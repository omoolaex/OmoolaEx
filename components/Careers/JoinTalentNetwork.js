'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function JoinTalentNetwork() {
  return (
    <section
      id="application"
      className="relative bg-gradient-to-r from-blue-600 to-blue-500 py-20 text-center text-white overflow-hidden"
      aria-label="Join OmoolaEx Talent Network"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="dots" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Ready to Grow with OmoolaEx?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Whether you’re looking to volunteer, intern, or start your professional journey,
          OmoolaEx offers pathways to learn, contribute, and build a lasting career in
          technology consulting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="/careers#careers-form"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-50 transition"
          >
            Join the Talent Network →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
