'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: 'https://altzor.com/', label: 'Home' },
    {
      label: 'About',
      dropdown: [
        { href: 'https://altzor.com/about', label: 'About Altzor' },
        { href: 'https://altzor.com/leadership', label: 'Leadership Team' },
      ],
    },
    {
      label: 'Services',
      dropdown: [
        { href: 'https://altzor.com/product-engineering', label: 'Product Engineering' },
        { href: 'https://altzor.com/data-engineering', label: 'Data Engineering' },
        { href: 'https://altzor.com/platform-based-engineering', label: 'Platform-Based Engineering' },
        { href: 'https://altzor.com/technology-offerings', label: 'Technology Offerings' },
        { href: 'https://altzor.com/generative-ai-engineering-services', label: 'Generative AI & AI Engineering' },
      ],
    },
    {
      label: 'Engagement Models',
      dropdown: [
        { href: 'https://altzor.com/gcc-as-a-service', label: 'GCC-as-a-Service for Global Enterprise' },
        { href: 'https://altzor.com/vc-pe-backed-portfolio-support', label: 'VC/PE-backed Portfolio Support' },
      ],
    },
    { href: 'https://altzor.com/career', label: 'Careers' },
    { href: 'https://altzor.com/why-choose-us', label: 'Why Choose Us' },
    {
      label: 'Resources',
      dropdown: [
        { href: 'https://blog.altzor.com', label: 'Blogs' },
      ],
    },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="https://altzor.com/" className="shrink-0">
            <Image
              src="/assets/img/Altzor-Logo-Dark.svg"
              alt="Altzor"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) =>
              link.dropdown ? (
                <div key={index} className="relative group">
                  <button className="nav-link flex items-center gap-1 text-md font-medium text-gray-900 hover:text-primary transition-colors">
                    {link.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-lg border border-gray-100">
                    <div className="py-2">
                      {link.dropdown.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="nav-link text-md font-medium text-gray-900 hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <a
            href="https://altzor.com/contact-us"
            className="hidden lg:inline-flex items-center justify-center py-2 px-4 bg-primary text-white rounded-full font-medium transition-all duration-300 border border-primary hover:bg-white hover:text-primary group"
          >
            Contact Us
            {/* <span className="ml-2 w-5 h-5 bg-white text-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <ArrowRight className="w-3 h-3" />
            </span> */}
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-900 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link, index) =>
                link.dropdown ? (
                  <div key={index} className="space-y-2">
                    <div className="text-sm font-semibold text-gray-900 px-3 py-2">
                      {link.label}
                    </div>
                    {link.dropdown.map((item, idx) => (
                      <a
                        key={idx}
                        href={item.href}
                        className="block px-6 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    className="block px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 hover:text-primary rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
              <a
                href="https://altzor.com/contact-us"
                className="mx-3 mt-4 inline-flex items-center justify-center py-2 px-4 bg-primary text-white rounded-full font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
