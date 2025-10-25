export const revalidate = 60; // Revalidate every 60 seconds

import { client } from "@/sanity/client";
import { latestPostsQuery } from "@/lib/queries";
import NewsSectionClient from "./NewsSectionClient";

export default async function NewsSection() {
  let posts = [];

  try {
    // ✅ Use cache in production, disable only in dev
    const fetchOptions =
      process.env.NODE_ENV === "development"
        ? { cache: "no-store" }
        : { cache: "force-cache" };

    posts = await client.fetch(latestPostsQuery, {}, fetchOptions);
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  if (!posts || posts.length === 0) return null;

  return <NewsSectionClient posts={posts} />;
}
