'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function AboutHero() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Image - Always First on Mobile & Tablet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full h-64 sm:h-72 md:h-[360px] lg:h-[420px] rounded-3xl overflow-hidden shadow-lg order-1 md:order-2"
        >
          <Image
            src="/images/about-hero.jpg"
            alt="OmoolaEx team or tech visual"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 via-white/70 to-transparent" />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1 text-left"
        >
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-blue-900 leading-tight md:leading-[1.3]">
            Driven by Purpose. Empowering Growth.
          </h1>

          <p className="mt-5 sm:mt-6 text-gray-600 text-base sm:text-lg md:text-[1.075rem] lg:text-xl leading-relaxed max-w-xl md:max-w-lg lg:max-w-2xl">
            At OmoolaEx, we believe technology should feel empowering — not overwhelming.
            That’s why we partner with individuals, startups, and small businesses to build
            digital solutions that are practical, modern, and built for growth.
          </p>

          {/* Trust Badge */}
          <div className="mt-6 space-y-5 sm:space-y-6 max-w-xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow">
                <CheckCircle className="w-5 h-5" />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-gray-800">
                Trusted by businesses looking to grow through tech
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}