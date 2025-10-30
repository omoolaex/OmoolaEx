"use client";

import { motion } from "framer-motion";
import { AlertTriangle, UserX, ShieldAlert } from "lucide-react";
import React from "react";

export default function ITManagementChallenge() {
  return (
    <section
      id="challenge"
      className="relative bg-white text-gradient-to-b from-[#081530] to-[#0E1A3C] overflow-hidden py-24 lg:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0066FF20,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#00D1FF10,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT - VISUAL / ICONS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-full max-w-md">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -left-8 bg-[#0066FF]/20 w-24 h-24 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 bg-[#00D1FF]/20 w-32 h-32 rounded-full blur-3xl"
            />
            <div className="relative z-10 bg-[#071230] border border-white/10 rounded-3xl shadow-xl p-8 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-[#E6EDF8] mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#00D1FF]" />
                Common IT Management Gaps
              </h3>
              <ul className="space-y-3 text-sm text-[#C9D8FF]">
                <li className="flex items-start gap-2">
                  <UserX className="w-4 h-4 text-[#00D1FF] mt-0.5" />
                  <span>No dedicated IT team to resolve issues or manage updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#00D1FF] mt-0.5" />
                  <span>Unaddressed security threats and poor cybersecurity awareness</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#00D1FF] mt-0.5" />
                  <span>Low digital literacy leading to avoidable system downtime</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* RIGHT - TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-gradient-to-r from-[#00D1FF] to-[#0066FF] rounded-full mb-8"
          />
          <h2 className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6">
            The IT Management Challenge
          </h2>

          <p className="text-[#0E1A3C] leading-relaxed mb-4">
            Businesses without dedicated IT teams face constant challenges: technical issues disrupting 
            work, security threats going unaddressed, software updates being neglected, and employees 
            struggling with tools they haven&apos;t been trained to use properly. Hiring full-time IT staff 
            is expensive and often unnecessary for SMEs.
          </p>

          <p className="text-[#0E1A3C] leading-relaxed">
            Meanwhile, teams lacking digital literacy and cybersecurity awareness create vulnerabilities — 
            from clicking phishing links to mishandling sensitive data. Technology is only as effective 
            as the people using it.
          </p>

          <a
            href="#approach"
            className="inline-block mt-8 text-[#00D1FF] hover:text-[#57E3FF] transition-colors text-sm font-medium"
          >
            Learn how OmoolaEx manages IT and empowers teams →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
