'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 sm:py-28 lg:py-32 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 flex flex-col justify-center space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900">
            Let's Talk About Your Technology Needs
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            Looking for reliable IT consulting in Nigeria? Whether you need strategic guidance on digital transformation, help with cloud migration, or a technology partner to support your business growth, OmoolaEx is here to help.
          </p>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl">
            Reach out today and let's discuss how we can support your goals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 relative w-full h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-lg"
        >
          <Image
            src="/images/contact-hero.png"
            alt="Contact OmoolaEx"
            fill
            className="object-cover rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  )
}
