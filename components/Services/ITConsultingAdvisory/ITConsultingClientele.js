"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const checklistItems = [
  {
    title: "Growing SMEs",
    description:
      "that have outgrown ad-hoc technology decisions and need a strategic framework for IT investments.",
  },
  {
    title: "Startups",
    description:
      "planning their technology foundation and want to avoid costly mistakes while building for scale.",
  },
  {
    title: "Corporates",
    description:
      "undergoing digital transformation, modernizing legacy systems, or optimizing existing IT infrastructure.",
  },
  {
    title: "Leadership Teams",
    description:
      "making major technology decisions (cloud migration, ERP implementation, digital transformation) and need expert advisory.",
  },
  {
    title: "Businesses Experiencing",
    description:
      "rapid growth straining current systems, rising IT costs without clear ROI, failed technology projects, or resistance to digital change.",
  },
];

export default function ITConsultingChecklist() {
  return (
    <section className="relative bg-gradient-to-br from-[#F5F8FF] via-white to-[#EAF3FF] py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-[-80px] right-[-100px] w-[400px] h-[400px] bg-[#007BFF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-100px] w-[320px] h-[320px] bg-[#00B4FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* === Left Column — Checklist === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A1733] mb-8">
            Who Needs IT Consulting & Advisory
          </h2>

          <ul className="flex flex-col gap-6">
            {checklistItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <CheckCircle className="w-6 h-6 text-[#007BFF] flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  <strong className="text-[#0A1733]">{item.title}</strong>{" "}
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* === Right Column — Image === */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src="/images/it-consulting-audience.png"
            alt="IT Consulting Audience"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
