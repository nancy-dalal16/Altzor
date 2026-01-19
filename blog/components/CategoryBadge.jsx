'use client'

import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useState } from 'react'

export default function CategoryBadge({ category, isActive = false }) {
  const [isHover, setIsHover] = useState(false)
  
  return (
    <Link href={isActive ? '/' : `/category/${category.slug?.current || category.slug}`}>
      <Badge
        variant="outline"
        className="cursor-pointer transition-all duration-300 text-sm py-2.5 px-5 font-medium border-primary"
        style={{
          backgroundColor: isActive || isHover ? 'hsl(var(--primary))' : 'transparent',
          color: isActive || isHover ? '#ffffff' : 'hsl(var(--primary))',
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {isActive ? 'All Posts' : category.title} {category.count > 0 && `(${category.count})`}
      </Badge>
    </Link>
  )
}
