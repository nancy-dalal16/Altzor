import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function DraftModeIndicator() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-yellow-500 text-black px-4 py-3 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
            <span className="font-bold text-sm uppercase tracking-wider">
              Preview Mode
            </span>
          </div>
          <span className="text-sm">
            You are viewing draft content
          </span>
        </div>
        <Link
          href="/api/disable-draft"
          className="flex items-center gap-2 bg-black text-yellow-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          <XCircle className="w-4 h-4" />
          Exit Preview
        </Link>
      </div>
    </div>
  )
}
