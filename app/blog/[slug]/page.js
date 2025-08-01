import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { singlePostQuery, allSlugsQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@/components/Blog/PortableTextComponents";
import SocialShare from "@/components/Blog/SocialShare";
import BlogViewTracker from "@/components/Blog/BlogViewTracker"; // ✅ for views count
import Link from "next/link";

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
  const description = post.excerpt || `Read this insightful article by OmoolaEx: ${post.title}`;

  return {
    title: `${post.title} | OmoolaEx Blog`,
    description,
    alternates: { canonical: postUrl },
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

  // ✅ Correct GROQ for Adjacent Posts
  const adjacentPosts = await client.fetch(
    `*[_type=="post" && slug.current==$slug][0]{
      "prev": *[_type == "post" && publishedAt < ^.publishedAt] 
        | order(publishedAt desc)[0]{ title, slug },
      "next": *[_type == "post" && publishedAt > ^.publishedAt] 
        | order(publishedAt asc)[0]{ title, slug }
    }`,
    { slug }
  );

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://omoolaex.com.ng"
      : "http://localhost:3000");

  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.image
    ? urlFor(post.image).width(1200).url()
    : `${siteUrl}/images/og-default.jpg`;

  // ✅ JSON-LD Schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || `Read this insightful article by OmoolaEx: ${post.title}`,
    image: [imageUrl],
    author: { "@type": "Person", name: post.author || "OmoolaEx Team" },
    publisher: {
      "@type": "Organization",
      name: "OmoolaEx",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.svg` },
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      {/* ✅ Track views */}
      <BlogViewTracker slug={slug} />

      {/* ✅ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Blog Header */}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {post.author || "OmoolaEx Team"} • {new Date(post.publishedAt).toLocaleDateString()} • 👁{" "}
        {post.views || 0}
      </p>

      {post.image && (
      <Image
        src={urlFor(post.image).width(800).url()}
        alt={post.title}
        width={800}
        height={500}  // approximate aspect ratio
        className="w-full mb-6 rounded-lg"
        priority // for LCP optimization on top image
      />
      )}

      {/* Blog Body */}
      <PortableText value={post.body} components={PortableTextComponents} />

      {/* Social Share Buttons */}
      <SocialShare url={postUrl} title={post.title} />

      {/* Prev / Next Navigation */}
      <div className="flex justify-between mt-12 pt-6 border-t text-blue-600">
        {adjacentPosts?.prev ? (
          <Link href={`/blog/${adjacentPosts.prev.slug.current}`} className="hover:underline">
            ← {adjacentPosts.prev.title}
          </Link>
        ) : (
          <span />
        )}
        {adjacentPosts?.next ? (
          <Link href={`/blog/${adjacentPosts.next.slug.current}`} className="hover:underline">
            {adjacentPosts.next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}