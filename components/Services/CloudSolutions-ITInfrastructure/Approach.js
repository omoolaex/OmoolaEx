"use client";

import { motion } from "framer-motion";
import { ServerCog, ShieldCheck, CloudUpload, LineChart } from "lucide-react";
import React from "react";

export default function CloudInfrastructureApproach() {
  const highlights = [
    {
      icon: ServerCog,
      text: "Assess your current infrastructure to understand performance gaps, risks, and opportunities.",
    },
    {
      icon: CloudUpload,
      text: "Design cloud or hybrid solutions that enhance reliability, scalability, and efficiency.",
    },
    {
      icon: ShieldCheck,
      text: "Embed strong security and compliance controls from the foundation up.",
    },
    {
      icon: LineChart,
      text: "Optimize performance and cost continuously for sustainable growth.",
    },
  ];

  return (
    <section
      id="approach"
      className="relative bg-gradient-to-b from-[#0E1A3C] to-[#14264C] text-white py-24 lg:py-32 overflow-hidden"
    >
      {/* layered glow backgrounds */}
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
          Our Cloud & Infrastructure Approach
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-[#E6EDF8] leading-relaxed max-w-3xl mx-auto mb-10"
        >
          We don’t push cloud migration because it’s trendy — we recommend it when it makes business sense.
          Our approach begins with assessing your existing infrastructure and understanding your operational needs,
          then designing solutions that improve reliability, strengthen security, and scale with your growth while
          keeping costs in check.
          <br />
          Whether it’s full cloud migration, hybrid environments, or infrastructure optimization, we tailor every
          solution to fit your reality.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-[#071230]/70 border border-white/10 p-6 backdrop-blur-sm hover:shadow-[0_0_20px_#0066FF30] transition-transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-[#00D1FF]" />
                </div>
                <p className="text-sm text-[#C9D8FF] leading-relaxed">{item.text}</p>
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
          Scalable. Secure. Strategically aligned with your business.
        </motion.p>
      </div>
    </section>
  );
}
