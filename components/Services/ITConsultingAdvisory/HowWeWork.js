"use client";

import { motion } from "framer-motion";
import { Search, Map, Presentation, Wrench, RefreshCcw } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Discovery & Assessment",
    description:
      "We start by understanding your business, current technology landscape, challenges, and goals through stakeholder interviews and system audits.",
    icon: Search,
  },
  {
    number: 2,
    title: "Strategy Development",
    description:
      "Based on our findings, we develop a tailored IT strategy or transformation roadmap with clear priorities, timelines, and resource requirements.",
    icon: Map,
  },
  {
    number: 3,
    title: "Presentation & Refinement",
    description:
      "We present our recommendations, gather feedback, and refine the strategy until it feels right.",
    icon: Presentation,
  },
  {
    number: 4,
    title: "Implementation Support",
    description:
      "We stay engaged as you execute, providing guidance, troubleshooting challenges, and adjusting the plan as needed.",
    icon: Wrench,
  },
  {
    number: 5,
    title: "Ongoing Advisory",
    description:
      "Many clients retain us for ongoing advisory support as their trusted technology partner.",
    icon: RefreshCcw,
  },
];

export default function HowWeWork() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#F8FAFC] via-white to-[#EAF3FF] overflow-hidden">
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[300px] h-[300px] bg-blue-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-200/30 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0A1733]">
            How We Work
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-base sm:text-lg">
            A structured, transparent approach that keeps your business goals at the center.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:flex relative justify-between items-center">
          {/* Center Line */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-[#007BFF]/10 via-[#007BFF]/40 to-[#007BFF]/10 rounded-full" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative w-[18%] flex flex-col items-start text-left ${
                  isEven ? "pt-60" : "pb-60"
                }`}
              >
                {/* Faded Number */}
                <span
                  className={`absolute text-[60px] md:text-[70px] font-extrabold text-[#007BFF]/10 ${
                    isEven ? "top-[130px]" : "bottom-[130px]"
                  }`}
                >
                  {step.number}
                </span>

                {/* Dot */}
                <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#007BFF] rounded-full border-4 border-white shadow-md" />

                {/* Content */}
                <div
                  className={`relative z-10 w-full flex flex-col items-start ${
                    isEven ? "mb-6 mt-10" : "mt-8 mb-6"
                  }`}
                >
                  <Icon className="text-[#007BFF]" size={26} />
                  <h3 className="text-lg font-semibold text-[#0A1733] mt-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed max-w-[240px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Timeline */}
        <div className="flex md:hidden flex-col relative">
          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-[#007BFF]/30" />
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative pl-12 mb-10"
              >
                {/* Dot */}
                <div className="absolute left-[6px] top-2 w-4 h-4 bg-[#007BFF] rounded-full border-4 border-white" />

                {/* Content */}
                <div>
                  <span className="text-[#007BFF]/30 text-2xl font-extrabold">
                    {step.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <Icon className="text-[#007BFF]" size={20} />
                    <h3 className="text-lg font-semibold text-[#0A1733]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
