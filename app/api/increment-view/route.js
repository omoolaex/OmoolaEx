import { client } from "@/sanity/client";

export async function POST(req) {
  try {
    const { slug } = await req.json();
    if (!slug) return new Response("Missing slug", { status: 400 });

    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{_id, views}`,
      { slug }
    );

    if (!post) return new Response("Post not found", { status: 404 });

    const updated = await client.patch(post._id)
      .inc({ views: 1 })
      .commit({ autoGenerateArrayKeys: true });

    return new Response(JSON.stringify({ views: updated.views }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error incrementing view:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
