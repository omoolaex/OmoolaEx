import { revalidatePath } from "next/cache";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
  }

  try {
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/blog/${slug}");
    return new Response(JSON.stringify({ revalidated: true }), { status: 200 });
  } catch (err) {
    console.error("Revalidation error:", err);
    return new Response(JSON.stringify({ message: "Error revalidating", error: err.message }), {
      status: 500,
    });
  }
}
