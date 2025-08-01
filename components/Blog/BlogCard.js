import Link from "next/link";
import { urlFor } from "@/sanity/image";

export default function BlogCard({ post }) {
  return (
    <article className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white flex flex-col">
      {/* Featured Image with Overlay */}
      {post.image && (
        <div className="relative">
          <Link href={`/blog/${post.slug.current}`}>
            <img
              src={urlFor(post.image).width(600).height(350).url()}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </Link>

          {/* Overlay: Categories + Views */}
          <div className="absolute bottom-0 w-full flex justify-between items-center px-3 py-2 bg-gradient-to-t from-black/60 to-transparent text-white text-xs">
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
            <span className="flex items-center gap-1">
              👁 {post.views || 0}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/blog/${post.slug.current}`}>
          <h2 className="text-lg font-semibold line-clamp-2 mb-2 hover:text-blue-600">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>

        {/* Author + Date */}
        <p className="text-xs text-gray-500 mt-auto">
          By {post.author} • {new Date(post.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </article>
  );
}