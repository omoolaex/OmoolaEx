'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

export default function Hero() {
  return (
    <section className="bg-white relative py-4 sm:py-6 md:py-8 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-80px] left-[-100px] w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] bg-yellow-100 rounded-full blur-[100px] md:blur-[120px] opacity-50 md:opacity-60" />
        <div className="absolute bottom-[-60px] right-[-80px] w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] bg-blue-100 rounded-full blur-[80px] md:blur-[100px] opacity-40 md:opacity-50" />

        <div className="absolute top-[30%] left-[12%] w-6 h-6 sm:w-8 sm:h-8 bg-yellow-300 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-[25%] right-[10%] w-4 h-4 sm:w-6 sm:h-6 bg-blue-300 rounded-full opacity-30 animate-bounce" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-12 relative">
        {/* Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full lg:w-[55%] z-30 bg-white p-6 sm:p-8 md:p-10 lg:p-20 rounded-tr-[40px] sm:rounded-tr-[60px] lg:rounded-tr-[80px] shadow-md lg:-mr-40"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight mb-4 tracking-tight">
            <Typewriter
              words={['Digital Solutions That Empower Growth']}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6">
            At OmoolaEx, we help you turn your vision into reality. Whether you need a standout website, a memorable brand, or reliable IT systems, our team is here to support your growth and prepare your business for the future.
          </p>

          <Link
            href="/request-a-quote"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-yellow-500 transition-colors duration-200 text-sm sm:text-base"
          >
            Get a Free Quote →
          </Link>
        </motion.div>

        {/* Image Block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="w-full lg:w-[75%] h-[280px] sm:h-[360px] md:h-[400px] lg:h-[550px] relative z-10"
        >
          <div className="relative w-full h-full overflow-hidden rounded-tr-[20px] rounded-bl-[80px] sm:rounded-bl-[100px] lg:rounded-bl-[120px] shadow-lg">
            <Image
              src="/images/team-working.png"
              alt="Omoolaex Team working"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}