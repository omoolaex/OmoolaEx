import BlogCard from "./BlogCard";

export default function BlogGrid({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className="text-center text-gray-500">No posts found.</p>;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post._id} post={post} />
      ))}
    </section>
  );
}