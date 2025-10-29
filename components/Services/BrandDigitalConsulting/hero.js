"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Users, Repeat } from "lucide-react";
import React from "react";

export default function DigitalSolutionsHero() {
  return (
    <header className="relative bg-gradient-to-br from-[#0E1A3C] via-[#071230] to-[#0B2B4F] text-white overflow-hidden">
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
              Build a Brand That Stands Out and Grows with OmoolaEx
            </motion.h1>

            <motion.p
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-base sm:text-lg max-w-2xl text-[#E6EDF8] mx-auto lg:mx-0"
            >
              Your brand is more than a logo, it&apos;s how customers perceive, remember, and choose you. 
              In crowded markets, strong branding and strategic digital marketing make the difference 
              between blending in and standing out. OmoolaEx provides digital marketing consulting in 
              Nigeria that helps businesses build compelling brand identities, execute growth-focused 
              digital strategies, and achieve measurable results that impact your bottom line.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-4 text-sm italic text-[#C9D8FF]"
            >
              From brand design to performance-driven digital campaigns, we focus on growth that matters.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/bookings"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#0066FF] to-[#00D1FF] px-6 py-3 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D1FF]/50"
              >
                Get a Consultation
              </Link>

              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 px-6 py-3 text-sm sm:text-base font-medium hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
              >
                View Our Work
              </Link>
            </motion.div>

            {/* TRUST POINTS */}
            <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm text-[#C9D8FF]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#00D1FF]" />
                <span>User-centric designs</span>
              </div>
              <div className="flex items-center gap-2">
                <Repeat className="w-5 h-5 text-[#00D1FF]" />
                <span>Iterative feedbacks</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#00D1FF]" />
                <span>Post-delivery support</span>
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
              {/* Replace static SVG with optional floating abstract shapes */}
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
