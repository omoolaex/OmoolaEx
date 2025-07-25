'use client'

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const contactItems = [
  {
    icon: <FaPhoneAlt size={28} />,
    title: 'Phone',
    value: '+234 708 921 7123',
    link: 'tel:+2347089217123',
  },
  {
    icon: <FaEnvelope size={28} />,
    title: 'Email',
    value: 'contact@omoolaex.com.ng',
    link: 'mailto:contact@omoolaex.com.ng',
  },
  {
    icon: <FaMapMarkerAlt size={28} />,
    title: 'Address',
    value: '26D, Olowu Street, Ikeja, Lagos, Nigeria',
    link: 'https://goo.gl/maps/example', // Update with real map link
  },
]

export default function ContactInfo() {
  return (
    <section className="py-14 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactItems.map((item, index) => (
            <motion.a
              href={item.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="flex flex-col items-center text-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-600 transition-all duration-300"
            >
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.value}</p>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}