'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-blue-30 to-white py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column — Text + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900">
            Ready to Transform Your IT Strategy?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Whether you need IT consulting in Lagos, digital transformation guidance, or a complete technology overhaul, OmoolaEx is here to help. Let&apos;s discuss how we can turn your technology challenges into competitive advantages.
          </p>
          <p className="text-gray-700 text-sm sm:text-base font-medium">
            <strong>Book a free consultation today</strong> and discover what&apos;s possible when you partner with the right IT consulting firm in Nigeria.
          </p>

          {/* Text-based CTA Link */}
          <motion.a
            href="/bookings"
            className="inline-block text-blue-700 font-semibold text-base sm:text-lg hover:underline transition"
            whileHover={{ scale: 1.05 }}
          >
            → Book a Free Consultation
          </motion.a>
        </motion.div>

        {/* Right Column — Illustrative Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/it-strategy.png"
            alt="Transform IT Strategy"
            fill
            className="object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
