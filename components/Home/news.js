import Link from "next/link";
import BlogGrid from "../Blog/BlogGrid";

export default function NewsSection({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="container mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>

      <BlogGrid posts={posts} />

      <div className="text-center mt-10">
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Blogs
        </Link>
      </div>
    </section>
  );
}
