export const revalidate = 60;

import { client } from "@/sanity/client";
import { latestPostsQuery } from "@/lib/queries";
import NewsSectionClient from "./NewsSectionClient";

export default async function NewsSection() {
  let posts = [];

  try {
    posts = await client.fetch(latestPostsQuery, {}, { next: { revalidate: 60 } });
  } catch (err) {
    console.error("Sanity fetch error:", err);
  }

  if (!posts?.length) return null;

  return <NewsSectionClient posts={posts} />;
}
