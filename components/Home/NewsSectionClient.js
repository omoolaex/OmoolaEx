"use client";

import { motion } from "framer-motion";
import BlogGrid from "../Blog/BlogGrid";
import Link from "next/link";

export default function NewsSectionClient({ posts }) {
  return (
    <motion.section
      className="py-16 px-6 relative bg-gradient-to-br from-yellow-50 via-white to-blue-50 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
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
          Get the latest updates about tech, business, and innovation from our blog.
        </motion.p>
      </div>

      <BlogGrid posts={posts} />

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
