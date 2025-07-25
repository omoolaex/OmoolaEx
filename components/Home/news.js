'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const blogPosts = [
  {
    id: 1,
    title: 'Top 5 Web Design Trends for 2025',
    excerpt: 'Discover the cutting-edge UI/UX trends that will define 2025 websites...',
    image: '/blog/design-trends.jpg',
    slug: 'web-design-trends-2025',
    date: 'July 15, 2025',
  },
  {
    id: 2,
    title: 'Why Your Business Needs a Brand Strategy',
    excerpt: 'Brand strategy isn’t just a logo — it’s your identity. Learn why it matters.',
    image: '/blog/brand-strategy.jpg',
    slug: 'business-brand-strategy',
    date: 'July 10, 2025',
  },
  {
    id: 3,
    title: 'Securing Your Website in 2025: What to Know',
    excerpt: 'Cybersecurity isn’t optional. Here’s how to protect your business online.',
    image: '/blog/cybersecurity.jpg',
    slug: 'website-security-guide',
    date: 'July 2, 2025',
  },
]

export default function NewsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-blue-900"
          >
            News & Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-600 mt-3 text-lg max-w-xl mx-auto"
          >
            Explore expert articles, tips, and updates from the OmoolaEx team.
          </motion.p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl shadow-md hover:shadow-lg transition group overflow-hidden"
              >
                <div className="relative w-full h-52">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-400 mb-1">{post.date}</p>
                  <h3 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
                  <span className="text-blue-600 text-sm mt-4 inline-block hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 text-white bg-blue-700 hover:bg-blue-800 rounded-full font-medium transition duration-300"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}