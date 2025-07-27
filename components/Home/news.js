'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NewsSection() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const res = await fetch('https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/posts?per_page=3&_embed')
        const data = await res.json()

        const formatted = data.map(post => ({
          id: post.id,
          title: post.title.rendered,
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ''), // Strip HTML
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/logo.svg',
          slug: post.slug,
          date: new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          }),
        }))

        setPosts(formatted)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    }

    fetchLatestPosts()
  }, [])

  return (
    <section className="bg-gradient-to-b from-white via-blue-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900"
          >
            News & Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-600 text-sm sm:text-base md:text-lg mt-2 max-w-xl mx-auto"
          >
            Explore expert articles, tips, and updates from the OmoolaEx team.
          </motion.p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="relative w-full h-48 sm:h-52 md:h-56">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">{post.date}</p>
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-800 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-2">{post.excerpt}</p>
                  <span className="text-blue-600 text-sm mt-4 inline-block hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 text-white bg-blue-700 hover:bg-blue-800 rounded-full font-medium transition"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  )
}