"use client";

import { useEffect } from "react";

export default function BlogViewTracker({ slug }) {
  useEffect(() => {
    if (!slug) return;

    const incrementView = async () => {
      try {
        await fetch("/api/increment-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
      } catch (err) {
        console.error("Failed to increment blog view:", err);
      }
    };

    incrementView();
  }, [slug]);

  return null; // ✅ This runs silently in the background
}