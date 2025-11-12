'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function WhyUs() {
  return (
    <section className="relative bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-12 sm:mb-16"
        >
          Why Businesses Trust OmoolaEx
        </motion.h2>

        {/* Responsive Flex Layout */}
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-12 lg:gap-0 relative">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative z-20 bg-white p-6 sm:p-8 lg:p-10 
              rounded-tr-[3rem] lg:-mr-24 lg:mt-12 shadow-2xl"
          >
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-800 mb-5"
            >
              We Build Strategy Before Solutions
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-6"
            >
              At OmoolaEx, we approach technology as an enabler, not a purchase. 
              Every project begins with understanding your operations, business model, 
              and growth goals. We bridge the gap between business strategy and IT 
              execution — aligning every line of code, every system, and every 
              recommendation with measurable outcomes.
            </motion.p>

            {/* Checklist */}
            <div className="space-y-5">
              {[
                'End-to-end IT strategy — from consulting to implementation',
                'Expertise across cloud, cybersecurity, and digital systems',
                'Agile, data-driven, and aligned with your business goals',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-sm sm:text-base md:text-lg text-gray-800">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-3/5 h-[300px] sm:h-[400px] md:h-[550px] relative"
          >
            <Image
              src="/images/contact-hero.png"
              alt="OmoolaEx IT Consultancy team collaborating with clients"
              fill
              className="object-cover rounded-tr-xl rounded-br-lg rounded-bl-[4.5rem] shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
