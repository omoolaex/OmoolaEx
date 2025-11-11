export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
  }

  try {
    await res.revalidate("/");
    await res.revalidate("/blog");
    return new Response(JSON.stringify({ revalidated: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Error revalidating", error: err }), {
      status: 500,
    });
  }
}
