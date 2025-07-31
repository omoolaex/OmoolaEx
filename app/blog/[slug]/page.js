import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import BlogSidebar from '../../../components/BlogSidebar'
import { client } from '@/sanity/client'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import PortableTextComponents from '../../../components/Blog/PortableTextComponents'

const builder = imageUrlBuilder(client)
function urlFor(source) {
  return builder.image(source)
}

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  image,
  excerpt,
  body,
  author,
  "categories": categories[]->{title}
}`

export default async function BlogPost({ params }) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug })
  if (!post) return notFound()

  const featuredImage = post.image
    ? urlFor(post.image).width(800).height(450).url()
    : null

  // ✅ Generate Table of Contents
  const headings = (post.body || [])
    .filter(
      (block) => block._type === 'block' && ['h2', 'h3'].includes(block.style)
    )
    .map((block) => {
      const text = block.children?.map((child) => child.text).join(' ') || ''
      return {
        text,
        id: text.toLowerCase().replace(/\s+/g, '-'),
        level: block.style,
      }
    })

  return (
    <>
      <PageHero
        title={post.title}
        subtitle={post.excerpt || 'Explore insights from OmoolaEx Blog'}
      />

      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          {/* Featured image */}
          {featuredImage && (
            <img
              src={featuredImage}
              alt={post.title}
              className="rounded-xl mb-6 w-full object-cover"
            />
          )}

          {/* Author & Date */}
          <div className="mb-4 text-gray-500 text-sm">
            By {post.author || 'OmoolaEx'} •{' '}
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          {/* ✅ Table of Contents just after the image */}
          {headings.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
              <h3 className="font-bold text-gray-800 mb-3">Table of Contents</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {headings.map((h) => (
                  <li key={h.id} className={h.level === 'h3' ? 'ml-4' : ''}>
                    <a href={`#${h.id}`} className="hover:text-blue-600">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Render blog content with headings that have IDs */}
          <div className="prose prose-lg prose-blue max-w-none">
            <PortableText
              value={post.body}
              components={{
                ...PortableTextComponents,
                block: {
                  ...PortableTextComponents.block,
                  h2: ({ children }) => {
                    const id = children
                      .map((c) => c.toString())
                      .join(' ')
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                    return (
                      <h2
                        id={id}
                        className="text-2xl font-semibold my-4 scroll-mt-24"
                      >
                        {children}
                      </h2>
                    )
                  },
                  h3: ({ children }) => {
                    const id = children
                      .map((c) => c.toString())
                      .join(' ')
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                    return (
                      <h3
                        id={id}
                        className="text-xl font-semibold my-3 scroll-mt-24"
                      >
                        {children}
                      </h3>
                    )
                  },
                },
              }}
            />
          </div>
        </article>

        {/* Sidebar remains separate */}
        <aside className="lg:col-span-4">
          <BlogSidebar />
        </aside>
      </section>
    </>
  )
}