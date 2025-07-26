'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    // Replace this with a real API call or static JSON import
    async function fetchGallery() {
      const res = await fetch('/api/gallery') // can be your own custom API
      const data = await res.json()
      setImages(data)
    }

    fetchGallery()
  }, [])

  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-12"
        >
          Our Gallery
        </motion.h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(src)}
              className="cursor-pointer rounded overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
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