"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cloud, ShieldCheck, Server } from "lucide-react";
import React from "react";

export default function CloudSolutionsHero() {
  return (
    <header className="relative bg-gradient-to-br from-[#0E1A3C] via-[#081A3A] to-[#0B2B4F] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <motion.h1
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="font-poppins font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight"
            >
              Modern Infrastructure That Powers Business Growth
            </motion.h1>

            <motion.p
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-base sm:text-lg max-w-2xl text-[#E6EDF8] mx-auto lg:mx-0"
            >
              Your IT infrastructure should enable growth, not limit it. As businesses scale, legacy
              systems strain, data security becomes critical, and cloud computing offers the flexibility
              and reliability modern operations demand. OmoolaEx delivers cloud migration services in
              Nigeria and IT infrastructure solutions that modernize your technology foundation, improve
              security, and position you for sustainable growth.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-4 text-sm italic text-[#C9D8FF]"
            >
              Scalable, secure, and designed to power your operations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00D1FF] px-6 py-3 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D1FF]/50"
              >
                Get a Consultation
              </Link>

              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
              >
                Explore Our Services
              </Link>
            </motion.div>

            {/* TRUST POINTS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-[#C9D8FF]">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-[#00D1FF]" />
                <span>Cloud-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#00D1FF]" />
                <span>Secure by Design</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[#00D1FF]" />
                <span>Reliable Infrastructure</span>
              </div>
            </div>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="w-full max-w-lg"
            >
              <div className="w-full h-80 lg:h-96 bg-gradient-to-tr from-[#0066FF]/20 via-[#00D1FF]/15 to-transparent rounded-xl relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-32 h-32 bg-[#00D1FF]/10 rounded-full top-10 left-16"
                />
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-24 h-24 bg-[#0066FF]/10 rounded-full top-28 right-20"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8">
          <a href="#services" aria-label="Scroll to next section">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="#E6EDF8"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </a>
        </div>
      </div>
    </header>
  );
}
