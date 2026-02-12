import { client } from '@/sanity/lib/client'

// Fetch all posts
export async function getPosts() {
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "author": author->{name, slug, image, jobTitle},
    "categories": categories[]->{_id, title, slug, color},
    featured
  }`
  
  return await client.fetch(query)
}

// Fetch a single post by slug
export async function getPost(slug, isDraftMode = false) {
  const draftFilter = isDraftMode ? '' : '&& !(_id in path("drafts.**"))'
  const query = `*[_type == "post" ${draftFilter} && slug.current == $slug] | order(_updatedAt desc) [0] {
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
    "count": count(*[_type == "post" && !(_id in path("drafts.**")) && references(^._id)])
  }`
  
  return await client.fetch(query)
}

// Fetch posts by category
export async function getPostsByCategory(slug) {
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && $slug in categories[]->slug.current] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "author": author->{name, slug, image},
    "categories": categories[]->{_id, title, slug, color}
  }`
  
  return await client.fetch(query, { slug })
}

// Fetch related posts
export async function getRelatedPosts(currentSlug, categories) {
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && $slug != slug.current && count((categories[]->slug.current)[@ in $categories]) > 0] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "author": author->{name, slug},
    "categories": categories[]->{_id, title, slug, color}
  }`
  
  const categorySlugsList = categories?.map(cat => cat.slug.current) || []
  return await client.fetch(query, { slug: currentSlug, categories: categorySlugsList })
}

// Fetch featured posts
export async function getFeaturedPosts() {
  const query = `*[_type == "post" && !(_id in path("drafts.**")) && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    "author": author->{name, slug},
    "categories": categories[]->{_id, title, slug, color}
  }`
  
  return await client.fetch(query)
}
