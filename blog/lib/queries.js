// GROQ Queries for fetching data from Sanity

// Get all published posts with author and category info
export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->{name, slug, image, jobTitle},
  "categories": categories[]->{title, slug, color},
  featured
}`

// Get a single post by slug
export const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  body,
  "author": author->{name, slug, image, jobTitle, bio, social},
  "categories": categories[]->{title, slug, color},
  seo,
  featured
}`

// Get related posts (same category, exclude current post)
export const relatedPostsQuery = `*[_type == "post" && $slug != slug.current && count((categories[]->slug.current)[@ in $categories]) > 0] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->{name, slug},
  "categories": categories[]->{title, slug, color}
}`

// Get all categories
export const categoriesQuery = `*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug,
  description,
  color,
  "count": count(*[_type == "post" && references(^._id)])
}`

// Get posts by category
export const postsByCategoryQuery = `*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->{name, slug, image},
  "categories": categories[]->{title, slug, color}
}`

// Get featured posts
export const featuredPostsQuery = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  "author": author->{name, slug},
  "categories": categories[]->{title, slug, color}
}`

// Get all authors
export const authorsQuery = `*[_type == "author"] | order(name asc) {
  _id,
  name,
  slug,
  image,
  jobTitle,
  bio,
  social
}`
