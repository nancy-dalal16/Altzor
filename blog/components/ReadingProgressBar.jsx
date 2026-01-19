'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Get the total scrollable height
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Calculate progress percentage
      const totalScrollableHeight = documentHeight - windowHeight
      const scrollProgress = (scrollTop / totalScrollableHeight) * 100

      // Update state
      setProgress(Math.min(scrollProgress, 100))
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Initial calculation
    handleScroll()

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
