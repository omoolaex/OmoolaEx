// /components/services/ServiceOverview.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ServiceOverview() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Text Content (first on mobile for readability) */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-snug text-gray-900">
            Web Design & Development Services
          </h1>
          <p className="text-gray-700 mb-5 text-base sm:text-lg leading-relaxed">
            At <span className="font-semibold text-blue-600">OmoolaEx</span>, we
            build modern, responsive, and SEO-friendly websites that not only look
            stunning but also drive results. From small businesses to enterprise-level
            solutions, our web design and development services are tailored to help
            your brand succeed online.
          </p>
          <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            Our team combines creative design, user experience best practices, and
            technical expertise to deliver websites that convert visitors into loyal
            customers.
          </p>
          <div className="flex justify-center lg:justify-start">
            <a
              href="#contact" // can be replaced with modal trigger
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-full">
            <Image
              src="/images/services/web-design-overview.jpg"
              alt="Team collaborating on web design project"
              width={600}
              height={400}
              priority
              className="rounded-2xl object-cover w-full h-auto shadow-lg hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
