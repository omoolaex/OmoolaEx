'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md transition-shadow duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="OmoolaEx Logo"
            width={140}
            height={40}
            className="w-auto h-8 md:h-10 object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-gray-700 font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition duration-200 hover:text-blue-600 ${
                  pathname === link.href ? 'text-blue-600 font-semibold' : ''
                }`}
              >
                {link.label}
                {/* Underline effect */}
                <span
                  className={`absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ${
                    pathname === link.href ? 'scale-x-100' : ''
                  }`}
                ></span>
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <Link
            href="/request-a-quote"
            className="ml-6 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
          <nav className="flex flex-col gap-4 text-gray-700 font-medium">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-blue-600 transition"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-a-quote"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-block text-center px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Get a Free Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}