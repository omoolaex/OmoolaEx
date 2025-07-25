'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HowWeWork() {
  return (
    <section className="py-20 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Work Where Ideas Matter
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            At OmoolaEx, we don’t just build solutions — we build people.
            We empower every team member to own their craft, collaborate openly,
            and thrive in a culture that values curiosity, empathy, and growth.
          </p>
          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Whether remote or in-office, we foster trust, transparency, and flexibility.
            Our culture is fast-paced, supportive, and always evolving.
          </p>
        </motion.div>

        {/* Image / Illustration */}
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
            className="rounded-2xl w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
