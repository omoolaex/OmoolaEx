import { client } from "@/sanity/client";
import { singlePostQuery } from "@/lib/queries";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 });
  }

  const post = await client.fetch(singlePostQuery, { slug });

  return new Response(JSON.stringify({ post }), { status: 200 });
}
