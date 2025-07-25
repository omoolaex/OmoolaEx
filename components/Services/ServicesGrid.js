'use client'

import { FaPaintBrush, FaGlobe, FaLock, FaCode, FaChartLine, FaLaptop } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'

const services = [
  {
    title: 'Web Design & Development',
    icon: <FaGlobe size={48} />,
    desc: 'Modern, fast, and responsive websites tailored to your business goals.',
    link: '/services/web-design'
  },
  {
    title: 'Brand Design & Identity',
    icon: <FaPaintBrush size={48} />,
    desc: 'Build a memorable brand using powerful design tools and strategy.',
    link: '/services/branding'
  },
  {
    title: 'IT Consulting',
    icon: <FaLaptop size={48} />,
    desc: 'Expert advice and digital strategies to scale your operations confidently.',
    link: '/services/consulting'
  },
  {
    title: 'Software Development',
    icon: <FaCode size={48} />,
    desc: 'Custom software and automation tools to streamline business processes.',
    link: '/services/software'
  },
  {
    title: 'Cybersecurity',
    icon: <FaLock size={48} />,
    desc: 'Secure your data and systems with robust cybersecurity measures.',
    link: '/services/cybersecurity'
  },
  {
    title: 'Digital Marketing',
    icon: <FaChartLine size={48} />,
    desc: 'Grow your online presence through SEO, campaigns, and social media.',
    link: '/services/marketing'
  }
]

export default function ServicesGrid() {
  return (
    <section className="py-16 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link
              href={service.link}
              key={idx}
              className="group bg-gray-50 border border-gray-200 hover:bg-white hover:shadow-lg transition-all duration-300 rounded-2xl p-8 h-[320px] flex flex-col items-center justify-center text-center"
            >
              <div className="text-blue-600 mb-4 transition-transform group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-700 transition">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.desc}</p>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  )
}