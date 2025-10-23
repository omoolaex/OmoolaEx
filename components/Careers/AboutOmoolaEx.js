'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutOmoolaEx() {
  return (
    <section
      className="py-20 bg-white px-6 sm:px-8 lg:px-20"
      aria-label="About OmoolaEx IT Consultancy"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>OmoolaEx IT Consultancy Ltd</strong> is a professional IT consulting firm
            headquartered in Lagos, Nigeria. We empower organisations across Africa to
            optimise operations, secure infrastructure, and achieve sustainable digital
            transformation through data-driven technology solutions.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Our expertise covers <strong>IT strategy, cloud systems, cybersecurity, and
            enterprise software development</strong>. We partner with businesses that
            value innovation, reliability, and measurable results.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            At OmoolaEx, we believe people build technology that drives change. Every team
            member contributes to delivering impact-driven solutions that move African
            businesses forward.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/omoolaex-team.png"
            alt="OmoolaEx consulting team collaborating on digital strategy"
            width={600}
            height={400}
            className="rounded-2xl shadow-md object-cover"
            priority
          />
        </motion.div>
      </div>
    </section>
  )
}
