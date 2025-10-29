"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function TechnologiesSection() {
  const techLogos = [
    { src: "/images/technologies/wordpress.svg", alt: "WordPress" },
    { src: "/images/technologies/react.svg", alt: "React" },
    { src: "/images/technologies/nextjs.svg", alt: "Next.js" },
    { src: "/images/technologies/nodejs.svg", alt: "Node.js" },
    { src: "/images/technologies/flutter.svg", alt: "Flutter" },
    { src: "/images/technologies/react-native.svg", alt: "React Native" },
    { src: "/images/technologies/javascript.svg", alt: "JavaScript" },
    { src: "/images/technologies/docker.svg", alt: "Docker" },
    { src: "/images/technologies/firebase.svg", alt: "Firebase" },
    { src: "/images/technologies/mongodb.svg", alt: "MongoDB" },
    { src: "/images/technologies/postgresql.svg", alt: "PostgreSQL" },
    { src: "/images/technologies/mysql.svg", alt: "MySQL" },
    { src: "/images/technologies/github.svg", alt: "GitHub" },
    { src: "/images/technologies/django.svg", alt: "Django" },
    { src: "/images/technologies/php.svg", alt: "PHP" },
    { src: "/images/technologies/aws.svg", alt: "AWS" },
    { src: "/images/technologies/azure.svg", alt: "Azure" },
    { src: "/images/technologies/google-cloud.svg", alt: "Google Cloud" },
    { src: "/images/technologies/elementor.svg", alt: "Elementor" },
    { src: "/images/technologies/woocommerce.svg", alt: "WooCommerce" },
  ];

  // Duplicate list for seamless infinite scroll
  const repeatedLogos = [...techLogos, ...techLogos];

  return (
    <section className="relative bg-white text-gradient-to-b from-[#0E1A3C] via-[#081530] to-[#0B1736] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mx-auto w-24 h-1 bg-gradient-to-r from-[#00D1FF] to-[#0066FF] rounded-full mb-8"
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="font-poppins font-semibold text-2xl sm:text-3xl lg:text-4xl mb-6"
        >
          Technologies We Work With
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#2c2d2e] max-w-3xl mx-auto mb-14 text-sm sm:text-base leading-relaxed"
        >
          We build with reliable and scalable technologies — combining frameworks, databases, and cloud tools that empower modern businesses.
        </motion.p>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-10 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear",
            }}
          >
            {repeatedLogos.map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 sm:w-32 h-20 flex items-center justify-center rounded-xl bg-[#071230]/60 backdrop-blur-sm border border-white/10 hover:border-[#00D1FF]/40 hover:scale-105 transition-all duration-500"
              >
                <Image
                  src={tech.src}
                  alt={tech.alt}
                  width={80}
                  height={80}
                  className="object-contain w-14 h-14 sm:w-16 sm:h-16"
                />
              </div>
            ))}
          </motion.div>

          {/* subtle gradient fades on edges */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#757880] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#757880] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
