'use client'

import Head from 'next/head'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../../components/PageHero'
import BlogGrid from '../../components/Blog/BlogGrid'
import BlogCategoryFilter from '../../components/Blog/BlogCategoryFilter'
import BlogPagination from '../../components/Blog/BlogPagination'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error)
  }, [])

  useEffect(() => {
    let url = `https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/posts?_embed&per_page=6&page=${currentPage}`
    if (selectedCategoryId !== 'all') {
      url += `&categories=${selectedCategoryId}`
    }

    setLoading(true)
    fetch(url)
      .then(res => {
        setTotalPages(Number(res.headers.get('X-WP-TotalPages') || 1))
        return res.json()
      })
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setLoading(false)
      })
  }, [selectedCategoryId, currentPage])

  return (
    <>
      <Head>
        <title>OmoolaEx Blog | Digital Insights & Business Growth Tips</title>
        <meta name="description" content="Explore expert articles from OmoolaEx on web development, branding, IT consulting, and digital strategies to help your business thrive." />
        <meta name="keywords" content="OmoolaEx Blog, Web Development, Branding, IT Consulting, Digital Marketing, Business Growth, Tech News" />
        <meta name="author" content="OmoolaEx" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://omoolaex.com.ng/blog" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="OmoolaEx Blog | Digital Insights & Business Growth Tips" />
        <meta property="og:description" content="Expert advice and updates on technology, web development, branding, and more." />
        <meta property="og:url" content="https://omoolaex.com.ng/blog" />
        <meta property="og:image" content="https://omoolaex.com.ng/og-banner.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="OmoolaEx Blog | Digital Insights & Business Growth Tips" />
        <meta name="twitter:description" content="Expert advice and updates on technology, web development, branding, and more." />
        <meta name="twitter:image" content="https://omoolaex.com.ng/og-banner.jpg" />

        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "OmoolaEx Blog",
              "description": "Digital insights, IT tips, and branding strategies from OmoolaEx.",
              "url": "https://omoolaex.com.ng/blog",
              "publisher": {
                "@type": "Organization",
                "name": "OmoolaEx",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://omoolaex.com.ng/logo.png"
                }
              },
              "blogPost": posts.slice(0, 3).map((post) => ({
                "@type": "BlogPosting",
                "headline": post.title?.rendered,
                "image": post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
                "author": {
                  "@type": "Person",
                  "name": post._embedded?.author?.[0]?.name || "OmoolaEx"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "OmoolaEx",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://omoolaex.com.ng/logo.png"
                  }
                },
                "datePublished": post.date,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://omoolaex.com.ng/blog/${post.slug}`
                }
              }))
            })
          }}
        />
      </Head>

      {/* Animated Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <PageHero
          title="Our Blog"
          subtitle="Insights, updates, and guides to help your business grow digitally."
        />
      </motion.div>

      {/* Content Section */}
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
            <motion.p
              key="loading"
              className="text-center text-gray-500 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              Loading posts...
            </motion.p>
          ) : posts.length === 0 ? (
            <motion.p
              key="no-posts"
              className="text-center text-gray-500 py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              No posts found for this category.
            </motion.p>
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
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}