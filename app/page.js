'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './components/ProductCard';
import { products } from './data/products';
import { categoriesData } from './data/categories';

export default function Home() {
  const featuredProducts = products.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Build slides dynamically from categories data - MEGA CATEGORY SWITCHER
  const slides = Object.keys(categoriesData).map(categorySlug => {
    const category = categoriesData[categorySlug];
    
    // Get top 3 subcategories for this main category
    const subcategoryKeys = Object.keys(category.subcategories).slice(0, 3);
    const topSubcategories = subcategoryKeys.map(subSlug => ({
      slug: subSlug,
      categorySlug: categorySlug,
      ...category.subcategories[subSlug]
    }));

    // Assign colors based on category
    const colorMap = {
      'beauty-instruments': '#06b6d4',
      'medical-instruments': '#0891b2',
      'industrial-tools': '#0e7490',
      'jewelry-tools': '#22d3ee'
    };

    return {
      categorySlug,
      categoryName: category.name,
      description: category.description,
      bgColor: colorMap[categorySlug] || '#06b6d4',
      viewAllLink: `/categories/${categorySlug}`,
      subcategories: topSubcategories
    };
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px] overflow-hidden rounded-3xl shadow-2xl">
        {/* Diagonal Split Background */}
        <div 
          className="absolute inset-0 transition-colors duration-700"
          style={{
            background: `linear-gradient(135deg, ${slides[currentSlide].bgColor} 0%, ${slides[currentSlide].bgColor} 58%, #ffffff 58%, #ffffff 100%)`
          }}
        />

        {/* Content Container */}
        <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center">
          {/* Left Side - Typography */}
          <div className="w-[45%] z-10 animate-fade-in">
            <div className="mb-2 text-white/90 text-sm font-medium tracking-widest uppercase">
              {slides[currentSlide].description}
            </div>
            <h1 className="text-6xl font-black text-white mb-6 leading-tight">
              {slides[currentSlide].categoryName}
            </h1>
            <Link 
              href={slides[currentSlide].viewAllLink}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium tracking-wide mt-4 border-b border-white/30 hover:border-white pb-1 transition-all"
            >
              View All Subcategories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            {/* Navigation Dots */}
            <div className="flex gap-3 mt-12">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentSlide 
                      ? 'w-12 h-3 bg-white' 
                      : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Horizontal Subcategory Cards Stacked */}
          <div className="w-[55%] h-full flex items-center justify-end relative pr-4">
            <div className="relative w-full h-[520px] flex flex-col justify-center gap-4">
              {slides[currentSlide].subcategories.slice(0, 3).map((sub, idx) => (
                <div
                  key={sub.slug}
                  className={`relative transition-all duration-700 animate-fade-in hover:scale-105 ${
                    idx === 1 ? 'hover:scale-[1.03] z-20' : ''
                  }`}
                  style={{ 
                    width: idx === 1 ? '480px' : '380px', 
                    height: idx === 1 ? '200px' : '140px', 
                    marginLeft: 'auto' 
                  }}
                >
                  <Link href={`/categories/${sub.categorySlug}/${sub.slug}`} className="block w-full h-full">
                    <div className={`relative w-full h-full bg-white rounded-xl shadow-xl overflow-hidden border-2 border-white group ${idx === 1 ? 'rounded-2xl shadow-2xl border-4' : ''}`}>
                      <Image
                        src={sub.image || 'https://placehold.co/600x400/png?text=Image+Not+Found'}
                        alt={sub.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className={`absolute inset-0 flex items-center ${idx === 1 ? 'bg-gradient-to-r from-black/70 via-black/40 to-transparent p-6' : 'bg-gradient-to-r from-black/60 to-transparent p-5'}`}>
                        <div>
                          {idx === 1 && (
                            <div className="inline-block bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                              POPULAR
                            </div>
                          )}
                          <p className={`text-white font-bold drop-shadow-lg ${idx === 1 ? 'text-xl' : 'text-base'}`}>{sub.name}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Navigation Controls */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </section>


      {/* Trust Signals / Features Bar */}
      <section className="bg-slate-800 rounded-2xl shadow-lg -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8 py-10">
          {/* Feature 1: On Time Deliveries */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full border-2 border-slate-600 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition-colors">
              <svg className="w-8 h-8 text-slate-300 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">On Time Deliveries</h3>
            <p className="text-sm text-slate-400 font-light">
              Global shipping with guaranteed delivery timelines for all orders
            </p>
          </div>

          {/* Feature 2: Quality Guaranteed */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full border-2 border-slate-600 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition-colors">
              <svg className="w-8 h-8 text-slate-300 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Quality Guaranteed</h3>
            <p className="text-sm text-slate-400 font-light">
              Surgical-grade stainless steel with precision manufacturing standards
            </p>
          </div>

          {/* Feature 3: ISO 9001 & CE Certified */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full border-2 border-slate-600 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition-colors">
              <svg className="w-8 h-8 text-slate-300 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">ISO 9001 & CE Certified</h3>
            <p className="text-sm text-slate-400 font-light">
              Internationally certified manufacturing meeting medical-grade standards
            </p>
          </div>

          {/* Feature 4: 24/7 Customer Support */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full border-2 border-slate-600 flex items-center justify-center mb-4 group-hover:border-cyan-500 transition-colors">
              <svg className="w-8 h-8 text-slate-300 group-hover:text-cyan-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">24/7 Customer Support</h3>
            <p className="text-sm text-slate-400 font-light">
              Dedicated technical support team available worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
             <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Precision Instruments</h2>
             <p className="text-gray-600">ISO certified surgical-grade tools for professionals</p>
          </div>
          <Link href="/products" className="text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1 group">
            View Full Catalog <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Partner with Zeta Toolz</h2>
          <p className="text-white/90 mb-8">Join manufacturers and distributors worldwide. Get exclusive pricing, bulk order discounts, and priority support.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <input type="email" placeholder="Enter your business email" className="px-6 py-3 rounded-lg bg-white text-gray-900 border-2 border-transparent focus:border-cyan-300 focus:outline-none w-full sm:w-auto min-w-[300px]" />
             <button className="bg-white text-cyan-600 font-bold py-3 px-8 rounded-lg hover:bg-cyan-50 transition-colors">
               Request Catalog
             </button>
          </div>
        </div>
      </section>
    </div>
  );
}
