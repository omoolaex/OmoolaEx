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
   1️⃣ Generate Static Params
--------------------------------- */
export async function generateStaticParams() {
  const slugs = (await client.fetch(allSlugsQuery)) || [];
  const validSlugs = slugs
    .map((s) => s.slug?.current)
    .filter((slug) => typeof slug === "string" && slug.length > 0);
  return validSlugs.map((slug) => ({ slug }));
}

/* -------------------------------
   2️⃣ Dynamic Metadata for SEO
--------------------------------- */
export async function generateMetadata({ params: rawParams }) {
  const params = await rawParams;
  const slug = params.slug;
  const post = await client.fetch(singlePostQuery, { slug });
  if (!post) return { title: "Post Not Found | OmoolaEx Blog" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omoolaex.com.ng";
  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.image
    ? urlFor(post.image).width(1200).height(630).url()
    : `${siteUrl}/images/logo.svg`;

  const title = post.seoTitle || post.title;
  const description =
    post.seoDescription || post.excerpt?.slice(0, 155) || `Read this article: ${post.title}`;

  return {
    title,
    description,
    alternates: { canonical: postUrl },
    openGraph: {
      title,
      description,
      url: postUrl,
      siteName: "OmoolaEx",
      type: "article",
      locale: "en_NG",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] },
  };
}

/* -------------------------------
   3️⃣ BlogPostPage (Server Component)
--------------------------------- */
export default async function BlogPostPage({ params: rawParams }) {
  // ✅ await params
  const params = await rawParams;
  const slug = params.slug;

  const post = await client.fetch(singlePostQuery, { slug });
  if (!post) return <div className="text-center py-20">Post not found</div>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omoolaex.com.ng";
  const postUrl = `${siteUrl}/blog/${slug}`;
  const imageUrl = post.image
    ? urlFor(post.image).width(1200).height(630).url()
    : `${siteUrl}/images/og-image.jpg`;

  const keywords = post.keywords || ["OmoolaEx", "Blog", "IT consulting Nigeria"];

  // Adjacent Posts
  const prevPost = await client.fetch(
    `*[_type=="post" && publishedAt < $current] | order(publishedAt desc)[0]{ title, slug, excerpt }`,
    { current: post.publishedAt }
  );
  const nextPost = await client.fetch(
    `*[_type=="post" && publishedAt > $current] | order(publishedAt asc)[0]{ title, slug, excerpt }`,
    { current: post.publishedAt }
  );

  // Related Posts (fixed)
  const relatedPosts = await client.fetch(
    `*[_type=="post" && slug.current != $slug && defined(keywords) && count(keywords[@ in $keywords]) > 0]
      | order(publishedAt desc)[0..2]{
        title,
        slug,
        excerpt,
        "imageUrl": image.asset->url
      }`,
    { slug, keywords }
  );

  // JSON-LD Schemas
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt?.slice(0, 155) || `Read this article: ${post.title}`,
    image: [imageUrl],
    author: { "@type": "Person", name: post.author || "OmoolaEx Team" },
    publisher: {
      "@type": "Organization",
      name: "OmoolaEx IT Consultancy Ltd",
      logo: { "@type": "ImageObject", url: `${siteUrl}/images/logo.svg` },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    articleSection: post.categories?.map((c) => c.title).join(", ") || "Blog",
    keywords: keywords.join(", "),
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
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <main className="container mx-auto p-8 max-w-3xl">
      <PageViewTracker title={post.title} path={`/blog/${slug}`} location={postUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([blogPostingSchema, breadcrumbSchema]) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm mb-6 text-gray-600" aria-label="Breadcrumb">
        <ol className="flex space-x-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li>/</li>
          <li><Link href="/blog" className="hover:underline">Blog</Link></li>
          <li>/</li>
          <li className="text-gray-500">{post.title}</li>
        </ol>
      </nav>

      {/* Blog Content */}
      <article itemScope itemType="https://schema.org/BlogPosting">
        <h1 className="text-4xl font-bold mb-4" itemProp="headline">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-6">
          By <span itemProp="author">{post.author || "OmoolaEx Team"}</span> •{" "}
          <time itemProp="datePublished" dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
          </time>{" "}
          • <BlogViewTracker slug={slug} initialViews={post.views || 0} />
        </div>

        {post.image && (
          <Image src={urlFor(post.image).width(800).url()} alt={post.title} width={800} height={500} className="w-full mb-6 rounded-lg" />
        )}

        <div itemProp="articleBody">
          <PortableText value={post.body} components={PortableTextComponents} />
        </div>
      </article>

      <SocialShare url={postUrl} title={post.title} />

      {/* Modern Prev / Next */}
      <div className="flex flex-col sm:flex-row justify-between mt-12 pt-6 border-t gap-4">
        {prevPost && (
          <Link
            href={`/blog/${prevPost.slug.current}`}
            className="flex-1 group flex flex-col p-4 rounded-xl border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1 bg-white"
          >
            <span className="text-xs text-gray-500 mb-1">Previous</span>
            <span className="text-blue-600 font-semibold group-hover:underline">← {prevPost.title}</span>
            {prevPost.excerpt && <p className="text-gray-500 text-sm mt-2 line-clamp-2">{prevPost.excerpt}</p>}
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug.current}`}
            className="flex-1 group flex flex-col p-4 rounded-xl border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1 bg-white text-right"
          >
            <span className="text-xs text-gray-500 mb-1">Next</span>
            <span className="text-blue-600 font-semibold group-hover:underline">{nextPost.title} →</span>
            {nextPost.excerpt && <p className="text-gray-500 text-sm mt-2 line-clamp-2">{nextPost.excerpt}</p>}
          </Link>
        )}
      </div>

      {/* Modern Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 pt-6 border-t">
          <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedPosts.map((rp) => (
              <Link key={rp.slug.current} href={`/blog/${rp.slug.current}`} className="group block rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                {rp.imageUrl && (
                  <div className="h-40 w-full relative">
                    <Image src={rp.imageUrl} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                  </div>
                )}
                <div className="p-4 bg-white">
                  <h3 className="text-lg font-semibold text-blue-800 group-hover:underline">{rp.title}</h3>
                  {rp.excerpt && <p className="text-gray-500 text-sm mt-1 line-clamp-2">{rp.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
