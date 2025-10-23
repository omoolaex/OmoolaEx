'use client'

import { motion } from 'framer-motion'

const contactReasons = [
  { title: 'Strategic Guidance You Can Trust', desc: 'Expert IT consulting combining global standards with Nigerian market realities.' },
  { title: 'Tailored Solutions', desc: 'No cookie-cutter approaches. Every recommendation is customized.' },
  { title: 'Clear Communication', desc: 'Straightforward discussions about possibilities, timelines, and pricing.' },
  { title: 'Partnership Approach', desc: 'We build long-term relationships focused on your growth.' },
]

export default function ReasonsSection() {
  return (
    <section className="py-16 px-6 sm:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">Why Contact OmoolaEx for IT Consulting?</h2>
        <p className="mt-4 text-gray-700 text-base sm:text-lg">
          Choosing the right IT consulting partner is crucial. Here’s why OmoolaEx stands out:
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {contactReasons.map((reason, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col bg-white rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-blue-800 mb-2">{reason.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
