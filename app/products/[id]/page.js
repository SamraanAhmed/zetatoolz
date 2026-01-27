'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Find product by ID
    const foundProduct = products.find(p => p.id === id || p.sku === id);
    setProduct(foundProduct);
  }, [id]);

  const handleEmailInquiry = () => {
    if (!product) return;
    
    const today = new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const subject = `Inquiry: Purchase Request for ${product.name}`;
    const body = `Hello,

I am interested in purchasing the ${product.name} (SKU: ${product.sku || product.id}).

Please provide the current market price for today, ${today}.

Thank you.`;

    // Gmail compose URL
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent('xeedemo1@gmail.com')}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailURL, '_blank');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="text-cyan-600 hover:text-cyan-700 font-medium">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Dummy image gallery (in real scenario, products would have multiple images)
  const imageGallery = [
    product.image || 'https://placehold.co/800x800/f3f4f6/6b7280?text=' + encodeURIComponent(product.name),
    product.image || 'https://placehold.co/800x800/f3f4f6/6b7280?text=' + encodeURIComponent(product.name),
    product.image || 'https://placehold.co/800x800/f3f4f6/6b7280?text=' + encodeURIComponent(product.name),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-cyan-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-cyan-600 transition-colors">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/categories/${product.category?.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-cyan-600 transition-colors">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-xl border-2 border-gray-200">
              <img
                src={imageGallery[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/800x800/f3f4f6/6b7280?text=' + encodeURIComponent(product.name);
                }}
              />
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-3 gap-4">
              {imageGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx 
                      ? 'border-cyan-500 shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/400x400/f3f4f6/6b7280?text=View+' + (idx + 1);
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div className="flex items-center gap-3">
              <span className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold">
                {product.category}
              </span>
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                {product.subcategory}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Product SKU/ID */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">SKU:</span>
                <span className="text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-md">
                  {product.sku || product.id}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 font-medium">Product ID:</span>
                <span className="text-gray-900 font-semibold">{product.id}</span>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Product Overview</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button 
                onClick={() => addToCart(product)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-6 rounded-xl transition-all border-2 border-gray-300 hover:border-gray-400 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add to Quote List
              </button>
              
              <button 
                onClick={handleEmailInquiry}
              className="text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#00afef' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0099d6'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00afef'}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request Price Quote
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">ISO Certified</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">Fast Shipping</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-700">Quality Assured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* Product Details */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  {product.details?.overview || product.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our instruments are trusted by professionals worldwide and come with a satisfaction guarantee. 
                  Suitable for use in medical, beauty, industrial, and jewelry applications depending on the specific model.
                </p>
              </div>
            </div>

            {/* Specifications */}
            <div className="p-8 bg-gray-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Specifications</h2>
              </div>
              <div className="space-y-3">
                {product.details?.specifications ? (
                  Object.entries(product.details.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-200 last:border-0">
                      <span className="font-semibold text-gray-700">{key}:</span>
                      <span className="text-gray-900">{value}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Material:</span>
                      <span className="text-gray-900">Surgical Grade Stainless Steel</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">Type:</span>
                      <span className="text-gray-900">Professional Grade</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Features & Benefits */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Features</h2>
              </div>
              <ul className="space-y-4">
                {product.details?.features ? (
                  product.details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{feature}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Professional Grade Quality</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-10 text-center shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to Order?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact our sales team for bulk pricing, custom orders, or any questions about this product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleEmailInquiry}
            className="text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#00afef' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0099d6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00afef'}
          >
              Contact Sales Team
            </button>
            <Link 
              href="/products"
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all"
            >
              View More Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
