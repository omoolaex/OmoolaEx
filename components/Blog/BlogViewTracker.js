"use client";

import { useEffect, useState, useRef } from "react";

export default function BlogViewTracker({ slug, initialViews = 0 }) {
  const [views, setViews] = useState(initialViews);
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (!slug || hasIncremented.current) return;

    const incrementView = async () => {
      try {
        const res = await fetch("/api/increment-view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });

        if (res.ok) {
          const data = await res.json();
          setViews(data.views);
          hasIncremented.current = true; // mark as incremented
        }
      } catch (err) {
        console.error("Failed to increment blog view:", err);
      }
    };

    incrementView();
  }, [slug]);

  return <span>👁 {views}</span>;
}
