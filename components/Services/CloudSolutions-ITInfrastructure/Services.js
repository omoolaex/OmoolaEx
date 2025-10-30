"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CloudUpload,
  ServerCog,
  ShieldCheck,
  Users,
  RefreshCw,
} from "lucide-react";

export default function CloudServices() {
  const services = [
    {
      icon: CloudUpload,
      title: "Cloud Migration & Deployment",
      description:
        "Strategic migration from on-premise to cloud infrastructure. We assess your systems, plan migration paths that minimize disruption, execute migrations with minimal downtime, and optimize cloud environments for performance and cost. Whether AWS, Azure, Google Cloud, or other platforms, we guide you through the entire journey.",
    },
    {
      icon: ServerCog,
      title: "Infrastructure Setup & Optimization",
      description:
        "Build or improve IT infrastructure that supports your operations reliably. We design network architectures, configure server environments, implement security protocols, and optimize existing infrastructure for better performance and efficiency. Solid foundations that let you focus on business, not IT firefighting.",
    },
    {
      icon: ShieldCheck,
      title: "Data Security & Backup Solutions",
      description:
        "Protect your critical business data with robust security and backup systems. We implement multi-layered security approaches, configure automated backup solutions, establish disaster recovery protocols, and ensure compliance with data protection requirements. Your data stays safe, accessible, and recoverable.",
    },
    {
      icon: Users,
      title: "Collaboration Tools Integration",
      description:
        "Enable seamless teamwork with integrated collaboration platforms. We implement and configure tools like Microsoft 365, Google Workspace, project management systems, and communication platforms that improve productivity and keep teams connected regardless of location.",
    },
    {
      icon: RefreshCw,
      title: "Disaster Recovery Planning",
      description:
        "Prepare for the unexpected with comprehensive recovery strategies. We develop disaster recovery plans, implement backup systems, establish recovery procedures, and test regularly to ensure your business can continue operating even when things go wrong. Minimize downtime, protect revenue.",
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
          Our Cloud & Infrastructure Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-center text-[#0E1A3C] max-w-3xl mx-auto mb-14 leading-relaxed"
        >
          We deliver end-to-end cloud and infrastructure solutions — from migration and setup to
          data protection and disaster recovery. Each service is designed to strengthen your
          technology foundation, enhance security, and keep your business running efficiently.
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
