import { getPosts, getCategories, getFeaturedPosts } from '@/lib/sanity'
import BlogPageClient from '@/components/BlogPageClient'

export const revalidate = 60 // Revalidate every 60 seconds (ISR)

export default async function BlogPage() {
  const posts = await getPosts()
  const categories = await getCategories()
  const featuredPosts = await getFeaturedPosts()

  return (
    <BlogPageClient 
      initialPosts={posts}
      categories={categories}
      featuredPosts={featuredPosts}
    />
  )
}
