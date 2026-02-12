'use client'

import { useState, useMemo } from 'react'
import BlogCard from '@/components/BlogCard'
import Pagination from '@/components/Pagination'
import { Search, X, Grid3x3, List } from 'lucide-react'

const POSTS_PER_PAGE = 8

export default function BlogPageClient({ initialPosts, categories, featuredPosts }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  // Get the featured post from Sanity (marked as featured in Studio)
  const featuredPost = featuredPosts && featuredPosts.length > 0 ? featuredPosts[0] : null
  
  // Get recent posts for sidebar (excluding the featured post if it exists)
  const recentPosts = initialPosts && initialPosts.length > 1 
    ? initialPosts.filter(post => post._id !== featuredPost?._id).slice(0, 5)
    : []

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
        if (post.title?.toLowerCase().includes(query)) return true
        if (post.excerpt?.toLowerCase().includes(query)) return true
        if (post.author?.name?.toLowerCase().includes(query)) return true
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Reset to page 1 when search query or category changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  return (
    <div className="bg-white min-h-screen">
      {/* Minimal Hero Section */}
      <section className=" border-b border-gray-200 bg-gray-100">
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary mb-4">
              Blog
            </h1>
            <p className="text-xl text-secondary mb-8">
              Explore cutting-edge insights on AI-native engineering, data platforms, and modern product development
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story + What's New Section */}
      {!searchQuery && !selectedCategory && featuredPost && (
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* Featured Story */}
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Featured Story</h2>
                </div>
                <BlogCard post={featuredPost} variant="featured" />
              </div>

              {/* What's New Sidebar */}
              <div>
                <div className="flex items-center gap-2 mb-6 pt-16 md:pt-0">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">What's New</h2>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 space-y-4">
                  {recentPosts.map((post) => (
                    <BlogCard key={post._id} post={post} variant="sidebar" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Section Header with Filters */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
              {searchQuery ? 'Search Results' : 'Recent Posts'}
            </h2>

            {/* Category Filters + View Toggle */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Pills */}
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      !selectedCategory
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory?._id === category._id
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
                      }`}
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              )}

              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1" style={{width: 'fit-content'}}> 
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Posts Grid/List */}
          {filteredPosts && filteredPosts.length > 0 ? (
            <>
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
                  : 'flex flex-col gap-4'
              }>
                {paginatedPosts.map((post) => (
                  <BlogCard 
                    key={post._id} 
                    post={post} 
                    variant={viewMode === 'list' ? 'list' : 'default'} 
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : searchQuery ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No results found
                </h3>
                <p className="text-gray-600 mb-8">
                  We couldn't find any articles matching "<strong>{searchQuery}</strong>". Try different keywords or browse all posts.
                </p>
                <button
                  onClick={handleClearSearch}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-800"
                >
                  Clear Search
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No posts yet
                </h3>
                <p className="text-gray-600">
                  We're working on creating amazing content for you. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

