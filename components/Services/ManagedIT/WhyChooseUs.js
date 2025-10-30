"use client";

import { motion } from "framer-motion";
import {
  Activity,
  MapPin,
  GraduationCap,
  Settings,
  ShieldCheck,
} from "lucide-react";
import React from "react";

export default function WhyChooseOmoolaExManaged() {
  const reasons = [
    {
      icon: Activity,
      title: "Proactive, Not Just Reactive",
      description:
        "We monitor and maintain systems continuously, preventing issues rather than just responding to problems.",
    },
    {
      icon: MapPin,
      title: "Local Presence",
      description:
        "Based in Lagos with deep understanding of Nigerian business realities, infrastructure challenges, and operating conditions.",
    },
    {
      icon: GraduationCap,
      title: "Practical Training Approach",
      description:
        "Our training focuses on real-world use cases and practical skills — not abstract theories that don’t translate to daily work.",
    },
    {
      icon: Settings,
      title: "Flexible Support Models",
      description:
        "From comprehensive managed IT services to targeted support, we tailor every engagement to your specific needs and budget.",
    },
    {
      icon: ShieldCheck,
      title: "Security-Conscious",
      description:
        "Security runs through everything we do — patch management, user access, data protection, and backup protocols.",
    },
  ];

  return (
    <section className="relative bg-white text-gradient-to-b from-[#081530] via-[#0E1A3C] to-[#14264C] py-24 lg:py-32 overflow-hidden">
      {/* background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0066FF10,_transparent_60%)]" />

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
          Why Choose OmoolaEx for Managed Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#0E1A3C] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          We combine proactive IT management, local expertise, and hands-on training to deliver
          dependable, secure, and context-aware managed services that keep your business running
          and your people empowered.
        </motion.p>

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
