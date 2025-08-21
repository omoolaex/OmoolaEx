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

const POSTS_PER_PAGE = 12;

export default async function BlogPage({ searchParams: searchParamsPromise }) {
  const searchParams = await searchParamsPromise;

  const page = parseInt(searchParams.page || 1);
  const categorySlug = searchParams.category || null;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;

  // Fetch categories
  const categories = await client.fetch(allCategoriesQuery);

  // Determine selected category ID
  let categoryId = null;
  if (categorySlug) {
    const match = categories.find((c) => c.slug.current === categorySlug);
    categoryId = match?._id || null;
  }

  // Fetch posts and total count in parallel
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

  // JSON-LD Structured Data for Blog & Breadcrumb
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "OmoolaEx Blog",
    url: `${siteUrl}/blog`,
    description:
      "Discover expert insights, web design tips, IT consulting advice, and digital strategies from OmoolaEx to grow your business.",
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
      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogStructuredData, breadcrumbSchema]),
        }}
      />

      {/* ✅ Track GA pageviews */}
      <PageViewTracker url={pageUrl} />

      <PageHero
        title="Our Blog"
        subtitle="Insights, tips, and updates from OmoolaEx"
      />

      <main className="container mx-auto min-h-screen p-8">
        {/* Categories Filter */}
        <section className="flex justify-center gap-3 mb-10 flex-wrap">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm ${
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
                className={`px-4 py-2 rounded-full text-sm ${
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
                  className={`px-3 py-1 border rounded ${
                    page === pageNumber ? "bg-blue-600 text-white" : "bg-white"
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
