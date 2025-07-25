'use client'

import { Code, Paintbrush2, ShieldCheck, Globe, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Services() {
  const services = [
    {
      title: 'Web Design & Development',
      description: 'User-focused websites built on WordPress and modern frameworks to help you convert more.',
      icon: <Code className="text-blue-600 w-8 h-8" />,
    },
    {
      title: 'Brand Design & Identity',
      description: 'Crafting memorable logos and brand visuals using tools like CorelDRAW, Photoshop, and Canva.',
      icon: <Paintbrush2 className="text-yellow-500 w-8 h-8" />,
    },
    {
      title: 'IT Consulting & Strategy',
      description: 'Guiding businesses with tailored IT strategies that align with goals and budget.',
      icon: <Users className="text-green-600 w-8 h-8" />,
    },
    {
      title: 'Cybersecurity & Training',
      description: 'Equipping teams with knowledge and tools to stay secure in today’s digital landscape.',
      icon: <ShieldCheck className="text-red-500 w-8 h-8" />,
    },
    {
      title: 'Digital Marketing & SEO',
      description: 'Boost your visibility with smart SEO, social media, and paid marketing campaigns.',
      icon: <Globe className="text-purple-600 w-8 h-8" />,
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-yellow-50 py-24 overflow-hidden">
      {/* Background blobs for visual depth */}
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-blue-100 rounded-full blur-[120px] opacity-50 -z-10" />
      <div className="absolute bottom-[-60px] right-[-70px] w-[240px] h-[240px] bg-yellow-100 rounded-full blur-[100px] opacity-40 -z-10" />
      <div className="absolute top-[30%] left-[5%] w-10 h-10 bg-blue-300 rounded-full opacity-30 animate-bounce -z-10" />
      <div className="absolute bottom-[25%] right-[8%] w-8 h-8 bg-yellow-300 rounded-full opacity-30 animate-pulse -z-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4"
          >
            Our Core <span className="text-blue-600">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-700 text-lg max-w-2xl mx-auto"
          >
            We help businesses grow through tailored, scalable, and practical IT solutions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-xl rounded-3xl p-8 flex flex-col items-start hover:shadow-2xl transition-all duration-300 min-h-[250px]"
            >
              <div className="mb-5">{service.icon}</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">{service.title}</h3>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/services"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium shadow hover:bg-blue-700 transition duration-300"
          >
            Explore All Services →
          </a>
        </div>
      </div>
    </section>
  )
}