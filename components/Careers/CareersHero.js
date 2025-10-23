'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CareersHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-gray-50 px-6 sm:px-8 lg:px-20 py-24 overflow-hidden">
      {/* Background accent for depth */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 opacity-30 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
        >
          Build Your Future with <span className="text-blue-600">OmoolaEx</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Join one of Nigeria’s leading IT consulting firms transforming how
          businesses grow through technology, innovation, and excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="#pathways"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md transition"
          >
            Explore Opportunities
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
