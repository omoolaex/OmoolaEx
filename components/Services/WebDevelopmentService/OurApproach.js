"use client";

import { motion } from "framer-motion";
import { FaSearch, FaPencilRuler, FaCode, FaRocket } from "react-icons/fa";

export default function OurApproach() {
  const steps = [
    {
      title: "Discovery & Planning",
      desc: "We start by understanding your business goals, target audience, and unique requirements to create a custom web strategy.",
      icon: <FaSearch className="text-2xl sm:text-3xl text-indigo-500" />,
    },
    {
      title: "UI/UX Design",
      desc: "Our design team crafts intuitive and visually appealing interfaces focused on user experience and engagement.",
      icon: <FaPencilRuler className="text-2xl sm:text-3xl text-pink-500" />,
    },
    {
      title: "Development & Testing",
      desc: "We build fast, responsive, and SEO-friendly websites using modern technologies and rigorously test them for quality and performance.",
      icon: <FaCode className="text-2xl sm:text-3xl text-green-500" />,
    },
    {
      title: "Launch & Support",
      desc: "After launch, we provide continuous support, maintenance, and optimizations to ensure your website stays ahead of the curve.",
      icon: <FaRocket className="text-2xl sm:text-3xl text-yellow-500" />,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 leading-snug text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Web Design & Development Process
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 group flex flex-col h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
