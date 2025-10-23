'use client'
import { motion } from 'framer-motion'
import { FaBuilding, FaRocket, FaUniversity } from 'react-icons/fa'

const clients = [
  {
    title: 'Small to Medium Enterprises',
    desc: 'Building scalable technology foundations without enterprise budgets.',
    icon: <FaBuilding />
  },
  {
    title: 'Startups',
    desc: 'Needing strategic guidance to make smart technology decisions from day one.',
    icon: <FaRocket />
  },
  {
    title: 'Corporates & Government Agencies',
    desc: 'Seeking IT infrastructure optimization, cybersecurity training, or comprehensive managed services.',
    icon: <FaUniversity />
  },
]

const industries = [
  'Fintech', 'E-commerce', 'Real Estate', 'Manufacturing', 'Healthcare', 'Professional Services'
]

export default function WhoWeServeWave() {
  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 py-16">
      {/* Curved wave at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,0 C50,80 150,80 100%,0 L100%,100% L0,100% Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        {/* Section Header */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Who We Serve
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Our IT consulting and digital transformation services support businesses across Nigeria who are committed to leveraging technology strategically.
        </motion.p>

        {/* Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.map((c, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Icon */}
              <div className="text-blue-600 text-5xl mb-3">{c.icon}</div>
              {/* Title */}
              <h4 className="text-xl font-semibold mb-2 text-gray-800">{c.title}</h4>
              {/* Description */}
              <p className="text-gray-600 text-sm">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Industries */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {industries.map((ind, i) => (
            <span
              key={i}
              className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
            >
              {ind}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
