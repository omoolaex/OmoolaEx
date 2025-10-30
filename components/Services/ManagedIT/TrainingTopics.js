"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  ShieldCheck,
  Cpu,
  Cloud,
  Database,
  Users,
  Workflow,
  Rocket,
} from "lucide-react";

export default function TrainingTopicsSection() {
  const trainingTopics = [
    {
      icon: ShieldCheck,
      title: "Cybersecurity Awareness",
    },
    {
      icon: Cpu,
      title: "Digital Productivity Tools",
    },
    {
      icon: Cloud,
      title: "Cloud Fundamentals",
    },
    {
      icon: Database,
      title: "Data Protection & Compliance",
    },
    {
      icon: Users,
      title: "Collaboration Tools",
    },
    {
      icon: Workflow,
      title: "Automation & Workflow",
    },
    {
      icon: Rocket,
      title: "Digital Leadership",
    },
  ];

  const repeatedTopics = [...trainingTopics, ...trainingTopics];

  return (
    <section className="relative bg-white text-gradient-to-b from-[#0E1A3C] via-[#081530] to-[#0B1736] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* accent line */}
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
          Training Topics We Cover
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#0E1A3C] max-w-3xl mx-auto mb-14 text-sm sm:text-base leading-relaxed"
        >
          Our training programs are designed to build digital confidence across your team —
          combining technical knowledge with real-world application to improve security,
          collaboration, and productivity.
        </motion.p>

        {/* scrolling cards */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-10 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
          >
            {repeatedTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 w-40 sm:w-44 h-28 flex flex-col items-center justify-center rounded-xl bg-[#071230]/80 backdrop-blur-sm border border-white/10 hover:border-[#00D1FF]/40 hover:scale-105 hover:shadow-[0_0_25px_#00D1FF40] transition-all duration-500"
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00D1FF33] to-[#0066FF22] border border-[#00D1FF33] mb-3">
                    <Icon className="w-7 h-7 text-[#00D1FF] drop-shadow-[0_0_8px_#00D1FF80]" />
                  </div>
                  <p className="text-sm text-[#E6EDF8] font-medium">
                    {topic.title}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* edge fades */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#0E1A3C] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#0E1A3C] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
