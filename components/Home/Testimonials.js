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
    <section className="relative py-24 bg-gradient-to-b from-blue-50 via-white to-gray-50 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-[200px] h-[200px] bg-blue-100 rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute bottom-[-40px] right-[-40px] w-[180px] h-[180px] bg-yellow-100 rounded-full blur-[90px] opacity-30 -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-blue-900"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-600 text-lg mt-2"
          >
            Real stories from real business owners.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={t.image}
                alt={t.name}
                width={64}
                height={64}
                className="rounded-full object-cover mb-4"
                loading="lazy"
              />
              <p className="text-gray-700 italic mb-4">“{t.quote}”</p>
              <h4 className="text-blue-800 font-semibold">{t.name}</h4>
              <span className="text-gray-500 text-sm">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}