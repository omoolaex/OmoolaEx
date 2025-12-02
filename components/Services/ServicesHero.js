'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function ServicesHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-28 sm:py-36 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Left Column: Text + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 leading-tight">
            Comprehensive IT Consulting Services in Nigeria
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-xl">
            Technology should drive your business forward, not hold it back. OmoolaEx offers comprehensive IT consulting services tailored to startups, SMEs, and corporates across Nigeria. Our solutions cover IT strategy, custom software, cloud migration, digital growth, and managed IT services designed to deliver results you can measure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/bookings"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition"
            >
              Get a Free Consultation →
            </Link>
            <Link
              href="#services"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition"
            >
              Explore Our Services →
            </Link>
          </div>
        </motion.div>

        {/* Right Column: Illustration / Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-72 sm:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/services.png" // replace with professional IT illustration
            alt="OmoolaEx Workspace"
            fill
            className="object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
