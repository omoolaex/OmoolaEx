'use client'

import { motion } from 'framer-motion'
import { Briefcase, HeartHandshake, Rocket, Users } from 'lucide-react'

const reasons = [
  {
    icon: <Rocket className="w-8 h-8 text-orange-500" />,
    title: 'Grow Fast',
    description:
      'We invest in your growth through mentorship, trainings, and real challenges that accelerate your career.',
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: 'Collaborative Team',
    description:
      'Work alongside brilliant minds in a culture where everyone’s voice is valued and heard.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-orange-500" />,
    title: 'Real Impact',
    description:
      'Be part of meaningful projects that empower businesses and communities with technology.',
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-orange-500" />,
    title: 'People-First Culture',
    description:
      'We respect your work-life balance, wellness, and aspirations — and support you every step of the way.',
  },
]

export default function WhyWorkOmoolaEx() {
  return (
    <section
      className="relative bg-gray-50 py-16 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Why work at OmoolaEx"
    >
      {/* Floating Background Glow */}
      <motion.div
        className="absolute -top-20 -left-10 w-60 h-60 bg-orange-100 rounded-full opacity-30 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full opacity-20 blur-2xl"
        animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Why Work at OmoolaEx?
        </motion.h2>
        <motion.p
          className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          We’re not just building digital solutions — we’re building a better future, together.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 text-left">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <motion.div
                className="mb-4"
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, damping: 10 }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}