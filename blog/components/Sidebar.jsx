import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Sidebar({ categories, relatedPosts, currentPost }) {
  return (
    <aside className="space-y-8">
      {/* Table of Contents */}
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
        <nav className="space-y-2">
          <a href="#introduction" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
            <span>Introduction</span>
          </a>
          <a href="#main-content" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
            <span>Main Content</span>
          </a>
          <a href="#conclusion" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-gray-50">
            <ChevronRight className="w-4 h-4" />
            <span>Conclusion</span>
          </a>
        </nav>
      </div>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Related Posts</h3>
          <div className="space-y-4">
            {relatedPosts.slice(0, 3).map((post) => (
              <Link 
                key={post._id} 
                href={`/${post.slug.current}`}
                className="group block"
              >
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      {categories && categories.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <span 
                  className="text-sm font-medium transition-colors"
                  style={{ color: category.color || '#FF6701' }}
                >
                  {category.title}
                </span>
                {category.count > 0 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary to-orange-600 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
        <p className="text-sm text-white/90 mb-4">
          Get the latest insights delivered to your inbox
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 mb-3"
        />
        <button className="w-full bg-white text-primary font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Subscribe
        </button>
      </div>
    </aside>
  )
}
