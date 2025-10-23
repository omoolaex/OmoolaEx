'use client'

import { motion } from 'framer-motion'
import { Trophy, Cpu, HeartHandshake, Globe2 } from 'lucide-react'

const trustPoints = [
  {
    icon: <Trophy className="w-7 h-7 text-blue-600" />,
    title: 'Proven Track Record',
    desc: "With 10+ successful brand launches and years of experience delivering IT solutions across Nigeria, we've earned our reputation through results, not marketing.",
  },
  {
    icon: <Cpu className="w-7 h-7 text-blue-600" />,
    title: 'Deep Technical Expertise',
    desc: "Our team brings over 8 years of experience in IT strategy and innovation, with hands-on expertise in WordPress, modern frameworks, cloud infrastructure, and enterprise systems integration.",
  },
  {
    icon: <HeartHandshake className="w-7 h-7 text-blue-600" />,
    title: 'Client-Centric Philosophy',
    desc: "We measure success by client outcomes, not project volume. Your growth is our growth — we structure engagements to ensure mutual success.",
  },
  {
    icon: <Globe2 className="w-7 h-7 text-blue-600" />,
    title: 'Local Presence, Global Perspective',
    desc: "We understand the Nigerian business landscape deeply while staying aligned with global technology trends and best practices — the best of both worlds.",
  },
]

export default function WhyTrustUs() {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50/40 to-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-blue-900 mb-6"
        >
          Why Businesses Trust OmoolaEx
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg mb-16"
        >
          Every engagement reflects our promise — consistent results, expert insight, and true partnership.
        </motion.p>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {trustPoints.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all p-8 flex flex-col items-start"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
