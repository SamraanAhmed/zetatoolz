'use client';

import { useState, useEffect } from 'react';



export function useData() {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/admin/data?t=' + Date.now()); // Add timestamp to prevent caching
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();

        // Helper to transform array from API to object structure used by frontend
        const transformData = (apiCategories) => {
          const categoriesData = {};
          
          if (!Array.isArray(apiCategories)) return categoriesData;

          apiCategories.forEach(cat => {
            const subcats = {};
            
            if (cat.subcategories && Array.isArray(cat.subcategories)) {
              cat.subcategories.forEach(sub => {
                const subSubcats = {};
                
                if (sub.subsubcategories && Array.isArray(sub.subsubcategories)) {
                  sub.subsubcategories.forEach(subsub => {
                    subSubcats[subsub.slug] = {
                      name: subsub.name,
                      slug: subsub.slug,
                      image: subsub.image || '/placeholder.jpg', // Use sub-subcategory image
                      description: subsub.description,
                      products: subsub.products || []
                    };
                  });
                }
                
                // Construct subcategory object
                subcats[sub.slug] = {
                  name: sub.name,
                  slug: sub.slug,
                  image: sub.image || '/placeholder.jpg',
                  description: sub.description,
                  subsubcategories: subSubcats,
                  products: sub.products || []
                };
              });
            }

            categoriesData[cat.slug] = {
              name: cat.name,
              slug: cat.slug,
              description: cat.description,
              image: cat.image,
              subcategories: subcats
            };
          });
          
          return categoriesData;
        };

        const transformedCategories = transformData(result.categories || []);
        
        // Helper function to extract all products from categories
        const getAllProducts = (categoriesData) => {
          const allProducts = [];
          
          if (!categoriesData) return allProducts;

          Object.values(categoriesData).forEach(category => {
            // Check main category subcategories
            if (category.subcategories) {
              Object.values(category.subcategories).forEach(subcategory => {
                // Add products directly from subcategory
                if (subcategory.products) {
                  subcategory.products.forEach(product => {
                    allProducts.push({
                      ...product,
                      category: category.name,
                      subcategory: subcategory.name,
                      subsubcategory: null
                    });
                  });
                }
                
                // Add products from sub-subcategories
                if (subcategory.subsubcategories) {
                  Object.values(subcategory.subsubcategories).forEach(subsubcategory => {
                    if (subsubcategory.products) {
                      subsubcategory.products.forEach(product => {
                        allProducts.push({
                          ...product,
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

          return allProducts;
        };

        const extractedProducts = getAllProducts(transformedCategories);
        
        setCategories(transformedCategories);
        setProducts(extractedProducts);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { categories, products, loading, error };
}
