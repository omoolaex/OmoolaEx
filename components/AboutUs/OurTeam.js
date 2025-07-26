'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'

const team = [
  {
    name: 'Owolabi Gbolahan',
    role: 'Founder & Lead Strategist',
    image: '/images/team/gbolahan.png',
    bio: '8+ years of experience in IT strategy and innovation.',
    socials: {
      linkedin: 'https://linkedin.com/in/gbolahan-owolabi-5875502a5',
      twitter: 'https://twitter.com/owolabigbo72351',
      instagram: 'https://instagram.com/mhizter_omoola',
    },
  },
  {
    name: 'Lasisi Abiodun',
    role: 'Creative Director',
    image: '/images/team/abiodun.jpg',
    bio: 'Expert in brand storytelling and UI/UX design.',
    socials: {
      linkedin: 'https://linkedin.com/in/lasisi-lukmon-abiodun-4a4999169/',
      twitter: '#',
      instagram: '#',
    },
  },
  {
    name: 'Priscilla Agwu',
    role: 'Junior Developer',
    image: '/images/team/agwu.jpg',
    bio: 'Junior Frontend Developer.',
    socials: {
      linkedin: '#',
      twitter: '#',
      instagram: '#',
    },
  },
]

export default function OurTeam() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-16"
        >
          Meet Our Team
        </motion.h2>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <Image
                src={member.image}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-lg font-semibold text-blue-800">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
              <p className="text-sm text-gray-600 mt-4">{member.bio}</p>

              <div className="flex justify-center gap-4 mt-6">
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-600 hover:text-blue-800 transition" size={20} />
                </a>
                <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400 hover:text-blue-600 transition" size={20} />
                </a>
                <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-pink-500 hover:text-pink-700 transition" size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}