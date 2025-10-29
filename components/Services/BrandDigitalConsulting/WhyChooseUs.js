"use client";

import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Layers,
  Globe2,
  Star,
} from "lucide-react";
import React from "react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Target,
      title: "Strategic Foundation",
      description:
        "We start with strategy — understanding positioning, audience, and objectives — before any creative or tactical execution begins.",
    },
    {
      icon: TrendingUp,
      title: "Growth-Focused Metrics",
      description:
        "We optimize for business outcomes — leads, conversions, and revenue — not vanity metrics like likes or follower counts.",
    },
    {
      icon: Layers,
      title: "Integrated Approach",
      description:
        "Brand and digital marketing work together in our strategies. Consistent messaging across channels, cohesive customer experiences.",
    },
    {
      icon: Globe2,
      title: "Local Market Understanding",
      description:
        "We understand the Nigerian digital landscape — what platforms perform best, what content resonates, and how to reach the right audience effectively.",
    },
    {
      icon: Star,
      title: "Proven Brand Launch Success",
      description:
        "Over 10 successful brand launches across industries, powered by frameworks built for clarity, consistency, and measurable growth.",
    },
  ];

  return (
    <section className="relative bg-white text-gradient-to-b from-[#081530] via-[#0E1A3C] to-[#14264C] py-24 lg:py-32 overflow-hidden">
      {/* background accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0066FF10,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Accent Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto w-24 h-1 bg-gradient-to-r from-[#00D1FF] to-[#0066FF] rounded-full mb-8"
        />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-8"
        >
          Why Choose OmoolaEx for Brand & Growth
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#0E1A3C] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          Our work blends strategic clarity with creative precision — ensuring
          your brand not only looks great but drives measurable business growth.
        </motion.p>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-[#071230]/80 border border-white/10 p-8 backdrop-blur-sm hover:shadow-[0_0_25px_#0066FF30] hover:-translate-y-1 transition-all"
              >
                <div className="mb-5 flex justify-center">
                  <div className="p-3 rounded-xl bg-[#0E1A3C] border border-[#00D1FF]/10 group-hover:border-[#00D1FF]/40 transition-colors">
                    <Icon className="w-8 h-8 text-[#00D1FF] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-center text-[#E6EDF8]">
                  {reason.title}
                </h3>
                <p className="text-sm text-[#C9D8FF] leading-relaxed text-center">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
