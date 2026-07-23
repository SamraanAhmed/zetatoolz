import jsonData from './data.json';

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Flatten the hierarchical JSON data into a single products array
// This maintains backward compatibility with the existing codebase which expects a flat list
export const products = [];

jsonData.categories.forEach(category => {
  if (category.subcategories) {
    category.subcategories.forEach(subcategory => {
      // Add products directly from subcategory
      if (subcategory.products) {
        subcategory.products.forEach(product => {
          const nameSlug = slugify(product.name);
          const idSlug = (product.id || '').toLowerCase();
          const slug = nameSlug || idSlug;

          products.push({
            ...product,
            slug,
            category: category.name,
            subcategory: subcategory.name,
            subsubcategory: null // No sub-subcategory for these products
          });
        });
      }
      
      // Add products from sub-subcategories
      if (subcategory.subsubcategories) {
        subcategory.subsubcategories.forEach(subsubcategory => {
          if (subsubcategory.products) {
            subsubcategory.products.forEach(product => {
              const nameSlug = slugify(product.name);
              const idSlug = (product.id || '').toLowerCase();
              const slug = nameSlug || idSlug;

              products.push({
                ...product,
                slug,
                category: category.name,
                subcategory: subcategory.name,
                subsubcategory: subsubcategory.name
              });
            });
          }
        });
      }
    });
  }
});

export function getProductBySlugOrId(identifier) {
  if (!identifier) return null;
  const decoded = decodeURIComponent(identifier).toLowerCase().trim();

  // 1. Direct match by slug
  let found = products.find(p => p.slug?.toLowerCase() === decoded);
  if (found) return found;

  // 2. Direct match by ID
  found = products.find(p => p.id?.toLowerCase() === decoded);
  if (found) return found;

  // 3. Match by slugified name only
  found = products.find(p => slugify(p.name) === decoded);
  if (found) return found;

  // 4. Match if decoded identifier ends with product ID
  found = products.find(p => decoded.endsWith(p.id?.toLowerCase()));
  if (found) return found;

  return null;
}



