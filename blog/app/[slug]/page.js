import { getPost, getPosts, getRelatedPosts } from '@/lib/sanity'
import { urlFor } from '@/sanity/lib/client'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { PortableText } from '@portabletext/react'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import BlogCard from '@/components/BlogCard'
import BlogSidebar from '@/components/BlogSidebar'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import { notFound } from 'next/navigation'

export const revalidate = 60 // ISR

// Generate static paths for all posts
export async function generateStaticParams() {
  try {
    const posts = await getPosts()
    if (!posts || posts.length === 0) {
      console.warn('No posts found for static generation')
      return []
    }
    return posts.map((post) => ({
      slug: post.slug.current,
    }))
  } catch (error) {
    console.error('Error fetching posts for static params:', error)
    return []
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  try {
    const { slug } = await params
    const post = await getPost(slug)
    
    if (!post) {
      return {
        title: 'Altzor Blog',
        description: 'Insights & Engineering Excellence'
      }
    }

    let imageUrl = null
    try {
      if (post.mainImage?.asset?._ref) {
        imageUrl = urlFor(post.mainImage).width(1200).height(630).url()
      }
    } catch (imgError) {
      console.error('Error generating image URL:', imgError)
    }

    return {
      title: post.seo?.metaTitle || `${post.title} | Altzor Blog`,
      description: post.seo?.metaDescription || post.excerpt,
      keywords: post.seo?.keywords || [],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: post.author?.name ? [post.author.name] : [],
        images: imageUrl ? [imageUrl] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Altzor Blog',
      description: 'Insights & Engineering Excellence'
    }
  }
}

// Portable Text components for rich text rendering
const getComponents = (headings) => ({
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={450}
            className="rounded-xl w-full"
          />
          {value.alt && (
            <p className="text-sm text-gray-500 text-center mt-2">{value.alt}</p>
          )}
        </div>
      )
    },
    code: ({ value }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold mt-12 mb-4 text-gray-900">{children}</h1>,
    h2: ({ children, value }) => {
      const text = value?.children?.map(c => c.text).join('') || ''
      const heading = headings.find(h => h.text === text)
      return <h2 id={heading?.id} className="text-3xl font-bold mt-10 mb-4 text-gray-900 scroll-mt-24">{children}</h2>
    },
    h3: ({ children, value }) => {
      const text = value?.children?.map(c => c.text).join('') || ''
      const heading = headings.find(h => h.text === text)
      return <h3 id={heading?.id} className="text-2xl font-bold mt-8 mb-3 text-gray-900 scroll-mt-24">{children}</h3>
    },
    h4: ({ children }) => <h4 className="text-xl font-bold mt-6 mb-2 text-gray-900">{children}</h4>,
    normal: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-700">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
})

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(slug, post.categories)

  // Extract headings for Table of Contents
  const headings = post.body 
    ? post.body
        .filter(block => block._type === 'block' && ['h2', 'h3'].includes(block.style))
        .map((block, index) => ({
          id: `heading-${index}`,
          text: block.children?.map(child => child.text).join('') || '',
          level: block.style
        }))
    : []

  // Calculate read time
  const readTime = post.body 
    ? Math.ceil(post.body.reduce((acc, block) => {
        if (block._type === 'block' && block.children) {
          return acc + block.children.reduce((sum, child) => sum + (child.text?.split(' ').length || 0), 0)
        }
        return acc
      }, 0) / 200)
    : 5

  return (
    <article className="bg-white">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[hsl(238,63%,20%)] via-[hsl(238,63%,25%)] to-[hsl(238,63%,30%)] py-12 md:py-16">
        <div className="container">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          <div className="max-w-4xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              {/* {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                      <Image
                        src={urlFor(post.author.image).width(48).height(48).url()}
                        alt={post.author.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    {post.author.jobTitle && (
                      <p className="text-sm text-white/70">{post.author.jobTitle}</p>
                    )}
                  </div>
                </div>
              )} */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(post.publishedAt), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image with Updated Style */}
      {post.mainImage && (
        <section className="container -mt-8 md:-mt-12">
          <div className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.mainImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1200px"
              className="object-cover"
              priority
            />
            {/* Subtle gradient overlay for better aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </section>
      )}

      {/* Content with Sidebar */}
      <section className="container py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} components={getComponents(headings)} />
            </div>

            {/* Sidebar - Desktop: sticky right side, Mobile: below content */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <BlogSidebar post={post} relatedPosts={relatedPosts} headings={headings} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-muted py-16 md:py-20">
          <div className="container">
            <h2 className="section-title text-center mb-12">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
