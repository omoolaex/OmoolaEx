'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import {
  Code,
  Layout,
  Palette,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react'

const services = [
  {
    icon: <Layout className="w-8 h-8 text-blue-600" />,
    title: 'Web Design & Development',
    description: 'Custom, responsive websites crafted to engage and convert.',
    link: '/services/web-development',
  },
  {
    icon: <Palette className="w-8 h-8 text-blue-600" />,
    title: 'Brand Design',
    description: 'Visual identity systems that stand out and remain consistent.',
    link: '/services/brand-design',
  },
  {
    icon: <Code className="w-8 h-8 text-blue-600" />,
    title: 'Custom Software',
    description: 'Tailored applications that solve specific business problems.',
    link: '/services/software-development',
  },
  {
    icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
    title: 'E-commerce Solutions',
    description: 'Seamless online stores optimized for performance & sales.',
    link: '/services/ecommerce',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: 'Cybersecurity',
    description: 'Keeping your digital assets safe from evolving threats.',
    link: '/services/cybersecurity',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
    title: 'Digital Marketing',
    description: 'Growth-driven marketing campaigns across channels.',
    link: '/services/digital-marketing',
  },
]

export default function WhatWeDo() {
  const controls = useAnimation()
  const carouselRef = useRef(null)
  const inView = useInView(carouselRef, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start({
        x: ['0%', '-50%'],
        transition: { duration: 35, repeat: Infinity, ease: 'linear' },
      })
    }
  }, [inView, controls])

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-16"
        >
          What We Do
        </motion.h2>

        {/* Auto-Scrolling Container */}
        <div className="relative overflow-hidden" ref={carouselRef}>
          <motion.div
            className="flex gap-8 min-w-fit"
            animate={controls}
            initial={{ x: '30%' }}
          >
            {[...services, ...services].map((service, index) => (
              <motion.a
                href={service.link}
                key={index}
                whileHover={{ scale: 1.05 }}
                className="block w-[300px] min-w-[300px] bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex-shrink-0 transition-all hover:shadow-lg hover:border-blue-300"
              >
                <div className="mb-4">{service.icon}</div>
                <h4 className="text-lg font-semibold text-blue-800 mb-2">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}