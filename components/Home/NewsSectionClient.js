"use client";

import { motion } from "framer-motion";
import BlogGrid from "../Blog/BlogGrid";
import { urlFor } from "@/sanity/image";
import Link from "next/link";
import Image from "next/image";

// Default featured image if none exists
const DEFAULT_FEATURED_IMAGE = "/images/og-image.png";

export default function NewsSectionClient({ posts = [] }) {
  if (!posts.length) return null;

  // 1 featured, 3 other posts
  const [featuredPost, ...otherPostsAll] = posts;
  const otherPosts = otherPostsAll.slice(0, 3); // take only 3 posts for the grid

  // Define image URL for featured post
  const featuredImageUrl = featuredPost.image
    ? urlFor(featuredPost.image).width(800).height(600).url()
    : DEFAULT_FEATURED_IMAGE;
  featuredPost.imageUrl = featuredImageUrl;

  return (
    <motion.section
      className="py-16 px-6 relative bg-gradient-to-br from-yellow-50 via-white to-blue-50 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900"
        >
          News & Insights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-gray-600 text-sm sm:text-base md:text-lg mt-2"
        >
          Latest updates about tech, business, and innovation from our blog.
        </motion.p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <motion.div
          className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
            <Image
              src={featuredPost.imageUrl}
              alt={featuredPost.title || "Featured post image"}
              fill
              className="object-cover hover:scale-105 transition-transform"
              placeholder="blur"
              blurDataURL="//images/logo.png"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              {featuredPost.title || "Untitled Post"}
            </h3>
            {featuredPost.excerpt && (
              <p className="text-gray-600 mb-4 line-clamp-3">
                {featuredPost.excerpt}
              </p>
            )}
            {featuredPost.slug?.current && (
              <Link
                href={`/blog/${featuredPost.slug.current}`}
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors self-start"
              >
                Read More
              </Link>
            )}
          </div>
        </motion.div>
      )}

      {/* Remaining Posts Grid */}
      {otherPosts.length > 0 && <BlogGrid posts={otherPosts} />}

      {/* View All Blogs */}
      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Blogs
        </Link>
      </div>
    </motion.section>
  );
}
