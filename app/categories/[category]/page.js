import { categoriesData } from '../../data/categories';
import SubcategoriesPageClient from './SubcategoriesPageClient';

export function generateStaticParams() {
  return Object.keys(categoriesData).map((slug) => ({
    category: slug,
  }));
}

export default function SubcategoriesPage({ params }) {
  const { category } = params;
  
  return <SubcategoriesPageClient categorySlug={category} />;
}
