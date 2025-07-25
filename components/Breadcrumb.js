'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumb() {
  const pathname = usePathname()

  // Extract last segment and format it
  const segments = pathname.split('/').filter(Boolean)
  const current = segments[segments.length - 1] || 'Home'

  const formatTitle = (slug) =>
    slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())

  const currentPage = formatTitle(current)

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-2">
        <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline text-blue-600">Home</Link>
        {segments.length > 0 && (
            <>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{currentPage}</span>
            </>
        )}
        </nav>
    </div>
  )
}
