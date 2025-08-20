import { client } from "@/sanity/client";
import { latestPostsQuery } from "@/lib/queries";
import NewsSectionClient from "./NewsSectionClient";

export default async function NewsSection() {
  let posts = [];
  try {
    posts = await client.fetch(latestPostsQuery);
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  if (!posts || posts.length === 0) return null;

  return <NewsSectionClient posts={posts} />;
}
