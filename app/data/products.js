import jsonData from './data.json';

// Flatten the hierarchical JSON data into a single products array
// This maintains backward compatibility with the existing codebase which expects a flat list
export const products = [];

jsonData.categories.forEach(category => {
  if (category.subcategories) {
    category.subcategories.forEach(subcategory => {
      if (subcategory.products) {
        subcategory.products.forEach(product => {
          products.push({
            ...product,
            category: category.name,
            subcategory: subcategory.name
          });
        });
      }
    });
  }
});

