"use client";

import { motion } from "framer-motion";
import React from "react";
import { Rocket, RefreshCw, LayoutGrid, TrendingUp, AlertCircle } from "lucide-react";

export default function WhoNeedsBrandGrowth() {
  const audiences = [
    {
      icon: Rocket,
      title: "Startups Establishing Market Presence",
      description:
        "You’re building from the ground up and need a clear, consistent identity that helps you stand out, attract your first customers, and earn trust fast.",
    },
    {
      icon: RefreshCw,
      title: "Businesses Rebranding or Repositioning",
      description:
        "You’ve outgrown your old image or are expanding into new markets. We help you refine your brand story, visual identity, and communication to match your next chapter.",
    },
    {
      icon: LayoutGrid,
      title: "Companies with Inconsistent Marketing",
      description:
        "If your marketing efforts feel scattered or disconnected, we bring structure and strategy — creating clarity that turns campaigns into cohesive growth engines.",
    },
    {
      icon: TrendingUp,
      title: "Organizations Scaling Digital Efforts",
      description:
        "You’re moving from ad-hoc posting to serious, performance-driven marketing. We help you build scalable systems that maintain authenticity and brand voice.",
    },
    {
      icon: AlertCircle,
      title: "Businesses Facing Growth Barriers",
      description:
        "Low awareness, unclear messaging, or wasted ad spend? We identify what’s blocking growth and design strategies that move your brand forward with focus.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0B1736] to-[#14264C] text-white py-24 lg:py-32 overflow-hidden">
      {/* Decorative subtle glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#00D1FF20,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#0066FF10,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto w-24 h-1 bg-gradient-to-r from-[#00D1FF] to-[#0066FF] rounded-full mb-8"
        />

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-8"
        >
          Who Needs Brand & Digital Growth Consulting
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#E6EDF8] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          Our consulting is for businesses ready to align brand, marketing, and
          growth strategy. Whether defining your presence or scaling digital
          performance, we tailor the roadmap to meet your stage and ambitions.
        </motion.p>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl bg-[#071230]/80 border border-white/10 p-8 backdrop-blur-sm hover:shadow-[0_0_25px_#0066FF30] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-[#0E1A3C]/70 border border-[#00D1FF]/10 group-hover:border-[#00D1FF]/40 transition-all duration-500">
                    <Icon className="w-8 h-8 text-[#00D1FF]" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-[#E6EDF8] text-center">
                  {item.title}
                </h3>
                <p className="text-sm text-[#C9D8FF] leading-relaxed text-center">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
