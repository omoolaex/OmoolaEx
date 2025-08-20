// /components/services/WhyWebDesignMatters.js
"use client";

import { motion } from "framer-motion";
import { Monitor, TrendingUp, Smartphone, Zap } from "lucide-react";

const features = [
  {
    title: "First Impressions Count",
    description:
      "Your website is your digital storefront. A clean, professional design builds instant trust and credibility with potential clients.",
    icon: Monitor,
  },
  {
    title: "Boost Business Growth",
    description:
      "Modern web design improves usability, SEO rankings, and conversions — helping your brand grow faster in a competitive market.",
    icon: TrendingUp,
  },
  {
    title: "Mobile-First Experience",
    description:
      "With most users browsing on mobile, responsive design ensures your site looks and works flawlessly on any device.",
    icon: Smartphone,
  },
  {
    title: "Fast & User-Friendly",
    description:
      "From lightning-fast load speeds to intuitive navigation, every element is optimized to enhance user experience and engagement.",
    icon: Zap,
  },
];

export default function WhyWebDesignMatters() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Web Design Matters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Great design goes beyond aesthetics — it shapes user experience, 
            boosts conversions, and sets your brand apart in the digital world.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-blue-50 text-blue-600 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Bar */}
        <motion.div
          className="mt-16 bg-blue-600 text-white rounded-2xl py-10 px-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-center sm:text-left leading-snug">
            Ready to build a stunning website that drives results?
          </h3>
          <a
            href="#contact" // 🔗 replace with modal if needed
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Get Started
          </a>
        </motion.div>

      </div>
    </section>
  );
}
