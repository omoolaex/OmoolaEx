import { NextResponse } from "next/server";
import { client } from "@/sanity/client";

const formatDate = (date) => new Date(date).toISOString();

export async function GET() {
  try {
    const blogs = await client.fetch(`
      *[_type == "post" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);

    const portfolios = await client.fetch(`
      *[_type == "portfolio" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);

    const libraryItems = await client.fetch(`
      *[_type == "resource" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);

    const urls = [
      ...blogs.map((b) => `
        <url>
          <loc>https://omoolaex.com.ng/blog/${b.slug}</loc>
          <lastmod>${formatDate(b._updatedAt)}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>`),

      ...portfolios.map((p) => `
        <url>
          <loc>https://omoolaex.com.ng/portfolio/${p.slug}</loc>
          <lastmod>${formatDate(p._updatedAt)}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>`),

      ...libraryItems.map((l) => `
        <url>
          <loc>https://omoolaex.com.ng/library/${l.slug}</loc>
          <lastmod>${formatDate(l._updatedAt)}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>`),
    ];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
