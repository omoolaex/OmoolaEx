'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HowWeWork() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-snug">
            Work Where Ideas Matter
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            At OmoolaEx, we don’t just build solutions, we build people.
            We empower every team member to own their craft, collaborate openly,
            and thrive in a culture that values curiosity, empathy, and growth.
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            Whether remote or in-office, we foster trust, transparency, and flexibility.
            Our culture is fast-paced, supportive, and always evolving.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/team-culture.jpg" // Replace with actual image path
            alt="Team culture at OmoolaEx"
            width={600}
            height={400}
            className="w-full rounded-2xl object-cover shadow-md"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}