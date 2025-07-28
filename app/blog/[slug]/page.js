import { notFound } from 'next/navigation'
import PageHero from '@/components/PageHero'
import BlogSidebar from '@/components/BlogSidebar'

export async function generateMetadata({ params }) {
  const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/posts?slug=${params.slug}&_embed`, {
    next: { revalidate: 60 }
  })
  const data = await res.json()

  if (!data || data.length === 0) return {}

  const post = data[0]
  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    'https://omoolaex.com.ng/images/omoolaex.jpg'
  const description = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim()

  return {
    title: `${post.title.rendered} | OmoolaEx Blog`,
    description,
    alternates: {
      canonical: `https://omoolaex.com.ng/blog/${post.slug}`
    },
    openGraph: {
      title: post.title.rendered,
      description,
      url: `https://omoolaex.com.ng/blog/${post.slug}`,
      type: 'article',
      images: [featuredImage]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description,
      images: [featuredImage]
    },
    other: {
      'script[type="application/ld+json"]': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://omoolaex.com.ng/blog/${post.slug}`
        },
        "headline": post.title.rendered,
        "description": description,
        "image": [featuredImage],
        "author": {
          "@type": "Person",
          "name": post._embedded?.author?.[0]?.name || 'OmoolaEx'
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
        "dateModified": post.modified,
        "keywords": post.tags?.join(', ') || ''
      })
    }
  }
}

export default async function BlogPost({ params }) {
  const res = await fetch(`https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/posts?slug=${params.slug}&_embed`, {
    next: { revalidate: 60 }
  })
  const data = await res.json()

  if (!data || data.length === 0) return notFound()
  const post = data[0]

  return (
    <>
      {/* Page Header */}
      <PageHero
        title={post.title.rendered}
        subtitle="Published article from the OmoolaEx Blog"
      />

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <div
            className="prose max-w-none prose-blue prose-lg"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </article>

        <aside className="lg:col-span-4">
          <BlogSidebar />
        </aside>
      </section>
    </>
  )
}