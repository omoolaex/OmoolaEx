'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ConsultingApproach() {
  return (
    <section className="relative bg-gradient-to-br from-[#F5F8FF] via-white to-[#FFF9F0] py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* === Background Glows === */}
      <div className="absolute top-[-60px] left-[-60px] w-72 h-72 bg-[#007BFF]/10 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-40px] right-[-60px] w-72 h-72 bg-[#FFD65B]/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        {/* === Left Column — Image === */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full lg:w-1/2"
        >
          <div className="relative w-full h-[280px] sm:h-[380px] md:h-[400x] lg:h-[450px] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/images/why-choose-us.png"
              alt="OmoolaEx Consulting Approach"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* === Right Column — Text === */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full lg:w-1/2 text-[#0A1733]"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-5 sm:mb-6">
            Our IT Consulting <span className="text-[#007BFF]">Approach</span>
          </h2>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-5 sm:mb-6">
            We don’t show up with generic frameworks or leave you with a 50-page document 
            you’ll never implement. Our approach to digital transformation consulting in 
            Nigeria starts with understanding your business context, then developing practical 
            strategies you can actually execute.
          </p>

          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            We ask the right questions, challenge assumptions when necessary, and provide honest 
            assessments of what’s realistic given your resources and timeline. Then we stay with 
            you through implementation — adjusting based on real-world feedback. Strategy and 
            execution, working together.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
