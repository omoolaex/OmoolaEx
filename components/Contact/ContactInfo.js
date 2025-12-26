'use client'

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const contactItems = [
  { icon: <FaEnvelope size={24} />, title: 'Email', value: 'info@omoolaex.com.ng', link: 'mailto:info@omoolaex.com.ng' },
  { icon: <FaPhoneAlt size={24} />, title: 'Phone', value: '+234 708 921 7123', link: 'tel:+2347089217123' },
  { icon: <FaMapMarkerAlt size={24} />, title: 'Address', value: 'Regent Palace, 8 R.T.S. Apena Cl, Oriyomi St, off Olowu Street, Opebi, Ikeja 100271, Lagos', link: 'https://maps.app.goo.gl/yRGZ5sgvVJsn8ozw6' },
]

export default function ContactInfo() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {contactItems.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="flex flex-col items-center text-center px-6 py-6 sm:px-4 sm:py-4 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-md hover:border-blue-600 transition-all duration-300"
            >
              <div className="text-blue-600 mb-3">{item.icon}</div>
              <h4 className="text-base md:text-lg font-semibold text-gray-800">{item.title}</h4>
              <p className="text-sm md:text-base text-gray-600 mt-1">{item.value}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
