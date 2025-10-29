"use client";

import { motion } from "framer-motion";
import { Target, Rocket, TrendingUp } from "lucide-react";
import React from "react";

export default function BrandGrowthApproach() {
  const steps = [
    {
      icon: Target,
      title: "Strategy First",
      description:
        "We start by understanding your positioning, audience, and growth goals. Every creative and campaign decision stems from a strategic foundation.",
    },
    {
      icon: Rocket,
      title: "Execution with Intention",
      description:
        "From brand identity to marketing campaigns, every deliverable serves a purpose—driving awareness, engagement, and measurable business outcomes.",
    },
    {
      icon: TrendingUp,
      title: "Optimization Always",
      description:
        "We track results continuously, refining based on data, not guesswork. Growth is sustained through iteration and learning.",
    },
  ];

  return (
    <section
      id="approach"
      className="relative bg-gradient-to-b from-[#0E1A3C] to-[#14264C] text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* soft layered glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#00D1FF20,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#0066FF15,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 text-center">
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
          className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6"
        >
          Our Brand & Growth Approach
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-[#E6EDF8] leading-relaxed max-w-3xl mx-auto mb-10"
        >
          We don’t create brands or run campaigns in isolation. Every decision
          begins with strategy, is executed with purpose, and refined through
          insight. The goal: lasting growth built on clarity and consistency.
        </motion.p>

        {/* Approach steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#071230]/70 border border-white/10 p-8 backdrop-blur-sm hover:shadow-[0_0_25px_#0066FF30] transition-transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-[#0E1A3C]/70 rounded-full border border-[#00D1FF]/20">
                    <Icon className="w-8 h-8 text-[#00D1FF]" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-[#E6EDF8]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#C9D8FF] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-10 text-sm italic text-[#00D1FF]"
        >
          Strategy. Execution. Optimization. Repeat.
        </motion.p>
      </div>
    </section>
  );
}
