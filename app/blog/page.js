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

// ✅ Blog Page Metadata
export const metadata = {
  title: "Blog | OmoolaEx | Web Design & IT Consulting Insights",
  description:
    "Explore OmoolaEx blog for expert insights on web development, IT consulting, branding, digital strategy, and business growth in Nigeria.",
  keywords: [
    "OmoolaEx Blog",
    "Web Design Tips",
    "IT Consulting Insights",
    "Startup Growth Nigeria",
    "Digital Strategy",
    "Branding Tips",
    "UI UX Design Blog",
    "Cybersecurity Advice",
  ],
  alternates: {
    canonical: "https://omoolaex.com.ng/blog",
  },
  openGraph: {
    title: "OmoolaEx Blog | Web Development & IT Consulting Insights",
    description:
      "Get the latest strategies, tips, and insights from OmoolaEx to help grow your startup or business in Nigeria.",
    url: "https://omoolaex.com.ng/blog",
    siteName: "OmoolaEx",
    images: [
      {
        url: "https://omoolaex.com.ng/images/omoolaex.jpg",
        width: 1200,
        height: 630,
        alt: "OmoolaEx Blog",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OmoolaEx Blog | Digital Insights",
    description:
      "OmoolaEx Blog shares expert advice on IT consulting, branding, web design, and digital solutions in Lagos, Nigeria.",
    images: ["https://omoolaex.com.ng/images/omoolaex.jpg"],
    site: "@omoolaex",
  },
};

const POSTS_PER_PAGE = 12;

export default async function BlogPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const categorySlug = searchParams?.category || null;

  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // ✅ Fetch categories
  const categories = await client.fetch(allCategoriesQuery);

  // ✅ Match category ID from slug
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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://omoolaex.com.ng"
      : "http://localhost:3000");

  const pageUrl = categorySlug
    ? `${siteUrl}/blog?category=${categorySlug}&page=${page}`
    : `${siteUrl}/blog${page > 1 ? `?page=${page}` : ""}`;

  // ✅ JSON-LD Structured Data
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "OmoolaEx Blog",
    url: `${siteUrl}/blog`,
    description:
      "Expert web design, IT consulting, branding, and digital strategy insights from OmoolaEx.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug.current}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author || "OmoolaEx Team",
      },
    })),
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
              name: categories.find((c) => c.slug.current === categorySlug)?.title,
              item: `${siteUrl}/blog?category=${categorySlug}`,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      {/* ✅ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogStructuredData, breadcrumbSchema]),
        }}
      />

      {/* ✅ Analytics Tracking */}
      <PageViewTracker url={pageUrl} />

      {/* Hero */}
      <PageHero
        title="Our Blog"
        subtitle="Insights, tips, and updates from OmoolaEx"
      />

      <main className="container mx-auto min-h-screen px-6 lg:px-12 py-12">
        {/* Categories */}
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

        {/* Blog Grid */}
        <BlogGrid posts={posts} />

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="flex justify-center items-center gap-2 mt-10">
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
