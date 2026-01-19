'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/client'
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react'

export default function BlogSidebar({ post, relatedPosts, headings }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(post.title)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  return (
    <aside className="space-y-6">
      {/* Table of Contents - Moved to first position */}
      {headings && headings.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Table of Contents</h3>
          <nav className="space-y-2">
            {headings.map((heading, index) => (
              <a
                key={index}
                href={`#${heading.id}`}
                className={`block text-sm hover:text-primary transition-colors ${
                  heading.level === 'h3' ? 'pl-4' : ''
                }`}
                style={{ color: heading.level === 'h3' ? '#6b7280' : '#374151' }}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Author Card */}
      {/* {post.author && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Author</h3>
          <div className="flex items-start gap-3">
            {post.author.image && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={urlFor(post.author.image).width(64).height(64).url()}
                  alt={post.author.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900">{post.author.name}</p>
              {post.author.jobTitle && (
                <p className="text-sm text-gray-600 mt-1">{post.author.jobTitle}</p>
              )}
            </div>
          </div>
        </div>
      )} */}

      {/* Share Buttons */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 ">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Share</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left cursor-pointer"
          >
            <Twitter className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Share on Twitter</span>
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left cursor-pointer"
          >
            <Linkedin className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Share on LinkedIn</span>
          </button>
          <button
            onClick={shareOnFacebook}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left cursor-pointer"
          >
            <Facebook className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Share on Facebook</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all text-left cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-600">Link Copied!</span>
              </>
            ) : (
              <>
                <Link2 className="w-5 h-5 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Related Posts</h3>
          <div className="space-y-4">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <Link
                key={relatedPost._id}
                href={`/${relatedPost.slug.current}`}
                className="block group"
              >
                <div className="flex gap-3">
                  {relatedPost.mainImage && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={urlFor(relatedPost.mainImage).width(80).height(80).url()}
                        alt={relatedPost.title}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    {relatedPost.excerpt && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{relatedPost.excerpt}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
