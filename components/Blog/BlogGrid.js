'use client'

export default function BlogGrid({ posts }) {
  if (!Array.isArray(posts)) {
    console.warn('⚠️ BlogGrid: posts is not an array', posts)
    return <div>No blog posts found.</div>
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded shadow-sm bg-white">
          {post.jetpack_featured_media_url && (
            <img
              src={post.jetpack_featured_media_url}
              alt="Blog"
              className="mb-4 w-full h-48 object-cover rounded"
            />
          )}
          <h2
            className="text-xl font-semibold mb-2"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="text-sm text-gray-500 mb-2">
            By {post._embedded?.author?.[0]?.name || 'OmoolaEx'} |{' '}
            {new Date(post.date).toLocaleDateString()}
          </p>
          <a
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:underline font-medium"
          >
            Read More →
          </a>
        </div>
      ))}
    </div>
  )
}