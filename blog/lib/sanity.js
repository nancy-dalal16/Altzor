import { client } from '@/sanity/lib/client'

// Fetch all posts
export async function getPosts() {
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{name, slug, image, jobTitle},
    "categories": categories[]->{_id, title, slug, color},
    featured
  }`
  
  return await client.fetch(query)
}

// Fetch a single post by slug
export async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "author": author->{name, slug, image, jobTitle, bio, social},
    "categories": categories[]->{_id, title, slug, color},
    seo,
    featured
  }`
  
  return await client.fetch(query, { slug })
}

// Fetch all categories
export async function getCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "count": count(*[_type == "post" && references(^._id)])
  }`
  
  return await client.fetch(query)
}

// Fetch posts by category
export async function getPostsByCategory(slug) {
  const query = `*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{name, slug, image},
    "categories": categories[]->{_id, title, slug, color}
  }`
  
  return await client.fetch(query, { slug })
}

// Fetch related posts
export async function getRelatedPosts(currentSlug, categories) {
  const query = `*[_type == "post" && $slug != slug.current && count((categories[]->slug.current)[@ in $categories]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{name, slug},
    "categories": categories[]->{_id, title, slug, color}
  }`
  
  const categorySlugsList = categories?.map(cat => cat.slug.current) || []
  return await client.fetch(query, { slug: currentSlug, categories: categorySlugsList })
}

// Fetch featured posts
export async function getFeaturedPosts() {
  const query = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "author": author->{name, slug},
    "categories": categories[]->{_id, title, slug, color}
  }`
  
  return await client.fetch(query)
}
