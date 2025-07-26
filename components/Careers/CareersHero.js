'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CareersHero() {
  return (
    <section className="relative bg-white px-4 sm:px-6 lg:px-20 py-20 sm:py-28 overflow-hidden">
      {/* Background visual (optional) */}
      {/* <div className="absolute inset-0 z-0">
        <img
          src="/images/team-hero.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight"
        >
          Build the Future <br className="hidden sm:block" /> with OmoolaEx
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
        >
          We’re a team of innovators, builders, and creators shaping the future of digital solutions.
          Come be a part of something meaningful.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8"
        >
          <Link
            href="#careers"
            className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:to-orange-600 text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-md transition"
          >
            View Open Positions
          </Link>
        </motion.div>
      </div>
    </section>
  )
}