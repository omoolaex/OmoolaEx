// components/Home/NewsSection.js
"use client";

import Link from "next/link";
import BlogGrid from "../Blog/BlogGrid";
import { motion } from "framer-motion";

export default function NewsSection({ posts }) {
  if (!posts || posts.length === 0) return null;

  // ensure only latest 3
  const latestPosts = posts
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3);

  return (
    <section className="container mx-auto py-16 px-6">
      <div className="text-center mb-12 sm:mb-16">
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
          className="text-gray-600 text-sm sm:text-base md:text-lg mt-2"
        >
          Get the latest updates about tech, business, and innovation from our blog.
        </motion.p>
      </div>

      {/* Show only 3 latest */}
      <BlogGrid posts={latestPosts} />

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
}
