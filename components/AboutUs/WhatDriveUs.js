'use client'

import { motion } from 'framer-motion'
import { Target, Eye, Lightbulb, Handshake, BookOpen, Award } from 'lucide-react'

export default function WhatDrivesUs() {
  const values = [
    {
      icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
      title: 'Practical Innovation',
      desc: 'We believe in technology that works in the real world, not just in theory. Our solutions are innovative but grounded in what’s achievable for Nigerian businesses.',
    },
    {
      icon: <Handshake className="w-6 h-6 text-blue-600" />,
      title: 'Partnership Over Transactions',
      desc: 'We’re not here to sell services and vanish. We build long-term relationships and measure success by your growth, not project completion.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      title: 'Transparency & Education',
      desc: 'Technology shouldn’t be a black box. We make recommendations clear, explain the “why,” and empower your team to understand every step.',
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Excellence Without Pretense',
      desc: 'We hold high standards but communicate like humans, not corporate robots. Professionalism can still feel approachable.',
    },
  ]

  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50/30 to-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">What Drives Us</h2>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            The purpose, vision, and principles that shape how OmoolaEx operates.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">Our Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Empower businesses with IT consulting that delivers measurable results. We help Nigerian organizations leverage technology strategically to drive growth, efficiency, and competitive advantage in a digital world.
            </p>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-blue-800">Our Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become a trusted IT consulting firm across West Africa, known for transforming how businesses leverage technology to compete, scale, and succeed in an increasingly digital world.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.h3
          className="text-2xl font-bold text-blue-900 mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Core Values
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-blue-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-center mb-3">{val.icon}</div>
              <h4 className="text-lg font-semibold text-blue-800 mb-2">{val.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
