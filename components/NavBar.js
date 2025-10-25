'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(prev => !prev)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Case Studies' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center z-50">
          <Image
            src="/images/logo.svg"
            alt="OmoolaEx Logo"
            width={220}          // slightly larger for visibility
            height={60}          // increase height
            className="object-contain w-auto h-auto max-h-16 md:max-h-20" // responsive height
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex gap-6 text-gray-700 font-medium">
            {navLinks.map(link => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative transition duration-200 hover:text-blue-600 ${
                    isActive ? 'text-blue-600 font-semibold' : ''
                  } group`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* CTA Button */}
          <Link
            href="/bookings"
            className="ml-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm whitespace-nowrap"
          >
            Book a Consultation
          </Link>
        </div>

        {/* Mobile/Tablet Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown Menu */}
      <div
        className={`lg:hidden transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-6 space-y-4">
          <nav className="flex flex-col gap-3 text-gray-700 font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`transition hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* CTA Button */}
            <Link
              href="/bookings"
              onClick={() => setIsOpen(false)}
              className="mt-3 block text-center px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Book a Consultation
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
