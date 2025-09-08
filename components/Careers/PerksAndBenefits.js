'use client'

import { motion } from 'framer-motion'
import {
  Laptop,
  BookOpen,
  HeartPulse,
  Rocket,
  Plane,
  Sparkles,
} from 'lucide-react'

const perks = [
  {
    title: 'Remote Flexibility',
    desc: 'Work from anywhere or enjoy a hybrid setup that fits your lifestyle.',
    icon: Laptop,
  },
  {
    title: 'Learning & Development',
    desc: 'Sponsored courses, certifications, and constant skill growth.',
    icon: BookOpen,
  },
  {
    title: 'Health & Wellness',
    desc: 'Health support, mental wellness resources, and lifestyle perks.',
    icon: HeartPulse,
  },
  {
    title: 'Growth Opportunities',
    desc: 'Clear career paths and internal promotions await you.',
    icon: Rocket,
  },
  {
    title: 'Paid Time Off',
    desc: 'Generous vacation, public holidays, and personal days.',
    icon: Plane,
  },
  {
    title: 'Creative Freedom',
    desc: 'We give you the space to innovate and do your best work.',
    icon: Sparkles,
  },
]

export default function PerksAndBenefits() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Perks & Benefits
        </motion.h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          We believe work should be rewarding. At OmoolaEx, we invest in our people through these core benefits:
        </p>

        <div className="mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow focus-within:shadow-lg outline-none"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              tabIndex={0}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto">
                <perk.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{perk.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{perk.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}