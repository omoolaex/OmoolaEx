"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Palette,
  BarChart3,
  Share2,
  LineChart,
  FileText,
} from "lucide-react";

export default function BrandGrowthServices() {
  const services = [
    {
      icon: Palette,
      title: "Brand Identity & Experience Design",
      description:
        "Create a brand that resonates with your audience. We craft complete identity systems — visual design, messaging tone, and brand guidelines — to build recognition and trust across all touchpoints.",
    },
    {
      icon: BarChart3,
      title: "Digital Marketing Strategy",
      description:
        "We develop data-driven marketing plans aligned with your goals, combining channel selection, messaging, and content strategy to drive awareness, engagement, and measurable conversions.",
    },
    {
      icon: Share2,
      title: "Social Media Setup & Management",
      description:
        "We help brands show up strategically online — from profile setup and content calendars to ongoing management and audience engagement — building meaningful connections and ROI.",
    },
    {
      icon: LineChart,
      title: "Analytics & Performance Optimization",
      description:
        "We turn data into direction. Our team tracks performance, builds intuitive dashboards, and continuously optimizes campaigns to improve impact and ROI.",
    },
    {
      icon: FileText,
      title: "Content Strategy & Execution",
      description:
        "We plan, create, and distribute valuable content that educates and converts — from blog articles to video campaigns, built around your audience and business goals.",
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
