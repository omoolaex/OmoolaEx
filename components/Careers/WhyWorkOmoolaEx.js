'use client'

import { motion } from 'framer-motion'
import { Briefcase, HeartHandshake, Rocket, Users } from 'lucide-react'

const reasons = [
  {
    icon: <Rocket className="w-8 h-8 text-orange-500" />,
    title: 'Grow Fast',
    description: 'We invest in your growth through mentorship, trainings, and real challenges that accelerate your career.',
  },
  {
    icon: <Users className="w-8 h-8 text-orange-500" />,
    title: 'Collaborative Team',
    description: 'Work alongside brilliant minds in a culture where everyone’s voice is valued and heard.',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-orange-500" />,
    title: 'Real Impact',
    description: 'Be part of meaningful projects that empower businesses and communities with technology.',
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-orange-500" />,
    title: 'People-First Culture',
    description: 'We respect your work-life balance, wellness, and aspirations — and support you every step of the way.',
  },
]

export default function WhyWorkOmoolaEx() {
  return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Work at OmoolaEx?
        </motion.h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We’re not just building digital solutions — we’re building a better future, together.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 text-left">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}