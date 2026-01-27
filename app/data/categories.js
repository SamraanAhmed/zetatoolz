import jsonData from './data.json';

// Transform JSON data into the structure expected by the app
// This maintains backward compatibility with the existing codebase
export const categoriesData = {};

jsonData.categories.forEach(cat => {
  const subcats = {};
  if (cat.subcategories) {
    cat.subcategories.forEach(sub => {
      subcats[sub.slug] = {
        name: sub.name,
        image: sub.image,
        description: sub.description
      };
    });
  }

  categoriesData[cat.slug] = {
    name: cat.name,
    image: cat.image,
    description: cat.description,
    subcategories: subcats
  };
});

// Helper function to get all main categories
export function getMainCategories() {
  return jsonData.categories.map(cat => ({
    slug: cat.slug,
    name: cat.name,
    image: cat.image,
    description: cat.description,
    // Don't include subcategories in main list view usually
  }));
}

// Helper function to get subcategories for a main category
export function getSubcategories(categorySlug) {
  const category = jsonData.categories.find(c => c.slug === categorySlug);
  if (!category) return null;
  
  return {
    category: {
      slug: category.slug,
      name: category.name,
      description: category.description
    },
    subcategories: category.subcategories.map(sub => ({
      slug: sub.slug,
      name: sub.name,
      image: sub.image,
      description: sub.description
    }))
  };
}

// Helper function to get category info
export function getCategoryInfo(categorySlug, subcategorySlug = null) {
  const category = jsonData.categories.find(c => c.slug === categorySlug);
  if (!category) return null;
  
  if (subcategorySlug) {
    const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
    if (!subcategory) return null;
    
    return {
      category: {
        slug: category.slug,
        name: category.name
      },
      subcategory: {
        slug: subcategory.slug,
        name: subcategory.name,
        description: subcategory.description,
        image: subcategory.image,
        products: subcategory.products || []
      }
    };
  }
  
  return {
    slug: category.slug,
    name: category.name,
    description: category.description
  };
}

