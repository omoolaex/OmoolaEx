'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function PageHero({ bgImage = '/images/services-bg.png' }) {
  const pathname = usePathname()

  // Extract page title from URL path
  const segments = pathname.split('/').filter(Boolean)
  const title = segments.length > 0
    ? segments[segments.length - 1]
        .replace(/-/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
    : 'Home'

  const generateBreadcrumb = () => (
    <div className="text-xs sm:text-sm text-gray-200 flex flex-wrap justify-center gap-x-1">
      <Link href="/" className="hover:underline">Home</Link>
      {segments.map((segment, idx) => {
        const href = '/' + segments.slice(0, idx + 1).join('/')
        const isLast = idx === segments.length - 1
        return (
          <span key={idx} className="flex items-center">
            <span className="mx-1">/</span>
            {isLast ? (
              <span className="text-white capitalize">{segment.replace(/-/g, ' ')}</span>
            ) : (
              <Link href={href} className="hover:underline capitalize">
                {segment.replace(/-/g, ' ')}
              </Link>
            )}
          </span>
        )
      })}
    </div>
  )

  return (
    <section className="relative h-[15vh] sm:h-[30vh] md:h-[15vh] lg:h-[30vh] w-full overflow-hidden text-white">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt={`${title} Background`}
        fill
        className="object-cover object-center opacity-70 z-0"
        priority
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 sm:px-6 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {generateBreadcrumb()}
        </motion.div>
      </div>
    </section>
  )
}