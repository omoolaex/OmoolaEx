"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Smartphone, Code, Layers, Network } from "lucide-react";

export default function DigitalSolutionServices() {
  const services = [
    {
      icon: Globe,
      title: "Website Development",
      description:
        "Professional, conversion-focused websites built on modern frameworks. We craft fast, accessible sites that reflect your brand and drive measurable results — from leads to engagement.",
    },
    {
      icon: Smartphone,
      title: "Web & Mobile Applications",
      description:
        "Custom web and mobile apps built for real-world use. We streamline your internal operations and extend your customer reach with intuitive, reliable tools.",
    },
    {
      icon: Code,
      title: "Custom Software Solutions",
      description:
        "When off-the-shelf software falls short, we build enterprise systems tailored to your processes — flexible, scalable, and made to evolve with your business.",
    },
    {
      icon: Layers,
      title: "Systems Integration",
      description:
        "We make your tools work together. From CRMs to ERPs, we connect platforms and automate workflows to remove silos and manual tasks.",
    },
    {
      icon: Network,
      title: "API Development & Integrations",
      description:
        "Robust, secure APIs that extend your software’s capabilities. We also integrate third-party tools — payments, chat, analytics — for a unified experience.",
    },
  ];

  return (
    <section
      id="services"
      className="relative bg-white text-gradient-to-b from-[#14264C] to-[#0E1A3C] py-24 lg:py-32 overflow-hidden"
    >
      {/* background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_#00D1FF15,_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#0066FF10,_transparent_70%)]" />

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
          Our Digital Solutions Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#0E1A3C] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          From strategy to deployment, we deliver tailored digital products that connect your systems,
          simplify your operations, and scale with your business.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-2xl bg-[#071230]/80 border border-white/10 p-8 flex flex-col justify-between backdrop-blur-sm hover:shadow-[0_0_25px_#0066FF30] transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="mb-5 flex justify-center">
                    <div className="p-3 rounded-xl bg-[#0E1A3C] border border-[#00D1FF]/10 group-hover:border-[#00D1FF]/40 transition-colors">
                      <Icon className="w-8 h-8 text-[#00D1FF] group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-[#E6EDF8] text-center">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#C9D8FF] leading-relaxed text-center">
                    {service.description}
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
