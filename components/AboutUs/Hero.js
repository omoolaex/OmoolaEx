'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="bg-white py-16 md:py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
            Driven by Purpose. Empowering Growth.
          </h1>
          <p className="mt-6 text-gray-600 text-base md:text-lg leading-relaxed">
            At OmoolaEx, we believe technology should feel empowering — not overwhelming.
            That’s why we partner with individuals, startups, and small businesses to build
            digital solutions that are practical, modern, and built for growth.
          </p>
          <div className="mt-6 inline-block bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
            ✅ Trusted by businesses looking to grow through tech
          </div>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full h-80 md:h-[400px] rounded-3xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/about-hero.jpg" // Replace with real image
            alt="OmoolaEx team or tech visual"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}