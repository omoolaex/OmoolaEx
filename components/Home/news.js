// components/Home/NewsSection.jsx
import BlogGrid from '../Blog/BlogGrid'
import Link from 'next/link'
import { client } from '@/sanity/client'

export default async function NewsSection() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    image,
    author,
    excerpt,
    "categories": categories[]->{_id, title}
  }`

  const posts = await client.fetch(query)

  return (
    <section className="bg-gradient-to-b from-white via-blue-50 to-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">
            News & Insights
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-2 max-w-xl mx-auto">
            Explore expert articles, tips, and updates from the OmoolaEx team.
          </p>
        </div>

        {posts.length > 0 ? (
          <BlogGrid posts={posts} />
        ) : (
          <p className="text-center text-gray-500 py-10">No posts available.</p>
        )}

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