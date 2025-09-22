// File: /app/api/rss/resources/route.js
import { client } from "@/sanity/client";
import { Feed } from "feed";

export async function GET() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://omoolaex.com.ng"
      : "http://localhost:3000");

  // Fetch resources from Sanity
  let resources = [];
  try {
    resources = await client.fetch(`
      *[_type == "resource" && defined(title)] | order(_createdAt desc) {
        _id,
        title,
        description,
        category,
        "slug": slug.current,
        _createdAt,
        "file": file.asset->
      }
    `);
  } catch (error) {
    console.error("Failed to fetch resources for RSS:", error);
  }

  // Initialize RSS feed
  const feed = new Feed({
    title: "OmoolaEx Resource Library",
    description:
      "Free resources, guides, templates, and checklists for Founders, Career Builders, and Students in Nigeria.",
    id: `${siteUrl}/library`,
    link: `${siteUrl}/library`,
    language: "en",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, OmoolaEx`,
    feedLinks: {
      rss2: `${siteUrl}/api/rss/resources`,
    },
    author: {
      name: "OmoolaEx",
      email: "info@omoolaex.com.ng",
      link: siteUrl,
    },
  });

  // Add each resource to the feed
  resources.forEach((res) => {
    const itemUrl = `${siteUrl}/library/${res.slug || res._id}`;
    const fileUrl = res.file?.url || null;

    feed.addItem({
      title: res.title,
      id: itemUrl,
      link: itemUrl,
      description: res.description + (fileUrl ? `<br/><a href="${fileUrl}">Download PDF</a>` : ""),
      date: new Date(res._createdAt),
      author: [
        {
          name: "OmoolaEx",
          email: "info@omoolaex.com.ng",
          link: siteUrl,
        },
      ],
      category: res.category ? [{ name: res.category }] : undefined,
    });
  });

  // Return RSS feed as XML
  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
