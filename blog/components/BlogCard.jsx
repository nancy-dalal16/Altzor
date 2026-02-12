import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { urlFor } from '@/sanity/lib/client'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function BlogCard({ post, variant = 'default' }) {
  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(variant === 'featured' ? 1200 : 600).url()
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

  // Sidebar variant - compact horizontal layout
  if (variant === 'sidebar') {
    return (
      <Link href={`/${post.slug.current}`} className="group block">
        <article className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0 hover:bg-gray-50 transition-colors duration-300 rounded-lg p-1.5">
          <div className="relative w-24 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              width={96}
              height={96}
              sizes="96px"
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 rounded-lg"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h4>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {post.publishedAt && (
                <span>{format(new Date(post.publishedAt), 'MMM dd')}</span>
              )}
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Featured variant - large prominent card
  if (variant === 'featured') {
    return (
      <Link href={`/${post.slug.current}`} className="group block h-full">
        <article className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200 hover:border-primary hover:shadow-2xl transition-all duration-500">
          <div className="relative w-full overflow-hidden bg-white border border-gray-100 rounded-t-2xl">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 rounded-t-2xl"
              priority
            />
            {/* {post.categories && post.categories.length > 0 && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-white px-3 py-1.5 text-sm font-semibold  border-primary-foreground">
                  {post.categories[0].title}
                </Badge>
              </div>
            )} */}
          </div>
          <div className="p-8 flex flex-col grow">
            <h2 className="text-3xl  font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>
           {post.categories && post.categories.length > 0 && (
              <Badge className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium w-fit mb-3  border-primary">
                {post.categories[0].title}
              </Badge>
            )}
            <p className="text-md text-gray-600 mb-6 line-clamp-3 grow leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200 flex-wrap">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
                </div>
              )}
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // List variant - horizontal layout for list view
  if (variant === 'list') {
    return (
      <Link href={`/${post.slug.current}`} className="group block">
        <article className="bg-white rounded-xl overflow-hidden flex flex-wrap items-center gap-6 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 p-4">
        <div className="relative w-48 shrink-0 rounded-lg overflow-hidden bg-white border border-gray-100">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              width={192}
              height={128}
              sizes="192px"
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105 rounded-lg"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between py-2">
            {post.categories && post.categories.length > 0 && (
              <Badge className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium w-fit mb-2  border-primary">
                {post.categories[0].title}
              </Badge>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
                </div>
              )}
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Default variant - grid card
  return (
    <Link href={`/${post.slug.current}`} className="group block h-full">
      <article className="bg-white rounded-2xl overflow-hidden h-full flex flex-col border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
        <div className="relative w-full overflow-hidden bg-white border border-gray-100 rounded-t-2xl">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 rounded-t-2xl"
          />
          {/* {post.categories && post.categories.length > 0 && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-transparent text-white px-3 py-1 text-xs font-medium border-l-2 border-white">
                {post.categories[0].title}
              </Badge>
            </div>
          )} */}
        </div>
        <div className="p-6 flex flex-col grow">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
           {post.categories && post.categories.length > 0 && (
              <Badge className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-medium w-fit mb-3  border-primary">
                {post.categories[0].title}
              </Badge>
            )}
          <p className="text-gray-600 mb-4 line-clamp-3 grow leading-relaxed text-sm">
            {post.excerpt}
          </p>
         
          <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-200 flex-wrap">
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.publishedAt), 'MMM dd, yyyy')}</span>
              </div>
            )}
            <span>•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
