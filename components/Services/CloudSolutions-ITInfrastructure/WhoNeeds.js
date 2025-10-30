"use client";

import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Network,
  Rocket,
  Layers,
  AlertTriangle,
} from "lucide-react";
import React from "react";

export default function WhoNeedsCloudSolutions() {
  const audience = [
    {
      icon: Building2,
      title: "Businesses Outgrowing Current Infrastructure",
      description:
        "Experiencing performance issues, capacity constraints, or reliability problems.",
    },
    {
      icon: Layers,
      title: "Companies Moving to Cloud",
      description:
        "Taking their first step into cloud environments and needing expert migration guidance.",
    },
    {
      icon: Network,
      title: "Organizations Prioritizing Data Security",
      description:
        "Requiring robust backup, security, and compliance solutions to protect critical data.",
    },
    {
      icon: Rocket,
      title: "Remote or Hybrid Teams",
      description:
        "Needing reliable collaboration tools and accessible infrastructure to stay productive anywhere.",
    },
    {
      icon: Users,
      title: "Businesses Reducing IT Costs",
      description:
        "Seeking efficiency through cloud optimization, infrastructure upgrades, or managed services.",
    },
    {
      icon: AlertTriangle,
      title: "Companies Experiencing Instability",
      description:
        "Facing frequent downtime, slow systems, security vulnerabilities, or poor disaster recovery readiness.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0E1A3C] to-[#081530] text-white py-24 lg:py-32 overflow-hidden">
      {/* Soft gradient accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#0066FF15,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#00D1FF10,_transparent_70%)]" />

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
          Who Needs Cloud Solutions & IT Infrastructure
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#E6EDF8] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          Cloud infrastructure isn’t just for tech giants. It’s for growing businesses ready to
          eliminate downtime, strengthen security, and scale without limits. Here’s who benefits
          most from OmoolaEx’s expertise.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {audience.map((item, index) => {
            const Icon = item.icon;
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
