import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/client'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

export default function BlogGrid({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
        >
          {/* ✅ Featured Image */}
          {post.image && (
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={urlFor(post.image).width(600).height(400).url()}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </Link>
          )}

          {/* ✅ Content */}
          <div className="p-4 flex flex-col flex-grow">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-2">
              {(post.categories || []).map((cat) => (
                <span
                  key={cat._id || cat}
                  className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
                >
                  {cat.title || cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-1 line-clamp-2">
              <Link href={`/blog/${post.slug}`}>
                <span className="hover:underline">{post.title}</span>
              </Link>
            </h2>

            {/* ✅ Use Sanity Excerpt directly */}
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Author & Date */}
            <p className="text-gray-500 text-xs mt-auto">
              By <span className="font-medium">{post.author || 'OmoolaEx'}</span> &bull;{' '}
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}