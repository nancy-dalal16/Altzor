import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center md:justify-between justify-center gap-6">
            <div className="flex-1 min-w-[280px]">
              <h2 className="text-secondary text-3xl md:text-4xl font-bold text-center md:text-left">
                Let's build something together!
              </h2>
              <p className="text-secondary/90 mt-2 text-center md:text-left">
                Products, platforms, and pipelines — built with AI at the core.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <a
                href="https://altzor.com/contact-us"
                className="inline-flex items-center justify-center py-2 px-4 bg-primary text-white rounded-full font-medium transition-all duration-300 border border-primary hover:bg-white hover:text-primary group"
              >
                Talk to Us
                {/* <span className="ml-2 w-5 h-5 bg-white text-primary rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <ArrowRight className="w-3 h-3" />
                </span> */}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-4">
              <Image
                src="/assets/img/Altzor-Logo-Dark.svg"
                alt="Altzor"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
              <p className="mt-4 leading-relaxed">
                <strong>Altzor</strong> is an engineering partner founded by seasoned
                entrepreneurs and product leaders, shaping the next generation of
                intelligent products and platforms.
              </p>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://altzor.com/about" className=" hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/career" className=" hover:text-primary transition-colors">
                    Career
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/why-choose-us" className=" hover:text-primary transition-colors">
                    Why choose us?
                  </a>
                </li>
                <li>
                  <a href="https://blog.altzor.com" className=" hover:text-primary transition-colors">
                  Blogs
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/contact-us" className=" hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://altzor.com/product-engineering" className=" hover:text-primary transition-colors">
                    Product Engineering
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/data-engineering" className=" hover:text-primary transition-colors">
                    Data Engineering
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/platform-based-engineering" className=" hover:text-primary transition-colors">
                    Platform Based Engineering
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/technology-offerings" className=" hover:text-primary transition-colors">
                    Technology Offerings
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/generative-ai-engineering-services" className=" hover:text-primary transition-colors">
                    Generative AI & AI Engineering
                  </a>
                </li>
              </ul>
            </div>

            {/* Engagement Models Links */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Engagement Models</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://altzor.com/gcc-as-a-service" className=" hover:text-primary transition-colors">
                    GCC-as-a-Service for Global Enterprise
                  </a>
                </li>
                <li>
                  <a href="https://altzor.com/vc-pe-backed-portfolio-support" className=" hover:text-primary transition-colors">
                    VC/PE-backed Portfolio Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className=" text-sm">
              © Copyright 2026, All Rights Reserved by Altzor
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/altzor/"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
