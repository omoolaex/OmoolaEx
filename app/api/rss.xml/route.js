import { client } from "@/sanity/client"

const query = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  body
}`

function portableTextToPlain(blocks = []) {
  return (Array.isArray(blocks) ? blocks : [])
    .filter(b => b._type === "block")
    .map(b => (b.children || []).map(c => c.text || "").join(""))
    .join("\n\n")
    .replace(/]]>/g, "]]&gt;")
}

export async function GET() {
  try {
    const posts = await client.fetch(query)
    const site = process.env.SITE_URL || "https://omoolaex.com"
    const lastBuildDate = posts.length
      ? new Date(posts[0].publishedAt).toUTCString()
      : new Date().toUTCString()

    const items = posts
      .map(post => {
        const url = `${site}/blog/${post.slug}`
        const title = post.title || ""
        const pubDate = post.publishedAt
          ? new Date(post.publishedAt).toUTCString()
          : new Date().toUTCString()
        const description =
          post.excerpt || portableTextToPlain(post.body).slice(0, 500)

        return `<item>
          <title><![CDATA[${title}]]></title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${pubDate}</pubDate>
          <description><![CDATA[${description}]]></description>
        </item>`
      })
      .join("")

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>OmoolaEx Blog</title>
    <link>${site}/blog</link>
    <description>Latest posts from OmoolaEx</description>
    <language>en-US</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    ${items}
  </channel>
</rss>`

    return new Response(rss, {
      headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    })
  } catch (err) {
    return new Response("Failed to generate RSS", { status: 500 })
  }
}

// Support HEAD requests so crawlers don’t throw 405
export async function HEAD() {
  return new Response(null, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
