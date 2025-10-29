"use client";

import { motion } from "framer-motion";
import React from "react";
import { Search, PenTool, Repeat, ShieldCheck, Rocket, RefreshCw } from "lucide-react";

export default function HowWeWorkSection() {
  const steps = [
    {
      icon: Search,
      title: "Discovery & Requirements",
      description:
        "We start by understanding your goals, users, and existing workflows through deep discovery and stakeholder sessions.",
    },
    {
      icon: PenTool,
      title: "Design & Architecture",
      description:
        "We translate insights into user experience designs and technical blueprints to align on function and feel.",
    },
    {
      icon: Repeat,
      title: "Iterative Development",
      description:
        "We build in visible phases, sharing progress often and refining based on your feedback to stay aligned.",
    },
    {
      icon: ShieldCheck,
      title: "Testing & Quality Assurance",
      description:
        "Every feature is tested across devices, browsers, and edge cases to ensure stability and reliability.",
    },
    {
      icon: Rocket,
      title: "Deployment & Training",
      description:
        "We launch smoothly, train your team, and deliver documentation so you're confident managing your new system.",
    },
    {
      icon: RefreshCw,
      title: "Support & Evolution",
      description:
        "After launch, we stay close—monitoring, improving, and scaling your solution as your business grows.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0B1736] via-[#0E1A3C] to-[#14264C] text-white py-24 lg:py-32">
      {/* background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0066FF10,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
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
          A transparent, collaborative process that blends structure with flexibility — so you always know where things stand.
        </motion.p>

        {/* timeline style on large screens */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-[#00D1FF]/30 via-[#0066FF]/30 to-transparent transform -translate-x-1/2" />
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
                  className={`relative flex flex-col items-center text-center lg:text-${isLeft ? "right" : "left"} lg:items-${isLeft ? "end" : "start"} group`}
                >
                  <div className="bg-[#071230]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-md hover:shadow-[0_0_25px_#0066FF30] transition-all hover:-translate-y-1">
                    <div className="flex justify-center lg:justify-start mb-4">
                      <div className="p-3 rounded-xl bg-[#0E1A3C] border border-[#00D1FF]/10 group-hover:border-[#00D1FF]/40 transition-colors">
                        <Icon className="w-8 h-8 text-[#00D1FF]" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-[#E6EDF8]">{step.title}</h3>
                    <p className="text-sm text-[#C9D8FF] leading-relaxed">{step.description}</p>
                  </div>
                  {/* connector dots */}
                  <div className="hidden lg:block absolute top-10 w-3 h-3 bg-[#00D1FF] rounded-full border-2 border-[#071230]" style={{ left: isLeft ? "100%" : "-1.2rem" }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
