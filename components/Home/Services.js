'use client'

import { Code, Paintbrush2, ShieldCheck, Globe, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Services() {
  const services = [
    {
      title: 'Web Design & Development',
      description: 'User-focused websites built on WordPress and modern frameworks to help you convert more.',
      icon: <Code className="text-blue-600 w-7 h-7 sm:w-8 sm:h-8" />,
    },
    {
      title: 'Brand Design & Identity',
      description: 'Crafting memorable logos and brand visuals using tools like CorelDRAW, Photoshop, and Canva.',
      icon: <Paintbrush2 className="text-yellow-500 w-7 h-7 sm:w-8 sm:h-8" />,
    },
    {
      title: 'IT Consulting & Strategy',
      description: 'Guiding businesses with tailored IT strategies that align with goals and budget.',
      icon: <Users className="text-green-600 w-7 h-7 sm:w-8 sm:h-8" />,
    },
    {
      title: 'Cybersecurity & Training',
      description: 'Equipping teams with knowledge and tools to stay secure in today’s digital landscape.',
      icon: <ShieldCheck className="text-red-500 w-7 h-7 sm:w-8 sm:h-8" />,
    },
    {
      title: 'Digital Marketing & SEO',
      description: 'Boost your visibility with smart SEO, social media, and paid marketing campaigns.',
      icon: <Globe className="text-purple-600 w-7 h-7 sm:w-8 sm:h-8" />,
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-yellow-50 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-100px] left-[-80px] w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] bg-blue-100 rounded-full blur-[100px] sm:blur-[120px] opacity-40 -z-10" />
      <div className="absolute bottom-[-60px] right-[-70px] w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] bg-yellow-100 rounded-full blur-[80px] sm:blur-[100px] opacity-30 -z-10" />
      <div className="absolute top-[30%] left-[5%] w-6 h-6 sm:w-10 sm:h-10 bg-blue-300 rounded-full opacity-30 animate-bounce -z-10" />
      <div className="absolute bottom-[25%] right-[8%] w-5 h-5 sm:w-8 sm:h-8 bg-yellow-300 rounded-full opacity-30 animate-pulse -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4"
          >
            Our Core <span className="text-blue-600">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-gray-700 text-base sm:text-lg max-w-2xl mx-auto"
          >
            We help businesses grow through tailored, scalable, and practical IT solutions.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 relative z-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 flex flex-col items-start hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2">{service.title}</h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 sm:mt-16 text-center">
          <a
            href="/services"
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full font-medium shadow hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
          >
            Explore All Services →
          </a>
        </div>
      </div>
    </section>
  )
}