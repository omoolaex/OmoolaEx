'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

const images = [
  '/gallery/1.jpg',
  '/gallery/2.jpg',
  '/gallery/3.jpg',
  '/gallery/4.jpg',
  '/gallery/5.jpg',
  '/gallery/6.jpg',
  '/gallery/7.jpg',
  '/gallery/8.jpg',
  '/gallery/9.jpg',
  '/gallery/10.jpg',
  '/gallery/11.jpg',
  '/gallery/12.jpg',
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(src)}
              className="cursor-pointer rounded overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Image
                src={src}
                alt={`Gallery image ${i + 1}`}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selected && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <Image
              src={selected}
              alt="Expanded"
              width={800}
              height={800}
              className="rounded-lg max-h-[80vh] object-contain"
            />
          </div>
        )}
      </div>
    </section>
  )
}