'use client'

import { motion } from 'framer-motion'
import {
  FaStar, FaRocket, FaUserShield, FaCogs, FaSmile, FaHandshake
} from 'react-icons/fa'

const reasons = [
  {
    title: 'Client-Centered Approach',
    icon: <FaHandshake size={36} />,
    desc: 'We tailor every solution to your business goals, not just trends.'
  },
  {
    title: 'Proven Expertise',
    icon: <FaStar size={36} />,
    desc: 'Years of experience delivering successful digital projects across industries.'
  },
  {
    title: 'Reliable & Transparent',
    icon: <FaUserShield size={36} />,
    desc: 'Clear communication, honest timelines, and accountable delivery.'
  },
  {
    title: 'Innovative Solutions',
    icon: <FaRocket size={36} />,
    desc: 'We apply modern tools and creative thinking to keep you ahead.'
  },
  {
    title: 'All-in-One Services',
    icon: <FaCogs size={36} />,
    desc: 'From design to deployment — everything you need under one roof.'
  },
  {
    title: 'Delighted Clients',
    icon: <FaSmile size={36} />,
    desc: 'Your success is our top priority — we aim to exceed expectations.'
  }
]

export default function WhyChooseUs() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
        >
          Why Choose OmoolaEx
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          We&rsquo;re more than just a service provider — we&rsquo;re your digital growth partner. Here&rsquo;s what makes OmoolaEx a standout choice.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center h-full"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.6 } }}
                className="text-blue-600 mb-4"
              >
                {item.icon}
              </motion.div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}