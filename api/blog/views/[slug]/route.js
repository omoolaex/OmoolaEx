import { NextResponse } from "next/server";
import { client } from "@/sanity/client";

export async function POST(req) {
  try {
    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

    await client
      .patch(slug) // patch by document ID or slug
      .inc({ views: 1 }) // increment view count
      .commit({ autoGenerateArrayKeys: true });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error incrementing view:", err);
    return NextResponse.json({ error: "Failed to increment view" }, { status: 500 });
  }
}