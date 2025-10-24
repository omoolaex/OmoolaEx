"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Local Expertise, Global Standards",
    description:
      "Grounded in Nigerian realities, aligned with international best practices.",
  },
  {
    title: "Implementation-Focused",
    description: "We stay through execution — not just advisory slides.",
  },
  {
    title: "Honest Assessments",
    description:
      "Straight talk. We tell you what’s realistic, not just what sounds good.",
  },
  {
    title: "Technology-Agnostic",
    description: "Your needs first. No vendor bias, no hidden agendas.",
  },
  {
    title: "8+ Years of IT Strategy Experience",
    description:
      "Seasoned leadership with cross-industry insight and execution depth.",
  },
];

export default function WhyChooseOmoolaExDark() {
  return (
    <section className="relative bg-[#0A1733] py-20 sm:py-24 md:py-28 text-white overflow-hidden">
      {/* === Background Accents === */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1733] via-[#0C1E40] to-[#071226]" />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute top-0 left-0 w-[200%] h-full bg-[repeating-linear-gradient(100deg,rgba(0,123,255,0.05)_0,rgba(0,123,255,0.05)_2px,transparent_2px,transparent_12px)]"
      />
      <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-[#007BFF]/15 via-transparent to-transparent blur-2xl" />

      {/* === Content === */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-14">
          Why Choose{" "}
          <span className="text-[#007BFF]">OmoolaEx</span> for IT Consulting
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="text-[#00B4FF] w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 mt-1 text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
