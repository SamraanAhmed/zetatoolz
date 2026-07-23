import { products, getProductBySlugOrId } from '../../data/products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  const paramIds = new Set();
  products.forEach((product) => {
    if (product.slug) paramIds.add(product.slug);
    if (product.id) paramIds.add(product.id);
  });
  return Array.from(paramIds).map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductBySlugOrId(id);

  if (!product) {
    return {
      title: 'Product Not Found | Zeta Toolz',
    };
  }

  const cleanDescription = product.description 
    ? product.description.replace(/<[^>]*>/g, '').slice(0, 160)
    : `${product.name} (${product.id}) - Premium instrument from Zeta Toolz.`;

  return {
    title: `${product.name} | Zeta Toolz`,
    description: cleanDescription,
    openGraph: {
      title: `${product.name} | Zeta Toolz`,
      description: cleanDescription,
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductBySlugOrId(id);
  
  return <ProductDetailClient id={id} initialProduct={product} />;
}

