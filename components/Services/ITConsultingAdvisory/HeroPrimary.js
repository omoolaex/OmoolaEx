"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroPrimary() {
  return (
    <section className="relative flex flex-col lg:flex-row items-center justify-between bg-[#0A1733] text-white overflow-hidden min-h-[80vh]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1733] via-[#0C1E40] to-[#071226]" />

      {/* Layout wrapper */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-16 md:py-24 gap-12 lg:gap-20">
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full lg:w-1/2 text-left"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
            Strategic IT Consulting That Drives Business Growth
          </h1>

          <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
            Technology decisions shape your business trajectory. The right IT
            strategy can accelerate growth, improve efficiency, and give you a
            competitive edge. The wrong one can drain resources and create
            bottlenecks. OmoolaEx provides{" "}
            <strong className="text-white">
              IT strategy consulting in Nigeria
            </strong>{" "}
            that helps you make informed technology decisions aligned with your
            business goals, budget realities, and growth ambitions.
          </p>

          <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed">
            From digital transformation roadmaps to technology cost optimization,
            we bring strategic clarity to complex IT challenges.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/bookings"
              className="bg-[#007BFF] hover:bg-[#0066d1] text-white font-medium px-8 py-3 rounded-2xl text-center transition-colors duration-300"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="border border-white hover:bg-white hover:text-[#0A1733] text-white font-medium px-8 py-3 rounded-2xl text-center transition-colors duration-300"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Decorative Accent — visible only on large screens */}
        <div className="relative hidden lg:flex w-full lg:w-1/2 items-center justify-center min-h-[500px]">
          <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-[#007BFF]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute w-48 h-48 bg-[#007BFF]/30 rounded-full blur-2xl opacity-70 animate-ping delay-700" />
        </div>
      </div>

      {/* Subtle glow behind text for small screens */}
      <div className="absolute lg:hidden bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#007BFF]/15 rounded-full blur-[120px]" />
    </section>
  );
}
