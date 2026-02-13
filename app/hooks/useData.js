'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                image: subsub.image || '/placeholder.jpg',
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

  const fetchData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      
      // Check localStorage first if not forcing refresh
      if (!forceRefresh) {
        const cachedData = localStorage.getItem('siteData');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          // Check if data is less than 1 hour old (3600000 ms)
          if (Date.now() - parsedData.timestamp < 3600000) {
            setCategories(parsedData.categories);
            setProducts(parsedData.products);
            setLoading(false);
            return;
          }
        }
      }

      const response = await fetch('/api/admin/data?t=' + Date.now());
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await response.json();
      const transformedCategories = transformData(result.categories || []);
      const extractedProducts = getAllProducts(transformedCategories);
      
      setCategories(transformedCategories);
      setProducts(extractedProducts);
      
      // Cache the new data
      localStorage.setItem('siteData', JSON.stringify({
        categories: transformedCategories,
        products: extractedProducts,
        timestamp: Date.now()
      }));

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => fetchData(true);

  return (
    <DataContext.Provider value={{ categories, products, loading, error, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
