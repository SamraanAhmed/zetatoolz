import { categoriesData } from '../../../data/categories';
import ProductsPageClient from './ProductsPageClient';

export function generateStaticParams() {
  const params = [];
  Object.keys(categoriesData).forEach(categorySlug => {
    const category = categoriesData[categorySlug];
    if (category.subcategories) {
      Object.keys(category.subcategories).forEach(subcategorySlug => {
        params.push({
          category: categorySlug,
          subcategory: subcategorySlug,
        });
      });
    }
  });
  return params;
}

export default async function ProductsPage({ params }) {
  const { category, subcategory } = await params;
  
  return <ProductsPageClient categorySlug={category} subcategorySlug={subcategory} />;
}
