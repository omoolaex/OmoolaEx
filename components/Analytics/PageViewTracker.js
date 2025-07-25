"use client";

import { useEffect } from "react";

export default function PageViewTracker({ title, path, location }) {
        useEffect(() => {
        window.gtag?.('event', 'page_view', {
            page_title: title,
            page_path: path,
            page_location: location,
        });
        }, [title, path, location]);

  return null;
}