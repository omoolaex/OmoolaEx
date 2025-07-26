'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Creams’n’Bakers',
    image: '/images/testimonials/sarah.png',
    quote:
      'OmoolaEx brought our website to life and increased our customer engagement. Their team was professional, creative, and responsive throughout the project.',
  },
  {
    name: 'Daniel Obasi',
    role: 'CTO, DigiAdPro',
    image: '/images/testimonials/daniel.png',
    quote:
      'Their ability to turn business goals into technical solutions is unmatched. OmoolaEx truly delivered beyond our expectations.',
  },
  {
    name: 'Ada Nkem',
    role: 'Marketing Lead, RealEstatePro',
    image: '/images/testimonials/ada.png',
    quote:
      'From design to development, everything was handled perfectly. Our landing page now converts way better than before!',
  },
]

export default function Testimonials() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] bg-blue-100 rounded-full blur-[80px] sm:blur-[100px] opacity-40 -z-10" />
      <div className="absolute bottom-[-40px] right-[-40px] w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] bg-yellow-100 rounded-full blur-[70px] sm:blur-[90px] opacity-30 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg mt-2"
          >
            Real stories from real business owners.
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-xl p-6 sm:p-8 text-center flex flex-col items-center"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={64}
                height={64}
                className="rounded-full object-cover mb-4"
                loading="lazy"
              />
              <p className="text-gray-700 italic text-sm sm:text-base mb-4">
                “{t.quote}”
              </p>
              <h4 className="text-blue-800 font-semibold text-sm sm:text-base">{t.name}</h4>
              <span className="text-gray-500 text-xs sm:text-sm">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}