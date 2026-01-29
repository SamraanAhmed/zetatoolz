import jsonData from './data.json';

// Transform JSON data into the structure expected by the app
// This maintains backward compatibility with the existing codebase
export const categoriesData = {};

jsonData.categories.forEach(cat => {
  const subcats = {};
  if (cat.subcategories) {
    cat.subcategories.forEach(sub => {
      const subSubcats = {};
      if (sub.subsubcategories) {
          sub.subsubcategories.forEach(subsub => {
              subSubcats[subsub.slug] = {
                  name: subsub.name,
                  image: subsub.image,
                  description: subsub.description
              };
          });
      }

      subcats[sub.slug] = {
        name: sub.name,
        image: sub.image,
        description: sub.description,
        subsubcategories: subSubcats
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
export function getCategoryInfo(categorySlug, subcategorySlug = null, subsubcategorySlug = null) {
  const category = jsonData.categories.find(c => c.slug === categorySlug);
  if (!category) return null;
  
  if (subcategorySlug) {
    const subcategory = category.subcategories.find(s => s.slug === subcategorySlug);
    if (!subcategory) return null;
    
    if (subsubcategorySlug) {
      const subsubcategory = subcategory.subsubcategories?.find(s => s.slug === subsubcategorySlug);
      if (!subsubcategory) return null;

      return {
        category: {
          slug: category.slug,
          name: category.name
        },
        subcategory: {
          slug: subcategory.slug,
          name: subcategory.name
        },
        subsubcategory: {
          slug: subsubcategory.slug,
          name: subsubcategory.name,
          description: subsubcategory.description,
          image: subsubcategory.image,
          products: subsubcategory.products || []
        }
      };
    }

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
        subsubcategories: subcategory.subsubcategories || []
      }
    };
  }
  
  return {
    slug: category.slug,
    name: category.name,
    description: category.description
  };
}

