import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { urlFor } from '@/sanity/lib/client'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock } from 'lucide-react'

export default function BlogCard({ post, featured = false }) {
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(600).height(400).url()
    : '/placeholder-blog.png'

  // Calculate read time (rough estimate: 200 words per minute)
  const readTime = post.body 
    ? Math.ceil(post.body.reduce((acc, block) => {
        if (block._type === 'block' && block.children) {
          return acc + block.children.reduce((sum, child) => sum + (child.text?.split(' ').length || 0), 0)
        }
        return acc
      }, 0) / 200)
    : 5

  return (
    <Link 
      href={`/${post.slug.current}`} 
      className={`group block h-full ${featured ? 'md:col-span-2' : ''}`}
    >
      <article className={`
        bg-white rounded-2xl overflow-hidden h-full flex flex-col
        shadow-md hover:shadow-2xl
        transition-all duration-500 ease-out
        hover:-translate-y-1
        border border-gray-100
      `}>
        {/* Featured Image with Gradient Overlay */}
        <div className={`relative w-full ${featured ? 'h-64 md:h-80' : 'h-52 md:h-60'} overflow-hidden`}>
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Featured badge */}
          {/* {(post.featured || featured) && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-white px-3 py-1 text-xs font-semibold shadow-lg">
                ⭐ Featured
              </Badge>
            </div>
          )} */}

          {/* Categories on image */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {post.categories.slice(0, 2).map((category, index) => (
                <Badge
                  key={category._id || category.slug?.current || index}
                  className="text-xs px-2 py-1 shadow-md bg-transparent text-white border-1 border-white"
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title */}
          <h3 className={`
            ${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} 
            font-bold text-gray-900 mb-3 
            group-hover:text-primary 
            transition-colors duration-300
            line-clamp-2
          `}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-sm text-gray-500">
           
              
              <div className="flex items-center gap-3">
                {post.publishedAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readTime} min</span>
                </div>
              </div>
            </div>

            {/* Read More */}
            <div className="flex items-center text-primary font-medium text-sm transition-all duration-300">
              <span>Read More</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
