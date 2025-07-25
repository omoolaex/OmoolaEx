'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

export default function Hero() {
  return (
    <section className="bg-white relative py-6 md:py-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle Blobs for Depth */}
        <div className="absolute top-[-100px] left-[-120px] w-[320px] h-[320px] bg-yellow-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-80px] right-[-100px] w-[240px] h-[240px] bg-blue-100 rounded-full blur-[100px] opacity-50" />

        {/* Extra Floating Shapes */}
        <div className="absolute top-[30%] left-[12%] w-10 h-10 bg-yellow-300 rounded-full opacity-30 animate-pulse" />
        <div className="absolute bottom-[25%] right-[10%] w-6 h-6 bg-blue-300 rounded-full opacity-30 animate-bounce" />

        {/* Placeholder for Future SVG Icons/Illustrations */}
        {/* <Image src="/icons/your-icon.svg" width={40} height={40} alt="icon" className="absolute top-[10%] left-[50%] opacity-20" /> */}
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center relative space-y-10 md:space-y-0 md:space-x-10">

        {/* Left: Text Block */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full md:w-[55%] z-30 bg-white p-6 md:p-20 rounded-tr-[80px] shadow-md md:-mr-40"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight mb-4 tracking-tight">
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

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            At OmoolaEx, we help you turn your vision into reality. Whether you need a standout website, a memorable brand, or reliable IT systems, our team is here to support your growth and prepare your business for the future.
          </p>

          <Link
            href="/request-a-quote"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-yellow-500 transition-colors duration-200"
          >
            Get a Free Quote →
          </Link>
        </motion.div>

        {/* Right: Image Block */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="w-full md:w-[75%] h-[400px] md:h-[550px] relative z-10"
        >
          <div className="relative w-full h-full overflow-hidden rounded-tr-[20px] rounded-bl-[120px] shadow-lg">
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