'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import JobApplyModal from '@/components/JobApplyModal'

// ✅ Export jobs array so it can be used in CareersPage structured data
export const jobs = [
  {
    title: 'UI/UX Designer Intern',
    location: 'Hybrid - Lagos',
    type: 'Internship',
    description: 'Assist in designing intuitive user interfaces and improving user experiences.',
  },
  {
    title: 'Digital Marketer Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Support growth through SEO, SEM, and creative online campaigns.',
  },
  {
    title: 'Social Media Manager Intern',
    location: 'Hybrid - Lagos',
    type: 'Internship',
    description: 'Help manage social media presence, create content, and engage with the community.',
  },
  {
    title: 'Project Manager Intern',
    location: 'Hybrid - Lagos',
    type: 'Internship',
    description: 'Assist in planning, tracking, and coordinating projects across teams.',
  },
  {
    title: 'WordPress Developer Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Support development of WordPress websites and maintain site performance.',
  },
  {
    title: 'Frontend Developer Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Work on building responsive, interactive web applications using modern frameworks.',
  },
  {
    title: 'Backend Developer Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Assist in building and maintaining backend systems, APIs, and integrations.',
  },
  {
    title: 'Graphics Designer Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Create compelling graphics and visual content for digital platforms.',
  },
  {
    title: 'Content Writer / Copywriter Intern',
    location: 'Remote',
    type: 'Internship',
    description: 'Write blogs, website copy, and marketing content to strengthen brand voice.',
  },
  {
    title: 'Business Development Intern',
    location: 'Hybrid - Lagos',
    type: 'Internship',
    description: 'Research leads, support outreach, and assist in preparing client proposals.',
  },
]

export default function Careers() {
  const [selectedJob, setSelectedJob] = useState(null)

  const handleApplyClick = (jobTitle) => setSelectedJob(jobTitle)
  const handleCloseModal = () => setSelectedJob(null)

  const handleShare = (job) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const shareText = `Check out this internship opening: ${job.title} at OmoolaEx\n${url}#${job.title.replace(/\s+/g, '-')}`

    if (navigator.share) {
      navigator.share({ title: job.title, text: shareText, url })
    } else {
      navigator.clipboard.writeText(shareText)
      alert('Job link copied to clipboard!')
    }
  }

  return (
    <section
      id="careers"
      className="bg-white py-16 px-4 sm:px-6 md:px-12 lg:px-20"
      aria-label="Careers"
    >
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
              id={job.title.replace(/\s+/g, '-')}
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
              <div className="flex gap-3">
                <button
                  onClick={() => handleApplyClick(job.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Apply Now →
                </button>
                <button
                  onClick={() => handleShare(job)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Share ↗
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <JobApplyModal show={!!selectedJob} onClose={handleCloseModal} jobTitle={selectedJob} />
    </section>
  )
}
