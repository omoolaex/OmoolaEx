'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Building2, Users2, Layers3, ThumbsUp } from 'lucide-react'

export default function AboutHero() {
  const stats = [
    { value: '8+', label: 'Years of Impact', icon: <Building2 className="w-6 h-6 text-blue-600" /> },
    { value: '50+', label: 'Clients Served', icon: <Users2 className="w-6 h-6 text-blue-600" /> },
    { value: '10+', label: 'Industries Covered', icon: <Layers3 className="w-6 h-6 text-blue-600" /> },
    { value: '100%', label: 'Client Satisfaction', icon: <ThumbsUp className="w-6 h-6 text-blue-600" /> },
  ]

  return (
    <section className="relative bg-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle gradient background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/60 via-white to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-6">
            Who We Are
          </h1>

          <p className="text-gray-600 text-base sm:text-lg md:text-[1.075rem] lg:text-xl leading-relaxed max-w-xl md:max-w-lg lg:max-w-2xl mb-5">
            OmoolaEx is an IT consulting firm in Nigeria helping businesses navigate the complexities of digital transformation with confidence. Based in Lagos, we&apos;re more than consultants — we&apos;re partners in your growth journey. Whether you&apos;re a startup building your first digital product, an SME scaling operations, or a corporate optimizing IT infrastructure, we bring the strategic thinking and technical expertise needed to turn technology challenges into business opportunities.
          </p>

          <p className="text-gray-600 text-base sm:text-lg md:text-[1.05rem] leading-relaxed max-w-xl md:max-w-lg lg:max-w-2xl mb-8">
            Since 2020, we&apos;ve been helping businesses leverage technology effectively. Now, as we evolve into a full-fledged IT consulting firm, we&apos;re bridging the gap between global technology standards and the realities of operating in the Nigerian market.
          </p>

          {/* Trust Badge */}
          <div className="flex items-start gap-4 mt-8">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow">
              <CheckCircle className="w-5 h-5" />
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 font-medium">
              Trusted by businesses looking to grow through technology
            </p>
          </div>
        </motion.div>

        {/* Right Column - Stats Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent pointer-events-none rounded-2xl" />
              
              {/* Icon */}
              <div className="mb-3 relative z-10">{stat.icon}</div>

              {/* Stat Value */}
              <h3 className="text-4xl sm:text-5xl font-extrabold text-blue-700 relative z-10">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-sm sm:text-base text-gray-700 mt-2 font-medium relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
