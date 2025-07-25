'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function WhyUs() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-16"
        >
          Why OmoolaEx
        </motion.h2>

        {/* Content Layout */}
        <div className="relative flex flex-col md:flex-row items-start justify-between md:gap-0 gap-10">
          
          {/* Text Block - Overlaps slightly onto the image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative z-20 md:w-1/2 w-full bg-white backdrop-blur-lg p-8 md:p-10 
              rounded-tr-[4rem] md:mt-10 md:mb-10 md:-mr-24 shadow-2xl"
          >
            {/* Animated Text Content */}
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-blue-800 mb-6"
            >
              We’re More Than Just Developers
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-base leading-relaxed mb-8"
            >
              At OmoolaEx, we combine human insight with technology to deliver tailored solutions
              for small businesses, startups, and founders. We don’t just build — we understand,
              advise, and grow with you.
            </motion.p>

            {/* Animated Checklist */}
            <div className="space-y-6">
              {[
                'Client-first approach to problem solving',
                'Experienced in WordPress & modern frameworks',
                'Reliable, scalable, and visually compelling work',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <p className="text-gray-800 text-base">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:w-3/5 w-full h-[500px] relative"
          >
            <Image
              src="/images/why-us.png"
              alt="Why OmoolaEx"
              fill
              className="object-cover rounded-tr-xl rounded-br-lg rounded-bl-[4rem] shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}