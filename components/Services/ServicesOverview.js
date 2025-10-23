'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ServicesOverview() {
  return (
    <section className="relative w-full h-[530px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/our-approach.png"
          alt="Our Approach"
          fill
          className="object-cover object-center brightness-90"
          priority
        />
        {/* Gradient overlay: dark left, transparent right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start gap-12 h-full">
        {/* Left Column - Text Overlay */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:w-2/3 text-white flex flex-col justify-center h-full"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-snug">
            Our Approach to Service Delivery
          </h2>
          <p className="text-white/90 text-base sm:text-sm md:text-xl mb-4">
            Most IT consulting firms in Nigeria either promise everything or specialize so narrowly they can't see the bigger picture. We take a different approach: comprehensive services delivered with a partnership mindset.
          </p>
          <p className="text-white/90 text-base sm:text-lg md:text-xl mb-4">
            We start by understanding your business context—not just your technology needs. Then we recommend solutions that make sense for where you are now and where you're headed. We stay with you through implementation, provide training for your team, and ensure you can sustain and evolve the solutions we build together.
          </p>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold mt-4">
            Global standards. Local expertise. Practical execution.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
