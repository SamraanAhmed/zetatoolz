'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { categoriesData } from '../data/categories';

export default function Navbar() {
  const { getCartCount, getCartTotal } = useCart();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');

  const isActive = (path) => pathname === path;

  const productCategories = Object.keys(categoriesData).map(slug => ({
    name: categoriesData[slug].name,
    href: `/categories/${slug}`,
    subcategories: Object.keys(categoriesData[slug].subcategories).map(subSlug => ({
      name: categoriesData[slug].subcategories[subSlug].name,
      href: `/categories/${slug}/${subSlug}`
    }))
  }));

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md">
      {/* 1. Utility Top Bar */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-xs">
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a href="#" className="text-blue-600 hover:text-blue-700 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="#" className="text-pink-500 hover:text-pink-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* X (Twitter) */}
              <a href="#" className="text-gray-900 hover:text-gray-700 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a href="#" className="text-red-600 hover:text-red-700 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              
              {/* TikTok */}
              <a href="#" className="text-gray-900 hover:text-gray-700 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>

            {/* Right Side Utilities */}
            <div className="hidden md:flex items-center gap-4">
              {/* Currency Selector */}
              <div className="flex items-center gap-1">
                <span className="text-gray-600">$ USD</span>
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <Link href="/orders" className="text-gray-600 hover:text-blue-600 transition">Track Orders</Link>
              <Link href="/shipping" className="text-gray-600 hover:text-blue-600 transition">Shipping Info</Link>
              <span className="text-gray-600 border-l pl-4 ml-2">ISO 9001 & CE Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Brand & Search Tier */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="relative h-14 w-40">
                <Image 
                  src="/ZetaToolsMainLogo.svg" 
                  alt="ZetaToolz Logo" 
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Central Search Bar */}
            <div className="flex-1 max-w-3xl">
              <div className="flex items-stretch">
                {/* Category Dropdown */}
                <div className="relative">
                  <select 
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="h-full px-4 pr-8 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg text-sm focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
                  >
                    <option>All</option>
                    <option>Beauty Instruments</option>
                    <option>Hammer & Mallets</option>
                    <option>Eyelash Tweezers</option>
                  </select>
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 border-t border-b border-gray-300 focus:outline-none focus:border-blue-500 text-sm"
                />

                {/* Search Button */}
                <button className="px-6 bg-cyan-600 hover:bg-cyan-700 text-white rounded-r-lg transition flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* User Action Icons */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Account */}
              <Link href="/account" className="flex flex-col items-center group">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-cyan-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-xs text-gray-600 group-hover:text-cyan-600 transition mt-1">Account</span>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="flex flex-col items-center group relative">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-cyan-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-xs text-gray-600 group-hover:text-cyan-600 transition mt-1">Wishlist</span>
              </Link>

              {/* Compare */}
              <Link href="/compare" className="flex flex-col items-center group">
                <svg className="w-6 h-6 text-gray-600 group-hover:text-cyan-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-xs text-gray-600 group-hover:text-cyan-600 transition mt-1">Compare</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Navigation & Cart Tier */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: Category Navigation */}
            <nav className="flex items-center gap-1">
              {/* All Categories */}
              <Link 
                href="/categories" 
                className="px-4 py-2 text-sm font-medium bg-cyan-600 text-white hover:bg-cyan-700 rounded transition flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                All Categories
              </Link>

              {/* Product Categories with Dropdown */}
              {productCategories.map((category) => (
                <div key={category.name} className="relative group h-full flex items-center">
                  <Link 
                    href={category.href}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded transition flex items-center gap-1"
                  >
                    {category.name}
                    <svg className="w-3.5 h-3.5 text-gray-500 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full pt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top group-hover:translate-y-0 translate-y-2">
                    <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden py-2">
                      <div className="px-4 py-2 border-b border-gray-100 mb-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{category.name}</span>
                      </div>
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition flex items-center justify-between group/item"
                        >
                          {sub.name}
                          <svg className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Right: Secondary Links & Cart */}
            <div className="flex items-center gap-6">
              {/* Secondary Links */}
              <div className="hidden md:flex items-center gap-4">
                <Link href="/about" className="text-sm text-gray-700 hover:text-cyan-600 transition">About Us</Link>
                <Link href="/contact" className="text-sm text-gray-700 hover:text-cyan-600 transition">Contact</Link>
                <Link href="/faq" className="text-sm text-gray-700 hover:text-cyan-600 transition">FAQ</Link>
              </div>

              {/* Shopping Cart */}
              <Link href="/cart" className={`flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition ${getCartCount() > 0 ? 'px-4 py-2' : 'p-3'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartCount() > 0 && (
                  <span className="font-bold text-sm">{getCartCount()} {getCartCount() === 1 ? 'Item' : 'Items'}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
