import { notFound } from 'next/navigation'
import BlogGrid from '@/components/Blog/BlogGrid'
import PageHero from '@/components/PageHero'

export default async function CategoryPage(props) {
  const { slug } = props.params

  // Step 1: Get the category ID from the slug
  const categoryRes = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/categories?slug=${slug}`,
    { next: { revalidate: 60 } }
  )
  const categories = await categoryRes.json()

  if (!categories || categories.length === 0) {
    notFound() // If category doesn't exist
  }

  const categoryId = categories[0].id

  // Step 2: Fetch posts in this category
  const postRes = await fetch(
    `https://public-api.wordpress.com/wp/v2/sites/omoolaexblog.wordpress.com/posts?_embed&categories=${categoryId}&per_page=9`,
    { next: { revalidate: 60 } }
  )
  const posts = await postRes.json()

return (
  <>
    <PageHero
      title={`Category: ${categories[0].name}`}
      subtitle={`Explore posts under ${categories[0].name}`}
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