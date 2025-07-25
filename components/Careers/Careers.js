'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, MapPin, Search } from 'lucide-react'

const jobList = [
  {
    title: 'Frontend Developer (React/Next.js)',
    type: 'Full-Time',
    location: 'Remote',
    link: '#',
  },
  {
    title: 'UI/UX Designer',
    type: 'Contract',
    location: 'Lagos, Nigeria',
    link: '#',
  },
  {
    title: 'Digital Marketer',
    type: 'Full-Time',
    location: 'Hybrid - Lagos',
    link: '#',
  },
  {
    title: 'WordPress Developer',
    type: 'Part-Time',
    location: 'Remote',
    link: '#',
  },
  {
    title: 'IT Support Engineer',
    type: 'Full-Time',
    location: 'Lagos Office',
    link: '#',
  },
    {
    title: 'Graphics Designer',
    type: 'Full-Time',
    location: 'Lagos Office',
    link: '#',
  },
]

export default function Careers() {
  const [search, setSearch] = useState('')

  const filteredJobs = jobList.filter(job =>
    `${job.title} ${job.type} ${job.location}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Open Positions
        </motion.h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          We’re always looking for talented, passionate people to join our team. Explore the roles below.
        </p>

        {/* === Search Input === */}
        <div className="relative mt-10 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search roles by title, type or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* === Jobs Grid === */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 text-left">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={index}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-md transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4 gap-4">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" /> {job.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </span>
                </div>
                <a
                  href={job.link}
                  className="inline-block mt-2 text-sm font-semibold text-orange-600 hover:underline"
                >
                  Apply Now →
                </a>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-gray-500 text-center pt-10">
              No roles match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}