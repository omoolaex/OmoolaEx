'use client'

import { motion } from 'framer-motion'
import { Handshake, GraduationCap, Rocket } from 'lucide-react'

const pathways = [
  {
    icon: <Handshake className="w-8 h-8 text-blue-600" />,
    title: 'Volunteer Programme',
    description:
      'Contribute your skills to digital transformation and community projects. Volunteers collaborate on real initiatives while expanding their professional network and portfolio.',
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
    title: 'Internship Programme',
    description:
      'A hands-on learning track for students and graduates exploring IT consulting, cloud systems, and software development. Learn directly from experienced professionals at OmoolaEx.',
  },
  {
    icon: <Rocket className="w-8 h-8 text-blue-600" />,
    title: 'Graduate Trainee Programme',
    description:
      'A structured twelve-month pathway designed to help graduates transition into full-time consulting or technical roles through mentorship, training, and live project exposure.',
  },
]

export default function CareerPathways() {
  return (
    <section
      id="pathways"
      className="bg-white py-20 px-6 sm:px-8 lg:px-20"
      aria-label="Career pathways at OmoolaEx"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900"
        >
          Pathways to Join OmoolaEx
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg"
        >
          Choose a development route that fits your stage — volunteer, intern, or train
          with us — and grow into the next generation of IT consultants shaping Africa’s digital future.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {pathways.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="p-8 border border-gray-100 rounded-xl bg-gray-50 hover:bg-blue-50 hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>

              <a
                href="#application"
                className="inline-block mt-6 text-blue-600 font-medium hover:text-blue-700 transition"
              >
                Apply Now →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
