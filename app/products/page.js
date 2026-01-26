import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export const metadata = {
  title: 'Shop All Products | Synix',
  description: 'Browse our complete collection of futuristic gadgets.',
};

export default function ProductsPage() {
  return (
    <div className="animate-fade-in">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">All Products</h1>
        <p className="text-slate-400">Explore the latest technology designed to enhance your life. Quality, performance, and style in every device.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
