'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const reasons = [
  'We Understand Your Reality',
  'Global Standards, Local Expertise',
  'Practical, Not Theoretical',
  'Tailored to Your Business',
  'Results You Can Measure',
];

export default function WhyChooseTwoColumn() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-60px] left-[-60px] w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-[-40px] right-[-60px] w-56 h-56 bg-yellow-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Column — Text + Checklist + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 flex flex-col justify-center space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900">
            Why Choose <span className="text-blue-700">OmoolaEx</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Practical IT consulting for Nigerian businesses with global standards. Our
            solutions combine local expertise with international best practices to drive
            measurable results.
          </p>

          {/* Checklist */}
          <ul className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-6 h-6 text-blue-700 mt-1 flex-shrink-0" />
                <span className="text-gray-700 text-sm sm:text-base">{reason}</span>
              </motion.li>
            ))}
          </ul>

          {/* CTA */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="/services"
            className="px-4 py-3 font-bold text-blue-700 border border-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 text-base sm:text-lg w-fit"
          >
            Work With Us →
          </motion.a>
        </motion.div>

        {/* Right Column — Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 w-full"
        >
          {/* Responsive container: no fixed height, uses aspect ratio */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/why-choose-us.png"
              alt="Why Choose OmoolaEx"
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
