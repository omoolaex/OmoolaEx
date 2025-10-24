"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ITConsultingCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1733] via-[#0C1E40] to-[#007BFF] py-20 sm:py-24 text-white">
      {/* Subtle glow and animated overlay */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-0 bg-[repeating-linear-gradient(120deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_10px)] opacity-20"
      />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#007BFF]/20 via-transparent to-transparent blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
        >
          Ready to Develop Your IT Strategy?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-200 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Whether you need comprehensive digital transformation consulting in Nigeria,
          strategic guidance on a specific technology challenge, or an expert advisor
          to help you make confident IT decisions — OmoolaEx is here to partner with you.
          <br />
          <br />
          <strong>Contact us today</strong> to explore how we can help drive your business forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-[#0A1733] font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 text-base sm:text-lg"
          >
            Get In Touch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
