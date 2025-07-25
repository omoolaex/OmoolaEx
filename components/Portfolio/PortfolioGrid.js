'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const projects = [
  {
    title: 'E-Commerce Website',
    image: '/portfolio/ecommerce.png',
    description: 'A custom online store built for seamless shopping experience.'
  },
  {
    title: 'Brand Identity for Salon',
    image: '/portfolio/branding.png',
    description: 'Complete visual identity for a beauty salon brand.'
  },
  {
    title: 'Corporate Website Design',
    image: '/portfolio/corporate.png',
    description: 'Modern corporate site with SEO and lead conversion strategy.'
  },
  {
    title: 'Social Media Campaign',
    image: '/portfolio/social-media.png',
    description: 'Designed creative visuals for a multi-platform campaign.'
  },
  {
    title: 'Software UI Dashboard',
    image: '/portfolio/dashboard.png',
    description: 'Interactive dashboard interface for SaaS platform.'
  },
  {
    title: 'Event Promo Website',
    image: '/portfolio/event.png',
    description: 'Landing page for a tech conference registration and info.'
  }
]

export default function PortfolioGrid() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="cursor-pointer group overflow-hidden rounded-2xl shadow hover:shadow-xl transition"
              onClick={() => setSelected(project)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative h-64 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-2xl w-full relative p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                <X size={24} />
              </button>
              <div className="relative h-64 w-full mb-4">
                <Image
                  src={selected.image}
                  alt={selected.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{selected.title}</h2>
              <p className="text-gray-700 text-sm">{selected.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}