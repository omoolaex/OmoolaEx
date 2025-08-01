import Image from "next/image";
import { urlFor } from "@/sanity/image"; // ✅ Import urlFor

export const PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null; // ✅ Safe check for missing images

      const imageUrl = urlFor(value).width(800).url();

      return (
        <Image
          src={imageUrl}
          alt={value.alt || "Blog image"}
          width={800}
          height={500}
          className="rounded-lg my-6"
          sizes="(max-width: 768px) 100vw, 800px"
          priority={false} // Only set true for above-the-fold
        />
      );
    },
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold my-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold my-2">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="my-3 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
    ),
  },
};
