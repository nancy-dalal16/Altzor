import { getPostsByCategory, getCategories } from '@/lib/sanity'
import BlogCard from '@/components/BlogCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 60

// Generate static params
export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    if (!categories || categories.length === 0) {
      console.warn('No categories found for static generation')
      return []
    }
    return categories.map((category) => ({
      slug: category.slug.current,
    }))
  } catch (error) {
    console.error('Error fetching categories for static params:', error)
    return []
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params
  
  let categories = []
  let category = null
  let posts = []
  
  try {
    categories = await getCategories()
    category = categories.find((cat) => cat.slug.current === slug)

    if (!category) {
      notFound()
    }

    posts = await getPostsByCategory(slug)
  } catch (error) {
    console.error('Error loading category page:', error)
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Enhanced Hero with Theme Colors */}
      <section 
        className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[hsl(238,63%,20%)] via-[hsl(238,63%,25%)] to-[hsl(238,63%,30%)]"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Posts</span>
          </Link>

          <div className="max-w-3xl">
            {/* Category Badge */}
            <div 
              className="inline-block px-4 py-2 rounded-full mb-4 text-sm font-semibold"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              Category
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {category.title}
            </h1>
            {category.description && (
              <p className="text-lg md:text-xl text-white/90 mb-4">{category.description}</p>
            )}
            
            {/* Stats */}
            <div className="flex items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{category.count} {category.count === 1 ? 'article' : 'articles'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section with Enhanced Design */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {posts && posts.length > 0 ? (
            <>
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  All Articles in {category.title}
                </h2>
                <div className="w-20 h-1 rounded-full bg-primary" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {posts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-primary/10">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  No articles yet
                </h2>
                <p className="text-gray-600 mb-8">
                  We're working on creating amazing content for this category. Check back soon!
                </p>
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold transition-all duration-300 text-white shadow-lg hover:shadow-xl bg-primary hover:bg-primary/90"
                >
                  View all posts
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
