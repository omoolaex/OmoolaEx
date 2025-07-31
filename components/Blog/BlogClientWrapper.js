'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BlogGrid from './BlogGrid'
import BlogCategoryFilter from './BlogCategoryFilter'
import BlogPagination from './BlogPagination'
import { client } from '@/sanity/client'

export default function BlogClientWrapper() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const POSTS_PER_PAGE = 6

  // ✅ Fetch categories for filter
  const fetchCategories = async () => {
    const query = `*[_type == "category"]{_id, title}`
    const data = await client.fetch(query)
    setCategories([{ _id: 'all', title: 'All' }, ...data])
  }

  // ✅ Fetch posts with excerpt and pagination
  const fetchPosts = useCallback(
    async (page = 1, categoryId = 'all') => {
      setLoading(true)
      const start = (page - 1) * POSTS_PER_PAGE
      const end = start + POSTS_PER_PAGE

      const query = `*[_type == "post" ${
        categoryId !== 'all' ? '&& references($categoryId)' : ''
      }] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        image,
        author,
        excerpt, // ✅ Fetch excerpt
        "categories": categories[]->{_id, title}
      }`

      const params = {
        start,
        end,
        categoryId: categoryId !== 'all' ? categoryId : undefined,
      }

      const data = await client.fetch(query, params)

      // ✅ Count total posts for pagination
      const countQuery = `count(*[_type=="post" ${
        categoryId !== 'all' ? '&& references($categoryId)' : ''
      }])`
      const total = await client.fetch(countQuery, params)

      console.log('Fetched posts:', data) // ✅ Debugging excerpt
      setPosts(data)
      setTotalPages(Math.ceil(total / POSTS_PER_PAGE))
      setLoading(false)
    },
    []
  )

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPosts(currentPage, selectedCategoryId)
  }, [currentPage, selectedCategoryId, fetchPosts])

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Category Filter */}
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

      {/* Posts Grid or Loader */}
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

            {/* Pagination */}
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