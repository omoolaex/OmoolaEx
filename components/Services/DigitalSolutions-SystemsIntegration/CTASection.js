"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-b from-[#0B1736] to-[#0E1A3C] text-white py-24 lg:py-32 overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0066FF15,_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mx-auto w-24 h-1 bg-gradient-to-r from-[#00D1FF] to-[#0066FF] rounded-full mb-8"
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6"
        >
          Ready to Build Your Custom Solution?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#C9D8FF] text-base sm:text-lg leading-relaxed mb-10"
        >
          Whether you need website development in Lagos, custom software to solve
          specific business challenges, or systems integration to connect your
          technology ecosystem, OmoolaEx has the expertise to deliver.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-[#00D1FF] to-[#0066FF] text-white font-semibold px-8 py-4 rounded-full hover:shadow-[0_0_25px_#0066FF60] transition-all duration-500"
          >
            Get In Touch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
