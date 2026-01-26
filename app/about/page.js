'use client';

import Breadcrumb from '../components/Breadcrumb';

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <Breadcrumb items={[{ label: 'About Us', href: null }]} />

      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">About Zeta Toolz</h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl">
          Leading the industry in precision instrument manufacturing since 1995. We specialize in surgical-grade 
          beauty instruments, medical tools, and industrial hardware for professionals worldwide.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 text-center border border-cyan-200">
          <div className="text-4xl font-bold text-cyan-600 mb-2">28+</div>
          <div className="text-gray-700 font-medium">Years Experience</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 text-center border border-cyan-200">
          <div className="text-4xl font-bold text-cyan-600 mb-2">150+</div>
          <div className="text-gray-700 font-medium">Countries Served</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 text-center border border-cyan-200">
          <div className="text-4xl font-bold text-cyan-600 mb-2">5000+</div>
          <div className="text-gray-700 font-medium">Product Varieties</div>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 text-center border border-cyan-200">
          <div className="text-4xl font-bold text-cyan-600 mb-2">100%</div>
          <div className="text-gray-700 font-medium">Quality Certified</div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded in 1995, Zeta Toolz began as a small precision instrument workshop in Sialkot, Pakistan. 
              Our founder, with over three decades of experience in surgical instrument manufacturing, envisioned 
              creating a company that would set new standards in quality, precision, and customer service.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Today, we are proud to be recognized as one of the leading manufacturers of precision instruments 
              globally. Our state-of-the-art manufacturing facilities employ over 500 skilled craftsmen and engineers 
              who combine traditional craftsmanship with modern technology.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Every instrument that leaves our facility undergoes rigorous quality control processes, ensuring it 
              meets the highest international standards. Our ISO 9001 and CE certifications are a testament to our 
              unwavering commitment to excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <p className="text-cyan-50 leading-relaxed">
            To manufacture and deliver precision instruments that empower professionals worldwide to perform at their 
            best. We are committed to innovation, quality, and sustainable manufacturing practices that benefit our 
            customers and communities.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 border-2 border-cyan-200">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            To be the world's most trusted name in precision instruments, recognized for our unwavering commitment 
            to quality, innovation, and customer satisfaction. We aim to expand our reach while maintaining the 
            personal touch and craftsmanship that define our brand.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
            <p className="text-gray-600">
              Every product undergoes stringent quality checks to ensure it meets international standards and exceeds customer expectations.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-600">
              We continuously invest in research and development to bring cutting-edge precision instruments to market.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
            <p className="text-gray-600">
              Your success is our success. We provide personalized service and support to ensure complete satisfaction.
            </p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Certifications & Standards</h2>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-600">
              <span className="text-2xl font-bold text-cyan-600">ISO</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">ISO 9001:2015</h3>
            <p className="text-sm text-gray-600">Quality Management Systems</p>
          </div>
          <div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-600">
              <span className="text-2xl font-bold text-cyan-600">CE</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">CE Certified</h3>
            <p className="text-sm text-gray-600">European Conformity Standards</p>
          </div>
          <div>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-600">
              <span className="text-2xl font-bold text-cyan-600">FDA</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">FDA Registered</h3>
            <p className="text-sm text-gray-600">U.S. Food & Drug Administration</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl p-10 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Partner With Us</h2>
        <p className="text-cyan-50 mb-6 max-w-2xl mx-auto text-lg">
          Join thousands of professionals worldwide who trust Zeta Toolz for their precision instrument needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/categories"
            className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-lg hover:bg-cyan-50 transition"
          >
            Browse Catalog
          </a>
          <a 
            href="/contact"
            className="bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-cyan-800 transition border-2 border-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
