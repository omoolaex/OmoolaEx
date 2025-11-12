'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ContactTopCTA() {
  return (
    <section
      id="contact-top"
      className="bg-blue-600 text-white py-6 sm:py-8 px-6 sm:px-10 text-center"
      aria-label="Contact OmoolaEx"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
      >
        <p className="text-lg font-medium">
          Ready to start your digital transformation journey?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2 rounded-full shadow hover:bg-blue-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Talk to Us <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  )
}
