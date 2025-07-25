'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 text-white py-24">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-6"
        >
          Ready to Elevate Your Business?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-200 mb-10"
        >
          Partner with OmoolaEx and let&rsquo;s create powerful, tailored solutions that drive real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
        <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="bg-white text-blue-900 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-200 transition duration-300"
            >
              Let&rsquo;s Work Together
        </Link>
        </motion.div>
      </div>
    </section>
  )
}