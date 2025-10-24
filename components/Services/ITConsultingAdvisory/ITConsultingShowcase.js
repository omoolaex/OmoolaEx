"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "IT Strategy Development",
    description:
      "Comprehensive technology roadmaps aligned with your business objectives. We help you define where you're going, what technology investments will get you there, and how to prioritize initiatives for maximum impact.",
    image: "/images/it-strategy.png",
  },
  {
    title: "Digital Transformation Consulting",
    description:
      "Practical guidance for businesses navigating digital change. We help you understand what digital transformation means for your business, develop realistic roadmaps, and execute change management strategies.",
    image: "/images/digital-transformation.png",
  },
  {
    title: "Technology Cost Optimization",
    description:
      "We audit your current technology spend, identify inefficiencies, and recommend optimizations that reduce costs without sacrificing performance. From cloud rightsizing to software license optimization, we help you invest wisely.",
    image: "/images/cost-optimization.png",
  },
  {
    title: "Process Audit & Advisory Sessions",
    description:
      "Expert evaluation of your technology processes and systems. We conduct thorough audits to identify bottlenecks, security vulnerabilities, and efficiency gaps, then provide actionable recommendations for improvement.",
    image: "/images/process-audit.png",
  },
  {
    title: "Data Analytics & Business Intelligence",
    description:
      "Turn data into decisions. We help you implement analytics systems that provide actionable insights, develop dashboards to track metrics that matter, and build data literacy within your team.",
    image: "/images/business-intelligence.png",
  },
];

export default function ITConsultingShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-[#F5F8FF] via-white to-[#EAF3FF] overflow-hidden">
      {/* Soft gradient glows */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#007BFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-100px] w-[300px] h-[300px] bg-[#00B4FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* === Left Column — Image === */}
        <div className="relative w-full lg:w-1/2 h-[260px] sm:h-[320px] md:h-[400px] lg:h-[460px] rounded-2xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={services[activeIndex].image}
                alt={services[activeIndex].title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* === Right Column — Text === */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Section Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1733] mb-2">
            Our IT Consulting <span className="text-[#007BFF]">Offerings</span>
          </h2>

          {/* Service Accordion */}
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.01 }}
              className={`rounded-xl border transition-colors duration-300 overflow-hidden ${
                activeIndex === index
                  ? "bg-[#EAF3FF] border-[#007BFF]"
                  : "bg-white border-gray-200 hover:border-[#007BFF]/40"
              }`}
            >
              <button
                onClick={() => setActiveIndex(index)}
                className="w-full text-left p-4 sm:p-5"
              >
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    activeIndex === index
                      ? "text-[#007BFF]"
                      : "text-[#0A1733]"
                  }`}
                >
                  {service.title}
                </h3>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.p
                      key="desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-gray-700 text-sm sm:text-base leading-relaxed"
                    >
                      {service.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
