'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function WhoWeAreSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        
        {/* Left: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-full h-[320px] sm:h-[380px] md:h-[460px] lg:h-[560px] xl:h-[620px] rounded-[20px] sm:rounded-[30px] overflow-hidden shadow-2xl"
        >
          <Image
            src="/images/gbolahan.jpg"
            alt="OmoolaEx team collaborating"
            fill
            className="object-cover scale-x-[-1]"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-4 sm:mb-6">
            Who We Are
          </h2>

          <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            OmoolaEx is more than just an IT consulting firm, we're your trusted technology partner. 
            Based in Lagos, Nigeria, we combine deep technical expertise with practical business insight 
            to deliver IT solutions that actually work for African businesses. From IT strategy development 
            to cloud migration, cybersecurity training to custom software development, we've helped 
            organizations across Nigeria and West Africa turn technology challenges into competitive advantages.
          </p>

          <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
            We don't just implement solutions; we ensure they align with your business goals, budget, 
            and growth trajectory.
          </p>

          <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
            {[
              'Tailored IT solutions for African businesses', 
              'Proven track record across Nigeria and West Africa', 
              'Dedicated partnership that aligns with your goals'
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
            className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 font-semibold text-blue-700 backdrop-blur-md hover:bg-blue-50 hover:scale-105 transition-all duration-300 text-sm sm:text-base whitespace-nowrap rounded-md"
          >
            Learn More About Us
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
