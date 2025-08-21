import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { singlePostQuery, allSlugsQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/Blog/PortableTextComponents";
import SocialShare from "@/components/Blog/SocialShare";
import BlogViewTracker from "@/components/Blog/BlogViewTracker";
import PageViewTracker from "@/components/Analytics/PageViewTracker";
import Link from "next/link";
import Image from "next/image";

/* -------------------------------
   1️⃣ Generate Static Paths
--------------------------------- */
export async function generateStaticParams() {
  const slugs = (await client.fetch(allSlugsQuery)) || [];
  return slugs.map((slug) => ({ slug }));
}

/* -------------------------------
   2️⃣ Dynamic Metadata for SEO
--------------------------------- */
export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await client.fetch(singlePostQuery, { slug });

  if (!post) return { title: "Post Not Found | OmoolaEx Blog" };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://omoolaex.com.ng"
      : "http://localhost:3000");

  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.image
    ? urlFor(post.image).width(1200).url()
    : `${siteUrl}/images/og-default.jpg`;

  const description =
    post.excerpt?.slice(0, 155) ||
    `Read this insightful article by OmoolaEx: ${post.title}`;

  return {
    title: `${post.title} | OmoolaEx Blog`,
    description,
    keywords: post.tags || ["OmoolaEx", "Blog", "Digital Agency Nigeria"],
    alternates: { canonical: postUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description,
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author || "OmoolaEx Team"],
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
  };
}

/* -------------------------------
   3️⃣ Single Blog Post Page
--------------------------------- */
export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await client.fetch(singlePostQuery, { slug });
  if (!post) return <div className="text-center py-20">Post not found</div>;

  // ✅ Adjacent posts
  const adjacentPosts = await client.fetch(
    `*[_type=="post" && slug.current==$slug][0]{
      "prev": *[_type == "post" && publishedAt < ^.publishedAt] 
        | order(publishedAt desc)[0]{ title, slug },
      "next": *[_type == "post" && publishedAt > ^.publishedAt] 
        | order(publishedAt asc)[0]{ title, slug }
    }`,
    { slug }
  );

  // ✅ Related posts
  const relatedPosts =
    (await client.fetch(
      `*[_type=="post" && slug.current != $slug && count((tags[]->title)[@ in ^.tags[]->title]) > 0] 
        | order(publishedAt desc)[0..2]{ title, slug }`,
      { slug }
    )) || [];

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://omoolaex.com.ng"
      : "http://localhost:3000");

  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.image
    ? urlFor(post.image).width(1200).url()
    : `${siteUrl}/images/og-default.jpg`;

  const description =
    post.excerpt?.slice(0, 155) ||
    `Read this insightful article by OmoolaEx: ${post.title}`;

  /* ✅ JSON-LD Schemas */
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: [imageUrl],
    author: { "@type": "Person", name: post.author || "OmoolaEx Team" },
    publisher: {
      "@type": "Organization",
      name: "OmoolaEx",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.svg` },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    articleSection: post.category || "Blog",
    keywords: post.tags?.join(", "),
    interactionStatistic: {
      "@type": "InteractionCounter",
      interactionType: { "@type": "http://schema.org/ViewAction" },
      userInteractionCount: post.views || 0,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      {/* ✅ Track GA page views */}
      <PageViewTracker url={postUrl} />

      {/* ✅ Track blog views in DB */}
      <BlogViewTracker slug={slug} />

      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogPostingSchema, breadcrumbSchema]),
        }}
      />

      {/* ✅ Visible Breadcrumbs */}
      <nav className="text-sm mb-6 text-gray-600" aria-label="Breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-500">{post.title}</li>
        </ol>
      </nav>

      {/* Blog Content */}
      <article itemScope itemType="https://schema.org/BlogPosting">
        <h1 className="text-4xl font-bold mb-4" itemProp="headline">
          {post.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          By <span itemProp="author">{post.author || "OmoolaEx Team"}</span> •{" "}
          <time itemProp="datePublished" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>{" "}
          • 👁 {post.views || 0}
        </p>

        {post.image && (
          <Image
            src={urlFor(post.image).width(800).url()}
            alt={post.title}
            width={800}
            height={500}
            className="w-full mb-6 rounded-lg"
            priority
          />
        )}

        <div itemProp="articleBody">
          <PortableText value={post.body} components={PortableTextComponents} />
        </div>
      </article>

      <SocialShare url={postUrl} title={post.title} />

      {/* Prev / Next */}
      <div className="flex justify-between mt-12 pt-6 border-t text-blue-600">
        {adjacentPosts?.prev ? (
          <Link
            href={`/blog/${adjacentPosts.prev.slug.current}`}
            className="hover:underline"
          >
            ← {adjacentPosts.prev.title}
          </Link>
        ) : (
          <span />
        )}
        {adjacentPosts?.next ? (
          <Link
            href={`/blog/${adjacentPosts.next.slug.current}`}
            className="hover:underline"
          >
            {adjacentPosts.next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-6 border-t">
          <h2 className="text-2xl font-semibold mb-4">Related Articles</h2>
          <ul className="space-y-2">
            {relatedPosts.map((rp) => (
              <li key={rp.slug.current}>
                <Link
                  href={`/blog/${rp.slug.current}`}
                  className="text-blue-600 hover:underline"
                >
                  {rp.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
