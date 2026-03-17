'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'

/* ─────────────────────────────────────────────────
   NAV DATA  (mirrors header.html on the main site)
───────────────────────────────────────────────── */
const NAV = [
  { href: 'https://altzor.com/', label: 'Home', type: 'link' },

  /* ── Who We Are – mega menu ── */
  {
    label: 'Who We Are',
    type: 'mega',
    cols: [
      {
        title: 'About',
        links: [
          { label: 'About Altzor',    href: 'https://altzor.com/about' },
          { label: 'Leadership Team', href: 'https://altzor.com/leadership' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'Why Choose Us', href: 'https://altzor.com/why-choose-us' },
        ],
      },
    ],
  },

  /* ── What We Do – mega menu ── */
  {
    label: 'What We Do',
    type: 'mega',
    cols: [
      {
        title: 'Services',
        links: [
          { label: 'Product Engineering',         href: 'https://altzor.com/product-engineering' },
          { label: 'Data Engineering',            href: 'https://altzor.com/data-engineering' },
          { label: 'Platform-Based Engineering',  href: 'https://altzor.com/platform-based-engineering' },
          { label: 'Technology Offerings',        href: 'https://altzor.com/technology-offerings' },
        ],
      },
      {
        title: 'Engagement Models',
        links: [
          { label: 'GCC as a Service for Global Enterprise', href: 'https://altzor.com/gcc-as-a-service' },
          { label: 'VC/PE-backed Portfolio Support',         href: 'https://altzor.com/vc-pe-backed-portfolio-support' },
        ],
      },
    ],
  },

  /* ── Generative AI – plain link ── */
  { label: 'Generative AI & AI Engineering', href: 'https://altzor.com/generative-ai-engineering-services', type: 'link' },

  /* ── Careers – plain link ── */
  { label: 'Careers', href: 'https://altzor.com/career', type: 'link' },

  /* ── Resources – small dropdown ── */
  {
    label: 'Resources',
    type: 'dropdown',
    items: [
      { label: 'Blogs', href: 'https://blog.altzor.com/' },
    ],
  },
]

/* ─────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────── */
export default function Header() {
  const headerRef = useRef(null)

  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [openMega,     setOpenMega]     = useState(null)   // idx of open mega panel
  const [openDrop,     setOpenDrop]     = useState(null)   // idx of open small dropdown
  const [mobileAccord, setMobileAccord] = useState({})

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* close on outside click */
  useEffect(() => {
    const handleOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMega(null)
        setOpenDrop(null)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  /* close mobile on resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const toggleMega = useCallback((idx) => {
    setOpenMega(prev => prev === idx ? null : idx)
    setOpenDrop(null)
  }, [])

  const toggleDrop = useCallback((idx) => {
    setOpenDrop(prev => prev === idx ? null : idx)
    setOpenMega(null)
  }, [])

  const toggleMobileAccord = useCallback((idx) => {
    setMobileAccord(prev => ({ ...prev, [idx]: !prev[idx] }))
  }, [])

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      {/* ── Top bar ── */}
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
              priority
            />
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item, idx) => {
              /* MEGA */
              if (item.type === 'mega') {
                const isOpen = openMega === idx
                return (
                  <div key={idx} className="relative">
                    <button
                      onClick={() => toggleMega(idx)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                        isOpen ? 'text-primary' : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                )
              }

              /* SMALL DROPDOWN */
              if (item.type === 'dropdown') {
                const isOpen = openDrop === idx
                return (
                  <div key={idx} className="relative">
                    <button
                      onClick={() => toggleDrop(idx)}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                        isOpen ? 'text-primary' : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Small dropdown panel */}
                    <div
                      className={`absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 origin-top-right ${
                        isOpen
                          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 scale-95 -translate-y-1 pointer-events-none invisible'
                      }`}
                    >
                      {item.items.map((it, ii) => (
                        <a
                          key={ii}
                          href={it.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:text-primary hover:bg-transparent transition-colors duration-150"
                        >
                          {it.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )
              }

              /* PLAIN LINK */
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary rounded-md transition-colors duration-200"
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          {/* Contact Us – desktop */}
          <a
            href="https://altzor.com/contact-us"
            className="hidden lg:inline-flex items-center justify-center py-2 px-5 bg-primary text-white rounded-full text-sm font-semibold transition-all duration-300 border border-primary hover:bg-white hover:text-primary"
          >
            Contact Us
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            className="lg:hidden p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MEGA MENU PANELS – full-width, below header bar
          Rendered outside the container so they span full width
      ══════════════════════════════════════════════ */}
      {NAV.map((item, idx) => {
        if (item.type !== 'mega') return null
        const isOpen = openMega === idx

        return (
          <div
            key={idx}
            className={`hidden lg:block absolute left-0 right-0 bg-white border-t border-gray-100 shadow-xl transition-all duration-300 origin-top ${
              isOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none invisible'
            }`}
            style={{ top: '80px' }}   /* matches h-20 header bar */
          >
            <div className="container mx-auto px-4 lg:px-8 py-8">
              <div className="flex gap-12">
                {item.cols.map((col, ci) => (
                  <div
                    key={ci}
                    className="min-w-[160px]"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? 'translateY(0)' : 'translateY(10px)',
                      transition: `opacity 0.35s ease ${0.07 + ci * 0.07}s, transform 0.35s ease ${0.07 + ci * 0.07}s`,
                    }}
                  >
                    {/* Column title */}
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 pb-2 border-b border-gray-100">
                      {col.title}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {col.links.map((lnk, li) => (
                        <li key={li}>
                          <a
                            href={lnk.href}
                            className="block px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-primary rounded-md transition-colors duration-150"
                            style={{
                              opacity: isOpen ? 1 : 0,
                              transform: isOpen ? 'translateX(0)' : 'translateX(-6px)',
                              transition: `opacity 0.3s ease ${0.12 + ci * 0.07 + li * 0.04}s, transform 0.3s ease ${0.12 + ci * 0.07 + li * 0.04}s`,
                            }}
                            onClick={() => setOpenMega(null)}
                          >
                            {lnk.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {/* ══════════════════════════════════════════════
          MOBILE PANEL
      ══════════════════════════════════════════════ */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">

            {NAV.map((item, idx) => {
              /* MEGA → accordion on mobile */
              if (item.type === 'mega') {
                const isOpen = !!mobileAccord[idx]
                return (
                  <div key={idx}>
                    <button
                      onClick={() => toggleMobileAccord(idx)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="ml-3 pl-3 border-l-2 border-gray-100 mt-1 mb-2 flex flex-col gap-3">
                        {item.cols.map((col, ci) => (
                          <div key={ci}>
                            <p className="text-[0.65rem] font-bold uppercase tracking-widest text-gray-400 px-2 mb-1">
                              {col.title}
                            </p>
                            {col.links.map((lnk, li) => (
                              <a
                                key={li}
                                href={lnk.href}
                                className="block px-2 py-1.5 text-sm text-gray-700 hover:text-primary rounded-md transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {lnk.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              /* SMALL DROPDOWN → accordion on mobile */
              if (item.type === 'dropdown') {
                const isOpen = !!mobileAccord[idx]
                return (
                  <div key={idx}>
                    <button
                      onClick={() => toggleMobileAccord(idx)}
                      className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isOpen && (
                      <div className="ml-3 pl-3 border-l-2 border-gray-100 mt-1 mb-2">
                        {item.items.map((it, ii) => (
                          <a
                            key={ii}
                            href={it.href}
                            className="block px-2 py-1.5 text-sm text-gray-700 hover:text-primary rounded-md transition-colors"
                            onClick={() => setMobileOpen(false)}
                          >
                            {it.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              /* PLAIN LINK */
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="block px-3 py-2.5 text-sm font-semibold text-gray-800 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              )
            })}

            {/* Contact Us – mobile */}
            <a
              href="https://altzor.com/contact-us"
              className="mt-3 inline-flex items-center justify-center py-2 px-5 bg-primary text-white rounded-full text-sm font-semibold border border-primary hover:bg-white hover:text-primary transition-all duration-300"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
