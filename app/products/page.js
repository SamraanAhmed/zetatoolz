import { Suspense } from 'react';
import ProductsListClient from './ProductsListClient';

export const metadata = {
  title: 'Shop All Products | Zeta Toolz',
  description: 'Browse our complete collection of precision instruments.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-cyan-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Loading products...</p>
      </div>
    }>
      <ProductsListClient />
    </Suspense>
  );
}

