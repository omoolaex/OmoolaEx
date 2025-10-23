'use client'

import { Lightbulb, ClipboardCheck, Server, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

const processSteps = [
  {
    title: 'Business Discovery',
    icon: <Lightbulb className="w-8 h-8 text-blue-600" />,
    desc: 'We assess your organization’s current IT landscape, business goals, and operational challenges to identify opportunities for digital transformation.',
  },
  {
    title: 'IT Strategy Planning',
    icon: <ClipboardCheck className="w-8 h-8 text-blue-600" />,
    desc: 'We develop a tailored IT strategy roadmap that aligns technology investments with measurable business outcomes and scalability.',
  },
  {
    title: 'Solution Design & Implementation',
    icon: <Server className="w-8 h-8 text-blue-600" />,
    desc: 'We architect, design, and deploy IT solutions—including software, cloud, and infrastructure—ensuring seamless integration and operational efficiency.',
  },
  {
    title: 'Managed Support & Optimization',
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    desc: 'We provide ongoing monitoring, IT management, and optimization, ensuring systems remain secure, reliable, and aligned with evolving business needs.',
  },
]

export default function OurProcess() {
  return (
    <section className="relative bg-gradient-to-br from-white via-blue-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-60px] right-[-60px] w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] bg-yellow-100 rounded-full blur-[80px] sm:blur-[100px] opacity-40 -z-10" />
      <div className="absolute bottom-[-60px] left-[-50px] w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] bg-blue-100 rounded-full blur-[70px] sm:blur-[90px] opacity-30 -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900"
          >
            Our IT Consultancy Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg mt-2"
          >
            From strategy to execution, we guide your business through digital transformation with measurable impact.
          </motion.p>
        </div>

        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center px-4 group"
            >
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-blue-800 group-hover:text-blue-900 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
