import Link from "next/link";
import { urlFor } from "@/sanity/image";
import Image from "next/image";

export default function BlogCard({ post }) {
  const imageUrl = post.image
    ? urlFor(post.image).width(600).height(400).url()
    : "/images/logo.svg";

  return (
    <article className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900 flex flex-col">
      {/* Featured Image with Overlay */}
      {post.image && (
        <div className="relative aspect-video">
          <Link href={`/blog/${post.slug.current}`}>
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          </Link>

          {/* Overlay: Categories + Views */}
          <div className="absolute bottom-0 w-full flex justify-between items-center px-3 py-2 bg-gradient-to-t from-black/70 to-transparent text-white text-xs">
            <div className="flex flex-wrap gap-1">
              {post.categories?.map((cat) => (
                <span
                  key={cat._id}
                  className="px-2 py-0.5 bg-white/20 rounded-full backdrop-blur-sm"
                >
                  {cat.title}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1 opacity-90">👁 {post.views || 0}</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/blog/${post.slug.current}`}>
          <h2 className="text-lg font-semibold line-clamp-2 mb-2 text-gray-900 dark:text-gray-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author + Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
          By {post.author || "OmoolaEx Team"} •{" "}
          {new Date(post.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
