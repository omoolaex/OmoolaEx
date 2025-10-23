'use client'
import { motion } from 'framer-motion'
import { FaHandshake, FaRocket, FaCogs, FaUserShield, FaSmile } from 'react-icons/fa'

const reasons = [
  {
    title: 'Tailored to Your Reality',
    desc: 'We offer solutions designed around your specific business context, challenges, and budget realities.',
    icon: <FaHandshake />
  },
  {
    title: 'Implementation, Not Just Plans',
    desc: 'A strategy document doesn\'t help if you can\'t execute it. We stay with you through implementation, providing hands-on support until solutions are working as intended.',
    icon: <FaRocket />
  },
  {
    title: 'Training & Knowledge Transfer',
    desc: 'We empower your team to own and evolve the solutions we build together. You\'re never left dependent on us for basic operations.',
    icon: <FaCogs />
  },
  {
    title: 'Transparent Communication',
    desc: 'Clear explanations, realistic timelines, and honest assessments. We tell you what\'s possible, what it will take, and what you can expect—then we deliver on those commitments.',
    icon: <FaUserShield />
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We measure success by your growth, not project completion. Our goal is to become your trusted technology partner for the long haul.',
    icon: <FaSmile />
  },
]

export default function WhyChooseUsTimeline() {
  return (
    <section className="relative bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div className="text-center mb-12"
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.6}}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Why Choose OmoolaEx Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We deliver practical, sustainable IT solutions with a focus on partnership, transparency, and measurable growth.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-blue-200"></div>

          <div className="space-y-12">
            {reasons.map((r, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                  initial={{opacity:0, y:30}}
                  whileInView={{opacity:1, y:0}}
                  transition={{duration:0.5, delay:i*0.1}}
                >
                  {/* Numbered badge */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 z-10 shadow-md flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>

                  {/* Card */}
                  <div className={`bg-white rounded-3xl shadow-md p-6 md:w-5/12 flex flex-col ${isLeft ? 'md:mr-auto md:text-left' : 'md:ml-auto md:text-left'}`}>
                    {/* Icon */}
                    <div className="flex items-center mb-3 text-blue-600 text-2xl">
                      {r.icon}
                    </div>
                    {/* Title */}
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{r.title}</h4>
                    {/* Description */}
                    <p className="text-gray-600 text-sm">{r.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
