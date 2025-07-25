'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const industries = [
  {
    label: 'Startups',
    image: '/images/industries/startups.jpg',
  },
  {
    label: 'Small Businesses',
    image: '/images/industries/sme.jpg',
  },
  {
    label: 'E-commerce Brands',
    image: '/images/industries/ecommerce.jpg',
  },
  {
    label: 'Educational Institutions',
    image: '/images/industries/education.jpg',
  },
  {
    label: 'Agencies',
    image: '/images/industries/agencies.jpg',
  },
]

export default function WhoWeServe() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-16"
        >
          Who We Serve
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image Side */}
          <div className="relative h-[450px] w-full overflow-hidden rounded-3xl shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={industries[activeIndex].image}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={industries[activeIndex].image}
                  alt={industries[activeIndex].label}
                  fill
                  className="object-cover rounded-3xl"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text Side */}
          <div className="space-y-2">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.label}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
                className={`p-2 rounded-xl cursor-pointer border transition-all duration-300 hover:shadow-lg ${
                  index === activeIndex ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200'
                }`}
              >
                <h4 className="text-xl font-semibold text-blue-800 mb-2">{industry.label}</h4>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}