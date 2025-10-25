"use client";

import { useEffect } from "react";

export default function OGMetaInjector({ title, description, url, image }) {
  useEffect(() => {
    const head = document.head;

    const metaTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "OmoolaEx IT Consultancy Ltd" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ];

    metaTags.forEach(tag => {
      const m = document.createElement("meta");
      Object.keys(tag).forEach(key => m.setAttribute(key, tag[key]));
      head.appendChild(m);
    });

    return () => {
      metaTags.forEach(tag => {
        const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
        const existing = head.querySelector(selector);
        if (existing) head.removeChild(existing);
      });
    };
  }, [title, description, url, image]);

  return null;
}
