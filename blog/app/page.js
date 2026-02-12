import { getPosts, getCategories, getFeaturedPosts } from '@/lib/sanity'
import BlogPageClient from '@/components/BlogPageClient'

export const revalidate = 60 // Revalidate every 60 seconds (ISR)

export const metadata = {
  title: 'Altzor Blog | Insights & Engineering Excellence',
  description: 'Explore our latest insights, engineering excellence, and industry expertise. Stay updated with Altzor\'s blog on technology, innovation, and best practices.',
  keywords: ['Altzor', 'Blog', 'Engineering', 'Technology', 'Innovation', 'Insights'],
  openGraph: {
    title: 'Altzor Blog | Insights & Engineering Excellence',
    description: 'Explore our latest insights, engineering excellence, and industry expertise.',
    type: 'website',
    siteName: 'Altzor Blog',
    locale: 'en_US',
    url: 'https://altzor.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Altzor Blog | Insights & Engineering Excellence',
    description: 'Explore our latest insights, engineering excellence, and industry expertise.',
    site: '@Altzor',
  },
}


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
