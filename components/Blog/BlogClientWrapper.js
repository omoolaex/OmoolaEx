'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlogGrid from './BlogGrid'
import BlogCategoryFilter from './BlogCategoryFilter'
import BlogPagination from './BlogPagination'

export default function BlogClientWrapper() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    const res = await fetch(
      'https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/categories'
    )
    const data = await res.json()
    setCategories(data)
  }

  const fetchPosts = async (page = 1, category = 'all') => {
    setLoading(true)
    const baseURL = `https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/posts?_embed&per_page=6&page=${page}`
    const url = category !== 'all' ? `${baseURL}&categories=${category}` : baseURL
    const res = await fetch(url)
    const total = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10)
    const data = await res.json()
    setPosts(data)
    setTotalPages(total)
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPosts(currentPage, selectedCategoryId)
  }, [currentPage, selectedCategoryId])

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <BlogCategoryFilter
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={(id) => {
            setSelectedCategoryId(id)
            setCurrentPage(1)
          }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            className="text-center py-10 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading...
          </motion.div>
        ) : posts.length === 0 ? (
          <motion.div
            key="no-posts"
            className="text-center py-10 text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No posts found.
          </motion.div>
        ) : (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlogGrid posts={posts} />
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <BlogPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}