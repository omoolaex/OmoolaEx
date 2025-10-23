'use client'

import { motion } from 'framer-motion'
import { Rocket, Users, Briefcase, HeartHandshake } from 'lucide-react'

const reasons = [
  {
    icon: <Rocket className="w-8 h-8 text-blue-600" />,
    title: 'Accelerated Growth',
    description:
      'Gain hands-on experience through live IT consulting projects, guided mentorship, and continuous professional development.',
  },
  {
    icon: <Users className="w-8 h-8 text-blue-600" />,
    title: 'Collaborative Culture',
    description:
      'Work alongside consultants, developers, and digital strategists in a team that values shared knowledge and creative problem-solving.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    title: 'Innovation in Action',
    description:
      'Be part of digital transformation initiatives that strengthen Nigerian and African businesses across multiple industries.',
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-blue-600" />,
    title: 'People-First Philosophy',
    description:
      'We create a supportive environment where work-life balance, wellbeing, and professional growth truly matter.',
  },
]

export default function WhyJoinOmoolaEx() {
  return (
    <section
      className="relative bg-gray-50 py-20 px-6 sm:px-8 lg:px-20 overflow-hidden"
      aria-label="Why join OmoolaEx"
    >
      {/* Decorative glow */}
      <motion.div
        className="absolute -top-20 left-0 w-60 h-60 bg-blue-100 rounded-full opacity-40 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"
        animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900"
        >
          Why Build Your Career at OmoolaEx
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg"
        >
          Our people make the difference. Join a company where innovation meets integrity,
          and where every idea contributes to building smarter digital futures.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
