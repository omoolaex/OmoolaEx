"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  Search,
  PenTool,
  Brush,
  Rocket,
  BarChart3,
  RefreshCw,
} from "lucide-react";

export default function HowWeWorkBrandGrowth() {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Brand & Market Discovery",
      description:
        "We conduct brand audits, competitor analysis, and audience research to understand your positioning, strengths, and opportunities for growth.",
    },
    {
      icon: PenTool,
      number: "02",
      title: "Strategy Development",
      description:
        "We craft a unified brand and digital strategy—defining your audience, messaging, objectives, and the best digital channels to reach them.",
    },
    {
      icon: Brush,
      number: "03",
      title: "Creative Execution",
      description:
        "We design your brand identity, craft engaging content, and develop creative campaigns that communicate value and attract the right audience.",
    },
    {
      icon: Rocket,
      number: "04",
      title: "Implementation & Launch",
      description:
        "We activate your digital presence across chosen channels, ensuring every launch aligns with your strategy and maintains brand consistency.",
    },
    {
      icon: BarChart3,
      number: "05",
      title: "Monitoring & Optimization",
      description:
        "We track performance, analyze engagement, and adjust campaigns to maximize ROI and ensure continuous improvement.",
    },
    {
      icon: RefreshCw,
      number: "06",
      title: "Reporting & Iteration",
      description:
        "Regular reports with actionable insights — helping you see results clearly, make informed decisions, and scale with confidence.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0B1736] via-[#0E1A3C] to-[#14264C] text-white py-24 lg:py-32 overflow-hidden">
      {/* background glow accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0066FF15,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#00D1FF10,_transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* accent bar */}
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
          How We Work
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#E6EDF8] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          A structured, transparent process that turns strategy into measurable results—each stage refining your brand and digital performance.
        </motion.p>

        {/* timeline layout */}
        <div className="relative">
          {/* timeline line for large screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-[#00D1FF]/40 via-[#0066FF]/30 to-transparent transform -translate-x-1/2" />

          <div className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col ${
                    isLeft ? "lg:items-end" : "lg:items-start"
                  } text-center lg:text-left group`}
                >
                  <div className="bg-[#071230]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md hover:shadow-[0_0_25px_#0066FF30] transition-all hover:-translate-y-1">
                    <div className="flex justify-center lg:justify-start mb-4">
                      <div className="p-3 rounded-xl bg-[#0E1A3C] border border-[#00D1FF]/10 group-hover:border-[#00D1FF]/40 transition-colors">
                        <Icon className="w-8 h-8 text-[#00D1FF]" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-[#E6EDF8]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#C9D8FF] leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* connector dot */}
                  <div
                    className="hidden lg:block absolute top-10 w-3 h-3 bg-[#00D1FF] rounded-full border-2 border-[#071230]"
                    style={{ [isLeft ? "right" : "left"]: "-0.9rem" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
