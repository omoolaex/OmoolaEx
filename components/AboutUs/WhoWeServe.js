'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const industries = [
  {
    label: 'Startups',
    image: '/images/industries/startups.jpg',
    description: 'We help startups launch fast with scalable, budget-friendly tech.',
  },
  {
    label: 'Small Businesses',
    image: '/images/industries/sme.jpg',
    description: 'Empowering local businesses with smart, efficient digital tools.',
  },
  {
    label: 'E-commerce Brands',
    image: '/images/industries/ecommerce.jpg',
    description: 'Conversion-driven solutions for online stores that scale.',
  },
  {
    label: 'Educational Institutions',
    image: '/images/industries/education.jpg',
    description: 'Helping schools and training centers manage and grow online.',
  },
  {
    label: 'Agencies',
    image: '/images/industries/agencies.jpg',
    description: 'Reliable tech partner for creative and marketing agencies.',
  },
]

export default function WhoWeServe() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-16"
        >
          Who We Serve
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-between">
          {/* Image Display */}
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-[450px] rounded-3xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={industries[activeIndex].image}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={industries[activeIndex].image}
                  alt={industries[activeIndex].label}
                  fill
                  className="object-cover rounded-3xl"
                  priority
                />
                {/* Image overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Selector & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            {/* Horizontal Industry Tabs */}
            <div className="flex flex-wrap gap-3 justify-start sm:justify-center lg:justify-start mb-6">
              {industries.map((industry, index) => (
                <motion.button
                  key={industry.label}
                  onClick={() => setActiveIndex(index)}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 focus:outline-none ${
                    index === activeIndex
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                      : 'bg-white text-blue-800 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  {industry.label}
                </motion.button>
              ))}
            </div>

            {/* Animated Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={industries[activeIndex].description}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-gray-700 text-base sm:text-lg max-w-xl leading-relaxed"
              >
                {industries[activeIndex].description}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}