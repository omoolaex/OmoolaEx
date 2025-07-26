'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[300px] sm:h-[360px] md:h-[400px] lg:h-[440px] xl:h-[480px] rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/about-us.png"
            alt="OmoolaEx team"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Right: Text */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-blue-900"
        >
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 sm:mb-6">
            Why Choose <span className="text-blue-600">OmoolaEx</span>
          </h2>

          <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            We’re more than just another IT company. At OmoolaEx, we work alongside you to craft digital experiences that are intuitive, scalable, and visually engaging—always tailored to help your business grow.
          </p>

          <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
            {[
              '10+ successful brand launches',
              'Creative, responsive design team',
              'Fast turnaround with scalable solutions',
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full shadow">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-800">{point}</p>
              </div>
            ))}
          </div>

          <a
            href="/about"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full shadow hover:bg-blue-700 transition-all duration-200 text-sm sm:text-base"
          >
            Learn More About Us
          </a>
        </motion.div>
      </div>
    </section>
  )
}