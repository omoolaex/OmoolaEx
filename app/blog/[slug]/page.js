'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PageHero from '@/components/PageHero'
import BlogSidebar from '@/components/BlogSidebar'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    fetch(`https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/posts?slug=${slug}&_embed`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setPost(data[0])
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching post:', err)
        setLoading(false)
      })
  }, [slug])

  return (
    <>
      {/* Static Header */}
      <PageHero
        title={post ? post.title.rendered : 'Loading...'}
        subtitle="Published article from the OmoolaEx Blog"
      />

      {/* Main Blog Content Layout */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Blog Post Content */}
        <article className="lg:col-span-8">
          {loading ? (
            <p className="text-gray-600">Loading post...</p>
          ) : !post ? (
            <p className="text-red-600">Post not found.</p>
          ) : (
            <div
              className="prose max-w-none prose-blue prose-lg"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          )}
        </article>

        {/* Right: Sidebar (always visible) */}
        <aside className="lg:col-span-4">
          <BlogSidebar />
        </aside>
      </section>
    </>
  )
}