'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Rocket, Landmark, Briefcase } from 'lucide-react'

const audiences = [
  {
    label: 'Small & Medium Enterprises (SMEs)',
    icon: <Building2 className="w-5 h-5 text-blue-600" />,
    image: '/images/industries/sme.png',
    description:
      'You’re at a growth inflection point. You need scalable IT foundations but limited resources. We help you build the right tech infrastructure — without overcomplicating or overspending.',
  },
  {
    label: 'Startups Building for Scale',
    icon: <Rocket className="w-5 h-5 text-blue-600" />,
    image: '/images/industries/startup-meeting.png',
    description:
      'You need strategic IT guidance without enterprise-level consulting fees. We offer fractional CTO-level advisory to help you choose the right tech stack, align with your goals, and move fast with purpose.',
  },
  {
    label: 'Corporates & Government Agencies',
    icon: <Landmark className="w-5 h-5 text-blue-600" />,
    image: '/images/industries/government.png',
    description:
      'We deliver IT infrastructure optimization, cybersecurity awareness, and transformation consulting — combining enterprise expertise with the agility your teams need.',
  },
  {
    label: 'Decision Makers & Leaders',
    icon: <Briefcase className="w-5 h-5 text-blue-600" />,
    image: '/images/industries/session-meeting.png',
    description:
      'CEOs, CTOs, and Operations Heads rely on us for clarity — from assessing IT systems to mapping transformation strategies that drive competitive advantage.',
  },
]

export default function WhoWeServe() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Who We Serve
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            We work with ambitious teams and organizations that see technology as a lever for growth — not just an operational tool.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Left: Interactive Image */}
          <div className="relative w-full lg:w-1/2 h-[340px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={audiences[activeIndex].image}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={audiences[activeIndex].image}
                  alt={audiences[activeIndex].label}
                  fill
                  className="object-cover object-center rounded-3xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-800/30 to-transparent rounded-3xl" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            {/* Tabs */}
            <div className="flex flex-col space-y-3 mb-8">
              {audiences.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => setActiveIndex(index)}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 px-5 py-4 text-left rounded-xl border transition-all duration-300 shadow-sm ${
                    activeIndex === index
                      ? 'bg-blue-600 text-white border-blue-600  shadow-md'
                      : 'bg-white text-blue-800 border-blue-100 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="font-semibold text-sm sm:text-base">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Active Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={audiences[activeIndex].label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-blue-100 rounded-2xl shadow-sm p-6 sm:p-8"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-blue-800 mb-3">
                  {audiences[activeIndex].label}
                </h4>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {audiences[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
