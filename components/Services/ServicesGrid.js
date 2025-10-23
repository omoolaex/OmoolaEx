'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaLaptop, FaCode, FaPaintBrush, FaGlobe, FaLock } from 'react-icons/fa'

const services = [
  {
    title: 'IT Consulting & Advisory',
    icon: <FaLaptop size={36} className="text-blue-600" />,
    desc: 'Strategic technology guidance for businesses that want to make smarter decisions about their IT investments. Whether planning digital transformation, optimizing technology costs, or needing expert advisory on complex IT challenges, we provide insights, frameworks, and roadmaps.',
    keyServices: [
      'IT Strategy Development',
      'Digital Transformation Consulting',
      'Technology Cost Optimization',
      'Process Audit & Advisory Sessions',
      'Data Analytics & Business Intelligence',
    ],
    useCase: 'Perfect for businesses needing strategic clarity before major technology investments, companies navigating digital transformation, or leadership teams seeking expert guidance.',
    link: '/services/it-consulting',
  },
  {
    title: 'Digital Solutions & Systems Integration',
    icon: <FaCode size={36} className="text-blue-600" />,
    desc: 'Custom-built technology that fits your unique business needs. From websites and mobile apps to enterprise software and seamless systems integration, we create solutions that your customers love and your team can actually use.',
    keyServices: [
      'Website Development',
      'Web & Mobile Applications',
      'Custom Software Solutions',
      'Systems Integration',
      'API Development & Third-Party Integrations',
    ],
    useCase: 'Ideal for businesses that need custom software to solve specific problems or organizations integrating multiple systems for seamless operations.',
    link: '/services/digital-solutions',
  },
  {
    title: 'Brand & Digital Growth Consulting',
    icon: <FaPaintBrush size={36} className="text-blue-600" />,
    desc: 'Build a brand that stands out and implement digital strategies that drive measurable growth. From brand identity to social media management and performance analytics, we focus on growth outcomes that matter to your bottom line.',
    keyServices: [
      'Brand Identity & Experience Design',
      'Digital Marketing Strategy',
      'Social Media Setup & Management',
      'Analytics & Performance Optimization',
      'Content Strategy & Execution',
    ],
    useCase: 'Perfect for startups establishing market presence, businesses rebranding, or companies scaling digital marketing strategically.',
    link: '/services/digital-growth',
  },
  {
    title: 'Cloud Solutions & IT Infrastructure',
    icon: <FaGlobe size={36} className="text-blue-600" />,
    desc: 'Modern, scalable, and secure cloud infrastructure that supports your business growth. We guide you through migration, optimization, and security, ensuring reliable and cost-effective systems.',
    keyServices: [
      'Cloud Migration & Deployment',
      'Infrastructure Setup & Optimization',
      'Data Security & Backup Solutions',
      'Collaboration Tools Integration',
      'Disaster Recovery Planning',
    ],
    useCase: 'Ideal for businesses moving from on-premise to cloud infrastructure or organizations prioritizing data security and business continuity.',
    link: '/services/cloud-solutions',
  },
  {
    title: 'Managed IT Services & Capacity Building',
    icon: <FaLock size={36} className="text-blue-600" />,
    desc: 'Reliable IT support and empowered teams. Our managed services ensure smooth operations while providing training programs for your team to thrive in a technology-driven workplace.',
    keyServices: [
      'Managed IT Support',
      'Cybersecurity Awareness Training',
      'Staff Training on Digital Tools',
      'Capacity Building Programs',
      'Help Desk & Technical Support',
    ],
    useCase: 'Perfect for businesses without in-house IT teams or companies investing in employee digital literacy and cybersecurity awareness.',
    link: '/services/managed-it',
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <motion.div
        className="max-w-7xl mx-auto px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Our Services</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore our range of IT consulting and digital solutions tailored to Nigerian businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg hover:scale-105 transition flex flex-col h-full"
            >
              {/* Icon */}
              <div className="flex items-center mb-3">
                {s.icon}
                <h3 className="text-xl font-semibold ml-3 text-gray-800">{s.title}</h3>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-2">{s.desc}</p>

              {/* Key Services */}
              <div className="mb-2">
                <h4 className="text-blue-600 font-semibold mb-1 text-sm">Key Services:</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-0.5 ml-5">
                  {s.keyServices.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </div>

              {/* Use Case - quote style */}
              <blockquote className="italic text-gray-700 text-sm mb-2 border-l-2 border-blue-600 pl-3">
                {s.useCase}
              </blockquote>

              {/* Link */}
              <Link
                href={s.link}
                className="text-blue-600 font-semibold hover:underline mt-auto self-start text-sm"
              >
                Learn More →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
