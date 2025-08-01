import Link from "next/link";
import { client } from "@/sanity/client";
import PageHero from "@/components/PageHero";
import BlogGrid from "@/components/Blog/BlogGrid";
import {
  paginatedPostsQuery,
  allCategoriesQuery,
  totalPostsQuery,
  totalPostsByCategoryQuery,
} from "@/lib/queries";

const POSTS_PER_PAGE = 12;

// SEO Metadata
export const metadata = {
  title: "OmoolaEx Blog | Tips, Insights & Updates",
  description:
    "Discover expert insights, web design tips, IT consulting advice, and digital strategies from OmoolaEx to grow your business.",
  openGraph: {
    title: "OmoolaEx Blog | Tips, Insights & Updates",
    description:
      "Discover expert insights, web design tips, IT consulting advice, and digital strategies from OmoolaEx to grow your business.",
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
    title: "OmoolaEx Blog | Tips, Insights & Updates",
    description:
      "Discover expert insights, web design tips, IT consulting advice, and digital strategies from OmoolaEx to grow your business.",
    images: ["https://omoolaex.com.ng/images/omoolaex.jpg"],
  },
};

export default async function BlogPage({ searchParams: searchParamsPromise }) {
  // ✅ Await the searchParams first
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

  // JSON-LD Structured Data for SEO
  const blogStructuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "OmoolaEx Blog",
    url: "https://omoolaex.com.ng/blog",
    description:
      "Discover expert insights, web design tips, IT consulting advice, and digital strategies from OmoolaEx to grow your business.",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `https://omoolaex.com.ng/blog/${post.slug.current}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author || "OmoolaEx Team",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
      />

      <PageHero title="Our Blog" subtitle="Insights, tips, and updates from OmoolaEx" />

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