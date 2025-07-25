'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const technologies = [
  { name: 'CSS3', image: '/images/technologies/next.png' },
  { name: 'JavaScript', image: '/images/technologies/node.png' },
  { name: 'React', image: '/images/technologies/React.png' },
  { name: 'Angular', image: '/images/technologies/angular.png' },
  { name: 'Wordpress', image: '/images/technologies/wordpress.png' },
  { name: 'Elementor', image: '/images/technologies/elementor.png' }
]

export default function OurTechnologies() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-yellow-50 via-white to-blue-50 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-[180px] h-[180px] bg-blue-100 rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute bottom-[-80px] right-[-50px] w-[160px] h-[160px] bg-yellow-100 rounded-full blur-[90px] opacity-30 -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-blue-900"
          >
            Technologies We Use
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-600 mt-2 text-lg"
          >
            We leverage modern tools and platforms to deliver fast, scalable, and beautiful solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 place-items-center">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-6 bg-white shadow-lg rounded-full w-24 h-24 relative hover:scale-105 transition-transform">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}