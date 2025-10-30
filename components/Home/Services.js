'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Briefcase, Layers, Globe2, Cloud, ShieldCheck } from 'lucide-react'

export default function CoreServices() {
  const services = [
    {
      title: 'IT Consulting & Advisory',
      description:
        'Strategic IT guidance that helps you develop robust strategies, navigate digital transformation, and make technology decisions that drive real business value.',
      icon: <Briefcase className="w-6 h-6 text-blue-700" />,
      href: '/services/it-consulting-advisory',
    },
    {
      title: 'Digital Solutions & Systems Integration',
      description:
        'Custom software, web and mobile applications, and seamless systems integration that fit your unique business needs.',
      icon: <Layers className="w-6 h-6 text-blue-700" />,
      href: '/services/digital-solutions-systems-integration',
    },
    {
      title: 'Brand & Digital Growth Consulting',
      description:
        'Strengthen your digital presence with strategic brand design, digital marketing, and performance optimization that drives growth.',
      icon: <Globe2 className="w-6 h-6 text-blue-700" />,
      href: '/services/brand-digital-growth-consulting',
    },
    {
      title: 'Cloud Solutions & IT Infrastructure',
      description:
        'Modern cloud migration, infrastructure setup, data security, and collaboration tools that keep your business running smoothly.',
      icon: <Cloud className="w-6 h-6 text-blue-700" />,
      href: '/services/cloud-solutions-it-infrastructure',
    },
    {
      title: 'Managed IT Services & Capacity Building',
      description:
        'Reliable IT support and training programs that empower your team with the digital skills needed for success.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-700" />,
      href: '/services/managed-it-services-capacity-building',
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-white via-slate-50 to-blue-50 py-20 sm:py-24 md:py-28 overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left column — Narrow Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/3 flex flex-col justify-center mt-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
            What We <span className="text-blue-700">Do</span>
          </h2>
          <p className="text-slate-700 text-lg leading-relaxed mb-6">
            <span className="text-blue-800 font-medium">
              We deliver tailored IT consulting, infrastructure, and digital growth solutions
            </span>{' '}
            that help organizations operate smarter, faster, and more securely. Every engagement is designed to
            drive measurable business outcomes.
          </p>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-10">
            At <span className="font-semibold text-blue-700">OmoolaEx</span>, we don’t just implement technology —
            we align it with strategy, people, and process.
          </p>

          <Link
            href="/services"
            className="inline-block bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium shadow-sm hover:bg-blue-800 transition-all duration-300 self-start"
          >
            Explore All Services →
          </Link>
        </motion.div>

        {/* Right column — Wider Service Grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:pt-6 justify-items-center"
        >
          {services.map((service, index) => (
            <Link key={index} href={service.href} className="group w-full max-w-sm">
              <div className="border border-slate-200 rounded-xl p-7 bg-white hover:border-blue-200 hover:bg-blue-400/20 transition-all duration-300 flex flex-col h-full justify-between">
                <div className="flex items-center justify-start mb-4">
                  <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-800 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
