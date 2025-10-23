'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function NotFoundPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50 overflow-hidden px-6 sm:px-8">
      {/* Decorative Background Blobs */}
      <div className="absolute top-[-80px] left-[-60px] w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl text-center"
      >
        {/* 404 Illustration */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 mb-4">
          <Image
            src="/images/404-illustration.svg"
            alt="Page Not Found"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8">
          Oops! The page you’re looking for doesn’t exist. Perhaps you mistyped the URL or it has moved.
        </p>

        {/* Suggested Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-700 text-white rounded-full font-semibold shadow-md hover:bg-blue-800 transition"
          >
            Go to Home
          </Link>
          <Link
            href="/services"
            className="px-6 py-3 border border-blue-700 text-blue-700 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            Explore Services
          </Link>
        </div>

        {/* Optional subtle text */}
        <p className="mt-6 text-gray-500 text-sm">
          If you think this is an error, please <Link href="/contact" className="text-blue-700 underline">contact us</Link>.
        </p>
      </motion.div>
    </section>
  )
}
