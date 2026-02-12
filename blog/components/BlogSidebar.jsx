'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/client'
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react'
import TableOfContents from './TableOfContents'

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
      {/* Table of Contents with Scroll Highlighting */}
      {headings && headings.length > 0 && (
        <TableOfContents headings={headings} />
      )}

      {/* Share Buttons - Always visible */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Share</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={shareOnTwitter}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-left cursor-pointer"
          >
            <Twitter className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Share on Twitter</span>
          </button>
          <button
            onClick={shareOnLinkedIn}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-left cursor-pointer"
          >
            <Linkedin className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Share on LinkedIn</span>
          </button>
          <button
            onClick={shareOnFacebook}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-left cursor-pointer"
          >
            <Facebook className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Share on Facebook</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all text-left cursor-pointer"
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

      {/* Recommended for you (Related Posts) */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Recommended for you</h3>
          <div className="space-y-4">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <Link
                key={relatedPost._id}
                href={`/${relatedPost.slug.current}`}
                className="block group"
              >
                <div className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  {relatedPost.mainImage && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
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
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {relatedPost.title}
                    </h4>
                    {relatedPost.excerpt && (
                      <p className="text-xs text-gray-600 line-clamp-2">{relatedPost.excerpt}</p>
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
