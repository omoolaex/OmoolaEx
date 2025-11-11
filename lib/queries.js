// Paginated posts with all fields
export const paginatedPostsQuery = `
*[
  _type == "post" &&
  !(_id in path("drafts.**")) &&
  defined(slug.current) &&
  (!defined($categoryId) || $categoryId in categories[]._ref)
]
| order(publishedAt desc)[$start...$end]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author,
  views,
  image,
  categories[]->{
    _id,
    title,
    slug
  }
}
`;

// All categories
export const allCategoriesQuery = `
*[_type == "category"]{
  _id,
  title,
  slug
}
`;

// Count all posts
export const totalPostsQuery = `
count(*[_type == "post" && !(_id in path("drafts.**"))])
`;

// Count posts by category
export const totalPostsByCategoryQuery = `
count(*[_type == "post" && !(_id in path("drafts.**")) && $categoryId in categories[]._ref])
`;

// All slugs (for static generation)
export const allSlugsQuery = `
*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)][].slug.current
`;

// Single post query
export const singlePostQuery = `
*[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  publishedAt,
  author,
  views,
  image,
  seoTitle,
  seoDescription,
  keywords,
  categories[]->{
    _id,
    title,
    slug
  }
}
`;

export const latestPostsQuery = `
*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)]
| order(publishedAt desc)[0...3]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  author,
  views,
  image,
  categories[]->{
    _id,
    title,
    slug
  }
}
`;

// In lib/queries.js

const adjacentPostsQuery = `
  *[_type=="post" && !(_id in path("drafts.**")) && slug.current==$slug][0]{
    "prev": *[_type == "post" && !(_id in path("drafts.**")) && publishedAt < ^.publishedAt] 
      | order(publishedAt desc)[0]{ title, slug },
    "next": *[_type == "post" && !(_id in path("drafts.**")) && publishedAt > ^.publishedAt] 
      | order(publishedAt asc)[0]{ title, slug }
  }
`;
