"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function TechnologiesSection() {
  const cloudPlatformLogos = [
    {
      src: "/images/cloud/aws.svg",
      alt: "Amazon Web Services (AWS)",
    },
    {
      src: "/images/cloud/azure.svg",
      alt: "Microsoft Azure",
    },
    {
      src: "/images/cloud/google-cloud.svg",
      alt: "Google Cloud Platform (GCP)",
    },
    {
      src: "/images/cloud/oracle-cloud.svg",
      alt: "Oracle Cloud Infrastructure",
    },
    {
      src: "/images/cloud/digitalocean.svg",
      alt: "DigitalOcean",
    },
    {
      src: "/images/cloud/vultr.svg",
      alt: "Vultr",
    },
    {
      src: "/images/cloud/ibm-cloud.svg",
      alt: "IBM Cloud",
    },
    {
      src: "/images/cloud/linode.svg",
      alt: "Linode (Akamai Cloud)",
    },
    {
      src: "/images/cloud/alibaba.svg",
      alt: "Alibaba Cloud",
    },
  ];

  // Duplicate list for seamless infinite scroll
  const repeatedLogos = [...cloudPlatformLogos, ...cloudPlatformLogos];

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
          Cloud Platforms We Work With
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-[#2c2d2e] max-w-3xl mx-auto mb-14 text-sm sm:text-base leading-relaxed"
        >
          We deploy and manage infrastructure across leading cloud platforms — selecting the best-fit
          environment based on performance, compliance, and scalability needs.
        </motion.p>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-10 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
          >
            {repeatedLogos.map((tech, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 sm:w-32 h-20 flex items-center justify-center rounded-xl bg-[#a1a4ac] backdrop-blur-sm border border-white/10 hover:border-[#00D1FF]/40 hover:scale-105 transition-all duration-500"
              >
                <Image
                  src={tech.src}
                  alt={tech.alt}
                  width={120}
                  height={120}
                  className="object-contain w-20 h-20 sm:w-24 sm:h-24"
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
