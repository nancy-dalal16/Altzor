'use client'

import { useState, useMemo } from 'react'
import { getPosts, getCategories, getFeaturedPosts } from '@/lib/sanity'
import BlogCard from '@/components/BlogCard'
import CategoryBadge from '@/components/CategoryBadge'
import Pagination from '@/components/Pagination'
import { Search, Sparkles, X } from 'lucide-react'

const POSTS_PER_PAGE = 8

export default function BlogPageClient({ initialPosts, categories, featuredPosts }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter posts based on search query and selected category
  const filteredPosts = useMemo(() => {
    let posts = initialPosts

    // Filter by category first
    if (selectedCategory) {
      posts = posts.filter(post => 
        post.categories?.some(cat => cat._id === selectedCategory._id)
      )
    }

    // Then filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(post => {
        // Search in title
        if (post.title?.toLowerCase().includes(query)) return true
        
        // Search in excerpt
        if (post.excerpt?.toLowerCase().includes(query)) return true
        
        // Search in author name
        if (post.author?.name?.toLowerCase().includes(query)) return true
        
        // Search in categories
        if (post.categories?.some(cat => cat.title?.toLowerCase().includes(query))) return true
        
        return false
      })
    }

    return posts
  }, [initialPosts, searchQuery, selectedCategory])

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    return filteredPosts.slice(startIndex, endIndex)
  }, [filteredPosts, currentPage])

  const handleClearSearch = () => {
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Scroll to top of blog section
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset to page 1 when search query or category changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(238,63%,20%)] via-[hsl(238,63%,25%)] to-[hsl(21,100%,51%)] py-24 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium">Insights & Innovation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Altzor <span className="text-[hsl(21,100%,51%)]">Blog</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto">
              Explore cutting-edge insights on AI-native engineering, data platforms, and modern product development
            </p>

            {/* Search Bar with Functionality */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 rounded-full bg-white shadow-xl border-0 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-white/80 text-sm mt-3">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[hsl(21,100%,51%)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      </section>





      {/* All Blog Posts Grid with Pagination */}
      <section className="py-16 md:py-24">
        <div className="container">
          {filteredPosts && filteredPosts.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {searchQuery ? 'Search Results' : 'Latest Posts'}
                </h2>
                <p className="text-lg text-gray-600">
                  {searchQuery 
                    ? `Found ${filteredPosts.length} ${filteredPosts.length === 1 ? 'article' : 'articles'} matching "${searchQuery}"`
                    : 'Explore our latest insights and learnings'
                  }
                </p>
              </div>

              {/* Category Filter for Latest Posts */}
              {categories && categories.length > 0 && (
                <div className="mb-8">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                        !selectedCategory
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                      }`}
                    >
                      All Posts
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                          selectedCategory?._id === category._id
                            ? 'bg-primary text-white '
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {category.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>

              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : searchQuery ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  No results found
                </h2>
                <p className="text-gray-600 mb-8">
                  We couldn't find any articles matching "<strong>{searchQuery}</strong>". Try different keywords or browse all posts.
                </p>
                <button
                  onClick={handleClearSearch}
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  No posts yet
                </h2>
                <p className="text-gray-600 mb-8">
                  We're working on creating amazing content for you. Check back soon!
                </p>
                <a
                  href="../"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-full font-semibold transition-all duration-300 hover:bg-primary/90 hover:shadow-lg"
                >
                  Return to Blog Page
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
