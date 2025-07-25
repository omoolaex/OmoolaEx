'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PortfolioCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to bring your ideas to life?</h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto">
          Let’s work together to build something impactful, innovative, and tailored for growth. Contact us or explore our services to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-white text-blue-700 font-medium py-3 px-6 rounded-full hover:bg-blue-100 transition"
          >
            Contact Us
          </Link>
          <Link
            href="/services"
            className="bg-white/10 border border-white font-medium py-3 px-6 rounded-full hover:bg-white/20 transition"
          >
            Explore Services
          </Link>
        </div>
      </motion.div>
    </section>
  )
}