import { groq } from 'next-sanity'
import { client } from '@/lib/sanity.client'

// ✅ Fetch all blog posts with excerpt and categories
export async function getBlogPosts() {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      author,
      excerpt,
      image,
      body,
      categories[]->{
        _id,
        title
      }
    }`
  )
}