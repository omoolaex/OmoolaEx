import { notFound } from 'next/navigation'
import BlogGrid from '@/components/Blog/BlogGrid'
import PageHero from '@/components/PageHero'
import { client } from "@/sanity/client";

// 1️⃣ Query the category by slug
const CATEGORY_QUERY = `*[_type == "category" && slug.current == $slug][0]{
  _id,
  title,
  slug
}`

// 2️⃣ Query posts that reference this category
const POSTS_BY_CATEGORY_QUERY = `*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image,
  excerpt,
  author->{name},
  categories[]->{title, slug}
}`

export default async function CategoryPage({ params }) {
  const { slug } = params

  // 1️⃣ Fetch the category
  const category = await client.fetch(CATEGORY_QUERY, { slug })

  if (!category) {
    return notFound()
  }

  // 2️⃣ Fetch posts in this category using category._id
  const posts = await client.fetch(POSTS_BY_CATEGORY_QUERY, {
    categoryId: category._id,
  })

  return (
    <>
      <PageHero
        title={`Category: ${category.title}`}
        subtitle={`Explore posts under ${category.title}`}
      />

      <section className="max-w-6xl mx-auto px-4 py-16">
        {posts.length === 0 ? (
          <p className="text-center py-20 text-gray-600">
            No posts found in this category.
          </p>
        ) : (
          <BlogGrid posts={posts} />
        )}
      </section>
    </>
  )
}