"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function BrandGrowthCTA() {
  return (
    <section className="relative bg-[#F8FAFF] text-[#0B1736] py-24 lg:py-32 overflow-hidden">
      {/* soft blue glow for atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0066FF10,_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mx-auto w-24 h-1 bg-gradient-to-r from-[#00D1FF] to-[#0066FF] rounded-full mb-8"
        />

        {/* heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6 text-[#0E1A3C]"
        >
          Ready to Grow Your Brand?
        </motion.h2>

        {/* subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#1A244B]/90 text-base sm:text-lg mb-6 leading-relaxed"
        >
          Whether you need strategic digital marketing consulting in Nigeria,
          comprehensive brand development, or performance-driven growth campaigns,
          OmoolaEx has the expertise to elevate your presence and drive measurable results.
        </motion.p>

        {/* highlight line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-[#0066FF] font-medium mb-8"
        >
          Contact us today to discuss your brand and digital growth needs.
        </motion.p>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="inline-block rounded-2xl bg-[#0066FF] px-8 py-4 text-sm sm:text-base font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0066FF]/50"
          >
            Get In Touch →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
