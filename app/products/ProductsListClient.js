'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function ProductsListClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const itemsPerPage = 15;
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page from URL search params, fallback to 1
  const currentPageStr = searchParams.get('page') || '1';
  let currentPage = parseInt(currentPageStr, 10);
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  // Slice products for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentProducts = products.slice(startIndex, endIndex);

  // Scroll to top when page changes
  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Smooth scroll back to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to generate page numbers with ellipses
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      end = 4;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 3;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600 font-light">
          Explore our complete selection of surgical-grade precision beauty instruments, medical tools, and industrial hardware. meeting medical-grade standards.
        </p>
      </div>

      {/* Showing count stats */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <p className="text-gray-600 text-sm">
          Showing <span className="font-bold text-gray-900">{totalItems > 0 ? startIndex + 1 : 0}–{endIndex}</span> of{' '}
          <span className="font-bold text-gray-900">{totalItems}</span> products
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-8">
          {/* Mobile Previous/Next or info */}
          <div className="text-sm text-gray-500 order-2 sm:order-1 font-medium">
            Page {currentPage} of {totalPages}
          </div>

          {/* Navigation Buttons */}
          <nav className="flex items-center gap-1.5 order-1 sm:order-2" aria-label="Pagination">
            {/* Previous Page */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center p-2.5 rounded-lg border text-sm font-medium transition-all ${
                currentPage === 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
              }`}
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNum, index) => {
              if (pageNum === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm select-none"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = pageNum === currentPage;
              return (
                <button
                  key={`page-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                    isCurrent
                      ? 'text-white border-cyan-600 font-bold'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  style={isCurrent ? { backgroundColor: '#00afef' } : {}}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next Page */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center p-2.5 rounded-lg border text-sm font-medium transition-all ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer'
              }`}
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
