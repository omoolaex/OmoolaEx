import Script from 'next/script'
import PageHero from '../../components/PageHero'
import BlogClientWrapper from '../../components/Blog/BlogClientWrapper'

export const metadata = {
  title: 'Insights & Ideas | OmoolaEx Blog | Digital Growth & Tech Trends',
  description:
    'Explore expert insights, practical tips, and industry trends on web development, branding, IT consulting, and digital transformation. The OmoolaEx Blog helps businesses grow online.',
  alternates: {
    canonical: 'https://omoolaex.com.ng/blog'
  },
  openGraph: {
    title: 'OmoolaEx Blog | Web, IT & Brand Insights',
    description:
      'Read OmoolaEx blog articles on branding, web development, and digital consulting. Get practical advice for startups, SMEs, and tech enthusiasts.',
    url: 'https://omoolaex.com.ng/blog',
    siteName: 'OmoolaEx',
    images: [
      {
        url: 'https://omoolaex.com.ng/images/omoolaex.jpg',
        width: 1200,
        height: 630,
        alt: 'OmoolaEx Blog Cover Image'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OmoolaEx Blog',
    description:
      'Stay ahead with articles from OmoolaEx on tech, branding, IT services, and business growth.',
    images: ['https://omoolaex.com.ng/images/omoolaex.jpg'],
    site: '@omoolaex'
  }
}

export default function BlogPage() {
  return (
    <main className="overflow-x-hidden relative">
      {/* Structured Data for SEO */}
      <Script
        id="structured-data-blog"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "OmoolaEx Blog",
            "description":
              "Digital insights, IT tips, and branding strategies from OmoolaEx.",
            "url": "https://omoolaex.com.ng/blog",
            "publisher": {
              "@type": "Organization",
              "name": "OmoolaEx",
              "logo": {
                "@type": "ImageObject",
                "url": "https://omoolaex.com.ng/logo.png"
              }
            }
          })
        }}
      />

      {/* Page Hero */}
      <PageHero
        title="Our Blog"
        subtitle="Insights, updates, and guides to help your business grow digitally."
      />

      {/* Blog Listing */}
      <BlogClientWrapper />
    </main>
  )
}