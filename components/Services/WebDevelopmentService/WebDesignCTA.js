// /components/services/ServicesCTA.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesCTA() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-6 text-center text-white max-w-4xl">
        
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold leading-snug mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let’s Build Your Digital Future with{" "}
          <span className="text-yellow-300">OmoolaEx</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-base sm:text-lg md:text-xl mb-10 text-gray-100 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          From web design to cybersecurity, digital marketing, and IT consulting — 
          <span className="font-semibold text-white"> OmoolaEx </span>
          empowers businesses with innovative solutions that drive growth, 
          enhance security, and strengthen your brand identity.  
          <br className="hidden sm:block" />Your journey to digital success starts here.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href="/bookings"
            className="inline-block bg-white text-blue-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
          >
            Request a Free Consultation
          </Link>
          <Link
            href="/services"
            className="inline-block border-2 border-white text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-white hover:text-blue-700 transition duration-300"
          >
            Explore Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
