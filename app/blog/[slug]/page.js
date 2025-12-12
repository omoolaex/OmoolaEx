export const revalidate = 60;
export const dynamic = "force-dynamic";

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
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Home } from "lucide-react";

/* ---------------------
   Helpers
--------------------- */

function blockText(block) {
  if (!block) return "";
  if (block._type === "block" && Array.isArray(block.children)) {
    return block.children.map((c) => c.text || "").join("");
  }
  if (typeof block.text === "string") return block.text;
  if (block.content && typeof block.content === "string") return block.content;
  return "";
}

function extractFAQFromPortableText(body = [], maxItems = 8) {
  const faqs = [];
  let i = 0;
  while (i < body.length && faqs.length < maxItems) {
    const block = body[i];
    const isHeading =
      block &&
      block._type === "block" &&
      typeof block.style === "string" &&
      ["h1", "h2", "h3"].includes(block.style.toLowerCase());

    if (isHeading) {
      const question = blockText(block).trim();
      let answerParts = [];
      let j = i + 1;

      while (j < body.length) {
        const next = body[j];
        const nextIsHeading =
          next &&
          next._type === "block" &&
          typeof next.style === "string" &&
          ["h1", "h2", "h3"].includes(next.style.toLowerCase());
        if (nextIsHeading) break;

        if (next._type === "block") {
          const text = blockText(next).trim();
          if (text) answerParts.push(text);
        } else if (next._type === "callout" && next.text) {
          answerParts.push(String(next.text).trim());
        } else if (next._type === "image" && next.caption) {
          answerParts.push(String(next.caption).trim());
        } else if (typeof next === "string") {
          answerParts.push(next);
        }
        j++;
      }

      const answer = answerParts.join("\n\n").trim();
      if (question && answer) faqs.push({ question, answer });

      i = j;
    } else {
      i++;
    }
  }
  return faqs;
}

function getOgImageUrl({ siteUrl, title, author, imageUrl }) {
  const encodedTitle = encodeURIComponent(title || "");
  const encodedAuthor = encodeURIComponent(author || "");
  const encodedImg = imageUrl ? encodeURIComponent(imageUrl) : "";
  return `${siteUrl}/api/og?title=${encodedTitle}&author=${encodedAuthor}${encodedImg ? `&img=${encodedImg}` : ""}`;
}

/* -------------------------
   Static Params (Safe)
------------------------- */

export async function generateStaticParams() {
  const slugs = await client.fetch(allSlugsQuery, {}, { next: { revalidate: 60 } });
  const validSlugs = slugs
    .map((s) => s.slug?.current)
    .filter((slug) => typeof slug === "string" && slug.length > 0);

  return validSlugs.map((slug) => ({ slug }));
}

/* ----------------------------
   Metadata (Dynamic)
---------------------------- */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return { title: "Post Not Found | OmoolaEx Blog" };

  const post = await client.fetch(
    singlePostQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!post) return { title: "Post Not Found | OmoolaEx Blog" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omoolaex.com.ng";
  const canonicalUrl = `${siteUrl}/blog/${slug}`;

  const explicitKeywords = Array.isArray(post.keywords) ? post.keywords : [];
  let derivedKeywords = [];

  if (!explicitKeywords.length && Array.isArray(post.body)) {
    const headings = post.body
      .filter((b) => b._type === "block" && b.style && /^h[1-3]$/.test(b.style))
      .map((h) => blockText(h).trim())
      .slice(0, 6);

    derivedKeywords = headings.flatMap((h) => h.split(/\s+/).slice(0, 6));
  }

  const keywords = explicitKeywords.length
    ? explicitKeywords
    : [...new Set([...(derivedKeywords || []), ...(post.tags || [])])].slice(0, 20);

  const postImageUrl = post.image
    ? urlFor(post.image).width(1200).height(630).url()
    : `${siteUrl}/images/logo.svg`;

  const ogImageUrl = getOgImageUrl({
    siteUrl,
    title: post.title,
    author: post.author?.name || "OmoolaEx",
    imageUrl: postImageUrl,
  });

  const seoDescription =
    post.seoDescription || post.excerpt?.slice(0, 155) || `Read: ${post.title}`;

  return {
    title: post.seoTitle || post.title,
    description: seoDescription,
    alternates: { canonical: canonicalUrl },
    keywords,
    openGraph: {
      title: post.seoTitle || post.title,
      description: seoDescription,
      url: canonicalUrl,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      siteName: "OmoolaEx",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: seoDescription,
      images: [ogImageUrl],
    },
  };
}

/* ----------------------------
   PAGE COMPONENT (Dynamic)
---------------------------- */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const post = await client.fetch(
    singlePostQuery,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!post) return <div>Post not found</div>;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omoolaex.com.ng";
  const postUrl = `${siteUrl}/blog/${slug}`;

  const prevPost = await client.fetch(
    `*[_type=="post" && publishedAt < $current] | order(publishedAt desc)[0]{title, "slug": slug.current, excerpt}`,
    { current: post.publishedAt },
    { next: { revalidate: 60 } }
  );

  const nextPost = await client.fetch(
    `*[_type=="post" && publishedAt > $current] | order(publishedAt asc)[0]{title, "slug": slug.current, excerpt}`,
    { current: post.publishedAt },
    { next: { revalidate: 60 } }
  );

  const keywords = Array.isArray(post.keywords) ? post.keywords : [];

  const relatedPosts = await client.fetch(
    `*[_type=="post" && slug.current != $slug &&
      defined(keywords) && count(keywords[@ in $keywords]) > 0]
      | order(publishedAt desc)[0..2]{title, "slug": slug.current, excerpt, "imageUrl": image.asset->url}`,
    { slug, keywords },
    { next: { revalidate: 60 } }
  );

  /* --- JSON-LD build stays same (not changed) --- */

  const siteLogo = `${siteUrl}/images/logo.svg`;
  const postImageUrl = post.image ? urlFor(post.image).width(1600).url() : siteLogo;

  const ogImageUrl = getOgImageUrl({
    siteUrl,
    title: post.title,
    author: post.author?.name || "OmoolaEx Team",
    imageUrl: postImageUrl,
  });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    alternativeHeadline: post.seoTitle || undefined,
    description: post.seoDescription || post.excerpt || undefined,
    image: [postImageUrl],
    author: { "@type": "Person", name: post.author?.name || "OmoolaEx Team" },
    publisher: {
      "@type": "Organization",
      name: "OmoolaEx IT Consultancy Ltd",
      logo: { "@type": "ImageObject", url: siteLogo },
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    inLanguage: "en-NG",
    keywords: keywords.join(", "),
    isAccessibleForFree: true,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqItems = Array.isArray(post.body)
    ? extractFAQFromPortableText(post.body, 8)
    : [];

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  /* -----------------------------------------
     RENDER (unchanged from your structure)
  ----------------------------------------- */

  return (
    <main className="bg-white min-h-screen">
      <PageViewTracker title={post.title} path={`/blog/${slug}`} location={postUrl} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      {/* Schema.org microdata attributes for compatibility */}
      <article itemScope itemType="https://schema.org/BlogPosting">
        {/* HEADER */}
        <header className="pt-12 pb-10 px-6 lg:pt-20 lg:px-8 max-w-4xl mx-auto text-center">
          <nav className="flex flex-wrap items-center justify-center space-x-2 text-sm text-gray-500 mb-8 font-medium" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" /> Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 truncate max-w-[150px] sm:max-w-xs cursor-default">{post.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]" itemProp="headline">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm md:text-base text-gray-600 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-900">{post.author?.name || "OmoolaEx Team"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <time dateTime={post.publishedAt} itemProp="datePublished">{new Date(post.publishedAt).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{post.readTime || 6} min read</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full text-xs font-medium border border-gray-100">
              <BlogViewTracker slug={slug} initialViews={post.views || 0} />
            </div>
          </div>
        </header>

        {/* HERO IMAGE */}
        {post.image && (
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 mb-16">
            <div className="relative aspect-video md:aspect-21/9 w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-gray-900/5">
              <Image src={urlFor(post.image).width(1600).url()} alt={post.title} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1600px" />
            </div>
          </div>
        )}

        {/* MAIN BODY */}
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-3xl prose prose-lg prose-slate" itemProp="articleBody">
            <PortableText value={post.body} components={PortableTextComponents} />
          </div>
        </div>

        <meta itemProp="datePublished" content={post.publishedAt} />
        <meta itemProp="dateModified" content={post._updatedAt || post.publishedAt} />
        <div itemProp="author" itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content={post.author?.name || "OmoolaEx Team"} />
        </div>
      </article>

      {/* SHARE */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-10 mb-10">
          <div className="flex justify-center border-t border-b border-gray-100 py-10"><SocialShare url={postUrl} title={post.title} /></div>
        </div>

      {/* PREV/NEXT NAV */}
      <nav className="max-w-5xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prevPost && (
            <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <span className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 group-hover:text-blue-600 transition-colors"><ChevronLeft className="w-4 h-4 mr-1" /> Previous Article</span>
              <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">{prevPost.title}</h4>
            </Link>
          )}
          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col items-end text-right p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <span className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 group-hover:text-blue-600 transition-colors">Next Article <ChevronRight className="w-4 h-4 ml-1" /></span>
              <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">{nextPost.title}</h4>
            </Link>
          )}
        </div>
      </nav>

      {/* RELATED POSTS */}
      {relatedPosts?.length > 0 && (
        <section className="bg-slate-50 py-20 px-6 lg:px-8 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Related Articles:</h2>
                <p className="text-slate-500 mt-2">More articles you might find interesting</p>
              </div>
              <Link href="/blog" className="hidden sm:flex text-blue-600 font-semibold hover:text-blue-800 items-center transition-colors">
                View all articles <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map(rp => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="flex flex-col group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-56 w-full overflow-hidden bg-gray-200">
                    {rp.imageUrl ? (
                      <Image src={rp.imageUrl} alt={rp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <Home className="w-8 h-8 opacity-20" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col grow">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-snug">{rp.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 grow leading-relaxed">{rp.excerpt}</p>
                    <span className="text-blue-600 text-sm font-bold uppercase tracking-wide mt-auto inline-flex items-center group-hover:translate-x-1 transition-transform">Read Now <ChevronRight className="w-3 h-3 ml-1" /></span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 sm:hidden text-center">
              <Link href="/blog" className="text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center transition-colors">
                View all articles <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
