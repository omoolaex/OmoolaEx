'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const portfolioItems = [
  {
    title: 'Creams’n’Bakers Website',
    description: 'E-commerce showcase with WhatsApp integration for orders.',
    image: '/images/portfolio/creamsnbakers.png',
    link: 'https://creamsnbakers.com',
  },
  {
    title: 'DigiAdPro Dashboard',
    description: 'Admin panel for campaign management and analytics.',
    image: '/images/portfolio/digiadpro.png',
    link: 'https://digiadpro.com',
  },
  {
    title: 'RealEstatePro Landing Page',
    description: 'Conversion-focused one-pager for property listings.',
    image: '/images/portfolio/realestatepro.png',
    link: 'https://realestatepro.africa',
  },
]

export default function Portfolio() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-yellow-50 via-white to-blue-50 overflow-hidden">
      {/* Background blobs for continuity */}
      <div className="absolute top-[-80px] left-[-60px] w-[240px] h-[240px] bg-blue-100 rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute bottom-[-40px] right-[-50px] w-[200px] h-[200px] bg-yellow-100 rounded-full blur-[90px] opacity-30 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-blue-900"
          >
            Recent Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-600 text-lg mt-2"
          >
            See how we’ve helped clients achieve digital excellence.
          </motion.p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group block overflow-hidden rounded-xl shadow hover:shadow-xl transition duration-300"
            >
              <div className="relative h-56 md:h-64 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="bg-white p-5">
                <h3 className="text-lg font-semibold text-blue-800 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/portfolio"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
          >
            View Full Portfolio →
          </a>
        </div>
      </div>
    </section>
  )
}