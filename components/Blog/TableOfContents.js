'use client'

import { useEffect, useState } from 'react'

export default function TableOfContents({ headings = [] }) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const offsets = headings.map((h) => {
        const el = document.getElementById(h.id)
        return { id: h.id, top: el?.getBoundingClientRect().top || Infinity }
      })

      // ✅ Pick the first heading visible in the viewport
      const active = offsets.find((o) => o.top >= 0 && o.top <= 150)
      if (active) setActiveId(active.id)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headings])

  if (!headings.length) return null

  return (
    <nav className="sticky top-24 bg-white shadow-md rounded-xl p-4 border">
      <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li
            key={h.id}
            className={`ml-${(h.level - 1) * 4} ${
              activeId === h.id ? 'text-blue-600 font-semibold' : 'text-gray-600'
            }`}
          >
            <a href={`#${h.id}`} className="hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}