'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const timeline = [
  {
    year: '2020',
    title: 'The Spark',
    desc: 'OmoolaEx started as a vision — to bring digital growth closer to individuals and small businesses.',
    image: '/illustrations/idea.svg',
  },
  {
    year: '2021',
    title: 'The Foundation',
    desc: 'We launched our first few websites for local founders and started building our workflow and reputation.',
    image: '/illustrations/laptop.svg',
  },
  {
    year: '2022',
    title: 'Expanding Reach',
    desc: 'Word of mouth grew. We refined our services around what our audience truly needed — conversion-focused web development.',
    image: '/illustrations/network.svg',
  },
  {
    year: '2023',
    title: 'Positioning to Scale',
    desc: 'We niched down, built partnerships, and leaned into strategy, UX, and value-driven delivery.',
    image: '/illustrations/growth.svg',
  },
  {
    year: '2024+',
    title: 'Now & Next',
    desc: 'Today, OmoolaEx stands as a trusted partner for forward-thinking founders and teams. And we’re just getting started.',
    image: '/illustrations/rocket.svg',
  },
]

export default function OurStory() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Intro Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">Our Journey So Far</h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            From a simple idea in 2020 to becoming a go-to tech partner — here's how OmoolaEx came to life.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Middle Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-100 hidden md:block -translate-x-1/2"></div>

          {/* Steps */}
          <div className="space-y-12">
            {timeline.map((step, index) => {
              const isRight = index % 2 === 0 // even indexes = right side
              return (
                <motion.div
                  key={step.year}
                  initial={{ opacity: 0, x: isRight ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`md:flex md:items-center md:gap-10 relative ${
                    isRight ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-1/2 top-6 w-6 h-6 bg-blue-600 rounded-full border-4 border-white -translate-x-1/2 z-10 hidden md:block"></div>

                  {/* Illustration */}
                  <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={120}
                      height={120}
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="bg-gray-50 p-6 rounded-xl shadow-sm md:w-1/2">
                    <h3 className="text-xl font-semibold text-blue-800">{step.year} – {step.title}</h3>
                    <p className="mt-2 text-gray-600">{step.desc}</p>
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