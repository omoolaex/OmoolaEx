'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const technologies = [
  { name: 'CSS3', image: '/images/technologies/next.png' },
  { name: 'JavaScript', image: '/images/technologies/node.png' },
  { name: 'React', image: '/images/technologies/React.png' },
  { name: 'Angular', image: '/images/technologies/angular.png' },
  { name: 'WordPress', image: '/images/technologies/wordpress.png' },
  { name: 'Elementor', image: '/images/technologies/elementor.png' },
]

export default function OurTechnologies() {
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] bg-blue-100 rounded-full blur-[80px] sm:blur-[100px] opacity-40 -z-10" />
      <div className="absolute bottom-[-60px] right-[-40px] w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] bg-yellow-100 rounded-full blur-[70px] sm:blur-[90px] opacity-30 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900"
          >
            Technologies We Use
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg mt-2"
          >
            We leverage modern tools and platforms to deliver fast, scalable, and beautiful solutions.
          </motion.p>
        </div>

        {/* Tech Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 place-items-center">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="relative p-4 sm:p-5 bg-white shadow-md rounded-full w-20 h-20 sm:w-24 sm:h-24 hover:scale-105 transition-transform">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm sm:text-base text-blue-800 mt-1">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}