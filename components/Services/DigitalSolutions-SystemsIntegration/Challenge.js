"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Zap } from "lucide-react";
import React from "react";

export default function ChallengeSection() {
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
                Common Growth Barriers
              </h3>
              <ul className="space-y-3 text-sm text-[#C9D8FF]">
                <li className="flex items-start gap-2">
                  <RefreshCcw className="w-4 h-4 text-[#00D1FF] mt-0.5" />
                  <span>Outdated workflows that don’t scale</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-[#00D1FF] mt-0.5" />
                  <span>Disconnected systems causing data loss</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#00D1FF] mt-0.5" />
                  <span>Limited flexibility from off-the-shelf software</span>
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
          className="w-24 h-1 bg-gradient-to-r from-[#00D1FF] to-[#0066FF] rounded-full mb-8 items-left"
        />
          <h2 className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6">
            The Challenge with Generic Solutions
          </h2>

          <p className="text-[#0E1A3C] leading-relaxed mb-4">
            Most businesses start with ready-made software because it’s faster and cheaper upfront.
            But as you grow, you hit the limits: workflows that don’t match your process,
            features you can’t customize, systems that don’t talk to each other, and workarounds that waste time.
          </p>

          <p className="text-[#0E1A3C] leading-relaxed">
            Custom development isn’t about reinventing the wheel—it’s about creating solutions that
            actually fit your team, your users, and your goals. When done right, your software becomes
            a competitive advantage, not just a tool.
          </p>

          <a
            href="#approach"
            className="inline-block mt-8 text-[#00D1FF] hover:text-[#57E3FF] transition-colors text-sm font-medium"
          >
            Discover how OmoolaEx tailors digital systems for growth →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
