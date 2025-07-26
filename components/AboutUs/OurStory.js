'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const timeline = [
  {
    year: '2020',
    title: 'The Spark',
    desc: 'OmoolaEx started as a vision to bring digital growth closer to individuals and small businesses.',
    image: '/images/illustrations/idea.svg',
  },
  {
    year: '2021',
    title: 'The Foundation',
    desc: 'We launched our first few websites for local founders and started building our workflow and reputation.',
    image: '/images/illustrations/laptop.svg',
  },
  {
    year: '2022',
    title: 'Expanding Reach',
    desc: 'Word of mouth grew. We refined our services around what our audience truly needed conversion-focused web development.',
    image: '/images/illustrations/network.svg',
  },
  {
    year: '2023',
    title: 'Positioning to Scale',
    desc: 'We niched down, built partnerships, and leaned into strategy, UX, and value-driven delivery.',
    image: '/images/illustrations/growth.svg',
  },
  {
    year: '2024+',
    title: 'Now & Next',
    desc: 'Today, OmoolaEx stands as a trusted partner for forward-thinking founders and teams. And we are just getting started.',
    image: '/images/illustrations/rocket.svg',
  },
]

export default function OurStory() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900">Our Journey So Far</h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            From a simple idea in 2020 to becoming a go-to tech partner.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line for desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-blue-100 -translate-x-1/2 z-0" />

          <div className="space-y-14 sm:space-y-16 md:space-y-20">
            {timeline.map((step, index) => {
              const isRight = index % 2 === 0
              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`
                    relative z-10 flex flex-col items-center text-center
                    md:flex-row md:items-center md:gap-10 md:text-left
                    ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}
                  `}
                >
                  {/* Timeline dot (desktop only) */}
                  <div className="hidden md:block absolute left-1/2 top-6 w-6 h-6 bg-blue-600 rounded-full border-4 border-white -translate-x-1/2 z-10" />

                  {/* Image */}
                  <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-sm w-full md:w-1/2">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800">
                      {step.year} – {step.title}
                    </h3>
                    <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}