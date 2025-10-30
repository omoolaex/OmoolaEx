"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Headphones,
  ShieldCheck,
  MonitorCheck,
  GraduationCap,
  Users,
} from "lucide-react";

export default function ManagedITServices() {
  const services = [
    {
      icon: Headphones,
      title: "Managed IT Support",
      description:
        "Comprehensive technology support that keeps your business running smoothly. We monitor your systems proactively, handle technical issues remotely or on-site, manage updates and patches, and maintain security protocols — your outsourced IT department on call.",
    },
    {
      icon: ShieldCheck,
      title: "Cybersecurity Awareness Training",
      description:
        "Equip your team to recognize and prevent security threats. Our training covers phishing recognition, password safety, safe browsing, and data handling. Interactive sessions that create genuine awareness, not just compliance checkboxes.",
    },
    {
      icon: MonitorCheck,
      title: "Staff Training on Digital Tools",
      description:
        "Help your team use technology confidently. We provide customized sessions on the tools your business relies on — from productivity suites and CRM systems to collaboration platforms — building competence and reducing frustration.",
    },
    {
      icon: GraduationCap,
      title: "Capacity Building Programs",
      description:
        "Develop digital capabilities systematically. We design programs that elevate your team’s literacy, introduce new technologies effectively, and create internal champions who can support peers long after training ends.",
    },
    {
      icon: Users,
      title: "Help Desk & Technical Support",
      description:
        "Responsive support when your team needs help. Our help desk handles password resets, troubleshooting, hardware issues, and user questions — fast, clear, and reliable every time.",
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
          Our Managed IT & Training Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#0E1A3C] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          We provide dependable IT management and hands-on training that keep your systems healthy
          and your teams empowered. From technical support to capacity building, we deliver
          solutions that strengthen your business and help your people thrive with technology.
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
