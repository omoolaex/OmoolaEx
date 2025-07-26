'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import JobApplyModal from '@/components/JobApplyModal'

const jobs = [
  {
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build amazing user interfaces using React, Tailwind CSS, and more.',
  },
  {
    title: 'UI/UX Designer',
    location: 'Hybrid - Lagos',
    type: 'Part-time',
    description: 'Design beautiful, intuitive interfaces and improve user experiences.',
  },
  {
    title: 'Digital Marketer',
    location: 'Remote',
    type: 'Contract',
    description: 'Drive growth and visibility through SEO, SEM, and creative campaigns.',
  },
  {
    title: 'Social Media Manager',
    location: 'Remote',
    type: 'Full-time/Part-time',
    description: 'Manage social media presence and engage with community.',
  },
]

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null)

  const handleApplyClick = (jobTitle) => {
    setSelectedJob(jobTitle)
  }

  const handleCloseModal = () => {
    setSelectedJob(null)
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20" aria-label="Careers">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join the OmoolaEx Team
        </motion.h2>
        <p className="mt-4 text-center text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          We’re on the lookout for passionate, creative, and curious minds ready to build the future with us.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              className="border border-gray-200 rounded-xl p-6 bg-gray-50 hover:shadow-md transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-3">{job.description}</p>
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2 mb-4">
                <span className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1">
                  📍 {job.location}
                </span>
                <span className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1">
                  ⏱ {job.type}
                </span>
              </div>
              <button
                onClick={() => handleApplyClick(job.title)}
                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition cursor-pointer"
              >
                Apply Now →
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <JobApplyModal show={!!selectedJob} onClose={handleCloseModal} jobTitle={selectedJob} />
    </section>
  )
}