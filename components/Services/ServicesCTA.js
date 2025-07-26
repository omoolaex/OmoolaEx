'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ServicesCTA() {
  return (
    <section className="bg-blue-600 py-16 text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
        >
          Ready to Transform Your Business?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8"
        >
          Let’s work together to bring your digital vision to life. We’re just a message away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Get In Touch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}