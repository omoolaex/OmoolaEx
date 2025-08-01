// components/Blog/BlogSidebar.js
import Link from 'next/link'
import { client } from '@/sanity/client'

export default async function BlogSidebar({ currentSlug }) {
  // ✅ Fetch recent posts excluding the current one
  const recentPosts = await client.fetch(
    `
    *[_type == "post" && slug.current != $currentSlug] 
    | order(publishedAt desc)[0...5]{
      _id,
      title,
      "slug": slug.current
    }
    `,
    { currentSlug }
  )

  const categories = await client.fetch(`
    *[_type == "category"]{
      _id,
      title,
      "slug": slug.current
    }
  `)

  const tags = await client.fetch(`
    *[_type == "tag"]{
      _id,
      title
    }
  `)

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
        <ul className="space-y-2 text-sm text-blue-600">
          {recentPosts.map(post => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug}`} className="hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Categories */}
      <section>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Link
              key={cat._id}
              href={`/blog/category/${cat.slug}`}
              className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Tags */}
      {tags.length > 0 && (
        <section>
          <h3 className="font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
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