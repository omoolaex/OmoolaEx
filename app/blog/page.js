// app/blog/page.js
import Link from "next/link";
import { client } from "@/sanity/client";
import PageHero from "@/components/PageHero";
import BlogGrid from "@/components/Blog/BlogGrid";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import {
  paginatedPostsQuery,
  allCategoriesQuery,
  totalPostsQuery,
  totalPostsByCategoryQuery,
} from "@/lib/queries";

/* -------------------------------
   🔹 Constants
--------------------------------- */
const POSTS_PER_PAGE = 12;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://omoolaex.com.ng"
    : "http://localhost:3000");

/* -------------------------------
   🔹 Metadata (Static)
--------------------------------- */
export const metadata = {
  title: "OmoolaEx Blog | IT Consulting & Digital Transformation Insights",
  description:
    "Stay ahead with expert insights from OmoolaEx IT Consultancy Ltd — covering IT strategy, cloud solutions, software innovation, branding, and digital transformation in Nigeria.",
  keywords: [
    "OmoolaEx IT Consultancy Ltd blog",
    "IT consulting insights Nigeria",
    "digital transformation Lagos",
    "software development trends",
    "cloud computing Nigeria",
    "UI UX design insights",
    "business technology strategy",
  ],
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "OmoolaEx Blog | IT Consulting & Digital Transformation Insights",
    description:
      "Explore articles and insights from OmoolaEx IT Consultancy Ltd on web innovation, digital growth, and emerging technology in Nigeria.",
    url: `${siteUrl}/blog`,
    siteName: "OmoolaEx IT Consultancy Ltd",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "OmoolaEx Blog - IT Consulting Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx Blog | IT Consulting & Technology Insights",
    description:
      "Get thought leadership articles on IT consulting, software innovation, and digital transformation from OmoolaEx IT Consultancy Ltd.",
    images: [`${siteUrl}/images/og-image.png`],
    site: "@omoolaex",
  },
};

/* -------------------------------
   🔹 Page Component
--------------------------------- */
export default async function BlogPage({ searchParams: rawSearchParams }) {
  const searchParams = await rawSearchParams; // <--- this fixes the "await searchParams" error
  const page = parseInt(searchParams?.page || "1", 10);
  const categorySlug = searchParams?.category || null;

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // ✅ Fetch categories
  const categories = await client.fetch(allCategoriesQuery);

  // ✅ Resolve category from slug
  let categoryId = null;
  if (categorySlug) {
    const match = categories.find((c) => c.slug.current === categorySlug);
    categoryId = match?._id || null;
  }

  // ✅ Fetch posts + total count
  const [posts, totalPosts] = await Promise.all([
    client.fetch(paginatedPostsQuery, { start, end, categoryId }),
    categoryId
      ? client.fetch(totalPostsByCategoryQuery, { categoryId })
      : client.fetch(totalPostsQuery),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const pageUrl = categorySlug
    ? `${siteUrl}/blog?category=${categorySlug}&page=${page}`
    : `${siteUrl}/blog${page > 1 ? `?page=${page}` : ""}`;

  /* -------------------------------
     🔹 Structured Data for SEO
  --------------------------------- */
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "OmoolaEx IT Consultancy Ltd Blog",
    url: `${siteUrl}/blog`,
    description:
      "OmoolaEx IT Consultancy Ltd shares insights on web development, IT consulting, cloud technology, and digital transformation.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug.current}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author || "OmoolaEx Editorial Team",
      },
    })),
    publisher: {
      "@type": "Organization",
      name: "OmoolaEx IT Consultancy Ltd",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.svg` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      ...(categorySlug
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: categories.find((c) => c.slug.current === categorySlug)
                ?.title,
              item: `${siteUrl}/blog?category=${categorySlug}`,
            },
          ]
        : []),
    ],
  };

  /* -------------------------------
     🔹 Render
  --------------------------------- */
  return (
    <>
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogStructuredData, breadcrumbSchema]),
        }}
      />

      {/* ✅ Analytics */}
      <PageViewTracker
        title="OmoolaEx Blog | IT Consulting Insights"
        path="/blog"
        location={pageUrl}
      />

      {/* ✅ Hero */}
      <PageHero
        title="OmoolaEx Blog"
        subtitle="Ideas, insights, and innovations shaping the future of technology and digital transformation in Africa."
      />

      <main className="container mx-auto min-h-screen px-6 lg:px-12 py-12">
        {/* ✅ Categories Filter */}
        <section className="flex justify-center gap-3 mb-10 flex-wrap">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm transition ${
              !categorySlug
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            All
          </Link>
          {categories.map((cat) => {
            const active = categorySlug === cat.slug.current;
            return (
              <Link
                key={cat._id}
                href={`/blog?category=${cat.slug.current}`}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat.title}
              </Link>
            );
          })}
        </section>

        {/* ✅ Blog Grid */}
        {posts.length > 0 ? (
          <BlogGrid posts={posts} />
        ) : (
          <div className="text-center text-gray-600 py-20">
            No posts found in this category yet.
          </div>
        )}

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <section className="flex justify-center items-center gap-2 mt-10 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              const url = categorySlug
                ? `/blog?category=${categorySlug}&page=${pageNumber}`
                : `/blog?page=${pageNumber}`;
              return (
                <Link
                  key={pageNumber}
                  href={url}
                  rel={
                    pageNumber === page - 1
                      ? "prev"
                      : pageNumber === page + 1
                      ? "next"
                      : undefined
                  }
                  className={`px-3 py-1 border rounded transition ${
                    page === pageNumber
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            })}
          </section>
        )}
      </main>
    </>
  );
}
