'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

export default function Hero() {
  return (
    <section className="relative bg-white py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* === Background Decorations === */}
      <div className="absolute inset-0 -z-10 select-none pointer-events-none">
        <div className="absolute top-[-80px] left-[-100px] w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] bg-yellow-100 rounded-full blur-[100px] md:blur-[120px] opacity-50 md:opacity-60" />
        <div className="absolute bottom-[-60px] right-[-80px] w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] bg-blue-100 rounded-full blur-[80px] md:blur-[100px] opacity-40 md:opacity-50" />
        <div className="absolute top-[30%] left-[12%] w-6 h-6 sm:w-8 sm:h-8 bg-yellow-300 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-[25%] right-[10%] w-4 h-4 sm:w-6 sm:h-6 bg-blue-300 rounded-full opacity-30 animate-bounce" />
      </div>

      {/* === Main Content === */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col-reverse lg:flex-row items-center lg:items-center gap-8 lg:gap-10 relative">

        {/* --- Text Section --- */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full lg:w-[75%] z-30 bg-white p-6 sm:p-8 md:p-8 lg:p-12 rounded-tr-[40px] sm:rounded-tr-[60px] lg:rounded-tr-[80px] shadow-md lg:-mr-40 relative flex flex-col justify-center lg:-mt-18"
          style={{ alignSelf: 'center' }}
          >
          {/* Headline */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-blue-900 leading-tight tracking-tight max-w-2xl">
            Your Trusted Partner for Digital Transformation in Nigeria.
          </h1>

          {/* Subheading with Typewriter effect */}
          <p className="text-blue-700 font-medium mt-3 text-base sm:text-lg md:text-xl">
            <Typewriter
              words={[
                'Digital Transformation',
                'Cloud Solutions',
                'Technology Strategy',
                'Business Growth',
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1800}
            />
          </p>

          {/* Description */}
          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xl mt-6">
            In today&apos;s fast-paced digital landscape, staying ahead means making the right technology decisions. OmoolaEx is an IT consulting firm in Nigeria helping businesses bridge the gap between global technology standards and local market realities. Whether you&apos;re a startup looking to scale, an SME navigating digital transformation, or a corporate optimizing IT infrastructure, we help Nigerian businesses navigate IT complexity with strategy, custom solutions, and cloud-ready infrastructure.
          </p>

          {/* CTA */}
          <div className="flex gap-4 mt-4">
            <Link
              href="/bookings"
              className="group inline-flex items-center justify-center px-2 sm:px-3 py-3 font-semibold text-blue-700 bg-white/50 backdrop-blur-md hover:scale-105 transition-all duration-300 text-sm sm:text-base whitespace-nowrap rounded-md"
            >
              Ready to future-proof your business?
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                Let&apos;s talk →
              </span>
            </Link>
          </div>
        </motion.div>

        {/* --- Image Section --- */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="w-full lg:w-[90%] relative z-10 lg:-mt-10 lg:mb-10 flex justify-center"
        >
          <div className="relative w-full h-[300px] sm:h-[380px] md:h-[460px] lg:h-[640px] overflow-hidden rounded-tr-[20px] rounded-bl-[100px] sm:rounded-bl-[110px] lg:rounded-bl-[130px] shadow-lg">
            <Image
              src="/images/office-space.png"
              alt="OmoolaEx team working together"
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
