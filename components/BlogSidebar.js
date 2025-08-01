'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { client } from '@/lib/sanity.client'

export default function BlogSidebar({ currentSlug = null }) {
  const [recentPosts, setRecentPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSidebarData() {
      setLoading(true)
      setError(null)
      try {
        // ✅ Fetch 5 recent posts, excluding the current one if slug provided
        const posts = await client.fetch(
          `*[_type == "post" ${currentSlug ? '&& slug.current != $slug' : ''}]
            | order(publishedAt desc)[0...5]{
              _id,
              title,
              "slug": slug.current
            }`,
          currentSlug ? { slug: currentSlug } : {}
        )

        // ✅ Fetch categories
        const cats = await client.fetch(`
          *[_type == "category"]{
            _id,
            title,
            "slug": slug.current
          }
        `)

        // ✅ Fetch tags if available
        const fetchedTags = await client.fetch(`
          *[_type == "tag"]{
            _id,
            title
          }
        `)

        setRecentPosts(posts || [])
        setCategories(cats || [])
        setTags(fetchedTags || [])
      } catch (err) {
        console.error('Failed to fetch sidebar data:', err)
        setError('Failed to load sidebar content.')
      } finally {
        setLoading(false)
      }
    }

    fetchSidebarData()
  }, [currentSlug])

  // ✅ Loading state
  if (loading) {
    return (
      <div className="sticky top-28 p-4 text-gray-500 text-sm">
        Loading sidebar...
      </div>
    )
  }

  // ✅ Error state
  if (error) {
    return (
      <div className="sticky top-28 p-4 text-red-500 text-sm">
        {error}
      </div>
    )
  }

  return (
    <div className="sticky top-28 space-y-10">
      {/* Search */}
      <section>
        <h3 className="font-semibold mb-3">Search</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Search blog..."
            className="w-full px-3 py-2 border rounded-l text-sm"
          />
          <button className="bg-blue-600 text-white px-4 rounded-r text-sm">
            Go
          </button>
        </div>
      </section>

      {/* Recent Posts */}
      <section>
        <h3 className="font-semibold mb-3">Recent Posts</h3>
        {recentPosts.length === 0 ? (
          <p className="text-sm text-gray-500">No recent posts available.</p>
        ) : (
          <ul className="space-y-2 text-sm text-blue-600">
            {recentPosts.map((post) => (
              <li key={post._id}>
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Categories */}
      <section>
        <h3 className="font-semibold mb-3">Categories</h3>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/blog/category/${cat.slug}`}
                className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section>
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag._id}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
              >
                #{tag.title}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="bg-blue-50 p-4 rounded">
        <h4 className="font-bold text-blue-800 mb-2">Subscribe to Our Blog</h4>
        <p className="text-sm text-gray-600 mb-3">
          Stay updated with the latest insights
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 mb-2 text-sm border rounded"
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded transition">
          Subscribe
        </button>
      </section>
    </div>
  )
}