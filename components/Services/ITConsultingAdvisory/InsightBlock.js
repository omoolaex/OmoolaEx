'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Insight() {
  return (
    <section className="relative bg-gradient-to-br from-[#F5F8FF] via-white to-[#EAF3FF] py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-[-80px] right-[-100px] w-[400px] h-[400px] bg-[#007BFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-100px] w-[320px] h-[320px] bg-[#00B4FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* === Left: Image === */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full h-[280px] sm:h-[360px] md:h-[380px] lg:h-[400px] xl:h-[450px] rounded-[24px] overflow-hidden shadow-xl"
        >
          <Image
            src="/images/gbolahan.jpg"
            alt="OmoolaEx IT Consulting Team"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover scale-x-[-1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </motion.div>

        {/* === Right: Text === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative text-[#0A1733]"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-5 sm:mb-6">
            Why Businesses Need IT Consulting & Advisory Services
          </h2>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
            Most businesses face similar technology challenges — disconnected systems that don’t talk 
            to each other, IT costs that keep rising without clear ROI, teams resistant to new technology, 
            or ambitious digital transformation plans with no clear execution path.
          </p>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            You know technology should be driving your business forward, but without strategic guidance, 
            it’s hard to know which investments matter, how to prioritize competing needs, or whether you’re 
            building for today or tomorrow. That’s where expert IT advisory services make the difference — 
            helping you see the full picture, make confident decisions, and execute effectively.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
