// components/TestClientSanity.js
"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity.client";

export default function TestClientSanity() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(`*[_type == "post"]{ _id, title }[0...3]`);
        setPosts(data);
      } catch (err) {
        console.error("Sanity fetch failed:", err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="p-4 bg-gray-50">
      <h2>Client-side Sanity Test</h2>
      <ul>
        {posts.map((p) => (
          <li key={p._id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}